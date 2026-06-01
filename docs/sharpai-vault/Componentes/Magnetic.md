---
tags: [component, primitivo]
file: components/Magnetic.jsx
---

# Magnetic

Wrapper que aplica "magnet pull" no filho — segue o mouse com `strength` configurável e lerp 0.18.

```jsx
<Magnetic strength={0.25}>
  <a className="btn-primary">CTA</a>
</Magnetic>
```

## Implementação

- rAF loop só roda quando o mouse entra no node
- Bypass em `(hover: none), (pointer: coarse)` e `prefers-reduced-motion`
- `transform` escrito direto em `style` (zero re-render)
- `as` prop permite trocar `span` por outra tag se necessário
