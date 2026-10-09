import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import HeroParticles from './home/HeroParticles';
import HeroProofCards from './home/HeroProofCards';

// three.js is ~180kb gzipped — keep it out of the entry chunk, the flat mark
// is a brief loading fallback while that chunk downloads
const HeroLogo3D = lazy(() => import('./HeroLogo3D'));

// The headline cycles through who we work for; each audience tints the background.
const AUDIENCES = [
  { word: 'everybody', tint: ['#f8228b', '#2e9df4', '#6e22b8'] },
  { word: 'restaurants', tint: ['#ff7a45', '#ffb020', '#f8228b'] },
  { word: 'spiritual leaders', tint: ['#f59e0b', '#fcd34d', '#e85d75'] },
  { word: 'clinics', tint: ['#14b8a6', '#38bdf8', '#34d399'] },
  { word: 'schools', tint: ['#2563eb', '#facc15', '#22c55e'] },
  { word: 'e-commerce brands', tint: ['#d946ef', '#6366f1', '#f8228b'] },
  { word: 'startups', tint: ['#6366f1', '#22d3ee', '#a855f7'] },
];
const ROTATE_MS = 2600;

function useAudience() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % AUDIENCES.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, []);
  return AUDIENCES[index];
}

export default function Hero() {
  const audience = useAudience();
  const stageRef = useRef(null);
  const [t1, t2, t3] = audience.tint;

  return (
    <section className="hero" style={{ '--t1': t1, '--t2': t2, '--t3': t3 }}>
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-blob hb-1"></span>
        <span className="hero-blob hb-2"></span>
        <span className="hero-blob hb-3"></span>
        <span className="hero-gridlines"></span>
        <HeroParticles anchorRef={stageRef} />
      </div>
      <div className="wrap hero-grid">
        <div>
          <Reveal as="span" immediate className="eyebrow hero-anim" style={{ '--hd': '0ms' }}>
            <span className="dot"></span>IT &amp; Digital Marketing, For Practically Everybody
          </Reveal>
          <Reveal as="h1" immediate className="hero-anim" style={{ '--hd': '90ms' }}>
            <span className="sr-only">IT &amp; Marketing for absolutely everybody.</span>
            <span aria-hidden="true">
              IT &amp; Marketing for{' '}
              <span className="hero-rotator">
                <span key={audience.word} className="hero-rotator-word grad">
                  {audience.word}.
                </span>
              </span>
            </span>
          </Reveal>
          <Reveal as="p" immediate className="lead hero-anim" style={{ '--hd': '200ms' }}>
            Restaurants. Religious organizations. Schools. Entrepreneurs. Public leaders.
            E-commerce brands. If you've got an audience to reach — or a website, app or system to build
            for them — we've probably done something like it, across India, Canada, the USA
            and Europe, with one team behind every project.
          </Reveal>
          <Reveal as="div" immediate className="hero-ctas hero-anim" style={{ '--hd': '300ms' }}>
            <Link to="/contact" className="btn btn-primary">
              Talk to our team →
            </Link>
            <Link to="/services" className="btn btn-ghost">
              See what we do
            </Link>
          </Reveal>
          <Reveal as="div" immediate className="hero-meta hero-anim" style={{ '--hd': '420ms' }}>
            <div className="hero-meta-item">
              <span className="num">Anyone, Really</span>
              <span className="lbl">Restaurants to e-commerce (and beyond)</span>
            </div>
            <div className="hero-meta-item">
              <span className="num">4 Regions</span>
              <span className="lbl">India, Canada, USA, Europe — no passport needed</span>
            </div>
            <div className="hero-meta-item">
              <span className="num">Actually Direct</span>
              <span className="lbl">Talk to a human, not a chatbot</span>
            </div>
          </Reveal>
        </div>
        <div className="hero-visual" ref={stageRef}>
        <Reveal as="div" immediate className="blend-stage hero-anim" style={{ '--hd': '150ms' }} aria-hidden="true">
          <Suspense
            fallback={
              <img
                className="hero-logo"
                src="/assets/logo-hero.webp"
                alt=""
                width="460"
                height="460"
                fetchPriority="high"
              />
            }
          >
            <HeroLogo3D />
          </Suspense>
        </Reveal>
        <HeroProofCards />
        </div>
      </div>
      <a href="#home-services" className="hero-scroll-cue" aria-label="Scroll to services">
        <span></span>
      </a>
    </section>
  );
}
