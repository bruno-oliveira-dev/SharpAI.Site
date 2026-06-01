---
tags: [changelog, history]
---

# 12 — Histórico de Refinos

## 2026-05-24 — Refino completo (auditoria + correções + vault)

### Bugs corrigidos

- ✅ Hydration mismatch em [[Footer]] (`Math.floor(Date.now()/1000)` em SSR)
- ✅ XSS em renderMarkdown ([[InsightsManager]]) — escape de `&<>"'` antes da regex
- ✅ Slug regex frágil — função `slugify()` dedicada com fallback
- ✅ Senha admin visível no LoginModal — removida a "dica"
- ✅ Botão Admin público — escondido por padrão, revelado com easter-egg `dev`
- ✅ `confirm()` nativo no admin — substituído por modal custom (preserva cursor)
- ✅ Capabilities `setState` por pixel — agora ref + rAF direto no DOM
- ✅ Capabilities preview saindo da tela na borda direita — clamp aplicado
- ✅ Canvases sem pausa off-screen — todos agora usam IntersectionObserver + visibilitychange
- ✅ BrainNetwork `createRadialGradient` por frame — substituído por arcs empilhados
- ✅ `Image` morto importado em Work.jsx — removido
- ✅ Nav sem menu mobile — hamburger + painel completo
- ✅ Form do Contato inerte — agora `mailto:` + validação + status feedback
- ✅ E-mail "copiar" enganoso — agora copia de verdade via `navigator.clipboard`
- ✅ Cards de Insights e Work não focáveis por teclado — `tabIndex` + `role="button"` + `onKeyDown`
- ✅ Modais sem focus trap — `useFocusTrap` custom
- ✅ Modais sem `role="dialog"`/`aria-modal`/`aria-labelledby` — adicionados
- ✅ Botões só-ícone sem `aria-label` — auditados
- ✅ Footer links sociais com `href="#"` — agora reais com `rel="noopener"`
- ✅ Contraste `--muted` 4.0:1 → 5.5:1
- ✅ Sem `:focus-visible` global — adicionado
- ✅ Sem skip link — adicionado
- ✅ `prefers-reduced-motion` ignorado — agora global em CSS + bypass JS em Cursor/Magnetic/Canvases/Reveal/SplitText/CountUp
- ✅ Sem `prefers-contrast` — adicionado
- ✅ Sem print styles — adicionados

### SEO

- ✅ Metadata completa (OG, Twitter, robots, keywords, authors)
- ✅ `metadataBase` + `alternates.canonical`
- ✅ Viewport export separado (Next 16 API)
- ✅ JSON-LD `Organization`
- ✅ `app/robots.js` + `app/sitemap.js` (gerados via build)
- ✅ `public/manifest.webmanifest`
- ✅ `next/font/google` com auto-self-hosting

### Refinamentos visuais

- ✅ Tokens de espaçamento (`--space-*`) e raios (`--radius-*`) padronizados
- ✅ Easing nomeado (`--ease-out`, `--ease-in-out`)
- ✅ Z-index nomeado
- ✅ Manifesto migrado para **Instrument Serif italic** (diferencia momento editorial)
- ✅ Work cards com **ano em badge** + **métrica de impacto** destacada
- ✅ Hero side panel com **Build log live** rotativo
- ✅ Hero density reduzido (Star 260→180, Neural 110→80, Brain 170→150)
- ✅ Grain opacity 0.05 → 0.035
- ✅ Logo glow reduzido (era exagerado)
- ✅ `featured-badge` pulse mais sutil
- ✅ `scroll-margin-top` em `section[id]` para offset do Nav fixo
- ✅ `tabular-nums` em todo dado numérico (LiveClock, stats, build, contact channels)
- ✅ Capabilities mobile: grid de 3 colunas com áreas (não mais imprensado)

### Copy refinado

