import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function NotFound() {
  return (
    <section>
      <SEOHead
        title="Page Not Found (404) | Codestroom"
        description="The page you requested could not be found. Explore our AI and IT services or return to the homepage."
        noindex
      />
      <div className="wrap" style={{ textAlign: 'center', padding: '80px 0' }}>
        <span className="kicker">404</span>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginTop: '12px' }}>
          This page ghosted us.
        </h1>
        <p style={{ marginTop: '18px', color: 'var(--ink-soft)', fontSize: '17px' }}>
          It either moved, got deleted, or never existed in the first place. Here's a way back.
        </p>
        <div className="hero-ctas" style={{ justifyContent: 'center', marginTop: '32px' }}>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
