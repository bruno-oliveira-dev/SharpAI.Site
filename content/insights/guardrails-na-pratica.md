---
title: "Guardrails na prática: limites duros vs. sugestões"
excerpt: "Guardrail não é prompt 'por favor não faça X'. É código que bloqueia ação. Padrões que funcionam em produção."
date: 2026-03-05
readTime: 6 min
author: Marcus L.
tags: [Agentes, Guardrails, Segurança]
image: /assets/sharpai-concept-2.png
---

Guardrail é **código**, não prompt. Se a regra "não pode gastar mais de R$ 10k sem aprovação" vive no system prompt, você tem uma sugestão. Se vive numa função `assertSpendCap(value)`, você tem um guardrail.

## Camadas

1. **Input** — sanitização, rate-limit, allow-list
2. **Tool** — validação antes de executar
3. **Output** — schema, regex, classificador
4. **Spend** — hard cap por sessão e por usuário

## O teste do "ataque adversarial"

Antes de produção, rode 50 prompts mal-intencionados contra seu agente. Se algum quebra o guardrail, ele é prompt — não guardrail.

> "Mas o modelo é alinhado..." — alinhamento não é compliance.
