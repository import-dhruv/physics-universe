import type { Renderer, Readout } from './renderers'
import { seeded } from './useCanvas'

const C = {
  blue: '#6ea8ff', cyan: '#4fd1c5', amber: '#ffb454', red: '#ff7a90',
  violet: '#b98cff', green: '#7fe0a8', white: '#e6edfa', text: '#8fa0bb',
  grid: 'rgba(120,150,200,.08)', axis: 'rgba(150,175,215,.35)',
}
function grid(ctx: CanvasRenderingContext2D, w: number, h: number, step = 38) {
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1; ctx.beginPath()
  for (let x = 0; x <= w; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, h) }
  for (let y = 0; y <= h; y += step) { ctx.moveTo(0, y); ctx.lineTo(w, y) }
  ctx.stroke()
}
function label(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, color = C.text, size = 11) {
  ctx.fillStyle = color; ctx.font = `${size}px "JetBrains Mono", monospace`; ctx.fillText(s, x, y)
}
function line(ctx: CanvasRenderingContext2D, pts: [number, number][], color: string, width = 2, glow = 0) {
  if (pts.length < 2) return
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  if (glow) { ctx.shadowColor = color; ctx.shadowBlur = glow }
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
  ctx.stroke(); ctx.restore()
}
function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, glow = 8) {
  ctx.save(); ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = glow
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore()
}

export const waveInterference: Renderer = (ctx, w, h, t, _dt, p, out) => {
  grid(ctx, w, h, 40)
  const f1 = p.f1, f2 = p.f2, ph = p.phase * Math.PI / 180, A = p.amp
  const rows = [
    { y: h * .22, color: C.blue, fn: (x: number) => A * Math.sin(x * .028 - t * f1 * 2) },
    { y: h * .43, color: C.amber, fn: (x: number) => A * Math.sin(x * .028 - t * f2 * 2 + ph) },
    { y: h * .7, color: C.green, fn: (x: number) => A * Math.sin(x * .028 - t * f1 * 2) + A * Math.sin(x * .028 - t * f2 * 2 + ph) },
  ]
  for (const row of rows) {
    ctx.strokeStyle = 'rgba(160,185,220,.2)'; ctx.beginPath()
    ctx.moveTo(0, row.y); ctx.lineTo(w, row.y); ctx.stroke()
    const pts: [number, number][] = []
    for (let x = 0; x < w; x += 2) pts.push([x, row.y - row.fn(x) * 44])
    line(ctx, pts, row.color, 2, 7)
  }
  label(ctx, 'Wave 1', 12, h * .22 - 70, C.blue)
  label(ctx, 'Wave 2', 12, h * .43 - 70, C.amber)
  label(ctx, 'Superposition', 12, h * .7 - 92, C.green)
  const beat = Math.abs(f1 - f2)
  out['f₁ / f₂'] = `${f1.toFixed(2)} / ${f2.toFixed(2)} Hz`
  out['Beat frequency'] = `${beat.toFixed(2)} Hz`
  out['Phase offset'] = `${p.phase}°`
  out['Δφ'] = `${(((ph * 180 / Math.PI) % 360) + 360) % 360}°`
}

