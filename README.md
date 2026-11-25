# Physics Universe

An original, interactive, from-first-principles physics learning and research platform.

> **Scope note.** This repository is a working, integrated foundation, not a claim to contain
> every fact ever written about physics. It ships a complete knowledge architecture (31 branches,
> 370 canonical topic slugs), a long-form subject-specific article for **every one of those 370
> topics** — each with physical intuition, defined mathematical structure, a numerically worked
> example, assumptions and failure modes, experimental evidence, common misconceptions and
> cross-branch connections — plus **101 step-by-step derivations**, **166 problems** with full
> solutions, **20,000 generated problems** (10,000 mathematics + 10,000 physics) from 100
> deterministic topic-aligned families, **29 virtual experiments**, **370 topic-specific
> self-assessment prompts**, 18 live
> simulations, a knowledge graph, learning paths, local mastery tracking, an open-access
> reference library, a searchable corpus of real arXiv research papers, and research/history
> explorers.
> Run `npm run check:content` to verify that no topic is left as a thin outline,
> `npm run check:math` for equations, `npm run check:generated` for the 20,000 generated
> problems and `npm run check:papers` for corpus integrity. The paper corpus is an arXiv
> snapshot across 50 mathematics/physics categories — real metadata only, explicitly not a
> claim of exhaustively indexing every paper ever published.

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
    generated/             100 deterministic problem families → 20,000 generated problems
    papers.arxiv.json      verified arXiv metadata snapshot (real papers only)
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

Every canonical topic resolves to a hand-authored long-form article. The curriculum-outline
generator remains in the composition layer only as a safety net: if a future branch is added
before its articles are written, that topic renders as an explicitly labelled outline rather
than an empty or deceptively shallow page. `npm run check:content` fails if any outline or
shallow article is present in the published set.

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
| 8 — virtual lab & problem arena | ✅ 29 experiments, 20,166 problems (paginated, searchable) |
| 9 — research explorer, library, knowledge graph | ✅ working, with searchable arXiv paper corpus |
| 10 — tutoring, personalisation, progress | ✅ progress/mastery/spaced repetition; AI tutor is a design stub, not wired to a model |
| 11 — verification | typecheck + build + `npm run check:content` (370/370 articles) + `npm run check:math` (10,034 equations) + `npm run check:generated` (20,000 problems) |

Remaining work is primarily **depth of content**, not new architecture: converting the
curriculum outlines into long-form articles branch by branch, adding more problems and
experiments per topic, and optionally wiring an AI tutor service.
