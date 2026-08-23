import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';
import SEOHead from '../components/SEOHead';
import { CAPABILITIES, PORTFOLIO_CATEGORIES } from '../data/portfolioData';

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Codestroom Capabilities',
  description:
    'What Codestroom is equipped to build across AI, web, mobile, e-commerce and marketing.',
  url: 'https://codestroom.com/portfolio',
};

const HERO_STATS = [
  { val: `${CAPABILITIES.length}`, lbl: 'capability areas' },
  { val: '4', lbl: 'regions served' },
  { val: '48h', lbl: 'reply on new briefs' },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => CAPABILITIES.filter((item) => filter === 'all' || item.category === filter),
    [filter]
  );

  return (
    <>
      <SEOHead
        title="Portfolio | Codestroom"
        description="What Codestroom is built to deliver: AI agents, web and SaaS platforms, mobile apps, e-commerce builds and marketing programmes."
        canonicalPath="/portfolio"
        schemas={[portfolioSchema]}
      />

      <PageHero
        kicker="What we build"
        title="The kind of work we're built for."
        lead="We're a growing team, so instead of a highlight reel of past logos, here's what we're actually equipped to deliver — the approach, the deliverables and the stack behind each one."
        stats={HERO_STATS}
      />

      <section className="portfolio-section">
        <div className="wrap">
          <div className="filter-bar" role="group" aria-label="Filter capabilities">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                aria-pressed={filter === cat.id}
                className={`filter-chip ${filter === cat.id ? 'is-active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visible.map((item) => (
              <Reveal as="article" className="product-card" key={item.slug}>
                <div className="product-card-top">
                  <span className={`product-mark ${item.tint}`} aria-hidden="true">
                    {item.mark}
                  </span>
                </div>

                <h3>{item.title}</h3>
                <p className="product-desc">{item.summary}</p>

                <ul className="product-highlights">
                  {item.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>

                <div className="tag-list">
                  {item.stack.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="portfolio-crosslink">
            <div>
              <h3>Want to talk through something specific?</h3>
              <p>Tell us what you are trying to build — we will give you a straight answer on scope and approach.</p>
            </div>
            <Link to="/contact" className="btn btn-gradient">
              Talk to our team →
            </Link>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
