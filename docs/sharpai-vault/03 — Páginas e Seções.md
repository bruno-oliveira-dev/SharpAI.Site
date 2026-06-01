---
tags: [page, seções, narrativa]
---

# 03 — Páginas e Seções

## Ordem narrativa

1. [[Hero]] — atitude + promessa específica
2. [[Capabilities]] — 5 frentes
3. [[Work]] — sistemas em produção (com métrica de impacto por caso)
4. [[Manifesto]] — voz autoral + stats
5. [[InsightsSection]] — autoridade editorial (3 destaques; lista completa em `/insights`)
6. [[Contact]] — conversão
7. [[Footer]] — fechamento

## Rotas e anchors

- `/` — home com anchors `#inicio` · `#capacidades` · `#trabalho` · `#manifesto` · `#insights` · `#contato`
- `/insights` — blog (listagem com busca/tags/paginação)
- `/insights/[slug]` — página do ensaio

No Nav, o item "Insights" agora é uma **rota real** (`/insights`); os demais são âncoras `/#anchor` (funcionam de qualquer rota). Scroll-spy só ativa quando `pathname === '/'`.

Compensação por `--nav-h` via `scroll-margin-top` em todas as `section[id]`.

## Por que essa ordem

- O **Hero abre com promessa**, não com manifesto. Manifesto enterrado entre Work e Insights ainda faz sentido — Work atua como ponte (de "vendemos" para "acreditamos"), enriquecendo a leitura do manifesto que vem em seguida.
- **Capabilities antes do Work** ancora vocabulário (RAG, agentes, evals) antes de mostrar os casos.
- **Insights antes do Contact** estabelece autoridade técnica imediatamente antes da CTA.
- **CTA primária do Hero leva ao Contato**, ghost leva ao Capabilities (oposto do que estava antes do refino).

## Conexões

- Nav fixo com scroll-spy → marca `aria-current="true"` na seção visível.
- Marquees em Hero e Contact criam "pulso" no início e no fim.
- Brain Network só no Hero (futuro: persistir como background fixo — ver [[09 — Roadmap & WOW]] item WOW #2).
