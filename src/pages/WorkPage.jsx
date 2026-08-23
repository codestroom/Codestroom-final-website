import Work from '../components/Work';
import CTA from '../components/CTA';
import SEOHead from '../components/SEOHead';

export default function WorkPage() {
  return (
    <>
      <SEOHead
        title="Who We Work With — Industries We Serve | Codestroom"
        description="See how Codestroom supports restaurants, e-commerce brands, entrepreneurs and public leaders — the industries we work with and how each one grows."
        canonicalPath="/work"
        keywords="case studies, software portfolio, client results, AI projects, web development work, mobile app portfolio"
      />
      <Work />
      <CTA />
    </>
  );
}
