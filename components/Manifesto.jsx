'use client';
import Reveal from './Reveal';
import CountUp from './CountUp';

export default function Manifesto() {
  return (
    <section id="manifesto" className="manifesto" aria-labelledby="manifesto-heading">
      <div className="manifesto-head">
        <div className="hud-label" id="manifesto-heading">[ Manifesto ]</div>
      </div>

      <div className="manifesto-text">
        <Reveal>
          <p>
            <span className="manifesto-prompt" aria-hidden="true">&gt;</span>
            <span className="t-muted">acreditamos que</span> a IA já não é tendência,
            é <span className="t-accent">infraestrutura</span>.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <p>
            <span className="manifesto-prompt" aria-hidden="true">&gt;</span>
            <span className="t-muted">não vendemos</span> slides nem cerimônia.
            entregamos <span className="t-volt">software em produção</span>.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p>
            <span className="manifesto-prompt" aria-hidden="true">&gt;</span>
            <span className="t-muted">times pequenos.</span> ciclos curtos.
            <span className="t-accent"> decisões assinadas por quem entende</span>
            <span className="manifesto-caret" aria-hidden="true" />
          </p>
        </Reveal>
      </div>

      <div className="stats" role="list">
        <div className="stat" role="listitem">
          <div className="stat-num"><CountUp to={10} suffix="+" /></div>
          <div className="stat-label">Projetos entregues</div>
          <div className="stat-aux">portfólio · 2024-2026</div>
        </div>
        <div className="stat" role="listitem">
          <div className="stat-num"><CountUp to={5} /></div>
          <div className="stat-label">Anos de experiência</div>
          <div className="stat-aux">engenharia · IA</div>
        </div>
        <div className="stat" role="listitem">
          <div className="stat-num"><CountUp to={99} decimals={1} suffix="%" /></div>
          <div className="stat-label">Satisfação de clientes</div>
          <div className="stat-aux">feedback · net promoter</div>
        </div>
        <div className="stat" role="listitem">
          <div className="stat-num"><CountUp to={24} suffix="h" /></div>
          <div className="stat-label">Tempo de resposta</div>
          <div className="stat-aux">SLA · garantido</div>
        </div>
      </div>
    </section>
  );
}
