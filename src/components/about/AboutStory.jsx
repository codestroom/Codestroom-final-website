import { useEffect, useRef, useState } from 'react';
import '../../styles/about-documentary.css';

const CHAPTERS = [
  {
    year: '2019',
    title: 'Two laptops and a lot of nerve',
    desc: 'Codestroom started as two developers building websites at night for local businesses who had been quoted absurd numbers by "agencies". We charged less and cared more. Word travelled.',
    aside: 'Office: one kitchen table. Snacks: unlimited.',
  },
  {
    year: '2021',
    title: 'We learned to say no',
    desc: 'Growth got real, and so did the bad-fit projects. We started turning down work we could not do brilliantly. Revenue dipped for a quarter, then doubled. Turns out focus is a business strategy.',
    aside: 'First official no: a crypto casino. Still proud.',
  },
  {
    year: '2023',
    title: 'AI stopped being a buzzword',
    desc: 'While everyone was posting about LLMs, we were shipping them — retrieval systems, internal copilots, automated support that customers actually liked. Boring, production-grade, quietly transformative.',
    aside: 'Models trained: many. Demos that broke live: two.',
  },
  {
    year: '2024',
    title: 'Four countries, one Slack',
    desc: 'India, Canada, the USA and Europe. Different accents, same standards. We built a delivery process that survives timezones, holidays and the occasional heroic overnight deploy.',
    aside: 'Longest standup: 9 minutes. We are trying.',
  },
  {
    year: '2026',
    title: 'Still the same weirdos',
    desc: 'Bigger team, sharper craft, identical obsession: build the thing properly, explain it in plain English, and make the client look like a genius to their boss.',
    aside: 'You are here. Hi. Scroll on.',
  },
];

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];
const RUNTIME_S = 7 * 60 + 26; // the "film" runs 7:26 across the whole scroll

const pad = (n) => String(n).padStart(2, '0');
function timecode(p) {
  const total = p * RUNTIME_S;
  const frames = Math.floor((total % 1) * 24);
  return `00:${pad(Math.floor(total / 60))}:${pad(Math.floor(total % 60))}:${pad(frames)}`;
}

function useProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const total = el.offsetHeight - window.innerHeight;
      const top = -el.getBoundingClientRect().top;
      setP(total > 0 ? Math.min(1, Math.max(0, top / total)) : 0);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
  return p;
}

export default function AboutStory() {
  const ref = useRef(null);
  const p = useProgress(ref);
  const active = Math.min(CHAPTERS.length - 1, Math.floor(p * CHAPTERS.length));

  const jumpTo = (i) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + total * ((i + 0.35) / CHAPTERS.length), behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="doc about-story-section" id="story" style={{ '--n': CHAPTERS.length, '--p': p }}>
      <div className="doc-sticky">
        <div className="doc-screen">
          <span className="doc-grain" aria-hidden="true" />
          <span className="doc-vignette" aria-hidden="true" />

          <div className="doc-hud" aria-hidden="true">
            <span><i className="doc-rec" /> A Codestroom documentary</span>
            <span className="doc-tc">{timecode(p)}</span>
          </div>

          <div className="doc-intro">
            <span className="kicker">The origin story</span>
            <h2>
              Seven years, zero <span className="about-strike">pivots to blockchain</span>.
            </h2>
          </div>

          <ol className="doc-cards">
            {CHAPTERS.map((c, i) => (
              <li key={c.year} className={`doc-card ${i === active ? 'is-on' : ''}`} aria-hidden={i !== active}>
                <span className="doc-chapter">Chapter {ROMAN[i]}</span>
                <span className="doc-year">{c.year}</span>
                <h3 className="doc-title">{c.title}</h3>
                <p className="doc-sub"><span>{c.desc}</span></p>
                <p className="doc-note">Director&apos;s note — {c.aside}</p>
              </li>
            ))}
          </ol>

          <div className="doc-player">
            <div className="doc-scrub">
              <i className="doc-scrub-fill" />
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.year}
                  type="button"
                  className={`doc-mark ${i <= active ? 'is-past' : ''}`}
                  style={{ left: `${(i / CHAPTERS.length) * 100}%` }}
                  onClick={() => jumpTo(i)}
                  aria-label={`Chapter ${i + 1}: ${c.year}, ${c.title}`}
                >
                  <span>{c.year}</span>
                </button>
              ))}
            </div>
            <span className="doc-runtime">{timecode(p).slice(3, 8)} / {pad(Math.floor(RUNTIME_S / 60))}:{pad(RUNTIME_S % 60)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
