# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

v2's changelog (the Next.js build) is preserved in git history on `main`
up to the v3 cutover commit.

## [3.0.0] - 2026-09-25

### Changed

- Full rewrite: replaced the v2 Next.js app with a single static
  CRT-terminal HTML page (`index.html`). No framework, no build step,
  no data file - content lives directly in the page.
- `.github/workflows/deploy.yml` now just stages `index.html`, `llms.txt`,
  and `favicon.svg` and publishes them to GitHub Pages on push to `main`.
- New `llms.txt`, a static plain-text mirror of the site.
- New favicon/branding for v3.

### Removed

- The v2 Next.js/React/Tailwind app and its tooling (`src/`, ESLint,
  Vitest, per-section routes, project image lightbox, etc).
