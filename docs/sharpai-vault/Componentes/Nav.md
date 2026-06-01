---
tags: [component, section]
file: components/Nav.jsx
---

# Nav

Header fixo. Scroll-spy via IntersectionObserver marca `aria-current="true"` na seção visível (rootMargin `-30% 0% -50% 0%`).

## Mobile

- Hamburger animado (3 barras → X) acima de 880px desaparece, abaixo aparece.
- Painel mobile cobre da Nav até o rodapé com `transform: translateY(-100%)` e fade.
- ESC fecha; lock de scroll quando aberto.
- `aria-expanded`, `aria-controls`, `aria-current`, `tabIndex={open ? 0 : -1}` em todos links.

## Itens

`Início · Capacidades · Trabalho · Manifesto · Insights · Contato` (6) — Nav desktop mostra os 5 primeiros; mobile mostra todos.

## CTA

"Iniciar projeto" com [[Magnetic]] (`strength=0.25`) → `#contato`. Escondido em mobile (substituído pelo painel).

## Aria

- `<header className="nav">` + `<nav aria-label="Navegação principal">`
- Logo com `aria-label="SharpAI · ir para o topo"`
- Painel mobile: `aria-hidden` quando fechado

Ver [[LiveClock]], [[Magnetic]].
