import { useMemo, useState } from 'react'
import { Bot, Send, Sparkles, AlertTriangle, BookOpen, FlaskConical, Sigma, Eye, Telescope } from 'lucide-react'
import { ALL_TOPICS, DERIVATIONS, EXPERIMENTS, PROBLEMS, FRONTIERS, TOPIC_BY_ID } from '../data'
import { go } from '../lib/router'
import { Math } from '../components/Math'

const MODES = [
  { id: 'intuitive', label: 'Intuitive', icon: Eye },
  { id: 'visual', label: 'Visual', icon: Sparkles },
  { id: 'mathematical', label: 'Mathematical', icon: Sigma },
  { id: 'theoretical', label: 'Theoretical', icon: BookOpen },
  { id: 'experimental', label: 'Experimental', icon: FlaskConical },
  { id: 'research', label: 'Research-level', icon: Telescope },
]

// Deliberately conservative: only well-known, unambiguous misconceptions.
const MISCONCEPTIONS: { pattern: RegExp; correction: string }[] = [
  { pattern: /(centrifugal.*(real|outward).*force|force.*outwards.*circular)/i,
    correction: 'In an inertial frame there is no real outward force in uniform circular motion. The acceleration is inward (v²/r) and is supplied by a real inward force. The "centrifugal force" appears only when you describe the motion from a rotating, non-inertial frame.' },
  { pattern: /(electron.*(orbit|circle).*nucleus.*like.*planet|planetary.*electron)/i,
    correction: 'Electrons are not tiny planets on definite orbits. The quantum state is a wavefunction whose squared amplitude gives a probability density; stationary states have no classical trajectory.' },
  { pattern: /(heavier.*(fall|falls).*faster.*vacuum)/i,
    correction: 'In vacuum, all bodies fall with the same acceleration regardless of mass — the equivalence of inertial and gravitational mass. Air resistance, not gravity, causes everyday differences.' },
  { pattern: /(constant speed.*circular motion.*no acceleration|no acceleration.*circular)/i,
    correction: 'Constant speed does not mean zero acceleration. Acceleration is the rate of change of velocity, and direction changes in circular motion even when speed does not.' },
  { pattern: /(entropy.*(disorder|chaos))/i,
    correction: '"Disorder" is a useful analogy but not a definition. Entropy counts the number of microscopic arrangements compatible with a macrostate, S = k ln Ω — a statistical, quantitative statement.' },
  { pattern: /(light.*(needs|needs a).*medium|luminiferous ether)/i,
    correction: 'Light does not require a material medium. Maxwell’s equations give a wave speed c = 1/√(ε₀μ₀) independent of any ether; Michelson–Morley found no ether wind.' },
  { pattern: /(quantum tunneling.*(impossible|violates energy conservation))/i,
    correction: 'Tunneling does not violate energy conservation. The wavefunction decays inside a barrier where E < V₀; the transmitted particle emerges with the same total energy, with a probability set by the barrier.' },
]

function score(text: string, q: string) {
  const words = q.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2)
  const hay = text.toLowerCase()
  return words.reduce((s, w) => s + (hay.includes(w) ? 1 : 0), 0)
}

