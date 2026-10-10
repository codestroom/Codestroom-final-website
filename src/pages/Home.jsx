import Hero from '../components/Hero';
import WorkWall from '../components/home/WorkWall';
import GrowthStory from '../components/home/GrowthStory';
import FunkyProjectLab from '../components/home/FunkyProjectLab';
import AgencySwitch from '../components/home/AgencySwitch';
import BusinessStreet from '../components/home/BusinessStreet';
import AskUs from '../components/home/AskUs';
import { homeFaqSchema } from '../data/homeFaq';
import SentenceForm from '../components/home/SentenceForm';
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
        schemas={[homeWebSiteSchema, homeFaqSchema]}
      />
      {/* Hero Section preserved intact as requested */}
      <Hero />
      
      {/* Stylish & Funky Neo-Digital Sections */}
      <WorkWall />
      <GrowthStory />
      <FunkyProjectLab />
      <AgencySwitch />
      <BusinessStreet />
      <AskUs />
      <SentenceForm />
    </>
  );
}
