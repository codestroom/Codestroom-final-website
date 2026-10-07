import Reveal from '../../Reveal';
import HubIcon from './HubIcon';
import { PROMISES, STEPS } from '../../../data/servicesHub';

export default function PromiseCard() {
  return (
    <section className="promise">
      <div className="wrap">
        <Reveal className="promise-card">
          <div className="promise-left">
            <span className="kicker">Why businesses trust us</span>
            <h2>Our promise, <span>in writing.</span></h2>
            <ul className="promise-list">
              {PROMISES.map((p, i) => (
                <li key={p.title} style={{ '--i': i }}>
                  <span className="promise-check"><HubIcon name="check" size={16} /></span>
                  <div>
                    <strong>{p.title}</strong>
                    <p>{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="promise-sign">
              <span className="promise-signature">Team Codestroom</span>
              <span className="promise-sign-line">Signed, with every project</span>
            </div>
          </div>

          <div className="promise-right">
            <span className="promise-stamp" aria-hidden="true">
              <span>One team</span>
              <b>✦</b>
              <span>Two paths</span>
            </span>
            <h3>How we start</h3>
            <ol className="promise-steps">
              {STEPS.map((step, i) => (
                <li key={step}>
                  <span className="promise-step-num">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
