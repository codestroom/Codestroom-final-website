import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], input, select, textarea, label, summary';
const CARDISH = '[class$="-card"], [class*="-card "], [class*="card-item"], .faq-item';

/* site-wide motion that doesn't belong to any one page:
   - a cursor ring that reacts to whatever it's over (fine pointers only)
   - a scroll progress bar
   - a short fade between routes (never on first load, so LCP is untouched)
   - scroll-in for any section that doesn't already animate itself */
export default function SiteMotion() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const barRef = useRef(null);
  const { pathname } = useLocation();
  const firstRoute = useRef(true);

  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // cursor ring
  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot || reduceMotion || !window.matchMedia?.('(pointer: fine)').matches) return undefined;

    document.documentElement.classList.add('has-cursor-ring');
    const pos = { x: -100, y: -100 };
    const lag = { x: -100, y: -100 };
    let frame;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      ring.classList.add('is-visible');
      const target = e.target instanceof Element ? e.target : null;
      const overText = target?.closest('input, textarea, select, [contenteditable="true"]');
      const overLink = !overText && target?.closest(INTERACTIVE);
      const overCard = !overText && !overLink && target?.closest(CARDISH);
      ring.classList.toggle('is-link', Boolean(overLink));
      ring.classList.toggle('is-card', Boolean(overCard));
      ring.classList.toggle('is-text', Boolean(overText));
    };
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');
    const onLeave = () => ring.classList.remove('is-visible');

    const tick = () => {
      lag.x += (pos.x - lag.x) * 0.2;
      lag.y += (pos.y - lag.y) * 0.2;
      ring.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-cursor-ring');
    };
  }, [reduceMotion]);

  // scroll progress
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;
    let frame;
    const update = () => {
      frame = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // route fade + auto-reveal
  useEffect(() => {
    const main = document.getElementById('top');
    if (!main) return undefined;

    if (firstRoute.current) {
      firstRoute.current = false;
    } else if (!reduceMotion) {
      main.classList.remove('route-enter');
      void main.offsetWidth; // restart the animation
      main.classList.add('route-enter');
    }

    if (reduceMotion || typeof IntersectionObserver === 'undefined') return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('auto-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    // the first section is the page hero (and usually the LCP), so it's left alone;
    // sections that already run their own Reveal animations are skipped too
    const scan = () => {
      main.querySelectorAll('section').forEach((section, i) => {
        if (i === 0 || section.dataset.autoReveal) return;
        section.dataset.autoReveal = '1';
        if (section.querySelector('.reveal') || section.closest('.reveal')) return;
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) return; // already on screen: don't hide it
        section.classList.add('auto-reveal');
        io.observe(section);
      });
    };
    scan();
    // lazy routes render after this effect runs; batch bursts of mutations
    let pending = null;
    const mo = new MutationObserver(() => {
      if (!pending) pending = requestAnimationFrame(() => { pending = null; scan(); });
    });
    mo.observe(main, { childList: true, subtree: true });

    return () => {
      if (pending) cancelAnimationFrame(pending);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname, reduceMotion]);

  return (
    <>
      <div className="scroll-progress" ref={barRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
