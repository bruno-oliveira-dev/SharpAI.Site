---
title: "Observabilidade de IA: o que logar (e o que não logar)"
excerpt: "Logging de LLM mistura compliance, custo e debug. O esquema que funciona para auditar 6 meses depois."
date: 2026-03-15
readTime: 6 min
author: Camila R.
tags: [Observabilidade, LLMs, Compliance]
image: /assets/sharpai-concept-1.png
---

Logar tudo é caro e arriscado. Não logar nada é debug impossível. O meio-termo importa.

## Schema mínimo

```json
{
  "trace_id": "uuid",
  "tenant_id": "string",
  "user_id_hash": "sha256",
  "model": "claude-opus-4-7",
  "input_tokens": 1234,
  "output_tokens": 567,
  "latency_ms": 890,
  "tool_calls": ["search", "create_order"],
  "outcome": "success | refusal | error",
  "cost_usd": 0.042
}
```

## O que NÃO logar

- Prompt completo se houver PII
- Output bruto sem anonimização
- API key (óbvio mas acontece)

## Onde mandar

- **Métricas** → Prometheus / Grafana
- **Traces** → OpenTelemetry / Honeycomb
- **Conteúdo amostrado** → S3 com retention curta (30-90d)

> O melhor log é o que você precisa às 3am quando algo quebra. Pense no futuro você.
