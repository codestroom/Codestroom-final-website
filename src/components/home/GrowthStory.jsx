import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HubIcon from '../services/hub/HubIcon';
import { CASE_STUDIES } from '../../data/caseStudies';
import { siteShot } from '../../data/liveSites';
import '../../styles/growth-story.css';

/* Scroll story: the section pins while the visitor scrolls through five steps of
   growing a business. Each step swaps the visual on the right. On small screens
   it falls back to a plain stacked list (see growth-story.css). */

const sanjha = CASE_STUDIES.find((c) => c.slug === 'sanjha-ghar');
const fmtK = (n) => (n >= 10000 ? `${Math.round(n / 1000)}K` : n.toLocaleString('en-US'));

function GoogleVisual() {
  return (
    <div className="gs-google">
      <div className="gs-search"><HubIcon name="search" size={16} /> best ayurvedic clinic near me</div>
      <div className="gs-result is-top">
        <span className="gs-rank">#1</span>
        <div>
          <small>yourbusiness.com</small>
          <strong>Your Business — Trusted Care Near You</strong>
          <span className="gs-stars">★★★★★ <em>Open now · 2 km</em></span>
        </div>
      </div>
      <div className="gs-result"><div><small>other-site.com</small><strong>Clinic directory listing</strong></div></div>
      <div className="gs-result"><div><small>another-site.in</small><strong>Top 10 clinics in the city</strong></div></div>
      <div className="gs-map"><span className="gs-pin"><HubIcon name="flag" size={14} /></span></div>
    </div>
  );
}

function WebsiteVisual() {
  return (
    <div className="gs-browser">
      <div className="gs-bar"><i /><i /><i /><span>ancientmovers.com</span></div>
      <div className="gs-screen">
        <img src={siteShot('ancientmovers', 'desktop')} alt="Ancient Movers website built by Codestroom" loading="lazy" />
      </div>
      <span className="gs-badge">Real client site</span>
    </div>
  );
}

function InstagramVisual() {
  if (!sanjha) return null;
  const live = sanjha.now || sanjha.after;
  return (
    <div className="gs-insta">
      <div className="gs-insta-top">
        <span className="gs-ring"><img src={sanjha.avatar} alt="" loading="lazy" /></span>
        <div className="gs-insta-stats">
          <span><b>{live.posts}</b>posts</span>
          <span className="hot"><b>{fmtK(live.followers)}</b>followers</span>
          <span><b>{live.following}</b>following</span>
        </div>
      </div>
      <strong>{sanjha.name}</strong>
      <small>Managed by <em>@codestroom</em></small>
      <div className="gs-grid"><i /><i /><i /><i /><i /><i /></div>
      <span className="gs-badge">Real client · @{sanjha.handle}</span>
    </div>
  );
}

function LeadsVisual() {
  return (
    <div className="gs-chat">
      <div className="gs-chat-head"><span className="gs-wa"><HubIcon name="phone" size={14} /></span> New enquiry</div>
      <span className="gs-msg in">Hi! Saw your post — do you have a slot tomorrow?</span>
      <span className="gs-msg out">Yes, 11am works. Shall I book you in?</span>
      <span className="gs-msg in">Perfect, please do 🙏</span>
      <span className="gs-toast"><HubIcon name="check" size={13} /> Booking confirmed · from Instagram ad</span>
    </div>
  );
}

function SmarterVisual() {
  return (
    <div className="gs-dash">
      <div className="gs-kpis">
        <span><small>New leads</small><b>24</b></span>
        <span><small>Booked</small><b>17</b></span>
        <span><small>Hours saved</small><b>9h</b></span>
      </div>
      <div className="gs-flow">
        <span><HubIcon name="magnet" size={13} /> Lead comes in</span>
        <span><HubIcon name="bot" size={13} /> AI replies instantly</span>
        <span><HubIcon name="users" size={13} /> Added to CRM</span>
        <span><HubIcon name="file" size={13} /> Invoice sent</span>
      </div>
      <span className="gs-badge">Runs while you sleep</span>
    </div>
  );
}

