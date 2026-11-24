import { useState } from 'react'
import { Atom, Play, ArrowRight } from 'lucide-react'
import { SIMULATIONS, SIM_BY_ID } from '../data/simulations'
import { BRANCH_BY_ID, BRANCHES } from '../data'
import { go } from '../lib/router'
import { Simulator } from '../components/Simulator'
import { Math } from '../components/Math'

export function LabPage() {
  const [featured, setFeatured] = useState('projectile-motion')
  const groups = BRANCHES.filter(b => SIMULATIONS.some(s => s.branchId === b.id))
  return (
    <div>
      <div className="eyebrow">Visual physics engine</div>
      <h1 style={{ margin: '12px 0 10px' }}>The Visual Laboratory</h1>
      <p className="lead">Manipulate physical parameters and watch the consequences in real time. Every simulation computes from the governing equations — it is not an animation of a predetermined result.</p>

      <div className="section-head"><div><div className="eyebrow">Featured experiment</div><h2>{SIM_BY_ID[featured].title}</h2></div><button className="btn btn-sm" onClick={() => go(`/simulation/${featured}`)}>Full view <ArrowRight size={13} /></button></div>
      <Simulator key={featured} simId={featured} />

      <div className="section-head"><div><div className="eyebrow">All simulations</div><h2>Choose an experiment</h2></div><span className="subtle">{SIMULATIONS.length} interactive models</span></div>
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 16 }}>
        {SIMULATIONS.map(s => <button key={s.id} className={`chip ${featured === s.id ? 'chip-active' : ''}`} style={{ cursor: 'pointer', borderColor: featured === s.id ? '#4fd1a5' : undefined, color: featured === s.id ? '#4fd1a5' : undefined }} onClick={() => { setFeatured(s.id); window.scrollTo({ top: 220, behavior: 'smooth' }) }}>{s.title}</button>)}
      </div>

      {groups.map(b => (
        <div key={b.id} style={{ marginBottom: 26 }}>
          <div className="section-head" style={{ margin: '0 0 12px' }}><div><div className="eyebrow" style={{ color: b.color }}>{b.short}</div><h2 style={{ fontSize: '1.15rem' }}>{b.title}</h2></div></div>
          <div className="grid g3">
            {SIMULATIONS.filter(s => s.branchId === b.id).map(s => (
              <button className="card card-hover" key={s.id} onClick={() => { setFeatured(s.id); window.scrollTo({ top: 200, behavior: 'smooth' }) }} style={{ padding: 16, textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span className="bt-icon" style={{ width: 26, height: 26, margin: 0, background: `${b.color}18`, color: b.color }}><Atom size={13} /></span>
                  <h3 style={{ fontSize: 13 }}>{s.title}</h3>
                </div>
                <p className="subtle" style={{ margin: 0, lineHeight: 1.55 }}>{s.description}</p>
                <div className="subtle" style={{ marginTop: 12, fontSize: 10, display: 'flex', alignItems: 'center', gap: 5 }}><Play size={10} /> {s.controls.length} controls</div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function SimulationPage({ id }: { id: string }) {
  const s = SIM_BY_ID[id]
  if (!s) return <div className="empty-state">Simulation not found. <button className="btn btn-sm" onClick={() => go('/lab')}>Visual lab</button></div>
  const branch = BRANCH_BY_ID[s.branchId]
  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/lab')}>Visual Laboratory</button><span>/</span><span>{s.title}</span></div>
      <div className="eyebrow" style={{ color: branch?.color }}>{branch?.title} · Interactive simulation</div>
      <h1 style={{ margin: '12px 0 10px' }}>{s.title}</h1>
      <p className="lead">{s.description}</p>
      <Simulator simId={id} />
      <div className="grid g2" style={{ marginTop: 20 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Governing equations</h3></div>
          {s.equations.map((eq, i) => <div className="math-block" key={i}><Math tex={eq} display /></div>)}
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>How to read it</h3></div>
          <ul>{s.reading.map((r, i) => <li key={i} style={{ color: '#c8d2e2', lineHeight: 1.7 }}>{r}</li>)}</ul>
        </div>
      </div>
      {branch && <div style={{ marginTop: 20 }}><button className="btn" onClick={() => go(`/branch/${branch.id}`)}>Study the theory <ArrowRight size={13} /></button></div>}
    </div>
  )
}