export const doubleSlit: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const lambda = p.lambda * 1e-9, d = p.d * 1e-3, L = p.L, N = Math.round(p.slits)
  const screenX = w - 90, srcX = 60, sy = h / 2
  // source + barrier
  for (const sx of Array.from({ length: N }, (_, i) => sy + (i - (N - 1) / 2) * 30)) {
    dot(ctx, srcX + 190, sx, 3.5, C.amber, 8)
  }
  ctx.fillStyle = 'rgba(255,180,84,.4)'; ctx.fillRect(srcX + 186, 16, 8, h - 32)
  for (const sx of Array.from({ length: N }, (_, i) => sy + (i - (N - 1) / 2) * 30)) {
    ctx.fillStyle = '#0a0f18'; ctx.fillRect(srcX + 184, sx - 4, 12, 8)
  }
  ctx.strokeStyle = 'rgba(160,185,220,.3)'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(screenX, 16); ctx.lineTo(screenX, h - 16); ctx.stroke()
  // wavefronts from each slit
  for (let k = 0; k < 11; k++) {
    const r = 20 + ((t * 45 + k * 42) % 460)
    ctx.strokeStyle = `rgba(110,168,255,${Math.max(0, .24 * (1 - r / 500))})`; ctx.lineWidth = 1
    for (const sx of Array.from({ length: N }, (_, i) => sy + (i - (N - 1) / 2) * 30)) {
      ctx.beginPath(); ctx.arc(srcX + 190, sx, r, -1.3, 1.3); ctx.stroke()
    }
  }
  // intensity on screen
  const colour = `hsl(${250 - (p.lambda - 380) / 370 * 150}, 85%, 68%)`
  const maxY = (h / 2) * Math.tan(Math.atan((h / 2) / L))
  for (let y = 12; y < h - 12; y += 2) {
    const theta = Math.atan((y - sy) / (L * 220))
    const beta = Math.PI * d * Math.sin(theta) / lambda
    const alpha = Math.PI * (d / d) * Math.sin(theta) / lambda
    const factor = N === 1 ? 1 : (Math.sin(N * beta / 2) / Math.sin(beta / 2 || 1e-9)) ** 2 / (N * N)
    const envelope = Math.cos(alpha * .12) ** 2
    const I = Math.max(0, Math.min(1, factor * envelope))
    if (I > .004) {
      ctx.strokeStyle = colour; ctx.globalAlpha = .15 + I * .85; ctx.lineWidth = 2.4
      ctx.beginPath(); ctx.moveTo(screenX - I * 55, y); ctx.lineTo(screenX + 10, y); ctx.stroke()
    }
  }
  ctx.globalAlpha = 1
  const fringe = lambda * L / d
  out['Fringe spacing'] = `${(fringe * 1000).toFixed(2)} mm`
  out['d sinθ = mλ'] = `${(d * 1e3).toFixed(2)} µm · ${Math.round(p.lambda)} nm`
  out.Slits = `${N}`
  out['First minimum'] = 'd sinθ = λ/2'
  label(ctx, `λ = ${Math.round(p.lambda)} nm`, 12, 20, colour)
  label(ctx, `Δy = λL/d = ${(fringe * 1000).toFixed(2)} mm`, 12, 38, C.text, 10)
}

export const wavefunctionSim: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const Lm = p.L, n1 = Math.round(p.n), n2 = Math.round(p.mix), wgt = p.weight
  const x0 = 50, x1 = w - 50, mid = h * .42, amp = 92
  grid(ctx, w, h, 38)
  ctx.strokeStyle = C.axis; ctx.beginPath()
  ctx.moveTo(x0, 20); ctx.lineTo(x0, h - 40); ctx.moveTo(x0, mid); ctx.lineTo(x1, mid); ctx.stroke()
  ctx.fillStyle = 'rgba(185,140,255,.08)'; ctx.fillRect(x0, 20, x1 - x0, h - 60)
  const E1 = n1 * n1, E2 = n2 * n2
  const wave: [number, number][] = [], prob: [number, number][] = []
  for (let i = 0; i <= 260; i++) {
    const x = i / 260
    const psi1 = Math.sqrt(2 / Lm) * Math.sin(n1 * Math.PI * x)
    const psi2 = Math.sqrt(2 / Lm) * Math.sin(n2 * Math.PI * x)
    const rel = Math.sqrt(1 - wgt)
    const phase = t * (E2 - E1) * 2.2
    const psi = rel * psi1 * Math.cos(E1 * t * .4) + wgt * psi2 * Math.cos(E2 * t * .4 + phase)
    const dens = psi * psi
    wave.push([x0 + x * (x1 - x0), mid - psi * amp * .7])
    prob.push([x0 + x * (x1 - x0), h - 50 - dens * amp * .8])
  }
  line(ctx, prob, 'rgba(127,224,168,.35)', 1)
  ctx.fillStyle = 'rgba(127,224,168,.18)'
  ctx.beginPath(); ctx.moveTo(x0, h - 50); prob.forEach(q => ctx.lineTo(q[0], q[1])); ctx.lineTo(x1, h - 50); ctx.fill()
  line(ctx, wave, C.violet, 2.2, 9)
  for (const n of [n1, n2]) label(ctx, `${n}`, x0 + (x1 - x0) * .0 + 2, mid + 14, C.text, 9)
  out.State = wgt < .02 ? `n = ${n1}` : `√${(1 - wgt).toFixed(2)}|${n1}⟩ + √${wgt.toFixed(2)}|${n2}⟩`
  out['E₁'] = `${(E1 * E1).toFixed(1)} ℏ²π²/2mL²`
  out['E₂'] = `${(E2 * E2).toFixed(1)} ℏ²π²/2mL²`
  out.Nodes = `${Math.max(n1, n2) - 1} (max)`
  label(ctx, 'ψₙ(x) = √(2/L) sin(nπx/L)', x0, 20, C.violet)
  label(ctx, 'P(x) = |ψ(x)|² (green)', x0, 38, C.green, 10)
}

