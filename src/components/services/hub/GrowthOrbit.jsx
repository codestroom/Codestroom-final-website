import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../Reveal';
import HubIcon from './HubIcon';
import { GROW_CORE, GROW_OUTER, GROW_ALL } from '../../../data/servicesHub';

const DETAIL = '/services/digital-marketing';

function Ring({ items, offset, className, active, onSelect }) {
  return (
    <div className={`orbit-ring ${className}`}>
      {items.map((s, i) => {
        const idx = offset + i;
        const angle = (360 / items.length) * i - 90;
        return (
          <div key={s.name} className="orbit-slot" style={{ '--a': `${angle}deg` }}>
            <button
              type="button"
              className={`orbit-item ${s.platform ? `is-platform pf-${s.platform}` : ''} ${active === idx ? 'is-active' : ''}`}
              onMouseEnter={() => onSelect(idx)}
              onFocus={() => onSelect(idx)}
              onClick={() => onSelect(idx)}
              aria-pressed={active === idx}
            >
              <span className="orbit-bubble"><HubIcon name={s.icon} size={22} /></span>
              <span className="orbit-name">{s.name}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function GrowthOrbit() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = GROW_ALL[active];

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % GROW_ALL.length), 2800);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="grow" className="grow">
      <div className="wrap grow-layout">
        <Reveal className="path-intro">
          <span className="path-tag path-tag--grow">Path 01 · Digital Marketing</span>
          <h2>Everything revolves around <span>your brand.</span></h2>
          <p>
            Branding, ads, SEO and social — run as one plan, not twelve separate jobs. You get seen, you get leads,
            you get sales.
          </p>
          <Link to={DETAIL} className="btn btn-gradient">
            Explore Digital Marketing <HubIcon name="arrow" size={16} />
          </Link>
        </Reveal>

        <div
          className={`orbit ${paused ? 'is-paused' : ''}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="orbit-glow" aria-hidden="true" />
          <Ring items={GROW_CORE} offset={0} className="orbit-ring--inner" active={active} onSelect={setActive} />
          <Ring items={GROW_OUTER} offset={GROW_CORE.length} className="orbit-ring--outer" active={active} onSelect={setActive} />

          <div className="orbit-core" aria-live="polite">
            <span className="orbit-core-label">Your brand</span>
            <div className="orbit-core-body" key={current.name}>
              <span className="orbit-core-icon"><HubIcon name={current.icon} size={26} /></span>
              <strong>{current.name}</strong>
              <p>{current.line}</p>
              <Link to={current.to || DETAIL} className="orbit-core-link">
                Learn more <HubIcon name="arrow" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
