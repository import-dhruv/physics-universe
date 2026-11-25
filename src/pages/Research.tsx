import { useState } from 'react'
import { ChevronRight, Telescope, BookOpen, ArrowRight, ExternalLink } from 'lucide-react'
import { FRONTIERS, TIMELINE, SCIENTISTS, REFERENCES, BRANCH_BY_ID, PAPER_STATS, PAPERS_BY_FRONTIER } from '../data'
import { go } from '../lib/router'
import { InlineText } from '../components/Blocks'

const statusClass = (s: string) => s === 'Established' ? 'established' : s === 'Active hypothesis' ? 'active' : s === 'Open problem' ? 'open' : 'speculative'

export function ResearchPage({ focus }: { focus?: string }) {
  const [q, setQ] = useState('')
  const list = FRONTIERS.filter(f => !q || `${f.title} ${f.field} ${f.summary}`.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <div className="eyebrow">Research & frontier explorer</div>
      <h1 style={{ margin: '12px 0 10px' }}>The Edge of What We Know</h1>
      <p className="lead">Established theory, active hypotheses, open problems and speculation are labelled separately. The goal is not to admire mystery but to understand exactly where the evidence stops and how one might extend it.</p>

      <button className="card card-hover" onClick={() => go('/papers')} style={{ padding: 20, textAlign: 'left', marginTop: 22, width: '100%', background: 'linear-gradient(120deg,rgba(110,168,255,.09),rgba(139,124,255,.05))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div><div className="eyebrow">Open-access literature</div><h2 style={{ fontSize: '1.4rem', margin: '8px 0 6px' }}>Research Papers · {PAPER_STATS.total.toLocaleString()} real preprints</h2>
            <p className="subtle" style={{ margin: 0, maxWidth: '70ch' }}>Verified arXiv metadata across {PAPER_STATS.categories} mathematics and physics categories. Search by title, author, abstract or topic and follow the original source link.</p></div>
          <ArrowRight size={22} color="#6ea8ff" />
        </div>
      </button>

      <div className="grid g4" style={{ marginTop: 22 }}>
        {[
          ['Established', 'Repeatedly confirmed; part of the working framework.'],
          ['Active hypothesis', 'Well-motivated, under active experimental or theoretical test.'],
          ['Open problem', 'A clearly defined question with no accepted solution.'],
          ['Speculative', 'Possible but lacking decisive evidence — labeled explicitly.'],
        ].map(([s, d]) => <div className="card metric" key={s}><span className={`tag-status ${statusClass(s)}`}>{s}</span><p className="subtle" style={{ margin: '10px 0 0', lineHeight: 1.6 }}>{d}</p></div>)}
      </div>

      <div className="section-head"><div><div className="eyebrow">Research skills</div><h2>How to do physics research</h2></div></div>
      <div className="grid g3">
        {[
          ['Read a research paper', 'Identify the question, the approximation, the observable and the claim. Separate the result from the rhetorical framing.', '/library'],
          ['Reproduce a computation', 'Recover the algorithm from the paper, implement it independently, and compare numerical outputs and convergence.', '/branch/computational-physics'],
          ['Design an experiment', 'Translate a hypothesis into a measurable prediction, identify systematics, and decide what result would falsify it.', '/experiments'],
          ['Write it up', 'State the question, method, assumptions, uncertainty and limitation before the conclusion.', '/library'],
          ['Formulate a question', 'A good research question is answerable, nontrivial and connected to an unresolved gap in the literature.', '/graph'],
          ['Verify against evidence', 'Check every claim against data, not authority. Track which statements are derivation, approximation or conjecture.', '/research'],
        ].map(([t, d, path]) => (
          <button className="card card-hover" key={t} onClick={() => go(path)} style={{ padding: 16, textAlign: 'left' }}>
            <BookOpen size={16} color="#c79cff" style={{ marginBottom: 10 }} />
            <h3 style={{ fontSize: 13 }}>{t}</h3><p className="subtle" style={{ margin: 0, lineHeight: 1.6 }}>{d}</p>
          </button>
        ))}
      </div>

      <div className="section-head"><div><div className="eyebrow">Frontiers</div><h2>Unresolved questions</h2></div></div>
      <div className="filter-bar">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Filter frontiers…"
          style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', color: '#fff', outline: 0 }} />
        <span className="subtle">{list.length} topics</span>
      </div>
      <div className="grid g2">
        {list.map(f => (
          <button className="card card-hover" key={f.id} onClick={() => go(`/research/${f.id}`)} style={{ padding: 18, textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
              <span className={`tag-status ${statusClass(f.status)}`}>{f.status}</span><span className="subtle" style={{ fontSize: 10 }}>{f.field}</span>
            </div>
            <h3 style={{ fontSize: 15, marginBottom: 8 }}>{f.title}</h3>
            <p className="subtle" style={{ margin: 0, lineHeight: 1.65 }}>{f.summary.slice(0, 220)}…</p>
          </button>
        ))}
      </div>
      {focus && <div className="callout note" style={{ marginTop: 20 }}><div className="co-title">Context</div>Use the frontier cards above to explore specific open questions. Every card separates evidence from conjecture.</div>}
    </div>
  )
}

export function FrontierPage({ id }: { id: string }) {
  const f = FRONTIERS.find(x => x.id === id)
  if (!f) return <div className="empty-state">Frontier not found. <button className="btn btn-sm" onClick={() => go('/research')}>All frontiers</button></div>
  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/research')}>Research Explorer</button><ChevronRight size={11} /><span>{f.title}</span></div>
      <div style={{ display: 'flex', gap: 8 }}><span className={`tag-status ${statusClass(f.status)}`}>{f.status}</span><span className="chip">{f.field}</span></div>
      <h1 style={{ margin: '14px 0' }}>{f.title}</h1>
      <p className="lead">{f.summary}</p>
      <div className="section-head"><div><div className="eyebrow">Open questions</div><h2 style={{ fontSize: '1.3rem' }}>What we do not yet know</h2></div></div>
      <div className="card panel">{f.questions.map((q, i) => <div className="mini-item" key={i}><span className="mi-num">{String(i + 1).padStart(2, '0')}</span><div className="mi-title" style={{ fontWeight: 500, lineHeight: 1.6 }}><InlineText text={q} /></div></div>)}</div>
      <div className="section-head"><div><div className="eyebrow">Starting points</div><h2 style={{ fontSize: '1.3rem' }}>Related knowledge</h2></div></div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {f.topicIds.map(tid => <button className="chip" key={tid} style={{ cursor: 'pointer' }} onClick={() => go(`/topic/${tid}`)}>{tid.replace(/-/g, ' ')} <ArrowRight size={10} /></button>)}
      </div>
      {(() => { const fps = PAPERS_BY_FRONTIER.get(f.id) ?? []; return fps.length > 0 ? <>
        <div className="section-head"><div><div className="eyebrow">Live literature</div><h2 style={{ fontSize: '1.3rem' }}>Recent open-access papers</h2></div><button className="btn btn-sm" onClick={() => go('/papers')}>Browse all <ArrowRight size={12} /></button></div>
        <div className="grid g2">{fps.slice(0, 6).map(p => <button className="card" key={p.id} onClick={() => go(`/paper/${p.id}`)} style={{ padding: 14, textAlign: 'left' }}><h3 style={{ fontSize: 12.5, lineHeight: 1.45 }}>{p.title}</h3><div className="subtle" style={{ fontSize: 10.5, marginTop: 6 }}>{p.authors.slice(0, 3).join(', ')} · {p.published}</div></button>)}</div>
      </> : null })()}
      {f.references.length > 0 && <><div className="section-head"><div><div className="eyebrow">Literature</div><h2 style={{ fontSize: '1.3rem' }}>Open-access pointers</h2></div></div>
        <div className="card panel">{f.references.map((r, i) => <div className="mini-item" key={i}><ExternalLink size={13} color="#6ea8ff" /><div className="mi-title" style={{ fontWeight: 500 }}>{r.startsWith('http') ? <a href={r} target="_blank" rel="noreferrer">{r}</a> : r}</div></div>)}</div>
      </>}
    </div>
  )
}

export function HistoryPage({ focus }: { focus?: string }) {
  const [era, setEra] = useState('All')
  const eras = ['All', 'Ancient & medieval', 'Scientific revolution', '19th century', '20th century', 'Modern']
  const eraOf = (year: string) => {
    const n = parseInt(year.replace(/[^\d-]/g, '').slice(0, 4) || '0', 10)
    if (n < 1500) return 'Ancient & medieval'
    if (n < 1800) return 'Scientific revolution'
    if (n < 1900) return '19th century'
    if (n < 2000) return '20th century'
    return 'Modern'
  }
  const events = TIMELINE.filter(e => era === 'All' || eraOf(e.year) === era)
  const scientist = focus ? SCIENTISTS.find(s => s.id === focus) : null
  if (scientist) return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/history')}>History of Physics</button><ChevronRight size={11} /><span>{scientist.name}</span></div>
      <div className="eyebrow">{scientist.field} · {scientist.years}</div>
      <h1 style={{ margin: '12px 0' }}>{scientist.name}</h1>
      <p className="lead">{scientist.contribution}</p>
      {scientist.quote && <blockquote className="quote">“{scientist.quote}”</blockquote>}
      <div className="section-head"><div><div className="eyebrow">Connected topics</div><h2 style={{ fontSize: '1.2rem' }}>Their ideas in the curriculum</h2></div></div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{scientist.topicIds.map(t => <button className="chip" key={t} style={{ cursor: 'pointer' }} onClick={() => go(`/topic/${t}`)}>{t.replace(/-/g, ' ')} <ArrowRight size={10} /></button>)}</div>
    </div>
  )
  return (
    <div>
      <div className="eyebrow">History & great experiments</div>
      <h1 style={{ margin: '12px 0 10px' }}>How Physics Became Physics</h1>
      <p className="lead">Theories did not arrive fully formed. They emerged from arguments about evidence, instruments, and the meaning of measurement. {TIMELINE.length} milestones and {SCIENTISTS.length} figures.</p>
      <div className="filter-bar" style={{ marginTop: 20 }}>
        {eras.map(e => <button key={e} className={`chip ${era === e ? 'chip-active' : ''}`} style={{ cursor: 'pointer', borderColor: era === e ? '#6ea8ff' : undefined }} onClick={() => setEra(e)}>{e}</button>)}
      </div>
      <div className="grid g2" style={{ alignItems: 'start' }}>
        <div className="card panel">
          <div className="panel-title"><h3><Telescope size={13} style={{ verticalAlign: -2 }} /> Interactive timeline</h3></div>
          <div className="timeline">{events.map(e => <div className="tl-event" key={e.id}>
            <div className="tl-year">{e.year}</div><div className="tl-title">{e.title}</div><div className="tl-desc">{e.description}</div>
            {e.branchId && BRANCH_BY_ID[e.branchId] && <button className="chip" style={{ cursor: 'pointer', marginTop: 6 }} onClick={() => go(`/branch/${e.branchId}`)}>{BRANCH_BY_ID[e.branchId].short}</button>}
          </div>)}</div>
        </div>
        <div>
          <div className="card panel" style={{ marginBottom: 14 }}>
            <div className="panel-title"><h3>Physicists & thinkers</h3></div>
            <div className="grid g2" style={{ gap: 8 }}>
              {SCIENTISTS.map(s => <button className="mini-item" key={s.id} style={{ textAlign: 'left', cursor: 'pointer', border: 0, background: 'none', color: 'inherit' }} onClick={() => go(`/history/${s.id}`)}>
                <div><div className="mi-title">{s.name}</div><div className="mi-sub">{s.years} · {s.field}</div></div>
              </button>)}
            </div>
          </div>
          <div className="card panel">
            <div className="panel-title"><h3>Historical source readings</h3></div>
            {REFERENCES.filter(r => r.type === 'Historical paper').slice(0, 6).map(r => <div className="mini-item" key={r.id}>
              <div><div className="mi-title">{r.title}</div><div className="mi-sub">{r.authors} · {r.year}</div><a href={r.url} target="_blank" rel="noreferrer" className="mi-sub" style={{ color: '#6ea8ff' }}>Open source ↗</a></div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
