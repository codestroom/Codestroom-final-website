import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sentence-form.css';

/* Home page enquiry, written as one sentence you fill in:
   "Hi, I'm ___ from ___. I need ___. You can reach me at ___."
   Sends to the same Formspree inbox (and fires the same Meta Lead event)
   as the full contact form. */

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const NEEDS = [
  'a new website',
  'an online store',
  'a mobile app',
  'more customers',
  'social media growth',
  'AI automation',
  'custom software',
  'something else',
];

// an input that grows with what's typed, so the sentence reads naturally
function Blank({ label, after, onValue, placeholder, ...rest }) {
  const [len, setLen] = useState(0);
  return (
    <span className="sf-chunk">
      <label className="sf-blank">
        <span className="sr-only">{label}</span>
        <input
          {...rest}
          placeholder={placeholder}
          size={Math.max(len, placeholder.length) + 1}
          onChange={(e) => {
            setLen(e.target.value.length);
            onValue?.(e.target.value);
          }}
        />
      </label>
      {after}
    </span>
  );
}

export default function SentenceForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [name, setName] = useState('');
  const sending = useRef(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (sending.current) return;
    if (!FORMSPREE_ENDPOINT) {
      setStatus('error');
      return;
    }
    const form = e.currentTarget;
    const f = new FormData(form);
    const contact = String(f.get('contact') || '').trim();
    const business = String(f.get('business') || '').trim();
    const need = String(f.get('need') || '');

    // shape it like the main form so enquiries look the same in the inbox
    const body = new FormData();
    body.set('name', String(f.get('name') || '').trim());
    if (contact.includes('@')) body.set('email', contact);
    else body.set('phone', contact);
    body.set('service', need);
    body.set(
      'message',
      `Hi, I'm ${body.get('name')}${business ? ` from ${business}` : ''}. I need ${need}. You can reach me at ${contact}.`,
    );
    body.set('source', 'Home page quick enquiry');

    sending.current = true;
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body });
      if (res.ok) {
        setStatus('success');
        // Meta Lead conversion — only after a confirmed submission, same as the contact page
        if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'Lead');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      sending.current = false;
    }
  }

  return (
    <section className="sf" id="contact" aria-labelledby="sf-title">
      <div className="wrap">
        <div className="sf-card">
          <span className="sf-glow sf-glow--a" aria-hidden="true" />
          <span className="sf-glow sf-glow--b" aria-hidden="true" />

          <div className="sf-head">
            <span className="sf-pill"><i /> Reply within 48 hours</span>
            <h2 id="sf-title">Start with one sentence.</h2>
            <p>Fill in the blanks — that&apos;s the whole form.</p>
          </div>

          {status === 'success' ? (
            <div className="sf-done" role="status">
              <span className="sf-done-icon" aria-hidden="true">🎉</span>
              <p>
                Thanks{name ? `, ${name.split(' ')[0]}` : ''}! We&apos;ll get back to you within 48 hours.
              </p>
              <button type="button" className="sf-again" onClick={() => setStatus('idle')}>Send another</button>
            </div>
          ) : (
            <form className="sf-form" onSubmit={onSubmit}>
              <p className="sf-sentence">
                Hi, I&apos;m{' '}
                <Blank label="Your name" name="name" required autoComplete="name" placeholder="your name" onValue={setName} after="" />{' '}
                from{' '}
                <Blank label="Your business (optional)" name="business" autoComplete="organization" placeholder="your business" after="," />{' '}
                and I need{' '}
                <span className="sf-chunk">
                  <label className="sf-blank sf-blank--select">
                    <span className="sr-only">What you need</span>
                    <select name="need" required defaultValue="">
                      <option value="" disabled>pick one</option>
                      {NEEDS.map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </label>
                  .
                </span>{' '}
                Reach me at{' '}
                <Blank label="Email or WhatsApp number" name="contact" required autoComplete="email" placeholder="email or WhatsApp" after="." />
              </p>

              <div className="sf-actions">
                <button type="submit" className="sf-send" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send it'} <span aria-hidden="true">→</span>
                </button>
                <span className="sf-or">
                  or <a href="https://wa.me/919464529126" target="_blank" rel="noopener noreferrer">WhatsApp us</a> ·{' '}
                  <Link to="/contact">use the full form</Link>
                </span>
              </div>

              {status === 'error' && (
                <p className="sf-error">
                  Something went wrong — please email{' '}
                  <a href="mailto:contact@codestroom.com">contact@codestroom.com</a> or WhatsApp us.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
