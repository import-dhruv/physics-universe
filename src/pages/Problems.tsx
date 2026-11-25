import { useEffect, useMemo, useState } from 'react'
import { ChevronRight, Target, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react'
import {
  PROBLEMS, PROBLEM_BY_ID, TOPIC_BY_ID, STATS,
  MATH_IDS, PHYSICS_IDS, ALL_GENERATED_IDS, getGeneratedMeta, getGeneratedProblem,
} from '../data'
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
  const [domain, setDomain] = useState('All')
  const [page, setPage] = useState(0)
  const p = useProgress()
  const perPage = 24

  useEffect(() => setPage(0), [level, type, q, domain])

  const authored = useMemo(() => (domain === 'Math' || domain === 'Physics' ? [] : PROBLEMS.filter(pr =>
    (level === 'All' || pr.level === level) && (type === 'All' || pr.type === type) &&
    (!q || `${pr.title} ${pr.statement} ${pr.concepts.join(' ')}`.toLowerCase().includes(q.toLowerCase())),
  )), [domain, level, type, q])

  const generatedIds = domain === 'Authored' ? [] : domain === 'Math' ? MATH_IDS : domain === 'Physics' ? PHYSICS_IDS : ALL_GENERATED_IDS

  const generated = useMemo(() => generatedIds.filter(id => {
    const m = getGeneratedMeta(id)
    if (!m) return false
    if (level !== 'All' && m.level !== level) return false
    if (type !== 'All' && m.type !== type) return false
    if (q && !`${m.title} ${m.familyTitle} ${m.topicId} ${m.concepts.join(' ')}`.toLowerCase().includes(q.toLowerCase())) return false
    return true
  }), [generatedIds, level, type, q])

  const cards = useMemo(() => [
    ...authored.map(pr => ({
      key: pr.id, id: pr.id, title: pr.title, level: pr.level, type: pr.type,
      concepts: pr.concepts, solved: p.solved.includes(pr.id), generated: false,
    })),
    ...generated.map(id => {
      const m = getGeneratedMeta(id)!
      return {
        key: id, id, title: `${m.title} · #${m.index + 1}`, level: m.level, type: m.type,
        concepts: m.concepts, solved: p.solved.includes(id), generated: true,
      }
    }),
  ], [authored, generated, p.solved])

  const total = cards.length
  const pageCount = Math.max(1, Math.ceil(total / perPage))
  const current = Math.min(page, pageCount - 1)
  const visible = cards.slice(current * perPage, current * perPage + perPage)

  return (
    <div>
      <div className="eyebrow">Problem-solving arena</div>
      <h1 style={{ margin: '12px 0 10px' }}>Think like a physicist</h1>
      <p className="lead">Mastery here means solving problems without looking. Every item includes hints, a full worked solution, common mistakes and a further challenge. <b>{total.toLocaleString()}</b> problems available; <b>{p.solved.length}</b> solved.</p>

      <div className="grid g4" style={{ marginTop: 20 }}>
        <div className="card metric"><Target size={16} color="#6ea8ff" /><div className="m-val">10,000</div><div className="m-label">Mathematics problems</div></div>
        <div className="card metric"><Target size={16} color="#4fd1a5" /><div className="m-val">10,000</div><div className="m-label">Physics problems</div></div>
        <div className="card metric"><CheckCircle size={16} color="#ffb454" /><div className="m-val">{STATS.authoredProblems}</div><div className="m-label">Hand-authored problems</div></div>
        <div className="card metric"><CheckCircle size={16} color="#b98cff" /><div className="m-val">{p.solved.length}</div><div className="m-label">Solved by you</div></div>
      </div>
      <div className="callout note" style={{ marginTop: 14 }}><div className="co-title">About the generated sets</div><p>The 20,000 generated problems come from parameterized topic-aligned families. Values, answers and worked steps are computed in code for each problem ID, so every item is unique and internally consistent. They are deliberately labelled as generated — they are not hand-written contest or exam questions and are not attributed to any institution.</p></div>

      <div className="filter-bar" style={{ marginTop: 20 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search problems, topics or concepts…"
          style={{ flex: '1 1 240px', maxWidth: 300, background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', color: '#fff', outline: 0 }} />
        <select value={domain} onChange={e => setDomain(e.target.value)}>
          <option value="All">All problems</option><option value="Math">Mathematics (10,000)</option>
          <option value="Physics">Physics (10,000)</option><option value="Authored">Hand-authored only</option>
        </select>
        <select value={level} onChange={e => setLevel(e.target.value)}><option value="All">All levels</option>{LEVELS.map(l => <option key={l}>{l}</option>)}</select>
        <select value={type} onChange={e => setType(e.target.value)}><option value="All">All types</option>{TYPES.map(t => <option key={t}>{t}</option>)}</select>
        <span className="subtle">{total.toLocaleString()} results</span>
      </div>

      <div className="grid g2">
        {visible.map(c => (
          <button className="card card-hover problem-card" key={c.key} onClick={() => go(`/problem/${c.id}`)} style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 9 }}>
              <span className="chip" style={{ borderColor: 'rgba(255,180,84,.35)', color: '#ffb454' }}>{c.level}</span>
              <span className="chip">{c.type}</span>
              {c.generated && <span className="chip" style={{ fontSize: 9.5, color: '#6ea8ff', borderColor: 'rgba(110,168,255,.35)' }}>generated</span>}
              {c.solved && <span className="chip" style={{ marginLeft: 'auto', color: '#4fd1a5' }}>✓ solved</span>}
            </div>
            <h3>{c.title}</h3>
            <div className="subtle" style={{ marginTop: 10 }}>{c.concepts.slice(0, 3).join(' · ')}</div>
          </button>
        ))}
      </div>
      {total === 0 && <div className="empty-state">No problems match those filters. Try widening the level or type.</div>}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 24 }}>
        <button className="btn btn-sm" disabled={current === 0} onClick={() => setPage(current - 1)}>Previous</button>
        <span className="subtle">Page {current + 1} of {pageCount.toLocaleString()}</span>
        <button className="btn btn-sm" disabled={current >= pageCount - 1} onClick={() => setPage(current + 1)}>Next</button>
        <button className="btn btn-sm" onClick={() => setPage(Math.min(100, pageCount - 1))}>Jump to 100</button>
      </div>
    </div>
  )
}

export function ProblemPage({ id }: { id: string }) {
  const pr = PROBLEM_BY_ID[id] ?? getGeneratedProblem(id)
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
