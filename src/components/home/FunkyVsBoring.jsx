import { Link } from 'react-router-dom';
import Reveal from '../Reveal';

const COMPARISONS = [
  {
    boring: '47-slide PowerPoint decks filled with empty corporate jargon',
    funky: 'Working code, live staging links & measurable conversions from Day 1',
    category: 'Deliverables',
  },
  {
    boring: '3-week email ping-pong just to get an update or simple bugfix',
    funky: 'Direct Slack / WhatsApp channel with senior engineers & strategists',
    category: 'Communication',
  },
  {
    boring: 'Junior interns secretly doing the work behind a flashy senior pitch',
    funky: '100% veteran builders, AI engineers and battle-tested operators',
    category: 'Team Makeup',
  },
  {
    boring: 'Hidden hourly billing, endless change requests, and budget bloat',
    funky: 'Crystal clear sprint pricing, transparent scope & zero billing surprises',
    category: 'Billing & Scope',
  },
  {
    boring: 'Dev agency blames Marketing; Marketing agency blames Dev',
    funky: 'One unified powerhouse running AI, Engineering & High-ROAS Growth',
    category: 'Execution',
  },
];

export default function FunkyVsBoring() {
  return (
    <section className="funky-vs-section">
      <div className="vs-ambient" aria-hidden="true">
        <span className="vs-orb vo-1"></span>
        <span className="vs-orb vo-2"></span>
      </div>
      <div className="wrap">
        <Reveal className="funky-section-header">
          <div className="funky-pill-badge badge-warning">
            <span className="pulsing-neon-dot dot-pink"></span>
            <span>THE REALITY CHECK</span>
          </div>
          <h2 className="funky-title">
            Traditional agency red tape vs. <span className="funky-gradient-text">the Codestroom way</span>.
          </h2>
          <p className="funky-subtitle">
            We built Codestroom because we were sick and tired of bloated retainers, agonizing delays, and zero accountability. Here is how we do things differently.
          </p>
        </Reveal>

        <div className="funky-vs-container">
          {/* Header Row */}
          <Reveal className="vs-table-head">
            <div className="vs-head-col boring-head">
              <span className="emoji-badge">😴</span>
              <div>
                <h4>The Typical Legacy Agency</h4>
                <p>Lots of meetings, slow execution</p>
              </div>
            </div>
            <div className="vs-head-col codestroom-head">
              <span className="emoji-badge">⚡</span>
              <div>
                <h4>The Codestroom Engine</h4>
                <p>High velocity, modern tech & real results</p>
              </div>
            </div>
          </Reveal>

          {/* Rows */}
          <div className="vs-rows-wrap">
            {COMPARISONS.map((row, idx) => (
              <Reveal as="div" key={idx} delay={idx * 110} variant={idx % 2 ? 'right' : 'left'} className="vs-row-card">
                <div className="vs-cell cell-boring">
                  <span className="cross-icon">✕</span>
                  <span className="vs-text"><span className="vs-strike">{row.boring}</span></span>
                </div>
                <div className="vs-cell-divider">
                  <span className="vs-badge">VS</span>
                </div>
                <div className="vs-cell cell-funky">
                  <span className="check-icon">✓</span>
                  <span className="vs-text">{row.funky}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal variant="scale" className="vs-bottom-banner">
          <div className="banner-left">
            <span className="banner-sparkle">🚀</span>
            <div>
              <h3>Ready to ditch the corporate lag?</h3>
              <p>Book a direct 15-minute engineering & strategy session with our team.</p>
            </div>
          </div>
          <Link to="/contact" className="btn btn-gradient">
            Start Your Sprint →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
