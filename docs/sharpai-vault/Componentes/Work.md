---
tags: [component, section]
file: components/Work.jsx
---

# Work

6 cards em scroll horizontal com `scroll-snap-type: x mandatory`. Cada card tem ano badge + métrica de impacto.

## Cards

| # | Cliente | Escopo | Ano | Impact |
|---|---|---|---|---|
| 001 | Holding Industrial | Previsão de demanda | 2025 | −38% erro |
| 002 | Fintech | Agente + RAG | 2025 | 4× throughput |
| 003 | Healthtech | Triagem clínica | 2024 | 12ms p99 |
| 004 | Logística | Roteirização tempo real | 2024 | −22% km |
| 005 | Mídia | Sumarização editorial | 2024 | 8× pautas |
| 006 | SaaS B2B | Internal copilot | 2026 | 94% eval |

## Decisões

- **Ano como badge superior direito** = timeline visual durante o swipe horizontal.
- **Métrica de impacto destacada** em laranja + label mono — substitui o "Ano" central por algo que vende.
- Setas de navegação ←/→ com `aria-label`, progress bar visual.
- Cards têm `tabIndex={0}` + aria-label completo.
- `loading="lazy"` + `decoding="async"` nas imagens; `alt` real (não vazio).
- Card final: `12 outros sob NDA. Conversamos.` (substituiu "Pergunte.").

Ver [[Reveal]], [[Magnetic]].
