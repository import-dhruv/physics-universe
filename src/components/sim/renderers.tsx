import { seeded } from './useCanvas'

export type Params = Record<string, number>
export type Readout = Record<string, string>
export type Renderer = (
  ctx: CanvasRenderingContext2D, w: number, h: number,
  t: number, dt: number, p: Params, out: Readout,
) => void

const C = {
  grid: 'rgba(120,150,200,.08)', axis: 'rgba(150,175,215,.35)', text: '#8fa0bb',
  blue: '#6ea8ff', cyan: '#4fd1c5', amber: '#ffb454', red: '#ff7a90',
  violet: '#b98cff', green: '#7fe0a8', white: '#e6edfa',
}

function grid(ctx: CanvasRenderingContext2D, w: number, h: number, step = 40) {
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1
  ctx.beginPath()
  for (let x = 0; x <= w; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, h) }
  for (let y = 0; y <= h; y += step) { ctx.moveTo(0, y); ctx.lineTo(w, y) }
  ctx.stroke()
}
function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color = C.text, size = 11) {
  ctx.fillStyle = color; ctx.font = `${size}px "JetBrains Mono", monospace`
  ctx.fillText(text, x, y)
}
function line(ctx: CanvasRenderingContext2D, pts: [number, number][], color: string, width = 2, glow = 0) {
  if (pts.length < 2) return
  ctx.save()
  ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  if (glow) { ctx.shadowColor = color; ctx.shadowBlur = glow }
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
  ctx.stroke(); ctx.restore()
}
function arrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, width = 2) {
  line(ctx, [[x1, y1], [x2, y2]], color, width)
  const a = Math.atan2(y2 - y1, x2 - x1), s = 7
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x2, y2)
  ctx.lineTo(x2 - s * Math.cos(a - .4), y2 - s * Math.sin(a - .4))
  ctx.lineTo(x2 - s * Math.cos(a + .4), y2 - s * Math.sin(a + .4))
  ctx.fill()
}
function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, glow = 10) {
  ctx.save(); ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = glow
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore()
}
function axes(ctx: CanvasRenderingContext2D, w: number, h: number, ox: number, oy: number) {
  ctx.strokeStyle = C.axis; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(ox, 10); ctx.lineTo(ox, h - 10); ctx.moveTo(10, oy); ctx.lineTo(w - 10, oy); ctx.stroke()
}

// ───────────────────────────── Mechanics ────────────────────────────────
export const projectile: Renderer = (ctx, w, h, t, _dt, p, out) => {
  grid(ctx, w, h, 36)
  const v0 = p.v0, angle = p.angle * Math.PI / 180, g = p.g, drag = p.drag
  const scale = Math.min((w - 80) / (v0 * v0 / g * 1.15), (h - 90) / (v0 * v0 * Math.sin(angle) ** 2 / (2 * g) * 1.35), 9)
  const ground = h - 46, ox = 42
  ctx.fillStyle = 'rgba(110,168,255,.06)'; ctx.fillRect(0, ground, w, h - ground)
  line(ctx, [[0, ground], [w, ground]], 'rgba(160,185,220,.4)', 1)
  const cycle = 5.5, tt = t % cycle
  const pts: [number, number][] = []
  let x = 0, y = 0, vx = v0 * Math.cos(angle), vy = v0 * Math.sin(angle)
  const stepT = cycle / 420
  let land = 0
  for (let i = 0; i < 420; i++) {
    const a = drag ? -drag * vx * Math.hypot(vx, vy) : 0
    const b = -g + (drag ? -drag * vy * Math.hypot(vx, vy) : 0)
    vx += a * stepT; vy += b * stepT; x += vx * stepT; y += vy * stepT
    if (y < 0 && i > 2) break
    pts.push([ox + x * scale, ground - y * scale]); land = x
  }
  line(ctx, pts, 'rgba(110,168,255,.35)', 1.5)
  const idx = Math.min(pts.length - 1, Math.floor(tt / cycle * pts.length))
  const px = pts[Math.max(0, idx)]?.[0] ?? ox, py = pts[Math.max(0, idx)]?.[1] ?? ground
  const vyNow = vy - g * tt, vxNow = vx
  dot(ctx, px, py, 6, C.blue, 18)
  arrow(ctx, px, py, px + vxNow * scale * .18, py, C.cyan, 1.5)
  arrow(ctx, px, py, px, py - vyNow * scale * .18, C.amber, 1.5)
  const ideal = v0 * v0 * Math.sin(2 * angle) / g
  out.Range = `${land.toFixed(2)} m`
  out['Ideal range'] = `${ideal.toFixed(2)} m`
  out['Max height'] = `${Math.max(0, pts.reduce((m, q) => Math.max(m, (ground - q[1]) / scale), 0)).toFixed(2)} m`
  out['Flight time'] = `${(2 * v0 * Math.sin(angle) / g).toFixed(2)} s`
  label(ctx, `x = v₀ cosθ · t`, 14, 20, C.cyan, 11)
  label(ctx, `y = v₀ sinθ · t − ½gt²`, 14, 38, C.amber, 11)
}