export function TutorPage() {
  const [question, setQuestion] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [mode, setMode] = useState('intuitive')

  const result = useMemo(() => {
    if (!submitted.trim()) return null
    const candidates = [
      ...ALL_TOPICS.map(t => ({ kind: 'topic' as const, title: t.title, text: `${t.title} ${t.summary} ${t.blocks.map(b => 'text' in b ? b.text : 'latex' in b ? b.latex : '').join(' ')}`, item: t })),
      ...DERIVATIONS.map(d => ({ kind: 'derivation' as const, title: d.title, text: `${d.title} ${d.physicalProblem} ${d.steps.map(s => s.text).join(' ')}`, item: d })),
      ...EXPERIMENTS.map(e => ({ kind: 'experiment' as const, title: e.title, text: `${e.title} ${e.objective} ${e.background}`, item: e })),
      ...PROBLEMS.map(p => ({ kind: 'problem' as const, title: p.title, text: `${p.title} ${p.statement}`, item: p })),
      ...FRONTIERS.map(f => ({ kind: 'frontier' as const, title: f.title, text: `${f.title} ${f.summary}`, item: f })),
    ]
    const ranked = candidates.map(c => ({ ...c, s: score(c.text, submitted) })).filter(c => c.s > 0).sort((a, b) => b.s - a.s).slice(0, 3)
    return { ranked, flags: MISCONCEPTIONS.filter(m => m.pattern.test(submitted)).map(m => m.correction) }
  }, [submitted])

  const ask = () => setSubmitted(question)

  return (
    <div>
      <div className="eyebrow">Physics tutor · multiple explanation modes</div>
      <h1 style={{ margin: '12px 0 10px' }}>Ask the Tutor</h1>
      <p className="lead">A local, retrieval-based study assistant grounded in the platform’s own articles. It finds the relevant material and presents it at the level you ask for, and it will challenge a statement if it matches a known misconception. It is not a generative model and does not invent answers.</p>

      <div className="card" style={{ padding: 18, marginTop: 22 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={question} onChange={e => setQuestion(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') ask() }}
            placeholder="Ask anything — e.g. “why is the sky blue?” or “explain entropy”"
            style={{ flex: 1, background: '#0b1019', border: '1px solid var(--border)', borderRadius: 8, padding: '11px 13px', color: '#fff', outline: 0 }} />
          <button className="btn btn-primary" onClick={ask}><Send size={14} /> Ask</button>
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 12 }}>
          {MODES.map(m => <button key={m.id} className={`chip ${mode === m.id ? 'chip-active' : ''}`} style={{ cursor: 'pointer', borderColor: mode === m.id ? '#6ea8ff' : undefined }} onClick={() => setMode(m.id)}><m.icon size={11} /> {m.label}</button>)}
        </div>
      </div>

      {result && (
        <div style={{ marginTop: 20 }}>
          {result.flags.length > 0 && <div className="callout warning">
            <div className="co-title"><AlertTriangle size={12} style={{ verticalAlign: -2 }} /> Let's check that premise</div>
            {result.flags.map((f, i) => <p key={i}>{f}</p>)}
          </div>}
          {result.ranked.length === 0 ? (
            <div className="empty-state">I could not find a grounded match in the knowledge base for that question. Try a more specific physics term — for example “tunneling”, “Lorentz transformation”, “Maxwell equations”, “band theory” or “Friedmann”.</div>
          ) : result.ranked.map((r, i) => {
            const t = r.kind === 'topic' ? (r.item as { id: string }) : undefined
            const topic = t ? TOPIC_BY_ID[t.id] : undefined
            const paras = topic?.blocks.filter(b => b.kind === 'paragraph') ?? []
            const maths = topic?.blocks.filter(b => b.kind === 'math') ?? []
            const callouts = topic?.blocks.filter(b => b.kind === 'callout') ?? []
            const steps = topic?.blocks.filter(b => b.kind === 'steps') ?? []
            const sims = topic?.blocks.filter(b => b.kind === 'sim') ?? []
            const exps = topic ? EXPERIMENTS.filter(e => e.topicId === topic.id) : []
            const fr = FRONTIERS.filter(f => topic?.prerequisites.includes(f.id) || f.topicIds.includes(topic?.id ?? ''))
            return (
              <div className="card" key={i} style={{ padding: 20, marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                  <div className="eyebrow">{r.kind} · match #{i + 1}</div>
                  {t && <button className="btn btn-sm" onClick={() => go(`/topic/${t.id}`)}>Open article →</button>}
                </div>
                <h2 style={{ fontSize: '1.3rem', margin: '10px 0 12px' }}>{r.title}</h2>
                {mode === 'intuitive' && <>
                  <p style={{ color: '#c8d2e2', lineHeight: 1.8 }}>{paras[0] && 'text' in paras[0] ? paras[0].text : (r.item as { summary?: string }).summary ?? r.text.slice(0, 400)}</p>
                  {callouts.filter(c => c.tone === 'insight').slice(0, 2).map((c, j) => <div className="callout insight" key={j}><div className="co-title">Physical intuition</div><p>{'text' in c ? c.text : ''}</p></div>)}
                </>}
                {mode === 'visual' && <>
                  <p className="subtle">Use the live simulations below to see how the system responds when you change parameters. Watch a single variable at a time.</p>
                  {sims.map((s, j) => <div className="chip" key={j} style={{ marginRight: 6 }}>{'sim' in s ? s.sim : ''}</div>)}
                  {(sims.length === 0) && <p className="subtle">No simulation is linked to this topic yet; the article explains the concept with diagrams and mathematical structure.</p>}
                </>}
                {mode === 'mathematical' && <>
                  {maths.slice(0, 4).map((m, j) => <div className="math-block" key={j}><Math tex={'latex' in m ? m.latex : ''} display /></div>)}
                  {steps.slice(0, 1).map((s, j) => <div className="steps-box" key={j}>{'items' in s && s.items.map((it, k) => <div className="step" key={k}><div className="step-n">{k + 1}</div><div><h4>{it.title}</h4><p>{it.text}</p>{it.math && <div className="math-block"><Math tex={it.math} display /></div>}</div></div>)}</div>)}
                  {maths.length === 0 && <p className="subtle">The matching item is conceptual/experimental; its governing relations are in the linked article.</p>}
                </>}
                {mode === 'theoretical' && <>
                  <p style={{ color: '#c8d2e2', lineHeight: 1.8 }}>{paras.slice(0, 3).map((p, j) => <span key={j}>{'text' in p ? p.text : ''} </span>)}</p>
                  {callouts.filter(c => c.tone === 'warning').slice(0, 2).map((c, j) => <div className="callout warning" key={j}><div className="co-title">Assumptions & limits</div><p>{'text' in c ? c.text : ''}</p></div>)}
                </>}
                {mode === 'experimental' && <>
                  {exps.length ? exps.map(e => <div className="mini-item" key={e.id}><FlaskConical size={13} color="#4fd1a5" /><div><div className="mi-title">{e.title}</div><div className="mi-sub">{e.objective}</div></div></div>) : <p className="subtle">No dedicated virtual experiment is linked here yet. Browse the virtual laboratory for related apparatus.</p>}
                  <button className="btn btn-sm" style={{ marginTop: 8 }} onClick={() => go('/experiments')}>Open virtual lab</button>
                </>}
                {mode === 'research' && <>
                  <p style={{ color: '#c8d2e2', lineHeight: 1.8 }}>{fr.length ? fr[0].summary : 'No active frontier is directly linked to this topic. Use the knowledge graph to find adjacent open questions.'}</p>
                  {(fr[0]?.questions ?? []).slice(0, 3).map((q, j) => <div className="mini-item" key={j}><span className="mi-num">?</span><div className="mi-sub">{q}</div></div>)}
                  <button className="btn btn-sm" style={{ marginTop: 8 }} onClick={() => go('/research')}>Research explorer →</button>
                </>}
              </div>
            )
          })}
        </div>
      )}
      {!result && <div className="grid g3" style={{ marginTop: 20 }}>
        {[
          ['Why does a rotating object need a centripetal force?', 'mechanics'],
          ['Explain entropy from microscopic counting', 'entropy'],
          ['How does quantum tunneling work?', 'tunneling'],
          ['What do Maxwell equations say?', 'maxwell'],
          ['What is dark energy?', 'dark energy'],
          ['How does the Higgs mechanism give mass?', 'higgs'],
        ].map(([q]) => <button className="card card-hover" key={q} onClick={() => { setQuestion(q); setSubmitted(q) }} style={{ padding: 14, textAlign: 'left' }}><Bot size={14} color="#b98cff" style={{ marginBottom: 8 }} /><div style={{ fontSize: 12.5 }}>{q}</div></button>)}
      </div>}
    </div>
  )
}
