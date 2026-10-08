import { useEffect, useRef, useState } from 'react';

const NUM = /\d+(?:\.\d+)?/g;

function format(text, progress) {
  return text.replace(NUM, (match) => {
    const decimals = match.includes('.') ? match.split('.')[1].length : 0;
    return (parseFloat(match) * progress).toFixed(decimals);
  });
}

// ticks every number inside a label ("+380%", "3.6x - 5.2x") up from zero the
// first time it scrolls into view, keeping prefixes and suffixes intact
export default function CountUp({ value, duration = 1400, className }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return 1;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 1 : 0;
  });

  useEffect(() => {
    if (progress === 1) return;
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        setProgress(1 - Math.pow(1 - t, 3));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // only arm once on mount; progress changes are driven by the animation itself
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{format(value, progress)}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
