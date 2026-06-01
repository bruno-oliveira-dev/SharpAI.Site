---
tags: [insights, blog]
---

# 08 — Sistema de Insights (blog)

A partir de 2026-05-24 (3ª iteração), Insights virou **blog server-rendered em arquivos Markdown**. Sem mais localStorage, sem admin UI.

## Estrutura

```
content/insights/<slug>.md      ← source of truth
lib/insights.js                  ← reader (server-side)
app/insights/page.js             ← listagem
app/insights/InsightsBrowser.jsx ← UI cliente (busca + filtro + paginação)
app/insights/[slug]/page.js      ← página do artigo
components/InsightsSection.jsx   ← 3 destaques na home
```

## Frontmatter por artigo

```md
---
title: "..."
excerpt: "..."
date: 2026-04-12        # YYYY-MM-DD
readTime: 8 min
author: Time SharpAI
tags: [Agentes, Evals]
image: /assets/sharpai-concept-1.png
featured: true
---

Corpo em markdown...
```

## Rotas

| Rota | Tipo | Render |
|---|---|---|
| `/` | static | home com 3 destaques (server component InsightsSection) |
| `/insights` | static | listagem completa com search/tags/paginação (client InsightsBrowser) |
| `/insights/[slug]` | SSG | artigo individual com `generateStaticParams` + JSON-LD Article + OG dinâmico |

## Listagem (`/insights`)

- **Busca**: substring em `title + excerpt + tags + author` (case-insensitive)
- **Filtro por tags**: clique em chip → AND (todos devem corresponder)
- **Paginação**: 9 por página (3×3 grid). Botões `←` `01 02 03` `→`
- **Estado vazio**: mensagem "Nenhum resultado"
- **Limpar filtros**: botão visível quando há busca/tag ativa

## Artigo (`/insights/[slug]`)

- `generateMetadata`: title, description, OG `type=article`, twitter card, canonical
- JSON-LD `Article` injetado no body
- Header com `[ Insights · <data> ]` + título serif gigante + excerpt italic
- Imagem de capa 16:9 com grid overlay
- Corpo markdown renderizado via `marked` server-side
- **Navegação prev/next** entre ensaios no rodapé
- CTA "Conversar sobre o tema" → `/#contato`

## Dependências adicionadas

```json
{
  "gray-matter": "^4.0.3",
  "marked": "^14.x"
}
```

## Por que arquivos `.md`?

- **SEO real**: cada artigo é uma página indexável (era impossível com localStorage)
- **Performance**: SSG → HTML estático, zero JS para ler conteúdo
- **Versionamento**: artigos vivem no git, histórico/diff/PR
- **Sem backend**: editor é o seu IDE, deploy é git push
- **Sem XSS**: conteúdo controlado pelo dono do repo

## O que foi removido

- `components/InsightsManager.jsx` (todo o sistema admin/login/CRUD/localStorage)
- `useArticles`, `useAdminAuth`, easter-egg `dev`
- Modal de "Ver todos" (substituído pela página `/insights`)
- ArticleModal (substituído pela página `/insights/[slug]`)
- Senha admin `sharp2026`

## Como adicionar um novo ensaio

1. Criar `content/insights/<slug-kebab-case>.md` com frontmatter completo
2. Escrever markdown no corpo
3. `npm run build` ou `npm run dev` — aparece automaticamente em `/insights` e `/insights/<slug>`
4. Sitemap.xml é regenerado em build

## Como rascunhar sem publicar

Hoje: não há mecanismo de draft. Sugestão (não implementado): `draft: true` no frontmatter + filtro em `getAllInsights()` no `lib/insights.js`.

## Próximos passos sugeridos

Ver [[09 — Roadmap & WOW]] item 9.6 e 9.13 (scroll-driven CSS, future-pages).

- `feed.xml` RSS (`app/feed.xml/route.js`)
- Tag-pages `/insights/tag/[tag]` para SEO de long-tail
- Filtro por autor
- Tabela de conteúdo (TOC) lateral em artigos longos
- Reading progress bar no topo do artigo
- "Artigos relacionados" baseado em tags em comum

Ver [[InsightsSection]] (home), [[Reveal]], [[Magnetic]].
