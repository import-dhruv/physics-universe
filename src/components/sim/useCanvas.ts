import { useEffect, useRef } from 'react'

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number, dt: number) => void

/** A resize-aware, device-pixel-ratio-correct canvas animation loop. */
export function useCanvas(draw: DrawFn, deps: unknown[], playing = true, resetKey: unknown = 0) {
  const ref = useRef<HTMLCanvasElement>(null)
  const drawRef = useRef(draw)
  const playRef = useRef(playing)
  drawRef.current = draw
  playRef.current = playing

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, raf = 0, last = performance.now(), t = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, rect.width); h = Math.max(1, rect.height)
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (playRef.current) t += dt
      ctx.clearRect(0, 0, w, h)
      try { drawRef.current(ctx, w, h, t, playRef.current ? dt : 0) } catch { /* keep loop alive */ }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
    // resetKey restarts the clock when the user presses Reset
  }, [resetKey, ...deps]) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

export function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}
