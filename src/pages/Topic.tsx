import { useEffect, useState } from 'react'
import { ChevronRight, Check, Bookmark, Play, Sigma, Beaker, Target, ArrowRight, Network } from 'lucide-react'
import { TOPIC_BY_ID, BRANCH_BY_ID, topicDerivations, topicProblems, topicExperiments, TOPIC_KEY_EQUATIONS, QUICK_CHECKS } from '../data'
import { SIMULATIONS } from '../data/simulations'
import { go } from '../lib/router'
import { progress, useProgress } from '../lib/store'
import { Blocks } from '../components/Blocks'
import { Math } from '../components/Math'
import { Simulator } from '../components/Simulator'

export function TopicPage({ id }: { id: string }) {
  const topic = TOPIC_BY_ID[id]
  const p = useProgress()
  const [quizOpen, setQuizOpen] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => { if (topic) progress.markStudying(topic.id) }, [id]) // eslint-disable-line

  if (!topic) return <div className="empty-state">Topic not found. <button className="btn btn-sm" onClick={() => go('/explore')}>Back to explore</button></div>
  const branch = BRANCH_BY_ID[topic.branchId]!
  const derivations = topicDerivations(id)
  const problems = topicProblems(id)
  const experiments = topicExperiments(id)
  const sims = SIMULATIONS.filter(s => topic.simulationIds?.includes(s.id) ||
    (topic.blocks ?? []).some(b => b.kind === 'sim' && b.sim === s.id))
  const headings = topic.blocks.filter(b => b.kind === 'heading' && b.level !== 3).map(b => (b as { text: string }).text)
  const related = Object.entries(TOPIC_KEY_EQUATIONS[id] ?? {})
  const isDeep = !topic.tags.includes('curriculum outline')

  return (
    <div>
      <div className="breadcrumb">
        <button onClick={() => go('/explore')}>Explore Physics</button><ChevronRight size={11} />
        <button onClick={() => go(`/branch/${branch.id}`)}>{branch.title}</button><ChevronRight size={11} />
        <span>{topic.title}</span>
      </div>
      <div className="topic-layout">
        <div>
          <div className="topic-hero">
            <div className="eyebrow" style={{ color: branch.color }}>{branch.part} · {topic.level}</div>
            <h1 style={{ fontSize: 'clamp(1.9rem,3.4vw,2.8rem)', margin: '12px 0' }}>{topic.title}</h1>
            <p className="lead" style={{ fontSize: 15 }}>{topic.summary}</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <span className="chip" style={{ borderColor: isDeep ? 'rgba(79,209,165,.4)' : undefined, color: isDeep ? '#4fd1a5' : undefined }}>{isDeep ? 'Long-form article' : 'Curriculum outline'}</span>
              {topic.tags.filter(t => t !== 'curriculum outline').slice(0, 4).map(t => <span className="chip" key={t}>{t}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <button className={`btn ${p.completed.includes(id) ? '' : 'btn-primary'} btn-sm`} onClick={() => progress.markComplete(id)}>
                <Check size={13} /> {p.completed.includes(id) ? 'Completed' : 'Mark complete'}
              </button>
              <button className="btn btn-sm" onClick={() => progress.toggle('bookmarks', id)}><Bookmark size={13} /> {p.bookmarks.includes(id) ? 'Saved' : 'Save'}</button>
              <button className="btn btn-sm" onClick={() => setQuizOpen(q => !q)}>Quick check</button>
            </div>
            {quizOpen && QUICK_CHECKS[id] && (
              <div className="card" style={{ padding: 14, marginTop: 14 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>Topic-specific quick check</div>
                <p style={{ color: '#c8d2e2', margin: '6px 0 10px', lineHeight: 1.7 }}>{QUICK_CHECKS[id].prompt}</p>
                <p className="subtle" style={{ fontSize: 11 }}>Write your explanation before revealing the model answer. Mastery means getting the reasoning right, not matching wording.</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                  <button className="btn btn-sm" onClick={() => setShowAnswer(s => !s)}>{showAnswer ? 'Hide model answer' : 'Reveal model answer'}</button>
                  <button className="btn btn-sm" onClick={() => { progress.recordQuiz(id, true); setQuizOpen(false); setShowAnswer(false) }}>I explained it correctly</button>
                  <button className="btn btn-sm" onClick={() => { progress.recordQuiz(id, false); go('/paths') }}>I need revision</button>
                </div>
                {showAnswer && <div className="callout insight" style={{ marginTop: 10 }}><div className="co-title">Model answer</div><p>{QUICK_CHECKS[id].answer}</p></div>}
              </div>
            )}
          </div>

          <article className="article"><Blocks blocks={topic.blocks} /></article>

          {related.length > 0 && (
            <div className="card" style={{ padding: 18, marginTop: 28 }}>
              <div className="panel-title"><h3>Equations to know</h3></div>
              {(TOPIC_KEY_EQUATIONS[id] ?? []).map((eq, i) => <div className="math-block" key={i}><Math tex={eq} display /></div>)}
            </div>
          )}

          {sims.length > 0 && <div className="section-head"><div><div className="eyebrow">Interactive</div><h2>Explore it dynamically</h2></div></div>}
          {sims.map(s => <Simulator key={s.id} simId={s.id} />)}
        </div>

        <aside className="toc">
          <div className="card toc-box" style={{ marginBottom: 14 }}>
            <h4>On this page</h4>
            {headings.map((h, i) => <a className="toc-link" href={`#${h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`} key={i} onClick={e => {
              const el = document.getElementById(h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
              if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
            }}>{h}</a>)}
          </div>

          <div className="card toc-box" style={{ marginBottom: 14 }}>
            <h4>Prerequisites</h4>
            {topic.prerequisites.length ? topic.prerequisites.map(pr => (
              <button className="toc-link" key={pr} onClick={() => go(`/topic/${pr}`)} style={{ display: 'block', width: '100%', textAlign: 'left', border: 0, background: 'none', cursor: 'pointer' }}>
                {pr.replace(/-/g, ' ')}
              </button>
            )) : <p className="subtle" style={{ fontSize: 11 }}>Start here — no prior topic required.</p>}
          </div>

          {derivations.length > 0 && <div className="card toc-box" style={{ marginBottom: 14 }}>
            <h4><Sigma size={12} style={{ verticalAlign: -2 }} /> Derivations</h4>
            {derivations.map(d => <button className="toc-link" key={d.id} style={{ display: 'block', width: '100%', textAlign: 'left', border: 0, background: 'none', cursor: 'pointer' }} onClick={() => go(`/derivation/${d.id}`)}>{d.title}</button>)}
          </div>}

          {experiments.length > 0 && <div className="card toc-box" style={{ marginBottom: 14 }}>
            <h4><Beaker size={12} style={{ verticalAlign: -2 }} /> Virtual experiments</h4>
            {experiments.map(e => <button className="toc-link" key={e.id} style={{ display: 'block', width: '100%', textAlign: 'left', border: 0, background: 'none', cursor: 'pointer' }} onClick={() => go(`/experiment/${e.id}`)}>{e.title}</button>)}
          </div>}

          {problems.length > 0 && <div className="card toc-box" style={{ marginBottom: 14 }}>
            <h4><Target size={12} style={{ verticalAlign: -2 }} /> Practice</h4>
            {problems.slice(0, 5).map(pr => <button className="toc-link" key={pr.id} style={{ display: 'block', width: '100%', textAlign: 'left', border: 0, background: 'none', cursor: 'pointer' }} onClick={() => go(`/problem/${pr.id}`)}>{pr.title}</button>)}
          </div>}

          <div className="card toc-box">
            <h4><Network size={12} style={{ verticalAlign: -2 }} /> Go deeper</h4>
            <button className="toc-link" style={{ display: 'block', width: '100%', textAlign: 'left', border: 0, background: 'none', cursor: 'pointer' }} onClick={() => go('/graph')}>Open knowledge graph</button>
            <button className="toc-link" style={{ display: 'block', width: '100%', textAlign: 'left', border: 0, background: 'none', cursor: 'pointer' }} onClick={() => go('/problems')}>Problem arena <ArrowRight size={10} /></button>
          </div>
        </aside>
      </div>
    </div>
  )
}
