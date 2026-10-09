import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HubIcon from '../services/hub/HubIcon';
import { HOME_FAQ } from '../../data/homeFaq';
import '../../styles/ask-us.css';

/* FAQ as a chat: tap a question, it "sends", the team types, the answer arrives.
   Answers stay in the thread, so it reads like a real conversation. */

const TYPING_MS = 900;
const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function AskUs() {
  const [asked, setAsked] = useState([]); // indexes of answered questions, in order
  const [pending, setPending] = useState(null); // question currently being "typed"
  const sectionRef = useRef(null);
  const threadRef = useRef(null);
  const timer = useRef(null);

  const ask = (i) => {
    if (pending !== null || asked.includes(i)) return;
    setPending(i);
    timer.current = setTimeout(() => {
      setAsked((a) => [...a, i]);
      setPending(null);
    }, reduceMotion() ? 0 : TYPING_MS);
  };

  // open the conversation with the most common question once it's on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    let t;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        t = setTimeout(() => ask(0), 600);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  // keep the newest message in view — scroll the thread only, never the page
  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    if (typeof el.scrollTo === 'function') el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion() ? 'auto' : 'smooth' });
    else el.scrollTop = el.scrollHeight;
  }, [asked, pending]);

  const remaining = HOME_FAQ.map((f, i) => i).filter((i) => !asked.includes(i) && i !== pending);

  return (
    <section ref={sectionRef} className="ask" aria-labelledby="ask-title">
      <div className="wrap ask-layout">
        <div className="ask-intro">
          <span className="ask-kicker">Got questions?</span>
          <h2 id="ask-title">Ask us <span>anything.</span></h2>
          <p>Tap a question — you&apos;ll get the same straight answer we&apos;d give you on a call.</p>
          <div className="ask-promise">
            <span className="ask-promise-dot" />
            Real people reply within 48 hours
          </div>
        </div>

        <div className="ask-phone">
          <div className="ask-head">
            <img src="/assets/logo-icon.webp" alt="" width="40" height="40" className="ask-avatar" />
            <div>
              <strong>Codestroom team</strong>
              <small>{pending !== null ? 'typing…' : 'online'}</small>
            </div>
          </div>

          <div className="ask-thread" ref={threadRef} aria-live="polite">
            <div className="ask-msg ask-msg--them">Hi 👋 What would you like to know?</div>

            {asked.map((i) => (
              <div key={i} className="ask-pair">
                <div className="ask-msg ask-msg--me">{HOME_FAQ[i].q}</div>
                <div className="ask-msg ask-msg--them">
                  {HOME_FAQ[i].a}
                  {HOME_FAQ[i].link && (
                    <Link to={HOME_FAQ[i].link.to} className="ask-link">
                      {HOME_FAQ[i].link.label} <HubIcon name="arrow" size={13} />
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {pending !== null && (
              <div className="ask-pair">
                <div className="ask-msg ask-msg--me">{HOME_FAQ[pending].q}</div>
                <div className="ask-typing" aria-label="Codestroom is typing"><i /><i /><i /></div>
              </div>
            )}
          </div>

          <div className="ask-chips" role="group" aria-label="Questions you can ask">
            {remaining.length > 0 ? (
              remaining.map((i) => (
                <button key={i} type="button" className="ask-chip" onClick={() => ask(i)} disabled={pending !== null}>
                  {HOME_FAQ[i].q}
                </button>
              ))
            ) : (
              <span className="ask-done">That&apos;s everything — anything else, just message us 👇</span>
            )}
          </div>

          <Link to="/contact" className="ask-compose">
            <span>Have another question? Message us…</span>
            <span className="ask-send"><HubIcon name="arrow" size={16} /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
