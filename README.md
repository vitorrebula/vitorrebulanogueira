# Vitor Rebula Nogueira — Portfólio

Site pessoal em React + TypeScript + Tailwind CSS v4 + Framer Motion, com foco em uma
experiência imersiva e tecnológica: seções com scroll reveal, terminal animado, bento
grid para a especialização em IA e um marquee de stack.

## Rodando localmente

```bash
npm install
npm run dev
```

## Chat com IA (Gemini + RAG)

O chat flutuante responde dúvidas sobre o Vitor usando Gemini Flash, restrito ao escopo do portfólio.

- **Base de conhecimento:** arquivos Markdown em `content/knowledge/` (seções `##` viram chunks).
- **Indexação:** `GEMINI_API_KEY=... npm run build:kb` gera os embeddings em `api/_kb/index.json`. Rode sempre que editar a base (o `npm run build` também roda).
- **API:** `api/chat.ts` (função serverless da Vercel): valida a entrada, aplica rate limit por IP, busca os trechos mais similares e só chama o Gemini se houver contexto relevante.
- **Variáveis de ambiente:** copie `.env.example` para `.env` e, na Vercel, configure `GEMINI_API_KEY` (Settings → Environment Variables, inclusive para o build).
- **Dev local:** em um terminal `npx vercel dev --listen 3000`, em outro `npm run dev` (o Vite faz proxy de `/api`).

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

- `src/components/` — seções da página (Hero, About, Experience, AIFocus, Skills, Beyond, Contact) e primitives de UI reutilizáveis em `ui/`.
- `src/lib/data.ts` — todo o conteúdo textual (experiências, skills, pilares de IA, contato), separado da apresentação.
- `src/hooks/useActiveSection.ts` — scroll-spy da navegação.
