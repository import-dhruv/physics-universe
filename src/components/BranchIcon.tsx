import {
  Sigma, Activity, Grid3x3, Infinity as InfinityIcon, Orbit, Waves, Flame,
  BarChart3, Zap, AudioLines, Aperture, Radio, Clock, Globe2, Atom, Sparkles,
  Boxes, Radiation, CircleDot, GitBranch, Telescope, Sparkle, Sun, HeartPulse,
  Cpu, Network, Share2, Microscope, Lightbulb, Layers3, Earth, Compass,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  sigma: Sigma,
  activity: Activity,
  'grid-3x3': Grid3x3,
  infinity: InfinityIcon,
  orbit: Orbit,
  waves: Waves,
  flame: Flame,
  'bar-chart-3': BarChart3,
  zap: Zap,
  'audio-lines': AudioLines,
  aperture: Aperture,
  radio: Radio,
  clock: Clock,
  'globe-2': Globe2,
  atom: Atom,
  sparkles: Sparkles,
  boxes: Boxes,
  radiation: Radiation,
  'circle-dot': CircleDot,
  '-git-branch': GitBranch,
  telescope: Telescope,
  sparkle: Sparkle,
  sun: Sun,
  'heart-pulse': HeartPulse,
  cpu: Cpu,
  network: Network,
  'share-2': Share2,
  microscope: Microscope,
  lightbulb: Lightbulb,
  'layers-3': Layers3,
  earth: Earth,
}

export function BranchIcon({ name, size = 17 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? Compass
  return <Icon size={size} />
}
