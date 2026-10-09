import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';
import SEOHead from '../components/SEOHead';
import ResultsWall from '../components/work/ResultsWall';
import LiveSites from '../components/work/LiveSites';
import BuildBento from '../components/work/BuildBento';
import { tiltLeave, tiltMove } from '../components/home/useSpotlight';
import { CAPABILITIES, PORTFOLIO_SEGMENTS } from '../data/portfolioData';
import { CASE_STUDIES, TOTAL_FOLLOWERS } from '../data/caseStudies';
import '../styles/portfolio.css';

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Codestroom Portfolio',
  description:
    'Codestroom work in two segments: development (AI, web, mobile, e-commerce) and digital marketing (social, SEO, ads, content).',
  url: 'https://codestroom.com/portfolio',
};

const featuredCase = CASE_STUDIES.find((c) => c.before);

const HERO_STATS = [
  { val: `${Math.floor(TOTAL_FOLLOWERS / 1000)}K+`, lbl: 'followers on accounts we manage' },
  { val: `${(featuredCase.after.followers / featuredCase.before.followers).toFixed(1)}×`, lbl: `growth in ${featuredCase.period}` },
  { val: '48h', lbl: 'reply on new briefs' },
];

const DEV_PROCESS = [
  { step: 'Discover', text: 'We map what you need and what it should cost.' },
  { step: 'Design', text: 'Clickable screens before a line of code.' },
  { step: 'Build', text: 'Weekly demos on a live staging link.' },
  { step: 'Launch', text: 'Deployed, tested and handed over.' },
  { step: 'Support', text: 'We stay on to fix, improve and scale.' },
];

const DIGITAL_SERVICES = [
  { icon: '📍', title: 'Local SEO & Google Business', text: 'Show up when people nearby search for what you do.' },
  { icon: '📣', title: 'Paid social & search', text: 'Meta and Google campaigns tuned for calls, bookings and sales.' },
  { icon: '🎬', title: 'Content & creative', text: 'Content calendars, reels and creative that sound like you.' },
  { icon: '📊', title: 'Tracking & reporting', text: 'GA4 set up properly, and plain-English reports on what works.' },
];

const devItems = CAPABILITIES.filter((c) => c.segment === 'development');
const digitalItem = CAPABILITIES.find((c) => c.segment === 'digital');
const devStack = [...new Set(devItems.flatMap((c) => c.stack))];

function segmentFromHash(hash) {
  const id = hash.replace('#', '');
  if (PORTFOLIO_SEGMENTS.some((s) => s.id === id)) return id;
  // a client's slug (e.g. linked from the home hero's proof cards) lives under Digital
  if (CASE_STUDIES.some((c) => c.slug === id)) return 'digital';
  return 'development';
}

function DevelopmentSegment() {
  return (
    <>
      <LiveSites />

      <BuildBento items={devItems} />

      <div className="pf-stack-strip" aria-label="Technologies we build with">
        <div className="pf-stack-track">
          {[...devStack, ...devStack].map((tech, i) => (
            <span key={`${tech}-${i}`} aria-hidden={i >= devStack.length}>{tech}</span>
          ))}
        </div>
      </div>

      <Reveal className="pf-process">
        <h3>How a build runs</h3>
        <ol>
          {DEV_PROCESS.map((p, i) => (
            <li key={p.step} style={{ '--i': i }}>
              <span className="pf-process-num">{String(i + 1).padStart(2, '0')}</span>
              <strong>{p.step}</strong>
              <span>{p.text}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </>
  );
}

function DigitalSegment() {
  return (
    <>
      <div className="pf-digital-grid">
        {DIGITAL_SERVICES.map((s, i) => (
          <Reveal
            key={s.title}
            delay={i * 90}
            variant="scale"
            className="pf-digital-card"
            onPointerMove={tiltMove}
            onPointerLeave={tiltLeave}
          >
            <span className="pf-digital-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </Reveal>
        ))}
      </div>

      {digitalItem && (
        <div className="pf-tags pf-tags--center">
          {digitalItem.stack.map((tech) => (
            <span key={tech} className="pf-tag">{tech}</span>
          ))}
        </div>
      )}

      <ResultsWall
        kicker="Client results"
        title={<>Numbers you can <em>verify.</em></>}
        lead="Spiritual leaders, clinics and community brands — growing on Instagram with Codestroom."
      />
    </>
  );
}

export default function PortfolioPage() {
  const { hash } = useLocation();
  const [segment, setSegment] = useState(() => segmentFromHash(hash));
  const switchRef = useRef(null);

  useEffect(() => {
    setSegment(segmentFromHash(hash));
  }, [hash]);

  const choose = (id) => {
    setSegment(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  const current = PORTFOLIO_SEGMENTS.find((s) => s.id === segment);

  return (
    <>
      <SEOHead
        title="Portfolio | Codestroom"
        description="Codestroom's work in two segments: development (AI agents, web and SaaS, mobile apps, e-commerce) and digital marketing (social, SEO, ads and content)."
        canonicalPath="/portfolio"
        schemas={[portfolioSchema]}
      />

      <PageHero
        kicker="Our work"
        title="What we build. How we grow it."
        lead="Two segments, one team. Development covers the websites, apps and AI we build; Digital covers the accounts we grow — with real numbers you can check."
        stats={HERO_STATS}
      />

      <section className={`pf pf--${segment}`}>
        <div className="wrap">
          <div className="pf-switch" ref={switchRef} role="tablist" aria-label="Portfolio segments">
            {PORTFOLIO_SEGMENTS.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                id={`pf-tab-${s.id}`}
                aria-selected={segment === s.id}
                aria-controls="pf-panel"
                className={`pf-switch-btn pf-switch-btn--${s.id} ${segment === s.id ? 'is-active' : ''}`}
                onClick={() => choose(s.id)}
              >
                <span className="pf-switch-icon" aria-hidden="true">{s.icon}</span>
                <span className="pf-switch-text">
                  <strong>{s.label}</strong>
                  <small>{s.tagline}</small>
                </span>
              </button>
            ))}
            <span className="pf-switch-glider" aria-hidden="true" />
          </div>

          <div
            id="pf-panel"
            role="tabpanel"
            aria-labelledby={`pf-tab-${segment}`}
            className="pf-panel"
            key={segment}
          >
            <div className="pf-panel-head">
              <span className="pf-kicker">{current.label}</span>
              <h2>
                {segment === 'development' ? (
                  <>Built to <em>last</em>, not just to demo.</>
                ) : (
                  <>Growth you can <em>actually see.</em></>
                )}
              </h2>
              <p>
                {segment === 'development'
                  ? 'What our engineering team is set up to build — the approach, what you get, and the stack behind it.'
                  : 'The marketing we run for businesses and public figures, and the real accounts it has grown.'}
              </p>
            </div>

            {segment === 'development' ? <DevelopmentSegment /> : <DigitalSegment />}
          </div>

          <Reveal className="pf-crosslink">
            <div>
              <h3>
                {segment === 'development' ? 'Got something to build?' : 'Want results like these?'}
              </h3>
              <p>
                Tell us what you&apos;re working on — we&apos;ll give you a straight answer on scope and approach.
              </p>
            </div>
            <div className="pf-crosslink-actions">
              <Link to="/contact" className="btn btn-gradient">Talk to our team →</Link>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  choose(segment === 'development' ? 'digital' : 'development');
                  switchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                See {segment === 'development' ? 'Digital' : 'Development'} work
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
