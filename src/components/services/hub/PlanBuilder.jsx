import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../Reveal';
import HubIcon from './HubIcon';
import { BUSINESS_TYPES, GOALS, STAGES, buildPlan } from '../../../data/planBuilder';

const PHASE_LABELS = {
  build: { title: 'Build', sub: 'Your foundation' },
  launch: { title: 'Launch', sub: 'Get found' },
  grow: { title: 'Grow', sub: 'Leads & sales, every month' }
};

const STEP_TITLES = ['What kind of business?', 'What do you want? (pick any)', 'Where are you today?'];

function planText(plan, goals, stage) {
  const lines = [
    'Hi Codestroom team,',
    '',
    `I built a plan on your website for my ${plan.type.label.toLowerCase()} business.`,
    `Goals: ${goals.map((g) => GOALS.find((x) => x.id === g).label).join(', ')}.`,
    `Stage: ${STAGES.find((s) => s.id === stage).label}.`,
    '',
    'Suggested plan:'
  ];
  plan.phases.forEach((p) => {
    lines.push(`${PHASE_LABELS[p.id].title}: ${p.items.map((i) => i.name).join(', ')}`);
  });
  lines.push('', "I'd like an exact quote.");
  return lines.join('\n');
}

export default function PlanBuilder() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState(null);
  const [goals, setGoals] = useState([]);
  const [stage, setStage] = useState(null);
  const [copied, setCopied] = useState(false);

  const done = step === 3;
  const plan = useMemo(() => (done ? buildPlan({ type, goals, stage }) : null), [done, type, goals, stage]);

  const toggleGoal = (id) =>
    setGoals((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));

  const restart = () => {
    setStep(0);
    setType(null);
    setGoals([]);
    setStage(null);
    setCopied(false);
  };

  const copyPlan = async () => {
    try {
      await navigator.clipboard.writeText(planText(plan, goals, stage));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const canNext = (step === 0 && type) || (step === 1 && goals.length) || (step === 2 && stage);

  return (
    <section id="plan" className="plan">
      <div className="wrap plan-layout">
        <Reveal className="plan-intro">
          <span className="path-tag path-tag--grow">Free tool · 3 questions</span>
          <h2>Build your plan <span>in 20 seconds.</span></h2>
          <p>Tell us about your business. We&apos;ll show you exactly which services you need — and which you don&apos;t.</p>
          <div className="plan-progress" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className={i < step || done ? 'is-done' : i === step ? 'is-now' : ''} />
            ))}
          </div>
        </Reveal>

        <div className="plan-box">
          {!done && (
            <div className="plan-step" key={step}>
              <span className="plan-step-count">Question {step + 1} of 3</span>
              <h3>{STEP_TITLES[step]}</h3>

              {step === 0 && (
                <div className="plan-chips">
                  {BUSINESS_TYPES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      className={`plan-chip ${type === b.id ? 'is-on' : ''}`}
                      aria-pressed={type === b.id}
                      onClick={() => {
                        setType(b.id);
                        setStep(1);
                      }}
                    >
                      <span className="plan-emoji">{b.emoji}</span>
                      {b.label}
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="plan-chips">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      className={`plan-chip ${goals.includes(g.id) ? 'is-on' : ''}`}
                      aria-pressed={goals.includes(g.id)}
                      onClick={() => toggleGoal(g.id)}
                    >
                      <span className="plan-emoji">{g.emoji}</span>
                      {g.label}
                      {goals.includes(g.id) && <span className="plan-tick"><HubIcon name="check" size={12} /></span>}
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="plan-stages">
                  {STAGES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={`plan-stage ${stage === s.id ? 'is-on' : ''}`}
                      aria-pressed={stage === s.id}
                      onClick={() => {
                        setStage(s.id);
                        setStep(3);
                      }}
                    >
                      <strong>{s.label}</strong>
                      <span>{s.hint}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="plan-nav">
                {step > 0 ? (
                  <button type="button" className="plan-back" onClick={() => setStep(step - 1)}>
                    ← Back
                  </button>
                ) : <span />}
                {step === 1 && (
                  <button type="button" className="btn btn-primary" disabled={!canNext} onClick={() => setStep(2)}>
                    Next <HubIcon name="arrow" size={15} />
                  </button>
                )}
              </div>
            </div>
          )}

          {done && plan && (
            <div className="plan-result">
              <div className="plan-result-head">
                <div>
                  <span className="plan-step-count">Your plan · {plan.type.emoji} {plan.type.label}</span>
                  <h3>{plan.items.length} services, one team.</h3>
                </div>
                <button type="button" className="plan-back" onClick={restart}>Start over</button>
              </div>

              <div className="plan-phases">
                {plan.phases.map((p, pi) => (
                  <div key={p.id} className={`plan-phase plan-phase--${p.id}`} style={{ '--p': pi }}>
                    <div className="plan-phase-head">
                      <span className="plan-phase-num">{pi + 1}</span>
                      <div>
                        <strong>{PHASE_LABELS[p.id].title}</strong>
                        <small>{PHASE_LABELS[p.id].sub}</small>
                      </div>
                    </div>
                    <ul>
                      {p.items.map((it, i) => (
                        <li key={it.id} style={{ '--i': pi * 3 + i }}>
                          <span className="plan-item-icon"><HubIcon name={it.icon} size={16} /></span>
                          {it.name}
                          {it.fromPrice && <em>from {it.fromPrice}</em>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="plan-facts">
                {plan.buildWeeks && (
                  <div>
                    <small>Typical build time</small>
                    <strong>{plan.buildWeeks[0]}–{plan.buildWeeks[1]} weeks</strong>
                  </div>
                )}
                {plan.hasMarketing && (
                  <div>
                    <small>Marketing results</small>
                    <strong>Build over 3–6 months</strong>
                  </div>
                )}
                <div>
                  <small>Exact price</small>
                  <strong>Quote within 48 hours</strong>
                </div>
              </div>

              <div className="plan-cta">
                <Link
                  to={`/contact?service=something&message=${encodeURIComponent(planText(plan, goals, stage))}`}
                  className="btn btn-gradient"
                >
                  Send me this plan & quote <HubIcon name="arrow" size={16} />
                </Link>
                <button type="button" className="btn btn-ghost" onClick={copyPlan}>
                  {copied ? 'Copied ✓' : 'Copy plan'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
