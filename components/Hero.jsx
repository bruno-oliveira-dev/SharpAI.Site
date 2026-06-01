'use client';
import { useEffect, useState } from 'react';
import Starfield from './Starfield';
import NeuralCanvas from './NeuralCanvas';
import BrainNetwork from './BrainNetwork';
import SplitText from './SplitText';
import Magnetic from './Magnetic';
import Marquee from './Marquee';

const MARQUEE = [
  'Engenharia de IA','Agentes em produção','RAG que mede','.NET · Python',
  'WebGL · Three.js','Edge · Cloud','Arquitetura','Integrações','Performance',
];

const FEED = [
  { ts: '18:42', text: 'feat(agent-fintech): tool guardrails passing' },
  { ts: '18:31', text: 'perf(rag-health): rerank @200ms p99' },
  { ts: '17:58', text: 'deploy(prod): v2.1.0 → 99.97% healthy' },
  { ts: '17:14', text: 'eval(copilot): 94% pass · 312 runs' },
  { ts: '16:38', text: 'fix(etl-erp): retry-after backoff' },
  { ts: '16:02', text: 'release(insights): mdx pipeline live' },
];

export default function Hero({ density = 80 }) {
  const [feedIdx, setFeedIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFeedIdx((i) => (i + 1) % FEED.length), 5200);
    return () => clearInterval(id);
  }, []);
  const visible = [
    FEED[feedIdx],
    FEED[(feedIdx + 1) % FEED.length],
    FEED[(feedIdx + 2) % FEED.length],
  ];

  return (
    <section id="inicio" className="hero">
      <Starfield count={180} />
      <NeuralCanvas density={density} />
      <div className="hero-brain"><BrainNetwork density={150} /></div>
      <div className="hero-vignette" />

      <div className="hero-grid">
        <div className="hero-tag">
          <span className="hud-dot" /> Aceitando 2 projetos · Q3 2026
        </div>

        <h1 className="hero-title">
          <span className="hero-line">
            <SplitText text="Software" delay={150} />
          </span>
          <span className="hero-line">
            <SplitText text="afiado." className="t-accent" delay={250} />
          </span>
          <span className="hero-line">
            <SplitText text="Para quem envia." delay={400} />
          </span>
        </h1>

        <div className="hero-meta">
          <div className="hero-meta-col">
            <div className="hud-label">[ 01 / O que fazemos ]</div>
            <p className="hero-sub">
              Engenharia de IA e automação para times que medem deploy, não tese.
              Você descreve o problema, devolvemos sistema em produção.
            </p>
          </div>
          <div className="hero-meta-col">
            <div className="hud-label">[ 02 / Como entregamos ]</div>
            <ul className="hero-stack">
              <li><span>01</span> Diagnóstico em 5 dias</li>
              <li><span>02</span> Spike funcional em 2 semanas</li>
              <li><span>03</span> Produto em produção em 8</li>
              <li><span>04</span> Operação contínua</li>
            </ul>
          </div>
        </div>

        <div className="hero-cta">
          <Magnetic>
            <a href="#contato" className="btn-primary" data-cursor="começar">
              <span>Iniciar projeto</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a href="#capacidades" className="btn-ghost" data-cursor="explorar">
              Ver capacidades
              <span className="btn-ghost-line" />
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="hero-side" aria-label="Status do estúdio">
        <div className="hero-side-block">
          <div className="hud-label">Origem</div>
          <div className="hud-mono lg">SP · −23.55</div>
        </div>
        <div className="hero-side-block">
          <div className="hud-label">Status</div>
          <div className="hud-mono lg">
            <span className="pulse" /> Online
          </div>
        </div>
        <div className="hero-side-block">
          <div className="hud-label">Build log · live</div>
          <div className="hero-side-feed" aria-live="polite">
            {visible.map((f, i) => (
              <div key={`${feedIdx}-${i}`} className="hero-side-feed-line">
                <span className="ts">{f.ts}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>scroll</span>
        <span className="hero-scroll-line"><span /></span>
      </div>

      <div className="hero-marquee">
        <Marquee items={MARQUEE} speed={42} separator="✦" />
      </div>
    </section>
  );
}
