import { useEffect, useMemo, useRef, useState } from 'react'
import { Play, Pause, RotateCcw, Atom } from 'lucide-react'
import { SIM_BY_ID } from '../data/simulations'
import { useCanvas } from './sim/useCanvas'
import type { Params, Readout, Renderer } from './sim/renderers'
import * as R1 from './sim/renderers'
import * as R2 from './sim/renderers2'

const RENDERERS: Record<string, Renderer> = {
  'projectile-motion': R1.projectile,
  pendulum: R1.pendulum,
  'double-pendulum': R1.doublePendulum,
  collisions: R1.collisions,
  'orbital-mechanics': R1.orbital,
  'electric-field': R1.electricField,
  'em-wave': R1.emWave,
  'pv-diagram': R1.pvDiagram,
  'gas-molecules': R1.gasMolecules,
  'wave-interference': R2.waveInterference,
  'double-slit': R2.doubleSlit,
  wavefunction: R2.wavefunctionSim,
  'quantum-tunneling': R2.quantumTunneling,
  spacetime: R2.spacetime,
  'gravitational-lensing': R2.gravitationalLensing,
  'particle-collision': R2.particleCollision,
  'expanding-universe': R2.expandingUniverse,
  'carnot-cycle': R2.carnot,
}

export function Simulator({ simId }: { simId: string }) {
  const meta = SIM_BY_ID[simId]
  const [params, setParams] = useState<Params>(() =>
    Object.fromEntries((meta?.controls ?? []).map(c => [c.key, c.value])),
  )
  const [playing, setPlaying] = useState(true)
  const [resetKey, setResetKey] = useState(0)
  const [display, setDisplay] = useState<Readout>({})
  const readout = useRef<Readout>({})
  const renderer = RENDERERS[simId]

  const draw = useMemo<Renderer>(() => (ctx, w, h, t, dt, p, out) => {
    if (renderer) renderer(ctx, w, h, t, dt, p, out)
    else {
      ctx.fillStyle = '#8fa0bb'; ctx.font = '13px Inter'; ctx.fillText('Simulation unavailable', 20, 30)
    }
  }, [renderer])

  const canvasRef = useCanvas(
    (ctx, w, h, t, dt) => draw(ctx, w, h, t, dt, params, readout.current),
    [params, draw], playing, resetKey,
  )

  useEffect(() => {
    const id = window.setInterval(() => setDisplay({ ...readout.current }), 180)
    return () => clearInterval(id)
  }, [])

  if (!meta) return null

  const reset = () => {
    setParams(Object.fromEntries(meta.controls.map(c => [c.key, c.value])))
    setResetKey(k => k + 1)
    setPlaying(true)
  }

  return (
    <div className="sim-shell">
      <div className="sim-head">
        <h4><Atom size={14} style={{ color: '#4fd1a5' }} /> {meta.title} <span className="sim-tag">live simulation</span></h4>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="icon-btn" onClick={() => setPlaying(p => !p)} title={playing ? 'Pause' : 'Play'}>
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button className="icon-btn" onClick={reset} title="Reset experiment"><RotateCcw size={14} /></button>
        </div>
      </div>
      <div className="sim-body">
        <div className="sim-canvas-wrap"><canvas ref={canvasRef} /></div>
        <div className="sim-panel">
          {meta.controls.map(c => (
            <div className="control" key={c.key}>
              <label htmlFor={`${simId}-${c.key}`}>
                <span>{c.label}</span>
                <b>{params[c.key]}{c.unit ? ` ${c.unit}` : ''}</b>
              </label>
              <input
                id={`${simId}-${c.key}`}
                type="range" min={c.min} max={c.max} step={c.step} value={params[c.key]}
                onChange={e => setParams(p => ({ ...p, [c.key]: Number(e.target.value) }))}
              />
            </div>
          ))}
          <div className="sim-readout">
            {Object.entries(display).slice(0, 6).map(([k, v]) => (
              <div className="readout" key={k}><span>{k}</span><b>{v}</b></div>
            ))}
          </div>
          <div className="sim-actions">
            <button className="btn btn-sm" onClick={reset}><RotateCcw size={12} /> Reset</button>
          </div>
        </div>
      </div>
      <div className="sim-reading">
        <b>Reading the simulation:</b> {meta.reading[0]} {meta.reading[1]}
      </div>
    </div>
  )
}

export function SimCard({ simId }: { simId: string }) {
  const meta = SIM_BY_ID[simId]
  if (!meta) return null
  return (
    <div className="card card-hover" style={{ padding: 16 }}>
      <div className="sim-tag" style={{ marginBottom: 8 }}>interactive simulation</div>
      <h3 style={{ fontSize: 14, marginBottom: 6 }}>{meta.title}</h3>
      <p className="subtle" style={{ margin: 0, lineHeight: 1.6 }}>{meta.description}</p>
    </div>
  )
}
