---
title: "O custo invisível: LLM em escala vira contabilidade"
excerpt: "Quando o produto cresce, o custo de inferência sai da planilha de tecnologia e entra na de margem. Estratégias para não morrer pelo token."
date: 2026-01-10
readTime: 7 min
author: Time SharpAI
tags: [LLMs, Custo, Arquitetura]
image: /assets/sharpai-concept-2.png
---

Três meses depois do lançamento, alguém na empresa pergunta: "por que estamos gastando R$ 80k/mês em OpenAI?". Esse é o momento da verdade.

## Onde o dinheiro vaza

- **Retry agressivo** sem backoff
- **Contexto crescente** sem janela de sumarização
- **Modelo errado** para a tarefa
- **Cache ausente** em respostas determinísticas
- **Embedding recalculado** em cada query

## Caixa de ferramentas

1. **Cache semântico** (hit-rate típico 30-60%)
2. **Roteamento de modelo** (pequeno → fronteira só se necessário)
3. **Prompt compression** (LLMLingua reduz 50%+)
4. **Self-hosted** para tarefas frequentes
5. **Budget por usuário** com degradação graceful

> Inferência sem orçamento é como AWS sem cost explorer. Só descobre quando dói.
