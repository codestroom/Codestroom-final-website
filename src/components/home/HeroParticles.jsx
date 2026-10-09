import { useEffect, useRef } from 'react';
import { LOGO_OUTLINES } from '../logoOutlines';

/* A dotted echo of the logo behind the 3D mark. Dots fly in and assemble on
   load, drift gently, and scatter away from the cursor before springing back. */

const COLORS = {
  pink: [240, 47, 125],
  blue: [73, 180, 242],
  both: [92, 37, 140],
};
const LOGO_W = 910; // outline units (see logoOutlines.js)
const SCALE_TO_STAGE = 1.5; // dotted logo vs. the stage's 3D mark
const REPEL_RADIUS = 110;

function inside([px, py], poly) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

// Sample the two outlines on a grid; colour by which shape(s) a point falls in.
function samplePoints(spacing) {
  const pts = [];
  for (let y = -385; y <= 400; y += spacing) {
    const row = Math.round((y + 385) / spacing);
    for (let x = -450; x <= 465; x += spacing) {
      const p = [x + (row % 2 ? spacing / 2 : 0), y]; // staggered rows read as a halftone
      const inPink = inside(p, LOGO_OUTLINES.pink);
      const inBlue = inside(p, LOGO_OUTLINES.blue);
      if (inPink || inBlue) pts.push({ x: p[0], y: p[1], c: inPink && inBlue ? 'both' : inPink ? 'pink' : 'blue' });
    }
  }
  return pts;
}

export default function HeroParticles({ anchorRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 760;
    const logoPts = samplePoints(small ? 30 : 21);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    const pointer = { x: -9999, y: -9999 };

    function layout() {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // centre the dotted logo on the 3D mark's stage
      const anchor = anchorRef?.current?.getBoundingClientRect();
      const cx = anchor ? anchor.left - rect.left + anchor.width / 2 : width * 0.72;
      const cy = anchor ? anchor.top - rect.top + anchor.height / 2 : height * 0.5;
      const stageW = anchor ? Math.min(anchor.width, anchor.height * 1.2) : 420;
      const scale = ((stageW * 0.7) / LOGO_W) * SCALE_TO_STAGE;

      const fresh = particles.length === 0;
      particles = logoPts.map((p, i) => {
        const prev = particles[i];
        const tx = cx + p.x * scale;
        const ty = cy - p.y * scale;
        if (prev && !fresh) return { ...prev, tx, ty };
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.max(width, height) * (0.6 + Math.random() * 0.5);
        return {
          tx,
          ty,
          x: reduceMotion ? tx : cx + Math.cos(angle) * dist,
          y: reduceMotion ? ty : cy + Math.sin(angle) * dist,
          vx: 0,
          vy: 0,
          delay: Math.random() * 0.9, // seconds before it starts flying in
          size: 1.4 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
          rgb: COLORS[p.c],
        };
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const [r, g, b] = p.rgb;
        ctx.fillStyle = `rgba(${r},${g},${b},0.42)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    layout();

    if (reduceMotion) {
      draw();
      const ro = new ResizeObserver(() => { layout(); draw(); });
      ro.observe(host);
      return () => ro.disconnect();
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }
    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; });
    io.observe(host);
    const ro = new ResizeObserver(layout);
    ro.observe(host);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    const start = performance.now();
    let frame;
    function tick(now) {
      frame = requestAnimationFrame(tick);
      if (!onScreen) return;
      const t = (now - start) / 1000;

      for (const p of particles) {
        if (t < p.delay) continue;
        // idle wobble around the home position
        const hx = p.tx + Math.sin(t * 0.8 + p.phase) * 1.6;
        const hy = p.ty + Math.cos(t * 0.7 + p.phase) * 1.6;
        // spring home
        p.vx += (hx - p.x) * 0.018;
        p.vy += (hy - p.y) * 0.018;
        // scatter from the cursor
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const force = (1 - d / REPEL_RADIUS) * 4.2;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
      }
      draw();
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [anchorRef]);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />;
}
