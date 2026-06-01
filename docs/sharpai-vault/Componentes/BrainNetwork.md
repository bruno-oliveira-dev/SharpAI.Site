---
tags: [component, canvas]
file: components/BrainNetwork.jsx
---

# BrainNetwork

Canvas de partículas em formato de cérebro com S-curve de nós accent.

## Algoritmo

1. **Máscara `inBrain(nx, ny)`** — elipse normalizada `(1.05, 1.25)` com cortes para "garganta" e "fenda central"
2. **Distribuição** — rejection sampling com viés para centro
3. **S-curve waypoints** — 10 pontos pré-definidos marcam os nós accent (laranja, maiores)
4. **Links** — conecta pares com `d² < 0.035` (squared distance normalizada)
5. **Breathing** — `breath = 1 + sin(t*0.6) * 0.012` aplicado ao raio de projeção
6. **Mouse parallax** — accent nodes movem 18px, regulares 8px

## Otimizações

- Pause via `IntersectionObserver` (não desenha fora do viewport)
- Pause via `document.hidden` (aba inativa)
- Respeita `prefers-reduced-motion` (return early)
- `mousemove` passive
- Removido `createRadialGradient` por nó-frame (era caro); substituído por dois `arc` empilhados.

## Densidade

- Default: 160
- Usado no Hero com `density=150`

Ver [[NeuralCanvas]], [[Starfield]].
