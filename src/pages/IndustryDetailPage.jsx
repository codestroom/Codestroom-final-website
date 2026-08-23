import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { INDUSTRIES_DATA } from '../data/industriesData';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';

export default function IndustryDetailPage() {
  const { slug } = useParams();
  const industry = INDUSTRIES_DATA[slug];
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!industry) {
    return <Navigate to="/work" replace />;
  }

  const industrySchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://codestroom.com/industries/${industry.slug}#service`,
    name: `Digital Marketing & Web Development for ${industry.name}`,
    serviceType: 'Digital Marketing',
    description: industry.description,
    provider: {
      '@id': 'https://codestroom.com/#organization'
    },
    audience: {
      '@type': 'Audience',
      audienceType: industry.name
    },
    areaServed: ['IN', 'CA', 'US', 'GB', 'EU']
  };

  const faqSchema = industry.faqs && industry.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: industry.faqs.map((f) => ({
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://codestroom.com/' },
      { '@type': 'ListItem', position: 2, name: 'Who We Work With', item: 'https://codestroom.com/work' },
      { '@type': 'ListItem', position: 3, name: industry.name, item: `https://codestroom.com/industries/${industry.slug}` }
    ]
  };

  return (
    <div className="industry-detail-page">
      <SEOHead
        title={industry.title}
        description={industry.description}
        canonicalPath={`/industries/${industry.slug}`}
        schemas={[industrySchema, faqSchema, breadcrumbSchema].filter(Boolean)}
      />

      <PageHero kicker={industry.kicker} title={industry.h1} lead={industry.lead} />

      <section className="other-services-section">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">What gets in the way</span>
            <h2>Common challenges we see.</h2>
          </Reveal>
          <div className="other-services-grid">
            {industry.challenges.map((challenge) => (
              <Reveal as="div" key={challenge.title} className="other-service-card">
                <h3>{challenge.title}</h3>
                <p>{challenge.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="other-services-section">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">How we help</span>
            <h2>What we actually do for {industry.name.toLowerCase()}.</h2>
          </Reveal>
          <div className="other-services-grid">
            {industry.whatWeDo.map((item) => (
              <Reveal as="div" key={item.label} className="other-service-card">
                <p>{item.label}</p>
                <Link to={`/services/${item.serviceSlug}`} className="other-service-link">
                  See this service →
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {industry.faqs && industry.faqs.length > 0 && (
        <section className="funky-faq-section">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="kicker">Questions</span>
              <h2>Frequently asked, honestly answered.</h2>
            </Reveal>
            <div className="funky-faq-accordion">
              {industry.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <Reveal as="div" key={faq.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-q-text">{faq.q}</span>
                      <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer-panel">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </div>
  );
}
