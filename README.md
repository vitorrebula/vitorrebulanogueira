# Vitor Rebula Nogueira — Portfólio

Site pessoal em React + TypeScript + Tailwind CSS v4 + Framer Motion, com foco em uma
experiência imersiva e tecnológica: seções com scroll reveal, terminal animado, bento
grid para a especialização em IA e um marquee de stack.

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

- `src/components/` — seções da página (Hero, About, Experience, AIFocus, Skills, Beyond, Contact) e primitives de UI reutilizáveis em `ui/`.
- `src/lib/data.ts` — todo o conteúdo textual (experiências, skills, pilares de IA, contato), separado da apresentação.
- `src/hooks/useActiveSection.ts` — scroll-spy da navegação.
