import { useEffect, useRef, useState } from 'react';
import Reveal from '../Reveal';
import HubIcon from '../services/hub/HubIcon';
import { CASE_STUDIES, instagramUrl } from '../../data/caseStudies';
import '../../styles/results.css';

// Instagram-style count: 9,430 · 20.6K · 1.2M
function formatCount(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 10000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return Math.round(n).toLocaleString('en-US');
}

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

// Shows the real number until it scrolls into view, then counts up to it —
// so crawlers and no-animation environments never see a misleading start value.
function CountUp({ from = 0, to, run, duration = 1800 }) {
  const [value, setValue] = useState(to);
  useEffect(() => {
    if (!run) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(to);
      return undefined;
    }
    let raf;
    setValue(from);
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, from, to, duration]);
  return <>{formatCount(value)}</>;
}

function Profile({ c, run }) {
  const live = c.now || c.after;
  return (
    <div className="ig">
      <div className="ig-top">
        <span className="ig-ring">
          <img src={c.avatar} alt="" width="76" height="76" loading="lazy" />
        </span>
        <div className="ig-stats">
          <div><strong>{formatCount(live.posts)}</strong><span>posts</span></div>
          <div className="is-hot">
            <strong><CountUp from={c.before?.followers || 0} to={live.followers} run={run} /></strong>
            <span>followers</span>
          </div>
          <div><strong>{live.following}</strong><span>following</span></div>
        </div>
      </div>
      <div className="ig-bio">
        <strong>{c.name}</strong>
        <span className="ig-cat">{c.category}</span>
        <span>{c.bio}</span>
        <span className={`ig-managed ${run ? 'is-circled' : ''}`}>
          Managed by <b>@codestroom</b>
          <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M8 34 C 10 8, 120 2, 186 16 C 204 22, 196 50, 150 54 C 90 60, 12 56, 6 30 C 4 20, 30 10, 60 8" />
          </svg>
        </span>
      </div>
      <div className="ig-handle">@{c.handle}</div>
    </div>
  );
}

function Actions({ c, onProof }) {
  return (
    <div className="res-actions">
      <button type="button" className="res-btn" onClick={() => onProof(c)}>
        <HubIcon name="file" size={15} /> See original post
      </button>
      <a className="res-btn res-btn--ig" href={instagramUrl(c.handle)} target="_blank" rel="noopener noreferrer">
        <HubIcon name="instagram" size={15} /> Open on Instagram ↗
      </a>
    </div>
  );
}

function Featured({ c, onProof }) {
  const [ref, inView] = useInView();
  const growth = c.after.followers / c.before.followers;
  const gained = c.after.followers - c.before.followers;
  const pct = Math.round((c.before.followers / c.after.followers) * 100);

  return (
    <div ref={ref} id={c.slug} className={`res-featured ${inView ? 'is-in' : ''}`}>
      <Profile c={c} run={inView} />

      <div className="res-compare">
        <span className="res-label">Case study · {c.period}</span>
        <h3>{c.headline}</h3>

        <div className="res-bars">
          <div className="res-bar-row">
            <span>Before</span>
            <div className="res-bar"><i style={{ '--w': `${pct}%` }} /></div>
            <strong>{c.before.followers.toLocaleString('en-US')}</strong>
          </div>
          <div className="res-bar-row is-after">
            <span>After</span>
            <div className="res-bar"><i style={{ '--w': '100%' }} /></div>
            <strong><CountUp from={c.before.followers} to={c.after.followers} run={inView} /></strong>
          </div>
        </div>

        <div className="res-kpis">
          <div className="res-kpi-big">
            <strong>{growth.toFixed(1)}×</strong>
            <span>followers</span>
          </div>
          <div><strong>+{gained.toLocaleString('en-US')}</strong><span>new followers</span></div>
          <div><strong>+{c.after.posts - c.before.posts}</strong><span>new posts</span></div>
        </div>

        <ul className="res-work">
          {c.work.map((w) => <li key={w}><HubIcon name="check" size={13} /> {w}</li>)}
        </ul>
        <Actions c={c} onProof={onProof} />
      </div>
    </div>
  );
}

function Card({ c, index, onProof }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} id={c.slug} className={`res-card ${inView ? 'is-in' : ''}`} style={{ '--d': `${index * 120}ms` }}>
      <Profile c={c} run={inView} />
      <div className="res-card-body">
        <span className="res-label">{c.period}</span>
        <h3>{c.headline}</h3>
        <ul className="res-work">
          {c.work.map((w) => <li key={w}><HubIcon name="check" size={13} /> {w}</li>)}
        </ul>
        <Actions c={c} onProof={onProof} />
      </div>
    </div>
  );
}

function ProofModal({ c, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="proof" role="dialog" aria-modal="true" aria-label={`Original post: ${c.name}`}>
      <button type="button" className="proof-backdrop" aria-label="Close" onClick={onClose} />
      <figure className="proof-frame">
        <img src={c.proof} alt={`Codestroom post announcing ${c.name}'s Instagram growth`} />
        <figcaption>
          {c.proofNote}{' '}
          <a href={instagramUrl(c.handle)} target="_blank" rel="noopener noreferrer">Check the live account ↗</a>
        </figcaption>
        <button ref={closeRef} type="button" className="proof-close" onClick={onClose} aria-label="Close">×</button>
      </figure>
    </div>
  );
}

export default function ResultsWall({ kicker = 'Real results', title, lead, id }) {
  const [proof, setProof] = useState(null);
  const featured = CASE_STUDIES.find((c) => c.before);
  const rest = CASE_STUDIES.filter((c) => c !== featured);

  return (
    <section id={id} className="results">
      <div className="wrap">
        <Reveal className="results-head">
          <span className="res-pill"><HubIcon name="instagram" size={14} /> {kicker}</span>
          <h2>{title}</h2>
          {lead && <p>{lead}</p>}
        </Reveal>

        {featured && <Featured c={featured} onProof={setProof} />}

        <div className="res-grid">
          {rest.map((c, i) => <Card key={c.slug} c={c} index={i} onProof={setProof} />)}
        </div>

        <p className="res-note">
          Profile counts checked live on Instagram in October 2026 (Instagram rounds them, e.g. 21K). The 6-month
          before/after comes from our report for Sukhdarshan Muni Ji. Open any account to see today&apos;s numbers.
        </p>
      </div>

      {proof && <ProofModal c={proof} onClose={() => setProof(null)} />}
    </section>
  );
}
