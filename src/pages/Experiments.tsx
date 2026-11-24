import { useState } from 'react'
import { ChevronRight, FlaskConical, Target, Microscope, AlertTriangle } from 'lucide-react'
import { EXPERIMENTS, EXPERIMENT_BY_ID, TOPIC_BY_ID } from '../data'
import { SIM_BY_ID } from '../data/simulations'
import { go } from '../lib/router'
import { Blocks } from '../components/Blocks'
import { Simulator } from '../components/Simulator'
import { InlineText } from '../components/Blocks'

export function ExperimentsPage() {
  const [q, setQ] = useState('')
  const list = EXPERIMENTS.filter(e => !q || `${e.title} ${e.objective}`.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <div className="eyebrow">Virtual physics laboratory</div>
      <h1 style={{ margin: '12px 0 10px' }}>Experiments</h1>
      <p className="lead">Each experiment presents the historical question, apparatus, theory, adjustable parameters, simulated measurements and a genuine analysis workflow — not a video of someone else doing physics.</p>
      <div className="filter-bar" style={{ marginTop: 20 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search experiments…"
          style={{ flex: '1 1 280px', maxWidth: 380, background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', color: '#fff', outline: 0 }} />
        <span className="subtle">{list.length} experiments</span>
      </div>
      <div className="grid g3">
        {list.map(e => (
          <button className="card card-hover" key={e.id} onClick={() => go(`/experiment/${e.id}`)} style={{ padding: 18, textAlign: 'left' }}>
            <FlaskConical size={18} color="#4fd1a5" style={{ marginBottom: 12 }} />
            <div className="subtle" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 6 }}>{e.era}</div>
            <h3 style={{ fontSize: 14, marginBottom: 8 }}>{e.title}</h3>
            <p className="subtle" style={{ margin: 0, lineHeight: 1.6 }}>{e.objective}</p>
            <div style={{ marginTop: 14 }} className="chip">Open experiment →</div>
          </button>
        ))}
      </div>
      {list.length === 0 && <div className="empty-state">No experiments match that search.</div>}
    </div>
  )
}

export function ExperimentPage({ id }: { id: string }) {
  const e = EXPERIMENT_BY_ID[id]
  const [reveal, setReveal] = useState(false)
  if (!e) return <div className="empty-state">Experiment not found. <button className="btn btn-sm" onClick={() => go('/experiments')}>All experiments</button></div>
  const topic = TOPIC_BY_ID[e.topicId]
  const sim = e.simulationId && SIM_BY_ID[e.simulationId] ? e.simulationId : undefined
  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/experiments')}>Experiments</button><ChevronRight size={11} /><span>{e.title}</span></div>
      <div className="eyebrow">{e.era} · Virtual laboratory</div>
      <h1 style={{ margin: '12px 0 10px' }}>{e.title}</h1>
      <p className="lead">{e.objective}</p>
      {topic && <button className="chip" style={{ cursor: 'pointer', marginTop: 12 }} onClick={() => go(`/topic/${topic.id}`)}>{topic.title} →</button>}

      <div className="grid g2" style={{ marginTop: 26, alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem' }}>Historical background</h2>
          <p style={{ color: '#c8d2e2', lineHeight: 1.8 }}><InlineText text={e.background} /></p>

          <h2 style={{ fontSize: '1.3rem', marginTop: 26 }}>Theory & mathematical model</h2>
          <article className="article"><Blocks blocks={e.theory} /></article>

          <h2 style={{ fontSize: '1.3rem', marginTop: 26 }}>Apparatus</h2>
          <ul>{e.apparatus.map((a, i) => <li key={i}><InlineText text={a} /></li>)}</ul>

          <h2 style={{ fontSize: '1.3rem', marginTop: 26 }}>Procedure</h2>
          <ol>{e.procedure.map((a, i) => <li key={i}><InlineText text={a} /></li>)}</ol>
        </div>
        <div>
          <div className="card" style={{ padding: 18, marginBottom: 14 }}>
            <div className="panel-title"><h3><Microscope size={13} style={{ verticalAlign: -2 }} /> Adjustable parameters</h3></div>
            {e.parameters.length ? e.parameters.map(p => (
              <div className="control" key={p.key}>
                <label><span>{p.label}</span><b>{p.value} {p.unit}</b></label>
                <input type="range" min={p.min} max={p.max} step={p.step} defaultValue={p.value} disabled title="Use the linked interactive simulation to vary this live" />
              </div>
            )) : <p className="subtle">Parameters are described in the theory section.</p>}
            <p className="subtle" style={{ fontSize: 10.5, margin: 0 }}>Live control is available in the linked simulation below; this panel documents the experimental ranges.</p>
          </div>
          <div className="card" style={{ padding: 18, marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, marginBottom: 10 }}><Target size={13} style={{ verticalAlign: -2 }} /> Observation table</h3>
            <table className="data-table">
              <thead><tr>{e.measurementLabels.map((l, i) => <th key={i}>{l}</th>)}</tr></thead>
              <tbody>{[1, 2, 3, 4].map(r => <tr key={r}>{e.measurementLabels.map((_, i) => <td key={i}>—</td>)}</tr>)}</tbody>
            </table>
            <p className="subtle" style={{ fontSize: 10.5 }}>Record simulated readings in the live simulation, then compare with theory.</p>
          </div>
          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ fontSize: 13, marginBottom: 10 }}><AlertTriangle size={13} style={{ verticalAlign: -2 }} /> Analysis & uncertainty</h3>
            <ul style={{ marginBottom: 0 }}>{e.analysis.map((a, i) => <li key={i}><InlineText text={a} /></li>)}</ul>
          </div>
        </div>
      </div>

      {sim && <><div className="section-head"><div><div className="eyebrow">Run it</div><h2>Interactive apparatus</h2></div></div><Simulator simId={sim} /></>}

      <div className="card" style={{ padding: 20, marginTop: 20 }}>
        <div className="panel-title"><h3>Post-experimental questions</h3><button className="btn btn-sm" onClick={() => setReveal(r => !r)}>{reveal ? 'Hide notes' : 'Reveal guidance'}</button></div>
        <ol>{e.questions.map((q, i) => <li key={i} style={{ marginBottom: 8, color: '#c8d2e2', lineHeight: 1.7 }}><InlineText text={q} />{reveal && <div className="callout note" style={{ marginTop: 6 }}><div className="co-title">Approach</div>Identify the measured quantities, write the governing equation, substitute your recorded values with units, and estimate the dominant uncertainty before comparing with theory.</div>}</li>)}</ol>
      </div>
    </div>
  )
}
