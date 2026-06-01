'use client';
import { useEffect, useRef } from 'react';

export default function Magnetic({ children, strength = 0.35, className = '', as: As = 'span', ...rest }) {
  const el = useRef(null);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    let raf;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMove = (e) => {
      const r = node.getBoundingClientRect();
      target.x = (e.clientX - r.left - r.width / 2) * strength;
      target.y = (e.clientY - r.top - r.height / 2) * strength;
    };
    const onLeave = () => { target.x = 0; target.y = 0; };
    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      node.style.transform = `translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };
    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return (
    <As ref={el} className={`magnetic ${className}`} {...rest}>
      {children}
    </As>
  );
}