export const quantumTunneling: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const E = p.E, V0 = p.V0, a = p.width, speed = p.speed
  const bx0 = w * .42, bx1 = bx0 + a * 110, base = h * .55, amp = 74
  ctx.fillStyle = 'rgba(255,180,84,.09)'; ctx.fillRect(bx0, 16, bx1 - bx0, h - 32)
  ctx.strokeStyle = C.amber; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(bx0, base - V0 * amp); ctx.lineTo(bx1, base - V0 * amp); ctx.stroke()
  line(ctx, [[16, base - E * amp], [w - 16, base - E * amp]], 'rgba(110,168,255,.45)', 1.2)
  label(ctx, 'V₀', bx0 + 4, base - V0 * amp - 8, C.amber, 10)
  label(ctx, 'E', w - 34, base - E * amp - 8, C.blue, 10)
  const cycle = 9, tt = (t * speed) % cycle
  const center = 40 + (tt / cycle) * (w - 60)
  const k = Math.sqrt(Math.max(E, .01)) * .09
  const pts: [number, number][] = [], envTop: [number, number][] = [], envBot: [number, number][] = []
  for (let i = 0; i < 240; i++) {
    const x = 18 + i / 239 * (w - 36)
    const d = x - center
    const inside = x > bx0 && x < bx1
    const damp = inside ? Math.exp(-Math.sqrt(Math.max(V0 - E, .01)) * (x - bx0) * .025) : 1
    const envelope = Math.exp(-(d * d) / 900) * damp
    const env = 26 * envelope
    const carrier = Math.cos(k * d * 8) * env
    pts.push([x, base - E * amp - carrier])
    envTop.push([x, base - E * amp - env]); envBot.push([x, base - E * amp + env])
  }
  ctx.fillStyle = 'rgba(110,168,255,.07)'
  ctx.beginPath(); envTop.forEach(q => ctx.lineTo(q[0], q[1])); envBot.slice().reverse().forEach(q => ctx.lineTo(q[0], q[1])); ctx.fill()
  line(ctx, pts, C.blue, 1.8, 7)
  const kappa = E < V0 ? Math.sqrt(V0 - E) : 0
  const T = E >= V0 ? 1 : Math.max(1e-9, Math.exp(-2 * kappa * a * 1.9))
  out['E / V₀'] = `${(E / V0).toFixed(2)}`
  out['κ'] = `${kappa.toFixed(2)} a⁻¹`
  out['T ≈ e⁻²κᵃ'] = T < .001 ? T.toExponential(2) : T.toFixed(4)
  out.Reflection = `${((1 - T) * 100).toFixed(2)}%`
  label(ctx, E < V0 ? 'E < V₀ : classically forbidden — still transmits' : 'E > V₀ : above-barrier transmission', 14, 20, C.cyan)
}

