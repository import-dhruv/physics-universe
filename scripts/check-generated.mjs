// Verifies the 20,000 generated problems: counts, determinism, uniqueness,
// solution structure and KaTeX validity on a representative sample.
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const katex = require('katex')
execFileSync('npx', ['esbuild', 'src/data/index.ts', '--bundle', '--platform=node',
  '--format=cjs', '--outfile=/tmp/opencode/physics-universe-gen.cjs'], { stdio: 'ignore' })
const d = require('/tmp/opencode/physics-universe-gen.cjs')

const errors = []
let checkedMath = 0
const checkRaw = (tex, where) => {
  if (typeof tex !== 'string' || !tex.trim()) return
  let source = tex.trim()
  if (source.startsWith('$') && source.endsWith('$')) source = source.slice(1, -1)
  checkedMath++
  try { katex.renderToString(source, { throwOnError: true, strict: false }) }
  catch (e) { errors.push(`${where}: ${e.message.replace(/\n/g, ' ')} :: ${source.slice(0, 120)}`) }
}

const check = (tex, where) => {
  if (typeof tex !== 'string' || !tex.trim()) return
  const span = tex.match(/\$[^$]+\$/g) ?? []
  for (const raw of span) {
    const body = raw.startsWith('$') && raw.endsWith('$') ? raw.slice(1, -1) : raw
    if (!body.trim()) continue
    checkedMath++
    try { katex.renderToString(body, { throwOnError: true, strict: false }) }
    catch (e) { errors.push(`${where}: ${e.message.replace(/\n/g, ' ')} :: ${body.slice(0, 120)}`) }
  }
}

console.log('Generated counts:', d.GENERATED_COUNT)
if (d.GENERATED_COUNT.math !== 10000 || d.GENERATED_COUNT.physics !== 10000) errors.push('Incorrect generated problem counts')
if (new Set(d.ALL_GENERATED_IDS).size !== d.ALL_GENERATED_IDS.length) errors.push('Duplicate generated IDs')

let sampled = 0
for (const f of d.GENERATED_FAMILIES) {
  const ids = d.generatedIdsForFamily(f.id)
  if (!ids.length) { errors.push(`${f.id}: no IDs`); continue }
  const statements = new Set()
  for (const i of [0, 1, 2, Math.floor(ids.length / 2), ids.length - 1]) {
    const id = ids[i]
    const p = d.getGeneratedProblem(id)
    if (!p) { errors.push(`${id}: could not generate`); continue }
    sampled++
    statements.add(p.statement)
    if (/NaN|Infinity/.test(JSON.stringify(p))) errors.push(`${id}: invalid numeric value`)
    if (p.solution.some(st => /undefined|NaN|Infinity/.test(st.math ?? ''))) errors.push(`${id}: invalid value in step math`)
    if (p.hints.length < 3) errors.push(`${id}: fewer than 3 hints`)
    if (p.solution.length < 4) errors.push(`${id}: fewer than 4 solution steps`)
    if (!p.answer?.trim()) errors.push(`${id}: missing answer`)
    check(p.statement, `${id}.statement`)
    check(p.answer, `${id}.answer`)
    p.hints.forEach((h, k) => check(h, `${id}.hint[${k}]`))
    p.solution.forEach((s, k) => { check(s.text, `${id}.step[${k}].text`); if (s.math) checkRaw(s.math, `${id}.step[${k}].math`) })
    ;(p.alternatives ?? []).forEach((a, k) => check(a, `${id}.alt[${k}]`))
    ;(p.mistakes ?? []).forEach((a, k) => check(a, `${id}.mistake[${k}]`))
    if (p.further) check(p.further, `${id}.further`)
  }
  if (statements.size < 4) errors.push(`${f.id}: variants are not distinct`)
  // determinism
  const a = d.getGeneratedProblem(ids[0])
  const b = d.getGeneratedProblem(ids[0])
  if (JSON.stringify(a) !== JSON.stringify(b)) errors.push(`${f.id}: generation is not deterministic`)
}

console.log(`Families: ${d.GENERATED_FAMILIES.length} · problems sampled: ${sampled} · math segments checked: ${checkedMath}`)
console.log(`Errors: ${errors.length}`)
if (errors.length) { console.log(errors.slice(0, 40).join('\n')); process.exitCode = 1 }
