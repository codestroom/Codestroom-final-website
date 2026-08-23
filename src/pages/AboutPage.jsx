import { useEffect } from 'react';
import AboutHero from '../components/about/AboutHero';
import AboutMarquee from '../components/about/AboutMarquee';
import AboutStats from '../components/about/AboutStats';
import AboutStory from '../components/about/AboutStory';
import AboutValues from '../components/about/AboutValues';
import AboutTeam from '../components/about/AboutTeam';
import AboutCulture from '../components/about/AboutCulture';
import AboutFlags from '../components/about/AboutFlags';
import CTA from '../components/CTA';
import SEOHead from '../components/SEOHead';

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Codestroom',
  url: 'https://codestroom.com/about',
  description: 'Who Codestroom is: a digital marketing and web/app development agency serving restaurants, entrepreneurs and e-commerce brands across India, USA, Canada & Europe.'
};

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="about-page">
      <SEOHead
        title="About Codestroom — Digital Marketing Agency"
        description="Meet Codestroom, a digital marketing & web development agency serving restaurants, entrepreneurs and e-commerce brands across India, USA, Canada & Europe."
        canonicalPath="/about"
        schemas={[aboutPageSchema]}
      />
      <AboutHero />
      <AboutMarquee />
      <AboutStats />
      <AboutStory />
      <AboutValues />
      <AboutTeam />
      <AboutCulture />
      <AboutFlags />
      <CTA />
    </div>
  );
}
