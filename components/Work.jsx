'use client';
import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import Magnetic from './Magnetic';

const WORK = [
  { n: '001', client: 'Holding Industrial', scope: 'Plataforma de previsão de demanda', year: '2025', tags: ['IA','Forecast','ERP'], color: '#FF6B00', img: '/assets/sharpai-concept-1.png', impact: '−38%', impactLabel: 'erro de previsão' },
  { n: '002', client: 'Fintech', scope: 'Agente de atendimento + RAG', year: '2025', tags: ['Agente','RAG','Evals'], color: '#00E5FF', img: '/assets/sharpai-concept-2.png', impact: '4×', impactLabel: 'throughput de tickets' },
  { n: '003', client: 'Healthtech', scope: 'Triagem clínica assistida', year: '2024', tags: ['Vision','Guardrails'], color: '#FF6B00', img: '/assets/sharpai-concept-1.png', impact: '12ms', impactLabel: 'p99 inferência' },
  { n: '004', client: 'Logística', scope: 'Roteirização em tempo real', year: '2024', tags: ['Edge','Streaming'], color: '#00E5FF', img: '/assets/sharpai-concept-2.png', impact: '−22%', impactLabel: 'km rodados' },
  { n: '005', client: 'Mídia', scope: 'Sumarização editorial automatizada', year: '2024', tags: ['LLM','Pipeline'], color: '#FF6B00', img: '/assets/sharpai-concept-1.png', impact: '8×', impactLabel: 'volume de pautas' },
  { n: '006', client: 'SaaS B2B', scope: 'Internal copilot multi-tenant', year: '2026', tags: ['Copilot','Multi-tenant'], color: '#00E5FF', img: '/assets/sharpai-concept-2.png', impact: '94%', impactLabel: 'eval pass-rate' },
];

export default function Work() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' });
  };

  return (
    <section id="trabalho" className="work" aria-labelledby="trabalho-heading">
      <div className="section-head work-head">
        <div>
          <div className="hud-label">[ Casos · 2024–2026 ]</div>
          <Reveal as="h2" id="trabalho-heading" className="section-title">
            Sistemas <span className="t-accent">em produção.</span>
          </Reveal>
        </div>
        <div className="work-controls">
          <button type="button" className="work-arrow" onClick={() => scrollBy(-1)} data-cursor="anterior" aria-label="Caso anterior">←</button>
          <div className="work-progress" aria-hidden="true"><span style={{ width: `${progress * 100}%` }} /></div>
          <button type="button" className="work-arrow" onClick={() => scrollBy(1)} data-cursor="próximo" aria-label="Próximo caso">→</button>
        </div>
      </div>

      <div ref={trackRef} className="work-track">
        {WORK.map((w) => (
          <article
            key={w.n}
            className="work-card"
            data-cursor="abrir"
            tabIndex={0}
            aria-label={`${w.client}: ${w.scope}, ${w.year}`}
          >
            <div className="work-card-num">{w.n}</div>
            <div className="work-card-year">{w.year}</div>
            <div className="work-card-media">
              <div className="work-card-grid" />
              <img
                src={w.img}
                alt={`Visual conceitual do projeto ${w.scope}`}
                loading="lazy"
                decoding="async"
              />
              <div className="work-card-overlay" style={{ '--glow': w.color }} />
            </div>
            <div className="work-card-info">
              <div className="work-card-row">
                <span className="hud-label">Cliente</span>
                <span>{w.client}</span>
              </div>
              <h3 className="work-card-title">{w.scope}</h3>
              <div>
                <div className="work-card-impact">{w.impact}</div>
                <div className="work-card-impact-label">{w.impactLabel}</div>
              </div>
              <div className="work-card-tags">
                {w.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              <div className="work-card-cta">
                <span>Estudo de caso</span>
                <span className="arrow" aria-hidden="true">→</span>
              </div>
            </div>
          </article>
        ))}
        <div className="work-end">
          <div>
            <div className="hud-label">/ Fim do índice</div>
            <p>12 outros sob NDA. Conversamos.</p>
          </div>
          <Magnetic>
            <a href="#contato" className="btn-primary" data-cursor="solicitar">Solicitar acesso →</a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
