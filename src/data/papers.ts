import raw from './papers.arxiv.json'
import type { Paper } from '../lib/types'
import { FRONTIERS } from './content.library'
import { ALL_TOPIC_IDS } from './architecture'

const CANONICAL_TOPICS = new Set(ALL_TOPIC_IDS)

interface RawPaper {
  id: string
  arxivId: string
  title: string
  authors: string[]
  published: string
  updated: string
  category: string
  summary: string
  url: string
  pdf: string
  doi: string
  comment: string
}

const CATEGORY_TOPICS: Record<string, string[]> = {
  'quant-ph': ['quantum-mechanics', 'quantum-information', 'quantum-computation', 'entanglement', 'quantum-decoherence'],
  'gr-qc': ['general-relativity', 'gravitational-waves', 'black-holes', 'numerical-relativity', 'quantum-gravity-phenomenology'],
  'hep-th': ['quantum-field-theory', 'string-theory', 'gauge-theories', 'qft-curved-spacetime', 'topological-insulators'],
  'hep-ph': ['particle-physics', 'standard-model', 'qcd', 'higgs-mechanism', 'beyond-standard-model'],
  'hep-ex': ['particle-physics', 'accelerators', 'detector-physics', 'neutrino-physics'],
  'hep-lat': ['lattice-field-theory', 'qcd', 'computational-methods'],
  'nucl-ex': ['nuclear-physics', 'nuclear-reactions', 'detector-physics'],
  'nucl-th': ['nuclear-physics', 'nuclear-structure', 'nuclear-astrophysics'],
  'astro-ph.CO': ['cosmology', 'dark-energy', 'dark-matter-astro', 'cmb', 'inflation'],
  'astro-ph.GA': ['astrophysics', 'galaxy-formation', 'dark-matter-astro'],
  'astro-ph.HE': ['astrophysics', 'black-hole-astrophysics', 'accretion-disks', 'cosmic-rays'],
  'astro-ph.SR': ['astrophysics', 'stellar-structure', 'stellar-evolution', 'supernovae'],
  'cond-mat.mes-hall': ['condensed-matter', 'graphene', 'spintronics', 'mesoscopic-physics'],
  'cond-mat.mtrl-sci': ['condensed-matter', 'materials-physics-general', 'band-theory'],
  'cond-mat.quant-gas': ['condensed-matter', 'bose-einstein-condensate', 'ultracold-atoms'],
  'cond-mat.stat-mech': ['statistical-mechanics', 'critical-phenomena', 'renormalization-group'],
  'cond-mat.str-el': ['condensed-matter', 'strongly-correlated-systems', 'mott-insulators', 'superconductivity'],
  'cond-mat.supr-con': ['condensed-matter', 'superconductivity', 'bcs-theory'],
  'cond-mat.dis-nn': ['condensed-matter', 'complex-systems-thermo', 'strongly-correlated-systems'],
  'math-ph': ['mathematical-physics', 'functional-analysis', 'quantum-mechanics'],
  'physics.acc-ph': ['accelerator-physics', 'instrumentation'],
  'physics.atom-ph': ['atomic-molecular-optical', 'atomic-spectra', 'ultracold-atoms'],
  'physics.comp-ph': ['computational-physics', 'numerical-methods', 'simulation-methods'],
  'physics.flu-dyn': ['fluid-mechanics', 'turbulence', 'navier-stokes'],
  'physics.geo-ph': ['geophysics', 'seismology', 'atmospheric-physics'],
  'physics.ins-det': ['instrumentation', 'detector-physics', 'metrology'],
  'physics.optics': ['optics', 'photonics', 'quantum-optics', 'lasers'],
  'physics.plasm-ph': ['plasma-physics', 'mhd', 'fusion'],
  'physics.space-ph': ['space-physics', 'solar-physics', 'atmospheric-physics'],
  'physics.bio-ph': ['biophysics', 'physics-of-living-systems'],
  'physics.chem-ph': ['chemical-physics', 'molecular-spectroscopy'],
  'physics.class-ph': ['classical-mechanics', 'nonlinear-dynamics'],
  'math.AG': ['topology', 'differential-geometry'],
  'math.AP': ['pde', 'differential-equations'],
  'math.AT': ['topology', 'measure-theory'],
  'math.CA': ['complex-analysis', 'fourier-analysis'],
  'math.CO': ['probability-theory', 'statistics', 'numerical-methods'],
  'math.CV': ['complex-analysis'],
  'math.DG': ['differential-geometry', 'general-relativity'],
  'math.DS': ['chaos-theory', 'nonlinear-dynamics', 'dynamical-systems'],
  'math.FA': ['functional-analysis', 'hilbert-spaces'],
  'math.GR': ['group-theory', 'lie-theory'],
  'math.GT': ['topology', 'differential-geometry'],
  'math.MG': ['topology', 'differential-geometry'],
  'math.MP': ['mathematical-physics', 'quantum-mechanics'],
  'math.NA': ['numerical-methods', 'numerical-analysis', 'computational-physics'],
  'math.NT': ['algebraic-number-systems', 'group-theory'],
  'math.OC': ['optimization', 'variational-calculus'],
  'math.PR': ['probability-theory', 'statistics', 'statistical-mechanics'],
  'math.QA': ['canonical-quantization', 'gauge-theories'],
  'math.RA': ['basis-transformations', 'tensor-algebra'],
  'math.RT': ['group-theory', 'linear-algebra'],
  'math.SP': ['functional-analysis', 'operators-observables'],
  'math.ST': ['statistics', 'probability-theory'],
}

