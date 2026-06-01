'use client';
import { useEffect, useRef, useState } from 'react';
import Magnetic from './Magnetic';
import Marquee from './Marquee';
import LiveClock from './LiveClock';

export default function Contact() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [form, setForm] = useState({ name: '', email: '', project: '' });
  const [status, setStatus] = useState({ type: null, msg: '' });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      setTilt({
        x: ((e.clientX - r.left) / r.width - 0.5) * 2,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2,
      });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.project.trim()) {
      setStatus({ type: 'error', msg: 'Preencha os três campos.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus({ type: 'error', msg: 'E-mail inválido.' });
      return;
    }
    const subject = encodeURIComponent(`Briefing · ${form.name}`);
    const body = encodeURIComponent(
      `Nome: ${form.name}\nE-mail: ${form.email}\n\nProjeto:\n${form.project}\n\n— enviado via sharpai.com.br`
    );
    window.location.href = `mailto:hello@sharpai.com.br?subject=${subject}&body=${body}`;
    setStatus({ type: 'success', msg: 'Briefing enviado. Verifique seu cliente de e-mail.' });
    setForm({ name: '', email: '', project: '' });
  };

  const copyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('hello@sharpai.com.br');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = 'mailto:hello@sharpai.com.br';
    }
  };

  return (
    <section id="contato" ref={ref} className="contact" aria-labelledby="contato-heading">
      <div className="contact-bg" />
      <div className="contact-grid">
        <div className="contact-head">
          <div className="hud-label">[ Briefing · 24h ]</div>
          <h2
            id="contato-heading"
            className="contact-mega"
            style={{ transform: `translate(${tilt.x * 14}px, ${tilt.y * 8}px)` }}
          >
            <span>Tem</span>
            <span className="t-accent">problema</span>
            <span>difícil<span className="t-volt">?</span></span>
          </h2>
        </div>

        <div className="contact-body">
          <div className="contact-col">
            <div className="hud-label">Briefing rápido</div>
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <label>
                <span>Nome</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Seu nome"
                  autoComplete="name"
                />
              </label>
              <label>
                <span>E-mail</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="voce@empresa.com"
                  autoComplete="email"
                />
              </label>
              <label>
                <span>Projeto</span>
                <textarea
                  rows="3"
                  required
                  value={form.project}
                  onChange={(e) => setForm((f) => ({ ...f, project: e.target.value }))}
                  placeholder="Em uma frase: qual é o problema?"
                />
              </label>
              <Magnetic>
                <button type="submit" className="btn-primary" data-cursor="enviar">
                  Enviar briefing →
                </button>
              </Magnetic>
              {status.type && (
                <div
                  className={`contact-form-status ${status.type === 'error' ? 'is-error' : ''}`}
                  role={status.type === 'error' ? 'alert' : 'status'}
                >
                  <span className="hud-dot" />
                  {status.msg}
                </div>
              )}
            </form>
          </div>

          <div className="contact-col">
            <div className="hud-label">Canais diretos</div>
            <ul className="contact-channels">
              <li>
                <span className="hud-label">E-mail</span>
                <a href="mailto:hello@sharpai.com.br" onClick={copyEmail} data-cursor={copied ? 'copiado' : 'copiar'}>
                  {copied ? 'copiado ✓' : 'hello@sharpai.com.br'}
                </a>
              </li>
              <li>
                <span className="hud-label">LinkedIn</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" data-cursor="abrir">/company/sharpai ↗</a>
              </li>
              <li>
                <span className="hud-label">Endereço</span>
                <span>Av. Paulista, 1000 — São Paulo, BR</span>
              </li>
              <li>
                <span className="hud-label">Horário local</span>
                <LiveClock />
              </li>
            </ul>
            <div className="contact-note">
              <span className="hud-dot" />
              Resposta em <strong>24h</strong>. NDA recíproco no primeiro contato.
            </div>
          </div>
        </div>
      </div>

      <div className="contact-footer">
        <Marquee
          items={['Vamos construir algo afiado','Build something sharp','AI engineered for production','São Paulo · BR']}
          speed={28}
          separator="◆"
        />
      </div>
    </section>
  );
}
