import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../Reveal';
import HubIcon from './HubIcon';
import { BUILD } from '../../../data/servicesHub';
import { tiltLeave, tiltMove } from '../../home/useSpotlight';
import { LIVE_SITES, siteShot } from '../../../data/liveSites';
import { PLAN_SERVICES } from '../../../data/planBuilder';

/* Each service shows something genuine:
   - a REAL client website we built (scrolling screenshot + phone view), or
   - an honest "what you get" spec sheet — never a pretend product screen. */

const REAL = {
  static: { site: 'sanjhaghar', note: 'Restaurant, rooms & farm shop — fast and simple to run' },
  dynamic: { site: 'sirjanavillage', note: 'Three languages, a 35-facility explorer and membership applications' },
};

const SPEC = {
  shop: { weeks: PLAN_SERVICES.ecommerce.weeks, stack: ['Next.js', 'Razorpay / Stripe', 'Search'], get: ['Product catalogue with search & filters', 'Cart, checkout & payments — UPI, cards, COD', 'Orders & stock dashboard', 'Shipping, tax & invoice setup'] },
  shopify: { weeks: PLAN_SERVICES.shopify.weeks, stack: ['Shopify', 'Liquid', 'Klaviyo'], get: ['Custom Shopify theme in your brand', 'Product pages built to convert', 'Apps for reviews, upsells & WhatsApp', 'Payments, setup & launch'] },
  app: { weeks: PLAN_SERVICES.app.weeks, stack: ['Flutter', 'React Native', 'Firebase'], get: ['Clickable design before any code', 'One app for iPhone & Android', 'Logins, notifications & offline mode', 'App Store & Play Store publishing'] },
  software: { weeks: PLAN_SERVICES.software.weeks, stack: ['React', 'Node.js', 'Postgres'], get: ['Your workflow mapped with your team', 'Dashboards & role-based logins', 'Reports & exports', 'Training and ongoing support'] },
  ai: { weeks: PLAN_SERVICES.ai.weeks, stack: ['Claude', 'Your documents', 'WhatsApp'], get: ['Assistant that learns your FAQs & documents', 'Answers on your website & WhatsApp, 24/7', 'Hands over to a human when needed', 'Your data stays private'] },
  erp: { weeks: PLAN_SERVICES.erp.weeks, stack: ['Postgres', 'Dashboards', 'Reports'], get: ['Stock, purchases & sales in one place', 'Invoices and tax-ready reports', 'Multiple branches or warehouses', 'Owner dashboards'] },
  crm: { weeks: PLAN_SERVICES.crm.weeks, stack: ['Pipelines', 'WhatsApp', 'Email'], get: ['Every lead from site, ads & WhatsApp in one list', 'Pipeline stages and reminders', 'Follow-up templates', 'Reports on what is working'] },
  api: { weeks: null, stack: ['Node.js', 'Docker', 'Cloud'], get: ['Secure APIs for your website & apps', 'Payment, SMS & WhatsApp integrations', 'Cloud hosting that scales', 'Monitoring and backups'] },
};

function RealSite({ real }) {
  const site = LIVE_SITES.find((x) => x.slug === real.site);
  if (!site) return null;
  return (
    <div className="blab-real">
      <div className="blab-real-browser">
        <div className="blab-real-bar"><i /><i /><i /><span>{site.domain}</span></div>
        <div className="blab-real-screen">
          <img src={siteShot(site.slug, 'desktop')} alt={`${site.name} website, built by Codestroom`} loading="lazy" />
        </div>
      </div>
      <div className="blab-real-phone" aria-hidden="true">
        <img src={siteShot(site.slug, 'mobile')} alt="" loading="lazy" />
      </div>
      <a className="blab-real-badge" href={site.url} target="_blank" rel="noopener noreferrer">
        <span className="blab-real-dot" /> Real client · {site.domain} ↗
      </a>
    </div>
  );
}

