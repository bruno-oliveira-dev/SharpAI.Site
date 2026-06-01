---
tags: [arquitetura, decisões]
---

# 05 — Decisões de Arquitetura

## Stack: Next.js 16 + React 19 + JS puro

**Por quê.** Site institucional não precisa de TS para tipos complexos; o ganho de velocidade de iteração compensa. Quando o blog migrar para MDX server-rendered, considerar TS.

**Trade-off.** Sem tipagem nas props de componentes — risco mitigado por componentes pequenos e nomes claros.

## CSS único em `app/globals.css`

**Por quê.** Site monolítico (~10 seções), zero benefício de scoping. Tokens centralizados em `:root`. Menos arquivos = menos cognitive load.

**Trade-off.** Se chegar a 1500+ linhas, quebrar em `globals.css` + `components.css` + `print.css`.

## Tudo `'use client'`

**Por quê.** Animações requerem browser APIs (rAF, IntersectionObserver, canvas, localStorage). Footer e Manifesto poderiam ser server, mas o overhead de boundary não vale a economia.

**Quando reverter.** Quando InsightsManager virar páginas server-rendered, Footer e Manifesto migram junto.

## `<img>` cru, sem `next/image`

**Por quê.** Imagens são poucas, pequenas, locais. Evita configurar `images.remotePatterns`. Preserva CSS `object-fit` sem `fill` magic.

**Quando reverter.** Quando entrar capa de blog com imagens remotas/dinâmicas.

## Insights em arquivos Markdown (server-rendered)

**Por quê.** Blog real precisa de SEO indexável, HTML estático, versionamento via git. `localStorage` resolvia protótipo mas não era um blog — era um app.

**Setup.** `content/insights/<slug>.md` com frontmatter via `gray-matter`. Server reader em `lib/insights.js`. Listagem em `/insights` (client browser para busca/filtro), artigos em `/insights/[slug]` (SSG).

**Trade-off.** Não há admin via UI. CRUD = editar arquivo + commit. Para o estágio do projeto, isso é uma feature, não bug.

**Quando reverter.** Se virar produto multi-autor (ex.: SaaS de blog). Aí entra CMS headless (Sanity, Strapi) ou Notion API.

## Sem libs de animação (Framer Motion, GSAP)

**Por quê.** Tamanho de bundle + dependência. As animações são previsíveis e hand-coded em rAF/CSS.

**Quando reverter.** Se chegar em scroll-driven choreography complexa (ex.: timeline com 10+ steps).

## Vault em `docs/sharpai-vault`

**Por quê.** Vive junto com o código, versionável, pode ser aberta no Obsidian direto (`Open folder as vault`). Memória do projeto = source of truth.
