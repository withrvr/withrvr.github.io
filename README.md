# withrvr portfolio, version 2

Personal portfolio of **Raghav Rathi** (RVR), Backend Software Engineer.
Django, Python, FastAPI, and AI/LLM integration.

A single-page site built with Next.js (App Router), React, TypeScript, Tailwind
CSS v4, and Framer Motion. Frontend only, no backend. It builds to a fully static
export, so it runs on Vercel or GitHub Pages with no server.

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), static export |
| UI | React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first tokens), dark and light themes |
| Animation | Framer Motion (the `motion` package) |
| Icons | lucide-react, simple-icons, devicons-react |
| Tests | Vitest, Testing Library, jsdom |

## Getting started

Requires Node 22+ and npm.

```bash
npm install
cp .env.example .env.local   # sets NEXT_PUBLIC_RESUME_URL for local dev
npm run dev                  # http://localhost:3000
npm run build                # static export to out/
npm run lint
npm test
```

## Editing content

**All display copy lives in `src/data/*.json`.** Change text, links, projects,
skills, or achievements by editing those files. Components never hardcode copy.

- `site.json`: name, title, page `<title>`, socials, nav, Open Graph (including
  the GitHub repo URL used for the footer's commit link), resume fallback URL,
  and mail defaults.
- `profile.json`: hero copy and about (bio, highlights, honest stats).
- `skills.json`, `experience.json`, `projects.json`, `achievements.json`,
  `education.json`: one file per section.
- Types for every file are in `src/lib/types.ts`; a test suite validates the
  content against them.

Media (hero image and video, project images, profile photo, Open Graph image)
lives in `public/media/`. The hero image and video are temporary placeholders
from v1; swapping the final versions is a file replacement, no code change.

## The resume link

The resume is not committed. The site reads `NEXT_PUBLIC_RESUME_URL` and opens it
in a new tab, so the resume updates without a code change. If that variable
isn't set at build time, it falls back to `resumeFallbackUrl` in `site.json`
instead of hiding the Resume button.

- Local dev: set it in `.env.local` (see `.env.example`).
- GitHub Pages: set it as a repository **variable** named `NEXT_PUBLIC_RESUME_URL`.
- Vercel: set it as a project environment variable.
- No variable set anywhere: the site uses `site.json`'s `resumeFallbackUrl`.

## Contact and scheduling

No backend. The contact form and the "Schedule a 30 minute call" button both open
a prefilled Gmail compose window addressed to Raghav. A Calendly or Cal.com embed
can replace the schedule button later without a layout change.

## Deployment

- **Vercel (primary):** import the repo. It builds and serves the static export.
  Add `NEXT_PUBLIC_RESUME_URL` as an environment variable.
- **GitHub Pages:** pushing to `main` runs `.github/workflows/deploy.yml`, which
  lints, tests, builds, and publishes `out/`. `public/.nojekyll` lets Pages serve
  the `_next` folder.

## SEO and discoverability

All generated from `src/data/site.json` and the rest of `src/data/`, so none of
it can drift out of sync with the page itself:

- `robots.txt` and `sitemap.xml`: [`src/app/robots.ts`](src/app/robots.ts) and
  [`src/app/sitemap.ts`](src/app/sitemap.ts) (Next.js metadata routes).
- `manifest.webmanifest`: [`src/app/manifest.ts`](src/app/manifest.ts), linked
  automatically in the page `<head>`.
- `llms.txt`: [`src/app/llms.txt/route.ts`](src/app/llms.txt/route.ts), a plain
  markdown mirror of the whole page for AI agents and bots, per the
  [llms.txt](https://llmstxt.org) convention.
- JSON-LD `Person` schema and Open Graph tags: `src/app/layout.tsx`.

## Docs

Working documentation lives in [`docs/`](docs): the reference analysis, content
inventory, decision log, future scope, and progress tracker.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and the
[Code of Conduct](CODE_OF_CONDUCT.md). Bug reports and feature requests use the
templates under [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/).

## License

[MIT](LICENSE) © Raghav Rathi

## Notes

No em dash characters are used anywhere in this project, by rule.
