import Hero from '../components/Hero';
import FunkyMarquee from '../components/home/FunkyMarquee';
import FunkyBentoServices from '../components/home/FunkyBentoServices';
import FunkyProjectLab from '../components/home/FunkyProjectLab';
import FunkyVsBoring from '../components/home/FunkyVsBoring';
import FunkyShowcase from '../components/home/FunkyShowcase';
import FunkyTestimonials from '../components/home/FunkyTestimonials';
import FunkyFAQ from '../components/home/FunkyFAQ';
import FunkyCTA from '../components/home/FunkyCTA';
import SEOHead from '../components/SEOHead';
import '../styles/home-motion.css';

const homeWebSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://codestroom.com/#website',
  url: 'https://codestroom.com',
  name: 'Codestroom',
  description: 'IT & Digital Marketing Agency — AI Services, Full-Stack Web Development, Mobile Apps & Performance Marketing',
  publisher: {
    '@id': 'https://codestroom.com/#organization'
  }
};

export default function Home() {
  return (
    <>
      <SEOHead
        title="Codestroom — IT & Digital Marketing Agency"
        description="Codestroom offers AI systems, web & mobile app development, and digital marketing services for businesses across India, USA, Canada & Europe."
        canonicalPath="/"
        schemas={[homeWebSiteSchema]}
      />
      {/* Hero Section preserved intact as requested */}
      <Hero />
      
      {/* Stylish & Funky Neo-Digital Sections */}
      <FunkyMarquee />
      <FunkyBentoServices />
      <FunkyProjectLab />
      <FunkyVsBoring />
      <FunkyShowcase />
      <FunkyTestimonials />
      <FunkyFAQ />
      <FunkyCTA />
    </>
  );
}
