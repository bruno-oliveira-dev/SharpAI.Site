---
tags: [component, canvas]
file: components/NeuralCanvas.jsx
---

# NeuralCanvas

Rede de partículas com conexões por proximidade. Mouse atrai partículas dentro de raio (d² < 22000) e emite aura radial laranja.

## Parâmetros

- `density` — base de partículas; é somado a `floor(w*h / 18000)` (subiu de `/14000`, partícula a mais por área)
- `accent` — `#FF6B00` (cor de partículas accent — 18% do total)
- 18% das partículas são "accent" (laranja com glow); resto cinza-azulado
- Linhas: laranja se qualquer ponta for accent; senão ciano dim
- Atrito: `vx *= 0.985` por frame

## Otimizações aplicadas

- Pause off-screen (IntersectionObserver)
- Pause em `document.hidden`
- Respeita `prefers-reduced-motion`
- Mouse listener `passive: true`

## Próximo nível

O loop O(n²) para conexões custa ~20k operações/frame com n=200. Para melhorar: spatial hash grid (próximo refactor — ver [[10 — Bugs Conhecidos]] e [[09 — Roadmap & WOW]]).