const STEPS = [
  {
    id: 'found',
    title: 'Get found',
    line: 'Show up first when people nearby search for what you do.',
    services: [['SEO', '/services/digital-marketing'], ['Google Maps', '/services/digital-marketing'], ['Website', '/services/web-development']],
    Visual: GoogleVisual,
    tint: '#2e9df4',
  },
  {
    id: 'trust',
    title: 'Look trustworthy',
    line: 'A fast, modern website that makes people say “these are the ones”.',
    services: [['Website design', '/services/web-development'], ['Branding', '/services/creative-design']],
    Visual: WebsiteVisual,
    tint: '#f28c28',
  },
  {
    id: 'noticed',
    title: 'Get noticed',
    line: 'Content people stop scrolling for — and a following that keeps growing.',
    services: [['Content & reels', '/services/creative-design'], ['Instagram & YouTube', '/services/digital-marketing']],
    Visual: InstagramVisual,
    tint: '#d62976',
  },
  {
    id: 'customers',
    title: 'Turn interest into customers',
    line: 'Ads and funnels that bring enquiries straight to your phone.',
    services: [['Lead generation', '/services/digital-marketing'], ['Paid ads', '/services/digital-marketing'], ['Sales funnels', '/services/digital-marketing']],
    Visual: LeadsVisual,
    tint: '#22a06b',
  },
  {
    id: 'smarter',
    title: 'Run it smarter',
    line: 'AI, CRM and apps that take the busywork off your plate.',
    services: [['AI automation', '/services/ai-solutions'], ['CRM & ERP', '/services/custom-software'], ['Mobile apps', '/services/mobile-apps']],
    Visual: SmarterVisual,
    tint: '#6e22b8',
  },
];

function useStepFromScroll(ref, count) {
  const [state, setState] = useState({ step: 0, progress: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      const step = Math.min(count - 1, Math.floor(p * count));
      setState((s) => (s.step === step && Math.abs(s.progress - p) < 0.002 ? s : { step, progress: p }));
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
  }, [ref, count]);
  return state;
}

export default function GrowthStory() {
  const ref = useRef(null);
  const { step, progress } = useStepFromScroll(ref, STEPS.length);
  const current = STEPS[step];

  // clicking a step label jumps the page to that part of the story
  const jumpTo = (i) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + total * ((i + 0.5) / STEPS.length), behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="gs" style={{ '--n': STEPS.length, '--tint': current.tint, '--p': progress }} aria-labelledby="gs-title">
      <div className="gs-sticky">
        <div className="wrap gs-layout">
          <div className="gs-copy">
            <span className="gs-kicker">How we grow businesses</span>
            <h2 id="gs-title">From invisible to <span>unforgettable.</span></h2>

            <ol className="gs-steps">
              {STEPS.map((s, i) => (
                <li key={s.id} className={`gs-step ${i === step ? 'is-on' : ''} ${i < step ? 'is-done' : ''}`} style={{ '--tint': s.tint }}>
                  <button type="button" className="gs-step-head" onClick={() => jumpTo(i)}>
                    <span className="gs-num">{i < step ? <HubIcon name="check" size={13} /> : i + 1}</span>
                    <span className="gs-title">{s.title}</span>
                  </button>
                  <div className="gs-step-body">
                    <div className="gs-step-inner">
                      <p>{s.line}</p>
                      <div className="gs-chips">
                        {s.services.map(([name, to]) => (
                          <Link key={name} to={to} tabIndex={i === step ? undefined : -1}>{name}</Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* phones: each step carries its own visual */}
                  <div className="gs-inline-visual"><s.Visual /></div>
                </li>
              ))}
            </ol>

            <Link to="/contact" className="btn btn-primary gs-cta">
              Tell us which step you&apos;re stuck on →
            </Link>
          </div>

          <div className="gs-stage" aria-hidden="true">
            <span className="gs-stage-num">0{step + 1}</span>
            {STEPS.map((s, i) => (
              <div key={s.id} className={`gs-visual ${i === step ? 'is-on' : ''}`}>
                <s.Visual />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
