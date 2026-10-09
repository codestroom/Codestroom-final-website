import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HubIcon from '../services/hub/HubIcon';
import '../../styles/agency-switch.css';

/* "Flip the switch": the section starts as a dull, crooked "typical agency";
   flipping the switch turns the lights on and every card morphs into how we work.
   Each "ours" line matches a promise made elsewhere on the site — keep it that way. */

const ROWS = [
  { icon: 'chart', topic: 'Seeing progress', typical: 'Weekly status meetings that could have been an email.', ours: 'A live preview link — check progress any day you like.' },
  { icon: 'users', topic: 'Who you talk to', typical: 'Chasing an account manager who “will check with the team”.', ours: 'Talk directly to the people doing the work, on WhatsApp or a call.' },
  { icon: 'shield', topic: 'Pricing', typical: 'Hourly billing, change fees and surprise invoices.', ours: 'Scope and price agreed before we start. No surprises.' },
  { icon: 'layers', topic: 'Website + marketing', typical: 'Your web agency blames your marketing agency (and back).', ours: 'One team for both — nothing falls between the cracks.' },
  { icon: 'clock', topic: 'Getting answers', typical: '“We’ll get back to you” … next week.', ours: 'A real reply from a real person within 48 hours.' },
  { icon: 'growth', topic: 'After launch', typical: 'Hand-over, then silence.', ours: 'We stay on to fix, improve and grow it with you.' },
];

export default function AgencySwitch() {
  const [on, setOn] = useState(false);
  const touched = useRef(false);
  const ref = useRef(null);

  // flip itself once, shortly after the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    let timer;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        timer = setTimeout(() => { if (!touched.current) setOn(true); }, 1100);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  const flip = () => {
    touched.current = true;
    setOn((v) => !v);
  };

  return (
    <section ref={ref} className={`as ${on ? 'is-on' : ''}`} aria-labelledby="as-title">
      <div className="wrap">
        <div className="as-head">
          <span className="as-kicker">Same budget. Very different experience.</span>
          <h2 id="as-title">Agencies, but <span>painless.</span></h2>
        </div>

        <div className="as-switch-row">
          <span className={`as-side ${!on ? 'is-active' : ''}`}>😩 Typical agency</span>
          <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label="Switch between a typical agency and Codestroom"
            className="as-switch"
            onClick={flip}
          >
            <span className="as-thumb"><HubIcon name={on ? 'spark' : 'clock'} size={20} /></span>
          </button>
          <span className={`as-side ${on ? 'is-active' : ''}`}>⚡ Codestroom</span>
        </div>
        <p className="as-hint" aria-live="polite">{on ? 'Lights on. This is how we work.' : 'Flip the switch →'}</p>

        <div className="as-grid">
          {ROWS.map((r, i) => (
            <article key={r.topic} className="as-card" style={{ '--i': i }}>
              <div className="as-card-top">
                <span className="as-icon"><HubIcon name={r.icon} size={18} /></span>
                <span className="as-topic">{r.topic}</span>
                <span className="as-status" aria-hidden="true">{on ? '✓' : '✕'}</span>
              </div>
              <p className="as-text">
                <span className="as-typical" aria-hidden={on}>{r.typical}</span>
                <span className="as-ours" aria-hidden={!on}>{r.ours}</span>
              </p>
            </article>
          ))}
        </div>

        <div className="as-foot">
          <Link to="/contact" className="btn btn-gradient">Work with the painless kind →</Link>
        </div>
      </div>
    </section>
  );
}
