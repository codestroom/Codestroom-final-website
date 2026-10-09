import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    // pages are lazy-loaded, so the #target may not exist yet — retry briefly
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer;
    const seek = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (tries++ < 30) timer = setTimeout(seek, 100);
      else window.scrollTo(0, 0);
    };
    seek();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
