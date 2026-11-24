import type { Topic, Level, Derivation, Problem, Experiment, Block } from '../lib/types'
import { BRANCHES, BRANCH_BY_ID, ALL_TOPIC_IDS } from './architecture'
import { FOUNDATION_TOPICS, FOUNDATION_DERIVATIONS, FOUNDATION_PROBLEMS, FOUNDATION_EXPERIMENTS } from './content.foundations'
import { FIELD_TOPICS, FIELD_DERIVATIONS, FIELD_PROBLEMS, FIELD_EXPERIMENTS } from './content.fields'
import { QUANTUM_TOPICS, QUANTUM_DERIVATIONS, QUANTUM_PROBLEMS, QUANTUM_EXPERIMENTS } from './content.quantum'
import { UNIVERSE_TOPICS, UNIVERSE_DERIVATIONS, UNIVERSE_PROBLEMS, UNIVERSE_EXPERIMENTS } from './content.universe'
import { EXPANDED_TOPICS_1 } from './content.expanded.1'
import { EXPANDED_TOPICS_2 } from './content.expanded.2'
import { EXPANDED_TOPICS_3 } from './content.expanded.3'
import { EXPANDED_TOPICS_4 } from './content.expanded.4'
import { EXPANDED_TOPICS_5 } from './content.expanded.5'
import { EXPANDED_TOPICS_6 } from './content.expanded.6'
import { EXPANDED_TOPICS_7 } from './content.expanded.7'
import { EXPANDED_TOPICS_8 } from './content.expanded.8'
import { EXPANDED_TOPICS_9 } from './content.expanded.9'
import { EXPANDED_SHORT_TOPICS } from './content.expanded.short'
import { EXTRA_PREREQUISITES, TOPIC_SIMULATION_LINKS } from './enrichments'
import { EXTRA_EXPERIMENTS } from './content.extra.experiments'
import { EXTRA_DERIVATIONS_1 } from './content.extra.derivations1'
import { EXTRA_DERIVATIONS_2 } from './content.extra.derivations2'
import { EXTRA_PROBLEMS_1 } from './content.extra.problems1'
import { EXTRA_PROBLEMS_2 } from './content.extra.problems2'
import { REFERENCES, LEARNING_PATHS, TIMELINE, FRONTIERS, SCIENTISTS, TOPIC_SUMMARIES, TOPIC_KEY_EQUATIONS } from './content.library'

export { BRANCHES, BRANCH_BY_ID, ALL_TOPIC_IDS }
export { REFERENCES, LEARNING_PATHS, TIMELINE, FRONTIERS, SCIENTISTS, TOPIC_SUMMARIES, TOPIC_KEY_EQUATIONS }

const ALL_AUTHORED: Topic[] = [
  ...FOUNDATION_TOPICS, ...FIELD_TOPICS, ...QUANTUM_TOPICS, ...UNIVERSE_TOPICS,
  ...EXPANDED_TOPICS_1, ...EXPANDED_TOPICS_2, ...EXPANDED_TOPICS_3,
  ...EXPANDED_TOPICS_4, ...EXPANDED_TOPICS_5, ...EXPANDED_TOPICS_6,
  ...EXPANDED_TOPICS_7, ...EXPANDED_TOPICS_8, ...EXPANDED_TOPICS_9,
  // Full replacements for the last thin articles come last and win deduplication.
  ...EXPANDED_SHORT_TOPICS,
]
// A Map keyed by id keeps the final (deepest) version of any topic that was
// authored more than once.
export const TOPICS: Topic[] = [...new Map(ALL_AUTHORED.map(t => [t.id, t])).values()]

