import Link from 'next/link';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import { getFeaturedInsights, getAllInsights } from '../lib/insights';

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch { return iso; }
}

export default function InsightsSection() {
  const top = getFeaturedInsights(3);
  const total = getAllInsights().length;
  if (top.length === 0) return null;
  const [lead, ...rest] = top;
  return (
    <section id="insights" className="insights" aria-labelledby="insights-heading">
      <div className="section-head insights-head">
        <div>
          <div className="hud-label">[ Insights · Editorial ]</div>
          <Reveal as="h2" id="insights-heading" className="section-title">
            Notas de <span className="t-accent">campo.</span>
          </Reveal>
          <p className="section-lede">
            Ensaios curtos sobre engenharia de IA, agentes em produção e o que vemos quebrar.
          </p>
        </div>
        <div className="insights-actions">
          <Magnetic strength={0.2}>
            <Link href="/insights" className="btn-ghost" data-cursor="ver todos">
              Ver todos ({total}) <span className="btn-ghost-line" />
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="insights-grid">
        <Link
          href={`/insights/${lead.slug}`}
          className="insight-card insight-featured"
          data-cursor="ler"
          aria-label={`Abrir ensaio: ${lead.title}`}
        >
          <div className="insight-media">
            <img src={lead.image} alt={`Capa: ${lead.title}`} loading="lazy" decoding="async" />
            <div className="insight-media-grid" />
            <div className="insight-num">/ 01</div>
            {lead.featured && <div className="featured-badge">★ Destaque</div>}
          </div>
          <div className="insight-info">
            <div className="insight-meta">
              <span className="hud-mono">{formatDate(lead.date)}</span>
              <span className="article-dot">·</span>
              <span className="hud-mono">{lead.readTime}</span>
            </div>
            <h3 className="insight-title">{lead.title}</h3>
            <p className="insight-excerpt">{lead.excerpt}</p>
            <div className="insight-foot">
              <div className="insight-tags">{lead.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <span className="insight-cta">Ler ensaio <span className="arrow" aria-hidden="true">→</span></span>
            </div>
          </div>
        </Link>

        <div className="insights-side">
          {rest.map((a, i) => (
            <Link
              key={a.slug}
              href={`/insights/${a.slug}`}
              className="insight-card insight-side"
              data-cursor="ler"
              aria-label={`Abrir ensaio: ${a.title}`}
            >
              <div className="insight-side-head">
                <div className="insight-side-num">/ 0{i + 2}</div>
                {a.featured && <span className="featured-badge sm">★ Destaque</span>}
              </div>
              <div className="insight-side-meta">
                <span className="hud-mono">{formatDate(a.date)}</span>
                <span className="article-dot">·</span>
                <span className="hud-mono">{a.readTime}</span>
              </div>
              <h3 className="insight-side-title">{a.title}</h3>
              <p className="insight-side-excerpt">{a.excerpt}</p>
              <div className="insight-tags">{a.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
