---
tags: [deprecated]
---

# InsightsManager (REMOVIDO)

> Componente removido em 2026-05-24 (3ª iteração). Sistema migrado para blog real em arquivos Markdown.

Funcionalidades migradas:

| Antes | Agora |
|---|---|
| `InsightsSection` interna | [[InsightsSection]] (server component) |
| `ArticleModal` | Página `/insights/[slug]` |
| `AllArticlesModal` | Página `/insights` com busca/tags/paginação |
| `useArticles` (localStorage) | `lib/insights.js` (arquivos .md) |
| `useAdminAuth` + LoginModal + AdminPanel | Removido (CRUD via arquivos no repo) |
| `renderMarkdown` custom | `marked` |
| Easter-egg `dev` para revelar admin | Removido |

Ver [[08 — Sistema de Insights]].
