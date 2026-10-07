import { GROW_ALL, BUILD } from '../../../data/servicesHub';

function Row({ items, reverse }) {
  const loop = [...items, ...items];
  return (
    <div className={`ribbon-row ${reverse ? 'is-reverse' : ''}`}>
      <div className="ribbon-track">
        {loop.map((s, i) => (
          <span key={`${s.name}-${i}`} className={i % 2 ? 'is-outline' : ''}>
            {s.name}
            <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ServiceRibbon() {
  return (
    <div className="ribbon" aria-hidden="true">
      <Row items={GROW_ALL} />
      <Row items={BUILD} reverse />
    </div>
  );
}
