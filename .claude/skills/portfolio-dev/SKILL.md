---
name: portfolio-dev
description: >-
  Project knowledge for the withrvr.github.io portfolio (Vite + React 19 +
  Tailwind v4 single-page site). Load this when working on this repo — building
  or editing sections/components, changing content, touching the build/deploy,
  bumping the version, or answering "how does X work here". Points to detailed
  references for architecture, user flows, project conventions, and versioning.
---

# Portfolio Development (withrvr.github.io)

Personal portfolio for **Raghav Vikram Rathi**, a Backend Software Engineer.
Single-page React site built with Vite and Tailwind CSS v4, deployed to GitHub
Pages. **All display content lives in one JSON file** — `src/data/portfolio.json` —
so most "change the text/link/asset" tasks touch only that file.

## Fast orientation

- **Entry:** `src/main.jsx` → `src/App.jsx` renders every section in order.
- **Content:** `src/data/portfolio.json` is the single source of content.
  Access it through `src/lib/site.js` (default export `data`, plus the
  `buildMailto` / `buildGmailCompose` helpers). Never import the JSON directly
  into a component — always go through `src/lib/site.js`.
- **Sections:** one component per section in `src/components/`, shared primitives
  in `src/components/ui/`.
- **Styling:** Tailwind v4 utility classes only, no CSS modules. Global CSS and
  the one custom keyframe live in `src/index.css`.
- **State:** local `useState` only. No global store, no router, no data
  fetching. Navigation is anchor links (`#home`, `#about`, …) + CSS smooth
  scroll.
- **Build/deploy:** `npm run build` → `dist/`; every push to `main` deploys via
  `.github/workflows/deploy.yml`.

## Reference documents

Read the one relevant to your task (progressive disclosure — don't load all four
unless you need to):

- **`references/architecture.md`** — folder layout, component organization, data
  flow, state model, build pipeline, and the **tooling-audit recommendations**.
- **`references/flows.md`** — user-facing flows: preloader, hero image/video
  toggle, navbar scroll behavior, anchor "routing", contact (mailto/Gmail),
  resume viewing, and the 404 fallback.
- **`references/project-info.md`** — tech stack, dependency-by-dependency
  rationale, and project-specific conventions (the JSON content pattern, the
  `site.js` indirection, tone system, AOS attributes).
- **`references/versioning.md`** — semver policy, the bump rule, and how the
  build stamps version + git hash into the footer.

## Standing rules for this repo

- **Never `git commit` unless the user explicitly says to.** Staging and
  preparing changes is fine; committing is not, ever, without a direct
  instruction. When asked to commit, first propose a title + description
  (conventional-commit style) for review.
- **Keep these docs alive.** Any structural change to the codebase (new section,
  moved file, new dependency, changed build) must update the affected reference
  file in the *same* session. Stale docs are worse than none.
- **Do not install or wire in a new tool/library without approval.** The
  tooling recommendations in `architecture.md` are proposals, not a to-do list.
