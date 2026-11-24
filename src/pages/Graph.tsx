import { useEffect, useMemo, useRef, useState } from 'react'
import { Network, Search, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { ALL_TOPICS, BRANCHES, BRANCH_BY_ID, TOPICS } from '../data'
import { go } from '../lib/router'
import { seeded } from '../components/sim/useCanvas'

interface Node { id: string; label: string; color: string; x: number; y: number; vx: number; vy: number; r: number; kind: 'branch' | 'topic'; topicId?: string }
interface Edge { a: number; b: number }

export function GraphPage() {
  const [branchFilter, setBranchFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [hover, setHover] = useState<{ node: Node; x: number; y: number } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const view = useRef({ scale: 1, ox: 0, oy: 0, dragging: false, lastX: 0, lastY: 0 })
  const nodesRef = useRef<Node[]>([])
  const edgesRef = useRef<Edge[]>([])
  const hoverRef = useRef<{ node: Node; x: number; y: number } | null>(null)
  hoverRef.current = hover
  const layoutRef = useRef<{ frame: number; nodes: Node[] | null }>({ frame: 0, nodes: null })

  const { nodes, edges } = useMemo(() => {
    const visibleTopics = ALL_TOPICS.filter(t =>
      (branchFilter === 'All' || t.branchId === branchFilter) &&
      (!query || t.title.toLowerCase().includes(query.toLowerCase())),
    )
    const ns: Node[] = []
    BRANCHES.forEach((b, i) => {
      if (branchFilter !== 'All' && b.id !== branchFilter) return
      const a = i / BRANCHES.length * Math.PI * 2
      ns.push({ id: b.id, label: b.short, color: b.color, x: Math.cos(a) * 300, y: Math.sin(a) * 300, vx: 0, vy: 0, r: 9, kind: 'branch' })
    })
    visibleTopics.forEach((t, i) => {
      const b = BRANCH_BY_ID[t.branchId]!
      const bi = BRANCHES.findIndex(x => x.id === b.id)
      const a = (bi / BRANCHES.length) * Math.PI * 2 + seeded(i) * .5
      ns.push({
        id: t.id, label: t.title, color: b.color,
        x: Math.cos(a) * (360 + seeded(i * 3) * 220), y: Math.sin(a) * (360 + seeded(i * 5) * 220),
        vx: 0, vy: 0, r: t.tags.includes('curriculum outline') ? 2.6 : 4.2, kind: 'topic', topicId: t.id,
      })
    })
    const es: Edge[] = []
    const idx = Object.fromEntries(ns.map((n, i) => [n.id, i]))
    ns.filter(n => n.kind === 'topic').forEach(n => {
      const b = BRANCH_BY_ID[ALL_TOPICS.find(t => t.id === n.id)!.branchId]!
      if (idx[b.id] !== undefined) es.push({ a: n.id === undefined ? 0 : idx[n.id], b: idx[b.id] })
    })
    TOPICS.forEach(t => t.prerequisites.forEach(pr => {
      if (idx[t.id] !== undefined && idx[pr] !== undefined) es.push({ a: idx[t.id], b: idx[pr] })
    }))
    return { nodes: ns, edges: es }
  }, [branchFilter, query])

  nodesRef.current = nodes; edgesRef.current = edges

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0, w = 0, h = 0
    const resize = () => {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2)
      w = r.width; h = r.height; canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize(); const ro = new ResizeObserver(resize); ro.observe(canvas)
    const tick = () => {
      const ns = nodesRef.current
      if (layoutRef.current.nodes !== ns) layoutRef.current = { frame: 0, nodes: ns }
      const frame = ++layoutRef.current.frame
      // force layout (runs for the first ~350 frames after a filter change, then settles)
      if (frame < 350 && ns.length) {
        const topicBranch = new Map<string, Node>()
        ns.forEach(n => {
          if (n.kind !== 'topic') return
          const t = ALL_TOPICS.find(x => x.id === n.id)
          const b = t ? ns.find(x => x.id === t.branchId) : undefined
          if (b) topicBranch.set(n.id, b)
        })
        for (let i = 0; i < ns.length; i++) {
          const a = ns[i]
          // attraction to branch centre for topics; gentle centring for branches
          if (a.kind === 'topic') {
            const b = topicBranch.get(a.id)
            if (b) { a.vx += (b.x - a.x) * .0014; a.vy += (b.y - a.y) * .0014 }
          } else { a.vx += -a.x * .00035; a.vy += -a.y * .00035 }
          for (let j = i + 1; j < ns.length; j++) {
            const b = ns[j]
            const dx = b.x - a.x, dy = b.y - a.y
            const d2 = Math.max(dx * dx + dy * dy, 40)
            if (d2 > 90000) continue
            const f = 26 / d2
            a.vx -= dx * f; a.vy -= dy * f
            b.vx += dx * f; b.vy += dy * f
          }
        }
        edgesRef.current.forEach(e => {
          const a = ns[e.a], b = ns[e.b]
          if (!a || !b) return
          const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1
          const f = (d - 110) * .0006
          a.vx += dx * f; a.vy += dy * f
          b.vx -= dx * f; b.vy -= dy * f
        })
        ns.forEach(n => { n.vx *= .86; n.vy *= .86; n.x += n.vx; n.y += n.vy })
      }
      ctx.clearRect(0, 0, w, h)
      const { scale, ox, oy } = view.current
      ctx.save(); ctx.translate(w / 2 + ox, h / 2 + oy); ctx.scale(scale, scale)
      ctx.lineWidth = 1 / scale
      edgesRef.current.forEach(e => {
        const a = ns[e.a], b = ns[e.b]
        if (!a || !b) return
        ctx.strokeStyle = `rgba(110,168,255,${.06 * scale})`
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
      })
      ns.forEach(n => {
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r / Math.max(.8, scale), 0, Math.PI * 2)
        ctx.fillStyle = n.color; ctx.globalAlpha = n.kind === 'branch' ? 1 : .75; ctx.fill(); ctx.globalAlpha = 1
        if (n.kind === 'branch' || scale > 1.8) {
          ctx.fillStyle = n.kind === 'branch' ? '#dce6f7' : '#8fa0bb'
          ctx.font = `${n.kind === 'branch' ? 12 : 9}px Inter`
          ctx.fillText(n.label, n.x + n.r / scale + 5, n.y + 3)
        }
      })
      ctx.restore()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const toLocal = (ev: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      const { scale, ox, oy } = view.current
      return { x: (ev.clientX - r.left - w / 2 - ox) / scale, y: (ev.clientY - r.top - h / 2 - oy) / scale, sx: ev.clientX, sy: ev.clientY }
    }
    const onMove = (ev: MouseEvent) => {
      const pt = toLocal(ev)
      if (view.current.dragging) {
        view.current.ox += pt.sx - view.current.lastX
        view.current.oy += pt.sy - view.current.lastY
        view.current.lastX = pt.sx; view.current.lastY = pt.sy
        return
      }
      let found: Node | null = null
      for (const n of nodesRef.current) {
        if (Math.hypot(n.x - pt.x, n.y - pt.y) < (n.r + 5) / view.current.scale) { found = n; break }
      }
      if (found) setHover({ node: found, x: pt.sx, y: pt.sy })
      else setHover(null)
    }
    const onDown = (ev: MouseEvent) => {
      view.current.dragging = true; view.current.lastX = ev.clientX; view.current.lastY = ev.clientY
    }
    const onUp = (ev: MouseEvent) => {
      if (view.current.dragging) {
        const moved = Math.hypot(ev.clientX - view.current.lastX, ev.clientY - view.current.lastY)
        view.current.dragging = false
        const target = hoverRef.current?.node
        if (moved < 4 && target?.kind === 'topic') go(`/topic/${target.topicId}`)
        else if (moved < 4 && target?.kind === 'branch') go(`/branch/${target.id}`)
      }
    }
    const onWheel = (ev: WheelEvent) => {
      ev.preventDefault()
      view.current.scale = Math.max(.35, Math.min(4, view.current.scale * (ev.deltaY < 0 ? 1.12 : .89)))
    }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      canvas.removeEventListener('mousemove', onMove); canvas.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp); canvas.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <div>
      <div className="eyebrow">Interconnected knowledge</div>
      <h1 style={{ margin: '12px 0 10px' }}>The Physics Knowledge Graph</h1>
      <p className="lead">Every concept connects to prerequisites, branches and related ideas. Drag to pan, scroll to zoom, click a node to open it. Use the filters to isolate a field.</p>
      <div className="filter-bar" style={{ marginTop: 20 }}>
        <div style={{ position: 'relative' }}><Search size={14} style={{ position: 'absolute', left: 10, top: 10, color: '#6f7d93' }} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Highlight a concept…"
            style={{ paddingLeft: 30, background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, color: '#fff', outline: 0 }} />
        </div>
        <select value={branchFilter} onChange={e => setBranchFilter(e.target.value)}>
          <option value="All">All branches</option>{BRANCHES.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
        </select>
        <span className="subtle">{nodes.length} nodes · {edges.length} links</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <button className="icon-btn" onClick={() => { view.current.scale *= 1.2 }}><ZoomIn size={15} /></button>
          <button className="icon-btn" onClick={() => { view.current.scale /= 1.2 }}><ZoomOut size={15} /></button>
          <button className="icon-btn" onClick={() => { view.current = { scale: 1, ox: 0, oy: 0, dragging: false, lastX: 0, lastY: 0 }; nodes.forEach(n => { n.x *= .5; n.y *= .5 }) }}><RotateCcw size={15} /></button>
        </div>
      </div>
      <div className="graph-wrap">
        <canvas ref={canvasRef} />
        <div className="graph-info"><div style={{ color: '#6ea8ff', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 8 }}><Network size={12} style={{ verticalAlign: -2 }} /> Reading the graph</div>
          <p className="subtle" style={{ margin: 0, lineHeight: 1.65 }}>Large coloured nodes are branches; smaller dots are topics. Lines are prerequisite and branch links. Hover to identify a node, click to open its article.</p>
        </div>
        {hover && <div className="graph-tooltip" style={{ left: Math.min(hover.x + 12, (canvasRef.current?.clientWidth ?? 600) - 180), top: hover.y + 12 }}>
          <div style={{ fontWeight: 600, color: hover.node.color }}>{hover.node.label}</div>
          <div className="subtle" style={{ fontSize: 10 }}>{hover.node.kind === 'branch' ? 'Branch · click to browse' : 'Topic · click to study'}</div>
        </div>}
      </div>
    </div>
  )
}
