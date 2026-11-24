import { useState } from 'react'
import { Library as LibraryIcon, ExternalLink, ShieldCheck, BookOpen } from 'lucide-react'
import { REFERENCES } from '../data'

const TYPES = ['All', 'Open textbook', 'Lecture notes', 'Paper', 'Historical paper', 'Review', 'Dataset', 'Software', 'Standard']

export function LibraryPage() {
  const [type, setType] = useState('All')
  const [q, setQ] = useState('')
  const list = REFERENCES.filter(r =>
    (type === 'All' || r.type === type) &&
    (!q || `${r.title} ${r.authors ?? ''} ${r.publisher ?? ''}`.toLowerCase().includes(q.toLowerCase())),
  )
  return (
    <div>
      <div className="eyebrow">Open reference library</div>
      <h1 style={{ margin: '12px 0 10px' }}>The Reference Library</h1>
      <p className="lead">Legitimate open-access textbooks, lecture notes, papers, data and software. We link to original sources rather than reproducing copyrighted material.</p>
      <div className="callout note"><div className="co-title">On intellectual honesty</div><p>References here are real, openly available resources. We never fabricate citations, DOIs, experimental results, or institutional attributions. Each entry links to its source so you can verify it yourself.</p></div>
      <div className="filter-bar" style={{ marginTop: 20 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search the library…"
          style={{ flex: '1 1 240px', maxWidth: 320, background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', color: '#fff', outline: 0 }} />
        <select value={type} onChange={e => setType(e.target.value)}>{TYPES.map(t => <option key={t}>{t}</option>)}</select>
        <span className="subtle">{list.length} resources</span>
      </div>
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 16 }}>
        {TYPES.filter(t => t !== 'All').map(t => <button key={t} className={`chip ${type === t ? 'chip-active' : ''}`} style={{ cursor: 'pointer', borderColor: type === t ? '#6ea8ff' : undefined }} onClick={() => setType(type === t ? 'All' : t)}>{t}</button>)}
      </div>
      <div className="grid g2">
        {list.map(r => (
          <div className="card" key={r.id} style={{ padding: 17 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 9 }}>
              <span className="chip" style={{ fontSize: 9.5 }}>{r.type}</span>
              {r.openAccess && <span className="chip" style={{ fontSize: 9.5, color: '#4fd1a5', borderColor: 'rgba(79,209,165,.35)' }}><ShieldCheck size={10} /> open access</span>}
              {r.license && <span className="subtle" style={{ fontSize: 10 }}>{r.license}</span>}
            </div>
            <h3 style={{ fontSize: 13.5, marginBottom: 5 }}>{r.title}</h3>
            <div className="subtle" style={{ fontSize: 11 }}>{[r.authors, r.publisher, r.year].filter(Boolean).join(' · ')}</div>
            <p className="subtle" style={{ fontSize: 11.5, lineHeight: 1.6, margin: '9px 0 0' }}>{r.note}</p>
            <a href={r.url} target="_blank" rel="noreferrer" className="btn btn-sm" style={{ marginTop: 12 }}><ExternalLink size={12} /> Open source</a>
          </div>
        ))}
      </div>
      {list.length === 0 && <div className="empty-state">Nothing matches those filters.</div>}
      <div className="grid g3" style={{ marginTop: 24 }}>
        <div className="card panel"><BookOpen size={16} color="#6ea8ff" /><h3 style={{ fontSize: 13, margin: '10px 0 6px' }}>Open textbooks</h3><p className="subtle" style={{ margin: 0, lineHeight: 1.6 }}>Full, peer-reviewed texts available free under creative-commons licences.</p></div>
        <div className="card panel"><BookOpen size={16} color="#8b7cff" /><h3 style={{ fontSize: 13, margin: '10px 0 6px' }}>Lecture notes</h3><p className="subtle" style={{ margin: 0, lineHeight: 1.6 }}>University-level notes from open courseware programmes.</p></div>
        <div className="card panel"><LibraryIcon size={16} color="#4fd1a5" /><h3 style={{ fontSize: 13, margin: '10px 0 6px' }}>Papers & data</h3><p className="subtle" style={{ margin: 0, lineHeight: 1.6 }}>Preprints and datasets from open repositories — verify before citing.</p></div>
      </div>
    </div>
  )
}
