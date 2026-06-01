---
tags: [component, primitivo]
file: components/LiveClock.jsx
---

# LiveClock

Relógio SP. SSR-safe: estado inicial `null` → primeira renderização mostra `--:--:--`, depois `useEffect` set a hora real.

## Formato

`Intl.DateTimeFormat('pt-BR')` com `timeZone: America/Sao_Paulo`, sem AM/PM.

## CSS

`.hud-clock` tem `font-variant-numeric: tabular-nums` + `min-width: 168px` para evitar CLS quando segundos mudam de largura.

## Hidratação

Tag tem `suppressHydrationWarning` porque, mesmo SSR-safe, o `--:--:--` inicial difere do `setInterval` que dispara a primeira hora real (split-second).
