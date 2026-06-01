'use client';
import { useEffect, useRef } from 'react';

export default function Starfield({ count = 220, color = 'rgba(180,200,220,0.6)' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const ctx = canvas.getContext('2d');
    let raf, w, h, dpr;
    let visible = true;
    let inView = true;
    const stars = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const init = () => {
      stars.length = 0;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w, y: Math.random() * h,
          r: Math.random() * 0.9 + 0.2,
          tw: Math.random() * Math.PI * 2,
          sp: 0.6 + Math.random() * 1.4,
          accent: Math.random() < 0.07,
        });
      }
    };
    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      if (!visible || !inView) return;
      ctx.clearRect(0, 0, w, h);
      const time = t * 0.001;
      for (const s of stars) {
        const tw = (Math.sin(time * s.sp + s.tw) + 1) / 2;
        const alpha = 0.25 + tw * 0.7;
        ctx.fillStyle = s.accent ? `rgba(255,107,0,${alpha * 0.9})` : color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * (0.8 + tw * 0.6), 0, Math.PI * 2); ctx.fill();
        if (s.accent && tw > 0.7) {
          ctx.fillStyle = 'rgba(255,107,0,0.06)';
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2); ctx.fill();
        }
      }
    };

    resize(); init();
    const onResize = () => { resize(); init(); };
    const onVisibility = () => { visible = !document.hidden; };
    const obs = new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { threshold: 0 });
    obs.observe(canvas);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      obs.disconnect();
    };
  }, [count, color]);

  return <canvas ref={ref} className="starfield-canvas" aria-hidden="true" />;
}
