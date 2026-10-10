import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CASE_STUDIES } from '../../data/caseStudies';
import { LIVE_SITES, siteShot } from '../../data/liveSites';
import '../../styles/scroll-story.css';

/* A statement that lights up word by word as you scroll, with real work set
   inline in the sentence (site thumbnails, client photos, follower counts). */

const caseBy = (slug) => CASE_STUDIES.find((c) => c.slug === slug);
const siteBy = (slug) => LIVE_SITES.find((s) => s.slug === slug);
const fmtK = (n) => (n >= 10000 ? `${Math.round(n / 1000)}K` : n.toLocaleString('en-US'));

// text pieces, inline media, and highlighted phrases, in reading order
const STORY = [
  'We’re a small team that builds websites',
  { site: 'sanjhaghar' },
  'apps and software — and then grows them on Instagram',
  { insta: 'sanjha-ghar' },
  'and Google. From a clinic in Samrala',
  { insta: 'pannu-vaid', photoOnly: true },
  'to movers in Detroit,',
  { site: 'ancientmovers' },
  { hl: 'one team does it all.' },
  'No jargon,',
  { hl: 'price agreed first,' },
  'and a real person on the other end — always.',
];

function Media({ item }) {
  if (item.site) {
    const s = siteBy(item.site);
    if (!s) return null;
    return (
      <a className="ss-media ss-media--site" href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} website`}>
        <img src={siteShot(s.slug, 'desktop')} alt="" loading="lazy" />
      </a>
    );
  }
  const c = caseBy(item.insta);
  if (!c) return null;
  const live = c.now || c.after;
  return (
    <Link className={`ss-media ss-media--insta ${item.photoOnly ? 'is-photo' : ''}`} to={`/portfolio#${c.slug}`} aria-label={`${c.name} results`}>
      <img src={c.avatar} alt="" loading="lazy" />
      {!item.photoOnly && <b>{fmtK(live.followers)}</b>}
    </Link>
  );
}

// flatten into tokens: each word is its own token so it can light up alone
const TOKENS = STORY.flatMap((piece, p) => {
  if (typeof piece === 'string') return piece.split(' ').map((w, k) => ({ word: w, key: `${p}-${k}` }));
  if (piece.hl) return piece.hl.split(' ').map((w, k) => ({ word: w, hl: true, key: `${p}-${k}` }));
  return [{ media: piece, key: `m-${p}` }];
});

export default function AboutMarquee() {
  const ref = useRef(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setLit(TOKENS.length);
      return undefined;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // starts as the block enters the lower part of the screen, done by the time it reaches the upper third
      const start = vh * 0.85;
      const end = vh * 0.3;
      const p = (start - r.top) / (start - end + r.height * 0.2);
      setLit(Math.round(Math.min(1, Math.max(0, p)) * TOKENS.length));
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
  }, []);

  return (
    <section className="ss" aria-label="Who we are">
      <div className="wrap">
        <span className="ss-kicker">In one breath</span>
        <p className="ss-text" ref={ref}>
          {TOKENS.map((t, i) =>
            t.media ? (
              <span key={t.key} className={`ss-slot ${i < lit ? 'is-lit' : ''}`}>
                <Media item={t.media} />
              </span>
            ) : (
              <span key={t.key} className={`ss-word ${t.hl ? 'is-hl' : ''} ${i < lit ? 'is-lit' : ''}`}>
                {t.word}{' '}
              </span>
            ),
          )}
        </p>
      </div>
    </section>
  );
}
