import type { RNG } from '../data/generated/types'

export function seedFromString(text: string): number {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Deterministic, fast PRNG (mulberry32). Same id always gives the same problem. */
export function makeRng(seed: number): RNG {
  let a = seed >>> 0
  const next = () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return {
    int: (min, max) => min + Math.floor(next() * (max - min + 1)),
    num: (min, max, decimals = 2) => Number((min + next() * (max - min)).toFixed(decimals)),
    pick: items => items[Math.floor(next() * items.length)],
    bool: () => next() < .5,
  }
}
