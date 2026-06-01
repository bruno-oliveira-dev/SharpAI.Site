---
tags: [component, primitivo]
file: components/CountUp.jsx
---

# CountUp

Anima `0 → to` com easing cubic-out quando entra no viewport (threshold 0.4).

## Props

- `to` — valor final (number)
- `suffix` — ex. `'+'`, `'%'`
- `duration` — ms (default 1400)
- `decimals` — casas decimais (ex. `1` para 99.8%)

## Reduce-motion

Set imediato no valor final. Sem flash de "0" inicial.

## Estado inicial

Inicia em `to` (não em `0`) para evitar pop-in antes do observer disparar. Só zera no `useEffect` se reduce-motion estiver off.

Usado em [[Manifesto]] nos 4 stats.