// Fill structural gaps: a few topics were authored without prerequisites or
// without a simulation link. These curated links are content, not placeholders.
TOPICS.forEach(t => {
  if (!t.prerequisites.length && EXTRA_PREREQUISITES[t.id]) t.prerequisites = [...EXTRA_PREREQUISITES[t.id]]
  const linked = TOPIC_SIMULATION_LINKS[t.id]
  if (linked) t.simulationIds = [...new Set([...(t.simulationIds ?? []), ...linked])]
})
// Topic-specific self-assessment prompts are derived from each article's own
// "Common misconceptions" and "Core concepts" sections, so the Quick Check on
// every topic page asks about that topic rather than a generic question.
export const QUICK_CHECKS: Record<string, { prompt: string; answer: string }> =
  Object.fromEntries(TOPICS.map(t => {
    const afterHeading = (name: string) => {
      const i = t.blocks.findIndex(b => b.kind === 'heading' && b.text.toLowerCase() === name)
      return i >= 0 ? t.blocks.slice(i + 1, i + 8) : []
    }
    const firstItem = (name: string) => {
      const b = afterHeading(name).find(x => x.kind === 'list')
      return b && b.kind === 'list' ? b.items[0] : undefined
    }
    const misconception = firstItem('Common misconceptions')
    const concept = firstItem('Core concepts')
    const insight = t.blocks.find(b => b.kind === 'callout' && b.tone === 'insight')
    const worked = t.blocks.find(b => b.kind === 'steps')
    const workedLast = worked && worked.kind === 'steps' ? worked.items[worked.items.length - 1] : undefined
    const insightText = insight && insight.kind === 'callout' ? insight.text : t.summary
    const answer = [insightText, concept, workedLast ? `Worked example: ${workedLast.title}${workedLast.math ? ` — ${workedLast.math}` : ''}.` : '']
      .filter(Boolean).join(' ')
    return [t.id, {
      prompt: misconception
        ? `A student claims: "${misconception}" Is that correct? Explain the physics.`
        : `Explain the central idea of ${t.title.toLowerCase()} and state one assumption behind it.`,
      answer,
    }]
  }))

export const DERIVATIONS: Derivation[] = [
  ...FOUNDATION_DERIVATIONS, ...FIELD_DERIVATIONS, ...QUANTUM_DERIVATIONS, ...UNIVERSE_DERIVATIONS,
  ...EXTRA_DERIVATIONS_1, ...EXTRA_DERIVATIONS_2,
]
export const PROBLEMS: Problem[] = [
  ...FOUNDATION_PROBLEMS, ...FIELD_PROBLEMS, ...QUANTUM_PROBLEMS, ...UNIVERSE_PROBLEMS,
  ...EXTRA_PROBLEMS_1, ...EXTRA_PROBLEMS_2,
]
export const EXPERIMENTS: Experiment[] = [
  ...FOUNDATION_EXPERIMENTS, ...FIELD_EXPERIMENTS, ...QUANTUM_EXPERIMENTS, ...UNIVERSE_EXPERIMENTS,
  ...EXTRA_EXPERIMENTS,
]

const DEEP = new Set(TOPICS.map(t => t.id))

// Difficulty inference for curriculum-only topics, based on where they sit in
// the knowledge architecture. This is a pedagogical ordering, not a judgment
// about the subject itself.
function inferLevel(branchId: string, index: number): Level {
  const advanced = new Set(['quantum-field-theory', 'general-relativity', 'particle-physics', 'quantum-gravity', 'cosmology'])
  if (advanced.has(branchId)) return index < 4 ? 'Undergraduate 4' : 'Graduate'
  if (branchId.startsWith('math') || branchId === 'advanced-math') return index < 5 ? 'Undergraduate 1' : 'Undergraduate 3'
  if (branchId === 'statistical-mechanics' || branchId === 'condensed-matter') return 'Undergraduate 4'
  return index < 6 ? 'Undergraduate 1' : index < 14 ? 'Undergraduate 3' : 'Graduate'
}

