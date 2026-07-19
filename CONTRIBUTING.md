# Contributing

Thanks for your interest! This is a personal portfolio, but fixes and
suggestions are welcome. This guide covers local setup and how to submit changes.

## Prerequisites

- **Node.js 22+** and **npm** (the repo ships a `package-lock.json`; use `npm`).
- Git.

## Local setup

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/withrvr.github.io.git
cd withrvr.github.io

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev        # http://localhost:5173, hot-reloads on save
```

Before opening a PR, make sure both of these pass:

```bash
npm run lint       # ESLint must be clean
npm run build      # must build without errors
```

## Where things live

- **Content** (text, links, assets): [`src/data/portfolio.json`](src/data/portfolio.json).
  Most content changes need nothing else — don't hardcode copy in components.
- **Sections/components**: [`src/components/`](src/components/) (one component per
  section; shared primitives in `src/components/ui/`).
- **SEO / social meta**: [`index.html`](index.html) (not auto-synced from JSON).
- **Deeper docs**: [`.claude/skills/portfolio-dev/`](.claude/skills/portfolio-dev/)
  — architecture, flows, conventions, versioning. Read these before structural
  changes.

## Conventions

- **Styling** is Tailwind utility classes inline in JSX — no CSS modules.
- **State** is local `useState`; there is no global store or router. Keep it that
  way unless a change genuinely needs otherwise (open an issue to discuss first).
- **Reuse `ui/` primitives** (`SectionHeader`, `Chip`, `TornDivider`, `Star`)
  rather than duplicating markup.
- **Read content via `src/lib/site.js`**, never by importing the JSON directly.
- **Match the surrounding code** — naming, formatting, and comment density.

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) where it fits:

```
feat: add speaking-engagements section
fix: keep navbar legible over the education section
docs: update architecture reference
chore: bump dependencies
```

## Versioning

This project uses [Semantic Versioning](https://semver.org/) with the `version`
field in `package.json` as the single source of truth. If your change warrants a
bump, follow the rule in
[`versioning.md`](.claude/skills/portfolio-dev/references/versioning.md)
(patch = fixes, minor = features, major = breaking/redesign). If you're unsure,
leave the version alone and note it in the PR — the maintainer will decide.

## Pull requests

1. Branch off `main` (`git checkout -b fix/short-description`).
2. Make focused changes; keep unrelated edits out of the PR.
3. Run `npm run lint` and `npm run build`.
4. Open a PR and fill in the template (what changed and why).

## Reporting issues

Use the templates under [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/):
Bug Report, Feature Request, or Other.
