import { useState } from 'react';
import { Link } from 'react-router-dom';
import HubIcon from './services/hub/HubIcon';
import { CASE_STUDIES } from '../data/caseStudies';
import { LIVE_SITES, siteShot } from '../data/liveSites';
import '../styles/mega-menu.css';

/* Services dropdown: two paths (Grow / Build) and a live preview of whatever is
   hovered — with real client proof where we have it. */

const fmtK = (n) => (n >= 10000 ? `${Math.round(n / 1000)}K` : n.toLocaleString('en-US'));

const PATHS = [
  {
    id: 'grow',
    label: 'Grow',
    sub: 'Digital marketing',
    to: '/services#grow',
    items: [
      { icon: 'user', name: 'Personal branding', line: 'Become the name people trust in your field.', to: '/services/digital-marketing', insta: 'sukhdarshan-muni-ji' },
      { icon: 'instagram', name: 'Social media', line: 'Instagram, YouTube, Facebook & TikTok — run for you.', to: '/services/digital-marketing', insta: 'sanjha-ghar' },
      { icon: 'magnet', name: 'Lead generation', line: 'A steady flow of enquiries you can call back.', to: '/services/digital-marketing', insta: 'pannu-vaid' },
      { icon: 'search', name: 'SEO & Google Maps', line: 'Show up first when locals search for you.', to: '/services/digital-marketing', site: 'ancientmovers' },
      { icon: 'megaphone', tags: ['Google Ads', 'Meta Ads', 'Plain-English reports'], name: 'Paid ads', line: 'Google & Meta campaigns built for return.', to: '/services/digital-marketing' },
      { icon: 'pen', tags: ['Reels', 'Posts', 'Ad creatives'], name: 'Content & design', line: 'Reels, posts and creatives people stop for.', to: '/services/creative-design' },
    ],
  },
  {
    id: 'build',
    label: 'Build',
    sub: 'IT services',
    to: '/services#build',
    items: [
      { icon: 'layers', name: 'Websites', line: 'Fast, modern sites that turn visitors into customers.', to: '/services/web-development', site: 'sirjanavillage' },
      { icon: 'cart', tags: ['Shopify', 'WooCommerce', 'UPI & COD'], name: 'Online stores & Shopify', line: 'Sell around the clock — UPI, cards, COD.', to: '/services/ecommerce' },
      { icon: 'phone', tags: ['iPhone', 'Android', 'Store launch'], name: 'Mobile apps', line: 'iPhone & Android, from idea to the app stores.', to: '/services/mobile-apps' },
      { icon: 'bot', tags: ['24/7 answers', 'WhatsApp', 'Your own data'], name: 'AI automation', line: 'Assistants that answer customers 24/7.', to: '/services/ai-solutions' },
      { icon: 'grid', tags: ['Leads', 'Stock', 'Invoices'], name: 'ERP & CRM', line: 'Leads, stock and accounts in one place.', to: '/services/custom-software' },
      { icon: 'code', tags: ['Dashboards', 'Portals', 'Integrations'], name: 'Custom software', line: 'Tools built around how your team works.', to: '/services/custom-software' },
    ],
  },
];

const DEFAULT_ITEM = PATHS[0].items[1];

function Proof({ item }) {
  const c = item.insta && CASE_STUDIES.find((x) => x.slug === item.insta);
  if (c) {
    const live = c.now || c.after;
    return (
      <Link to={`/portfolio#${c.slug}`} className="mm-proof">
        <img src={c.avatar} alt="" className="mm-proof-avatar" />
        <span>
          <small>Real result</small>
          <strong>{c.name}</strong>
          <em>{c.before ? `${c.before.followers.toLocaleString('en-US')} → ${fmtK(live.followers)}` : fmtK(live.followers)} followers</em>
        </span>
      </Link>
    );
  }
  const s = item.site && LIVE_SITES.find((x) => x.slug === item.site);
  if (s) {
    return (
      <a href={s.url} target="_blank" rel="noopener noreferrer" className="mm-proof mm-proof--site">
        <img src={siteShot(s.slug, 'desktop')} alt="" className="mm-proof-shot" />
        <span>
          <small>Real project</small>
          <strong>{s.domain}</strong>
          <em>Visit live site ↗</em>
        </span>
      </a>
    );
  }
  return null;
}

export default function ServiceMegaMenu({ onClose }) {
  const [hovered, setHovered] = useState(DEFAULT_ITEM);
  const path = PATHS.find((p) => p.items.includes(hovered)) || PATHS[0];

  return (
    <div className="mm-overlay">
      <div className={`mm-card mm-card--${path.id}`}>
        {PATHS.map((p, pi) => (
          <div key={p.id} className={`mm-col mm-col--${p.id}`}>
            <Link to={p.to} className="mm-col-head" onClick={onClose}>
              <span className="mm-col-label">{p.label}</span>
              <span className="mm-col-sub">{p.sub} →</span>
            </Link>
            <ul>
              {p.items.map((item, i) => (
                <li key={item.name} style={{ '--i': pi * 6 + i }}>
                  <Link
                    to={item.to}
                    className={`mm-item ${hovered === item ? 'is-on' : ''}`}
                    onMouseEnter={() => setHovered(item)}
                    onFocus={() => setHovered(item)}
                    onClick={onClose}
                  >
                    <span className="mm-icon"><HubIcon name={item.icon} size={17} /></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mm-preview" key={hovered.name}>
          <span className="mm-preview-path">{path.label} · {path.sub}</span>
          <span className="mm-preview-icon"><HubIcon name={hovered.icon} size={26} /></span>
          <h4>{hovered.name}</h4>
          <p>{hovered.line}</p>
          <Proof item={hovered} />
          {hovered.tags && (
            <div className="mm-tags">
              {hovered.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          )}
          <Link to={hovered.to} className="mm-preview-cta" onClick={onClose}>
            Explore {hovered.name.toLowerCase()} →
          </Link>
        </div>

        <div className="mm-foot">
          <Link to="/services#audit" onClick={onClose}>⚡ Test your website free</Link>
          <Link to="/services#plan" onClick={onClose}>🧭 Build your plan in 20s</Link>
          <Link to="/services" className="mm-foot-all" onClick={onClose}>All services →</Link>
        </div>
      </div>
    </div>
  );
}
