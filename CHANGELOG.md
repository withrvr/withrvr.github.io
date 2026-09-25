# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

v2's changelog (the Next.js build) is preserved in git history on `main`
up to the v3 cutover commit.

## [3.0.0] - 2026-09-25

### Changed

- Full rewrite: replaced the v2 Next.js app with a single static
  CRT-terminal HTML page (`templates/index.template.html`).
- Content is now split between `info.json` (fields that change on their
  own schedule: resume link, contact email, meta description) and the
  template itself (everything else).
- New build pipeline: `scripts/build.mjs` bakes `info.json` into the
  template on every push to `main` and deploys the result; no framework,
  no client-side data fetch.
- New `/resume` route (static redirect) and custom `404.html`, both
  generated at build time.
- New `llms.txt`, generated at build time from `info.json`.
- New favicon/branding for v3.

### Removed

- The v2 Next.js/React/Tailwind app and its tooling (`src/`, ESLint,
  Vitest, per-section routes, project image lightbox, etc).
