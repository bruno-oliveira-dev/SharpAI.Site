---
tags: [component, section]
file: components/Footer.jsx
---

# Footer

3 colunas (Empresa / Social / Legal) + linha base com build number.

## Hydration-safe

Build number antes era `Math.floor(Date.now()/1000)%99999` — SSR e CSR retornavam valores diferentes → warning. Agora:

```jsx
const [build, setBuild] = useState(BUILD_BASE);
useEffect(() => setBuild(Math.floor(Date.now()/1000) % 99999), []);
// ...
<span className="hud-mono" suppressHydrationWarning>v3.2.1 · build {build}</span>
```

## Links

- **Social**: LinkedIn / GitHub / X com `target="_blank" rel="noopener noreferrer"` + `aria-label` (`abre em nova aba`)
- **Legal**: aponta para `#contato` enquanto páginas reais não existem (placeholder semântico melhor que `#`)
