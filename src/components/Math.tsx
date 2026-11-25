import { useEffect, useRef } from 'react'
import katex from 'katex'

interface MathProps {
  tex: string
  display?: boolean
  className?: string
}

export function Math({ tex, display = false, className = '' }: MathProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // Some authored math fields include Markdown-style $ / $$ delimiters.
    // KaTeX does not accept them, so strip balanced wrappers before rendering.
    let source = tex.trim()
    if (source.startsWith('$$') && source.endsWith('$$') && source.length > 4) source = source.slice(2, -2)
    else if (source.startsWith('$') && source.endsWith('$') && source.length > 2) source = source.slice(1, -1)
    try {
      katex.render(source, ref.current, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        trust: false,
        output: 'html',
      })
    } catch {
      if (ref.current) ref.current.textContent = tex
    }
  }, [tex, display])

  return <span ref={ref} className={className} />
}
