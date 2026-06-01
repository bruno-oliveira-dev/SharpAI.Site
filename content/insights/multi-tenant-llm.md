---
title: "Multi-tenant para LLMs: o que muda quando cada cliente vira contexto"
excerpt: "Isolamento de dados, custo por tenant, rate-limit individual. O playbook que pouca gente compartilha."
date: 2025-12-15
readTime: 8 min
author: Marcus L.
tags: [Arquitetura, LLMs, Multi-tenant]
image: /assets/sharpai-concept-1.png
---

Multi-tenant tradicional resolve com row-level security. Multi-tenant em LLM exige pensar em **embeddings, contextos, custos e governança** por tenant.

## Quatro perguntas obrigatórias

1. **Isolamento de dados** — vector store por tenant ou compartilhado com namespace?
2. **Custo por tenant** — quem está queimando token?
3. **Rate-limit individual** — um cliente não pode degradar os outros
4. **Fine-tune por tenant** — vale o custo de manutenção?

## Pattern recomendado

- **Pinecone/Qdrant** com namespace por tenant
- **Tabela de spend** atualizada por webhook do provedor LLM
- **Bucket de rate-limit** por tenant via Redis
- **Fine-tune** só para tier enterprise (>R$ 30k/mês)

## Armadilha

Não compartilhe embedding model entre tenants se houver risco regulatório. Embeddings podem vazar conceitos do corpus de treino.
