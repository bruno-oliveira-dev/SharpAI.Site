---
tags: [component, canvas]
file: components/Starfield.jsx
---

# Starfield

Estrelas com twinkle sinusoidal. 7% delas são "accent" (laranja com glow quando alpha alto).

## Performance

- Default `count=220`
- No Hero foi reduzido para **180** (junto com BrainNetwork 150 + Neural 80, total ~410 partículas vs 540 anterior)
- Pause off-screen + hidden + reduce-motion (todas como em [[NeuralCanvas]] e [[BrainNetwork]])

## Cores

- Estrelas padrão: `rgba(180,200,220,α)` com α animado
- Accent: `rgba(255,107,0,α*0.9)` + halo `rgba(255,107,0,0.06)` quando twinkle > 0.7
