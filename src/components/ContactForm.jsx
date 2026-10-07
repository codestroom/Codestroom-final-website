import { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';

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
const QUICK_PICKS = [
  { emoji: '🤖', label: 'AI / automation', value: 'AI Services & Solutions' },
  { emoji: '🖥️', label: 'A website', value: 'Website & Landing Pages' },
  { emoji: '📱', label: 'A mobile app', value: 'Mobile App Development (Flutter / React Native / iOS / Android)' },
  { emoji: '🛒', label: 'An online store', value: 'E-Commerce Solutions (Shopify / WooCommerce)' },
  { emoji: '📈', label: 'More customers', value: 'Digital Marketing, SEO & Performance Growth' },
  { emoji: '🤔', label: 'Not sure yet', value: 'Something else' },
];

const REASSURANCE = [
  {
    emoji: '👋',
    title: 'A real person replies',
    desc: 'No bots, no auto-responders — someone on the team reads every single query.',
  },
  {
    emoji: '⚡',
    title: 'Within 48 hours',
    desc: 'That is the promise. We do not consider a slow reply an acceptable one.',
  },
  {
    emoji: '🧘',
    title: 'Zero pressure',
    desc: 'No aggressive follow-up calls — just a straight answer so you can decide.',
  },
  {
    emoji: '🔒',
    title: 'Your idea stays yours',
    desc: 'Happy to sign an NDA before you tell us anything. Just ask in the message.',
  },
];

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
        setSelectedService('');
        setMessageValue('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      isSubmittingRef.current = false;
    }
  }

  return (
    <section className="contact-form-section" id="contact-form">
      <div className="wrap">
        <Reveal className="funky-section-header">
          <div className="funky-pill-badge">
            <span className="pulsing-neon-dot"></span>
            <span>SEND A QUERY</span>
          </div>
          <h2 className="funky-title">
            Tell us a bit about <span className="funky-gradient-text">what you need</span>.
          </h2>
          <p className="funky-subtitle">
            Two minutes, five fields, no account to create. The more mess you describe, the more
            useful our first reply will be.
          </p>
        </Reveal>

        <div className="contact-form-grid">
          <Reveal as="form" className="funky-form-card" onSubmit={handleSubmit} noValidate={false}>
            <div className="form-card-glow glow-a" aria-hidden="true"></div>
            <div className="form-card-glow glow-b" aria-hidden="true"></div>

            <div className="form-card-head">
              <span className="form-card-dots" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span className="form-card-title">new-project-brief.txt</span>
              <span className="form-card-flag">⚡ 48h reply</span>
            </div>

            <div className="quick-picks">
              <span className="quick-picks-label">Quick start — what is this about?</span>
              <div className="quick-picks-row">
                {QUICK_PICKS.map((pick) => (
                  <button
                    key={pick.value}
                    type="button"
                    className={`quick-pick ${selectedService === pick.value ? 'is-active' : ''}`}
                    aria-pressed={selectedService === pick.value}
                    onClick={() => setSelectedService(pick.value)}
                  >
                    <span aria-hidden="true">{pick.emoji}</span> {pick.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field funky-field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required autoComplete="name" placeholder="Who are we talking to?" />
              </div>
              <div className="form-field funky-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field funky-field">
                <label htmlFor="phone">Phone (optional)</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="WhatsApp works too" />
              </div>
              <div className="form-field funky-field">
                <label htmlFor="service">What are you looking for?</label>
                <select
                  id="service"
                  name="service"
                  required
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field funky-field">
              <label htmlFor="message">Your query</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                placeholder="What are you trying to build, fix or grow? Deadlines and budget ranges are welcome but not required."
              />
              <span className="field-counter">
                {messageValue.trim().length === 0
                  ? 'Ramble away — detail helps.'
                  : `${messageValue.trim().length} characters of useful context 👌`}
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-gradient funky-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <span className="submit-spinner" aria-hidden="true"></span> Sending…
                </>
              ) : (
                <>Send message <span aria-hidden="true">🚀</span></>
              )}
            </button>

            <p className="form-fineprint">
              No newsletter, no CRM drip, no reselling your details. Just a reply.
            </p>

            {status === 'success' && (
              <p className="form-status form-status-success funky-status">
                <span aria-hidden="true">🎉</span> Message landed — we&apos;ll get back to you within
                48 hours.
              </p>
            )}
            {status === 'error' && (
              <p className="form-status form-status-error funky-status">
                <span aria-hidden="true">😬</span> Something went wrong. Please email us directly at{' '}
                <a href="mailto:contact@codestroom.com">contact@codestroom.com</a>.
              </p>
            )}
          </Reveal>

          <Reveal className="contact-aside">
            <div className="funky-aside-card">
              <div className="aside-live">
                <span className="pulsing-neon-dot"></span>
                <span>Currently taking new projects</span>
              </div>

              <h3>What happens next</h3>

              <ul className="funky-steps">
                {REASSURANCE.map((item, idx) => (
                  <li key={item.title}>
                    <span className="funky-step-emoji" aria-hidden="true">
                      {item.emoji}
                    </span>
                    <div>
                      <strong>
                        <span className="funky-step-num">0{idx + 1}</span> {item.title}
                      </strong>
                      <span>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="funky-aside-direct">
                <span className="funky-aside-direct-label">Prefer to skip the form?</span>
                <a href="mailto:contact@codestroom.com">
                  <span aria-hidden="true">📨</span> contact@codestroom.com
                </a>
                <a href="https://wa.me/919464529126" target="_blank" rel="noopener noreferrer">
                  <span aria-hidden="true">💬</span> WhatsApp us
                </a>
                <a href="tel:+919464529126">
                  <span aria-hidden="true">📞</span> +91 94645 29126
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
