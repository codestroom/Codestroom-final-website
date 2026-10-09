import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HubIcon from '../services/hub/HubIcon';
import { CASE_STUDIES } from '../../data/caseStudies';
import { LIVE_SITES, siteShot } from '../../data/liveSites';
import '../../styles/business-street.css';

/* "Codestroom Street": an evening street of shops, one per kind of business we
   serve. Hover / tap a shop and its lights come on, with what we do for that kind
   of business and the REAL client from it. No client yet → no proof shown. */

const fmtK = (n) => (n >= 10000 ? `${Math.round(n / 1000)}K` : n.toLocaleString('en-US'));
const caseBy = (slug) => CASE_STUDIES.find((c) => c.slug === slug);
const siteBy = (slug) => LIVE_SITES.find((s) => s.slug === slug);

const SHOPS = [
  {
    id: 'cafe', sign: 'Café & Dhaba', kind: 'Restaurants & cafés', color: '#b4532a', roof: 'awning', width: 1.15,
    we: ['Menu & table-booking website', 'Google Maps so locals find you', 'Reels that make people hungry'],
    site: 'sanjhaghar', insta: 'sanjha-ghar', more: '/industries/restaurants',
  },
  {
    id: 'clinic', sign: 'Clinic', kind: 'Clinics & healthcare', color: '#3f8f2f', roof: 'flat', width: 1,
    we: ['Treatments & booking website', 'WhatsApp and call buttons everywhere', 'A trusted, growing Instagram'],
    site: 'pannuvaid', insta: 'pannu-vaid',
  },
  {
    id: 'spiritual', sign: 'Satsang', kind: 'Spiritual leaders & religious organisations', color: '#c98a16', roof: 'dome', width: 1.05,
    we: ['Personal brand & teachings online', 'Live-stream and event reach', 'Followers who turn into a community'],
    insta: 'sukhdarshan-muni-ji', more: '/industries/religious-organizations',
  },
  {
    id: 'beauty', sign: 'Beauty Studio', kind: 'Salons & beauty studios', color: '#d9827f', roof: 'awning', width: 0.95,
    we: ['Elegant site with online booking', 'Before/after galleries', 'Local search & reviews'],
    site: 'blushbeautystudioz',
  },
  {
    id: 'school', sign: 'School', kind: 'Schools & education', color: '#2563eb', roof: 'gable', width: 1.2,
    we: ['Admissions website & enquiry forms', 'Parent app & notices', 'Social media parents actually follow'],
  },
  {
    id: 'movers', sign: 'Movers', kind: 'Local services', color: '#f28c28', roof: 'flat', width: 1, truck: true,
    we: ['Lead-generation website', 'Instant quote forms', 'Service & area pages that rank'],
    site: 'ancientmovers',
  },
  {
    id: 'village', sign: 'Village', kind: 'Communities & projects', color: '#7c6a3a', roof: 'gable', width: 1.05,
    we: ['Story-led website in 3 languages', 'Membership applications', 'Facilities explorer'],
    site: 'sirjanavillage',
  },
];

function Proof({ shop }) {
  const site = shop.site && siteBy(shop.site);
  const c = shop.insta && caseBy(shop.insta);
  if (!site && !c) {
    return <p className="bs-noproof">Running a school? We&apos;d love to make you our first one here.</p>;
  }
  return (
    <div className="bs-proof">
      <span className="bs-proof-tag">Real client on this street</span>
      {c && (
        <Link to={`/portfolio#${c.slug}`} className="bs-proof-row">
          <img src={c.avatar} alt="" className="bs-avatar" />
          <span>
            <strong>{c.name}</strong>
            <small>
              {c.before
                ? `${c.before.followers.toLocaleString('en-US')} → ${fmtK((c.now || c.after).followers)} followers`
                : `${fmtK((c.now || c.after).followers)} Instagram followers`}
            </small>
          </span>
          <em>Results →</em>
        </Link>
      )}
      {site && (
        <a href={site.url} target="_blank" rel="noopener noreferrer" className="bs-proof-row">
          <img src={siteShot(site.slug, 'desktop')} alt="" className="bs-shot" />
          <span>
            <strong>{site.domain}</strong>
            <small>Website we built</small>
          </span>
          <em>Visit ↗</em>
        </a>
      )}
    </div>
  );
}

function Building({ shop, lit, onPick }) {
  return (
    <button
      type="button"
      className={`bs-shop bs-roof-${shop.roof} ${lit ? 'is-lit' : ''}`}
      style={{ '--c': shop.color, '--w': shop.width }}
      onMouseEnter={() => onPick(shop.id, false)}
      onFocus={() => onPick(shop.id, true)}
      onClick={() => onPick(shop.id, true)}
      aria-pressed={lit}
      aria-label={shop.kind}
    >
      <span className="bs-roof" />
      <span className="bs-facade">
        <span className="bs-sign">{shop.sign}</span>
        <span className="bs-windows"><i /><i /></span>
        <span className="bs-door" />
      </span>
      {shop.truck && (
        <span className="bs-truck" aria-hidden="true"><i /><b /><b /></span>
      )}
    </button>
  );
}

export default function BusinessStreet() {
  const [active, setActive] = useState('cafe');
  const pinned = useRef(false);
  const shop = SHOPS.find((s) => s.id === active);

  // gently walk down the street until someone picks a shop
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => {
      if (pinned.current || document.hidden) return;
      setActive((id) => SHOPS[(SHOPS.findIndex((s) => s.id === id) + 1) % SHOPS.length].id);
    }, 4200);
    return () => clearInterval(t);
  }, []);

  const pick = (id, pin) => {
    if (pin) pinned.current = true;
    setActive(id);
  };

  return (
    <section className="bs" aria-labelledby="bs-title">
      <div className="wrap">
        <div className="bs-head">
          <span className="bs-kicker">Welcome to Codestroom Street</span>
          <h2 id="bs-title">Every business here <span>has its lights on.</span></h2>
          <p>Hover a shop to see what we do for businesses like it — and the real client who&apos;s already here.</p>
        </div>
      </div>

      <div className="bs-scene">
        <div className="bs-sky" aria-hidden="true">
          <span className="bs-moon" />
          <i /><i /><i /><i /><i /><i />
        </div>

        <div className="bs-street">
          {SHOPS.map((s) => (
            <Building key={s.id} shop={s} lit={s.id === active} onPick={pick} />
          ))}
          <Link to="/contact" className="bs-lot">
            <span className="bs-lot-sign">Your business here?</span>
            <span className="bs-lot-post" />
            <span className="bs-lot-cta">Claim this spot →</span>
          </Link>
        </div>
        <div className="bs-road" aria-hidden="true"><i /></div>
      </div>

      <div className="wrap">
        <div className="bs-card" key={shop.id} style={{ '--c': shop.color }} aria-live="polite">
          <div className="bs-card-main">
            <span className="bs-card-kind">{shop.kind}</span>
            <h3>What we do for them</h3>
            <ul>
              {shop.we.map((w) => <li key={w}><HubIcon name="check" size={13} /> {w}</li>)}
            </ul>
            <div className="bs-card-links">
              <Link to="/contact" className="btn btn-primary">Light up my business →</Link>
              {shop.more && <Link to={shop.more} className="bs-more">More for {shop.kind.toLowerCase()} →</Link>}
            </div>
          </div>
          <Proof shop={shop} />
        </div>
      </div>
    </section>
  );
}
