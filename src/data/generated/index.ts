import type { Problem } from '../../lib/types'
import { makeRng, seedFromString } from '../../lib/rng'
import type { GeneratedFamily } from './types'
import { MATH_FAMILIES_1 } from './families.math.1'
import { MATH_FAMILIES_2 } from './families.math.2'
import { MATH_FAMILIES_3 } from './families.math.3'
import { MATH_FAMILIES_4 } from './families.math.4'
import { MATH_FAMILIES_5 } from './families.math.5'
import { PHYSICS_FAMILIES_1 } from './families.physics.1'
import { PHYSICS_FAMILIES_2 } from './families.physics.2'
import { PHYSICS_FAMILIES_3 } from './families.physics.3'
import { PHYSICS_FAMILIES_4 } from './families.physics.4'
import { PHYSICS_FAMILIES_5 } from './families.physics.5'

export const MATH_FAMILIES: GeneratedFamily[] = [
  ...MATH_FAMILIES_1, ...MATH_FAMILIES_2, ...MATH_FAMILIES_3,
  ...MATH_FAMILIES_4, ...MATH_FAMILIES_5,
]
export const PHYSICS_FAMILIES: GeneratedFamily[] = [
  ...PHYSICS_FAMILIES_1, ...PHYSICS_FAMILIES_2, ...PHYSICS_FAMILIES_3,
  ...PHYSICS_FAMILIES_4, ...PHYSICS_FAMILIES_5,
]
export const GENERATED_FAMILIES = [...MATH_FAMILIES, ...PHYSICS_FAMILIES]
export const FAMILY_BY_ID = new Map(GENERATED_FAMILIES.map(f => [f.id, f]))

export const TARGET_PER_DOMAIN = 10000
const variants = (families: GeneratedFamily[]) =>
  Math.max(1, Math.ceil(TARGET_PER_DOMAIN / families.length))

const MATH_VARIANTS = variants(MATH_FAMILIES)
const PHYSICS_VARIANTS = variants(PHYSICS_FAMILIES)

function buildIds(families: GeneratedFamily[], domain: 'math' | 'physics', count: number) {
  const out: string[] = []
  const n = domain === 'math' ? MATH_VARIANTS : PHYSICS_VARIANTS
  for (const f of families) {
    for (let i = 0; i < n && out.length < TARGET_PER_DOMAIN; i++) out.push(`gen-${domain}-${f.id}-${i}`)
  }
  return out.slice(0, TARGET_PER_DOMAIN)
}

// Lightweight index: only IDs and family metadata are held in memory. Full
// problem objects are constructed on demand by getGeneratedProblem().
export const MATH_IDS = buildIds(MATH_FAMILIES, 'math', MATH_VARIANTS)
export const PHYSICS_IDS = buildIds(PHYSICS_FAMILIES, 'physics', PHYSICS_VARIANTS)
export const ALL_GENERATED_IDS = [...MATH_IDS, ...PHYSICS_IDS]
export const GENERATED_COUNT = { math: MATH_IDS.length, physics: PHYSICS_IDS.length, total: ALL_GENERATED_IDS.length }

export interface GeneratedMeta {
  id: string
  domain: 'math' | 'physics'
  familyId: string
  familyTitle: string
  index: number
  title: string
  topicId: string
  level: Problem['level']
  type: Problem['type']
  concepts: string[]
}

export function parseGeneratedId(id: string): { domain: 'math' | 'physics'; familyId: string; index: number } | null {
  if (!id.startsWith('gen-')) return null
  const rest = id.slice(4)
  const first = rest.indexOf('-')
  if (first < 0) return null
  const domain = rest.slice(0, first) as 'math' | 'physics'
  const tail = rest.slice(first + 1)
  const last = tail.lastIndexOf('-')
  if (last < 0) return null
  const familyId = tail.slice(0, last)
  const index = Number(tail.slice(last + 1))
  if (!Number.isInteger(index) || index < 0) return null
  return { domain, familyId, index }
}

export function getGeneratedMeta(id: string): GeneratedMeta | null {
  const parsed = parseGeneratedId(id)
  if (!parsed) return null
  const family = FAMILY_BY_ID.get(parsed.familyId)
  if (!family || family.domain !== parsed.domain) return null
  return {
    id, domain: family.domain, familyId: family.id, familyTitle: family.title,
    index: parsed.index, title: family.title, topicId: family.topicId,
    level: family.level, type: family.type, concepts: family.concepts,
  }
}

export function getGeneratedProblem(id: string): Problem | null {
  const meta = getGeneratedMeta(id)
  if (!meta) return null
  const family = FAMILY_BY_ID.get(meta.familyId)!
  const rng = makeRng(seedFromString(id))
  const solution = family.build(rng, meta.index)
  return {
    id,
    title: solution.title ?? family.title,
    topicId: family.topicId,
    level: family.level,
    type: family.type,
    concepts: family.concepts,
    statement: solution.statement,
    hints: solution.hints,
    solution: solution.steps,
    answer: solution.answer,
    alternatives: solution.alternatives,
    mistakes: solution.mistakes,
    further: solution.further,
  }
}

/** A few generated problems per topic for article side panels. */
export function generatedForTopic(topicId: string, perFamily = 2): Problem[] {
  const out: Problem[] = []
  for (const f of GENERATED_FAMILIES) {
    if (f.topicId !== topicId) continue
    const n = f.domain === 'math' ? MATH_VARIANTS : PHYSICS_VARIANTS
    for (let i = 0; i < Math.min(perFamily, n) && out.length < 8; i++) {
      const p = getGeneratedProblem(`gen-${f.domain}-${f.id}-${i}`)
      if (p) out.push(p)
    }
  }
  return out
}

export function generatedIdsForFamily(familyId: string): string[] {
  const f = FAMILY_BY_ID.get(familyId)
  if (!f) return []
  const ids = f.domain === 'math' ? MATH_IDS : PHYSICS_IDS
  return ids.filter(id => id.startsWith(`gen-${f.domain}-${familyId}-`))
}
