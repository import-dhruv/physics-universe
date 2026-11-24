import { useState } from 'react'
import { ChartNoAxesCombined, Flame, CheckCircle, Brain, RotateCcw, ArrowRight } from 'lucide-react'
import { ALL_TOPICS, BRANCHES, BRANCH_BY_ID, PROBLEMS, LEARNING_PATHS, STATS } from '../data'
import { go } from '../lib/router'
import { progress, useProgress } from '../lib/store'

export function ProgressPage() {
  const p = useProgress()
  const [card, setCard] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const pct = Math.round(p.completed.length / STATS.topics * 100)
  const hours = Math.floor(p.seconds / 3600)
  const quizAccuracy = Object.values(p.quiz).length
    ? Math.round(Object.values(p.quiz).reduce((s, q) => s + q.correct / q.attempts, 0) / Object.values(p.quiz).length * 100) : 0
  const branchProgress = BRANCHES.map(b => {
    const ids = ALL_TOPICS.filter(t => t.branchId === b.id)
    const done = ids.filter(t => p.completed.includes(t.id)).length
    return { b, done, total: ids.length, pct: ids.length ? Math.round(done / ids.length * 100) : 0 }
  }).sort((a, b) => b.pct - a.pct)
  const weak = branchProgress.filter(x => x.total > 0).slice(-5)
  const cards = ALL_TOPICS.filter(t => p.studying.includes(t.id) || p.completed.includes(t.id)).slice(0, 30)
  const current = cards[card % Math.max(1, cards.length)]

  return (
    <div>
      <div className="eyebrow">Personalised learning</div>
      <h1 style={{ margin: '12px 0 10px' }}>My Progress</h1>
      <p className="lead">Mastery is measured by problem-solving and conceptual recall — not by pages opened. Your data is stored locally in this browser.</p>

      <div className="grid g4" style={{ marginTop: 22 }}>
        <div className="card metric"><ChartNoAxesCombined size={16} color="#6ea8ff" /><div className="m-val">{pct}%</div><div className="m-label">Curriculum covered</div></div>
        <div className="card metric"><CheckCircle size={16} color="#4fd1a5" /><div className="m-val">{p.solved.length}</div><div className="m-label">Problems solved</div></div>
        <div className="card metric"><Brain size={16} color="#b98cff" /><div className="m-val">{quizAccuracy}%</div><div className="m-label">Self-assessment accuracy</div></div>
        <div className="card metric"><Flame size={16} color="#ffb454" /><div className="m-val">{p.streak}</div><div className="m-label">Day streak · {hours}h tracked</div></div>
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Branch mastery</h3><span className="subtle">{p.completed.length} / {STATS.topics}</span></div>
          {branchProgress.slice(0, 12).map(({ b, done, total, pct: pc }) => (
            <div className="bar-row" key={b.id}>
              <span className="subtle" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.short}</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.max(pc, 1)}%`, background: `linear-gradient(90deg, ${b.color}, ${b.color}88)` }} /></div>
              <span className="mono subtle">{done}/{total}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="card panel" style={{ marginBottom: 14 }}>
            <div className="panel-title"><h3><Brain size={13} style={{ verticalAlign: -2 }} /> Spaced-repetition flashcards</h3><button className="btn btn-sm" onClick={() => { setCard(c => c + 1); setFlipped(false) }}><RotateCcw size={12} /> Next</button></div>
            {current ? (
              <div onClick={() => setFlipped(f => !f)} style={{ cursor: 'pointer', minHeight: 150, padding: 20, borderRadius: 10, border: '1px solid var(--border)', background: 'linear-gradient(135deg,rgba(110,168,255,.06),transparent)' }}>
                <div className="subtle" style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase' }}>{flipped ? 'Concept' : 'Recall prompt'}</div>
                <h3 style={{ fontSize: 16, margin: '10px 0' }}>{flipped ? current.title : `Explain: ${current.title}`}</h3>
                <p className="subtle" style={{ lineHeight: 1.65 }}>{flipped ? current.summary : 'State the key idea, the governing equation and one assumption, then click to reveal.'}</p>
                <button className="btn btn-sm" style={{ marginTop: 8 }} onClick={e => { e.stopPropagation(); go(`/topic/${current.id}`) }}>Open topic <ArrowRight size={12} /></button>
              </div>
            ) : <div className="empty-state">Mark a topic as “studying” or complete one to build your review deck.</div>}
          </div>
          <div className="card panel">
            <div className="panel-title"><h3>Areas needing attention</h3></div>
            {weak.map(({ b, pct: pc }) => <div className="mini-item" key={b.id}><span className="mi-num">{pc}%</span><div className="mi-title" style={{ fontSize: 12 }}>{b.title}</div></div>)}
          </div>
        </div>
      </div>

      <div className="section-head"><div><div className="eyebrow">Study queue</div><h2>Currently studying</h2></div></div>
      <div className="grid g3">
        {p.studying.map(id => {
          const t = ALL_TOPICS.find(x => x.id === id)
          if (!t) return null
          return <button className="card card-hover" key={id} onClick={() => go(`/topic/${id}`)} style={{ padding: 16, textAlign: 'left' }}>
            <div className="chip-dot" style={{ background: BRANCH_BY_ID[t.branchId]?.color, marginBottom: 10 }} />
            <h3 style={{ fontSize: 13 }}>{t.title}</h3><p className="subtle" style={{ margin: 0, lineHeight: 1.55 }}>{t.summary.slice(0, 100)}…</p>
          </button>
        })}
        {p.studying.length === 0 && <div className="empty-state" style={{ gridColumn: '1/-1' }}>Nothing in progress. Open a topic to start studying.</div>}
      </div>

      <div className="section-head"><div><div className="eyebrow">Revision schedule</div><h2>Next problems to attempt</h2></div></div>
      <div className="grid g3">
        {PROBLEMS.filter(pr => !p.solved.includes(pr.id)).slice(0, 6).map(pr => (
          <button className="card card-hover" key={pr.id} onClick={() => go(`/problem/${pr.id}`)} style={{ padding: 14, textAlign: 'left' }}>
            <div className="chip" style={{ marginBottom: 8, fontSize: 9.5 }}>{pr.level}</div>
            <h3 style={{ fontSize: 12.5 }}>{pr.title}</h3>
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 18, marginTop: 24 }}>
        <div className="panel-title"><h3>Current learning path</h3><button className="btn btn-sm" onClick={() => go('/paths')}>Change path</button></div>
        <p className="subtle" style={{ margin: 0 }}>{p.path ? LEARNING_PATHS.find(l => l.id === p.path)?.title : 'No path selected yet.'}</p>
        <button className="btn btn-sm" style={{ marginTop: 12 }} onClick={() => { if (confirm('Reset all local progress? This cannot be undone.')) progress.reset() }}>Reset progress</button>
      </div>
    </div>
  )
}
