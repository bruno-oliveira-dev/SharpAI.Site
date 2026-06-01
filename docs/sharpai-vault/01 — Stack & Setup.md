---
tags: [stack, setup]
---

# 01 — Stack & Setup

## Dependências

```json
{
  "next": "16.2.6",
  "react": "19.2.4",
  "react-dom": "19.2.4"
}
```

Nada além disso. Sem Tailwind, sem CSS modules, sem libs de animação, sem TypeScript.

## Comandos

```bash
npm run dev      # dev → http://localhost:3000 (Turbopack)
npm run build    # build de produção (Turbopack)
npm run start    # servir build
```

## Estrutura

```
app/
  layout.js          # next/font + metadata + viewport + JSON-LD
  page.js            # composição da home
  globals.css        # 100% do CSS
  robots.js          # robots.txt dinâmico
  sitemap.js         # sitemap.xml dinâmico
components/          # 18 componentes, ver [[04 — Componentes]]
public/
  assets/            # imagens (concepts, logo, symbol)
  manifest.webmanifest
docs/
  sharpai-vault/     # esta vault
```

## Fontes

Carregadas com `next/font/google` — auto-self-hosted, zero CLS, preload otimizado.

```js
import { Space_Grotesk, JetBrains_Mono, Instrument_Serif } from "next/font/google";
```

As variáveis CSS são injetadas no `<html>` via classNames e referenciadas em `globals.css` como `var(--font-display)`, `var(--font-mono)`, `var(--font-serif)`.

## Convenções importantes

- Toda interatividade roda no cliente (`'use client'` no topo do arquivo).
- Nada de mocks ou backends de verdade — `localStorage` para artigos, `mailto:` para o form.
- Imagens em `<img>` cru (sem `next/image`) para preservar `object-fit` sem configurar `images.remotePatterns`.
- Reverso: imagens são pequenas e estáticas. Se isso mudar, migrar para `next/image`.

Ver também [[05 — Decisões de Arquitetura]].
