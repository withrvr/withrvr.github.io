# withrvr Portfolio v2, project docs

Working documentation for the v2 rebuild of Raghav Rathi's portfolio
(`withrvr`). These files are maintained across the whole project and updated as
work proceeds. No em dash characters are used anywhere in this project, by rule.

## What this project is

A full rebuild of the personal portfolio, ported into a new stack, using the
`sadakakarla_portfolio` reference as the visual and motion template and the v1
site (`withrvr.github.io`) plus the resume as the content source of truth.

- Reference template (read only): `withrvr.github.io/sadakakarla_portfolio/Sada-Portfolio-Website`
- Content source (read only): `withrvr.github.io` (v1, version 1.1.0, Vite + React)
- Build target (this folder): `withrvr_portfolio_version_2`

## Target stack (fixed)

Next.js (App Router) + React + TypeScript strict + Tailwind CSS v4 + Framer
Motion (the `motion` package). No backend. Fully static export
(`output: 'export'`) for GitHub Pages.

## Docs index

- [reference-analysis.md](reference-analysis.md): Phase 0, complete teardown of
  the reference repo (stack, architecture, styling, motion, content model, port
  assessment).
- [content-inventory.md](content-inventory.md): Phase 0.5, everything of
  Raghav's from the resume, the v1 repo, and GitHub, plus the gap report.
- [phase1-plan.md](phase1-plan.md): Phase 1, the approved build plan and its
  amendments. A historical record of what was planned; where the shipped site
  later diverged, the superseding decision is noted inline and in decisions.md.
- [decisions.md](decisions.md): decision log, one entry per resolved or open
  decision. The most current record of why the site is the way it is.
- [futurescope.md](futurescope.md): features intentionally deferred out of this
  build, with why and how to add them later.
- [progress.md](progress.md): phase and status tracker, updated as work moves.

## Standing rules (from the brief)

1. No git operations by the assistant. The user runs all git.
2. Do not copy any Claude or agent config files from the reference.
3. Never use the em dash character anywhere.
4. Mobile first. Verify mobile, then tablet, then desktop.
5. All display content lives in JSON data files, never hardcoded in components.
6. Do not delete anything anywhere.
7. Do not write inside `withrvr.github.io/`. Read from it, copy out of it only.
8. Remove all Twitter/X links, icons, and references site wide.
9. The resume is the single source of truth. It overrides everything else.
