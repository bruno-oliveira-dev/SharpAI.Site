'use client';
import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, as: As = 'div', delay = 0, className = '', ...rest }) {
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
      ([entry]) => { if (entry.isIntersecting) { show(); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(ref.current);
    const r = ref.current.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) timer = setTimeout(show, 80);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);

  return (
    <As
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </As>
  );
}
