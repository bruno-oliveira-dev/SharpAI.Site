'use client';
import { useEffect, useRef, useState } from 'react';

export default function SplitText({ text, className = '', delay = 0, stagger = 22 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    let timer;
    const show = () => setVisible(true);
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (show(), obs.disconnect()),
      { threshold: 0.05 }
    );
    obs.observe(ref.current);
    timer = setTimeout(show, 250);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);

  return (
    <span ref={ref} className={`split ${visible ? 'is-visible' : ''} ${className}`} aria-label={text}>
      {text.split('').map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="split-char"
          style={{ transitionDelay: `${delay + i * stagger}ms` }}
        >
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  );
}
