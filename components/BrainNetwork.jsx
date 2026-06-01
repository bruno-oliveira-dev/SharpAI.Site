'use client';
import { useEffect, useRef } from 'react';

export default function BrainNetwork({ density = 160 }) {
  const ref = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

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
    const points = [], links = [];
    const accentGradients = new Map();

    const inBrain = (nx, ny) => {
      const rx = 1.05, ry = 1.25;
      if ((nx * nx) / (rx * rx) + (ny * ny) / (ry * ry) > 1) return false;
      if (ny > 0.55 && nx < -0.45) return false;
      if (ny < -0.05 && Math.abs(nx) < 0.04) return false;
      return true;
    };
    const sCurve = [
      [-0.30,-0.45],[-0.05,-0.55],[0.18,-0.45],[0.22,-0.25],
      [0.05,-0.10],[-0.18,0.02],[-0.28,0.18],[-0.18,0.35],
      [0.05,0.45],[0.25,0.45],
    ];

    const init = () => {
      points.length = 0; links.length = 0;
      accentGradients.clear();
      let tries = 0;
      while (points.length < density && tries < density * 80) {
        tries++;
        const nx = Math.random() * 2 - 1, ny = Math.random() * 2 - 1;
        if (!inBrain(nx, ny)) continue;
        const r2 = nx * nx + ny * ny * 1.4;
        if (Math.random() > 0.75 + r2 * 0.2) continue;
        points.push({ nx, ny, x: 0, y: 0, r: Math.random() * 1.4 + 0.5, accent: false, phase: Math.random() * Math.PI * 2 });
      }
      sCurve.forEach(([sx, sy]) => {
        let best = null, bd = Infinity;
        for (const p of points) {
          const dx = p.nx - sx, dy = p.ny - sy, d = dx * dx + dy * dy;
          if (d < bd) { bd = d; best = p; }
        }
        if (best) { best.accent = true; best.r = 1.8 + Math.random() * 0.8; }
      });
      sCurve.forEach(([sx, sy]) => {
        for (const p of points) {
          const dx = p.nx - sx, dy = p.ny - sy;
          if (dx * dx + dy * dy < 0.012 && Math.random() < 0.55) {
            p.accent = true; p.r = 1.4 + Math.random() * 0.6;
          }
        }
      });
      const D2 = 0.035;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].nx - points[j].nx, dy = points[i].ny - points[j].ny;
          const d = dx * dx + dy * dy;
          if (d < D2) links.push([i, j, d]);
        }
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left) / r.width - 0.5;
      mouse.current.y = (e.clientY - r.top) / r.height - 0.5;
      mouse.current.active = true;
    };
    const onLeave = () => { mouse.current.active = false; };

    const project = (time) => {
      const cx = w * 0.5, cy = h * 0.5, radius = Math.min(w, h) * 0.42;
      const mx = mouse.current.active ? mouse.current.x : 0;
      const my = mouse.current.active ? mouse.current.y : 0;
      const breath = 1 + Math.sin(time * 0.6) * 0.012;
      for (const p of points) {
        const par = p.accent ? 18 : 8;
        p.x = cx + p.nx * radius * breath + mx * par;
        p.y = cy + p.ny * radius * breath + my * par;
      }
    };

    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      if (!visible || !inView) return;
      const time = t * 0.001;
      ctx.clearRect(0, 0, w, h);
      project(time);
      for (const [i, j, d] of links) {
        const a = points[i], b = points[j];
        const alpha = 1 - d / 0.035;
        const isAccent = a.accent || b.accent;
        if (isAccent) { ctx.strokeStyle = `rgba(255,140,40,${Math.min(1, alpha * 1.4)})`; ctx.lineWidth = 1.4; }
        else { ctx.strokeStyle = `rgba(120,200,230,${alpha * 0.85})`; ctx.lineWidth = 0.9; }
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      for (const p of points) {
        const pulse = (Math.sin(time * 2 + p.phase) + 1) / 2;
        const baseR = p.r * (p.accent ? 1.4 + pulse * 0.6 : 1.1);
        if (p.accent) {
          ctx.fillStyle = `rgba(255,107,0,${0.18 + pulse * 0.18})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, baseR * 6, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#FFA060';
          ctx.beginPath(); ctx.arc(p.x, p.y, baseR, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = `rgba(200,225,240,${0.85 + pulse * 0.15})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, baseR, 0, Math.PI * 2); ctx.fill();
        }
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
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      obs.disconnect();
    };
  }, [density]);

  return <canvas ref={ref} className="brain-canvas" aria-hidden="true" />;
}
