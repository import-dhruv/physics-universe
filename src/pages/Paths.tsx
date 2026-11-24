import { useState } from 'react'
import { Route as RouteIcon, ChevronRight, Check, ArrowRight, Clock, Target } from 'lucide-react'
import { LEARNING_PATHS, TOPIC_BY_ID, BRANCH_BY_ID } from '../data'
import { go } from '../lib/router'
import { progress, useProgress } from '../lib/store'

export function PathsPage() {
  const p = useProgress()
  const [active, setActive] = useState(LEARNING_PATHS[0].id)
  const path = LEARNING_PATHS.find(x => x.id === active) ?? LEARNING_PATHS[0]
  const doneInPath = path.topicIds.filter(id => p.completed.includes(id)).length
  return (
    <div>
      <div className="eyebrow">Structured progression</div>
      <h1 style={{ margin: '12px 0 10px' }}>Learning Paths</h1>
      <p className="lead">Fifteen routes through the discipline, each with prerequisites, ordered chapters, objectives, experiments, assessments and completion criteria. Customise any path from your progress dashboard.</p>
      <div className="grid g2" style={{ marginTop: 22, alignItems: 'start' }}>
        <div>
          <div className="section-head" style={{ margin: '0 0 12px' }}><div><h2 style={{ fontSize: '1.2rem' }}>Choose a route</h2></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LEARNING_PATHS.map(lp => (
              <button className={`card ${active === lp.id ? 'path-active' : ''}`} key={lp.id} onClick={() => setActive(lp.id)} style={{ padding: 14, textAlign: 'left', borderColor: active === lp.id ? '#6ea8ff' : undefined }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <div><div style={{ fontWeight: 600, fontSize: 13 }}>{lp.title}</div><div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>{lp.tagline}</div></div>
                  <ChevronRight size={14} color="#6f7d93" />
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 8, fontSize: 10, color: '#6f7d93' }}>
                  <span><Clock size={10} style={{ verticalAlign: -1 }} /> ~{lp.hours}h</span><span>{lp.topicIds.length} topics</span><span>{lp.level}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div style={{ position: 'sticky', top: 92 }}>
          <div className="card" style={{ padding: 20 }}>
            <div className="eyebrow"><RouteIcon size={12} style={{ verticalAlign: -2 }} /> Selected path</div>
            <h2 style={{ fontSize: '1.5rem', margin: '10px 0' }}>{path.title}</h2>
            <p className="subtle" style={{ lineHeight: 1.7 }}>{path.description}</p>
            <div className="progress-track" style={{ margin: '14px 0 6px' }}><div className="progress-fill" style={{ width: `${doneInPath / path.topicIds.length * 100}%` }} /></div>
            <div className="subtle" style={{ fontSize: 10.5 }}>{doneInPath} of {path.topicIds.length} topics complete</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn btn-primary btn-sm" onClick={() => progress.setPath(path.id)}>{p.path === path.id ? '✓ Current path' : 'Set as my path'}</button>
            </div>
          </div>
          <div className="card" style={{ padding: 18, marginTop: 12 }}>
            <h3 style={{ fontSize: 12, marginBottom: 10 }}><Target size={12} style={{ verticalAlign: -2 }} /> Learning objectives</h3>
            <ul style={{ marginBottom: 0 }}>{path.objectives.map((o, i) => <li key={i} className="subtle" style={{ lineHeight: 1.6 }}>{o}</li>)}</ul>
          </div>
          <div className="card" style={{ padding: 18, marginTop: 12 }}>
            <h3 style={{ fontSize: 12 }}>Completion criteria</h3>
            <p className="subtle" style={{ margin: '6px 0 0', lineHeight: 1.65 }}>{path.completion}</p>
          </div>
        </div>
      </div>

      <div className="section-head"><div><div className="eyebrow">Ordered chapters</div><h2>{path.title} — sequence</h2></div></div>
      <div className="card" style={{ padding: '8px 18px' }}>
        {path.topicIds.map((tid, i) => {
          const t = TOPIC_BY_ID[tid]
          const done = p.completed.includes(tid)
          return (
            <div className="mini-item" key={tid} onClick={() => go(`/topic/${tid}`)} style={{ cursor: 'pointer' }}>
              <span className="mi-num" style={{ color: done ? '#4fd1a5' : undefined }}>{done ? <Check size={13} /> : String(i + 1).padStart(2, '0')}</span>
              <div style={{ flex: 1 }}>
                <div className="mi-title">{t?.title ?? tid.replace(/-/g, ' ')}</div>
                <div className="mi-sub">{t?.summary.slice(0, 100) ?? ''}</div>
              </div>
              <span className="chip" style={{ fontSize: 9 }}>{t ? BRANCH_BY_ID[t.branchId]?.short : ''}</span>
              <ArrowRight size={13} color="#6f7d93" />
            </div>
          )
        })}
      </div>
      <div className="grid g2" style={{ marginTop: 16 }}>
        <div className="card panel"><h3 style={{ fontSize: 12 }}>Experiments in this path</h3><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>{path.experiments.map(e => <span className="chip" key={e}>{e}</span>)}</div></div>
        <div className="card panel"><h3 style={{ fontSize: 12 }}>Assessments</h3><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>{path.assessments.map(e => <span className="chip" key={e}>{e}</span>)}</div></div>
      </div>
    </div>
  )
}
