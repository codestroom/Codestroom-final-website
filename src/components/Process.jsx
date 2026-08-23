import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const STEPS = [
  {
    title: 'Discover',
    desc: 'We snoop around your business, audience and current marketing (politely) to find where the biggest opportunities are hiding.',
    tint: 'grad-1',
    icon: (
      <svg {...iconProps}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M19 19l-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: 'Design the roadmap',
    desc: 'A single plan covering channels, content and campaigns — with milestones you can actually hold us to.',
    tint: 'grad-2',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M15.2 8.8l-2 4.4-4.4 2 2-4.4 4.4-2z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Build & launch',
    desc: 'Campaigns launch in focused sprints — real creative, live ads, actual results. Not just slide decks and good vibes.',
    tint: 'grad-3',
    icon: (
      <svg {...iconProps}>
        <path d="M12 2.5c2.4 1.5 4.3 4.9 4.3 8.6 0 2-.9 3.8-.9 3.8l-3.4 3.4-3.4-3.4s-.9-1.8-.9-3.8c0-3.7 1.9-7.1 4.3-8.6z" />
        <circle cx="12" cy="10.3" r="1.7" />
        <path d="M9 16.3l-2.3 2.3M15 16.3l2.3 2.3" />
      </svg>
    ),
  },
  {
    title: 'Measure & compound',
    desc: 'Post-launch, we keep optimizing against real metrics — performance, conversion, retention — because "set it and forget it" is how marketing budgets go to die.',
    tint: 'grad-1',
    icon: (
      <svg {...iconProps}>
        <path d="M3.5 16.5l5.5-5.5 4 4 7.5-8.5" />
        <path d="M14.8 6.5H20.5V12.2" />
      </svg>
    ),
  },
];

export default function Process() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let raf = null;
    function update() {
      raf = null;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.7;
      const end = vh * 0.3;
      const range = rect.height + start - end;
      const traveled = start - rect.top;
      const p = Math.max(0, Math.min(1, traveled / range));
      setProgress(p);
    }
    function onScroll() {
      if (raf === null) raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="process">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="kicker">How we work</span>
          <h1>One engagement, four checkpoints.</h1>
          <p>
            Every campaign runs through the same disciplined loop — no mystery, no ghosting, no
            "let's circle back next quarter." Scroll down. Watch the route light up.
          </p>
        </Reveal>

        <div className="checkpoint-track" ref={trackRef}>
          <div className="checkpoint-line">
            <div className="checkpoint-line-fill" style={{ height: `${progress * 100}%` }} />
          </div>
          <div
            className="checkpoint-marker"
            style={{ top: `${progress * 100}%`, opacity: progress > 0.01 && progress < 0.995 ? 1 : 0 }}
          />

          {STEPS.map((step, i) => {
            const threshold = i / (STEPS.length - 1);
            const reached = progress >= threshold - 0.02;
            return (
              <div
                key={step.title}
                className={`checkpoint-item ${i % 2 === 0 ? 'side-right' : 'side-left'} ${reached ? 'reached' : ''}`}
              >
                <div className={`checkpoint-badge ${step.tint}`}>
                  <div className="checkpoint-icon">{step.icon}</div>
                </div>
                <div className="checkpoint-content">
                  <span className="checkpoint-flag">Checkpoint {String(i + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
