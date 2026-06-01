---
tags: [performance, a11y]
---

# 06 — Performance & A11y

## Performance — o que foi feito

| Item | Status |
|---|---|
| Canvases pausam off-screen via `IntersectionObserver` | ✅ |
| Canvases pausam em `document.hidden` (aba inativa) | ✅ |
| Hero canvas density reduzido (Star 260→180, Neural 110→80, Brain 170→150) | ✅ |
| Brain accent gradient: era `createRadialGradient` por frame, agora 2 arcs empilhados | ✅ |
| Capabilities preview: ref + rAF (era setState por pixel) | ✅ |
| Mouse listeners `passive: true` quando possível | ✅ |
| Marquee memoizado (`React.memo`) | ✅ |
| `loading="lazy"` + `decoding="async"` em todas as `<img>` | ✅ |
| `next/font/google` com auto-self-hosting (zero CLS) | ✅ |
| `font-variant-numeric: tabular-nums` em todo dado numérico | ✅ |
| `min-width` em LiveClock | ✅ |
| Build number: SSR-safe (sem hydration warning) | ✅ |
| Grain opacity reduzida 0.05 → 0.035 | ✅ |

## Performance — backlog

- NeuralCanvas spatial hash grid (O(n²) → O(n))
- Hero com canvas único WebGL (unifica Star + Neural + Brain) — ver [[09 — Roadmap & WOW]]
- Migração para `next/image` quando entrar imagens dinâmicas

## A11y — o que foi feito

| Item | Status |
|---|---|
| Skip link `Pular para o conteúdo` | ✅ |
| `:focus-visible` global (outline ciano 2px) | ✅ |
| `prefers-reduced-motion` neutraliza canvases, marquees, transitions | ✅ |
| `prefers-contrast: more` reforça `--muted` e `--border` | ✅ |
| `aria-current` em nav (scroll-spy) | ✅ |
| `aria-expanded` + `aria-controls` no hamburger | ✅ |
| `role="dialog"` + `aria-modal` + `aria-labelledby` em modais | ✅ |
| **Focus trap** customizado em modais (Tab/Shift+Tab) | ✅ |
| Restore focus ao fechar modal | ✅ |
| `aria-label` em botões só-ícone (✕, ←, →, ★) | ✅ |
| Cards clicáveis com `tabIndex` + `role="button"` + `onKeyDown Enter/Space` | ✅ |
| `aria-hidden="true"` em SVG decorativos | ✅ |
| `aria-label` em SplitText (lê o text completo, não os chars) | ✅ |
| Contraste `--muted` 4.0:1 → ~5.5:1 (#6A6A75 → #8A8A95) | ✅ |
| `confirm()` nativo substituído por modal a11y | ✅ |
| Form com validação inline + `role="alert"`/`role="status"` | ✅ |
| `autoComplete` em inputs (`name`, `email`, `current-password`) | ✅ |
| Senha admin não mais exposta na tela | ✅ |
| Print styles | ✅ |

## A11y — backlog

- Auditoria com axe-core (rodar localmente)
- Testar com leitor de tela real (NVDA / VoiceOver)
- Lighthouse score completo
