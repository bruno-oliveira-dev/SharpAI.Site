'use client';
import { useEffect, useRef, useState } from 'react';

export default function CountUp({ to, suffix = '', duration = 1400, decimals = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(to);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to);
      return;
    }
    setVal(0);
    let raf;
    let start;
    let observed = false;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !observed) {
          observed = true;
          const step = (ts) => {
            if (!start) start = ts;
            const p = Math.min(1, (ts - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(eased * to);
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);

  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}
