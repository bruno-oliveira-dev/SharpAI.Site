'use client';
import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

const CAPS = [
  { n: '01', title: '.NET & Plataformas', short: '.NET, C# e Python. Backend que aguenta auditoria.', tags: ['.NET','C#','Python','APIs','DDD'], desc: 'Plataformas de produto com engenharia disciplinada: testes, observabilidade, código que dura.' },
  { n: '02', title: 'Engenharia de IA', short: 'LLMs em produção: RAG, fine-tuning, evals contínuos.', tags: ['LLMs','RAG','Evals','Embeddings','Vision'], desc: 'Sistemas de IA pensados como engenharia de software: testáveis, observáveis e em produção.' },
  { n: '03', title: 'Agentes & Automação', short: 'Agentes que executam, não apenas respondem.', tags: ['Tool-use','Orquestração','Guardrails','Eval-loops'], desc: 'Workflows autônomos com ferramentas, limites e telemetria. Para tarefas reais — não demos.' },
  { n: '04', title: 'Integrações & Data', short: 'ETL, APIs e webhooks para o ERP que ninguém quer tocar.', tags: ['ETL','Streaming','APIs','Webhooks','ERP'], desc: 'Conectamos o que já existe ao que você precisa construir. Dados onde precisam estar.' },
  { n: '05', title: 'Interfaces 3D & WebGL', short: 'Three.js, GLSL e Rive quando a UI precisa fechar a venda.', tags: ['Three.js','GLSL','Rive','Lottie','Motion'], desc: 'Quando a interface é o produto, ela precisa funcionar — e também impressionar.' },
];

const PREVIEW_W = 320;
const PREVIEW_OFFSET_X = 30;
const PREVIEW_OFFSET_Y = -80;

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;
    const grid = node.parentElement;
    if (!grid) return;
    let raf;
    const onMove = (e) => {
      const x = Math.min(e.clientX + PREVIEW_OFFSET_X, window.innerWidth - PREVIEW_W - 16);
      const y = Math.max(16, e.clientY + PREVIEW_OFFSET_Y);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    grid.addEventListener('mousemove', onMove);
    grid.addEventListener('mouseenter', onEnter);
    grid.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      grid.removeEventListener('mousemove', onMove);
      grid.removeEventListener('mouseenter', onEnter);
      grid.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="capacidades" className="caps">
      <div className="section-head">
        <div className="hud-label">[ Capacidades ]</div>
        <Reveal as="h2" className="section-title">
          <span>O que entregamos.</span>
        </Reveal>
        <p className="section-lede">Cinco frentes. Senioridade alta. Sem júnior em produção, sem terceirização.</p>
      </div>

      <div className="caps-grid">
        {CAPS.map((c, i) => (
          <div
            key={c.n}
            className={`caps-row ${active === i ? 'is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
            role="button"
            aria-pressed={active === i}
            aria-label={`${c.title} — ${c.short}`}
            data-cursor="explorar"
          >
            <span className="caps-n">{c.n}</span>
            <h3 className="caps-title">{c.title}</h3>
            <p className="caps-short">{c.short}</p>
            <span className="caps-arrow" aria-hidden="true">→</span>
          </div>
        ))}

        <div
          ref={previewRef}
          className="caps-preview"
          style={{ opacity: visible ? 1 : 0 }}
          aria-hidden="true"
        >
          <div className="caps-preview-num">{CAPS[active].n}</div>
          <div className="caps-preview-title">{CAPS[active].title}</div>
          <p className="caps-preview-desc">{CAPS[active].desc}</p>
          <div className="caps-preview-tags">
            {CAPS[active].tags.map((t) => <span key={t}>{t}</span>)}
          </div>
          <div className="caps-preview-bar"><span /></div>
        </div>
      </div>
    </section>
  );
}
