// ─────────────────────────────────────────────────────────────────────────────
// PHYSICS UNIVERSE — shared content model
// Every piece of content in the platform conforms to these shapes so the
// rendering layer can stay generic and new branches can be added modularly.
// ─────────────────────────────────────────────────────────────────────────────

export type Level =
  | 'Beginner'
  | 'High school'
  | 'Advanced high school'
  | 'Undergraduate 1'
  | 'Undergraduate 2'
  | 'Undergraduate 3'
  | 'Undergraduate 4'
  | 'Graduate'
  | 'Postgraduate'
  | 'Research'

export const LEVELS: Level[] = [
  'Beginner', 'High school', 'Advanced high school', 'Undergraduate 1',
  'Undergraduate 2', 'Undergraduate 3', 'Undergraduate 4',
  'Graduate', 'Postgraduate', 'Research',
]

export type Block =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; text: string; level?: 2 | 3 }
  | { kind: 'math'; latex: string; display?: boolean; caption?: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  | { kind: 'callout'; tone: 'note' | 'insight' | 'warning' | 'history' | 'experiment'; title?: string; text: string }
  | { kind: 'steps'; title?: string; items: { title: string; text: string; math?: string }[] }
  | { kind: 'table'; headers: string[]; rows: string[][] }
  | { kind: 'sim'; sim: string; caption?: string }
  | { kind: 'quote'; text: string; attribution?: string }

export interface Branch {
  id: string
  title: string
  short: string
  description: string
  icon: string            // lucide icon name (kebab-case)
  color: string           // hex accent
  part: string            // e.g. "Classical physics"
  topicIds: string[]
}

export interface Topic {
  id: string
  title: string
  branchId: string
  level: Level
  summary: string
  prerequisites: string[]
  tags: string[]
  blocks: Block[]
  derivationIds?: string[]
  simulationIds?: string[]
  problemIds?: string[]
  experimentIds?: string[]
  referenceIds?: string[]
  updated?: string
}

export interface Derivation {
  id: string
  title: string
  topicId: string
  statement: string       // LaTeX
  physicalProblem: string
  assumptions: string[]
  variables: { symbol: string; meaning: string }[]
  tools: string[]
  steps: { title: string; text: string; math?: string }[]
  result: string
  interpretation: string
  dimensions: string
  limits: string[]
  examples: string[]
  applications: string[]
  limitations: string[]
}

export type ProblemType =
  | 'Conceptual' | 'Theoretical' | 'Derivation' | 'Numerical'
  | 'Graph interpretation' | 'Proof' | 'Experimental' | 'Research challenge'

export interface Problem {
  id: string
  title: string
  topicId: string
  level: Level
  type: ProblemType
  concepts: string[]
  statement: string
  hints: string[]
  solution: { title: string; text: string; math?: string }[]
  answer: string
  alternatives?: string[]
  mistakes?: string[]
  further?: string
}

export interface Experiment {
  id: string
  title: string
  topicId: string
  era: string
  objective: string
  background: string
  apparatus: string[]
  theory: Block[]
  procedure: string[]
  parameters: { key: string; label: string; min: number; max: number; step: number; value: number; unit: string }[]
  measurementLabels: string[]
  analysis: string[]
  questions: string[]
  simulationId?: string
}

export interface SimulationMeta {
  id: string
  title: string
  branchId: string
  description: string
  controls: { key: string; label: string; min: number; max: number; step: number; value: number; unit: string }[]
  equations: string[]
  reading: string[]
}

export interface ReferenceItem {
  id: string
  title: string
  authors?: string
  type: 'Open textbook' | 'Lecture notes' | 'Paper' | 'Dataset' | 'Software' | 'Standard' | 'Historical paper' | 'Review'
  publisher?: string
  year?: string
  url: string
  note: string
  license?: string
  openAccess: boolean
}

export interface LearningPath {
  id: string
  title: string
  tagline: string
  description: string
  level: Level
  prerequisites: string[]
  topicIds: string[]
  objectives: string[]
  experiments: string[]
  assessments: string[]
  completion: string
  hours: number
}

export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  branchId?: string
  figure?: string
}

export interface Frontier {
  id: string
  title: string
  field: string
  status: 'Established' | 'Active hypothesis' | 'Open problem' | 'Speculative'
  summary: string
  questions: string[]
  references: string[]
  topicIds: string[]
}

export interface Scientist {
  id: string
  name: string
  years: string
  field: string
  contribution: string
  quote?: string
  topicIds: string[]
}
