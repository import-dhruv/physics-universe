# Physics Universe

An original, interactive, from-first-principles physics learning and research platform.

> **Scope note.** This repository is a working, integrated foundation, not a claim to contain
> every fact ever written about physics. It ships a complete knowledge architecture (31 branches,
> 370 canonical topic slugs), long-form articles and derivations for a curated set of core
> topics, verified curriculum outlines for the remainder, 18 live simulations, virtual
> experiments, a problem arena, a knowledge graph, learning paths, local mastery tracking,
> an open-access reference library, and research/history explorers. Content is designed to
> grow branch-by-branch without restructuring the application.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production bundle
```

No backend or API key is required. Progress is stored in `localStorage`.

## Architecture

```
src/
  lib/types.ts              shared content schema (Topic, Derivation, Problem, …)
  lib/store.ts              local mastery/progress store
  lib/router.ts             hash router
  data/
    architecture.ts         31 branches + canonical topic IDs
    simulations.ts          metadata for the 18 interactive simulations
    content.*.ts            authored content, split by domain (modular growth)
    content.library.ts      references, paths, timeline, frontiers, topic summaries
    index.ts                composition layer + curriculum-outline generator
  components/
    Blocks.tsx              generic renderer for content blocks
    Math.tsx                KaTeX rendering
    Simulator.tsx           simulation shell + live readouts
    sim/renderers*.tsx      Canvas 2D physics engines
    Search.tsx              global command-bar search
  pages/                    one module per major navigation destination
```

### Content model

Every article is a `Topic` containing typed `Block`s (paragraph, heading, math, list,
callout, steps, table, simulation, quote). This keeps prose, mathematics and interactivity
in one structured source and lets any branch be added by appending a data module.

Topics without a hand-authored long-form article are generated as **curriculum outlines**:
they carry a curated one-sentence description, canonical equations, a study sequence and an
explicit notice that the long-form article is in preparation. They are never presented as
complete treatments — this is deliberate intellectual honesty.

### Simulation engine

`useCanvas` provides a DPR-correct, resize-aware animation loop. Each simulation is a pure
renderer `(ctx, width, height, time, dt, parameters, readouts) => void` driven by
`Simulator`, which supplies sliders, pause/reset, and live numerical readouts. The physics is
computed in the browser in real time.

## Scientific integrity rules

- No fabricated papers, DOIs, data, or results.
- Open-access sources are linked, not reproduced.
- Deep articles state assumptions, limitations and limiting cases.
- Research topics are labelled: Established / Active hypothesis / Open problem / Speculative.
- Stylised simulations are labelled as such.

## Development phases (as set out in the brief)

| Phase | Delivered here |
|---|---|
| 1 — architecture & design system | ✅ complete |
| 2 — mathematics & classical foundations | ✅ substantial (articles, derivations, problems) |
| 3 — visualisation/simulation engine | ✅ 18 live simulations |
| 4 — E&M, waves, optics, thermo | ✅ substantial (incl. all four Maxwell equations) |
| 5 — relativity & quantum | ✅ substantial |
| 6 — condensed matter, nuclear, particle, QFT | ✅ substantial |
| 7 — astrophysics, cosmology, interdisciplinary | ✅ substantial |
| 8 — virtual lab & problem arena | ✅ working, expandable |
| 9 — research explorer, library, knowledge graph | ✅ working |
| 10 — tutoring, personalisation, progress | ✅ progress/mastery/spaced repetition; AI tutor is a design stub, not wired to a model |
| 11 — verification | typecheck + build; content validation script |

Remaining work is primarily **depth of content**, not new architecture: converting the
curriculum outlines into long-form articles branch by branch, adding more problems and
experiments per topic, and optionally wiring an AI tutor service.