export const pendulum: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const L = p.length, th0 = p.theta * Math.PI / 180, g = p.g, damp = p.damping
  const cycle = 14, tt = t % cycle
  let th = th0, om = 0
  const steps = 2400, hstep = cycle / steps
  const hist: number[] = []
  for (let i = 0; i < steps; i++) {
    const acc = -(g / L) * Math.sin(th) - damp * om
    om += acc * hstep; th += om * hstep
    if (i % 8 === 0) hist.push(th)
    if (i * hstep >= tt) break
  }
  const cx = w / 2, cy = 48, px = cx + Math.sin(th) * L * 70, py = cy + Math.cos(th) * L * 70
  line(ctx, [[cx - 90, cy], [cx + 90, cy]], 'rgba(160,185,220,.3)', 2)
  ctx.strokeStyle = 'rgba(180,200,230,.45)'; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke()
  dot(ctx, cx, cy, 4, C.white, 0)
  dot(ctx, px, py, 11, C.blue, 18)
  const arcR = 34
  ctx.strokeStyle = 'rgba(110,168,255,.3)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.arc(cx, cy, arcR, Math.PI / 2 - th0, Math.PI / 2 + th0); ctx.stroke()
  // trace
  const trace: [number, number][] = hist.map((a, i) => [cx + Math.sin(a) * L * 70, cy + Math.cos(a) * L * 70])
  if (trace.length > 1) line(ctx, trace.slice(-90), 'rgba(110,168,255,.16)', 1)
  const T0 = 2 * Math.PI * Math.sqrt(L / g)
  const T = T0 * (1 + th0 * th0 / 16 + 11 * th0 ** 4 / 3072)
  out.Angle = `${(th * 180 / Math.PI).toFixed(1)}°`
  out['SHM period'] = `${T0.toFixed(2)} s`
  out['True period'] = `${T.toFixed(2)} s`
  out['Energy'] = `${(0.5 * L * L * om * om + g * L * (1 - Math.cos(th))).toFixed(2)} J/kg`
  label(ctx, 'θ̈ + (g/L)sinθ = 0', 14, 20, C.cyan)
  label(ctx, `small-angle: T = 2π√(L/g) = ${T0.toFixed(2)} s`, 14, 40, C.text)
}

