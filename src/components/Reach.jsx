import Reveal from './Reveal';

const STATS = [
  { num: 'India', lbl: 'Restaurants, entrepreneurs, e-commerce & public leaders' },
  { num: 'Canada', lbl: 'Local business & entrepreneur marketing' },
  { num: 'USA', lbl: 'E-commerce & entrepreneur growth' },
  { num: 'Europe', lbl: 'Growing presence across the region' },
];

export default function Reach() {
  return (
    <section id="reach">
      <div className="wrap">
        <Reveal className="reach">
          <svg className="globe-dots" viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <ellipse cx="100" cy="100" rx="90" ry="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          </svg>
          <div className="reach-inner">
            <div>
              <span className="kicker" style={{ color: '#FF8FC4' }}>
                Where we work
              </span>
              <h1>Local insight, wherever your audience hangs out.</h1>
              <p>
                Codestroom works with restaurants, religious organizations, entrepreneurs,
                public leaders and e-commerce brands across India, Canada, the USA and Europe —
                bringing the same data-driven approach to every market, tailored to what
                actually resonates locally.
              </p>
            </div>
            <div className="reach-stats">
              {STATS.map((stat) => (
                <div key={stat.lbl}>
                  <div className="stat-num">{stat.num}</div>
                  <div className="stat-lbl">{stat.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
