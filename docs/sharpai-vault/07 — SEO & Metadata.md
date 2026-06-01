---
tags: [seo, metadata]
---

# 07 — SEO & Metadata

## Implementado

- `metadataBase: new URL('https://sharpai.com.br')` em `app/layout.js`
- `title` com template `%s · SharpAI`
- `description` com voz autoral
- `keywords`, `authors`, `creator`, `publisher`
- `alternates.canonical: '/'`
- **Open Graph** completo (type, locale `pt_BR`, url, siteName, title, description, images)
- **Twitter card** (`summary_large_image`)
- **Robots**: `index: true, follow: true, googleBot.max-image-preview: 'large'`
- `icons`: aponta para `/assets/sharpai-symbol.png`
- `manifest: '/manifest.webmanifest'`
- **Viewport** export separado (Next 16): `themeColor`, `colorScheme: 'dark'`, `viewportFit: 'cover'`
- **JSON-LD `Organization`** injetado via `<script type="application/ld+json">` no `<body>`
- `app/robots.js` → gera `/robots.txt` apontando para o sitemap
- `app/sitemap.js` → gera `/sitemap.xml` com as 6 seções
- `public/manifest.webmanifest` — PWA-ready

## Verificado no build

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /robots.txt
└ ○ /sitemap.xml
```

## Backlog

- `app/opengraph-image.js` com `next/og` para gerar OG image dinâmica
- Páginas `/insights/[slug]` para indexar ensaios individualmente
- Páginas `/case/[slug]` para indexar casos
- Sitemap por categoria (cases, insights)
- Hreflang quando entrar i18n
