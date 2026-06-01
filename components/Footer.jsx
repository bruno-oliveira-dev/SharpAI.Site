'use client';
import { useEffect, useState } from 'react';

const BUILD_BASE = 31420;

export default function Footer() {
  const [build, setBuild] = useState(BUILD_BASE);
  useEffect(() => {
    setBuild(Math.floor(Date.now() / 1000) % 99999);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo-square big">S</div>
          <div>
            <div className="logo-word lg">Sharp<em>AI</em><span className="logo-dot">.</span></div>
            <div className="hud-label">Engenharia &amp; IA · São Paulo · 2026</div>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <div className="hud-label">Empresa</div>
            <a href="#manifesto" data-cursor="ir">Manifesto</a>
            <a href="#capacidades" data-cursor="ir">Capacidades</a>
            <a href="#insights" data-cursor="ir">Insights</a>
            <a href="#contato" data-cursor="ir">Contato</a>
          </div>
          <div>
            <div className="hud-label">Social</div>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" data-cursor="abrir" aria-label="LinkedIn (abre em nova aba)">LinkedIn ↗</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" data-cursor="abrir" aria-label="GitHub (abre em nova aba)">GitHub ↗</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" data-cursor="abrir" aria-label="X / Twitter (abre em nova aba)">X / Twitter ↗</a>
          </div>
          <div>
            <div className="hud-label">Legal</div>
            <a href="#contato" data-cursor="ler">Privacidade</a>
            <a href="#contato" data-cursor="ler">Termos</a>
            <a href="#contato" data-cursor="ler">Cookies</a>
          </div>
        </div>
      </div>
      <div className="footer-base">
        <span className="hud-mono">© 2026 SHARP·AI</span>
        <span>Software afiado, em produção.</span>
        <span className="hud-mono" suppressHydrationWarning>v3.2.1 · build {build}</span>
      </div>
    </footer>
  );
}
