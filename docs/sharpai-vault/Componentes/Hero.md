---
tags: [component, section]
file: components/Hero.jsx
---

# Hero

Viewport completo. Combina **Starfield (180)** + **NeuralCanvas (80)** + **BrainNetwork (150)** em camadas.

## Estrutura

- `.hero-tag` — chip "Aceitando 2 projetos · Q3 2026" (escassez real, não "disponível")
- `.hero-title` — h1 com 3 linhas via [[SplitText]]: `Software / afiado. / Para quem envia.`
- `.hero-meta` — duas colunas: missão + processo numerado (5d / 2sem / 8sem / contínuo)
- `.hero-cta` — primário **Iniciar projeto** (→ #contato) + ghost **Ver capacidades**
- `.hero-side` — painel HUD direito com **Build log live** rotativo (6 entradas, 5.2s intervalo)
- `.hero-scroll` — indicador de scroll com pulso vertical
- `.hero-marquee` — banda inferior

## Decisões

- **Densidade reduzida**: NeuralCanvas baixou de 110 → 80; Starfield 260 → 180; BrainNetwork 170 → 150. Reduz CPU em mobile sem perder leitura visual.
- **Side feed real**: substituiu o painel LAT/LNG/STATUS estático por commits rotativos — "ON, agora" → ver WOW #1 em [[09 — Roadmap & WOW]].
- **CTA invertida**: primário converte, ghost navega.

## Copy refinado

| Antes | Depois |
|---|---|
| `Disponível · Q2 2026` | `Aceitando 2 projetos · Q3 2026` |
| `Para quem constrói.` | `Para quem envia.` |
| `[ 01 / Missão ]` | `[ 01 / O que fazemos ]` |
| `Pesquisa & descoberta...` | `Diagnóstico em 5 dias / Spike em 2sem / Produto em 8 / Operação contínua` |

Ver [[Capabilities]], [[Marquee]], [[NeuralCanvas]], [[Starfield]], [[BrainNetwork]], [[SplitText]], [[Magnetic]].
