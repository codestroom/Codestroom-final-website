import { useEffect, useState } from 'react';
import { LOGO_OUTLINES } from './logoOutlines';
import '../styles/preloader.css';

/* Logo "big bang": the pink and blue halves fly in and collide into the mark
   (multiplying to purple where they overlap, like the real logo), a shockwave
   bursts, the name rises in, then the screen splits along the logo's diagonal.
   Drawn as inline SVG — no image request. Total ≈ 1.6s. */

const LEAVE_AT = 1150;
const GONE_AT = 1750;

const path = (pts) => `M${pts.map(([x, y]) => `${x},${-y}`).join('L')}Z`;
const PINK = path(LOGO_OUTLINES.pink);
const BLUE = path(LOGO_OUTLINES.blue);
const NAME = 'codestroom'.split('');
const SPARKS = Array.from({ length: 12 }, (_, i) => i);

export default function Preloader() {
  const [phase, setPhase] = useState('in'); // in → leave → gone
  // angle of the panel cut (from 82% down on the left to 18% on the right) for this screen
  const [cut] = useState(() =>
    typeof window === 'undefined' ? 26 : (Math.atan((0.64 * window.innerHeight) / window.innerWidth) * 180) / Math.PI,
  );

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const leave = setTimeout(() => setPhase('leave'), reduce ? 300 : LEAVE_AT);
    const gone = setTimeout(() => setPhase('gone'), reduce ? 700 : GONE_AT);
    return () => {
      clearTimeout(leave);
      clearTimeout(gone);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div className={`pl ${phase === 'leave' ? 'is-leaving' : ''}`} style={{ '--cut': `${cut}deg` }} aria-hidden="true">
      <span className="pl-panel pl-panel--a" />
      <span className="pl-panel pl-panel--b" />
      <span className="pl-seam" />

      <div className="pl-center">
        <div className="pl-mark">
          <span className="pl-ring" />
          {SPARKS.map((i) => (
            <span key={i} className="pl-spark" style={{ '--a': `${i * 30}deg`, '--d': i % 2 ? '120px' : '160px' }} />
          ))}
          <svg className="pl-half pl-half--pink" viewBox="-460 -410 940 820"><path d={PINK} /></svg>
          <svg className="pl-half pl-half--blue" viewBox="-460 -410 940 820"><path d={BLUE} /></svg>
        </div>
        <div className="pl-name">
          {NAME.map((ch, i) => (
            <span key={i} style={{ '--i': i }}>{ch}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
