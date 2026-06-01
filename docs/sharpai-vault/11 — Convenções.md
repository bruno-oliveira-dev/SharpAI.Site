---
tags: [convenções]
---

# 11 — Convenções

## Componentes

- Arquivo `.jsx`, sempre `'use client'` no topo se houver hook.
- Default export como função nomeada (`export default function Hero(){}`).
- Props com default no destructuring (`function Magnetic({ strength = 0.35 })`).
- Listeners removidos em cleanup do `useEffect` — sempre.
- `cancelAnimationFrame` em todo rAF loop.

## Cursor labels

- Todo elemento interativo recebe `data-cursor="<verbo curto>"`.
- Verbos em português, minúsculas, sem hífens (use espaço se precisar de duas palavras).
- Lista canônica em [[CustomCursor]].

## Aria

- Todo botão só-ícone tem `aria-label`.
- Cards clicáveis precisam de `tabIndex={0}` + `role="button"` + `onKeyDown` (`Enter`/`Space`).
- Modais: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (id no h2 do modal).
- Decorativos: `aria-hidden="true"` em SVG, canvas, marquees, símbolos.

## CSS

- Cores via tokens em `var(--*)`; nunca hex direto em componentes.
- Espaçamento via `--space-*` quando possível.
- Raios via `--radius-*`.
- Tipografia via `var(--font-*)`.
- Sem `!important`, exceto em `prefers-reduced-motion` (override de animações).
- Media queries respeitam breakpoints `880px` (tablet/desktop) e `680px` (mobile compacto).

## Acessibilidade — checklist pré-commit

- [ ] Foco visível?
- [ ] Navegação por teclado completa?
- [ ] Contraste de texto ≥ 4.5:1?
- [ ] Animações neutralizadas em reduce-motion?
- [ ] Aria-labels em botões só-ícone?

## Performance — checklist pré-commit

- [ ] Listeners removidos no cleanup?
- [ ] rAF cancelado no cleanup?
- [ ] `passive: true` em listeners de scroll/mousemove quando aplicável?
- [ ] `setState` evitado em loops por pixel?
- [ ] Canvas pausa off-screen?

## Convenções de cópia (copy)

- Português brasileiro consistente.
- Voz: direta, técnica, sem clichês de "IA mudando o mundo".
- Verbos no presente do indicativo, primeira do plural ("entregamos", "construímos").
- HUD labels: SCREAMING UPPERCASE com bracketing onde marca **seção** (ex.: `[ Capacidades ]`); sem bracketing onde marca **campo** (ex.: `Cliente`, `E-mail`).
- Métricas com unidade explícita (`12 ms p99`, não `12 p99`).
