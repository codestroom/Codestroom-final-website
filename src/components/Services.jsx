import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { ALL_SERVICES } from '../data/servicesData';
import { TechIcon } from './services/ServiceIconsFull';

const CATEGORIES = [
  'All Solutions',
  'AI & Intelligence',
  'Engineering & Web',
  'Engineering & Enterprise',
  'Engineering & Mobile',
  'Engineering & Infrastructure',
  'Commerce & Sales',
  'Marketing & Growth',
  'Creative & Branding'
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('All Solutions');

  const filteredServices = selectedCategory === 'All Solutions'
    ? ALL_SERVICES
    : ALL_SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="services-hub-section">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="kicker">What we do</span>
          <h1>One team, every channel your business needs.</h1>
          <p>
            From autonomous AI agents and enterprise cloud architecture to full-stack engineering, high-ROAS marketing, and creative design — we run the full digital and IT stack under one roof.
          </p>
        </Reveal>

        {/* Category Filter Pills */}
        <div className="services-filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Services Grid */}
        <div className="service-hub-grid">
          {filteredServices.map((service, idx) => (
            <Reveal as="div" key={service.slug} delay={idx * 40} className="service-hub-card">
              <div className="service-card-top">
                <div className={`service-hub-icon ${service.tint}`}>
                  <TechIcon name={service.coreTechnologies[0]?.icon || 'brain'} />
                </div>
                <span className="service-category-badge">{service.category}</span>
              </div>

              <h3 className="service-hub-title">{service.title}</h3>
              <p className="service-hub-desc">{service.overview}</p>

              {/* Tech Stack Preview Pills */}
              <div className="service-tech-tags">
                {service.coreTechnologies.slice(0, 3).map((tech) => (
                  <span key={tech.name} className="service-mini-tag">
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* Deliverable Highlights */}
              <div className="service-card-highlights">
                <div className="highlight-item">
                  <span className="highlight-check">✓</span>
                  <span>{service.deliverables[0]?.title}</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-check">✓</span>
                  <span>{service.deliverables[1]?.title}</span>
                </div>
              </div>

              <div className="service-card-footer">
                <Link to={`/services/${service.slug}`} className="service-explore-btn">
                  <span>Explore Detailed Architecture</span>
                  <span className="arrow-icon">→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