export const doublePendulum: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const L1 = 1, L2 = 1, m1 = 1, m2 = 1, g = 9.8
  const a0 = p.theta1 * Math.PI / 180, b0 = p.theta2 * Math.PI / 180 + p.perturb
  const cycle = 12, tt = t % cycle, steps = 1800, hs = cycle / steps
  const deriv = (a: number, b: number, u: number, v: number) => {
    const d = a - b, den = 2 * m1 + m2 - m2 * Math.cos(2 * d)
    const au = (-g * (2 * m1 + m2) * Math.sin(a) - m2 * g * Math.sin(a - 2 * b) - 2 * Math.sin(d) * m2 * (v * v * L2 + u * u * L1 * Math.cos(d))) / (L1 * den)
    const bu = (2 * Math.sin(d) * (u * u * L1 * (m1 + m2) + g * (m1 + m2) * Math.cos(a) + v * v * L2 * m2 * Math.cos(d))) / (L2 * den)
    return [u, au, v, bu]
  }
  let a = a0, u = 0, b = b0, v = 0
  const tr1: [number, number][] = [], tr2: [number, number][] = []
  const cx = w / 2, cy = h * .33, s = Math.min(w, h) * .19
  for (let i = 0; i < steps; i++) {
    const k1 = deriv(a, b, u, v)
    const k2 = deriv(a + k1[0] * hs / 2, b + k1[2] * hs / 2, u + k1[1] * hs / 2, v + k1[3] * hs / 2)
    const k3 = deriv(a + k2[0] * hs / 2, b + k2[2] * hs / 2, u + k2[1] * hs / 2, v + k2[3] * hs / 2)
    const k4 = deriv(a + k3[0] * hs, b + k3[2] * hs, u + k3[1] * hs, v + k3[3] * hs)
    a += hs * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6
    u += hs * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6
    b += hs * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]) / 6
    v += hs * (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3]) / 6
    if (i % 4 === 0) {
      tr1.push([cx + Math.sin(a) * s, cy + Math.cos(a) * s])
      tr2.push([cx + Math.sin(a) * s + Math.sin(b) * s, cy + Math.cos(a) * s + Math.cos(b) * s])
    }
    if (i * hs >= tt) break
  }
  const n = Math.min(tr1.length, 130)
  if (n > 2) { line(ctx, tr1.slice(-n), 'rgba(110,168,255,.18)', 1); line(ctx, tr2.slice(-n), 'rgba(255,180,84,.2)', 1) }
  const x1 = cx + Math.sin(a) * s, y1 = cy + Math.cos(a) * s
  const x2 = x1 + Math.sin(b) * s, y2 = y1 + Math.cos(b) * s
  ctx.strokeStyle = 'rgba(190,210,240,.6)'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
  dot(ctx, cx, cy, 4, C.white, 0); dot(ctx, x1, y1, 7, C.blue); dot(ctx, x2, y2, 7, C.amber)
  out['Upper angle'] = `${(a * 180 / Math.PI).toFixed(1)}°`
  out['Lower angle'] = `${(b * 180 / Math.PI).toFixed(1)}°`
  out['δ initial'] = `${p.perturb.toFixed(4)} rad`
  out['Regime'] = 'Deterministic chaos'
  label(ctx, 'Δ(t) ≈ Δ₀e^{λt} — no noise added', 14, 20, C.violet)
}

export const collisions: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const { m1, m2, v1, v2, e } = p
  const v1f = (m1 * v1 + m2 * v2 - m2 * e * (v1 - v2)) / (m1 + m2)
  const v2f = (m1 * v1 + m2 * v2 + m1 * e * (v1 - v2)) / (m1 + m2)
  const y = h * .48, scale = Math.min(w / 26, 34)
  line(ctx, [[20, y + 44], [w - 20, y + 44]], 'rgba(160,185,220,.35)', 2)
  for (let x = 30; x < w - 20; x += 28) line(ctx, [[x, y + 45], [x + 10, y + 55]], 'rgba(160,185,220,.13)', 1)
  const cycle = 5, tt = t % cycle, collideT = 2
  let x1: number, x2: number
  if (tt < collideT) {
    x1 = w * .3 + v1 * (tt - 1) * scale * .55
    x2 = w * .7 + v2 * (tt - 1) * scale * .55
  } else {
    x1 = w * .3 + v1 * (collideT - 1) * scale * .55 + v1f * (tt - collideT) * scale * .55
    x2 = w * .7 + v2 * (collideT - 1) * scale * .55 + v2f * (tt - collideT) * scale * .55
  }
  const r1 = 10 + m1 * 2.2, r2 = 10 + m2 * 2.2
  const clamp = (x: number, r: number) => Math.max(r + 6, Math.min(w - r - 6, x))
  dot(ctx, clamp(x1, r1), y, r1, C.blue, 16)
  dot(ctx, clamp(x2, r2), y, r2, C.amber, 16)
  label(ctx, `A: ${m1.toFixed(1)} kg`, clamp(x1, r1) - 18, y + r1 + 18, C.blue, 10)
  label(ctx, `B: ${m2.toFixed(1)} kg`, clamp(x2, r2) - 18, y + r2 + 18, C.amber, 10)
  arrow(ctx, clamp(x1, r1), y - r1 - 12, clamp(x1, r1) + (tt < collideT ? v1 : v1f) * 7, y - r1 - 12, C.cyan, 1.5)
  arrow(ctx, clamp(x2, r2), y - r2 - 22, clamp(x2, r2) + (tt < collideT ? v2 : v2f) * 7, y - r2 - 22, C.red, 1.5)
  const pi = m1 * v1 + m2 * v2, pf = m1 * v1f + m2 * v2f
  const ki = .5 * m1 * v1 * v1 + .5 * m2 * v2 * v2, kf = .5 * m1 * v1f ** 2 + .5 * m2 * v2f ** 2
  out['v₁ final'] = `${v1f.toFixed(2)} m/s`
  out['v₂ final'] = `${v2f.toFixed(2)} m/s`
  out.Momentum = `${pi.toFixed(2)} → ${pf.toFixed(2)}`
  out['Kinetic E'] = `${ki.toFixed(1)} → ${kf.toFixed(1)} J`
  out['ΔK'] = `${(kf - ki).toFixed(2)} J`
  label(ctx, `m₁v₁+m₂v₂ conserved · e = ${e.toFixed(2)}`, 14, 20, C.cyan)
}