export const spacetime: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const beta = p.beta, gamma = 1 / Math.sqrt(Math.max(1e-6, 1 - beta * beta))
  const cx = w / 2, cy = h * .58, sc = Math.min(w, h) / 7
  grid(ctx, w, h, 36)
  // light cone
  ctx.fillStyle = 'rgba(110,168,255,.06)'
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + sc * 3, cy - sc * 3); ctx.lineTo(cx - sc * 3, cy - sc * 3); ctx.fill()
  line(ctx, [[cx - sc * 3, cy + sc * 3], [cx, cy], [cx + sc * 3, cy - sc * 3]], 'rgba(255,180,84,.8)', 1.5)
  line(ctx, [[cx - sc * 3, cy - sc * 3], [cx, cy], [cx + sc * 3, cy + sc * 3]], 'rgba(255,180,84,.8)', 1.5)
  // axes
  line(ctx, [[20, cy], [w - 20, cy]], C.axis, 1)
  line(ctx, [[cx, 16], [cx, h - 16]], C.axis, 1)
  label(ctx, 'x', w - 28, cy - 8, C.text); label(ctx, 'ct', cx + 8, 22, C.text)
  // moving frame axes: ct' has slope beta in (x,ct) plot; x' has slope beta
  line(ctx, [[cx - sc * 3, cy + sc * 3 * beta], [cx + sc * 3, cy - sc * 3 * beta]], 'rgba(127,224,168,.85)', 1.5)
  line(ctx, [[cx - sc * 3, cy - sc * 3 * beta], [cx + sc * 3, cy + sc * 3 * beta]], 'rgba(185,140,255,.85)', 1.5)
  label(ctx, "ct′", cx + sc * 2.3, cy - sc * 2.3 * beta - 8, C.green, 10)
  label(ctx, "x′", cx + sc * 2.3, cy + sc * 2.3 * beta + 14, C.violet, 10)
  // event
  const X = p.x, CT = p.ct
  const ex = cx + X * sc, ey = cy - CT * sc
  const Xp = gamma * (X - beta * CT), CTp = gamma * (CT - beta * X)
  dot(ctx, ex, ey, 6, C.blue, 16)
  line(ctx, [[ex, ey], [ex, cy]], 'rgba(110,168,255,.35)', 1)
  line(ctx, [[ex, ey], [cx, ey]], 'rgba(110,168,255,.35)', 1)
  // invariant hyperbola
  const s2 = CT * CT - X * X
  const hyp: [number, number][] = []
  for (let i = -100; i <= 100; i++) {
    const xx = i / 40
    const ctv = Math.sqrt(Math.abs(s2) + xx * xx)
    hyp.push([cx + xx * sc, cy - ctv * sc])
  }
  line(ctx, hyp, 'rgba(255,122,144,.5)', 1.2)
  out['γ'] = gamma.toFixed(3)
  out['ct′'] = CTp.toFixed(3)
  out['x′'] = Xp.toFixed(3)
  out['s²'] = s2.toFixed(3)
  out['Simultaneity'] = 'frame-dependent'
  label(ctx, 'ct′ = γ(ct − βx)   x′ = γ(x − βct)', 14, 20, C.cyan, 10)
}

export const gravitationalLensing: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const mass = p.mass, impact = p.impact, off = p.alignment
  const lx = w / 2, ly = h * .52
  grid(ctx, w, h, 38)
  const alpha = (b: number) => 4 * mass / Math.max(b, .3)
  // source and observer
  const sx = lx - 180, sy = ly + off * 34
  dot(ctx, sx, sy, 7, C.amber, 18); label(ctx, 'source', sx - 24, sy - 14, C.amber, 10)
  dot(ctx, w - 60, ly, 6, C.green, 14); label(ctx, 'observer', w - 82, ly - 14, C.green, 10)
  // lens
  dot(ctx, lx, ly, 18 + mass * 5, C.violet, 26)
  ctx.strokeStyle = 'rgba(185,140,255,.35)'; ctx.lineWidth = 1
  for (const r of [46, 70, 96]) { ctx.beginPath(); ctx.arc(lx, ly, r, 0, Math.PI * 2); ctx.stroke() }
  // light rays with approximate bending: piecewise straight segments
  for (let k = -4; k <= 4; k++) {
    const y0 = ly + k * impact * 9
    const b = Math.abs(y0 - ly)
    const bend = alpha(b) * .07
    const pts: [number, number][] = []
    for (let i = 0; i <= 120; i++) {
      const f = i / 120
      const xx = sx + (w - 60 - sx) * f
      const dist = Math.abs(xx - lx)
      const deflect = bend * Math.exp(-(dist * dist) / 2600) * (y0 < ly ? 1 : -1)
      pts.push([xx, y0 + deflect * (xx - lx) * .8 + (y0 - ly) * .0])
    }
    line(ctx, pts, k === 0 ? 'rgba(255,180,84,.9)' : 'rgba(110,168,255,.42)', k === 0 ? 2 : 1)
  }
  // Einstein ring guide
  const thetaE = Math.sqrt(4 * mass * .12)
  ctx.strokeStyle = 'rgba(127,224,168,.4)'; ctx.setLineDash([5, 5])
  ctx.beginPath(); ctx.arc(lx, ly, thetaE * 70, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([])
  out['α (rad)'] = alpha(impact).toFixed(3)
  out['θ_E'] = thetaE.toFixed(3)
  out.Regime = Math.abs(off) < .4 ? 'Near-perfect alignment → ring' : 'Arcs / multiple images'
  out.Prediction = 'GR deflection = 2× Newtonian'
  label(ctx, 'α = 4GM/(c²b) — null geodesics in curved spacetime', 14, 20, C.cyan, 10)
}

