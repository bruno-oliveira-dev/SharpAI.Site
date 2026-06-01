---
title: "Evals como software: o pipeline que ninguém constrói"
excerpt: "Avaliar LLM é teste de software, não chat. Por que CI/CD para evals deveria ser padrão e não exceção."
date: 2026-04-30
readTime: 9 min
author: Camila R.
tags: [Evals, LLMs, Engenharia]
image: /assets/sharpai-concept-1.png
---

A maior diferença entre times que escalam IA e times que apresentam IA é uma só: **o pipeline de evals**.

## O que falta

- Eval suite versionada como código
- Rodar evals em cada PR
- Gates: PR não merga se pass-rate cai > 2%
- Dashboard público para o time
- Gold set com curadoria humana

## Antipattern comum

> "Vamos testar manualmente esse prompt." — palavras de quem nunca escalou.

## Setup mínimo

```yaml
# .github/workflows/evals.yml
on: [pull_request]
jobs:
  evals:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run evals
      - run: node scripts/compare-baseline.js
```

Um eval rodando por 90 segundos em CI vale mais que 100 horas de "testar manualmente".
