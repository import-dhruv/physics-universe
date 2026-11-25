import { useEffect, useMemo, useState } from 'react'
import { BookOpen, ExternalLink, FileText, LibraryBig, ArrowRight, ChevronRight, ShieldCheck } from 'lucide-react'
import {
  PAPERS, PAPER_BY_ID, PAPER_CATEGORIES, PAPER_STATS,
  PAPERS_BY_TOPIC, PAPERS_BY_FRONTIER,
} from '../data/papers'
import { go } from '../lib/router'

const PER_PAGE = 20

export function PapersPage() {
  const [domain, setDomain] = useState('All')
  const [category, setCategory] = useState('All')
  const [decade, setDecade] = useState('All')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(0)
  useEffect(() => setPage(0), [domain, category, decade, q])

  const filtered = useMemo(() => PAPERS.filter(p =>
    (domain === 'All' || p.domain === domain) &&
    (category === 'All' || p.category === category) &&
    (decade === 'All' || p.year.startsWith(decade)) &&
    (!q || `${p.title} ${p.authors.join(' ')} ${p.summary} ${p.topicIds.join(' ')}`.toLowerCase().includes(q.toLowerCase())),
  ), [domain, category, decade, q])

  const categories = useMemo(() => category === 'All'
    ? PAPER_CATEGORIES
    : PAPER_CATEGORIES.filter(c => domain === 'All' || (domain === 'Mathematics' ? c.startsWith('math.') : !c.startsWith('math.'))),
  [domain, category])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const current = Math.min(page, pageCount - 1)
  const visible = filtered.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE)

  return (
    <div>
      <div className="eyebrow">Research explorer · open-access literature</div>
      <h1 style={{ margin: '12px 0 10px' }}>Research Papers</h1>
      <p className="lead">A live-curated corpus of real, open-access mathematics and physics preprints fetched from the arXiv API. Every record links to its original source — titles, authors, abstracts, dates and identifiers come directly from arXiv, not from us.</p>

      <div className="callout note"><div className="co-title"><ShieldCheck size={12} style={{ verticalAlign: -2 }} /> Scope and honesty</div><p>This is a large snapshot, not a claim to contain every paper ever published. No metadata is invented. The corpus focuses on recent open-access work across {PAPER_STATS.categories} arXiv categories; use the original source links for the definitive version of record.</p></div>

      <div className="grid g4" style={{ marginTop: 20 }}>
        <div className="card metric"><LibraryBig size={16} color="#6ea8ff" /><div className="m-val">{PAPER_STATS.total.toLocaleString()}</div><div className="m-label">Papers indexed</div></div>
        <div className="card metric"><BookOpen size={16} color="#b98cff" /><div className="m-val">{PAPER_STATS.math.toLocaleString()}</div><div className="m-label">Mathematics</div></div>
        <div className="card metric"><FileText size={16} color="#4fd1a5" /><div className="m-val">{PAPER_STATS.physics.toLocaleString()}</div><div className="m-label">Physics</div></div>
        <div className="card metric"><ShieldCheck size={16} color="#ffb454" /><div className="m-val">{PAPER_STATS.categories}</div><div className="m-label">arXiv categories</div></div>
      </div>

      <div className="filter-bar" style={{ marginTop: 20 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search titles, authors, abstracts, topics…"
          style={{ flex: '1 1 280px', maxWidth: 380, background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', color: '#fff', outline: 0 }} />
        <select value={domain} onChange={e => setDomain(e.target.value)}><option value="All">All domains</option><option value="Mathematics">Mathematics</option><option value="Physics">Physics</option></select>
        <select value={category} onChange={e => setCategory(e.target.value)}><option value="All">All categories</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select>
        <select value={decade} onChange={e => setDecade(e.target.value)}><option value="All">All years</option>{['2026', '2025', '2024', '2023', '2022', '2021'].map(d => <option key={d}>{d}</option>)}</select>
        <span className="subtle">{filtered.length.toLocaleString()} results</span>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {['quant-ph', 'gr-qc', 'hep-th', 'astro-ph.CO', 'cond-mat.str-el', 'math.DG', 'math.AP', 'math.PR'].map(c =>
          <button className="chip" key={c} style={{ cursor: 'pointer', borderColor: category === c ? '#6ea8ff' : undefined }} onClick={() => setCategory(category === c ? 'All' : c)}>{c}</button>)}
      </div>

      <div className="grid g2">
        {visible.map(p => (
          <button className="card card-hover" key={p.id} onClick={() => go(`/paper/${p.id}`)} style={{ padding: 17, textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 9, flexWrap: 'wrap' }}>
              <span className="chip" style={{ fontSize: 9.5 }}>{p.category}</span>
              <span className="chip" style={{ fontSize: 9.5, color: p.domain === 'Mathematics' ? '#b98cff' : '#4fd1a5' }}>{p.domain}</span>
              <span className="subtle" style={{ fontSize: 10, marginLeft: 'auto' }}>{p.published}</span>
            </div>
            <h3 style={{ fontSize: 13.5, marginBottom: 7, lineHeight: 1.45 }}>{p.title}</h3>
            <div className="subtle" style={{ fontSize: 11 }}>{p.authors.slice(0, 4).join(', ')}{p.authors.length > 4 ? ` +${p.authors.length - 4}` : ''}</div>
            <p className="subtle" style={{ fontSize: 11.5, lineHeight: 1.6, margin: '9px 0 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.summary}</p>
            <div className="subtle" style={{ marginTop: 11, fontSize: 10 }}>arXiv:{p.id.replace(/^arxiv-/, '').replace(/-/g, '.')} <ArrowRight size={10} style={{ verticalAlign: -1 }} /></div>
          </button>
        ))}
      </div>
      {filtered.length === 0 && <div className="empty-state">No papers match those filters.</div>}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 24 }}>
        <button className="btn btn-sm" disabled={current === 0} onClick={() => setPage(current - 1)}>Previous</button>
        <span className="subtle">Page {current + 1} of {pageCount}</span>
        <button className="btn btn-sm" disabled={current >= pageCount - 1} onClick={() => setPage(current + 1)}>Next</button>
      </div>
    </div>
  )
}

export function PaperPage({ id }: { id: string }) {
  const p = PAPER_BY_ID.get(id)
  if (!p) return <div className="empty-state">Paper not found. <button className="btn btn-sm" onClick={() => go('/papers')}>Browse papers</button></div>
  const topics = p.topicIds.map(t => PAPERS_BY_TOPIC.get(t)?.find(x => x.id === p.id)).filter(Boolean)
  const related = PAPERS_BY_TOPIC.get(p.topicIds[0])?.filter(x => x.id !== p.id).slice(0, 5) ?? []
  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/research')}>Research Explorer</button><ChevronRight size={11} /><button onClick={() => go('/papers')}>Papers</button><ChevronRight size={11} /><span>{p.category}</span></div>
      <div className="eyebrow">{p.domain} · arXiv:{p.id.replace(/^arxiv-/, '').replace(/-/g, '.')} · {p.published}</div>
      <h1 style={{ margin: '12px 0 14px', fontSize: 'clamp(1.6rem,2.8vw,2.3rem)' }}>{p.title}</h1>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <span className="chip">{p.category}</span>{p.doi && <span className="chip">DOI {p.doi}</span>}
        {p.comment && <span className="chip">{p.comment.slice(0, 80)}</span>}
      </div>
      <div className="article" style={{ maxWidth: 900, marginTop: 20 }}>
        <h2 style={{ fontSize: '1.25rem' }}>Authors</h2>
        <p style={{ color: '#c8d2e2' }}>{p.authors.join(', ')}</p>
        <h2 style={{ fontSize: '1.25rem' }}>Abstract</h2>
        <p style={{ color: '#c8d2e2', lineHeight: 1.85 }}>{p.summary}</p>
        <div className="callout note"><div className="co-title">Source integrity</div><p>This record is reproduced from arXiv metadata. Read the original for figures, derivations, data and the definitive text. Abstracts are not peer-reviewed in themselves.</p></div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
        <a className="btn btn-primary" href={p.url} target="_blank" rel="noreferrer"><ExternalLink size={13} /> arXiv abstract</a>
        {p.pdf && <a className="btn" href={p.pdf} target="_blank" rel="noreferrer"><FileText size={13} /> PDF</a>}
        {p.doi && <a className="btn" href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer"><ExternalLink size={13} /> DOI</a>}
      </div>

      <div className="section-head"><div><div className="eyebrow">Knowledge map</div><h2 style={{ fontSize: '1.25rem' }}>Related topics</h2></div></div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {p.topicIds.map(t => <button className="chip" key={t} style={{ cursor: 'pointer' }} onClick={() => go(`/topic/${t}`)}>{t.replace(/-/g, ' ')} <ArrowRight size={10} /></button>)}
      </div>
      {p.frontierIds.length > 0 && <><div className="section-head"><div><div className="eyebrow">Frontiers</div><h2 style={{ fontSize: '1.25rem' }}>Connected open questions</h2></div></div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{p.frontierIds.map(f => <button className="chip" key={f} style={{ cursor: 'pointer' }} onClick={() => go(`/research/${f}`)}>{f.replace(/^frontier-/, '').replace(/-/g, ' ')} <ArrowRight size={10} /></button>)}</div>
      </>}
      {related.length > 0 && <><div className="section-head"><div><div className="eyebrow">Continue reading</div><h2 style={{ fontSize: '1.25rem' }}>More papers in {p.topicIds[0]?.replace(/-/g, ' ')}</h2></div></div>
        <div className="grid g2">{related.map(r => <button className="card" key={r.id} style={{ padding: 14, textAlign: 'left' }} onClick={() => go(`/paper/${r.id}`)}><h3 style={{ fontSize: 12.5 }}>{r.title}</h3><div className="subtle" style={{ fontSize: 10.5, marginTop: 6 }}>{r.authors.slice(0, 3).join(', ')}</div></button>)}</div>
      </>}
    </div>
  )
}