function SpecSheet({ service, spec }) {
  return (
    <div className="blab-sheet">
      <div className="blab-sheet-head">
        <span className="blab-sheet-icon"><HubIcon name={service.icon} size={22} /></span>
        <div>
          <small>What you get</small>
          <strong>{service.name}</strong>
        </div>
      </div>
      <ul>
        {spec.get.map((g, i) => (
          <li key={g} style={{ '--i': i }}><span>✓</span>{g}</li>
        ))}
      </ul>
      <div className="blab-sheet-stack">
        {spec.stack.map((t) => <em key={t}>{t}</em>)}
      </div>
    </div>
  );
}


const CYCLE_MS = 5600;
const STEPS = ['Plan', 'Design', 'Build', 'Launch'];

export default function BuildLab() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const current = BUILD[active];
  const real = REAL[current.preview];
  const spec = SPEC[current.preview];
  const site = real && LIVE_SITES.find((x) => x.slug === real.site);

  useEffect(() => {
    if (!auto) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % BUILD.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [auto]);

  const choose = (i) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section id="build" className="build">
      <div className="wrap">
        <Reveal className="path-intro path-intro--build">
          <span className="path-tag path-tag--build">Path 02 · IT Services</span>
          <h2>Pick a service. <span>See what you get.</span></h2>
          <p>Websites, apps and software — designed, built and looked after by one engineering team.</p>
        </Reveal>

        <div className="blab">
          <ol className="blab-list" role="tablist" aria-label="IT services">
            {BUILD.map((s, i) => (
              <li key={s.name}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  className={`blab-item ${active === i ? 'is-active' : ''}`}
                  onClick={() => choose(i)}
                >
                  <span className="blab-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="blab-name">{s.name}</span>
                  <HubIcon name={s.icon} size={18} />
                  {active === i && auto && <span className="blab-progress" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ol>

          <div className="blab-stage" role="tabpanel">
            <div className="blab-stage-top">
              <span className="blab-live"><i /> {real ? 'Real client work' : 'What we build'}</span>
              <span className="blab-spec">{String(active + 1).padStart(2, '0')} / {String(BUILD.length).padStart(2, '0')}</span>
            </div>
            <div
              className="blab-canvas"
              key={current.preview}
              onPointerMove={tiltMove}
              onPointerLeave={tiltLeave}
            >
              <div className="blab-tilt">
                {real ? <RealSite real={real} /> : <SpecSheet service={current} spec={spec} />}
              </div>
            </div>
            <div className="blab-hud" key={`hud-${current.preview}`}>
              <ol className="blab-steps" aria-hidden="true">
                {STEPS.map((step, i) => (
                  <li key={step} style={{ '--i': i }}>
                    <span className="blab-step-dot" />
                    {step}
                  </li>
                ))}
              </ol>
              <ul className="blab-log">
                {site ? (
                  <>
                    <li style={{ '--i': 0 }}><span className="blab-log-tick">✓</span> {real.note}</li>
                    {site.features.slice(0, 2).map((f, i) => (
                      <li key={f} style={{ '--i': i + 1 }}><span className="blab-log-tick">✓</span> {f}</li>
                    ))}
                  </>
                ) : (
                  <>
                    <li style={{ '--i': 0 }}>
                      <span className="blab-log-tick">◷</span>{' '}
                      {spec.weeks ? `Typical launch: ${spec.weeks[0]}–${spec.weeks[1]} weeks` : 'Timeline quoted per project'}
                    </li>
                    <li style={{ '--i': 1 }}><span className="blab-log-tick">✓</span> Fixed price agreed before we start</li>
                    <li style={{ '--i': 2 }}><span className="blab-log-tick">✓</span> Live preview link while we build</li>
                  </>
                )}
              </ul>
            </div>
            <div className="blab-caption" key={`cap-${current.name}`}>
              <div>
                <strong>{current.name}</strong>
                <p>{current.line}</p>
              </div>
              <Link to={current.to} className="blab-cta">
                Details <HubIcon name="arrow" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
