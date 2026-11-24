import { useEffect, useRef } from 'react'
import { ArrowRight, Sparkles, Play, BookOpen, Beaker, Sigma, Compass } from 'lucide-react'
import { BRANCHES, STATS, TIMELINE, FRONTIERS, LEARNING_PATHS, ALL_TOPICS } from '../data'
import { SIMULATIONS } from '../data/simulations'
import { go } from '../lib/router'
import { useProgress } from '../lib/store'
import { seeded } from '../components/sim/useCanvas'

const iconMap: Record<string, string> = {}

function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0, w = 0, h = 0
    const stars = Array.from({ length: 210 }, (_, i) => ({
      x: seeded(i * 2), y: seeded(i * 2 + 1), r: .4 + seeded(i * 5) * 1.5,
      s: .2 + seeded(i * 7) * .8, p: seeded(i * 11) * Math.PI * 2,
    }))
    const resize = () => {
      const rect = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2)
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)
    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h)
      const t = now / 1000
      stars.forEach(s => {
        const a = .25 + .55 * (.5 + .5 * Math.sin(t * s.s + s.p))
        ctx.fillStyle = `rgba(190,215,255,${a})`
        ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2); ctx.fill()
      })
      // orbit arcs
      ctx.strokeStyle = 'rgba(120,160,240,.1)'; ctx.lineWidth = 1
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.ellipse(w * .79, h * .48, w * (.18 + i * .1), h * (.12 + i * .08), -.35 + t * .006, 0, Math.PI * 2)
        ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])
  return <canvas ref={ref} />
}

export function HomePage() {
  const p = useProgress()
  const continueTopic = ALL_TOPICS.find(t => p.studying.includes(t.id)) ?? ALL_TOPICS.find(t => !p.completed.includes(t.id))
  const experiment = SIMULATIONS[Math.floor(new Date().getDate() % SIMULATIONS.length)]
  const equation = SIMULATIONS[Math.floor(new Date().getMonth() % SIMULATIONS.length)]
  const spotlight = FRONTIERS[new Date().getDate() % FRONTIERS.length]

  return (
    <div>
      <div className="hero">
        <Starfield />
        <div className="hero-inner">
          <div className="eyebrow">The complete physics learning environment</div>
          <h1>Understand the <em>universe.</em><br />Describe it mathematically.<br />Become a physicist.</h1>
          <p>An original, first-principles knowledge base with step-by-step derivations, interactive simulations, virtual experiments, research-level problems, and a map of how every idea connects.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => go('/explore')}>Explore physics <ArrowRight size={15} /></button>
            <button className="btn" onClick={() => go('/lab')}><Play size={14} /> Open visual lab</button>
            <button className="btn" onClick={() => go('/paths')}><Compass size={14} /> Choose a learning path</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><b>{STATS.branches}</b><span>Branches</span></div>
            <div className="hero-stat"><b>{STATS.topics}</b><span>Topics</span></div>
            <div className="hero-stat"><b>{STATS.derivations}</b><span>Derivations</span></div>
            <div className="hero-stat"><b>{STATS.simulations}</b><span>Simulations</span></div>
            <div className="hero-stat"><b>{STATS.problems}</b><span>Problems</span></div>
          </div>
        </div>
      </div>

      <div className="stat-strip">
        {[
          { icon: BookOpen, label: 'Long-form articles', value: STATS.deepTopics, path: '/explore' },
          { icon: Beaker, label: 'Virtual experiments', value: STATS.experiments, path: '/experiments' },
          { icon: Sigma, label: 'Derivations', value: STATS.derivations, path: '/mathematics' },
          { icon: Sparkles, label: 'Open references', value: STATS.references, path: '/library' },
        ].map(s => (
          <button className="card card-hover metric" key={s.label} onClick={() => go(s.path)} style={{ textAlign: 'left' }}>
            <s.icon size={16} color="#6ea8ff" />
            <div className="m-val">{s.value}</div>
            <div className="m-label">{s.label}</div>
          </button>
        ))}
      </div>

      <div className="section-head"><div><div className="eyebrow">The discipline</div><h2>Every branch of physics</h2></div><button className="btn btn-sm" onClick={() => go('/explore')}>View full map <ArrowRight size={13} /></button></div>
      <div className="grid g4">
        {BRANCHES.slice(0, 12).map(b => (
          <button className="card card-hover branch-tile" key={b.id} onClick={() => go(`/branch/${b.id}`)} style={{ textAlign: 'left' }}>
            <div className="bt-icon" style={{ background: `${b.color}18`, color: b.color }}><span style={{ fontSize: 16 }}>◈</span></div>
            <div className="bt-count">{b.topicIds.length}</div>
            <h3>{b.short}</h3><p>{b.description}</p>
          </button>
        ))}
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Continue learning</h3><button className="btn btn-sm" onClick={() => go('/progress')}>Dashboard</button></div>
          {continueTopic ? (
            <div className="mini-item" onClick={() => go(`/topic/${continueTopic.id}`)} style={{ cursor: 'pointer' }}>
              <span className="mi-num">01</span>
              <div><div className="mi-title">{continueTopic.title}</div><div className="mi-sub">{continueTopic.summary.slice(0, 110)}…</div></div>
            </div>
          ) : <div className="subtle">Start a path to begin.</div>}
          {LEARNING_PATHS.slice(0, 3).map((lp, i) => (
            <div className="mini-item" key={lp.id} onClick={() => go('/paths')} style={{ cursor: 'pointer' }}>
              <span className="mi-num">0{i + 2}</span>
              <div><div className="mi-title">{lp.title}</div><div className="mi-sub">{lp.topicIds.length} topics · ~{lp.hours} hours</div></div>
            </div>
          ))}
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>Interactive experiment of the day</h3><span className="chip"><span className="chip-dot" style={{ background: '#4fd1a5' }} />live</span></div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{experiment.title}</div>
          <p className="subtle" style={{ lineHeight: 1.6 }}>{experiment.description}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="btn btn-primary btn-sm" onClick={() => go(`/simulation/${experiment.id}`)}>Launch simulation <ArrowRight size={13} /></button>
            {equation.equations[0] && <span className="chip">{equation.equations[0].slice(0, 42)}…</span>}
          </div>
        </div>
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Discovery timeline</h3><button className="btn btn-sm" onClick={() => go('/history')}>Full history</button></div>
          <div className="timeline">
            {TIMELINE.slice(0, 5).map(e => (
              <div className="tl-event" key={e.id}>
                <div className="tl-year">{e.year}</div><div className="tl-title">{e.title}</div>
                <div className="tl-desc">{e.description.slice(0, 130)}…</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>Research frontier spotlight</h3><button className="btn btn-sm" onClick={() => go('/research')}>Explore all</button></div>
          <span className={`tag-status ${spotlight.status === 'Established' ? 'established' : spotlight.status === 'Active hypothesis' ? 'active' : spotlight.status === 'Open problem' ? 'open' : 'speculative'}`}>{spotlight.status}</span>
          <h3 style={{ fontSize: 16, margin: '10px 0 6px' }}>{spotlight.title}</h3>
          <p className="subtle" style={{ lineHeight: 1.7 }}>{spotlight.summary}</p>
          <div style={{ marginTop: 10 }}>{spotlight.questions.slice(0, 2).map(q => <div className="mini-item" key={q}><span className="mi-num">?</span><div className="mi-sub">{q}</div></div>)}</div>
        </div>
      </div>
    </div>
  )
}
