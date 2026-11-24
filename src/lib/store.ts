import { useSyncExternalStore } from 'react'

export interface ProgressState {
  completed: string[]
  studying: string[]
  solved: string[]
  bookmarks: string[]
  quiz: Record<string, { correct: number; attempts: number }>
  seconds: number
  streak: number
  lastActive: string
  path: string | null
}

const KEY = 'physics-universe-progress-v1'

const blank: ProgressState = {
  completed: [], studying: [], solved: [], bookmarks: [], quiz: {},
  seconds: 0, streak: 0, lastActive: '', path: null,
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...blank }
    return { ...blank, ...JSON.parse(raw) }
  } catch { return { ...blank } }
}

let state = load()
const listeners = new Set<() => void>()

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage unavailable */ }
  listeners.forEach(l => l())
}

function toggle(field: 'completed' | 'studying' | 'solved' | 'bookmarks', id: string) {
  const arr = state[field]
  state = { ...state, [field]: arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id] }
  persist()
}

export const progress = {
  get: () => state,
  subscribe: (l: () => void) => { listeners.add(l); return () => { listeners.delete(l) } },
  toggle,
  markComplete: (id: string) => {
    state = {
      ...state,
      completed: state.completed.includes(id) ? state.completed : [...state.completed, id],
      studying: state.studying.filter(x => x !== id),
    }
    persist()
  },
  markStudying: (id: string) => {
    if (state.completed.includes(id) || state.studying.includes(id)) return
    state = { ...state, studying: [...state.studying, id].slice(-12) }
    persist()
  },
  recordQuiz: (id: string, correct: boolean) => {
    const prev = state.quiz[id] ?? { correct: 0, attempts: 0 }
    state = { ...state, quiz: { ...state.quiz, [id]: { correct: prev.correct + (correct ? 1 : 0), attempts: prev.attempts + 1 } } }
    persist()
  },
  setPath: (id: string) => { state = { ...state, path: id }; persist() },
  tick: () => {
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    const streak = state.lastActive === today ? state.streak
      : state.lastActive === yesterday ? state.streak + 1 : 1
    state = { ...state, seconds: state.seconds + 60, lastActive: today, streak }
    persist()
  },
  reset: () => { state = { ...blank }; persist() },
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(progress.subscribe, progress.get, progress.get)
}
