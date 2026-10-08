import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal';

export default function FunkyCTA() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@codestroom.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="funky-cta-section">
      <div className="wrap">
        <Reveal variant="scale" className="funky-cta-box">
          <div className="cta-ambient-glow glow-1"></div>
          <div className="cta-ambient-glow glow-2"></div>
          <div className="cta-sparks" aria-hidden="true">
            {[...Array(8)].map((_, i) => (
              <span key={i} style={{ '--k': i }}></span>
            ))}
          </div>
          
          <div className="cta-badge-pill">
            <span className="pulsing-neon-dot"></span>
            <span>LET’S MAKE IT HAPPEN</span>
          </div>

          <h2 className="funky-cta-heading">
            Tell us about your business. <br />
            <span className="funky-gradient-text">We promise not to yawn.</span>
          </h2>

          <p className="funky-cta-desc">
            No 47-slide decks. No "let's circle back." Just a straight answer on scope, timeline, and deliverables — within 48 hours.
          </p>

          <div className="funky-cta-actions">
            <button
              type="button"
              className="btn btn-gradient copy-email-btn"
              onClick={copyEmail}
              title="Click to copy email address"
            >
              <span className="email-icon">✉️</span>
              <span>contact@codestroom.com</span>
              {copied && <span className="copied-tooltip">Copied! 🚀</span>}
            </button>

            <Link to="/contact" className="btn btn-ghost cta-book-btn">
              Book an Intro Sprint Call →
            </Link>
          </div>

          <div className="funky-cta-perks">
            <span>⚡ 48h Reply SLA</span>
            <span>•</span>
            <span>🔒 Strict NDA Included</span>
            <span>•</span>
            <span>🌍 Worldwide Teams</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
