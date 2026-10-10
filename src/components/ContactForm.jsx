import { useState, useEffect, useRef } from 'react';
import '../styles/contact-top.css';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const SERVICE_OPTIONS = [
  'AI Services & Solutions',
  'Web Development (React / Next / Angular)',
  'Custom Software & SaaS Platforms',
  'Mobile App Development (Flutter / React Native / iOS / Android)',
  'Backend Development & Cloud APIs (FastAPI / Node / Spring)',
  'E-Commerce Solutions (Shopify / WooCommerce)',
  'Digital Marketing, SEO & Performance Growth',
  'Paid Advertising',
  'Social Media Marketing',
  'Local SEO & Google Business',
  'Website & Landing Pages',
  'Branding & Content Creation',
  'Creative Design & Video Editing',
  'Something else',
];

// One-tap shortcuts for the things people ask for most. Each one just sets the
// select below, which stays the single source of truth for the submission.
// a friendly reaction when someone picks what they need
const REACTIONS = {
  'AI Services & Solutions': 'AI? Let’s put it to work for you 🤖',
  'Website & Landing Pages': 'A website? Our favourite kind of project 🖥️',
  'Mobile App Development (Flutter / React Native / iOS / Android)': 'An app! iPhone and Android, coming up 📱',
  'E-Commerce Solutions (Shopify / WooCommerce)': 'Let’s get your store selling 🛒',
  'Digital Marketing, SEO & Performance Growth': 'More customers — say no more 📈',
  'Something else': 'No problem — tell us the situation, we’ll figure it out together 🤝',
};

// how the message box reacts as people write
const messageMood = (len) => {
  if (len === 0) return '';
  if (len < 30) return 'Good start ✍️';
  if (len < 120) return 'Nice — this helps a lot 👌';
  return 'Perfect, that’s plenty to go on 🙌';
};


const CONFETTI = Array.from({ length: 28 }, (_, i) => i);

const QUICK_PICKS = [
  { emoji: '🤖', label: 'AI / automation', value: 'AI Services & Solutions' },
  { emoji: '🖥️', label: 'A website', value: 'Website & Landing Pages' },
  { emoji: '📱', label: 'A mobile app', value: 'Mobile App Development (Flutter / React Native / iOS / Android)' },
  { emoji: '🛒', label: 'An online store', value: 'E-Commerce Solutions (Shopify / WooCommerce)' },
  { emoji: '📈', label: 'More customers', value: 'Digital Marketing, SEO & Performance Growth' },
  { emoji: '🤔', label: 'Not sure yet', value: 'Something else' },
];

const STARTERS = ['Budget around ₹…', 'Deadline: …', 'Our current website: …', 'We are a … business'];


