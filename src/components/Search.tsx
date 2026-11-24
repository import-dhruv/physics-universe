import { useEffect, useMemo, useRef, useState } from 'react'
import { Search as SearchIcon, X, CornerDownLeft } from 'lucide-react'
import { ALL_TOPICS, DERIVATIONS, EXPERIMENTS, PROBLEMS, BRANCHES, SCIENTISTS, FRONTIERS } from '../data'
import { SIMULATIONS } from '../data/simulations'
import { go } from '../lib/router'
import { BRANCH_BY_ID } from '../data/architecture'

export interface SearchHit {
  id: string
  title: string
  sub: string
  group: string
  path: string
  color: string
}

function buildIndex(): SearchHit[] {
  const hits: SearchHit[] = []
  ALL_TOPICS.forEach(t => hits.push({
    id: t.id, title: t.title, sub: BRANCH_BY_ID[t.branchId]?.title ?? '', group: 'Topics',
    path: `/topic/${t.id}`, color: BRANCH_BY_ID[t.branchId]?.color ?? '#6ea8ff',
  }))
  BRANCHES.forEach(b => hits.push({ id: b.id, title: b.title, sub: b.part, group: 'Branches', path: `/branch/${b.id}`, color: b.color }))
  DERIVATIONS.forEach(d => hits.push({ id: d.id, title: d.title, sub: 'Mathematical derivation', group: 'Derivations', path: `/derivation/${d.id}`, color: '#8b7cff' }))
  EXPERIMENTS.forEach(e => hits.push({ id: e.id, title: e.title, sub: 'Virtual laboratory', group: 'Experiments', path: `/experiment/${e.id}`, color: '#4fd1a5' }))
  PROBLEMS.forEach(p => hits.push({ id: p.id, title: p.title, sub: `${p.type} · ${p.level}`, group: 'Problems', path: `/problem/${p.id}`, color: '#ffb454' }))
  SIMULATIONS.forEach(s => hits.push({ id: s.id, title: s.title, sub: 'Interactive simulation', group: 'Simulations', path: `/simulation/${s.id}`, color: '#7ec8ff' }))
  SCIENTISTS.forEach(s => hits.push({ id: s.id, title: s.name, sub: `${s.years} · ${s.field}`, group: 'Scientists', path: `/history/${s.id}`, color: '#ff9eb5' }))
  FRONTIERS.forEach(f => hits.push({ id: f.id, title: f.title, sub: `${f.field} · ${f.status}`, group: 'Research frontiers', path: `/research/${f.id}`, color: '#c79cff' }))
  return hits
}

const INDEX = buildIndex()

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return INDEX.filter(h => ['Topics', 'Branches', 'Simulations'].includes(h.group)).slice(0, 8)
    const words = needle.split(/\s+/)
    return INDEX.map(h => {
      const t = `${h.title} ${h.sub} ${h.group}`.toLowerCase()
      const score = words.reduce((s, w) => s + (t.includes(w) ? (h.title.toLowerCase().includes(w) ? 3 : 1) : -5), 0)
      return { h, score }
    }).filter(x => x.score > 0).sort((a, b) => b.score - a.score || a.h.title.localeCompare(b.h.title)).slice(0, 14).map(x => x.h)
  }, [q])

  useEffect(() => { if (open) { setQ(''); setSelected(0); setTimeout(() => inputRef.current?.focus(), 20) } }, [open])
  useEffect(() => { setSelected(0) }, [q])

  if (!open) return null

  const choose = (hit: SearchHit) => { go(hit.path); onClose() }
  let lastGroup = ''

  return (
    <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="search-box">
        <div className="search-input-wrap">
          <SearchIcon size={18} color="#6f7d93" />
          <input
            ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search concepts, equations, experiments, scientists…"
            onKeyDown={e => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(results.length - 1, s + 1)) }
              if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(0, s - 1)) }
              if (e.key === 'Enter' && results[selected]) choose(results[selected])
            }}
          />
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="search-results">
          {results.length === 0 && <div className="search-empty">No matches. Try a broader term — e.g. “entropy”, “field”, “wave”, “Feynman”.</div>}
          {results.map((hit, i) => {
            const showGroup = hit.group !== lastGroup
            lastGroup = hit.group
            return (
              <div key={hit.group + hit.id}>
                {showGroup && <div className="search-group">{hit.group}</div>}
                <div
                  className={`search-result ${i === selected ? 'selected' : ''}`}
                  onMouseEnter={() => setSelected(i)} onClick={() => choose(hit)}
                >
                  <span className="sr-ico" style={{ color: hit.color }}><SearchIcon size={13} /></span>
                  <div style={{ minWidth: 0 }}>
                    <div className="sr-title">{hit.title}</div>
                    <div className="sr-sub">{hit.sub}</div>
                  </div>
                  {i === selected && <CornerDownLeft size={13} style={{ marginLeft: 'auto', color: '#6f7d93' }} />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
