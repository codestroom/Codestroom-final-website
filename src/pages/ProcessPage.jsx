import Process from '../components/Process';
import CTA from '../components/CTA';
import SEOHead from '../components/SEOHead';

export default function ProcessPage() {
  return (
    <>
      <SEOHead
        title="Our Engineering & Delivery Process | Codestroom"
        description="Learn how Codestroom delivers software projects from initial discovery, architectural blueprints, iterative sprint development, through automated QA and cloud launch."
        canonicalPath="/process"
      />
      <Process />
      <CTA />
    </>
  );
}
