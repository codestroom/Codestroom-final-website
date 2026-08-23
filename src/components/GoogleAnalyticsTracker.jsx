import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/* The base gtag script in index.html already fires the very first page_view.
   React Router navigates client-side without a real page load, so every
   route change after that needs its own manual page_view event.

   The lastPathname guard exists because React StrictMode double-invokes
   effects on initial mount (mount -> cleanup -> mount) — without it, that
   double-invoke would flip isFirst on the first pass and fire a spurious
   duplicate page_view on the second pass, before any real navigation. */
export default function GoogleAnalyticsTracker() {
  const location = useLocation();
  const lastPathname = useRef(undefined);
  const isFirst = useRef(true);

  useEffect(() => {
    if (lastPathname.current === location.pathname) return;
    lastPathname.current = location.pathname;

    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location.pathname, location.search]);

  return null;
}
