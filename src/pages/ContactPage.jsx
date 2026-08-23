import ContactHero from '../components/contact/ContactHero';
import ContactDetails from '../components/ContactDetails';
import ContactForm from '../components/ContactForm';
import SEOHead from '../components/SEOHead';

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Codestroom',
  url: 'https://codestroom.com/contact',
  description: 'Get in touch with Codestroom for software project estimates, AI consultations, and digital marketing inquiries.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Codestroom',
    email: 'contact@codestroom.com',
    telephone: '+919464529126'
  }
};

export default function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact Us & Request a Project Scope | Codestroom"
        description="Ready to build something extraordinary? Contact the Codestroom team for architectural scoping, project timeline estimates, and strategic consultation."
        canonicalPath="/contact"
        schemas={[contactPageSchema]}
      />
      <ContactHero />
      <ContactForm />
      <ContactDetails />
    </>
  );
}
