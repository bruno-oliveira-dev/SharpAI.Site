---
title: "Edge vs Cloud: onde rodar o seu LLM"
excerpt: "Latência, custo e compliance moldam onde sua inferência mora. Um mapa de decisão prático."
date: 2026-02-15
readTime: 5 min
author: Marcus L.
tags: [Edge, Arquitetura, LLMs]
image: /assets/sharpai-concept-1.png
---

A inferência local ficou viável. Mas isso não significa que toda inferência deve sair da nuvem.

## Cinco variáveis de decisão

1. **Latência** — quanto p99 você tolera?
2. **Custo** — fixo (GPU dedicada) ou variável (token)?
3. **Compliance** — dado pode sair da fronteira?
4. **Throughput** — picos previsíveis ou erráticos?
5. **Tamanho de modelo** — 7B local, 70B cloud, fronteira sempre cloud

## Heurística rápida

- **Sempre edge**: dado PII duro, latência < 50ms, throughput previsível
- **Sempre cloud**: modelo fronteira (Claude, GPT-5), throughput errático
- **Híbrido**: pequenos no edge (clf/embed/extract), grandes no cloud (raciocínio)

O erro comum: assumir que tudo precisa ser fronteira. **70% das tarefas são resolvidas por modelo 7B bem afinado.**
