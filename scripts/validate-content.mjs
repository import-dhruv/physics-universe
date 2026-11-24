// Static integrity checks for the content data model.
// Run: node scripts/validate-content.mjs  (after `npm run build` passes)
import fs from 'node:fs'

const read = f => fs.readFileSync(new URL('../' + f, import.meta.url), 'utf8')
const arch = read('src/data/architecture.ts')
const canonical = new Set([...arch.matchAll(/'([a-z0-9-]+)'/g)].map(m => m[1]))

const files = fs.readdirSync(new URL('../src/data/', import.meta.url)).filter(f => f.startsWith('content.') && f.endsWith('.ts'))
let topics = 0, derivations = 0, problems = 0, experiments = 0
const errors = []

for (const f of files) {
  const text = read('src/data/' + f)
  for (const [name, re] of [
    ['TOPICS', /export const \w+_TOPICS[^\n]*\n/g],
    ['DERIVATIONS', /export const \w+_DERIVATIONS[^\n]*\n/g],
  ]) { void name; void re }
  // crude but effective structural counts
  topics += (text.match(/kind: 'heading'/g) || []).length > 0 ? (text.match(/\bid: '/g) || []).length : 0
  derivations += (text.match(/physicalProblem:/g) || []).length
  problems += (text.match(/hints:/g) || []).length
  experiments += (text.match(/apparatus:/g) || []).length
  if (/\bundefined\b/.test(text)) errors.push(`${f}: contains bare 'undefined'`)
  if (/TODO|FIXME|PLACEHOLDER/i.test(text)) errors.push(`${f}: contains a TODO/FIXME marker`)
}

console.log('Content files scanned:', files.join(', '))
console.log('Approx. derivations:', derivations, 'problems:', problems, 'experiments:', experiments)
console.log('Canonical topic slugs in architecture:', canonical.size)
if (errors.length) { console.error('\nIssues:\n' + errors.join('\n')); process.exitCode = 1 }
else console.log('\nNo structural red flags detected. Run `npm run typecheck` for full validation.')
