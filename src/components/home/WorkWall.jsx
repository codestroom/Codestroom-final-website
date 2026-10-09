import { Link } from 'react-router-dom';
import HubIcon from '../services/hub/HubIcon';
import { LIVE_SITES, siteShot } from '../../data/liveSites';
import { CASE_STUDIES } from '../../data/caseStudies';
import '../../styles/work-wall.css';

/* A tilted 3D wall of real work gliding past in two rows: live client websites
   and real Instagram results. Every card is genuine and clickable. */

const fmtK = (n) => (n >= 10000 ? `${Math.round(n / 1000)}K` : n.toLocaleString('en-US'));

function SiteCard({ site, hidden }) {
  return (
    <a
      className="ww-card ww-site"
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--accent': site.accent }}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <span className="ww-site-bar"><i /><i /><i /><em>{site.domain}</em></span>
      <span className="ww-site-shot">
        <img src={siteShot(site.slug, 'desktop')} alt={hidden ? '' : `${site.name} website`} loading="lazy" />
      </span>
      <span className="ww-site-meta">
        <strong>{site.name}</strong>
        <small>{site.category}</small>
      </span>
      <span className="ww-hover">Visit live site ↗</span>
    </a>
  );
}

function PhoneCard({ site, hidden }) {
  return (
    <a
      className="ww-card ww-phone"
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <span className="ww-phone-notch" />
      <img src={siteShot(site.slug, 'mobile')} alt={hidden ? '' : `${site.name} on a phone`} loading="lazy" />
      <span className="ww-hover">{site.domain} ↗</span>
    </a>
  );
}

function InstaCard({ c, hidden }) {
  const live = c.now || c.after;
  return (
    <Link
      className="ww-card ww-insta"
      to={`/portfolio#${c.slug}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <span className="ww-insta-top">
        <span className="ww-ring"><img src={c.avatar} alt="" loading="lazy" /></span>
        <span className="ww-insta-handle">@{c.handle}</span>
      </span>
      <strong className="ww-big">{fmtK(live.followers)}</strong>
      <span className="ww-insta-label">followers · grown by Codestroom</span>
      <span className="ww-hover">See results →</span>
    </Link>
  );
}

function StatCard({ c, hidden }) {
  return (
    <Link
      className="ww-card ww-stat"
      to={`/portfolio#${c.slug}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <span className="ww-stat-kicker"><HubIcon name="growth" size={14} /> Case study</span>
      <strong className="ww-big">{(c.after.followers / c.before.followers).toFixed(1)}×</strong>
      <span className="ww-stat-text">
        {c.before.followers.toLocaleString('en-US')} → {c.after.followers.toLocaleString('en-US')} followers in {c.period}
      </span>
      <small>{c.name}</small>
      <span className="ww-hover">See the case study →</span>
    </Link>
  );
}

// interleave b into a: a0 b0 a1 b1 …
function weave(a, b) {
  const out = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i]) out.push(a[i]);
    if (b[i]) out.push(b[i]);
  }
  return out;
}

const insta = CASE_STUDIES.map((c) => ({ key: `ig-${c.slug}`, render: (h) => <InstaCard c={c} hidden={h} /> }));
const stats = CASE_STUDIES.filter((c) => c.before).map((c) => ({ key: `st-${c.slug}`, render: (h) => <StatCard c={c} hidden={h} /> }));

// each result appears once: the case study's account sits with its stat in row two
const featuredSlugs = new Set(CASE_STUDIES.filter((c) => c.before).map((c) => `ig-${c.slug}`));
const ROW_ONE = weave(
  LIVE_SITES.map((s) => ({ key: `site-${s.slug}`, render: (h) => <SiteCard site={s} hidden={h} /> })),
  insta.filter((i) => !featuredSlugs.has(i.key)),
);
const ROW_TWO = weave(
  [...LIVE_SITES].reverse().map((s) => ({ key: `ph-${s.slug}`, render: (h) => <PhoneCard site={s} hidden={h} /> })),
  [...stats, ...insta.filter((i) => featuredSlugs.has(i.key))],
);

function Row({ items, reverse }) {
  return (
    <div className={`ww-row ${reverse ? 'is-reverse' : ''}`}>
      <div className="ww-track">
        {[false, true].map((hidden) =>
          items.map((item) => <div key={`${item.key}-${hidden}`} className="ww-cell">{item.render(hidden)}</div>),
        )}
      </div>
    </div>
  );
}

export default function WorkWall() {
  return (
    <section className="ww" aria-labelledby="ww-title">
      <div className="ww-head">
        <span className="ww-live"><i /> Everything here is live</span>
        <h2 id="ww-title">Real work. Real clients. <span>Tap anything.</span></h2>
      </div>
      <div className="ww-stage">
        <div className="ww-plane">
          <Row items={ROW_ONE} />
          <Row items={ROW_TWO} reverse />
        </div>
      </div>
    </section>
  );
}
