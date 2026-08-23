import Process from '../components/Process';
import CTA from '../components/CTA';
import SEOHead from '../components/SEOHead';

export default function ProcessPage() {
  return (
    <>
      <SEOHead
        title="Our Engineering & Delivery Process | Codestroom"
        description="Learn how Codestroom delivers projects — discovery, planning, sprint development, QA and launch."
        canonicalPath="/process"
      />
      <Process />
      <CTA />
    </>
  );
}
