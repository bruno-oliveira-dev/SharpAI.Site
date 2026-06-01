# SharpAI Vault

Vault Obsidian para o projeto SharpAI (`C:\Projetos\sharpai-v2`).

## Como abrir

1. Abra o Obsidian
2. **Open folder as vault**
3. Selecione `C:\Projetos\sharpai-v2\docs\sharpai-vault`
4. Comece por [[Home]]

## Estrutura

```
sharpai-vault/
├── .obsidian/                  # config (tema, graph, paths)
├── README.md                   # este arquivo
├── Home.md                     # ⬅ comece aqui
├── 00 — Visão Geral.md
├── 01 — Stack & Setup.md
├── 02 — Design System.md
├── 03 — Páginas e Seções.md
├── 04 — Componentes.md         # índice
├── 05 — Decisões de Arquitetura.md
├── 06 — Performance & A11y.md
├── 07 — SEO & Metadata.md
├── 08 — Sistema de Insights.md
├── 09 — Roadmap & WOW.md
├── 10 — Bugs Conhecidos.md
├── 11 — Convenções.md
├── 12 — Histórico de Refinos.md
└── Componentes/
    ├── Hero.md
    ├── Nav.md
    ├── Capabilities.md
    ├── Work.md
    ├── Manifesto.md
    ├── Contact.md
    ├── Footer.md
    ├── InsightsManager.md
    ├── BrainNetwork.md
    ├── NeuralCanvas.md
    ├── Starfield.md
    ├── CustomCursor.md
    ├── Magnetic.md
    ├── Reveal.md
    ├── SplitText.md
    ├── LiveClock.md
    ├── CountUp.md
    └── Marquee.md
```

## Como manter atualizado

- **Ao adicionar um componente**: crie um `.md` em `Componentes/` + link em [[04 — Componentes]]
- **Ao mudar decisão importante**: anote em [[05 — Decisões de Arquitetura]]
- **Ao corrigir bug**: registre em [[12 — Histórico de Refinos]] e remova de [[10 — Bugs Conhecidos]]
- **Ao adicionar idea**: enfileire em [[09 — Roadmap & WOW]]
