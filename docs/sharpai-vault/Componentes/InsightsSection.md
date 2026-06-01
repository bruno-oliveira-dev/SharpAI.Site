---
tags: [component, section]
file: components/InsightsSection.jsx
---

# InsightsSection

**Server component** (sem `'use client'`). Renderiza 3 destaques na home, vindos de `lib/insights.js`.

## Comportamento

- Lê `getFeaturedInsights(3)` no servidor (em build time)
- Lê `getAllInsights().length` para mostrar contagem no botão "Ver todos"
- Cada card é um `<Link href="/insights/<slug>">` (navegação real, não modal)
- Botão "Ver todos (N)" leva para `/insights`

## Substitui

O antigo `InsightsManager.jsx` (sistema admin/CRUD/modal/localStorage) foi removido. Tudo que tinha CRUD vive agora em arquivos `.md` versionados.

Ver [[08 — Sistema de Insights]] para a arquitetura completa.
