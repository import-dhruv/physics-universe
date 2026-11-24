// Verifies that every canonical topic resolves to a genuine long-form article
// with substantive structure: multiple sections, mathematics, and either a
// worked derivation or a comparative table.
// Usage: npm run check:content
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
execFileSync('npx', ['esbuild', 'src/data/index.ts', '--bundle', '--platform=node',
  '--format=cjs', '--outfile=/tmp/opencode/physics-universe-data.cjs'], { stdio: 'ignore' })

const d = require('/tmp/opencode/physics-universe-data.cjs')
const topics = d.ALL_TOPICS
const outlines = topics.filter(t => t.tags.includes('curriculum outline'))

const weak = []
for (const t of topics) {
  const headings = t.blocks.filter(b => b.kind === 'heading').length
  const maths = t.blocks.filter(b => b.kind === 'math').length
  const callouts = t.blocks.filter(b => b.kind === 'callout').length
  const worked = t.blocks.some(b => b.kind === 'steps' || b.kind === 'table')
  const chars = t.blocks.reduce((n, b) => n + JSON.stringify(b).length, 0)
  if (t.blocks.length < 10 || headings < 3 || maths < 1 || callouts < 1 || !worked || chars < 2500) {
    weak.push(`${t.id}: blocks=${t.blocks.length} headings=${headings} math=${maths} callouts=${callouts} worked=${worked} chars=${chars}`)
  }
}

console.log(`Topics: ${topics.length}`)
console.log(`Long-form articles: ${topics.length - outlines.length}`)
console.log(`Curriculum outlines remaining: ${outlines.length}`)
console.log(`Articles failing depth check: ${weak.length}`)
if (weak.length) console.log(weak.slice(0, 30).join('\n'))
console.log(`Derivations: ${d.DERIVATIONS.length} · Problems: ${d.PROBLEMS.length} · Experiments: ${d.EXPERIMENTS.length}`)
if (outlines.length || weak.length) process.exitCode = 1
