import { Sigma, ArrowRight, Calculator } from 'lucide-react'
import { BRANCHES, DERIVATIONS, ALL_TOPICS } from '../data'
import { go } from '../lib/router'

export function MathematicsPage() {
  const mathBranches = BRANCHES.filter(b => b.part.startsWith('I ·'))
  const mathTopicIds = new Set(mathBranches.flatMap(b => b.topicIds))
  const derivations = DERIVATIONS.filter(d => mathTopicIds.has(d.topicId))
  return (
    <div>
      <div className="eyebrow">Part I · Mathematical foundations</div>
      <h1 style={{ margin: '12px 0 10px' }}>The Language of Physics</h1>
      <p className="lead">Mathematics is not a tool bolted onto physics — it is the structure physical law is written in. Every concept below is taught with its physical meaning and the phenomena it describes.</p>

      <div className="section-head"><div><div className="eyebrow">Foundations</div><h2>Four mathematical pillars</h2></div></div>
      <div className="grid g4">
        {mathBranches.map(b => (
          <button className="card card-hover" key={b.id} onClick={() => go(`/branch/${b.id}`)} style={{ padding: 18, textAlign: 'left' }}>
            <div className="bt-icon" style={{ background: `${b.color}18`, color: b.color, marginBottom: 12 }}><Sigma size={16} /></div>
            <h3 style={{ fontSize: 13 }}>{b.title}</h3>
            <p className="subtle" style={{ lineHeight: 1.6, margin: '6px 0 0' }}>{b.description}</p>
            <div className="subtle" style={{ marginTop: 12, fontSize: 10 }}>{b.topicIds.length} topics <ArrowRight size={10} style={{ verticalAlign: -1 }} /></div>
          </button>
        ))}
      </div>

      <div className="section-head"><div><div className="eyebrow">Derivations</div><h2>Mathematical derivations</h2></div><span className="subtle">{derivations.length} available</span></div>
      <div className="grid g3">
        {derivations.map(d => (
          <button className="card card-hover" key={d.id} onClick={() => go(`/derivation/${d.id}`)} style={{ padding: 16, textAlign: 'left' }}>
            <Calculator size={15} color="#8b7cff" style={{ marginBottom: 10 }} />
            <h3 style={{ fontSize: 13, marginBottom: 6 }}>{d.title}</h3>
            <p className="subtle" style={{ margin: 0, lineHeight: 1.55 }}>{d.physicalProblem.slice(0, 130)}…</p>
          </button>
        ))}
      </div>

      <div className="section-head"><div><div className="eyebrow">Physical significance</div><h2>Where the mathematics is used</h2></div></div>
      <div className="grid g2">
        <div className="card panel">
          <h3 style={{ fontSize: 13 }}>Calculus → Field theory</h3>
          <p className="subtle" style={{ lineHeight: 1.7 }}>Gradient, divergence and curl are the local language of Maxwell’s equations, fluid flow and gravitation. The divergence theorem converts local differential laws into global conservation statements.</p>
          <button className="btn btn-sm" onClick={() => go('/derivation/f-der-gauss-law')}>See a derivation <ArrowRight size={12} /></button>
        </div>
        <div className="card panel">
          <h3 style={{ fontSize: 13 }}>Linear algebra → Quantum mechanics</h3>
          <p className="subtle" style={{ lineHeight: 1.7 }}>Observables are Hermitian operators on Hilbert space; measurable values are eigenvalues; compatible observables share eigenbases. The whole formalism is linear algebra in infinite dimensions.</p>
          <button className="btn btn-sm" onClick={() => go('/topic/eigenvalues-eigenvectors')}>Explore eigenvalues <ArrowRight size={12} /></button>
        </div>
        <div className="card panel">
          <h3 style={{ fontSize: 13 }}>Group theory → The Standard Model</h3>
          <p className="subtle" style={{ lineHeight: 1.7 }}>Gauge symmetries are Lie groups; particles are representations; conserved charges come from generators. Noether’s theorem links symmetry to conservation.</p>
          <button className="btn btn-sm" onClick={() => go('/derivation/q-der-noether')}>Noether's theorem <ArrowRight size={12} /></button>
        </div>
        <div className="card panel">
          <h3 style={{ fontSize: 13 }}>Differential equations → Dynamics</h3>
          <p className="subtle" style={{ lineHeight: 1.7 }}>Every deterministic physical law is expressed as an equation of motion. ODEs govern particles; PDEs govern fields, waves and continuous media.</p>
          <button className="btn btn-sm" onClick={() => go('/topic/differential-equations')}>Read the article <ArrowRight size={12} /></button>
        </div>
      </div>

      <div className="section-head"><div><div className="eyebrow">Curriculum</div><h2>All mathematical topics</h2></div></div>
      <div className="grid g4">
        {ALL_TOPICS.filter(t => mathTopicIds.has(t.id)).map(t => (
          <button className="card card-hover" key={t.id} onClick={() => go(`/topic/${t.id}`)} style={{ padding: 14, textAlign: 'left' }}>
            <div className="subtle" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>{BRANCHES.find(b => b.id === t.branchId)?.short}</div>
            <h3 style={{ fontSize: 12.5 }}>{t.title}</h3>
          </button>
        ))}
      </div>
    </div>
  )
}
