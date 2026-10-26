# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

v2's changelog (the Next.js build) is preserved in git history on `main`
up to the v3 cutover commit.

## [3.0.3] - 2026-10-26

### Changed

- Branding: `RVR` renamed to `RiVeR` everywhere it's shown (page title,
  `RiVeR/OS` name and version badge, block-letter logo, BIOS badge and
  boot text, footer model, `uname`, `os-release`, weather header). The
  `withrvr` handle, URLs, and hostname are unchanged.
- `about.txt` rewritten with the new long-form About.
- `experience.log`: Homeville Group entry rewritten (now "Jun 2025 -
  Present"), grouped into Securitization / DA, Escrow Management, and
  LLM Integration / AI Microservices.
- `whoami` now prints the name and the RiVeR tagline.
- Version strings throughout `index.html` and `README.md` bumped from
  `v3.0.2` to `v3.0.3`.
- README screenshot regenerated to match.

### Added

- X link (`x.com/withrvr`) in the boot banner, `contact.txt`, and
  `llms.txt`.

## [3.0.2] - 2026-09-26

### Changed

- Project `[GitHub]`/`[crates.io]` tags in the `projects` listing are
  real links that open the project in a new tab.
- Footer quick-command buttons are right-aligned on desktop (mobile
  keeps its left-aligned, scrollable row).

- All `-`/`=` divider strings across `index.html` normalized to exactly
  47 characters (they'd drifted to varying lengths between files).
- Footer: removed the 3 phosphor theme-color buttons and the sound
  toggle button (the on-screen equivalents in the top status bar are
  unchanged); replaced the "Snake" quick button with "Help" (the
  `snake` game and typed command are unaffected).
- Projects section: pared down to Botpit, Collection workflow, 1Link,
  TypeRush, Prompt Navigator, mute-ads, and URL Shortener, in that
  order. The `projects` command's listing is now a
  `Name [status] [links]` header plus a one-line blurb per project,
  instead of a single summary line.
- Version strings throughout `index.html` and `README.md` bumped from
  `v3.0.1` to `v3.0.2`.
- README screenshot regenerated to match.

## [3.0.1] - 2026-09-25

### Changed

- `favicon.svg`: the `_` cursor now blinks (hard on/off step, ~530ms per
  phase, matching a real terminal cursor) instead of sitting static.
  Respects `prefers-reduced-motion`.
- Version strings throughout `index.html` (title, footer badge, boot
  sequence, login banner, `os-release`, `readme.txt`) bumped from
  `v3.0` to `v3.0.1`.
- README screenshot regenerated to match.

## [3.0.0] - 2026-09-25

### Changed

- Full rewrite: replaced the v2 Next.js app with a single static
  CRT-terminal HTML page (`index.html`). No framework, no build step,
  no data file - content lives directly in the page.
- `.github/workflows/deploy.yml` now just stages `index.html`, `llms.txt`,
  and `favicon.svg` and publishes them to GitHub Pages on push to `main`.
- New `llms.txt`, a static plain-text mirror of the site.
- New favicon/branding for v3.
- New `/resume` static redirect (`resume/index.html`).
- `index.html` given a proper `<!DOCTYPE>`/`<html>`/`<head>`/`<body>`
  document structure (it was still shaped as a Claude Artifact fragment,
  which only the Artifact platform auto-wraps).
- README screenshot (`docs/screenshot.png`).

### Removed

- The v2 Next.js/React/Tailwind app and its tooling (`src/`, ESLint,
  Vitest, per-section routes, project image lightbox, etc).
