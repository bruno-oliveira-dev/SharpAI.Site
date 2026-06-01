'use client';
import { useEffect, useRef } from 'react';

export default function NeuralCanvas({ density = 80, accent = '#FF6B00' }) {
  const ref = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const ctx = canvas.getContext('2d');
    let raf;
    let w = 0, h = 0, dpr = 1;
    let visible = true;
    let inView = true;
    const particles = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const init = () => {
      particles.length = 0;
      const n = Math.floor(w * h / 18000) + density;
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.4 + 0.4,
          k: Math.random() < 0.18 ? 1 : 0,
        });
      }
    };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left;
      mouse.current.y = e.clientY - r.top;
      mouse.current.active = true;
    };
    const onLeave = () => { mouse.current.active = false; };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || !inView) return;

      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x, my = mouse.current.y;
      for (const p of particles) {
        if (mouse.current.active) {
          const dx = mx - p.x, dy = my - p.y, d2 = dx * dx + dy * dy;
          if (d2 < 22000) {
            const f = (1 - d2 / 22000) * 0.04;
            p.vx += dx / Math.sqrt(d2 + 1) * f;
            p.vy += dy / Math.sqrt(d2 + 1) * f;
          }
        }
        p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;
      }
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 10000) {
            const alpha = (1 - d2 / 10000) * 0.32;
            ctx.strokeStyle = a.k || b.k ? `rgba(255,107,0,${alpha})` : `rgba(0,229,255,${alpha * 0.55})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.fillStyle = p.k ? accent : 'rgba(190,210,220,0.85)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        if (p.k) {
          ctx.fillStyle = 'rgba(255,107,0,0.12)';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
        }
      }
      if (mouse.current.active) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 160);
        grd.addColorStop(0, 'rgba(255,107,0,0.10)');
        grd.addColorStop(1, 'rgba(255,107,0,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(mx - 160, my - 160, 320, 320);
      }
    };

    resize(); init();
    const onResize = () => { resize(); init(); };
    const onVisibility = () => { visible = !document.hidden; };
    const obs = new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { threshold: 0 });
    obs.observe(canvas);

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove, { passive: true });
    canvas.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      obs.disconnect();
    };
  }, [density, accent]);

  return <canvas ref={ref} className="neural-canvas" aria-hidden="true" />;
}
