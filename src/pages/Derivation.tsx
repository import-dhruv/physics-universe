import { ChevronRight, ArrowRight, Sigma, Ruler, FlaskConical, AlertTriangle, Compass } from 'lucide-react'
import { DERIVATION_BY_ID, TOPIC_BY_ID } from '../data'
import { go } from '../lib/router'
import { Math } from '../components/Math'
import { InlineText } from '../components/Blocks'

export function DerivationPage({ id }: { id: string }) {
  const d = DERIVATION_BY_ID[id]
  if (!d) return <div className="empty-state">Derivation not found. <button className="btn btn-sm" onClick={() => go('/mathematics')}>Browse derivations</button></div>
  const topic = TOPIC_BY_ID[d.topicId]
  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/mathematics')}>Derivations</button><ChevronRight size={11} /><span>{d.title}</span></div>
      <div className="eyebrow"><Sigma size={12} style={{ verticalAlign: -2 }} /> Step-by-step derivation</div>
      <h1 style={{ margin: '12px 0 14px', fontSize: 'clamp(1.8rem,3.2vw,2.6rem)' }}>{d.title}</h1>
      <div className="math-block" style={{ textAlign: 'center', fontSize: '1.15em' }}><Math tex={d.statement} display /></div>

      <div className="grid g2" style={{ marginTop: 22, alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem' }}>1. The physical problem</h2>
          <p style={{ color: '#c8d2e2', lineHeight: 1.8 }}><InlineText text={d.physicalProblem} /></p>

          <h2 style={{ fontSize: '1.3rem', marginTop: 28 }}>2. Assumptions</h2>
          <ul>{d.assumptions.map((a, i) => <li key={i}><InlineText text={a} /></li>)}</ul>

          <h2 style={{ fontSize: '1.3rem', marginTop: 28 }}>3. Variables & notation</h2>
          <table className="data-table">
            <thead><tr><th>Symbol</th><th>Meaning</th></tr></thead>
            <tbody>{d.variables.map((v, i) => <tr key={i}><td><Math tex={v.symbol} /></td><td><InlineText text={v.meaning} /></td></tr>)}</tbody>
          </table>

          <h2 style={{ fontSize: '1.3rem', marginTop: 28 }}>4. Mathematical tools required</h2>
          <ul>{d.tools.map((t, i) => <li key={i}><InlineText text={t} /></li>)}</ul>

          <h2 style={{ fontSize: '1.3rem', marginTop: 28 }}>5. Derivation, step by step</h2>
          <div className="steps-box">
            {d.steps.map((s, i) => (
              <div className="step" key={i}>
                <div className="step-n">{i + 1}</div>
                <div><h4>{s.title}</h4><p><InlineText text={s.text} /></p>{s.math && <div className="math-block"><Math tex={s.math} display /></div>}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card" style={{ padding: 18, marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, marginBottom: 10 }}><Ruler size={13} style={{ verticalAlign: -2 }} /> Dimensional analysis</h3>
            <p className="subtle" style={{ margin: 0, lineHeight: 1.7 }}><InlineText text={d.dimensions} /></p>
          </div>
          <div className="card" style={{ padding: 18, marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, marginBottom: 10 }}>Limiting cases</h3>
            <ul style={{ marginBottom: 0 }}>{d.limits.map((l, i) => <li key={i}><InlineText text={l} /></li>)}</ul>
          </div>
          <div className="card" style={{ padding: 18, marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, marginBottom: 10 }}><FlaskConical size={13} style={{ verticalAlign: -2 }} /> Numerical example</h3>
            <ul style={{ marginBottom: 0 }}>{d.examples.map((l, i) => <li key={i}><InlineText text={l} /></li>)}</ul>
          </div>
          <div className="card" style={{ padding: 18, marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, marginBottom: 10 }}>Where it is used</h3>
            <ul style={{ marginBottom: 0 }}>{d.applications.map((l, i) => <li key={i}><InlineText text={l} /></li>)}</ul>
          </div>
          <div className="callout warning">
            <div className="co-title"><AlertTriangle size={11} style={{ verticalAlign: -2 }} /> Limitations</div>
            <ul style={{ margin: 0 }}>{d.limitations.map((l, i) => <li key={i}><InlineText text={l} /></li>)}</ul>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 20, marginTop: 24, background: 'linear-gradient(135deg,rgba(110,168,255,.07),transparent)' }}>
        <div className="eyebrow">Physical meaning of the result</div>
        <h2 style={{ fontSize: 13, marginTop: 10 }}><InlineText text={d.result} /></h2>
        <p style={{ color: '#c8d2e2', lineHeight: 1.8, margin: 0 }}><InlineText text={d.interpretation} /></p>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {topic && <button className="btn btn-sm" onClick={() => go(`/topic/${topic.id}`)}><Compass size={13} /> Back to {topic.title}</button>}
          <button className="btn btn-sm" onClick={() => go('/problems')}>Practise this <ArrowRight size={13} /></button>
        </div>
      </div>
    </div>
  )
}
