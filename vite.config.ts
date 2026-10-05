import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // /api é servido pelo `vercel dev` (porta 3000) durante o desenvolvimento
  server: { proxy: { '/api': 'http://localhost:3000' } },
})
