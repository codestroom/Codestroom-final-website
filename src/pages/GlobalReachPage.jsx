import Reach from '../components/Reach';
import CTA from '../components/CTA';
import SEOHead from '../components/SEOHead';

export default function GlobalReachPage() {
  return (
    <>
      <SEOHead
        title="Global Reach & International Delivery | Codestroom"
        description="Codestroom delivers world-class engineering, custom software, and digital marketing across India, Canada, USA, and Europe with 24/7 client collaboration."
        canonicalPath="/global-reach"
      />
      <Reach />
      <CTA />
    </>
  );
}
