'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import Reveal from '../../components/Reveal';

const PER_PAGE = 9;

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch { return iso; }
}

export default function InsightsBrowser({ articles, tags }) {
  const [q, setQ] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => { setPage(1); }, [q, activeTags]);

  const toggleTag = (t) => {
    setActiveTags((curr) => curr.includes(t) ? curr.filter((x) => x !== t) : [...curr, t]);
  };

  const filtered = useMemo(() => {
    const qLow = q.trim().toLowerCase();
    return articles.filter((a) => {
      if (activeTags.length > 0 && !activeTags.every((t) => a.tags.includes(t))) return false;
      if (!qLow) return true;
      const hay = `${a.title} ${a.excerpt} ${a.tags.join(' ')} ${a.author}`.toLowerCase();
      return hay.includes(qLow);
    });
  }, [articles, q, activeTags]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const clear = () => { setQ(''); setActiveTags([]); };

  return (
    <section className="blog">
      <div className="blog-hero">
        <div className="hud-label">[ Insights · Editorial ]</div>
        <Reveal as="h1" className="section-title blog-title">
          Notas de <span className="t-accent">campo.</span>
        </Reveal>
        <p className="section-lede blog-lede">
          Ensaios curtos sobre engenharia de IA, agentes em produção, RAG, evals e o que vemos quebrar.
          <span className="t-muted"> {articles.length} {articles.length === 1 ? 'ensaio' : 'ensaios'} publicados.</span>
        </p>
      </div>

      <div className="blog-toolbar">
        <label className="blog-search">
          <span className="hud-label">Buscar</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="título, tag, autor, palavra…"
            autoComplete="off"
            spellCheck="false"
            aria-label="Buscar ensaios"
          />
          {q && (
            <button type="button" className="blog-search-clear" onClick={() => setQ('')} aria-label="Limpar busca" data-cursor="limpar">✕</button>
          )}
        </label>

        <div className="blog-tagbar" role="group" aria-label="Filtrar por tag">
          <span className="hud-label">Tags</span>
          <div className="blog-tags">
            {tags.map((t) => {
              const on = activeTags.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  className={`blog-tag ${on ? 'is-on' : ''}`}
                  onClick={() => toggleTag(t)}
                  aria-pressed={on}
                  data-cursor={on ? 'remover' : 'filtrar'}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="blog-meta">
          <span className="hud-mono">
            {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
          </span>
          {(q || activeTags.length > 0) && (
            <button type="button" className="btn-ghost-sm" onClick={clear} data-cursor="limpar">
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {pageItems.length === 0 ? (
        <div className="blog-empty">
          <div className="hud-label">[ Nenhum resultado ]</div>
          <p>Tente outra busca ou remova filtros.</p>
        </div>
      ) : (
        <div className="blog-grid">
          {pageItems.map((a, i) => (
            <Link
              key={a.slug}
              href={`/insights/${a.slug}`}
              className="blog-card"
              data-cursor="ler"
              aria-label={`Abrir ensaio: ${a.title}`}
            >
              <div className="blog-card-media">
                <img src={a.image} alt={`Capa: ${a.title}`} loading="lazy" decoding="async" />
                <div className="blog-card-grid-overlay" />
                <div className="blog-card-num">/ {String((safePage - 1) * PER_PAGE + i + 1).padStart(2, '0')}</div>
                {a.featured && <div className="featured-badge">★ Destaque</div>}
              </div>
              <div className="blog-card-info">
                <div className="blog-card-meta">
                  <span className="hud-mono">{formatDate(a.date)}</span>
                  <span className="article-dot">·</span>
                  <span className="hud-mono">{a.readTime}</span>
                </div>
                <h3 className="blog-card-title">{a.title}</h3>
                <p className="blog-card-excerpt">{a.excerpt}</p>
                <div className="blog-card-foot">
                  <div className="blog-card-tags">
                    {a.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <span className="blog-card-arrow" aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav className="blog-pagination" aria-label="Navegação de páginas">
          <button
            type="button"
            className="blog-page-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            data-cursor="anterior"
            aria-label="Página anterior"
          >←</button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            return (
              <button
                key={n}
                type="button"
                className={`blog-page-num ${n === safePage ? 'is-on' : ''}`}
                onClick={() => setPage(n)}
                aria-current={n === safePage ? 'page' : undefined}
                aria-label={`Página ${n}`}
                data-cursor={`pág ${n}`}
              >
                {String(n).padStart(2, '0')}
              </button>
            );
          })}
          <button
            type="button"
            className="blog-page-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            data-cursor="próximo"
            aria-label="Próxima página"
          >→</button>
        </nav>
      )}
    </section>
  );
}
