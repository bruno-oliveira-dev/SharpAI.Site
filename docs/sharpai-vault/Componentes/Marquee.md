---
tags: [component, primitivo]
file: components/Marquee.jsx
---

# Marquee

CSS-only marquee. Items duplicados 3× para loop contínuo via `translateX(-33.33%)`.

```jsx
<Marquee items={[...]} speed={42} separator="✦" />
```

## Implementação

- Animação CSS `marquee-l` ou `marquee-r` (linear, `${speed}s infinite`)
- `aria-hidden="true"` (decorativo)
- `React.memo` para evitar re-render quando parent atualiza

## Usado em

- [[Hero]] (banda inferior `speed=42`, separator `✦`)
- [[Contact]] (banda inferior `speed=28`, separator `◆`)

## Reduce-motion

Animação neutralizada globalmente via `globals.css @media (prefers-reduced-motion)`.
