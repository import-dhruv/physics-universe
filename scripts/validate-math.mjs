// Finds every LaTeX string in the published content that KaTeX cannot render.
// Usage: npm run check:math
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const katex = require('katex')
execFileSync('npx', ['esbuild', 'src/data/index.ts', '--bundle', '--platform=node',
  '--format=cjs', '--outfile=/tmp/opencode/physics-universe-math.cjs'], { stdio: 'ignore' })
const d = require('/tmp/opencode/physics-universe-math.cjs')

const failures = []
let checked = 0

function checkRaw(tex, where) {
  if (typeof tex !== 'string' || !tex.trim()) return
  checked++
  let source = tex.trim()
  if (source.startsWith('$$') && source.endsWith('$$') && source.length > 4) source = source.slice(2, -2)
  else if (source.startsWith('$') && source.endsWith('$') && source.length > 2) source = source.slice(1, -1)
  try {
    katex.renderToString(source, { throwOnError: true, strict: false, displayMode: false })
  } catch (e) {
    failures.push(`${where}: ${e.message.replace(/\n/g, ' ')}\n    ${source.slice(0, 220)}`)
  }
}

function check(tex, where) {
  if (typeof tex !== 'string' || !tex.trim()) return
  // prose strings may contain inline $...$ spans; test only the matched spans
  const matches = tex.match(/\$[^$]+\$/g) ?? []
  for (const part of matches) {
    const body = part.slice(1, -1)
    if (!body.trim()) continue
    checked++
    try {
      katex.renderToString(body, { throwOnError: true, strict: false, displayMode: false })
    } catch (e) {
      failures.push(`${where}: ${e.message.replace(/\n/g, ' ')}\n    ${body.slice(0, 220)}`)
    }
  }
}

function walkBlocks(blocks, where) {
  ;(blocks ?? []).forEach((b, i) => {
    if (b.kind === 'math') checkRaw(b.latex, `${where}.blocks[${i}].latex`)
    if (b.kind === 'quote') check(b.text, `${where}.blocks[${i}].quote`)
    if (b.kind === 'paragraph') check(b.text, `${where}.blocks[${i}].text`)
    if (b.kind === 'callout') check(b.text, `${where}.blocks[${i}].callout`)
    if (b.kind === 'steps') b.items.forEach((s, j) => {
      check(s.text, `${where}.blocks[${i}].steps[${j}].text`)
      if (s.math) checkRaw(s.math, `${where}.blocks[${i}].steps[${j}].math`)
    })
    if (b.kind === 'list') b.items.forEach((it, j) => check(it, `${where}.blocks[${i}].list[${j}]`))
    if (b.kind === 'table') b.rows.forEach((r, j) => r.forEach((c, k) => check(c, `${where}.blocks[${i}].table[${j}][${k}]`)))
  })
}

d.ALL_TOPICS.forEach(t => {
  walkBlocks(t.blocks, `topic:${t.id}`)
  ;(d.TOPIC_KEY_EQUATIONS[t.id] ?? []).forEach((e, i) => checkRaw(e, `topic:${t.id}.keyEquation[${i}]`))
})
d.DERIVATIONS.forEach(x => {
  checkRaw(x.statement, `derivation:${x.id}.statement`)
  check(x.result, `derivation:${x.id}.result`)
  x.variables.forEach((v, i) => checkRaw(v.symbol, `derivation:${x.id}.variable[${i}]`))
  x.steps.forEach((s, i) => {
    check(s.text, `derivation:${x.id}.step[${i}].text`)
    if (s.math) checkRaw(s.math, `derivation:${x.id}.step[${i}].math`)
  })
  ;['physicalProblem', 'interpretation', 'dimensions'].forEach(k => check(x[k], `derivation:${x.id}.${k}`))
  ;['limits', 'examples', 'applications', 'limitations', 'assumptions', 'tools'].forEach(k =>
    (x[k] ?? []).forEach((v, i) => check(v, `derivation:${x.id}.${k}[${i}]`)))
})
d.PROBLEMS.forEach(p => {
  check(p.statement, `problem:${p.id}.statement`)
  check(p.answer, `problem:${p.id}.answer`)
  p.solution.forEach((s, i) => {
    check(s.text, `problem:${p.id}.step[${i}].text`)
    if (s.math) checkRaw(s.math, `problem:${p.id}.step[${i}].math`)
  })
  ;['hints', 'concepts', 'alternatives', 'mistakes'].forEach(k =>
    (p[k] ?? []).forEach((v, i) => check(v, `problem:${p.id}.${k}[${i}]`)))
  if (p.further) check(p.further, `problem:${p.id}.further`)
})
d.EXPERIMENTS.forEach(e => {
  walkBlocks(e.theory, `experiment:${e.id}`)
  check(e.objective, `experiment:${e.id}.objective`)
  check(e.background, `experiment:${e.id}.background`)
  ;['apparatus', 'procedure', 'analysis', 'questions', 'measurementLabels'].forEach(k =>
    (e[k] ?? []).forEach((v, i) => check(v, `experiment:${e.id}.${k}[${i}]`)))
})
Object.entries(d.QUICK_CHECKS ?? {}).forEach(([id, q]) => {
  check(q.prompt, `quickcheck:${id}.prompt`)
  check(q.answer, `quickcheck:${id}.answer`)
})
d.SIMULATIONS?.forEach?.(s => {
  s.equations.forEach((e, i) => checkRaw(e, `simulation:${s.id}.equation[${i}]`))
})

console.log(`Checked ${checked} LaTeX segments.`)
console.log(`Failures: ${failures.length}`)
if (failures.length) {
  console.log(failures.slice(0, 400).join('\n\n'))
  process.exitCode = 1
}
