'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const stateRef = useRef({ x: -100, y: -100, rx: -100, ry: -100, label: '', scale: 1, paused: false });
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf;
    const onMove = (e) => {
      stateRef.current.x = e.clientX;
      stateRef.current.y = e.clientY;
      const el = e.target.closest?.('[data-cursor]');
      const next = el?.dataset?.cursor || '';
      if (next !== stateRef.current.label) {
        stateRef.current.label = next;
        stateRef.current.scale = next ? 2.6 : 1;
        setLabel(next);
      }
    };
    const onDown = () => { stateRef.current.scale = stateRef.current.label ? 2.2 : 0.7; };
    const onUp = () => { stateRef.current.scale = stateRef.current.label ? 2.6 : 1; };
    const onVisibility = () => { stateRef.current.paused = document.hidden; };
    const onBlur = () => { stateRef.current.paused = true; };
    const onFocus = () => { stateRef.current.paused = false; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (stateRef.current.paused) return;
      const s = stateRef.current;
      s.rx += (s.x - s.rx) * 0.18;
      s.ry += (s.y - s.ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${s.x - 3}px, ${s.y - 3}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${s.rx - 22}px, ${s.ry - 22}px, 0) scale(${s.scale})`;
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        {label ? <span className="cursor-label">{label}</span> : null}
      </div>
    </>
  );
}
