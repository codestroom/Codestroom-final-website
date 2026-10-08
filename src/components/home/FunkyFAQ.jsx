import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal';

const FAQS = [
  {
    q: 'How fast can our project actually kick off?',
    a: 'Within 48 hours of alignment. We don’t spend 4 weeks writing discovery proposals that nobody reads. Once the sprint scope is locked, our senior engineers and marketing strategists jump directly into the code and campaign managers.',
  },
  {
    q: 'Why do you handle BOTH custom engineering and performance marketing?',
    a: 'Because great software with zero traffic goes bankrupt, and aggressive ad campaigns driving traffic to a clunky, slow app burn your cash. Unifying engineering and growth eliminates finger-pointing and maximizes ROI.',
  },
  {
    q: 'Do you work across international time zones?',
    a: 'Constantly. We serve clients across India, Canada, the United States, the UK, and Europe. Our asynchronous sprint workflows and scheduled standups ensure uninterrupted momentum 24/7.',
  },
  {
    q: 'Who actually writes the code and builds the campaigns?',
    a: 'Senior engineers, certified cloud architects, and veteran media buyers. We do not operate a junior farm or hand your core product over to untrained interns.',
  },
  {
    q: 'Who owns the intellectual property and code repository?',
    a: 'You do. 100%. From day one, all repositories, ad accounts, design assets, and cloud credentials belong strictly to your company.',
  },
];

export default function FunkyFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="funky-faq-section">
      <div className="wrap">
        <Reveal className="funky-section-header">
          <div className="funky-pill-badge">
            <span className="pulsing-neon-dot"></span>
            <span>GOT QUESTIONS?</span>
          </div>
          <h2 className="funky-title">
            Real talk. <span className="funky-gradient-text">Zero corporate spin</span>.
          </h2>
          <p className="funky-subtitle">
            Straight answers to what founders and leaders ask before partnering with Codestroom.
          </p>
        </Reveal>

        <div className="funky-faq-accordion">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Reveal as="div" key={idx} delay={idx * 80} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">+</span>
                </button>
                <div className="faq-answer-panel" inert={!isOpen}>
                  <div className="faq-answer-inner">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="faq-bottom-hint">
          <p>Have a custom requirement or curious about our tech stack?</p>
          <Link to="/contact" className="btn btn-ghost">
            Ask Our Engineers Directly →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
