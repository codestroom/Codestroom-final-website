import Services from '../components/Services';
import CTA from '../components/CTA';
import SEOHead from '../components/SEOHead';
import { ALL_SERVICES } from '../data/servicesData';

const servicesCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Codestroom IT & Digital Marketing Services Catalog',
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
        title="IT & Digital Marketing Services Directory | Codestroom"
        description="Explore our full services catalog: AI, web & mobile development, custom software, e-commerce and digital marketing across India, USA, Canada & Europe."
        canonicalPath="/services"
        schemas={[servicesCatalogSchema]}
      />
      <Services />
      <CTA />
    </>
  );
}
