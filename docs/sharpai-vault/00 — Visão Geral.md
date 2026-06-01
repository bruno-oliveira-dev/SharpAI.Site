---
tags: [overview]
---

# 00 — Visão Geral

## O que é

Site institucional do estúdio brasileiro **SharpAI** — engenharia de IA e automação. Single-page application em Next.js 16 (App Router) com estética HUD/cockpit dark.

## Promessa de marca

> Software afiado. Para quem envia.

- Engenharia de IA para times que medem deploy, não tese
- Sistemas em produção, não slides
- Spike funcional em 2 semanas, produto em 8

## Paleta

- **`--bg`** `#08080A` — fundo principal
- **`--accent`** `#FF6B00` — laranja "switch on"
- **`--volt`** `#00E5FF` — ciano de sinal
- **`--fg`** `#F2F2F4` — texto primário
- **`--muted`** `#8A8A95` — texto secundário (AA-compliant)

## Tipografia

- **Space Grotesk** (display + body) — 300–700
- **JetBrains Mono** (HUD/labels/numéricos) — 400–600
- **Instrument Serif** (editorial, manifesto, títulos de ensaio) — 400 + italic

Carregado via `next/font/google` em [[01 — Stack & Setup]].

## Estrutura narrativa

`Hero → Capabilities → Work → Manifesto → Insights → Contact → Footer`

Ver [[03 — Páginas e Seções]] para a justificativa da ordem.

## Links

- Código: `C:\Projetos\sharpai-v2`
- Servidor dev: `npm run dev` → `http://localhost:3000`
- Build: `npm run build`
- Senha admin Insights: `sharp2026` (revelar botão com a sequência de teclas `dev`)
