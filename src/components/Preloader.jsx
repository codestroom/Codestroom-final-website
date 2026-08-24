import { useEffect, useState } from 'react';

const SPIN_DURATION = 900;
const FADE_DURATION = 500;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [growing, setGrowing] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const growFrame = requestAnimationFrame(() => setGrowing(true));
    const fadeTimer = setTimeout(() => setFading(true), SPIN_DURATION);
    const removeTimer = setTimeout(() => setVisible(false), SPIN_DURATION + FADE_DURATION);
    return () => {
      cancelAnimationFrame(growFrame);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`preloader ${growing ? 'growing' : ''} ${fading ? 'fade-out' : ''}`} aria-hidden="true">
      <div className="preloader-logo-wrap">
        <img src="/assets/logo-preloader.webp" alt="" className="preloader-logo" width="64" height="64" fetchPriority="high" />
      </div>
    </div>
  );
}
