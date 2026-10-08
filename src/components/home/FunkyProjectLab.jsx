import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal';
import { tiltLeave, tiltMove } from './useSpotlight';

// three.js only downloads once the section is close to the viewport
const MixScene3D = lazy(() => import('./MixScene3D'));

const PRESETS = [
  { name: 'Organic-led', icon: '🌱', paid: 25 },
  { name: 'Balanced', icon: '⚡', paid: 50 },
  { name: 'Paid-led', icon: '🚀', paid: 75 },
];

// how each side of the budget splits across its channels
const CHANNELS = [
  { side: 'organic', name: 'SEO & local maps', icon: '📍', share: 0.55 },
  { side: 'organic', name: 'Content & social', icon: '🎬', share: 0.45 },
  { side: 'paid', name: 'Meta ads', icon: '📣', share: 0.55 },
  { side: 'paid', name: 'Google ads & retargeting', icon: '🎯', share: 0.45 },
];

function planFor(paid) {
  if (paid < 38) {
    return {
      title: 'The Organic Flywheel',
      icon: '🌿',
      readout:
        'This plan leans into content, local SEO and community trust — building visibility that compounds over time.',
      sprint: 'Sprint 1 · Technical SEO & authority engine · 2–3 weeks',
    };
  }
  if (paid > 62) {
    return {
      title: 'The Growth Rocket',
      icon: '🚀',
      readout:
        'This plan leans into ads and performance campaigns — built for fast, measurable results.',
      sprint: 'Sprint 1 · High-converting funnel & ad matrix · 7–10 days',
    };
  }
  return {
    title: 'The Golden Ratio',
    icon: '⚡',
    readout: 'Organic content and paid campaigns working together from the same strategy.',
    sprint: 'Sprint 1 · Content + performance pilot · 14 days',
  };
}

function useNearViewport() {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, near];
}

export default function FunkyProjectLab() {
  const [paid, setPaid] = useState(50);
  const organic = 100 - paid;
  const plan = planFor(paid);
  const [stageRef, near] = useNearViewport();

  return (
    <section id="blend-lab" className="funky-lab-section">
      <div className="wrap">
        <Reveal className="funky-section-header">
          <div className="funky-pill-badge">
            <span className="pulsing-neon-dot"></span>
            <span>STRATEGY SYNTHESIZER</span>
          </div>
          <h2 className="funky-title">Drag to find your marketing mix. No math required.</h2>
          <p className="funky-subtitle">
            Every business leans differently toward organic trust-building and paid performance.
            Slide to see what your first plan would look like.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={100} className="mix-stage">
          <div className="mix-stage-grid" aria-hidden="true"></div>

          {/* 3d split visual */}
          <div className="mix-visual" ref={stageRef}>
            {near ? (
              <Suspense fallback={<div className="mix-ring-fallback" style={{ '--organic': `${organic}%` }} />}>
                <MixScene3D organic={organic} />
              </Suspense>
            ) : (
              <div className="mix-ring-fallback" style={{ '--organic': `${organic}%` }} />
            )}
            <div className="mix-visual-center">
              <strong>
                {organic}
                <span>/</span>
                {paid}
              </strong>
              <small>organic / paid</small>
            </div>
            <span className="mix-float-chip chip-organic">🌱 Organic {organic}%</span>
            <span className="mix-float-chip chip-paid">🚀 Paid {paid}%</span>
          </div>

          {/* live plan */}
          <div className="mix-info" onPointerMove={tiltMove} onPointerLeave={tiltLeave}>
            <span className="mix-plan-kicker">
              <span className="mix-live-dot"></span>Your plan, live
            </span>
            <h3 key={plan.title} className="mix-plan-title swap-in">
              <span className="mix-plan-icon">{plan.icon}</span> {plan.title}
            </h3>
            <p key={plan.readout} className="mix-readout swap-in">{plan.readout}</p>

            <div className="mix-meters">
              <div className="mix-meter">
                <div className="mix-meter-row">
                  <span>⚡ Speed to results</span>
                </div>
                <div className="mix-meter-track">
                  <span className="meter-fast" style={{ width: `${paid}%` }}></span>
                </div>
              </div>
              <div className="mix-meter">
                <div className="mix-meter-row">
                  <span>📈 Long-term compounding</span>
                </div>
                <div className="mix-meter-track">
                  <span className="meter-compound" style={{ width: `${organic}%` }}></span>
                </div>
              </div>
            </div>

            <ul className="mix-channels">
              {CHANNELS.map((c) => {
                const pct = Math.round((c.side === 'organic' ? organic : paid) * c.share);
                return (
                  <li key={c.name} className={`mix-channel mix-channel-${c.side}`}>
                    <span className="mix-channel-icon">{c.icon}</span>
                    <span className="mix-channel-name">{c.name}</span>
                    <strong className="mix-channel-pct">{pct}%</strong>
                    <span className="mix-channel-fill" style={{ width: `${pct * 2}%` }}></span>
                  </li>
                );
              })}
            </ul>

            <div className="mix-plan-foot">
              <span key={plan.sprint} className="mix-sprint swap-in">{plan.sprint}</span>
              <Link to="/contact" className="btn btn-gradient">
                Build this plan →
              </Link>
            </div>
          </div>

          {/* controls */}
          <div className="mix-console">
            <div className="mix-console-num num-organic">
              <span>{organic}%</span>
              <small>Organic</small>
            </div>
            <div className="mix-console-slider">
              <input
                type="range"
                className="mix-range"
                min={15}
                max={85}
                step={1}
                value={paid}
                onChange={(e) => setPaid(Number(e.target.value))}
                style={{ '--fill': `${((paid - 15) / 70) * 100}%` }}
                aria-label="Balance between organic and paid marketing"
                aria-valuetext={`${organic}% organic, ${paid}% paid`}
              />
              <div className="mix-presets" role="group" aria-label="Quick presets">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    className={`mix-preset ${paid === p.paid ? 'active' : ''}`}
                    aria-pressed={paid === p.paid}
                    onClick={() => setPaid(p.paid)}
                  >
                    <span className="mix-preset-icon">{p.icon}</span>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="mix-console-num num-paid">
              <span>{paid}%</span>
              <small>Paid</small>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
