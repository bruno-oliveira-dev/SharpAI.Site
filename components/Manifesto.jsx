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
          <div className="stat-num"><CountUp to={40} suffix="+" /></div>
          <div className="stat-label">Sistemas em produção</div>
          <div className="stat-aux">desde 2021</div>
        </div>
        <div className="stat" role="listitem">
          <div className="stat-num"><CountUp to={12} /></div>
          <div className="stat-label">Times que voltaram</div>
          <div className="stat-aux">retenção · 24m</div>
        </div>
        <div className="stat" role="listitem">
          <div className="stat-num"><CountUp to={99.8} decimals={1} suffix="%" /></div>
          <div className="stat-label">SLA cumprido</div>
          <div className="stat-aux">média móvel · 90d</div>
        </div>
        <div className="stat" role="listitem">
          <div className="stat-num"><CountUp to={5} /></div>
          <div className="stat-label">Anos de código entregue</div>
          <div className="stat-aux">SP · BR</div>
        </div>
      </div>
    </section>
  );
}
