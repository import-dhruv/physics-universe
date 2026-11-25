import type { Level, ProblemType } from '../../lib/types'

export interface RNG {
  int(min: number, max: number): number
  num(min: number, max: number, decimals?: number): number
  pick<T>(items: readonly T[]): T
  bool(): boolean
}

export interface GeneratedSolution {
  /** Optional variant-specific title; otherwise the family title is used. */
  title?: string
  statement: string
  hints: string[]
  steps: { title: string; text: string; math?: string }[]
  answer: string
  alternatives?: string[]
  mistakes?: string[]
  further?: string
}

export interface GeneratedFamily {
  id: string
  domain: 'math' | 'physics'
  topicId: string
  title: string
  level: Level
  type: ProblemType
  concepts: string[]
  build(rng: RNG, index: number): GeneratedSolution
}
