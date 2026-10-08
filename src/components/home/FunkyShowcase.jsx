import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal';
import CountUp from './CountUp';
import { spotlightMove } from './useSpotlight';

const VERTICALS = [
  {
    id: 'restaurants',
    title: 'Restaurants & Hospitality',
    emoji: '🍕',
    tagline: 'Turning empty tables into packed Friday nights',
    desc: 'Hyper-local Google Maps dominance, mouth-watering social reels, and high-margin direct online ordering funnels that bypass 30% delivery commission apps.',
    metrics: [
      { num: '+380%', label: 'Google Maps Local Actions' },
      { num: '4.2x', label: 'Direct Online Orders' },
      { num: '< 48h', label: 'Menu & Campaign Launch' },
    ],
    tags: ['Local SEO', 'Instagram Viral Content', 'Direct Ordering Funnels'],
    glow: 'showcase-glow-pink',
  },
  {
    id: 'ecommerce',
    title: 'DTC Brands & E-Commerce',
    emoji: '🛍️',
    tagline: 'High-converting stores and ads that print ROAS',
    desc: 'From custom Headless Next.js Shopify storefronts to aggressive Meta, TikTok, and Google Shopping ad strategies that turn casual scrollers into recurring VIP customers.',
    metrics: [
      { num: '3.6x - 5.2x', label: 'Target Blended ROAS' },
      { num: '0.8s', label: 'Storefront Load Speed' },
      { num: '4 Continents', label: 'Cross-Border Scale' },
    ],
    tags: ['Headless Next.js', 'Google Shopping Ads', 'Conversion Rate Optimization'],
    glow: 'showcase-glow-blue',
  },
  {
    id: 'leaders',
    title: 'Public Leaders & Institutions',
    emoji: '🏛️',
    tagline: 'Building lasting trust, community engagement and authority',
    desc: 'Digital campaigns, live stream distribution, and authentic public outreach for religious organizations, community representatives, and distinguished personal brands.',
    metrics: [
      { num: '1.2M+', label: 'Monthly Community Reach' },
      { num: '99.9%', label: 'Positive Sentiment Target' },
      { num: '24/7', label: 'Public Interaction Hub' },
    ],
    tags: ['Community Outreach', 'Crisis Management', 'Omnichannel Video'],
    glow: 'showcase-glow-purple',
  },
  {
    id: 'tech',
    title: 'AI Startups & Scaleups',
    emoji: '🤖',
    tagline: 'Shipping robust software at venture speed',
    desc: 'Autonomous multi-agent architectures, mobile apps in Flutter/React Native, and robust microservice backends that withstand sudden million-user viral spikes.',
    metrics: [
      { num: '10x', label: 'Feature Delivery Speed' },
      { num: '99.99%', label: 'API Uptime SLA' },
      { num: 'Zero', label: 'Technical Debt Handoff' },
    ],
    tags: ['Agentic AI', 'Flutter / Native', 'FastAPI & AWS Cloud'],
    glow: 'showcase-glow-pink',
  },
];

export default function FunkyShowcase() {
  const [activeTab, setActiveTab] = useState('restaurants');
  const current = VERTICALS.find((v) => v.id === activeTab) || VERTICALS[0];

  return (
    <section className="funky-showcase-section">
      <div className="wrap">
        <Reveal className="funky-section-header">
          <div className="funky-pill-badge">
            <span className="pulsing-neon-dot"></span>
            <span>INDUSTRIES &amp; IMPACT</span>
          </div>
          <h2 className="funky-title">
            Built for those who <span className="funky-gradient-text">lead their markets</span>.
          </h2>
          <p className="funky-subtitle">
            Whether you are serving local dining tables, expanding an e-commerce empire, or launching an AI breakthrough — we engineer the unfair advantage.
          </p>
        </Reveal>

        {/* Tab Switcher */}
        <Reveal delay={100} className="showcase-tab-bar" role="tablist">
          {VERTICALS.map((v) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={activeTab === v.id}
              className={`showcase-tab-btn ${activeTab === v.id ? 'active' : ''}`}
              onClick={() => setActiveTab(v.id)}
            >
              <span className="tab-emoji">{v.emoji}</span>
              <span className="tab-name">{v.title}</span>
            </button>
          ))}
        </Reveal>

        {/* Featured Showcase Card */}
        <Reveal key={current.id} variant="blur" onPointerMove={spotlightMove} className={`showcase-display-card spotlight ${current.glow}`}>
          <div className="showcase-card-left">
            <div className="showcase-badge-row">
              <span className="showcase-emoji-large">{current.emoji}</span>
              <span className="showcase-industry-tag">{current.title}</span>
            </div>
            <h3 className="showcase-headline">{current.tagline}</h3>
            <p className="showcase-summary">{current.desc}</p>
            
            <div className="showcase-tags-list">
              {current.tags.map((tag) => (
                <span key={tag} className="showcase-tag-pill">
                  ✓ {tag}
                </span>
              ))}
            </div>

            <div className="showcase-cta-row">
              <Link to="/work" className="btn btn-primary">
                View Case Studies →
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Discuss Your Industry
              </Link>
            </div>
          </div>

          <div className="showcase-card-right">
            <div className="metrics-box-glow">
              <div className="metrics-box-title">
                <span className="metrics-pulse"></span>
                <span>REAL MEASURABLE BENCHMARKS</span>
              </div>
              <div className="metrics-grid">
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="metric-cell" style={{ '--i': idx }}>
                    <CountUp value={m.num} className="metric-val" />
                    <div className="metric-desc">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
