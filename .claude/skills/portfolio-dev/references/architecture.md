# Architecture

Single-page portfolio. No backend, no router, no data fetching. A tree of
section components reads from one JSON file and renders static content with
scroll-triggered animation.

## Folder structure

```
withrvr.github.io/
├── index.html                 # HTML shell: SEO meta, OG/Twitter cards,
│                              # JSON-LD Person schema, font preload, <noscript>
├── vite.config.js             # Vite + React + Tailwind; injects version + git hash
├── eslint.config.js           # ESLint 10 flat config
├── package.json               # version field is the single source of truth
├── public/                    # copied verbatim to dist root (not processed)
│   ├── media/                 # images + hero video (served at /media/*)
│   ├── raghav_rathi_backend_engineer_jul_2026.pdf   # resume
│   ├── 404.html               # GitHub Pages fallback → redirects to /
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.jsx               # React entry: mounts <App/> in StrictMode
│   ├── App.jsx                # AOS init + section composition order
│   ├── index.css              # Tailwind import, body defaults, 1 custom keyframe
│   ├── data/
│   │   └── portfolio.json     # ALL site content (single source of content)
│   ├── lib/
│   │   ├── site.js            # re-exports portfolio.json + mailto/gmail helpers
│   │   └── version.js         # exposes build-time APP_VERSION + GIT_COMMIT_HASH
│   └── components/
│       ├── Preloader.jsx      # intro shutter animation (framer-motion)
│       ├── Navbar.jsx         # fixed nav, scroll state, mobile menu
│       ├── Hero.jsx           # #home: image/video toggle, CTAs
│       ├── About.jsx          # #about: ID-badge photo, expandable bio, tech icons
│       ├── TechnicalSkills.jsx# #skills: 5 category cards
│       ├── Projects.jsx       # #projects: project cards (phones/wide layouts)
│       ├── Experience.jsx     # #experience: role cards
│       ├── Education.jsx      # #education: light-themed cards
│       ├── Contact.jsx        # #contact: parallax big text + mailto card
│       ├── Footer.jsx         # links, big wordmark, version + commit stamp
│       ├── SocialIcons.jsx    # social row + shared icon exports (GitHub, etc.)
│       └── ui/                # shared presentational primitives
│           ├── SectionHeader.jsx  # badge + heading + description (tone-aware)
│           ├── Chip.jsx           # tag pill (skills, tech stacks)
│           ├── TornDivider.jsx    # torn-paper SVG divider between sections
│           └── Star.jsx           # decorative pulsing star accent
└── .github/
    ├── workflows/deploy.yml   # build + deploy to Pages on push to main
    ├── ISSUE_TEMPLATE/        # bug / feature / other issue forms
    └── PULL_REQUEST_TEMPLATE.md
```

## Component organization

- **One component per section.** Each top-level section owns its own layout and
  imports only what it needs. Sections are composed in a fixed order in
  `App.jsx`; there is no dynamic section list.
- **`ui/` holds reusable primitives** shared across sections (`SectionHeader`,
  `Chip`, `TornDivider`, `Star`). Extract to `ui/` when markup is used by two or
  more sections; keep one-off markup inline.
- **`SocialIcons.jsx` is a hub:** it renders the social link row *and* exports
  individual icon components (`GitHubIcon`, `ExternalLinkIcon`) that other
  sections (Projects, Contact, Footer) import. Icons are inline SVG for crispness
  and zero extra requests.

## Data flow

```
src/data/portfolio.json
        │  (imported once)
        ▼
src/lib/site.js  ──exports──►  default `data`  +  buildMailto()  +  buildGmailCompose()
        │
        ▼
each section:  import data from '../lib/site'
               const { hero, about, projects, ... } = data
```

- Content is **static and read at module load** — no props drilling of content,
  no context. Components destructure the slice they need at the top of the file.
- The `site.js` indirection exists so helpers (mailto/gmail prefill) live next to
  the data and so there is exactly one import path to change if the content
  source ever moves.

## State management

Deliberately minimal — **local `useState` only**, no global state:

| Component   | State              | Purpose                                   |
|-------------|--------------------|-------------------------------------------|
| `Preloader` | `isLoading`        | show intro shutter for ~2.2s, then reveal |
| `Navbar`    | `isOpen`           | mobile menu open/closed                   |
| `Navbar`    | `isScrolled`       | solid bg after 50px scroll (window event) |
| `Hero`      | `isPlaying`        | swap hero image ↔ intro video             |
| `About`     | `expanded`         | expand/collapse the extra bio paragraphs  |

