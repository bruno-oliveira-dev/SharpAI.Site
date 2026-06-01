import Link from 'next/link';
import { notFound } from 'next/navigation';
import CustomCursor from '../../../components/CustomCursor';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import Magnetic from '../../../components/Magnetic';
import { getInsight, getInsightSlugs, getAllInsights } from '../../../lib/insights';

export const dynamicParams = false;

export function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `https://sharpai.com.br/insights/${article.slug}`,
      images: [{ url: article.image, alt: article.title }],
      publishedTime: article.date ? new Date(article.date + 'T00:00:00').toISOString() : undefined,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
  } catch { return iso; }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();

  const all = getAllInsights();
  const idx = all.findIndex((a) => a.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: `https://sharpai.com.br${article.image}`,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.date,
    publisher: { '@type': 'Organization', name: 'SharpAI', logo: { '@type': 'ImageObject', url: 'https://sharpai.com.br/assets/sharpai-logo.png' } },
    keywords: article.tags.join(', '),
  };

  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <article className="article-page">
          <div className="article-page-back">
            <Link href="/insights" className="btn-ghost" data-cursor="voltar">
              ← Voltar para Insights <span className="btn-ghost-line" />
            </Link>
          </div>

          <header className="article-page-head">
            <div className="hud-label">[ Insights · {formatDate(article.date)} ]</div>
            <h1 className="article-page-title">{article.title}</h1>
            <p className="article-page-excerpt">{article.excerpt}</p>
            <div className="article-page-meta">
              <span className="hud-mono">{article.author}</span>
              <span className="article-dot">·</span>
              <span className="hud-mono">{article.readTime}</span>
              <span className="article-dot">·</span>
              <div className="article-page-tags">
                {article.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          </header>

          <div className="article-page-image">
            <img src={article.image} alt={`Capa: ${article.title}`} loading="eager" decoding="async" />
            <div className="article-image-grid" />
          </div>

          <div
            className="article-page-body markdown"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          <footer className="article-page-foot">
            <div className="article-page-cta">
              <span className="hud-label">/ Fim do ensaio</span>
              <Magnetic strength={0.2}>
                <Link className="btn-primary" href="/#contato" data-cursor="conversar">
                  Conversar sobre o tema →
                </Link>
              </Magnetic>
            </div>

            {(prev || next) && (
              <nav className="article-page-nav" aria-label="Ensaios adjacentes">
                {prev ? (
                  <Link href={`/insights/${prev.slug}`} className="article-page-nav-link" data-cursor="anterior">
                    <span className="hud-label">← Anterior</span>
                    <span className="article-page-nav-title">{prev.title}</span>
                  </Link>
                ) : <span />}
                {next ? (
                  <Link href={`/insights/${next.slug}`} className="article-page-nav-link is-next" data-cursor="próximo">
                    <span className="hud-label">Próximo →</span>
                    <span className="article-page-nav-title">{next.title}</span>
                  </Link>
                ) : <span />}
              </nav>
            )}
          </footer>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
