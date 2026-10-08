import Reveal from '../Reveal';
import { spotlightMove } from './useSpotlight';

const REVIEWS = [
  {
    quote:
      'Codestroom is the first partner where our dev team and marketing team stopped blaming each other for missed deadlines. They just ran both and our ARR tripled in 5 months.',
    name: 'Marcus Vance',
    role: 'Head of Growth',
    company: 'Fintech Scaleup, Singapore',
    badge: 'Verified 3x ARR',
    avatar: 'MV',
    stars: 5,
    glow: 'testi-glow-pink',
  },
  {
    quote:
      'They rebuilt our entire Next.js storefront and rewrote our Google & Meta ad engines in the same sprint. For once, high-intent traffic actually had somewhere blazing fast to land.',
    name: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'DTC Retail, London UK',
    badge: 'Verified 4.2x ROAS',
    avatar: 'ER',
    stars: 5,
    glow: 'testi-glow-blue',
  },
  {
    quote:
      'Zero timezone lag between Canada and India. We deployed an autonomous AI agent workflow in 2 weeks that our previous agency estimated would take 6 months of consulting.',
    name: 'Devon Tremblay',
    role: 'VP Engineering',
    company: 'Healthtech, Toronto Canada',
    badge: 'Verified 6mo saved',
    avatar: 'DT',
    stars: 5,
    glow: 'testi-glow-purple',
  },
];

export default function FunkyTestimonials() {
  return (
    <section className="funky-testimonials-section">
      <div className="wrap">
        <Reveal className="funky-section-header">
          <div className="funky-pill-badge">
            <span className="pulsing-neon-dot"></span>
            <span>UNFILTERED CLIENT VOICES</span>
          </div>
          <h2 className="funky-title">
            Don’t just take our word for it. <span className="funky-gradient-text">Hear from the founders</span>.
          </h2>
          <p className="funky-subtitle">
            Real feedback from high-growth companies across the globe who traded agency bloat for speed and compound growth.
          </p>
        </Reveal>

        <div className="funky-testi-grid">
          {REVIEWS.map((r, idx) => (
            <Reveal as="div" key={r.name} delay={idx * 130} onPointerMove={spotlightMove} className={`funky-testi-card spotlight ${r.glow}`}>
              <span className="testi-quote-mark" aria-hidden="true">“</span>
              <div className="testi-card-header">
                <div className="stars-row">
                  {[...Array(r.stars)].map((_, i) => (
                    <span key={i} className="star-icon" style={{ '--s': i }}>★</span>
                  ))}
                </div>
                <span className="testi-verified-pill">{r.badge}</span>
              </div>

              <p className="testi-quote-text">"{r.quote}"</p>

              <div className="testi-author-row">
                <div className="testi-avatar-circle">{r.avatar}</div>
                <div className="testi-author-info">
                  <span className="testi-name">{r.name}</span>
                  <span className="testi-role">{r.role} • <em>{r.company}</em></span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