export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [selectedService, setSelectedService] = useState('');
  const [messageValue, setMessageValue] = useState('');
  // Synchronous re-entrancy guard: React state (`status`) is only safe to read
  // after a render commits, so a rapid double-click/double-Enter could invoke
  // handleSubmit twice before `disabled` ever reflects `sending`. This ref is
  // checked and set before any await, so the second call bails out immediately
  // — that's what actually stops a duplicate Formspree POST and a duplicate
  // fbq('track', 'Lead') for one logical submission.
  const isSubmittingRef = useRef(false);
  const formRef = useRef(null);
  const messageRef = useRef(null);
  // name + email filled (service & message are tracked through their own state)
  const [filled, setFilled] = useState(0);
  const [firstName, setFirstName] = useState('');
  const countFilled = () => {
    const f = formRef.current;
    if (!f) return;
    setFilled(['name', 'email'].filter((n) => f.elements[n]?.value.trim()).length);
    setFirstName((f.elements.name?.value || '').trim().split(/\s+/)[0].slice(0, 20));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const srvParam = params.get('service');
    const tierParam = params.get('tier');

    if (srvParam) {
      const match = SERVICE_OPTIONS.find(
        (opt) =>
          opt.toLowerCase().includes(srvParam.replace(/-/g, ' ').toLowerCase()) ||
          opt.toLowerCase().includes(srvParam.toLowerCase())
      );
      if (match) setSelectedService(match);
    }
    const messageParam = params.get('message');
    if (messageParam) {
      setMessageValue(messageParam.slice(0, 2000));
    } else if (tierParam) {
      setMessageValue(`Hi Codestroom team,\n\nI am interested in discussing the "${tierParam}" project scope.`);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmittingRef.current) return;

    if (!FORMSPREE_ENDPOINT) {
      setStatus('error');
      return;
    }

    isSubmittingRef.current = true;
    const form = e.target;
    setStatus('sending');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (res.ok) {
        setStatus('success');

        // Meta Lead conversion event — fires exactly once, only here, only
        // after Formspree confirms the submission succeeded. Never fires on
        // page load, on opening this page, or on a failed/invalid submission.
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead');
        }

        form.reset();
        // the visitor is at the submit button; bring the success message into view
        form.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
        setSelectedService('');
        setMessageValue('');
        setFilled(0);
        setFirstName('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      isSubmittingRef.current = false;
    }
  }

  const filledCount = filled + (selectedService ? 1 : 0) + (messageValue.trim() ? 1 : 0);
  const progress = Math.round((filledCount / 4) * 100);

  const addStarter = (text) => {
    setMessageValue((m) => (m.trim() ? `${m.trimEnd()}\n${text}` : text));
    messageRef.current?.focus();
  };

  return (
    <section className="ct" id="contact-form">
      <div className="ct-glow ct-glow--a" aria-hidden="true" />
      <div className="ct-glow ct-glow--b" aria-hidden="true" />
      <div className="wrap ct-layout">
        <div className="ct-intro">
          <span className="ct-pill"><span className="ct-pill-dot" /> Taking new projects · reply within 48h</span>
          <h1>
            Tell us what you need. <span>We&apos;ll handle the rest.</span>
          </h1>
          <p>Two minutes, no account, no sales script. A real person reads every message.</p>

          <div className="ct-quick">
            <a className="ct-quick-btn ct-quick-btn--wa" href="https://wa.me/919464529126" target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">💬</span>
              <span><strong>WhatsApp us</strong><small>Fastest reply</small></span>
            </a>
            <a className="ct-quick-btn" href="tel:+919464529126">
              <span aria-hidden="true">📞</span>
              <span><strong>+91 94645 29126</strong><small>Mon–Sat, 10–7 IST</small></span>
            </a>
            <a className="ct-quick-btn" href="mailto:contact@codestroom.com">
              <span aria-hidden="true">📨</span>
              <span><strong>contact@codestroom.com</strong><small>For briefs &amp; files</small></span>
            </a>
          </div>

          <ol className="ct-next">
            <li><b>1</b> You send this form</li>
            <li><b>2</b> We reply within 48h with questions or a plan</li>
            <li><b>3</b> Free call, then a fixed price — no surprises</li>
          </ol>
        </div>

        <form
          className={`ct-card ${status === 'success' ? 'is-done' : ''}`}
          onSubmit={handleSubmit}
          onInput={countFilled}
          ref={formRef}
        >
          <div className={`ct-meter ${progress === 100 ? 'is-full' : ''}`} style={{ '--p': progress / 100 }} aria-hidden="true">
            <span className="ct-logo">
              <svg viewBox="0 0 80 80" className="ct-ring" aria-hidden="true">
                <defs>
                  <linearGradient id="ct-ring-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f8228b" />
                    <stop offset="0.5" stopColor="#6e22b8" />
                    <stop offset="1" stopColor="#2e9df4" />
                  </linearGradient>
                </defs>
                <circle className="ct-ring-track" cx="40" cy="40" r="36" />
                <circle className="ct-ring-fill" cx="40" cy="40" r="36" pathLength="100" />
              </svg>
              <img src="/assets/logo-icon.webp" alt="" width="40" height="40" />
            </span>
            <div className="ct-meter-text">
              <strong>{firstName ? `Nice to meet you, ${firstName} 👋` : 'Let’s build something together'}</strong>
              <span>{progress === 100 ? 'Ready to send ✓' : `${filledCount} of 4 done — the ring fills as you go`}</span>
              <i style={{ '--w': `${progress}%` }} />
            </div>
          </div>

          <fieldset className="ct-step">
            <legend><b>1</b> What do you need?</legend>
            <div className="ct-picks">
              {QUICK_PICKS.map((pick) => (
                <button
                  key={pick.value}
                  type="button"
                  className={`ct-pick ${selectedService === pick.value ? 'is-on' : ''}`}
                  aria-pressed={selectedService === pick.value}
                  onClick={() => setSelectedService(pick.value)}
                >
                  <span className="ct-pick-emoji" aria-hidden="true">{pick.emoji}</span>
                  {pick.label}
                </button>
              ))}
            </div>
            <div className="ct-field">
              <label htmlFor="service">What are you looking for?</label>
              <select
                id="service"
                name="service"
                required
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="" disabled>Or choose a specific service</option>
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            {selectedService && (
              <p className="ct-react" key={selectedService}>
                {REACTIONS[selectedService] || 'Great choice — we do a lot of this ✨'}
              </p>
            )}
          </fieldset>

          <fieldset className="ct-step">
            <legend><b>2</b> How do we reach you?</legend>
            <div className="ct-row">
              <div className="ct-field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" />
              </div>
              <div className="ct-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
              </div>
            </div>
            <div className="ct-field">
              <label htmlFor="phone">Phone (optional)</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="WhatsApp number works best" />
            </div>
          </fieldset>

          <fieldset className="ct-step">
            <legend><b>3</b> Tell us a little more</legend>
            <div className="ct-field">
              <label htmlFor="message">Your query</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                ref={messageRef}
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                placeholder="What do you want to build, fix or grow?"
              />
              {messageMood(messageValue.trim().length) && (
                <span className="ct-mood" key={messageMood(messageValue.trim().length)}>
                  {messageMood(messageValue.trim().length)}
                </span>
              )}
            </div>
            <div className="ct-starters">
              <span>Tap to add:</span>
              {STARTERS.map((t) => (
                <button key={t} type="button" onClick={() => addStarter(t)}>+ {t}</button>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="ct-submit" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <><span className="ct-plane" aria-hidden="true">✈️</span> Sending…</>
            ) : (
              <>Send message <span aria-hidden="true">→</span></>
            )}
          </button>
          <p className="ct-fine">🔒 No newsletter, no spam, never shared. NDA on request.</p>

          {status === 'error' && (
            <p className="form-status form-status-error ct-status">
              <span aria-hidden="true">😬</span> Something went wrong. Please email us directly at{' '}
              <a href="mailto:contact@codestroom.com">contact@codestroom.com</a> or{' '}
              <a href="https://wa.me/919464529126" target="_blank" rel="noopener noreferrer">WhatsApp us</a>.
            </p>
          )}

          {status === 'success' && (
            <div className="ct-success" role="status">
              <div className="ct-confetti" aria-hidden="true">
                {CONFETTI.map((i) => (
                  <i key={i} style={{ '--i': i, '--x': `${(i * 37) % 100}%`, '--r': `${(i * 53) % 360}deg`, '--d': `${(i % 7) * 0.08}s` }} />
                ))}
              </div>
              <span className="ct-success-icon" aria-hidden="true">🎉</span>
              <h2>Message received!</h2>
              <p>Thanks — we&apos;ll get back to you within 48 hours.</p>
              <p className="ct-success-sub">Need it sooner? Message us on WhatsApp.</p>
              <div className="ct-success-actions">
                <a className="ct-quick-btn ct-quick-btn--wa" href="https://wa.me/919464529126" target="_blank" rel="noopener noreferrer">
                  <span aria-hidden="true">💬</span><span><strong>WhatsApp us</strong></span>
                </a>
                <button type="button" className="ct-again" onClick={() => setStatus('idle')}>Send another</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
