import { useEffect, useRef, useState } from 'react';

// variant picks the entrance motion: up (default), left, right, scale, blur
export default function Reveal({
  as: Tag = 'div',
  immediate = false,
  delay = 0,
  variant = 'up',
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(immediate);
  // once the entrance finishes, hand transitions back to the element's own css
  // so the stagger delay doesn't leak into hover effects
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setSettled(true), delay + 1000);
    return () => clearTimeout(t);
  }, [visible, delay]);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  const variantClass = variant === 'up' ? '' : `reveal-${variant}`;
  const mergedStyle = delay ? { ...style, '--rd': `${delay}ms` } : style;

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${visible ? 'in' : ''} ${settled ? 'settled' : ''} ${className}`
        .replace(/\s+/g, ' ')
        .trim()}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