export const orbital: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const GM = 1, r0 = p.r, vfac = p.v, ang = p.angle * Math.PI / 180
  const speed = vfac * Math.sqrt(GM / r0)
  let x = r0, y = 0, vx = speed * Math.cos(ang), vy = speed * Math.sin(ang)
  const energy = speed * speed / 2 - GM / r0
  const hmag = x * vy - y * vx, ecc = Math.sqrt(Math.max(0, 1 + 2 * energy * hmag * hmag / (GM * GM)))
  const semi = -GM / (2 * energy)
  const cycle = 20, tt = t % cycle, hs = .004
  const pts: [number, number][] = []
  const steps = Math.floor(tt / hs)
  for (let i = 0; i < steps; i++) {
    const r = Math.hypot(x, y), ax = -GM * x / r ** 3, ay = -GM * y / r ** 3
    vx += ax * hs; vy += ay * hs; x += vx * hs; y += vy * hs
    if (i % 4 === 0) pts.push([x, y])
  }
  const cx = w / 2, cy = h / 2, sc = Math.min(w, h) / 9
  grid(ctx, w, h, 36)
  dot(ctx, cx, cy, 12, C.amber, 26)
  label(ctx, 'M', cx + 16, cy - 12, C.amber, 12)
  const path = pts.map(([a, b]) => [cx + a * sc, cy + b * sc] as [number, number])
  line(ctx, path, 'rgba(110,168,255,.55)', 1.5)
  if (path.length) dot(ctx, path[path.length - 1][0], path[path.length - 1][1], 6, C.blue, 16)
  out.Energy = energy.toFixed(3)
  out.Eccentricity = ecc.toFixed(3)
  out['Semi-major a'] = semi > 0 ? semi.toFixed(2) : 'unbound'
  out.Orbit = energy < 0 ? 'Ellipse (bound)' : 'Hyperbola (escape)'
  label(ctx, 'ε = v²/2 − GM/r', 14, 20, C.cyan)
  label(ctx, 'Equal areas in equal times', 14, 38, C.text)
}

