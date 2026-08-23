import Services from '../components/Services';
import CTA from '../components/CTA';
import SEOHead from '../components/SEOHead';
import { ALL_SERVICES } from '../data/servicesData';

const servicesCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Codestroom IT & AI Services Catalog',
  itemListElement: ALL_SERVICES.map((s, idx) => ({
    '@type': 'Offer',
    position: idx + 1,
    name: s.title,
    description: s.tagline,
    url: `https://codestroom.com/services/${s.slug}`
  }))
};

export default function ServicesPage() {
  return (
    <>
      <SEOHead
        title="Comprehensive IT & AI Services Directory | Codestroom"
        description="Explore our full engineering catalog: AI & LLMs, Web Development (React/Angular/WordPress), Custom Software, Mobile Apps (Flutter/React Native), Backend APIs (FastAPI/Node/Spring), E-Commerce & Growth Marketing."
        canonicalPath="/services"
        schemas={[servicesCatalogSchema]}
      />
      <Services />
      <CTA />
    </>
  );
}
