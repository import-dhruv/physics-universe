import type { Block } from '../lib/types'
import { Math } from './Math'
import { Simulator } from './Simulator'

export function Blocks({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map((b, i) => <BlockView key={i} block={b} />)}</>
}

export function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'heading':
      return block.level === 3 ? <h3>{block.text}</h3> : <h2 id={slug(block.text)}>{block.text}</h2>
    case 'paragraph':
      return <InlineText text={block.text} />
    case 'math':
      return block.display ? (
        <div>
          <div className="math-block"><Math tex={block.latex} display /></div>
          {block.caption && <div className="math-caption">{block.caption}</div>}
        </div>
      ) : <span className="math-block inline"><Math tex={block.latex} /></span>
    case 'list':
      return block.ordered
        ? <ol>{block.items.map((it, i) => <li key={i}><InlineText text={it} /></li>)}</ol>
        : <ul>{block.items.map((it, i) => <li key={i}><InlineText text={it} /></li>)}</ul>
    case 'callout':
      return (
        <div className={`callout ${block.tone}`}>
          <div className="co-title">{block.tone === 'note' ? 'Note' : block.tone} {block.title ? `· ${block.title}` : ''}</div>
          <InlineText text={block.text} />
        </div>
      )
    case 'steps':
      return (
        <div className="steps-box">
          {block.title && <h3 style={{ marginTop: 0 }}>{block.title}</h3>}
          {block.items.map((s, i) => (
            <div className="step" key={i}>
              <div className="step-n">{i + 1}</div>
              <div><h4>{s.title}</h4><p><InlineText text={s.text} /></p>{s.math && <div className="math-block"><Math tex={s.math} display /></div>}</div>
            </div>
          ))}
        </div>
      )
    case 'table':
      return (
        <table className="data-table">
          <thead><tr>{block.headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
          <tbody>{block.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><InlineText text={c} /></td>)}</tr>)}</tbody>
        </table>
      )
    case 'sim':
      return <><Simulator simId={block.sim} />{block.caption && <p className="subtle">{block.caption}</p>}</>
    case 'quote':
      return <blockquote className="quote">“{block.text}”{block.attribution && <cite>— {block.attribution}</cite>}</blockquote>
  }
}

function slug(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

// Authors may write $...$ for inline math and $$...$$ for display math inside
// prose. This splits those spans without requiring a full Markdown parser.
export function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g)
  return <>{parts.map((part, i) => {
    if (part.startsWith('$$') && part.endsWith('$$')) return <div className="math-block" key={i}><Math tex={part.slice(2, -2)} display /></div>
    if (part.startsWith('$') && part.endsWith('$')) return <Math key={i} tex={part.slice(1, -1)} />
    return <span key={i}>{part}</span>
  })}</>
}
