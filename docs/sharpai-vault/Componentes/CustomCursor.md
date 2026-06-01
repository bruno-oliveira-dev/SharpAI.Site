---
tags: [component, primitivo]
file: components/CustomCursor.jsx
---

# CustomCursor

Cursor custom: dot 6px (laranja, mix-blend-difference) + ring 44px (border + backdrop-invert) com label dinâmico via `[data-cursor]`.

## Mecânica

- Loop rAF com lerp 0.18 para o ring
- Dot acompanha mouse em tempo real
- Hover em elemento com `[data-cursor="texto"]` → scale 2.6× + label visível

## Otimizações

- `passive: true` no mousemove
- Pause em `document.hidden`, `window.blur`
- Não inicializa em mobile (`hover: none`) nem em reduce-motion
- Convenção: nunca use `[data-cursor]` sem texto; o label deve sempre comunicar a ação

## Labels comuns

`abrir`, `ler`, `enviar`, `copiar`, `copiado`, `começar`, `explorar`, `voltar`, `fechar`, `cancelar`, `editar`, `remover`, `entrar`, `sair`, `início`, `conversar`, `solicitar`, `salvar`, `restaurar`, `novo`, `anterior`, `próximo`, `destacar`, `remover destaque`, `admin`
