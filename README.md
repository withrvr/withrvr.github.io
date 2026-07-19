# withrvr.github.io

Personal portfolio of **Raghav Vikram Rathi** — Backend Software Engineer
(Python · FastAPI · AsyncIO · AI/LLM).

**Live:** https://withrvr.github.io/

A single-page site built with **Vite + React 19 + Tailwind CSS v4**, deployed to
GitHub Pages. All display content lives in one JSON file, so changing text,
links, or assets rarely means touching component code.

## Tech stack

| | |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 |
| Animation | AOS (scroll reveals) + framer-motion (preloader, parallax) |
| Lint | ESLint 10 (flat config) |
| Hosting | GitHub Pages via GitHub Actions |

## Getting started

Requires **Node 22+** and npm.

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
npm run lint     # ESLint
```

## Editing content

**All site content is in [`src/data/portfolio.json`](src/data/portfolio.json)** —
personal info, social links, hero copy, about, skills, projects, experience,
achievements, education, and footer. Editing that file is the intended way to change any text,
link, or asset path. Components read it through
[`src/lib/site.js`](src/lib/site.js); don't hardcode copy in components.

- Media assets live in [`public/media/`](public/media/) and are referenced by
  absolute path (`/media/...`).
- The resume is `public/raghav_rathi_backend_engineer_20_july_2026_resume.pdf`;
  swap the file and update `personalInfo.resumeUrl` (and `resumeFileName`) to
  change it.
- SEO/social-preview tags and JSON-LD live in [`index.html`](index.html) and are
  **not** auto-synced from the JSON — mirror name/title/social changes there.

## Project structure

```
src/
├── main.jsx            # React entry
├── App.jsx             # section composition order + AOS init
├── index.css           # Tailwind import + global styles
├── data/portfolio.json # ALL content (single source of content)
├── lib/
│   ├── site.js         # content + mailto/gmail helpers
│   └── version.js      # build-time version + git hash
└── components/         # one component per section + ui/ primitives
public/                 # static assets copied verbatim (media, resume, 404, sitemap)
```

Deeper docs for contributors and future maintenance live in
[`.claude/skills/portfolio-dev/`](.claude/skills/portfolio-dev/) (architecture,
flows, conventions, versioning).

## Versioning

This project uses [Semantic Versioning](https://semver.org/). The `version` field
in [`package.json`](package.json) is the single source of truth. The site footer
shows the deployed version and short git commit hash, generated automatically at
build time so they always match what's live. See
[`.claude/skills/portfolio-dev/references/versioning.md`](.claude/skills/portfolio-dev/references/versioning.md)
for the bump rule.

## Deployment

Every push to `main` triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which runs
`npm ci && npm run build` and publishes `dist/` to GitHub Pages. `public/404.html`
redirects unmatched URLs back to the homepage.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Bug reports and feature requests use the
templates under [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/).

## License

[MIT](LICENSE) © Raghav Vikram Rathi
