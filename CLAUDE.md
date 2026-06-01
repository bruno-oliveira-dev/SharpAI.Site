@AGENTS.md

# SharpAI Site

Marketing site for SharpAI — a Brazilian AI & engineering studio. Dark HUD aesthetic with orange (#FF6B00) + cyan (#00E5FF) accent system.

## Commands

```bash
npm run dev      # dev server → http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## Stack

- **Next.js 16** — App Router, JavaScript only (no TypeScript)
- **React 19** — interactive components use `'use client'`; InsightsSection/Article pages são **server components**
- **CSS** — single `app/globals.css` with CSS custom properties; no Tailwind, no CSS modules
- **Deps de blog**: `gray-matter`, `marked`
- **No external UI libraries** — animations and effects are hand-coded

## Project structure

```
app/
  layout.js       # next/font + metadata + viewport + JSON-LD Organization
  page.js         # home composition
  globals.css     # 100% do CSS
  robots.js       # robots.txt dinâmico
  sitemap.js     # sitemap.xml (inclui /insights e cada artigo)
  insights/
    page.js              # listagem (server)
    InsightsBrowser.jsx  # client: busca + filtro de tags + paginação 9/pg
    [slug]/
      page.js            # SSG + generateStaticParams + JSON-LD Article
components/
  CustomCursor.jsx, Magnetic.jsx, Reveal.jsx, SplitText.jsx
  LiveClock.jsx, CountUp.jsx, Marquee.jsx
  NeuralCanvas.jsx, Starfield.jsx, BrainNetwork.jsx
  Nav.jsx, Hero.jsx, Capabilities.jsx, Work.jsx
  Manifesto.jsx, InsightsSection.jsx, Contact.jsx, Footer.jsx
lib/
  insights.js     # reader server-side (gray-matter + marked)
content/
  insights/
    *.md          # source of truth dos ensaios (frontmatter + corpo md)
public/
  assets/         # imagens
  manifest.webmanifest
```

## Page section order

`Hero → Capabilities → Work → Manifesto → InsightsManager → Contact` (then `Footer`)

Section anchors: `#inicio`, `#capacidades`, `#trabalho`, `#manifesto`, `#insights`, `#contato`

## Design tokens (globals.css)

```css
--bg: #08080A          /* page background */
--bg-2: #0F0F12        /* card/panel background */
--bg-3: #15151A        /* elevated surfaces */
--border: rgba(255,255,255,0.07)
--border-strong: rgba(255,255,255,0.14)
--fg: #F2F2F4
--muted: #6A6A75
--accent: #FF6B00      /* orange */
--volt: #00E5FF        /* cyan */
--font-display: "Space Grotesk"
--font-mono: "JetBrains Mono"
--font-serif: "Instrument Serif"
```

Google Fonts loaded: Space Grotesk (300–700), JetBrains Mono (400–600), Instrument Serif (italic variants).

## Components

### Utility / animation primitives

| Component | Description |
|---|---|
| `CustomCursor` | rAF loop, lerped ring (0.18 factor), 2.6× scale on hover, reads `[data-cursor]` attribute for label |
| `Magnetic` | rAF magnetic pull toward mouse within parent bounds, 0.18 lerp |
| `Reveal` | IntersectionObserver (threshold 0.05, rootMargin `-10%`), adds `is-visible` class; `delay` prop sets `--reveal-delay` CSS var; polymorphic `as` prop |
| `SplitText` | Splits text into `<span>` chars with staggered `transitionDelay`, reveals on intersection |
| `LiveClock` | SSR-safe (null initial state), updates every 1s, `Intl.DateTimeFormat` for `America/Sao_Paulo` |
| `CountUp` | IntersectionObserver triggers cubic-ease animation 0→`to` |
| `Marquee` | Duplicates items 3×, CSS `marquee-l`/`marquee-r` keyframe, `speed` prop controls duration |

### Canvas / visual

| Component | Description |
|---|---|
| `NeuralCanvas` | Particle network: mouse attraction (22000px² threshold), 18% orange accent particles, cyan connection lines, radial mouse aura, DPR-aware |
| `Starfield` | Twinkling stars with sinusoidal alpha, 7% orange accent stars |
| `BrainNetwork` | Brain-silhouette mask via ellipse math, S-curve accent nodes, node links by proximity (D²=0.035), breathing animation + mouse parallax |

### Sections

| Component | Description |
|---|---|
| `Nav` | Fixed header: orange square logo "S" + "Sharp*AI*", 5 nav links, LiveClock, magnetic "Iniciar projeto" CTA |
| `Hero` | Full-viewport: Starfield (260 stars) + NeuralCanvas + BrainNetwork (170 density), SplitText titles, HUD meta panel, CTA buttons, LAT/LNG/STATUS side panel, scroll hint, Marquee band |
| `Capabilities` | 5 capability rows with mouse-follow floating preview panel. Items: `.NET & Plataformas`, `Engenharia de IA`, `Agentes & Automação`, `Integrações & Data`, `Interfaces 3D & WebGL` |
| `Work` | Horizontal scroll track (scroll-snap), 6 cards with `/assets/` images, progress bar, prev/next arrows. Cases: Holding Industrial, Fintech, Healthtech, Logística, Mídia, SaaS B2B |
| `Manifesto` | 3 Reveal-animated paragraphs + 4-column CountUp stats: 40+, 12, 98%, 3 |
| `InsightsSection` | 3 destaques (server component); cards são `<Link>` para `/insights/[slug]` |
| `Contact` | Mouse-tilt parallax mega typography, contact form, channels list, Marquee band |
| `Footer` | Brand logo, 3-column links (Empresa / Social / Legal), build number |

## Insights / Blog (server-rendered, arquivos Markdown)

**Source of truth**: `content/insights/<slug>.md` com frontmatter (title, excerpt, date, readTime, author, tags, image, featured).

**Reader**: `lib/insights.js` (server-side) — `getAllInsights`, `getInsight(slug)`, `getFeaturedInsights(limit)`, `getAllTags`, `getInsightSlugs`.

**Rotas**:
- `/` — `InsightsSection` (server component) mostra 3 destaques
- `/insights` — listagem com **busca + filtro por tags + paginação** (9 por página)
- `/insights/[slug]` — SSG via `generateStaticParams`, `generateMetadata` com OG type article + canonical, JSON-LD `Article`, prev/next

**Markdown engine**: `marked@^14` (server-side parse). Frontmatter via `gray-matter@^4`.

**Adicionar artigo**: criar `content/insights/<slug>.md` com frontmatter → `npm run build` regenera tudo (rota, sitemap, listagem).

## Architecture decisions

- All components are client components (`'use client'`) — animations require browser APIs (rAF, IntersectionObserver, canvas, localStorage).
- `img` tags used instead of Next.js `<Image>` in Work and InsightsManager to preserve CSS `object-fit` without next.config setup.
- No external animation libraries — all effects are vanilla JS inside `useEffect`/`useRef`.
- No TypeScript — plain JavaScript throughout.
- Single CSS file (`globals.css`) for all styles — no CSS modules or scoping.

## CSS animations defined in globals.css

`grain`, `scanlines`, `marquee-l`, `marquee-r`, `pulse`, `scroll-line`, `square-pulse`, `slide`, `featured-pulse`, `shake`
