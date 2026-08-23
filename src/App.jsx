import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Preloader from './components/Preloader';

const Home = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const GlobalReachPage = lazy(() => import('./pages/GlobalReachPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const IndustryDetailPage = lazy(() => import('./pages/IndustryDetailPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <>
      <Preloader />
      <Suspense fallback={null}>
        <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/global-reach" element={<GlobalReachPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/industries/:slug" element={<IndustryDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        </Routes>
      </Suspense>
    </>
  );
}
