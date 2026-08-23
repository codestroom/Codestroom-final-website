import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SERVICES_DATA, ALL_SERVICES } from '../data/servicesData';
import ServiceDetailHero from '../components/services/ServiceDetailHero';
import TechStackExplorer from '../components/services/TechStackExplorer';
import ServiceDeliverables from '../components/services/ServiceDeliverables';
import ServiceProcessFlow from '../components/services/ServiceProcessFlow';
import ServiceEstimator from '../components/services/ServiceEstimator';
import ServiceFaq from '../components/services/ServiceFaq';
import SEOHead from '../components/SEOHead';
import Reveal from '../components/Reveal';
import { TechIcon } from '../components/services/ServiceIconsFull';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = SERVICES_DATA[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Generate Service & FAQ Structured Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://codestroom.com/services/${service.slug}#service`,
    name: service.title,
    serviceType: service.category,
    description: service.overview,
    provider: {
      '@id': 'https://codestroom.com/#organization'
    },
    areaServed: ['IN', 'CA', 'US', 'GB', 'EU'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} Capabilities`,
      itemListElement: service.deliverables.map((d, i) => ({
        '@type': 'Offer',
        position: i + 1,
        name: d.title,
        description: d.desc
      }))
    }
  };

  const faqSchema = service.faqs && service.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  } : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://codestroom.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://codestroom.com/services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://codestroom.com/services/${service.slug}`
      }
    ]
  };

  // Get other services for cross-navigation
  const otherServices = ALL_SERVICES.filter((s) => s.slug !== slug);

  return (
    <div className="service-detail-page">
      <SEOHead
        title={service.title}
        description={service.tagline || service.overview}
        canonicalPath={`/services/${service.slug}`}
        schemas={[serviceSchema, faqSchema, breadcrumbSchema].filter(Boolean)}
      />

      <ServiceDetailHero service={service} />

      {/* Floating In-page Quick Jump Bar */}
      <div className="service-subnav-bar">
        <div className="wrap subnav-inner">
          <a href="#deliverables">Deliverables</a>
          <a href="#tech-stack">Tech Ecosystem</a>
          <a href="#process-flow">Process &amp; Proof</a>
          <a href="#estimator">Scope Planner</a>
          <a href="#faq">FAQ</a>
        </div>
      </div>

      <ServiceDeliverables service={service} />
      <TechStackExplorer service={service} />
      <ServiceProcessFlow service={service} />
      <ServiceEstimator service={service} />
      <ServiceFaq service={service} />

      {/* Cross-Service Navigation Grid */}
      <section className="other-services-section">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">Explore More Capabilities</span>
            <h2>Explore other services we deliver with excellence.</h2>
          </Reveal>

          <div className="other-services-grid">
            {otherServices.slice(0, 3).map((other) => (
              <Reveal as="div" key={other.slug} className="other-service-card">
                <div className={`other-icon-box ${other.tint}`}>
                  <TechIcon name={other.coreTechnologies[0]?.icon || 'brain'} />
                </div>
                <h3>{other.title}</h3>
                <p>{other.tagline}</p>
                <Link to={`/services/${other.slug}`} className="other-service-link">
                  Explore {other.title} →
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* High-Converting CTA Banner */}
      <section className="service-cta-banner">
        <div className="wrap">
          <Reveal className="service-cta-box">
            <div className="cta-glow-orb"></div>
            <span className="cta-kicker">Ready to build something extraordinary?</span>
            <h2>Let's engineer your {service.title} roadmap.</h2>
            <p>
              Get a comprehensive scope breakdown, architectural consultation, and sprint timeline tailored to your exact specifications.
            </p>
            <div className="cta-actions">
              <Link to={`/contact?service=${service.slug}`} className="btn btn-gradient btn-lg">
                Schedule a Consultation →
              </Link>
              <Link to="/work" className="btn btn-outline">
                View Past Client Work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
