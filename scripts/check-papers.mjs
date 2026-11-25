// Integrity checks for the arXiv research-paper corpus.
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
execFileSync('npx', ['esbuild', 'src/data/index.ts', '--bundle', '--platform=node',
  '--format=cjs', '--outfile=/tmp/opencode/physics-universe-papers.cjs'], { stdio: 'ignore' })
const d = require('/tmp/opencode/physics-universe-papers.cjs')
const errors = []

if (d.PAPERS.length < 3000) errors.push(`Corpus too small: ${d.PAPERS.length}`)
const ids = new Set()
for (const p of d.PAPERS) {
  if (ids.has(p.id)) errors.push(`Duplicate id ${p.id}`)
  ids.add(p.id)
  if (!p.title || p.title.length < 5) errors.push(`${p.id}: missing title`)
  if (!p.authors.length) errors.push(`${p.id}: missing authors`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.published)) errors.push(`${p.id}: bad date ${p.published}`)
  if (!p.url.startsWith('https://arxiv.org/abs/')) errors.push(`${p.id}: bad source URL`)
  if (!p.summary || p.summary.length < 40) errors.push(`${p.id}: missing abstract`)
  if (!['Mathematics', 'Physics'].includes(p.domain)) errors.push(`${p.id}: bad domain`)
  if (!p.topicIds.length) errors.push(`${p.id}: no topic mapping`)
}
const math = d.PAPERS.filter(p => p.domain === 'Mathematics').length
const physics = d.PAPERS.length - math
console.log(`Papers: ${d.PAPERS.length} · Mathematics: ${math} · Physics: ${physics} · Categories: ${d.PAPER_STATS.categories}`)
console.log(`Errors: ${errors.length}`)
if (errors.length) { console.log(errors.slice(0, 30).join('\n')); process.exitCode = 1 }
