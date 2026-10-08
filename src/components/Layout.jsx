import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import MetaPixelTracker from './MetaPixelTracker';
import GoogleAnalyticsTracker from './GoogleAnalyticsTracker';
import SiteMotion from './SiteMotion';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <MetaPixelTracker />
      <GoogleAnalyticsTracker />
      <SiteMotion />
      <Header />
      <main id="top">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