const PREFIX_TOPICS: [string, string[]][] = [
  ['math.', ['advanced-math', 'mathematical-physics']],
  ['cond-mat', ['condensed-matter']],
  ['astro-ph', ['astrophysics']],
  ['physics.', ['experimental-physics']],
  ['nucl', ['nuclear-physics']],
  ['hep', ['particle-physics', 'quantum-field-theory']],
]

function topicsFor(category: string): string[] {
  if (CATEGORY_TOPICS[category]) return CATEGORY_TOPICS[category]
  const prefix = PREFIX_TOPICS.find(([p]) => category.startsWith(p))
  return prefix ? prefix[1] : ['physics']
}

function frontiersFor(topics: string[], category: string): string[] {
  const ids = FRONTIERS.filter(f => f.topicIds.some(t => topics.includes(t))).map(f => f.id)
  if (!ids.length) {
    if (category.startsWith('quant-ph')) ids.push('frontier-quantum-information', 'frontier-quantum-foundations')
    else if (category.startsWith('gr-qc')) ids.push('frontier-quantum-gravity', 'frontier-black-hole-information')
    else if (category.startsWith('astro-ph.CO')) ids.push('frontier-dark-matter', 'frontier-dark-energy')
    else if (category.startsWith('cond-mat')) ids.push('frontier-high-tc', 'frontier-topological-phases')
  }
  return ids.slice(0, 5)
}

export const PAPERS: Paper[] = (raw as RawPaper[]).map(p => {
  const domain = p.category.startsWith('math.') || p.category === 'math-ph'
    ? 'Mathematics' as const : 'Physics' as const
  const mapped = topicsFor(p.category).filter(t => CANONICAL_TOPICS.has(t))
  const topicIds = mapped.length ? mapped : (domain === 'Mathematics'
    ? ['probability-theory', 'functional-analysis']
    : ['computational-methods', 'experimental-design'])
  return {
    id: p.id,
    title: p.title,
    authors: p.authors,
    published: p.published,
    year: p.published.slice(0, 4),
    category: p.category,
    domain,
    summary: p.summary,
    url: p.url,
    pdf: p.pdf,
    doi: p.doi || undefined,
    comment: p.comment || undefined,
    source: 'arXiv',
    topicIds,
    frontierIds: frontiersFor(topicIds, p.category),
  }
})

export const PAPER_BY_ID = new Map(PAPERS.map(p => [p.id, p]))

export const PAPERS_BY_TOPIC = new Map<string, Paper[]>()
PAPERS.forEach(p => p.topicIds.forEach(t => {
  const arr = PAPERS_BY_TOPIC.get(t) ?? []
  if (arr.length < 60) arr.push(p)
  PAPERS_BY_TOPIC.set(t, arr)
}))

export const PAPERS_BY_FRONTIER = new Map<string, Paper[]>()
PAPERS.forEach(p => p.frontierIds.forEach(f => {
  const arr = PAPERS_BY_FRONTIER.get(f) ?? []
  if (arr.length < 60) arr.push(p)
  PAPERS_BY_FRONTIER.set(f, arr)
}))

export const PAPER_CATEGORIES = [...new Set(PAPERS.map(p => p.category))].sort()
export const PAPER_STATS = {
  total: PAPERS.length,
  math: PAPERS.filter(p => p.domain === 'Mathematics').length,
  physics: PAPERS.filter(p => p.domain === 'Physics').length,
  categories: PAPER_CATEGORIES.length,
  withDoi: PAPERS.filter(p => p.doi).length,
}
