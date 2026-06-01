'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LiveClock from './LiveClock';
import Magnetic from './Magnetic';

const NAV_ITEMS = [
  { label: 'Início',      id: 'inicio',      href: '/#inicio',      kind: 'anchor' },
  { label: 'Capacidades', id: 'capacidades', href: '/#capacidades', kind: 'anchor' },
  { label: 'Trabalho',    id: 'trabalho',    href: '/#trabalho',    kind: 'anchor' },
  { label: 'Manifesto',   id: 'manifesto',   href: '/#manifesto',   kind: 'anchor' },
  { label: 'Insights',    id: 'insights',    href: '/insights',     kind: 'route' },
  { label: 'Contato',     id: 'contato',     href: '/#contato',     kind: 'anchor' },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isInsights = pathname?.startsWith('/insights');

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(isInsights ? 'insights' : 'inicio');

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Reset active state when leaving the home
  useEffect(() => {
    if (isInsights) { setActive('insights'); return; }
    if (!isHome) { setActive(''); return; }
  }, [isHome, isInsights]);

  // Scroll spy: só ativa na home, observando seções com hash
  useEffect(() => {
    if (!isHome) return;
    const ids = NAV_ITEMS.filter((it) => it.kind === 'anchor').map((it) => it.id);
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: '-30% 0px -50% 0px' }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [isHome]);

  return (
    <>
      <header className="nav">
        <Link href="/" className="nav-logo" data-cursor="início" aria-label="SharpAI · ir para o topo">
          <span className="logo-square">S</span>
          <span className="logo-word">
            Sharp<em>AI</em><span className="logo-dot">.</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Navegação principal">
          {NAV_ITEMS.slice(0, 5).map((it, idx) => (
            <Link
              key={it.id}
              href={it.href}
              className="nav-link"
              data-cursor={it.label.toLowerCase()}
              aria-current={active === it.id ? 'true' : undefined}
            >
              <span className="nav-num">0{idx + 1}</span>
              <span>{it.label}</span>
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <LiveClock />
          <Magnetic strength={0.25}>
            <Link href="/#contato" className="nav-cta" data-cursor="começar">
              Iniciar projeto <span className="arrow">→</span>
            </Link>
          </Magnetic>
          <button
            type="button"
            className={`nav-mobile-toggle ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="nav-mobile-panel"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div
        id="nav-mobile-panel"
        className={`nav-mobile-panel ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        {NAV_ITEMS.map((it, idx) => (
          <Link
            key={it.id}
            href={it.href}
            className="nav-mobile-link"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            aria-current={active === it.id ? 'true' : undefined}
          >
            <span className="num">0{idx + 1}</span>
            <span>{it.label}</span>
          </Link>
        ))}
        <div className="nav-mobile-foot">
          <LiveClock />
          <span>SP · BR</span>
        </div>
      </div>
    </>
  );
}
