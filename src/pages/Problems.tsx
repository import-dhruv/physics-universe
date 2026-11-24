import { useState } from 'react'
import { ChevronRight, Target, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react'
import { PROBLEMS, PROBLEM_BY_ID, TOPIC_BY_ID } from '../data'
import { LEVELS } from '../lib/types'
import { go } from '../lib/router'
import { progress, useProgress } from '../lib/store'
import { InlineText } from '../components/Blocks'
import { Math as MathRender } from '../components/Math'
import type { Level, ProblemType } from '../lib/types'

const TYPES: ProblemType[] = ['Conceptual', 'Theoretical', 'Derivation', 'Numerical', 'Graph interpretation', 'Proof', 'Experimental', 'Research challenge']

export function ProblemArena() {
  const [level, setLevel] = useState('All')
  const [type, setType] = useState('All')
  const [q, setQ] = useState('')
  const p = useProgress()
  const list = PROBLEMS.filter(pr =>
    (level === 'All' || pr.level === level) && (type === 'All' || pr.type === type) &&
    (!q || `${pr.title} ${pr.statement}`.toLowerCase().includes(q.toLowerCase())),
  )
  return (
    <div>
      <div className="eyebrow">Problem-solving arena</div>
      <h1 style={{ margin: '12px 0 10px' }}>Think like a physicist</h1>
      <p className="lead">Mastery here means solving problems without looking. Every item includes hints, a full worked solution, common mistakes and a further challenge. {p.solved.length} solved so far.</p>
      <div className="filter-bar" style={{ marginTop: 20 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search problems…"
          style={{ flex: '1 1 240px', maxWidth: 300, background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', color: '#fff', outline: 0 }} />
        <select value={level} onChange={e => setLevel(e.target.value)}><option value="All">All levels</option>{LEVELS.map(l => <option key={l}>{l}</option>)}</select>
        <select value={type} onChange={e => setType(e.target.value)}><option value="All">All types</option>{TYPES.map(t => <option key={t}>{t}</option>)}</select>
        <span className="subtle">{list.length} problems</span>
      </div>
      <div className="grid g2">
        {list.map(pr => (
          <button className="card card-hover problem-card" key={pr.id} onClick={() => go(`/problem/${pr.id}`)} style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 9 }}>
              <span className="chip" style={{ borderColor: 'rgba(255,180,84,.35)', color: '#ffb454' }}>{pr.level}</span>
              <span className="chip">{pr.type}</span>
              {p.solved.includes(pr.id) && <span className="chip" style={{ marginLeft: 'auto', color: '#4fd1a5' }}>✓ solved</span>}
            </div>
            <h3>{pr.title}</h3>
            <div className="problem-statement" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pr.statement}</div>
            <div className="subtle" style={{ marginTop: 12 }}>{pr.concepts.slice(0, 3).join(' · ')}</div>
          </button>
        ))}
      </div>
      {list.length === 0 && <div className="empty-state">No problems match those filters. Try widening the level or type.</div>}
    </div>
  )
}

export function ProblemPage({ id }: { id: string }) {
  const pr = PROBLEM_BY_ID[id]
  const p = useProgress()
  const [hint, setHint] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  if (!pr) return <div className="empty-state">Problem not found. <button className="btn btn-sm" onClick={() => go('/problems')}>Problem arena</button></div>
  const topic = TOPIC_BY_ID[pr.topicId]
  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/problems')}>Problem Arena</button><ChevronRight size={11} /><span>{pr.title}</span></div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span className="chip" style={{ color: '#ffb454', borderColor: 'rgba(255,180,84,.35)' }}>{pr.level}</span>
        <span className="chip">{pr.type}</span>
        {topic && <button className="chip" style={{ cursor: 'pointer' }} onClick={() => go(`/topic/${topic.id}`)}>{topic.title} →</button>}
      </div>
      <h1 style={{ margin: '14px 0 16px', fontSize: 'clamp(1.7rem,3vw,2.4rem)' }}>{pr.title}</h1>
      <div className="card" style={{ padding: 20 }}>
        <div className="eyebrow">Problem</div>
        <p style={{ color: '#d5deeb', lineHeight: 1.85, fontSize: 15, margin: '12px 0 0' }}><InlineText text={pr.statement} /></p>
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '18px 0', flexWrap: 'wrap' }}>
        <button className="btn btn-sm" onClick={() => setHint(h => Math.min(pr.hints.length, h + 1))}><Lightbulb size={13} /> Hint {hint ? `${hint}/${pr.hints.length}` : ''}</button>
        <button className="btn btn-sm btn-primary" onClick={() => setShowSolution(s => !s)}>{showSolution ? 'Hide solution' : 'Reveal solution'}</button>
        <button className={`btn btn-sm ${p.solved.includes(pr.id) ? '' : ''}`} onClick={() => progress.toggle('solved', pr.id)}>
          <CheckCircle size={13} color={p.solved.includes(pr.id) ? '#4fd1a5' : undefined} /> {p.solved.includes(pr.id) ? 'Solved' : 'Mark solved'}
        </button>
        <button className="btn btn-sm" onClick={() => progress.recordQuiz(pr.id, showSolution)}>Record attempt</button>
      </div>

      {hint > 0 && <div className="callout insight">
        <div className="co-title">Hints revealed</div>
        {pr.hints.slice(0, hint).map((h, i) => <p key={i}><b>{i + 1}.</b> <InlineText text={h} /></p>)}
      </div>}

      {showSolution && (
        <div style={{ marginTop: 18 }}>
          <div className="section-head"><div><div className="eyebrow">Worked solution</div><h2 style={{ fontSize: '1.3rem' }}>Reasoning, not just the answer</h2></div></div>
          <div className="steps-box">
            {pr.solution.map((s, i) => (
              <div className="step" key={i}>
                <div className="step-n">{i + 1}</div>
                <div><h4>{s.title}</h4><p><InlineText text={s.text} /></p>{s.math && <div className="math-block"><MathRender tex={s.math} display /></div>}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 18, marginTop: 14 }}>
            <div className="eyebrow">Final answer</div>
            <p style={{ fontSize: 16, margin: '10px 0 0' }}><InlineText text={pr.answer} /></p>
          </div>
          {pr.alternatives && pr.alternatives.length > 0 && <div className="card" style={{ padding: 18, marginTop: 14 }}><h3 style={{ fontSize: 13 }}>Alternative approaches</h3><ul>{pr.alternatives.map((a, i) => <li key={i}><InlineText text={a} /></li>)}</ul></div>}
          <div className="callout warning"><div className="co-title">Common mistakes</div><ul style={{ margin: 0 }}>{pr.mistakes?.map((m, i) => <li key={i}><InlineText text={m} /></li>)}</ul></div>
          {pr.further && <div className="callout insight"><div className="co-title">Further challenge</div><p><InlineText text={pr.further} /></p></div>}
        </div>
      )}

      <div className="section-head"><div><div className="eyebrow">Build mastery</div><h2 style={{ fontSize: '1.2rem' }}>Concepts involved</h2></div></div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{pr.concepts.map(c => <span className="chip" key={c}>{c}</span>)}</div>
      {topic && <div style={{ marginTop: 20 }}><button className="btn" onClick={() => go(`/topic/${topic.id}`)}>Review the theory <ArrowRight size={13} /></button></div>}
    </div>
  )
}
