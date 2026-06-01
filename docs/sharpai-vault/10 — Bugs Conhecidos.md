---
tags: [bugs, debt]
---

# 10 — Bugs Conhecidos

Tudo abaixo é débito assumido, não regressão. Itens "corrigidos" estão no histórico em [[12 — Histórico de Refinos]].

## Aberto

| # | Item | Severidade | Local |
|---|---|---|---|
| B1 | NeuralCanvas O(n²) para conexões (~20k ops/frame em n=200) | média | `components/NeuralCanvas.jsx` |
| B2 | 3 canvases simultâneos no Hero — em mobile baixo, desativar Brain explicitamente via JS | média | `components/Hero.jsx` |
| B3 | Botão "Restaurar seed" no admin não pede confirmação | baixa | `components/InsightsManager.jsx` |
| B4 | LiveClock instanciado 2× (Nav + Contact + mobile panel) → 2 setIntervals | baixa | `components/LiveClock.jsx` |
| B5 | Magic numbers em vários componentes (lerp 0.18, breath 0.012, etc) | baixa | múltiplos |
| B6 | InsightsManager.jsx monolítico (~480 linhas) — quebrar em pasta `Insights/` | baixa | `components/InsightsManager.jsx` |
| B7 | Slug regex usa `[̀-ͯ]` literal — funciona mas dependeria de encoding correto. Considerar `[̀-ͯ]` literal | baixa | `components/InsightsManager.jsx` |
| B8 | Hero scroll indicator pode sobrepor hero-marquee em viewports curtos (~720px) | baixa | `app/globals.css` |
| B9 | `featured-badge.sm` herda `position: absolute` parents quando `position: static` aplicado — verificar em todos contextos | trivial | `app/globals.css` |
| B10 | Sem `loading.js` / `error.js` em `app/` — UX em falhas é padrão Next | baixa | `app/` |
| B11 | Admin trigger sequência `dev` não funciona se foco estiver em input/textarea — by design, mas pode confundir | by-design | `components/InsightsManager.jsx` |
| B12 | `dev` revela botão na sessão atual; reload reseta. Salvar em sessionStorage? — by-design | by-design | idem |

## Decisões de não-fix

- **Footer links `#contato` para Legal**: aceito como placeholder até existirem páginas reais.
- **Localização opcional**: site é pt-BR fixo; i18n só entra se houver demanda.
- **`<img>` em vez de `<Image>`**: trade-off documentado em [[05 — Decisões de Arquitetura]].
