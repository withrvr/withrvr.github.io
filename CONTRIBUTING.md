# Contributing

Thanks for your interest! This is a personal portfolio, but fixes and
suggestions are welcome. This guide covers local setup and how to submit changes.

## Prerequisites

- **Node.js 22+** and **npm** (the repo ships a `package-lock.json`; use `npm`).
- Git.

## Local setup

```bash
# 1. Fork and clone
git clone https://github.com/withrvr/withrvr.github.io.git
cd withrvr.github.io

# 2. Install dependencies
npm install
cp .env.example .env.local   # sets NEXT_PUBLIC_RESUME_URL for local dev

# 3. Start the dev server
npm run dev        # http://localhost:3000, hot-reloads on save
```

Before opening a PR, make sure all of these pass:

```bash
npm run lint       # ESLint must be clean
npm test           # Vitest content, mail-helper, and render tests
npm run build      # static export must build without errors
```

## Where things live

- **Content** (text, links, assets): one JSON file per section under
  [`src/data/`](src/data/) (`site.json`, `profile.json`, `skills.json`,
  `experience.json`, `projects.json`, `achievements.json`, `education.json`).
  Most content changes need nothing else — don't hardcode copy in components.
  Read content through [`src/lib/content.ts`](src/lib/content.ts), never by
  importing the JSON directly; shapes are typed in
  [`src/lib/types.ts`](src/lib/types.ts) and checked by a Vitest suite.
- **Sections/components**: [`src/components/sections/`](src/components/sections/)
  (one component per section; shared primitives in
  [`src/components/ui/`](src/components/ui/)).
- **SEO / social meta**: driven from `site.json` (`meta.ogTitle`,
  `meta.ogDescription`, `pageTitle`, etc.) via
  [`src/app/layout.tsx`](src/app/layout.tsx) — it stays in sync automatically,
  no separate HTML file to edit.
- **Deeper docs**: [`docs/`](docs/) — reference analysis, content inventory,
  the decision log, future scope, and the progress tracker. Read `docs/decisions.md`
  before structural changes, and add an entry there for anything non-trivial.

## Conventions

- **Styling** is Tailwind utility classes inline in JSX — no CSS modules.
- **State** is local `useState`; there is no global store or router beyond the
  Next.js App Router's single page. Keep it that way unless a change genuinely
  needs otherwise (open an issue to discuss first).
- **Reuse `ui/` primitives** (`SectionWrapper`, `SectionHeader`, `Chip`,
  `MagneticButton`, etc.) rather than duplicating markup.
- **Match the surrounding code** — naming, formatting, and comment density.
- No em dash characters anywhere in this project, by rule.

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
field in `package.json` as the single source of truth (patch = fixes, minor =
features, major = breaking/redesign). The site footer shows the deployed
version and short git commit hash, generated automatically at build time
(`next.config.ts`) so they always match what's live. If you're unsure whether
your change warrants a bump, leave the version alone and note it in the PR —
the maintainer will decide.

## Pull requests

1. Branch off `main` (`git checkout -b fix/short-description`).
2. Make focused changes; keep unrelated edits out of the PR.
3. Run `npm run lint`, `npm test`, and `npm run build`.
4. Open a PR and fill in the template (what changed and why).

## Reporting issues

Use the templates under [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/):
Bug Report, Feature Request, or Other.
