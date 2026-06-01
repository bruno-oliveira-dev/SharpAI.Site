---
tags: [roadmap, wow]
---

# 09 — Roadmap & WOW

> Ideias priorizadas por impacto × custo. Mantenha como backlog vivo.

## Próximo sprint (P0 — alto impacto, baixo custo)

1. **OG image dinâmica** com `next/og` (`app/opengraph-image.js`)
2. **`scroll-padding-top`** ajustado dinamicamente via media query (não só margin)
3. **Real lightbox para imagens** de capa de Work (clique amplia)
4. **Stagger Reveal** nas linhas do Manifesto sob Reveal por linha (Char-level)

## Médio prazo (P1)

5. **`/case/[slug]`** — página dedicada de cada case com scrollytelling + métrica before/after
6. **Insights → MDX** server-rendered (`app/insights/[slug]/page.mdx`)
7. **Scroll-driven CSS** (`animation-timeline: view()`) — Hero title comprime ao rolar
8. **Marquee reativo ao scroll** — acelera/inverte conforme direção e velocidade
9. **Light mode** opcional (papel + grafite + accent intacto)
10. **`/404`** com Brain Network "quebrado" (nós desconectando-se)
11. **PT/EN toggle** no Nav

## Longo prazo (P2)

12. **WebGL Hero unificado** — substitui os 3 canvases por um shader único (Star + Neural + Brain em um draw call); ganho de 10× em performance, look mais coeso
13. **Som ambiente** opcional (drone synth low) + click/woosh na navegação; toggle no Footer
14. **Telemetria real** — `navigator.geolocation` opt-in OU IP-based SSR mostrando que o site "vê" o visitante
15. **MDX para casos** com diagramas Mermaid embutidos

## WOW (alto risco, alto retorno) — top 3

### WOW #1 — Live Build Log (✅ MVP feito)
O painel HUD lateral do Hero agora rotaciona 6 entradas mock de commits/deploys. Próxima evolução: puxar de um endpoint real (mesmo que mocked Edge function) com cache 5min — "sempre em produção, agora, neste segundo".

### WOW #2 — Brain Network persistente reativo a seção
Tornar o `BrainNetwork` um background fixo em todas as seções, com `IntersectionObserver` mudando seu **modo de operação** conforme seção ativa:
- Hero: pulso completo
- Capabilities: 5 nós pulsantes (= 5 frentes)
- Work: padrão tipo rede neural "alimentando saídas"
- Manifesto: silhueta minimalista
- Contact: pulso engajado

### WOW #3 — Konami / `dev` reveals "DEV MODE"
Hoje `dev` revela o botão Admin. Evoluir para um **modo "DEV"** que sobrepõe o site com:
- Bounding boxes em cada componente
- Labels (nome, render time, partículas, FPS)
- Sidebar com `package.json` real
- Versões de Next/React em tempo real
- Console interativo aceitando `help`, `stack`, `clients`, `contact`

Por quê: prova técnica. CTOs/leads vão capturar tela e compartilhar.

## Backlog técnico (pequenos)

- ESLint + Prettier configurados (`npm run lint` ausente hoje)
- Vitest/Playwright para smoke tests
- Lighthouse CI no pipeline
- `axe-core` integrado nos testes
- Editor `tsconfig.json` + verificar warning de TS no build (atualmente 94ms running TS sem TS — meta)