export const particleCollision: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const E = p.energy, B = p.B, N = Math.round(p.multiplicity), boost = p.boost
  const cx = w / 2, cy = h / 2
  grid(ctx, w, h, 34)
  for (const r of [70, 130, 190, 250]) {
    ctx.strokeStyle = 'rgba(160,185,220,.1)'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke()
  }
  let sumE = 0, px = 0, py = 0
  const tracks: { pts: [number, number][]; color: string; charge: number }[] = []
  for (let i = 0; i < N; i++) {
    const a = seeded(i * 11) * Math.PI * 2 + t * .02
    const pt = (30 + seeded(i * 13) * 90) * (0.5 + E / 200)
    const charge = seeded(i * 17) > .45 ? 1 : -1
    const R = Math.max(18, pt / (B * 2.2))
    const span = 1.6 + seeded(i * 19) * 2.2
    const pts: [number, number][] = []
    for (let k = 0; k <= 40; k++) {
      const ang = a + charge * (k / 40) * span
      const rr = R
      pts.push([cx + Math.cos(ang) * rr - Math.cos(a) * rr, cy + Math.sin(ang) * rr - Math.sin(a) * rr])
    }
    tracks.push({ pts, color: charge > 0 ? C.blue : C.red, charge })
    sumE += pt * .4 + 2
    px += Math.cos(a) * pt; py += Math.sin(a) * pt
  }
  tracks.forEach(tr => line(ctx, tr.pts, tr.color, 1.6, 5))
  dot(ctx, cx, cy, 5, C.white, 18)
  const mass2 = sumE * sumE - (px * px + py * py) - boost * boost * 100
  out['√s (GeV)'] = `${(E * 2).toFixed(0)}`
  out.Tracks = `${N}`
  out['Invariant mass'] = `${Math.sqrt(Math.max(0, mass2)).toFixed(1)} GeV`
  out['Missing pT'] = `${(Math.abs(boost) * 3).toFixed(1)} GeV`
  label(ctx, 'p = qBR · E² = (pc)² + (mc²)²', 14, 20, C.cyan)
  label(ctx, 'Stylised event — not real detector data', 14, 38, C.text, 10)
}