Scroll-driven visual effects use two mechanisms:
- **AOS** (`data-aos="fade-up"` etc.) for declarative reveal-on-scroll, init'd
  once in `App.jsx`.
- **framer-motion** `useScroll` + `useTransform` for the parallax "CONTACT"
  background text in `Contact.jsx`, and `AnimatePresence` for the Preloader.

There is no shared cross-tree state, so no store is warranted (see audit below).

## Build pipeline

- **Vite** with `@vitejs/plugin-react` (Fast Refresh, JSX) and
  `@tailwindcss/vite` (Tailwind v4, CSS-first — no `tailwind.config.js`; utilities
  come from `@import "tailwindcss"` in `index.css`).
- `vite.config.js` reads `package.json` `version` and runs
  `git rev-parse --short HEAD` at build time, exposing them as the `define`
  globals `__APP_VERSION__` and `__GIT_COMMIT_HASH__` (re-exported from
  `src/lib/version.js`). See `versioning.md`.
- `npm run build` emits static assets to `dist/`. `public/` is copied verbatim.
- **Deploy:** `.github/workflows/deploy.yml` runs `npm ci && npm run build` and
  publishes `dist/` to GitHub Pages on every push to `main` (and manual dispatch).

---

## Tooling audit & recommendations (Phase 2)

Assessed against *this* project's actual needs — a static, form-less,
content-in-JSON single-page site. **None of these are installed.** They are
proposals; get owner approval before adding any dependency or wiring.

### Recommended

1. **Prettier + `eslint-config-prettier`** — *what:* opinionated code formatter;
   the config package turns off ESLint's stylistic rules so the two don't fight.
   *Why it fits:* ~13 hand-formatted JSX components with no enforced style; a
   formatter removes formatting churn from diffs and review. *Replaces/improves:*
   manual formatting; complements the existing ESLint 10 flat config. Low risk,
   high consistency payoff.

2. **JSON Schema for `portfolio.json`** (e.g. a `schema/portfolio.schema.json`
   plus editor `$schema` reference, optionally validated in CI with
   `ajv-cli`) — *what:* a schema describing the content file's shape. *Why it
   fits:* the entire site is driven by one JSON file edited by hand; a schema
   gives editor autocomplete and catches a missing field or typo'd key before it
   ships as a broken section. *Replaces/improves:* the current "edit and hope"
   loop with no validation. Highly project-specific.

3. **CI lint/build check on PRs** — *what:* a lightweight GitHub Actions workflow
   running the *existing* `npm run lint` and `npm run build` on pull requests.
   *Why it fits:* deploy.yml only runs on `main`; nothing guards a PR today.
   *Replaces/improves:* zero pre-merge checks. Uses only existing scripts — no
   new dependency, but still a wiring change, so flagged for approval.

### Consider (genuine finding, tradeoff to decide)

4. **Consolidate the two animation libraries.** The site ships **both `aos`
   *and* `framer-motion`**. AOS drives nearly all reveal-on-scroll via
   `data-aos`; framer-motion is used only for the Preloader shutter and the
   Contact parallax text. Carrying two animation systems for one small site is
   redundant weight. *Options:* (a) keep AOS for reveals and accept framer-motion
   for the two motion-heavy spots; (b) drop AOS and reimplement reveals with
   framer-motion `whileInView` (one system, but rewrites every section's
   `data-aos`); (c) drop framer-motion and rebuild the preloader/parallax with
   CSS/AOS (smaller bundle, more manual). No action without a decision on which
   direction is wanted.

### Explicitly NOT recommended (would be adding tools by default)

- **State management (Redux / Zustand / Jotai):** unnecessary. There is no
  shared cross-tree state — every piece of state is local to one component.
- **Form library (react-hook-form / Formik):** unnecessary. The "contact form"
  is a `mailto:` / Gmail-compose link with no form fields to manage or validate.
- **Client router (react-router):** unnecessary. It is one page; navigation is
  anchor links with CSS smooth scroll, and `public/404.html` handles unknown
  URLs on Pages.
- **Unit test framework (Vitest/Jest):** low value here — the site is static
  presentation with no logic branches worth unit-testing. If any testing is ever
  wanted, prefer **Lighthouse CI** (performance/SEO/accessibility budgets) over
  unit tests, given this is a public marketing page.

### Optional / nice-to-have

- **`vite-plugin-compression` or pre-compressed video** — `public/media/hero_video.mp4`
  is ~2.5 MB. Not a tooling gap so much as an asset-size note; could be
  addressed with a smaller/again-encoded video rather than a library.