// ───────────────────────────── Fields ────────────────────────────────────
export const electricField: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const q1 = p.q1, q2 = p.q2, sep = p.sep
  const x1 = w / 2 - sep * 34, x2 = w / 2 + sep * 34, y = h / 2
  const E = (x: number, yy: number) => {
    let ex = 0, ey = 0
    for (const [qx, qy, q] of [[x1, y, q1], [x2, y, q2]] as [number, number, number][]) {
      const dx = x - qx, dy = yy - qy, r2 = Math.max(dx * dx + dy * dy, 60)
      const r = Math.sqrt(r2), k = q * 2600 / r2
      ex += k * dx / r; ey += k * dy / r
    }
    return [ex, ey]
  }
  // potential heatmap
  const cell = 16
  for (let gx = 0; gx < w; gx += cell) for (let gy = 0; gy < h; gy += cell) {
    const [ex, ey] = E(gx, gy), mag = Math.hypot(ex, ey)
    const a = Math.min(.22, mag / 2600)
    ctx.fillStyle = `rgba(110,168,255,${a})`; ctx.fillRect(gx, gy, cell, cell)
  }
  // field lines integrated from seeds around each charge
  for (const [qx, qy, q] of [[x1, y, q1], [x2, y, q2]] as [number, number, number][]) {
    if (Math.abs(q) < .05) continue
    const n = 16
    for (let k = 0; k < n; k++) {
      const a = 2 * Math.PI * k / n
      let x = qx + Math.cos(a) * 15, yy = qy + Math.sin(a) * 15
      const pts: [number, number][] = [[x, yy]]
      for (let i = 0; i < 180; i++) {
        const [ex, ey] = E(x, yy), m = Math.hypot(ex, ey) || 1
        const sx = (Math.sign(q) || 1) * ex / m * 3, sy = (Math.sign(q) || 1) * ey / m * 3
        x += sx; yy += sy
        if (x < 2 || x > w - 2 || yy < 2 || yy > h - 2) break
        pts.push([x, yy])
      }
      line(ctx, pts, q > 0 ? 'rgba(110,168,255,.5)' : 'rgba(255,122,144,.45)', 1)
    }
  }
  for (const [qx, qy, q, col] of [[x1, y, q1, C.blue], [x2, y, q2, C.red]] as [number, number, number, string][]) {
    dot(ctx, qx, qy, 8 + Math.min(8, Math.abs(q) * 3), col, 22)
    label(ctx, `q = ${q > 0 ? '+' : ''}${q.toFixed(1)}q`, qx - 20, qy - 18, col, 11)
  }
  // probe trajectory
  let px = w * .12, py = h * .18, vx = 0, vy = 0
  const path: [number, number][] = []
  const hs = .05
  for (let i = 0; i < 220; i++) {
    const [ex, ey] = E(px, py)
    vx += ex * hs * .00016 * p.probe; vy += ey * hs * .00016 * p.probe
    px += vx * hs * 12; py += vy * hs * 12
    if (px < 4 || px > w - 4 || py < 4 || py > h - 4) break
    if (i % 2 === 0) path.push([px, py])
  }
  line(ctx, path, 'rgba(127,224,168,.9)', 1.8, 6)
  if (path.length) dot(ctx, path[Math.floor((t * 24) % path.length)][0], path[Math.floor((t * 24) % path.length)][1], 4, C.green, 12)
  const [ex, ey] = E(w * .5, h * .25)
  out['|E| sample'] = `${(Math.hypot(ex, ey) / 100).toFixed(1)} a.u.`
  out.Dipole = `${q1.toFixed(1)}, ${q2.toFixed(1)}`
  out['Far field'] = '∝ 1/r³'
  label(ctx, 'E⃗(r) = Σ qᵢ(r⃗−r⃗ᵢ)/4πε₀|r⃗−r⃗ᵢ|³', 12, 20, C.cyan, 10)
}

export const emWave: Renderer = (ctx, w, h, t, _dt, p, out) => {
  grid(ctx, w, h, 40)
  const freq = p.freq, amp = p.amp, ph = p.phase * Math.PI / 180
  const k = 2 * Math.PI / (w / 2.2)
  const mid = h * .52, ampPx = 62 * amp
  const ex: [number, number][] = [], bx: [number, number][] = []
  for (let x = 20; x < w - 10; x += 3) {
    const arg = k * x - t * 4 * freq
    ex.push([x, mid - ampPx * Math.cos(arg)])
    bx.push([x, mid + ampPx * Math.sin(arg + ph) * .55])
  }
  axes(ctx, w, h, 20, mid)
  line(ctx, ex, C.blue, 2.5, 10)
  line(ctx, bx, C.amber, 2.5, 10)
  for (let i = 40; i < w - 20; i += 100) {
    const arg = k * i - t * 4 * freq
    const ey = mid - ampPx * Math.cos(arg), by = mid + ampPx * Math.sin(arg + ph) * .55
    line(ctx, [[i, mid], [i, ey]], 'rgba(110,168,255,.35)', 1)
    line(ctx, [[i, mid], [i, by]], 'rgba(255,180,84,.35)', 1)
    arrow(ctx, i, mid, i + 12, mid - (ey - mid) * .3, C.cyan, 1.2)
  }
  label(ctx, 'E⃗ (blue) ⟂ B⃗ (amber) ⟂ propagation', 14, 20, C.white)
  label(ctx, 'E × B → energy flow (Poynting vector)', 14, 38, C.cyan, 10)
  out.Wavelength = `${(2 * Math.PI / k / 2.2).toFixed(2)} a.u.`
  out['E/B ratio'] = 'c'
  out.Phase = `${p.phase}°`
  out['c = 1/√(ε₀μ₀)'] = '2.998×10⁸ m/s'
}

