---
tags: [component, section]
file: components/Capabilities.jsx
---

# Capabilities

5 frentes técnicas. Preview flutuante de 320px segue o mouse na grid.

## Frentes

1. **.NET & Plataformas** — .NET, C#, Python, APIs, DDD
2. **Engenharia de IA** — LLMs, RAG, Evals, Embeddings, Vision
3. **Agentes & Automação** — Tool-use, Orquestração, Guardrails, Eval-loops
4. **Integrações & Data** — ETL, Streaming, APIs, Webhooks, ERP
5. **Interfaces 3D & WebGL** — Three.js, GLSL, Rive, Lottie, Motion

## Detalhes técnicos

- O preview era atualizado via `setState` a cada `mousemove` (re-render full); agora usa `ref` + `requestAnimationFrame` para escrever direto em `style.transform`. Zero re-render por pixel.
- **Clamp horizontal**: `x = min(clientX + 30, innerWidth - 340)` previne corte na borda direita. Clamp vertical mínimo `y = max(16, clientY - 80)`.
- Linhas com `tabIndex={0}` + `role="button"` + `aria-pressed` para navegação por teclado.
- Em mobile (`< 680px`), grid colapsa para 3 colunas com áreas (`grid-template-areas: "n title arrow" / "n short arrow"`).

## Copy refinado

- "O que afiamos." → **"O que entregamos."**
- "Times pequenos. Ciclos curtos." → **"Senioridade alta. Sem júnior em produção, sem terceirização."**

Ver [[Reveal]].
