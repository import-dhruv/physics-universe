import { useState } from 'react'
import { ArrowRight, ChevronRight, Layers } from 'lucide-react'
import { BRANCHES, BRANCH_BY_ID, ALL_TOPICS, topicsForBranch, STATS } from '../data'
import { go } from '../lib/router'
import { useProgress } from '../lib/store'
import type { Topic } from '../lib/types'

function TopicCard({ t }: { t: Topic }) {
  const p = useProgress()
  const color = BRANCH_BY_ID[t.branchId]?.color ?? '#6ea8ff'
  const done = p.completed.includes(t.id)
  const deep = !t.tags.includes('curriculum outline')
  return (
    <button className="card card-hover" onClick={() => go(`/topic/${t.id}`)} style={{ padding: 15, textAlign: 'left', position: 'relative', minHeight: 132 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 9 }}>
        <span className="chip-dot" style={{ background: color }} />
        <span className="subtle" style={{ fontSize: 10 }}>{BRANCH_BY_ID[t.branchId]?.short}</span>
        {done && <span style={{ marginLeft: 'auto', fontSize: 10, color: '#4fd1a5' }}>✓ complete</span>}
      </div>
      <h3 style={{ fontSize: 13.5, marginBottom: 6, lineHeight: 1.35 }}>{t.title}</h3>
      <p className="subtle" style={{ margin: 0, lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{t.summary}</p>
      <div style={{ position: 'absolute', bottom: 12, left: 15, display: 'flex', gap: 6 }}>
        <span className="chip" style={{ fontSize: 9.5, padding: '2px 7px' }}>{t.level}</span>
        {deep && <span className="chip" style={{ fontSize: 9.5, padding: '2px 7px', color: '#4fd1a5' }}>deep article</span>}
      </div>
    </button>
  )
}

export function ExplorePage() {
  const [query, setQuery] = useState('')
  const [part, setPart] = useState('All')
  const parts = ['All', ...Array.from(new Set(BRANCHES.map(b => b.part)))]
  const filtered = ALL_TOPICS.filter(t =>
    (part === 'All' || BRANCH_BY_ID[t.branchId]?.part === part) &&
    (!query || `${t.title} ${t.summary}`.toLowerCase().includes(query.toLowerCase())),
  )

  return (
    <div>
      <div className="eyebrow">Knowledge architecture</div>
      <h1 style={{ margin: '12px 0 10px' }}>Explore Physics</h1>
      <p className="lead">{STATS.branches} branches and {STATS.topics} topics form a dependency-ordered map of the discipline — from algebraic manipulation to quantum field theory and cosmology.</p>

      <div className="filter-bar" style={{ marginTop: 24 }}>
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Filter topics by name or description…"
          style={{ flex: '1 1 260px', maxWidth: 380, background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', color: '#fff', outline: 0 }}
        />
        <select value={part} onChange={e => setPart(e.target.value)}>
          {parts.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <span className="subtle">{filtered.length} topics</span>
      </div>

      <div className="section-head"><div><div className="eyebrow">Browse by branch</div><h2>The map of physics</h2></div></div>
      <div className="grid g3">
        {BRANCHES.filter(b => part === 'All' || b.part === part).map(b => (
          <button className="card card-hover branch-tile" key={b.id} onClick={() => go(`/branch/${b.id}`)} style={{ textAlign: 'left', minHeight: 130 }}>
            <div className="bt-icon" style={{ background: `${b.color}18`, color: b.color }}><Layers size={17} /></div>
            <div className="bt-count">{b.topicIds.length}</div>
            <h3>{b.title}</h3><p>{b.description}</p>
          </button>
        ))}
      </div>

      <div className="section-head"><div><div className="eyebrow">All topics</div><h2>{query ? 'Search results' : 'Complete curriculum index'}</h2></div></div>
      <div className="grid g4">
        {filtered.slice(0, 120).map(t => <TopicCard key={t.id} t={t} />)}
      </div>
      {filtered.length > 120 && <div className="empty-state" style={{ marginTop: 14 }}>Showing the first 120 of {filtered.length} topics. Use search or filter to narrow the index.</div>}
    </div>
  )
}

export function BranchPage({ id }: { id: string }) {
  const branch = BRANCH_BY_ID[id]
  const topics = topicsForBranch(id)
  if (!branch) return <div className="empty-state">Branch not found. <button className="btn btn-sm" onClick={() => go('/explore')}>Back to map</button></div>
  const relatives = BRANCHES.filter(b => b.part === branch.part && b.id !== id)
  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/explore')}>Explore Physics</button><ChevronRight size={11} /><span>{branch.title}</span></div>
      <div className="eyebrow" style={{ color: branch.color }}>{branch.part}</div>
      <h1 style={{ margin: '12px 0 10px' }}>{branch.title}</h1>
      <p className="lead">{branch.description}</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        <span className="chip">{topics.length} topics</span>
        <span className="chip">{topics.filter(t => !t.tags.includes('curriculum outline')).length} deep articles</span>
        {relatives.map(b => <button key={b.id} className="chip" style={{ cursor: 'pointer' }} onClick={() => go(`/branch/${b.id}`)}>{b.short} <ArrowRight size={10} /></button>)}
      </div>
      <div className="section-head"><div><div className="eyebrow">Syllabus</div><h2>Topics in this branch</h2></div></div>
      <div className="grid g3">{topics.map(t => <TopicCard key={t.id} t={t} />)}</div>
    </div>
  )
}
