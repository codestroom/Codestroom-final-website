import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal';
import CountUp from './CountUp';
import { spotlightMove } from './useSpotlight';

const SERVICES = [
  {
    id: 'ai',
    slug: 'ai-solutions',
    kicker: '⚡ Intelligent Automation',
    title: 'Autonomous AI Agents & Enterprise LLMs',
    desc: 'Custom multi-agent workflows, vector search, Claude & OpenAI integrations that automate complex business ops 24/7 without breaking a sweat.',
    techs: ['LangChain', 'OpenAI', 'Claude 3.7', 'Vector DB', 'FastAPI'],
    stat: '10x Productivity',
    glow: 'bento-glow-pink',
    gridArea: 'span 2 / span 2',
    icon: '🤖',
    featured: true,
  },
  {
    id: 'web',
    slug: 'web-development',
    kicker: '🚀 Ultra-Fast Engineering',
    title: 'Modern Web Apps & SaaS Engines',
    desc: 'High-velocity React, Next.js, and TypeScript frontend ecosystems engineered for instant page loads, slick UX, and seamless scalability.',
    techs: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind/CSS', 'GraphQL'],
    stat: '99+ Lighthouse Score',
    glow: 'bento-glow-blue',
    gridArea: 'span 1 / span 1',
    icon: '⚡',
    featured: false,
  },
  {
    id: 'mobile',
    slug: 'mobile-apps',
    kicker: '📱 60fps Native Feel',
    title: 'Cross-Platform Mobile Apps',
    desc: 'Production-ready iOS and Android apps powered by Flutter and React Native. Smooth animations, offline support, and native device hardware access.',
    techs: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
    stat: '4.9★ App Store Quality',
    glow: 'bento-glow-purple',
    gridArea: 'span 1 / span 1',
    icon: '📲',
    featured: false,
  },
  {
    id: 'growth',
    slug: 'digital-marketing',
    kicker: '📈 Unfair Growth Advantage',
    title: 'Performance Marketing & Omnichannel ROAS',
    desc: 'High-converting ad funnels, Meta/Google PPC, programmatic SEO, and data-driven creative tests that generate predictable customer acquisition.',
    techs: ['Meta Ads', 'Google Shopping', 'SEO Domination', 'Analytics 4'],
    stat: '340% Avg ROAS',
    glow: 'bento-glow-pink',
    gridArea: 'span 1 / span 1',
    icon: '🎯',
    featured: false,
  },
  {
    id: 'cloud',
    slug: 'backend-development',
    kicker: '☁️ Bulletproof Cloud',
    title: 'Cloud Infrastructure & High-Load APIs',
    desc: 'Distributed microservices, zero-downtime CI/CD pipelines, and bulletproof database clustering built for peak traffic demands.',
    techs: ['AWS', 'Docker', 'PostgreSQL', 'Redis', 'Kubernetes'],
    stat: '99.99% Uptime',
    glow: 'bento-glow-blue',
    gridArea: 'span 1 / span 1',
    icon: '🛡️',
    featured: false,
  },
  {
    id: 'creative',
    slug: 'creative-design',
    kicker: '✨ Award-Winning Aesthetic',
    title: 'Visual Identity, 3D & Brand Storytelling',
    desc: 'Electrifying visual systems, interactive 3D WebGL experiences, and brand narratives that make your company unforgettable.',
    techs: ['Figma', 'Three.js', 'After Effects', 'Motion Design', 'WebGL'],
    stat: '100% Wow Factor',
    glow: 'bento-glow-purple',
    gridArea: 'span 2 / span 2',
    icon: '🎨',
    featured: true,
  },
];

export default function FunkyBentoServices() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <section id="home-services" className="funky-bento-section">
      <div className="wrap">
        <Reveal className="funky-section-header">
          <div className="funky-pill-badge">
            <span className="pulsing-neon-dot"></span>
            <span>CAPABILITIES MATRIX</span>
          </div>
          <h2 className="funky-title">
            Engineered for <span className="funky-gradient-text">hyper-speed</span> &amp; serious impact.
          </h2>
          <p className="funky-subtitle">
            From autonomous agent intelligence to full-stack cloud ecosystems and aggressive customer acquisition — we assemble the entire digital arsenal under one roof.
          </p>
        </Reveal>

        {/* Bento Grid */}
        <div className="funky-bento-grid">
          {SERVICES.map((item, idx) => (
            <Reveal
              as={Link}
              to={`/services/${item.slug}`}
              key={item.id}
              delay={idx * 90}
              variant="scale"
              onPointerMove={spotlightMove}
              className={`funky-bento-card spotlight ${item.glow} ${item.featured ? 'bento-featured' : ''}`}
            >
              <div className="bento-glass-shine"></div>
              
              <div className="bento-card-top">
                <div className="bento-icon-orb">
                  <span className="bento-icon-symbol">{item.icon}</span>
                </div>
                <div className="bento-stat-chip">
                  <span className="stat-fire">🔥</span>
                  <CountUp value={item.stat} />
                </div>
              </div>

              <div className="bento-content">
                <span className="bento-kicker">{item.kicker}</span>
                <h3 className="bento-card-title">{item.title}</h3>
                <p className="bento-card-desc">{item.desc}</p>
              </div>

              <div className="bento-footer">
                <div className="bento-tech-chips">
                  {item.techs.slice(0, 4).map((tech) => (
                    <span key={tech} className="bento-chip">{tech}</span>
                  ))}
                </div>
                <span className="bento-link-arrow">
                  Explore Spec <span className="arrow-sym">→</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Action Bar */}
        <Reveal variant="blur" className="bento-cta-bar">
          <div className="bento-cta-content">
            <span className="cta-fire-badge">⚡ ALL-IN-ONE PARTNER</span>
            <p>Need a custom stack engineered from scratch or a full digital takeover?</p>
          </div>
          <Link to="/services" className="btn btn-gradient">
            Browse All 8 Services &amp; Architecture →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
