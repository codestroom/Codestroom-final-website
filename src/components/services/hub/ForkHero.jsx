import HubIcon from './HubIcon';
import { GROW_TOASTS, BUILD_TOASTS, GROW_ALL, BUILD } from '../../../data/servicesHub';

function Half({ id, index, word, label, toasts, count, onPick }) {
  return (
    <a href={`#${id}`} className={`fork-half fork-half--${id}`} onClick={(e) => onPick(e, id)}>
      <span className="fork-index">Path {index}</span>
      <span className="fork-word" aria-hidden="true">{word}</span>
      <span className="fork-label">{label}</span>
      <span className="fork-meta">
        {count} services <HubIcon name="arrow" size={16} />
      </span>
      <span className="fork-toasts" aria-hidden="true">
        {toasts.map((t, i) => (
          <span key={t.text} className="fork-toast" style={{ '--t': i }}>
            <span className="fork-toast-icon"><HubIcon name={t.icon} size={15} /></span>
            {t.text}
          </span>
        ))}
      </span>
    </a>
  );
}

export default function ForkHero() {
  const jump = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const pick = (e, id) => {
    jump(e, id);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <section className="fork">
      <div className="wrap">
        <div className="fork-head">
          <span className="kicker">Our services</span>
          <h1>
            Two paths. <em>One team.</em>
          </h1>
          <p>We grow your brand and build your technology — choose where to start.</p>
          <div className="fork-tools">
            <a href="#plan" onClick={(e) => jump(e, 'plan')}>🧭 Build your plan in 20s</a>
          </div>
        </div>
      </div>

      <div className="fork-split">
        <Half id="grow" index="01" word="Grow" label="Digital Marketing" toasts={GROW_TOASTS} count={GROW_ALL.length} onPick={pick} />
        <Half id="build" index="02" word="Build" label="IT Services" toasts={BUILD_TOASTS} count={BUILD.length} onPick={pick} />

        <div className="fork-seal" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <defs>
              <path id="fork-seal-path" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
            </defs>
            <text>
              <textPath href="#fork-seal-path">ONE TEAM • TWO PATHS • ONE TEAM • TWO PATHS •</textPath>
            </text>
          </svg>
          <span className="fork-seal-amp">&amp;</span>
        </div>
      </div>
    </section>
  );
}