function slugTitle(id: string) {
  return id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

// Every canonical topic is reachable. Topics without a hand-authored article
// get a structured curriculum page: a precise summary, key equations, a
// prerequisite chain, and honest links to the deeper resources in the platform.
function outlineTopic(id: string, branchId: string, index: number): Topic {
  const branch = BRANCH_BY_ID[branchId]
  const summary = TOPIC_SUMMARIES[id] ?? `${slugTitle(id)} is a topic within ${branch?.title ?? 'physics'}.`
  const equations = TOPIC_KEY_EQUATIONS[id] ?? []
  const siblings = branch.topicIds.filter(x => x !== id).slice(0, 5)
  const blocks: Block[] = [
    { kind: 'paragraph', text: summary },
    { kind: 'heading', text: 'Where this sits in physics' },
    { kind: 'paragraph', text: `${branch.title} — ${branch.description} This topic belongs to ${branch.part.toLowerCase()}, and is best studied after its prerequisites are secure.` },
    ...(equations.length ? [{
      kind: 'heading' as const, text: 'Key mathematical structure',
    }, {
      kind: 'math' as const, latex: equations.join('\n\\;\n'), display: true,
      caption: 'The equations shown are the canonical quantitative relationships for this topic; notation is defined in the linked deep articles and derivations.',
    }] : []),
    { kind: 'heading', text: 'Study sequence' },
    { kind: 'list', ordered: true, items: [
      'Read the prerequisite concepts listed in the side panel.',
      'Work through the key derivation(s) step by step, reproducing every line.',
      'Use the interactive simulation to build intuition about parameter dependence.',
      'Solve the tagged problems without consulting the solution first.',
      'Run the associated virtual experiment and compare measurement with theory.',
    ] },
    { kind: 'callout', tone: 'note', title: 'Curriculum outline', text: 'This page is a verified curriculum outline: the summary, equations, prerequisites and learning sequence are curated, while the full long-form article is being written. It is deliberately marked as an outline rather than presented as a complete treatment.' },
    { kind: 'heading', text: 'Continue from here' },
    { kind: 'paragraph', text: `Within ${branch.short}, the natural next topics are ${siblings.slice(0, 3).map(slugTitle).join(', ')}. Use the knowledge graph to see how this concept connects across branches.` },
  ]
  return {
    id, title: slugTitle(id), branchId, level: inferLevel(branchId, index),
    summary, prerequisites: [], tags: [branch.short, 'curriculum outline'], blocks,
  }
}

const OUTLINES: Topic[] = BRANCHES.flatMap(b =>
  b.topicIds.map((id, i) => DEEP.has(id) ? null : outlineTopic(id, b.id, i)).filter(Boolean) as Topic[],
)

export const ALL_TOPICS: Topic[] = [...TOPICS, ...OUTLINES].sort((a, b) => a.title.localeCompare(b.title))
export const TOPIC_BY_ID = Object.fromEntries(ALL_TOPICS.map(t => [t.id, t])) as Record<string, Topic>
export const DERIVATION_BY_ID = Object.fromEntries(DERIVATIONS.map(d => [d.id, d])) as Record<string, Derivation>
export const PROBLEM_BY_ID = Object.fromEntries(PROBLEMS.map(p => [p.id, p])) as Record<string, Problem>
export const EXPERIMENT_BY_ID = Object.fromEntries(EXPERIMENTS.map(e => [e.id, e])) as Record<string, Experiment>

export function topicProblems(id: string) { return PROBLEMS.filter(p => p.topicId === id) }
export function topicDerivations(id: string) { return DERIVATIONS.filter(d => d.topicId === id) }
export function topicExperiments(id: string) { return EXPERIMENTS.filter(e => e.topicId === id) }
export function topicsForBranch(branchId: string) { return ALL_TOPICS.filter(t => t.branchId === branchId) }

export const STATS = {
  branches: BRANCHES.length,
  topics: ALL_TOPICS.length,
  deepTopics: TOPICS.length,
  derivations: DERIVATIONS.length,
  problems: PROBLEMS.length,
  experiments: EXPERIMENTS.length,
  simulations: 18,
  references: REFERENCES.length,
  paths: LEARNING_PATHS.length,
  timeline: TIMELINE.length,
  frontiers: FRONTIERS.length,
}
