---
tags: [design-system, tokens]
---

# 02 — Design System

Todos os tokens vivem em `:root` no `app/globals.css`. Não duplicar valores fora do `:root`.

## Cores

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#08080A` | fundo principal |
| `--bg-2` | `#0F0F12` | superfícies (cards, modals) |
| `--bg-3` | `#15151A` | superfícies elevadas |
| `--fg` | `#F2F2F4` | texto primário |
| `--muted` | `#8A8A95` | texto secundário (4.5+ contraste) |
| `--faint` | `rgba(255,255,255,0.4)` | overlays raros |
| `--border` | `rgba(255,255,255,0.07)` | divisões sutis |
| `--border-strong` | `rgba(255,255,255,0.14)` | divisões enfáticas |
| `--accent` | `#FF6B00` | laranja — CTA, estado ativo, destaques |
| `--accent-dim` | `#B84F00` | hover dim (uso restrito) |
| `--volt` | `#00E5FF` | ciano — sinal, focus ring, link-secundário |
| `--volt-dim` | `#007D8C` | volt dim |
| `--danger` | `#FF3D5A` | erros, ações destrutivas |

## Escala de espaçamento

`--space-1` 8 · `--space-2` 16 · `--space-3` 24 · `--space-4` 32 · `--space-5` 48 · `--space-6` 64 · `--space-7` 96 · `--space-8` 140

## Raios

`--radius-sm` 4 · `--radius-md` 8 · `--radius-lg` 12 · `--radius-pill` 999

- `sm` → botões, inputs, code blocks
- `md` → cards (work, insights)
- `lg` → modals (article, admin, login)
- `pill` → tags, badges, switches, CTAs ghost

## Easing

- `--ease-out` `cubic-bezier(0.22, 1, 0.36, 1)` — entrada padrão
- `--ease-in-out` `cubic-bezier(0.65, 0, 0.35, 1)` — toggles, magnetic

## Z-index

`--z-nav` 100 · `--z-modal` 200 · `--z-overlay` 9997 · `--z-grain` 9998 · `--z-cursor` 10000

## Tipografia

Variáveis: `--font-display`, `--font-mono`, `--font-serif`, `--font-body` (alias de display).

- **Display/body**: Space Grotesk — `letter-spacing: -0.02em` em títulos grandes
- **Mono**: JetBrains Mono — `letter-spacing: 0.18em–0.22em`, `text-transform: uppercase` em labels
- **Serif**: Instrument Serif — italic para manifesto, ensaios e títulos de insight

Padronizar `font-variant-numeric: tabular-nums` em todo dado numérico que oscila (`hud-mono`, `stat-num`, `work-card-impact`).

## Componentes-tipo

- **Botão primário**: `.btn-primary` (slide-up overlay em hover)
- **Botão ghost**: `.btn-ghost` (sublinhado animado)
- **Botão small**: `.btn-ghost-sm` (pill)
- **Tag**: pill `1px` border, mono 10–11px uppercase `0.18em` tracking
- **HUD label**: mono 10px `0.22em` tracking, `muted`
- **HUD dot**: `--volt` 6px com glow e pulse
- **Pulse**: `--accent` 7px com glow e pulse mais lento

## A11y

- `:focus-visible` global → outline ciano de 2px com 4px offset
- `prefers-reduced-motion` neutraliza animações e canvases
- `prefers-contrast: more` reforça `--muted` e `--border`
- `@media print` esconde grain, cursor, canvas, nav

Ver [[06 — Performance & A11y]].
