import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CASE_STUDIES, TOTAL_FOLLOWERS } from '../../data/caseStudies';
import { LIVE_SITES } from '../../data/liveSites';
import '../../styles/receipts.css';

/* "Receipts, not vibes" — taken literally: each number is a printed receipt
   that links to its proof. Every figure is computed from real client data
   (caseStudies.js / liveSites.js) or is a stated promise; the one joke says so. */

const featured = CASE_STUDIES.find((c) => c.before);

const RECEIPTS = [
  {
    no: '001',
    value: `${Math.floor(TOTAL_FOLLOWERS / 1000)}K+`,
    label: 'Instagram followers',
    lines: CASE_STUDIES.map((c) => [c.name, `${Math.round((c.now || c.after).followers / 1000)}K`]),
    note: 'on accounts we manage today',
    proof: { to: '/portfolio#digital', label: 'See the accounts' },
  },
  featured && {
    no: '002',
    value: `${(featured.after.followers / featured.before.followers).toFixed(1)}×`,
    label: `growth in ${featured.period}`,
    lines: [['Before', featured.before.followers.toLocaleString('en-US')], ['After', featured.after.followers.toLocaleString('en-US')]],
    note: featured.name,
    proof: { to: `/portfolio#${featured.slug}`, label: 'See the case study' },
  },
  {
    no: '003',
    value: String(LIVE_SITES.length),
    label: 'client websites live',
    lines: LIVE_SITES.map((s) => [s.domain, '✓']),
    note: 'open any of them right now',
    proof: { to: '/portfolio#development', label: 'See the websites' },
  },
  {
    no: '004',
    value: '48h',
    label: 'reply promise',
    lines: [['Every message', 'answered'], ['By', 'a real person']],
    note: 'no bots, no auto-replies',
    proof: { to: '/contact', label: 'Test us' },
  },
  {
    no: '005',
    value: '4',
    label: 'regions we work in',
    lines: [['India', '✓'], ['Canada', '✓'], ['USA', '✓'], ['Europe', '✓']],
    note: 'calls planned around your time zone',
    proof: { to: '/global-reach', label: 'Where we work' },
  },
  {
    no: '006',
    value: '∞',
    label: 'cups of chai',
    lines: [['Morning', '2'], ['Deadline day', 'lost count']],
    note: 'the only number on this page we can’t prove',
    joke: true,
  },
].filter(Boolean);

export default function AboutStats() {
  const ref = useRef(null);
  const [printed, setPrinted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setPrinted(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPrinted(true);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="about-stats-section">
      <div className="wrap">
        <div className="about-section-head">
          <span className="kicker">Numbers we are weirdly proud of</span>
          <h2>
            Receipts, <span className="about-squiggle">not vibes</span>.
          </h2>
        </div>

        <div ref={ref} className={`rc-grid ${printed ? 'is-printed' : ''}`}>
          {RECEIPTS.map((r, i) => (
            <article key={r.no} className={`rc ${r.joke ? 'rc--joke' : ''}`} style={{ '--i': i }}>
              <div className="rc-paper">
                <div className="rc-top">
                  <span>CODESTROOM</span>
                  <span>#{r.no}</span>
                </div>
                <div className="rc-value">{r.value}</div>
                <div className="rc-label">{r.label}</div>
                <ul className="rc-lines">
                  {r.lines.map(([a, b]) => (
                    <li key={a}><span>{a}</span><i /><span>{b}</span></li>
                  ))}
                </ul>
                <p className="rc-note">{r.note}</p>
                {r.proof ? (
                  <Link to={r.proof.to} className="rc-proof">{r.proof.label} →</Link>
                ) : (
                  <span className="rc-proof rc-proof--none">No proof available ☕</span>
                )}
                <span className="rc-stamp" aria-hidden="true">{r.joke ? 'Unaudited' : 'Verified'}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
