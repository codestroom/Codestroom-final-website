import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

// three.js is ~180kb gzipped — keep it out of the entry chunk, the flat mark
// is a brief loading fallback while that chunk downloads
const HeroLogo3D = lazy(() => import('./HeroLogo3D'));

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <Reveal as="span" immediate className="eyebrow">
            <span className="dot"></span>IT &amp; Digital Marketing, For Practically Everybody
          </Reveal>
          <Reveal as="h1" immediate>
            IT &amp; Marketing for absolutely <span className="grad">everybody.</span>
          </Reveal>
          <Reveal as="p" immediate className="lead">
            Restaurants. Religious organizations. Entrepreneurs. Public leaders. E-commerce
            brands. If you've got an audience to reach — or a website, app or system to build
            for them — we've probably done something like it, across India, Canada, the USA
            and Europe, with one team behind every project.
          </Reveal>
          <Reveal as="div" immediate className="hero-ctas">
            <Link to="/contact" className="btn btn-primary">
              Talk to our team →
            </Link>
            <Link to="/services" className="btn btn-ghost">
              See what we do
            </Link>
          </Reveal>
          <Reveal as="div" immediate className="hero-meta">
            <div>
              <span className="num">Anyone, Really</span>
              <span className="lbl">Restaurants to e-commerce (and beyond)</span>
            </div>
            <div>
              <span className="num">4 Regions</span>
              <span className="lbl">India, Canada, USA, Europe — no passport needed</span>
            </div>
            <div>
              <span className="num">Actually Direct</span>
              <span className="lbl">Talk to a human, not a chatbot</span>
            </div>
          </Reveal>
        </div>
        <Reveal as="div" immediate className="blend-stage" aria-hidden="true">
          <Suspense
            fallback={
              <img
                className="hero-logo"
                src="/assets/logo-hero.webp"
                alt=""
                width="460"
                height="460"
                fetchPriority="high"
              />
            }
          >
            <HeroLogo3D />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
}
