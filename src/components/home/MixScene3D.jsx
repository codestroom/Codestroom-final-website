import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const BLUE = new THREE.Color('#2e9df4');
const PINK = new THREE.Color('#f8228b');
const RADIUS = 1.6;
const TUBE = 0.38;
const GAP = 0.08; // radians of air between the two arcs
const PARTICLES = 340;

/* 3d donut of the organic / paid split: two torus arcs that re-slice as the
   slider moves, a swarm of particles that take the colour of the arc they're
   passing over, and a wireframe core tinted by the balance */
export default function MixScene3D({ organic }) {
  const mountRef = useRef(null);
  const targetRef = useRef(organic / 100);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    targetRef.current = organic / 100;
  }, [organic]);

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
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(-3, 4, 6);
    scene.add(key);
    const blueLight = new THREE.PointLight(0x2e9df4, 18, 12);
    blueLight.position.set(-3.5, -1, 2.5);
    scene.add(blueLight);
    const pinkLight = new THREE.PointLight(0xf8228b, 18, 12);
    pinkLight.position.set(3.5, 1.5, 2.5);
    scene.add(pinkLight);

    const disposables = [];
    const tilt = new THREE.Group(); // cursor lean
    const ring = new THREE.Group(); // lies back so it reads as 3d, then spins
    ring.rotation.x = -1.05;
    tilt.add(ring);
    scene.add(tilt);

    const organicMat = new THREE.MeshStandardMaterial({ color: BLUE, roughness: 0.28, metalness: 0.15, emissive: BLUE, emissiveIntensity: 0.18 });
    const paidMat = new THREE.MeshStandardMaterial({ color: PINK, roughness: 0.28, metalness: 0.15, emissive: PINK, emissiveIntensity: 0.18 });
    disposables.push(organicMat, paidMat);
    const organicArc = new THREE.Mesh(new THREE.BufferGeometry(), organicMat);
    const paidArc = new THREE.Mesh(new THREE.BufferGeometry(), paidMat);
    ring.add(organicArc, paidArc);

    let shown = -1;
    function sliceRing(fraction) {
      const full = Math.PI * 2;
      const orgLen = Math.max(0.05, full * fraction - GAP);
      const paidLen = Math.max(0.05, full * (1 - fraction) - GAP);
      organicArc.geometry.dispose();
      paidArc.geometry.dispose();
      organicArc.geometry = new THREE.TorusGeometry(RADIUS, TUBE, 28, 120, orgLen);
      paidArc.geometry = new THREE.TorusGeometry(RADIUS, TUBE, 28, 120, paidLen);
      organicArc.rotation.z = GAP / 2;
      paidArc.rotation.z = full * fraction + GAP / 2;
      shown = fraction;
    }

    // thin guide ring for depth
    const guideGeo = new THREE.TorusGeometry(RADIUS + 0.85, 0.008, 6, 200);
    const guideMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 });
    ring.add(new THREE.Mesh(guideGeo, guideMat));
    disposables.push(guideGeo, guideMat);

    // particle swarm orbiting just outside the ring
    const positions = new Float32Array(PARTICLES * 3);
    const colors = new Float32Array(PARTICLES * 3);
    const angles = new Float32Array(PARTICLES);
    const speeds = new Float32Array(PARTICLES);
    for (let i = 0; i < PARTICLES; i++) {
      angles[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.12 + Math.random() * 0.25;
      const r = RADIUS + 0.55 + Math.random() * 0.75;
      positions[i * 3] = r; // radius parked in x, real xy written per frame
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.7;
    }
    const radii = positions.filter((_, i) => i % 3 === 0);
    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dotsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const dotsMat = new THREE.PointsMaterial({ size: 0.055, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending });
    ring.add(new THREE.Points(dotsGeo, dotsMat));
    disposables.push(dotsGeo, dotsMat);

    // wireframe core
    const coreGeo = new THREE.IcosahedronGeometry(0.62, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.55 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    tilt.add(core);
    disposables.push(coreGeo, coreMat);

    function resize() {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the whole ring in frame on narrow stages
      camera.position.z = w / h < 1 ? 8.2 / (w / h) : 8.2;
      camera.updateProjectionMatrix();
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const pointer = { x: 0, y: 0 };
    function onPointerMove(e) {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }

    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; });
    io.observe(mount);

    const tmp = new THREE.Color();
    let display = targetRef.current;
    let spin = 0;
    let last = performance.now();
    let frame;

    function paint(dt) {
      display += (targetRef.current - display) * Math.min(1, dt * 9);
      if (Math.abs(display - shown) > 0.0015) sliceRing(display);

      spin += dt * 0.25;
      ring.rotation.z = spin;
      // particles orbit faster than the ring; colour = arc they currently sit over
      const boundary = Math.PI * 2 * display;
      for (let i = 0; i < PARTICLES; i++) {
        angles[i] += dt * speeds[i];
        const a = angles[i];
        positions[i * 3] = Math.cos(a) * radii[i];
        positions[i * 3 + 1] = Math.sin(a) * radii[i];
        const local = ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const c = local < boundary ? BLUE : PINK;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      dotsGeo.attributes.position.needsUpdate = true;
      dotsGeo.attributes.color.needsUpdate = true;

      core.rotation.x += dt * 0.4;
      core.rotation.y += dt * 0.6;
      core.scale.setScalar(1 + Math.sin(performance.now() / 600) * 0.05);
      coreMat.color.copy(tmp.copy(PINK).lerp(BLUE, display));

      tilt.rotation.y += (pointer.x * 0.45 - tilt.rotation.y) * Math.min(1, dt * 4);
      tilt.rotation.x += (pointer.y * 0.3 - tilt.rotation.x) * Math.min(1, dt * 4);

      renderer.render(scene, camera);
    }

    function tick(now) {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (onScreen) paint(dt);
    }

    sliceRing(display);
    paint(0);

    let stop = () => {};
    if (reduceMotion) {
      // no idle motion: only repaint when the split changes
      let prev = targetRef.current;
      const id = setInterval(() => {
        if (targetRef.current !== prev) {
          prev = targetRef.current;
          display = prev;
          paint(0);
        }
      }, 100);
      stop = () => clearInterval(id);
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      frame = requestAnimationFrame(tick);
    }

    return () => {
      stop();
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();
      io.disconnect();
      organicArc.geometry.dispose();
      paidArc.geometry.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  if (failed) return <div className="mix-ring-fallback" style={{ '--organic': `${organic}%` }} />;
  return <div className="mix-canvas" ref={mountRef} />;
}
