---
tags: [component, primitivo]
file: components/SplitText.jsx
---

# SplitText

Quebra o `text` em `<span>` por caractere com `transitionDelay` escalonado (`stagger=22ms` default + `delay` inicial).

## A11y

- `aria-label={text}` no wrapper
- Cada char `aria-hidden="true"` (screen reader lê o label, não os fragmentos)

## Reduce-motion

Setvisible inicial direto (sem stagger, sem observer).

## Uso típico

```jsx
<span className="hero-line">
  <SplitText text="afiado." className="t-accent" delay={250} />
</span>
```