| Local | Antes | Depois |
|---|---|---|
| Hero tag | "Disponível · Q2 2026" | "Aceitando 2 projetos · Q3 2026" |
| Hero h1 | "Para quem constrói." | "Para quem envia." |
| Hero hud-label 01 | "Missão" | "O que fazemos" |
| Hero hud-label 02 | "Sinal" | "Como entregamos" |
| Hero stack | "Pesquisa & descoberta / ..." | "Diagnóstico 5d / Spike 2sem / Produto 8 / Operação contínua" |
| Hero CTA primário | "Ver capacidades" | "Iniciar projeto" |
| Hero CTA secundário | "ou conversar" | "Ver capacidades" |
| Capabilities title | "O que afiamos." | "O que entregamos." |
| Work hud-label | "Trabalho selecionado" | "Casos · 2024–2026" |
| Work title | "Casos em produção" | "Sistemas em produção" |
| Work-end | "Mais casos sob NDA. Pergunte." | "12 outros sob NDA. Conversamos." |
| Manifesto 3 | "afiados como navalha" | "Decisões assinadas por quem entende" |
| Stats | "Projetos entregues / Clientes ativos / Uptime médio / Anos" | "Sistemas em produção / Times que voltaram / SLA cumprido / Anos de código" + sub-labels |
| Contact h2 | "Vamos / construir / algo." | "Tem / problema / difícil?" |
| Contact hud | "Contato · 2026" | "Briefing · 24h" |
| Contact textarea | "O que você quer afiar?" | "Em uma frase: qual é o problema?" |
| Contact note | "Resposta em até 24h úteis. Briefings sob NDA." | "Resposta em 24h. NDA recíproco no primeiro contato." |
| Footer base | "Software afiado. Para quem constrói." | "Software afiado, em produção." |

### Build

- `npm run build` limpo: 6 páginas estáticas, 0 erros

---

## 2026-05-24 (segunda iteração) — Ajustes pós-feedback

### Manifesto

- Fonte trocada para **JetBrains Mono** (terminal-style) — usuário não gostou do Instrument Serif italic
- Bloco emoldurado com tag "manifesto.txt" + prompts `>` + caret piscante na última linha
- Texto em minúsculas para reforçar a estética de log

### Insights (parcial)

- Adicionado botão **"Ver todos (N)"** ao lado do título
- Novo `AllArticlesModal` lista todos os artigos (depois substituído pela rota real abaixo)

---

## 2026-05-24 (terceira iteração) — Insights vira blog real

### Migração para arquivos Markdown

- **Source of truth**: `content/insights/*.md` com frontmatter (gray-matter)
- Adicionadas deps: `gray-matter@^4`, `marked@^14`
- 11 ensaios seed criados (suficiente para mostrar paginação 9+2)
- `lib/insights.js` — reader server-side: `getAllInsights`, `getInsight`, `getFeaturedInsights`, `getAllTags`, `getInsightSlugs`

### Rotas novas

- `app/insights/page.js` — listagem (server) + `InsightsBrowser.jsx` (client) com busca + filtro de tags + paginação 9/pg
- `app/insights/[slug]/page.js` — SSG via `generateStaticParams`, `generateMetadata` (OG article, twitter, canonical), JSON-LD `Article`, navegação prev/next

### Refatoração

- `components/InsightsManager.jsx` **removido** (todo o sistema admin/login/CRUD/localStorage)
- Novo `components/InsightsSection.jsx` — server component, lê de `lib/insights.js`, 3 destaques com `<Link>` para `/insights/[slug]`
- `app/page.js` agora importa `InsightsSection`
- `components/Nav.jsx` — usa `<Link>`, item "Insights" → `/insights`, demais → `/#anchor` (funcionam de qualquer rota); scroll-spy condicional (`isHome`)
- `app/sitemap.js` — inclui `/insights` + todas as URLs `/insights/[slug]`

### Build

- 18 páginas estáticas geradas (era 6)
- Sitemap automaticamente lista os 11 ensaios
- Zero erros