export const pvDiagram: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const n = p.n, T = p.T, proc = Math.round(p.process), R = 8.314, gamma = 1.4
  const ox = 62, oy = h - 56, pw = w - 100, ph = h - 100
  grid(ctx, w, h, 38)
  axes(ctx, w, h, ox, oy)
  const V1 = .006, V2 = .024
  const P1 = n * R * T / V1, P2 = n * R * T / V2
  const sx = (V: number) => ox + (V / .03) * pw
  const sy = (P: number) => oy - (P / (n * R * 600 / V1 * 1.05)) * ph
  const iso: [number, number][] = [], adi: [number, number][] = [], path: [number, number][] = []
  for (let i = 0; i <= 80; i++) {
    const V = V1 + (V2 - V1) * i / 80
    iso.push([sx(V), sy(n * R * T / V)])
    adi.push([sx(V), sy(P1 * (V1 / V) ** gamma)])
    path.push([sx(V), sy(proc === 1 ? P1 : proc === 2 ? P1 * (V1 / V) ** gamma : n * R * T / V)])
  }
  ctx.setLineDash([4, 4]); line(ctx, iso, 'rgba(110,168,255,.45)', 1); line(ctx, adi, 'rgba(255,180,84,.4)', 1); ctx.setLineDash([])
  line(ctx, path, C.cyan, 2.5, 8)
  const idx = Math.floor((t * .18) % 1 * 80)
  const V = V1 + (V2 - V1) * idx / 80
  const P = proc === 1 ? P1 : proc === 2 ? P1 * (V1 / V) ** gamma : n * R * T / V
  dot(ctx, sx(V), sy(P), 6, C.green, 14)
  ctx.fillStyle = 'rgba(79,209,165,.08)'
  ctx.beginPath(); ctx.moveTo(sx(V1), oy)
  for (const q of path) ctx.lineTo(q[0], Math.min(q[1], oy))
  ctx.lineTo(sx(V2), oy); ctx.fill()
  W_calc(P, V1, V2, n, R, T, proc, out)
  label(ctx, 'P', ox - 14, 18, C.text); label(ctx, 'V', w - 20, oy + 18, C.text)
  label(ctx, 'isotherm', sx(V2) - 62, sy(n * R * T / V2) - 12, C.blue, 10)
  label(ctx, 'adiabat', sx(V1) + 8, sy(P1 * .5), C.amber, 10)
}
function W_calc(P: number, V1: number, V2: number, n: number, R: number, T: number, proc: number, out: Readout) {
  const W = proc === 1 ? P * (V2 - V1) : proc === 2 ? (P * V1 - (n * R * T / V2) * V2) / (1.4 - 1) : n * R * T * Math.log(V2 / V1)
  const dU = 0
  out.Pressure = `${(P / 1000).toFixed(1)} kPa`
  out.Volume = `${(V1 * 1000).toFixed(0)}→${(V2 * 1000).toFixed(0)} L`
  out.Work = `${W.toFixed(1)} J`
  out['ΔU'] = proc === 0 ? '0 (isothermal)' : `${dU.toFixed(1)} J`
  out.Process = ['Isothermal', 'Isobaric', 'Adiabatic'][proc] ?? '—'
}

const gasState: { x: number[]; y: number[]; vx: number[]; vy: number[]; init: boolean; temp: number; count: number } =
  { x: [], y: [], vx: [], vy: [], init: false, temp: 0, count: 0 }

