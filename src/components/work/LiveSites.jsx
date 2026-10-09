import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal';
import HubIcon from '../services/hub/HubIcon';
import { LIVE_SITES, siteShot } from '../../data/liveSites';
import { CASE_STUDIES } from '../../data/caseStudies';
import '../../styles/live-sites.css';

const AUTO_MS = 7000;
const fmtK = (n) => (n >= 10000 ? `${Math.round(n / 1000)}K` : n.toLocaleString('en-US'));

function instagramFor(site) {
  const c = site.caseSlug && CASE_STUDIES.find((x) => x.slug === site.caseSlug);
  return c ? { slug: c.slug, followers: fmtK((c.now || c.after).followers) } : null;
}

export default function LiveSites() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hovering, setHovering] = useState(false);
  const site = LIVE_SITES[active];
  const insta = instagramFor(site);

  useEffect(() => {
    // don't switch sites while someone is scrolling through one
    if (!auto || hovering || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => {
      if (!document.hidden) setActive((a) => (a + 1) % LIVE_SITES.length);
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [auto, hovering]);

  const choose = (i) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section className="lv" style={{ '--accent': site.accent }} aria-labelledby="lv-title">
      <Reveal className="lv-head">
        <span className="lv-live"><i /> {LIVE_SITES.length} sites live right now</span>
        <h2 id="lv-title">Websites we&apos;ve shipped.</h2>
        <p>Real businesses, real domains. Hover a site to scroll through it — or open it and look around.</p>
      </Reveal>

      <div className="lv-stage" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        <div className="lv-devices" key={site.slug}>
          <div className="lv-browser">
            <div className="lv-bar">
              <i /><i /><i />
              <span className="lv-url">
                <HubIcon name="shield" size={12} /> {site.domain}
              </span>
            </div>
            <div className="lv-screen" tabIndex={0} aria-label={`Screenshot of ${site.domain} — scroll to explore`}>
              <img src={siteShot(site.slug, 'desktop')} alt={`${site.name} website homepage`} width="1200" height="3833" />
            </div>
            <span className="lv-hint" aria-hidden="true">Hover to scroll ↓</span>
          </div>
          <div className="lv-phone" aria-hidden="true">
            <span className="lv-notch" />
            <img src={siteShot(site.slug, 'mobile')} alt="" width="600" height="1298" loading="lazy" />
          </div>
        </div>

        <div className="lv-info" key={`info-${site.slug}`}>
          <span className="lv-cat">{site.category}</span>
          <h3>{site.name}</h3>
          <span className="lv-loc">{site.location}</span>
          <p>{site.summary}</p>
          <ul className="lv-features">
            {site.features.map((f) => (
              <li key={f}><HubIcon name="check" size={14} /> {f}</li>
            ))}
          </ul>
          {insta && (
            <Link to={`/portfolio#${insta.slug}`} className="lv-insta">
              <span className="lv-insta-icon"><HubIcon name="instagram" size={16} /></span>
              <span>
                <strong>We also grow their Instagram</strong>
                <small>{insta.followers} followers · see results →</small>
              </span>
            </Link>
          )}
          <a className="btn btn-primary lv-visit" href={site.url} target="_blank" rel="noopener noreferrer">
            Visit {site.domain} ↗
          </a>
        </div>
      </div>

      <div className="lv-switch" role="tablist" aria-label="Choose a website">
        {LIVE_SITES.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`lv-thumb ${i === active ? 'is-on' : ''}`}
            style={{ '--accent': s.accent }}
            onClick={() => choose(i)}
          >
            <span className="lv-thumb-img">
              <img src={siteShot(s.slug, 'desktop')} alt="" loading="lazy" />
            </span>
            <span className="lv-thumb-name">{s.name}</span>
            {i === active && auto && !hovering && <span className="lv-thumb-progress" aria-hidden="true" />}
          </button>
        ))}
      </div>
    </section>
  );
}
