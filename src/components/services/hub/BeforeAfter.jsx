import { useState } from 'react';
import Reveal from '../../Reveal';
import { REDESIGNS } from '../../../data/servicesHub';

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [active, setActive] = useState(0);

  // Only real client work is shown — the section stays hidden until REDESIGNS has entries.
  if (REDESIGNS.length === 0) return null;
  const item = REDESIGNS[active];

  return (
    <section className="ba">
      <div className="wrap">
        <Reveal className="ba-head">
          <span className="path-tag path-tag--grow">Drag to compare</span>
          <h2>Same business. <span>New first impression.</span></h2>
          <p>Visitors decide in seconds whether to trust you. Slide to see what a redesign changes.</p>
        </Reveal>

        {REDESIGNS.length > 1 && (
          <div className="ba-tabs">
            {REDESIGNS.map((r, i) => (
              <button key={r.name} type="button" className={i === active ? 'is-on' : ''} onClick={() => { setActive(i); setPos(50); }}>
                {r.name}
              </button>
            ))}
          </div>
        )}

        <Reveal className="ba-frame-wrap">
          <div className="ba-frame" style={{ '--pos': `${pos}%` }}>
            <div className="ba-bar"><i /><i /><i /><span>{item.url}</span></div>
            <div className="ba-stage">
              <div className="ba-layer ba-after">
                <img src={item.after} alt={`${item.name} after redesign`} />
              </div>
              <div className="ba-layer ba-before">
                <img src={item.before} alt={`${item.name} before redesign`} />
              </div>
              <span className="ba-tag ba-tag--before">Before</span>
              <span className="ba-tag ba-tag--after">After</span>
              <span className="ba-handle" aria-hidden="true"><span>‹ ›</span></span>
              <input
                type="range"
                min="0"
                max="100"
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                className="ba-range"
                aria-label="Compare before and after"
              />
            </div>
          </div>
          {item.result && <p className="ba-caption">{item.result}</p>}
        </Reveal>
      </div>
    </section>
  );
}