export const expandingUniverse: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const H0 = p.H0, om = p.omegaM, ol = p.omegaL, gyr = p.t
  grid(ctx, w, h, 36)
  const a = (z: number) => {
    // numerical integration of Friedmann for a flat-ish model
    let av = .001; const hs = .012
    for (let i = 0; i < 900 && av < z; i++) {
      const E2 = om / av ** 3 + ol + (1 - om - ol) / av ** 2
      if (E2 <= 0) break
      av += hs / Math.sqrt(E2) * (H0 / 70)
    }
    return Math.max(.05, Math.min(z, av))
  }
  const scale = a(Math.max(.1, gyr / 13.8))
  const cx = w / 2, cy = h * .5
  // expanding galaxy grid
  const spacing = 58 * scale
  for (let gx = -8; gx <= 8; gx++) for (let gy = -6; gy <= 6; gy++) {
    const x = cx + gx * spacing, y = cy + gy * spacing
    if (x < 0 || x > w || y < 0 || y > h) continue
    const d = Math.hypot(gx, gy)
    dot(ctx, x, y, Math.max(1, 3.5 - d * .18), `rgba(160,200,255,${Math.max(.15, .8 - d * .06)})`, 4)
  }
  // scale factor curve
  const pts: [number, number][] = []
  for (let i = 0; i <= 120; i++) {
    const tt = i / 120 * 14
    const av = a(Math.max(.05, tt / 13.8))
    pts.push([20 + (tt / 14) * (w - 40), h - 22 - av * (h * .22)])
  }
  line(ctx, pts, C.green, 2, 8)
  out['H₀'] = `${H0.toFixed(0)} km/s/Mpc`
  out['a(t)'] = `${scale.toFixed(3)} at ${gyr.toFixed(1)} Gyr`
  out['Ωₘ / ΩΛ'] = `${om.toFixed(2)} / ${ol.toFixed(2)}`
  out.Epoch = gyr < 1 ? 'Radiation era' : gyr < 8 ? 'Matter era' : 'Dark-energy era'
  label(ctx, 'v_rec = H₀d  ·  H² = H₀²[Ωₘa⁻³ + ΩΛ]', 14, 20, C.cyan, 10)
  label(ctx, 'green: scale factor a(t) →', 14, 38, C.green, 10)
}

export const carnot: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const Th = p.Th, Tc = p.Tc, n = p.n, R = 8.314, g = 1.4
  const ox = 70, oy = h - 54, pw = w - 120, ph = h - 100
  grid(ctx, w, h, 38)
  ctx.strokeStyle = C.axis; ctx.beginPath()
  ctx.moveTo(ox, 14); ctx.lineTo(ox, oy); ctx.moveTo(ox, oy); ctx.lineTo(w - 16, oy); ctx.stroke()
  const V1 = .004, V2 = .010
  const P1 = n * R * Th / V1, P2 = n * R * Th / V2
  const V3 = V2 * (Th / Tc) ** (1 / (g - 1)), V4 = V1 * (Th / Tc) ** (1 / (g - 1))
  const P3 = n * R * Tc / V3, P4 = n * R * Tc / V4
  const vmax = V4 * 1.08, pmax = P1 * 1.08
  const sx = (V: number) => ox + V / vmax * pw
  const sy = (P: number) => oy - P / pmax * ph
  const curve = (P0: number, V0: number, k: number, va: number, vb: number): [number, number][] => {
    const pts: [number, number][] = []
    for (let i = 0; i <= 50; i++) {
      const V = va + (vb - va) * i / 50
      pts.push([sx(V), sy(P0 * (V0 / V) ** k)])
    }
    return pts
  }
  const path = [
    ...curve(P1, V1, 1, V1, V2), ...curve(P2, V2, g, V2, V3),
    ...curve(P3, V3, 1, V3, V4), ...curve(P4, V4, g, V4, V1),
  ]
  line(ctx, path, C.cyan, 2.4, 8)
  ctx.fillStyle = 'rgba(79,209,165,.07)'
  ctx.beginPath(); path.forEach(q => ctx.lineTo(q[0], q[1])); ctx.fill()
  const ph2 = (p.phase % 4) / 4, idx = Math.floor(ph2 * path.length)
  dot(ctx, path[idx][0], path[idx][1], 6, C.green, 14)
  const eta = 1 - Tc / Th
  out['η_max'] = `${(eta * 100).toFixed(1)}%`
  out['T_h / T_c'] = `${Th.toFixed(0)} / ${Tc.toFixed(0)} K`
  out.Stroke = ['Isothermal expansion', 'Adiabatic expansion', 'Isothermal compression', 'Adiabatic compression'][Math.min(3, Math.floor(p.phase))] ?? '—'
  out['W_net'] = `${(n * R * (Th - Tc) * Math.log(V2 / V1)).toFixed(1)} J`
  label(ctx, 'η = 1 − T_c/T_h', 14, 20, C.cyan)
  label(ctx, 'Area enclosed = net work', 14, 38, C.text, 10)
}
