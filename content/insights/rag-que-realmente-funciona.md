---
title: "RAG que realmente funciona (e como medir)"
excerpt: "Recuperar não é responder. Um guia opinativo sobre estratégias de chunking, reranking e avaliação contínua."
date: 2026-03-28
readTime: 6 min
author: Camila R.
tags: [RAG, Evals, LLMs]
image: /assets/sharpai-concept-2.png
featured: true
---

RAG virou commodity — mas a maioria das implementações para na primeira pergunta capciosa. O motivo é simples: recuperação ruim, contexto pobre, evals inexistentes.

## Seis camadas

1. **Ingestão** — fontes confiáveis primeiro
2. **Chunking** — semântico, não por contagem
3. **Embedding** — modelo afinado ao domínio
4. **Recuperação** — híbrido (vetor + BM25)
5. **Reranking** — cross-encoder no top-k
6. **Geração** — com citações e fallback

## Métrica que importa

> Precision@K medida contra um gold set humano. Sem isso, você está chutando.

Cada camada tem evals próprios. Quando algo regride, você sabe **onde**.
