---
tags: [component, section]
file: components/Contact.jsx
---

# Contact

Mega-título "Tem / problema / difícil?" com parallax de tilt baseado em mouse. Form funcional via `mailto:` + canais diretos com copy-to-clipboard.

## Form

- Validação inline: nome + email + project obrigatórios; regex de email básico
- Status feedback (`role="status"` ou `role="alert"`)
- `mailto:` com subject/body pré-preenchidos
- `autoComplete="name|email"`

## Canais

- E-mail: clique copia para clipboard (`navigator.clipboard.writeText`); fallback abre cliente de e-mail
- LinkedIn: link real com `target="_blank" rel="noopener noreferrer"`
- Endereço + horário (via [[LiveClock]])

## Copy

| Antes | Depois |
|---|---|
| `Vamos / construir / algo.` | `Tem / problema / difícil?` |
| `[ Contato · 2026 ]` | `[ Briefing · 24h ]` |
| `O que você quer afiar?` | `Em uma frase: qual é o problema?` |
| `Resposta em até 24h úteis. Briefings sob NDA.` | `Resposta em 24h. NDA recíproco no primeiro contato.` |

Ver [[Magnetic]], [[Marquee]].