export const gasMolecules: Renderer = (ctx, w, h, t, dt, p, out) => {
  const count = Math.round(p.count), temp = p.temp, radius = p.radius
  if (!gasState.init || gasState.count !== count || gasState.temp !== temp) {
    gasState.x = []; gasState.y = []; gasState.vx = []; gasState.vy = []
    for (let i = 0; i < count; i++) {
      gasState.x.push(30 + seeded(i * 3) * (w - 60))
      gasState.y.push(30 + seeded(i * 3 + 1) * (h * .68 - 50))
      const a = seeded(i * 7 + 2) * Math.PI * 2
      const sp = (60 + seeded(i * 5) * 70) * Math.sqrt(temp)
      gasState.vx.push(Math.cos(a) * sp); gasState.vy.push(Math.sin(a) * sp)
    }
    gasState.init = true; gasState.count = count; gasState.temp = temp
  }
  const H = h * .72
  ctx.strokeStyle = 'rgba(160,185,220,.4)'; ctx.lineWidth = 2
  ctx.strokeRect(16, 16, w - 32, H - 32)
  if (dt > 0) {
    for (let i = 0; i < count; i++) {
      gasState.x[i] += gasState.vx[i] * dt; gasState.y[i] += gasState.vy[i] * dt
      if (gasState.x[i] < 18 + radius) { gasState.x[i] = 18 + radius; gasState.vx[i] *= -1 }
      if (gasState.x[i] > w - 18 - radius) { gasState.x[i] = w - 18 - radius; gasState.vx[i] *= -1 }
      if (gasState.y[i] < 18 + radius) { gasState.y[i] = 18 + radius; gasState.vy[i] *= -1 }
      if (gasState.y[i] > H - 18 - radius) { gasState.y[i] = H - 18 - radius; gasState.vy[i] *= -1 }
    }
    for (let i = 0; i < count; i++) for (let j = i + 1; j < count; j++) {
      const dx = gasState.x[j] - gasState.x[i], dy = gasState.y[j] - gasState.y[i]
      const d2 = dx * dx + dy * dy, min = radius * 2
      if (d2 < min * min && d2 > .01) {
        const d = Math.sqrt(d2), nx = dx / d, ny = dy / d
        const dv = (gasState.vx[i] - gasState.vx[j]) * nx + (gasState.vy[i] - gasState.vy[j]) * ny
        if (dv > 0) {
          gasState.vx[i] -= dv * nx; gasState.vy[i] -= dv * ny
          gasState.vx[j] += dv * nx; gasState.vy[j] += dv * ny
        }
        const push = (min - d) / 2
        gasState.x[i] -= nx * push; gasState.y[i] -= ny * push
        gasState.x[j] += nx * push; gasState.y[j] += ny * push
      }
    }
  }
  for (let i = 0; i < count; i++) dot(ctx, gasState.x[i], gasState.y[i], radius, C.blue, 3)
  // histogram
  const bins = new Array(22).fill(0)
  for (let i = 0; i < count; i++) {
    const v = Math.hypot(gasState.vx[i], gasState.vy[i])
    bins[Math.min(21, Math.floor(v / 12))]++
  }
  const max = Math.max(1, ...bins), hy = H + 6, hh = h - hy - 26
  ctx.strokeStyle = C.axis; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(16, hy + hh); ctx.lineTo(w - 16, hy + hh); ctx.stroke()
  const bw = (w - 40) / bins.length
  bins.forEach((b, i) => {
    const bh = (b / max) * hh
    ctx.fillStyle = `rgba(110,168,255,${.3 + .5 * b / max})`
    ctx.fillRect(20 + i * bw, hy + hh - bh, bw - 2, bh)
  })
  const mean = gasState.vx.reduce((s, v, i) => s + Math.hypot(v, gasState.vy[i]), 0) / count
  out.Molecules = `${count}`
  out['Mean speed'] = `${(mean / 10).toFixed(1)} a.u.`
  out.Pressure = '∝ NkT/V'
  label(ctx, 'Speed distribution — emerges from collisions', 20, hy + 12, C.text, 10)
}
