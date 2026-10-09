import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_OUTLINES } from './logoOutlines';
import '../styles/footer.css';

const EMAIL = 'contact@codestroom.com';

// The four regions we serve, with live local time.
const CITIES = [
  { name: 'India', tz: 'Asia/Kolkata' },
  { name: 'Toronto', tz: 'America/Toronto' },
  { name: 'New York', tz: 'America/New_York' },
  { name: 'London', tz: 'Europe/London' },
];

const LINKS = [
  {
    title: 'Build',
    items: [
      ['Websites', '/services/web-development'],
      ['Online stores', '/services/ecommerce'],
      ['Mobile apps', '/services/mobile-apps'],
      ['Custom software', '/services/custom-software'],
      ['AI automation', '/services/ai-solutions'],
    ],
  },
  {
    title: 'Grow',
    items: [
      ['Digital marketing & SEO', '/services/digital-marketing'],
      ['Content & design', '/services/creative-design'],
      ['All services', '/services'],
      ['Real results', '/portfolio'],
    ],
  },
  {
    title: 'Company',
    items: [
      ['About us', '/about'],
      ['How we work', '/process'],
      ['Where we work', '/global-reach'],
      ['For startups', '/industries/startups'],
      ['Blog', '/blog'],
    ],
  },
];

const WORD = 'codestroom'.split('');

// SVG path for one half of the logo (outlines use y-up; SVG is y-down)
const shapePath = (pts) => `M${pts.map(([x, y]) => `${x},${-y}`).join('L')}Z`;
const PINK_PATH = shapePath(LOGO_OUTLINES.pink);
const BLUE_PATH = shapePath(LOGO_OUTLINES.blue);

/* The footer's background is the logo itself: the pink and blue halves, huge,
   blending like the real mark (purple where they overlap), drifting and
   following the cursor. */
function LogoField() {
  return (
    <div className="ft-field" aria-hidden="true">
      <svg className="ft-shape ft-shape--pink" viewBox="-460 -410 940 820">
        <path d={PINK_PATH} />
      </svg>
      <svg className="ft-shape ft-shape--blue" viewBox="-460 -410 940 820">
        <path d={BLUE_PATH} />
      </svg>
    </div>
  );
}

function useNow(intervalMs) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

function cityTime(now, tz) {
  const time = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit' }).format(now);
  const hour = Number(new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', hourCycle: 'h23' }).format(now));
  return { time, day: hour >= 6 && hour < 19 };
}

function visitorZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return '';
  }
}

export default function Footer() {
  const now = useNow(30000);
  const [copied, setCopied] = useState(false);
  const [launching, setLaunching] = useState(false);
  const wordRef = useRef(null);
  const you = visitorZone();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const launch = () => {
    setLaunching(true);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 350);
    setTimeout(() => setLaunching(false), 1400);
  };

  // the giant wordmark fills with colour wherever the cursor "shines"
  const footRef = useRef(null);
  const [inView, setInView] = useState(false);

  // shapes slide together into the logo the first time the footer is seen
  useEffect(() => {
    const el = footRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // cursor parallax for the two halves (-1..1 across the footer)
  const parallax = (e) => {
    const el = footRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const torch = (e) => {
    const el = wordRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <footer ref={footRef} className={`ft ${inView ? 'is-in' : ''}`} onPointerMove={parallax}>
      <LogoField />
      <div className="wrap">
        <div className="ft-card">
          <div className="ft-brand">
            <Link to="/" className="ft-logo">
              <img src="/assets/logo-icon.webp" alt="" width="30" height="30" loading="lazy" />
              Codestroom
            </Link>
            <p>Websites, apps and marketing — one team, start to finish.</p>
            <div className="ft-socials">
              <a href="https://www.instagram.com/codestroom/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61573358163342" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3h-2.5A3.5 3.5 0 0 0 10 6.5V10H7v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z" /></svg>
              </a>
              <a href="tel:+919464529126" aria-label="Call +91 94645 29126">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
              </a>
            </div>
          </div>

          {LINKS.map((col) => (
            <div key={col.title} className="ft-col">
              <h4>{col.title}</h4>
              <ul>
                {col.items.map(([label, to]) => (
                  <li key={to}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="ft-cta">
            <h4>Got an idea?</h4>
            <p>Let&apos;s make it real — reply within 48 hours.</p>
            <Link to="/contact" className="ft-btn">Start a project →</Link>
            <button type="button" className={`ft-email ${copied ? 'is-copied' : ''}`} onClick={copyEmail}>
              {copied ? 'Copied ✓' : EMAIL}
              <span aria-hidden="true">{copied ? '' : '⧉'}</span>
            </button>
          </div>
        </div>

        <div className="ft-clocks" aria-label="Local times where we work">
          <span className="ft-clocks-title">We&apos;re awake when you are</span>
          {CITIES.map((c) => {
            const { time, day } = cityTime(now, c.tz);
            return (
              <span key={c.tz} className={`ft-clock ${c.tz === you ? 'is-you' : ''}`}>
                <i aria-hidden="true">{day ? '☀' : '☾'}</i>
                <b>{time}</b> {c.name}
                {c.tz === you && <em>You</em>}
              </span>
            );
          })}
        </div>
      </div>

      {/* giant wordmark */}
      <div className="ft-word" ref={wordRef} onPointerMove={torch} aria-hidden="true">
        {WORD.map((ch, i) => (
          <span key={i} style={{ '--i': i }}>{ch}</span>
        ))}
      </div>

      <div className="wrap">
        <div className="ft-bottom">
          <span>
            © {now.getFullYear()} Codestroom. Made with too much chai.{' '}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </span>
          <button type="button" className={`ft-rocket ${launching ? 'is-launching' : ''}`} onClick={launch}>
            <span className="ft-rocket-ship" aria-hidden="true">🚀</span>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
