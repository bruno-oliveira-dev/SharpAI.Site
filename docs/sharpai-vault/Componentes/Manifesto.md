---
tags: [component, section]
file: components/Manifesto.jsx
---

# Manifesto

3 parágrafos em **JetBrains Mono** com estética de **terminal manifesto** (prompt `>` + caret piscante na última linha).

## Visual

- Bloco emoldurado por `1px solid var(--border)` + `border-radius: var(--radius-md)`
- Tag "manifesto.txt" no canto superior esquerdo (pill ancorada na borda)
- Cada parágrafo prefixado por `>` em laranja
- Última linha termina com caret cinético (ciano com glow + `caret-blink` 1.05s steps)
- Texto em minúsculas (estética de log)

## Texto

```
> acreditamos que a IA já não é tendência, é infraestrutura.
> não vendemos slides nem cerimônia. entregamos software em produção.
> times pequenos. ciclos curtos. decisões assinadas por quem entende▌
```

## Stats

| Antes | Depois |
|---|---|
| 40+ Projetos entregues | 40+ Sistemas em produção (desde 2021) |
| 12 Clientes ativos | 12 Times que voltaram (retenção 24m) |
| 98% Uptime médio | 99.8% SLA cumprido (média móvel 90d) |
| 3 Anos de operação | 5 Anos de código entregue (SP · BR) |

## Histórico de fontes

1. **Space Grotesk 500** (original) — display sans
2. **Instrument Serif italic** (refino inicial) — editorial, mas saiu do tom do site
3. **JetBrains Mono terminal-style** (atual) — alinha com a estética HUD/cockpit + comunica "manifesto técnico"

Ver [[Reveal]], [[CountUp]].
