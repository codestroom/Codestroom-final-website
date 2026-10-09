import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { LOGO_OUTLINES } from './logoOutlines';

/* The mark is two translucent rounded shapes that multiply where they cross —
   that dark middle is the overlap, not a shape of its own. Both outlines are
   traced from the source png, so head-on this matches the logo exactly.

   The canvas is transparent so the hero gradient shows around the mark. Plain
   multiply blending would vanish on a transparent canvas (0 × colour = 0), so
   each slab uses SLAB_BLEND: on empty pixels it draws its own colour, on pixels
   already covered it multiplies — the same result as multiplying onto white. */
const SLABS = [
  { outline: LOGO_OUTLINES.blue, color: '#49b4f2', z: -38 },
  { outline: LOGO_OUTLINES.pink, color: '#f02f7d', z: 38 },
];

const DEPTH = 52;
/* the mark itself is ~910 x 780 units; the rest is breathing room for the tilt */
const FIT_WIDTH = 1400;
const FIT_HEIGHT = 1250;

function shapeFrom(outline) {
  // earcut wants a consistent winding, and the traced rings come out clockwise
  const area = outline.reduce((sum, [x, y], i) => {
    const [nx, ny] = outline[(i + 1) % outline.length];
    return sum + (x * ny - nx * y);
  }, 0);
  const ring = area < 0 ? [...outline].reverse() : outline;
  return new THREE.Shape(ring.map(([x, y]) => new THREE.Vector2(x, y)));
}

// result = src × (1 − dstAlpha) + dst × src  →  src on empty pixels, src × dst on covered ones
const SLAB_BLEND = {
  blending: THREE.CustomBlending,
  blendEquation: THREE.AddEquation,
  blendSrc: THREE.OneMinusDstAlphaFactor,
  blendDst: THREE.SrcColorFactor,
  blendSrcAlpha: THREE.OneMinusDstAlphaFactor,
  blendDstAlpha: THREE.SrcAlphaFactor,
};

// "destination-over": the shadow only fills pixels the mark hasn't covered
const BEHIND_BLEND = {
  blending: THREE.CustomBlending,
  blendEquation: THREE.AddEquation,
  blendSrc: THREE.OneMinusDstAlphaFactor,
  blendDst: THREE.OneFactor,
  blendSrcAlpha: THREE.OneMinusDstAlphaFactor,
  blendDstAlpha: THREE.OneFactor,
};

/* blurred ellipse the mark sits on — a soft translucent indigo, so it reads on
   whatever gradient sits behind the canvas */
function shadowTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(70, 58, 140, 0.55)');
  g.addColorStop(0.45, 'rgba(70, 58, 140, 0.2)');
  g.addColorStop(1, 'rgba(70, 58, 140, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function HeroLogo3D() {
  const mountRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setFailed(true);
      return;
    }
    if (!renderer.getContext()) {
      setFailed(true);
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 100, 6000);

    /* calibrated by sampling the framebuffer: at these intensities a face turned
       to the camera renders the exact logo colour, and the extruded sides fall
       away into darker shades of it */
    scene.add(new THREE.AmbientLight(0xffffff, 2.55));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.99);
    keyLight.position.set(-360, 520, 1000);
    scene.add(keyLight);

    const disposables = [];
    const group = new THREE.Group();
    scene.add(group);

    const shadowTex = shadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(1180, 460);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      ...BEHIND_BLEND,
      transparent: true,
      premultipliedAlpha: true,
      depthTest: false,
      depthWrite: false,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.position.set(30, -470, -260);
    shadow.renderOrder = SLABS.length; // after the slabs, so it tucks in behind them
    scene.add(shadow);
    disposables.push(shadowGeo, shadowMat, shadowTex);

    SLABS.forEach((slab, i) => {
      const geometry = new THREE.ExtrudeGeometry(shapeFrom(slab.outline), {
        depth: DEPTH,
        bevelEnabled: true,
        bevelThickness: 5,
        bevelSize: 5,
        bevelSegments: 3,
      });
      // NOT geometry.center() — the two outlines share one coordinate system and
      // recentring them individually pulls the mark apart
      geometry.translate(0, 0, -DEPTH / 2);

      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(slab.color),
        ...SLAB_BLEND,
        transparent: true,
        premultipliedAlpha: true,
        // front faces only, no depth interaction: every slab then touches each
        // pixel exactly once, whichever way the group is turned
        side: THREE.FrontSide,
        depthTest: false,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = slab.z;
      mesh.renderOrder = i;
      group.add(mesh);
      disposables.push(geometry, material);
    });

    // spin about the mark's own centre, not the source image's
    const centre = new THREE.Box3().setFromObject(group).getCenter(new THREE.Vector3());
    group.children.forEach((mesh) => mesh.position.sub(centre));

    /* frame the mark so it always fits the stage, whatever its aspect */
    function resize() {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;

      renderer.setSize(w, h, false);
      camera.aspect = w / h;

      const halfFov = THREE.MathUtils.degToRad(camera.fov) / 2;
      const distForHeight = FIT_HEIGHT / 2 / Math.tan(halfFov);
      const distForWidth = FIT_WIDTH / 2 / Math.tan(halfFov) / camera.aspect;
      camera.position.z = Math.max(distForHeight, distForWidth);
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    }

    resize(); // paints the first frame immediately, before rAF ever fires
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    /* the mark leans toward the cursor anywhere on the page, not just over the stage */
    const target = { rx: 0, ry: 0, px: 0, py: 0 };

    function onPointerMove(event) {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      target.ry = nx * 0.55;
      target.rx = ny * 0.38;
      target.px = nx * 55;
      target.py = -ny * 40;
    }

    /* only spin the loop while the mark is actually on screen */
    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; }, { threshold: 0 });
    io.observe(mount);

    const start = performance.now();
    let frame;

    function tick() {
      frame = requestAnimationFrame(tick);
      if (!onScreen) return;

      const t = (performance.now() - start) / 1000;

      // idle drift keeps it alive before the cursor ever moves
      const driftY = Math.sin(t * 0.45) * 0.12;
      const driftX = Math.cos(t * 0.35) * 0.07;
      const float = Math.sin(t * 0.9) * 16;

      group.rotation.y += (target.ry + driftY - group.rotation.y) * 0.06;
      group.rotation.x += (target.rx + driftX - group.rotation.x) * 0.06;
      group.position.x += (target.px - group.position.x) * 0.05;
      group.position.y += (target.py + float - group.position.y) * 0.05;

      renderer.render(scene, camera);
    }

    // reduced motion keeps the static first frame — no tracking, no float
    if (!reduceMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      tick();
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();
      io.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  if (failed) return <img className="hero-logo" src="/assets/logo-hero.webp" alt="" width="460" height="460" />;

  return <div className="hero-logo-3d" ref={mountRef} />;
}
