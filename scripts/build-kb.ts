import { GoogleGenAI } from '@google/genai'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const KB_DIR = 'content/knowledge'
const OUT_FILE = 'api/_kb/index.json'
const EMBED_MODEL = process.env.GEMINI_EMBED_MODEL ?? 'gemini-embedding-001'
const BATCH_SIZE = 50

type Chunk = { id: string; source: string; title: string; text: string }

function splitMarkdown(file: string, raw: string): Chunk[] {
  const docTitle = raw.match(/^# (.+)$/m)?.[1] ?? file
  return raw
    .split(/^## /m)
    .slice(1)
    .map((section, index) => {
      const [heading, ...body] = section.split('\n')
      const title = heading.trim()
      return {
        id: `${file}#${index}`,
        source: file,
        title,
        text: `${docTitle} — ${title}\n${body.join('\n').trim()}`,
      }
    })
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    if (existsSync(OUT_FILE)) {
      console.warn(`GEMINI_API_KEY não definida; mantendo o índice existente em ${OUT_FILE}.`)
      return
    }
    console.error('GEMINI_API_KEY não definida e não há índice; não é possível gerar os embeddings.')
    process.exit(1)
  }

  const files = (await readdir(KB_DIR)).filter((f) => f.endsWith('.md')).sort()
  const chunks: Chunk[] = []
  for (const file of files) {
    chunks.push(...splitMarkdown(file, await readFile(path.join(KB_DIR, file), 'utf8')))
  }

  const ai = new GoogleGenAI({ apiKey })
  const vectors: number[][] = []
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE)
    const res = await ai.models.embedContent({
      model: EMBED_MODEL,
      contents: batch.map((c) => c.text),
      config: { taskType: 'RETRIEVAL_DOCUMENT', outputDimensionality: 768 },
    })
    for (const e of res.embeddings ?? []) vectors.push(normalize(e.values ?? []))
  }
  if (vectors.length !== chunks.length) {
    throw new Error(`Esperava ${chunks.length} embeddings, recebi ${vectors.length}`)
  }

  const index = {
    model: EMBED_MODEL,
    chunks: chunks.map((chunk, i) => ({ ...chunk, embedding: vectors[i] })),
  }
  await mkdir(path.dirname(OUT_FILE), { recursive: true })
  await writeFile(OUT_FILE, JSON.stringify(index))
  console.log(`Índice gerado: ${chunks.length} chunks de ${files.length} arquivos → ${OUT_FILE}`)
}

// Embeddings truncados (768 dims) precisam ser normalizados para o cosseno ser válido.
function normalize(v: number[]): number[] {
  const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1
  return v.map((x) => x / norm)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
