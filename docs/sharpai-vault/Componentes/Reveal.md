---
tags: [component, primitivo]
file: components/Reveal.jsx
---

# Reveal

Aplica `is-visible` quando entra no viewport (threshold 0.05, rootMargin `-10%`). Suporta `delay` (ms) via CSS var `--reveal-delay`.

## Comportamento

- **Reduce-motion**: retorna visível imediatamente (sem observer, sem timer)
- **Já no viewport**: timer de fallback 80ms
- **Não no viewport**: aguarda IntersectionObserver
- Após visível → `obs.disconnect()` (one-shot)

## Polimorfismo

`as` prop muda a tag de saída (default `div`). Útil em `<Reveal as="h2" className="section-title">...</Reveal>`.
