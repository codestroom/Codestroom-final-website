import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../Reveal';
import HubIcon from './HubIcon';
import { CATEGORIES, normalizeUrl, parseReport, tone, verdict } from './auditReport';

const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const PSI_KEY = import.meta.env.VITE_PSI_API_KEY;

const SCAN_STEPS = [
  'Opening your site on a mobile phone…',
  'Measuring how fast it loads…',
  'Checking what Google sees…',
  'Testing accessibility…',
  'Reviewing security & best practices…',
  'Putting your report together…'
];

function Gauge({ label, score, delay }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className={`gauge gauge--${tone(score)}`} style={{ '--delay': `${delay}ms` }}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={r} className="gauge-track" />
        <circle
          cx="50"
          cy="50"
          r={r}
          className="gauge-fill"
          strokeDasharray={c}
          style={{ '--off': c * (1 - score / 100), '--full': c }}
        />
      </svg>
      <span className="gauge-num">{score}</span>
      <span className="gauge-label">{label}</span>
    </div>
  );
}

export default function WebsiteAudit() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | running | done | error
  const [step, setStep] = useState(0);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (status !== 'running') return undefined;
    const t = setInterval(() => setStep((s) => Math.min(s + 1, SCAN_STEPS.length - 1)), 3500);
    return () => clearInterval(t);
  }, [status]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function runAudit(e) {
    e.preventDefault();
    const url = normalizeUrl(input);
    if (!url) {
      setError({ kind: 'invalid' });
      setStatus('error');
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 90000);

    setStatus('running');
    setStep(0);
    setError(null);
    setReport(null);

    const params = new URLSearchParams({ url, strategy: 'mobile' });
    CATEGORIES.forEach((c) => params.append('category', c.id));
    if (PSI_KEY) params.set('key', PSI_KEY);

    try {
      const res = await fetch(`${PSI_ENDPOINT}?${params}`, { signal: controller.signal });
      const data = await res.json();
      if (!res.ok) {
        setError({ kind: res.status === 429 ? 'busy' : 'unreachable' });
        setStatus('error');
        return;
      }
      setReport(parseReport(data));
      setStatus('done');
    } catch (err) {
      if (err.name === 'AbortError' && abortRef.current !== controller) return;
      setError({ kind: 'unreachable' });
      setStatus('error');
    } finally {
      clearTimeout(timeout);
    }
  }

  const contactLink = (() => {
    const site = report?.url || normalizeUrl(input) || input;
    const summary = report
      ? `Hi Codestroom team,\n\nI ran the free website check on ${site}.\nScores — ${report.scores
          .map((s) => `${s.label}: ${s.score}`)
          .join(', ')}.\n\nI'd like help fixing the issues it found.`
      : `Hi Codestroom team,\n\nPlease send me a free website audit for ${site}.`;
    return `/contact?service=website&message=${encodeURIComponent(summary)}`;
  })();

  return (
    <section id="audit" className="audit">
      <div className="wrap">
        <Reveal className="audit-head">
          <span className="path-tag path-tag--grow">Free tool · 30 seconds</span>
          <h2>How does your website <span>really</span> score?</h2>
          <p>We test your site exactly like Google does — on a mobile phone. Real data, no sign-up.</p>
        </Reveal>

        <form className="audit-form" onSubmit={runAudit} noValidate>
          <label htmlFor="audit-url" className="sr-only">Your website address</label>
          <span className="audit-form-icon"><HubIcon name="search" size={20} /></span>
          <input
            id="audit-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourwebsite.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status === 'running'}
          />
          <button type="submit" className="btn btn-gradient" disabled={status === 'running' || !input.trim()}>
            {status === 'running' ? 'Testing…' : 'Test my website'}
          </button>
        </form>

        <div className="audit-result" aria-live="polite">
          {status === 'running' && (
            <div className="audit-scan">
              <div className="audit-phone">
                <span className="audit-phone-notch" />
                <div className="audit-phone-screen">
                  <i /><i /><i className="w60" /><i className="tall" /><i /><i className="w60" />
                  <span className="audit-scanline" />
                </div>
              </div>
              <div className="audit-steps">
                {SCAN_STEPS.map((s, i) => (
                  <div key={s} className={`audit-step ${i < step ? 'is-done' : ''} ${i === step ? 'is-now' : ''}`}>
                    <span className="audit-step-dot">{i < step ? <HubIcon name="check" size={12} /> : null}</span>
                    {s}
                  </div>
                ))}
                <p className="audit-note">Google runs a full test, so this takes 15–30 seconds.</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="audit-error">
              {error?.kind === 'invalid' && <p>That doesn&apos;t look like a website address. Try something like <b>yourbusiness.com</b>.</p>}
              {error?.kind === 'unreachable' && (
                <p>We couldn&apos;t open that website. Check the address and try again — or let us check it for you.</p>
              )}
              {error?.kind === 'busy' && (
                <p>Our free checker is very busy right now. Leave your address with us and we&apos;ll send you a full report by hand.</p>
              )}
              {error?.kind !== 'invalid' && (
                <Link to={contactLink} className="btn btn-primary">Get a free manual audit</Link>
              )}
            </div>
          )}

          {status === 'done' && report && (
            <div className="audit-report">
              <div className="audit-shot">
                <div className="audit-phone is-real">
                  <span className="audit-phone-notch" />
                  {report.screenshot ? (
                    <img src={report.screenshot} alt={`Mobile screenshot of ${report.url}`} />
                  ) : (
                    <div className="audit-phone-screen" />
                  )}
                </div>
                <span className="audit-url">{report.url}</span>
              </div>

              <div className="audit-body">
                <p className={`audit-verdict audit-verdict--${tone(report.scores[0].score)}`}>
                  {verdict(report.scores[0].score)}
                </p>

                <div className="audit-gauges">
                  {report.scores.map((s, i) => (
                    <Gauge key={s.id} label={s.label} score={s.score} delay={i * 150} />
                  ))}
                </div>

                <div className="audit-metrics">
                  {report.metrics.map((m) => (
                    <div key={m.id} className={`audit-metric audit-metric--${tone(m.score)}`}>
                      <span>{m.label}</span>
                      <strong>{m.value}</strong>
                    </div>
                  ))}
                </div>

                {report.issues.length > 0 && (
                  <div className="audit-issues">
                    <h3>
                      {report.issueCount} things to fix
                      {report.issueCount > report.issues.length && <small> · top {report.issues.length} shown</small>}
                    </h3>
                    <ul>
                      {report.issues.map((it, i) => (
                        <li key={it.id} style={{ '--i': i }}>
                          <span className="audit-issue-cat">{it.category}</span>
                          <span className="audit-issue-title">{it.title}</span>
                          {it.detail && <span className="audit-issue-detail">{it.detail}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="audit-cta">
                  <Link to={contactLink} className="btn btn-gradient">
                    Fix these for me <HubIcon name="arrow" size={16} />
                  </Link>
                  <span>Free consultation · reply within 48 hours</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
