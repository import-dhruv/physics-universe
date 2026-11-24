import { useEffect, useState } from 'react'
import {
  Home, Compass, Sigma, Atom, FlaskConical, Target, Telescope, Network,
  Route as RouteIcon, ChartNoAxesCombined, Library as LibraryIcon, Search,
  Menu, X, ChevronRight, Sparkles,
} from 'lucide-react'
import { GlobalSearch } from './components/Search'
import { useRoute, go } from './lib/router'
import { useProgress, progress } from './lib/store'
import { STATS } from './data'

import { HomePage } from './pages/Home'
import { ExplorePage, BranchPage } from './pages/Explore'
import { TopicPage } from './pages/Topic'
import { DerivationPage } from './pages/Derivation'
import { ExperimentsPage, ExperimentPage } from './pages/Experiments'
import { ProblemArena, ProblemPage } from './pages/Problems'
import { LabPage, SimulationPage } from './pages/Lab'
import { MathematicsPage } from './pages/Mathematics'
import { ResearchPage, FrontierPage, HistoryPage } from './pages/Research'
import { GraphPage } from './pages/Graph'
import { PathsPage } from './pages/Paths'
import { ProgressPage } from './pages/Progress'
import { LibraryPage } from './pages/Library'
import { TutorPage } from './pages/Tutor'

const NAV = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/explore', label: 'Explore Physics', icon: Compass },
  { path: '/mathematics', label: 'Mathematics', icon: Sigma },
  { path: '/lab', label: 'Visual Laboratory', icon: Atom },
  { path: '/experiments', label: 'Experiments', icon: FlaskConical },
  { path: '/problems', label: 'Problem Arena', icon: Target },
  { path: '/research', label: 'Research Explorer', icon: Telescope },
  { path: '/graph', label: 'Knowledge Graph', icon: Network },
  { path: '/paths', label: 'Learning Paths', icon: RouteIcon },
  { path: '/progress', label: 'My Progress', icon: ChartNoAxesCombined },
  { path: '/library', label: 'Reference Library', icon: LibraryIcon },
  { path: '/tutor', label: 'AI Physics Tutor', icon: Sparkles },
]

function Sidebar({ route, onSearch, mobile, close }: { route: string; onSearch: () => void; mobile: boolean; close: () => void }) {
  const p = useProgress()
  const pct = Math.round(p.completed.length / STATS.topics * 100)
  return (
    <aside className={`sidebar ${mobile ? 'mobile-open' : ''}`}>
      <div className="sidebar-brand" onClick={() => { go('/'); close() }} style={{ cursor: 'pointer' }}>
        <div className="brand-mark" />
        <div>
          <div className="brand-name">Physics <span>Universe</span></div>
          <div className="brand-sub">From first principles</div>
        </div>
        {mobile && <button className="icon-btn" style={{ marginLeft: 'auto' }} onClick={close}><X size={16} /></button>}
      </div>
      <nav className="sidebar-nav">
        <button className="nav-item" onClick={() => { onSearch(); close() }}>
          <Search className="ico" size={16} /> <span>Search everything</span>
        </button>
        <div className="nav-label">Platform</div>
        {NAV.map(n => {
          const active = n.path === '/' ? route === '/' : route.startsWith(n.path)
          return (
            <button key={n.path} className={`nav-item ${active ? 'active' : ''}`} onClick={() => { go(n.path); close() }}>
              <n.icon className="ico" size={16} /> <span>{n.label}</span>
              {n.path === '/lab' && <span className="badge">{STATS.simulations}</span>}
            </button>
          )
        })}
        <div className="nav-label">Knowledge map</div>
        <button className="nav-item" onClick={() => { go('/history'); close() }}><span className="ico" style={{ fontSize: 13 }}>◷</span><span>History of Physics</span></button>
        <button className="nav-item" onClick={() => { go('/research/frontier'); close() }}><span className="ico" style={{ fontSize: 13 }}>◇</span><span>Frontier Explorer</span></button>
      </nav>
      <div className="sidebar-foot">
        <div className="progress-mini"><span>Your progress</span><span>{pct}% · {p.completed.length} topics</span></div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${Math.max(1, pct)}%` }} /></div>
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6f7d93' }}>
          <span>🔥 {p.streak} day streak</span><span>{STATS.branches} branches</span>
        </div>
      </div>
    </aside>
  )
}

function RouteView({ route }: { route: string }) {
  const parts = route.split('/').filter(Boolean)
  const [area, id] = parts
  if (!area) return <HomePage />
  switch (area) {
    case 'explore': return id ? <BranchPage id={id} /> : <ExplorePage />
    case 'topic': return id ? <TopicPage id={id} /> : <ExplorePage />
    case 'mathematics': return <MathematicsPage />
    case 'lab': return <LabPage />
    case 'simulation': return id ? <SimulationPage id={id} /> : <LabPage />
    case 'experiments': return id ? <ExperimentPage id={id} /> : <ExperimentsPage />
    case 'problems': return id ? <ProblemPage id={id} /> : <ProblemArena />
    case 'derivation': return id ? <DerivationPage id={id} /> : <ExplorePage />
    case 'research': return id ? (id === 'frontier' ? <ResearchPage focus={id} /> : <FrontierPage id={id} />) : <ResearchPage />
    case 'history': return id ? <HistoryPage focus={id} /> : <HistoryPage />
    case 'graph': return <GraphPage />
    case 'paths': return <PathsPage />
    case 'progress': return <ProgressPage />
    case 'library': return <LibraryPage />
    case 'tutor': return <TutorPage />
    default: return <HomePage />
  }
}

export default function App() {
  const route = useRoute()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(true) }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => progress.tick(), 60000)
    return () => clearInterval(id)
  }, [])

  const crumb = route.split('/').filter(Boolean).map(s => s.replace(/-/g, ' ')).join(' / ') || 'Home'

  return (
    <div className="app">
      <Sidebar route={route} onSearch={() => setSearchOpen(true)} mobile={mobileNav} close={() => setMobileNav(false)} />
      {mobileNav && <div className="nav-scrim" onClick={() => setMobileNav(false)} />}
      <div className="main">
        <header className="topbar">
          <button className="icon-btn mobile-menu" onClick={() => setMobileNav(true)}><Menu size={18} /></button>
          <button className="search-trigger" onClick={() => setSearchOpen(true)}>
            <Search size={15} /> <span>Search any concept, equation, experiment…</span> <kbd>⌘ K</kbd>
          </button>
          <div className="topbar-spacer" />
          <div className="breadcrumb" style={{ margin: 0, maxWidth: 320, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {crumb.split(' / ').map((c, i, a) => <span key={i}>{i > 0 && <ChevronRight size={11} style={{ verticalAlign: -2, margin: '0 5px' }} />}{c}</span>)}
          </div>
          <div className="avatar" title="Your workspace">PU</div>
        </header>
        <main className="page fade-up" key={route}><RouteView route={route} /></main>
      </div>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
