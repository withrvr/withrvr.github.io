# Project info

## Tech stack

| Layer        | Choice                          | Notes                                   |
|--------------|---------------------------------|-----------------------------------------|
| Framework    | **React 19**                    | function components + hooks only         |
| Build tool   | **Vite 8**                      | `@vitejs/plugin-react` for Fast Refresh  |
| Styling      | **Tailwind CSS v4**             | via `@tailwindcss/vite`, CSS-first setup |
| Animation    | **AOS** + **framer-motion**     | AOS = scroll reveals; FM = preloader/parallax (see audit) |
| Lint         | **ESLint 10** (flat config)     | react-hooks + react-refresh plugins      |
| Hosting      | **GitHub Pages**                | via Actions, `dist/` artifact            |
| Language     | Plain **JSX** (no TypeScript)   | `@types/react` present for editor hints  |

Node 22 is used in CI (`deploy.yml`). Package manager is npm (`package-lock.json`).

## Key dependencies (why each is here)

- **react / react-dom `^19`** — UI runtime.
- **vite `^8`** + **@vitejs/plugin-react `^6`** — dev server + production bundler.
- **tailwindcss `^4`** + **@tailwindcss/vite `^4`** — styling. Tailwind v4 has no
  JS config file; the framework is pulled in with `@import "tailwindcss"` at the
  top of `src/index.css`. Utility classes are authored inline in JSX.
- **framer-motion `^12`** — used in exactly two places: the `Preloader` shutter
  (`AnimatePresence`, animated clip-path) and the `Contact` parallax background
  text (`useScroll` + `useTransform`).
- **aos `^2`** — declarative scroll-reveal via `data-aos` attributes; initialized
  once in `App.jsx` (`duration 1000`, `once: true`, `ease-out`).
- **eslint `^10`** and plugins — linting via `npm run lint`.

> Overlap note: `aos` and `framer-motion` are two animation systems. See the
> "Consider" item in `architecture.md`'s tooling audit before adding more
> animation code — pick the system that already fits the spot.

## Project-specific conventions

### 1. Content lives in one JSON file
`src/data/portfolio.json` holds **every** piece of display text, link, and asset
path — personal info, social links, hero copy, about, skills, projects,
experience, achievements, education, footer. Editing that file is the intended
way to change content. Do not hardcode copy or URLs inside components.

List-driven sections pair a `*Section` header object with a content array. The
Achievements section is the reference example: `achievementsSection`
(`{ badge, heading, description }`) plus `achievements`, an array of
`{ id, title, description, link: { label, href } }`, rendered by
`Achievements.jsx` (dark tone, placed between Experience and Education, links
open in a new tab).

Project cards use a `bullets` array (not a paragraph `description`) that
mirrors the resume's project bullets verbatim, rendered as a red-markered
list like Experience.

### 2. Always read content through `src/lib/site.js`
Components import `data from '../lib/site'` (never the JSON directly). `site.js`
re-exports the JSON as the default plus the `buildMailto()` / `buildGmailCompose()`
helpers. One import path, one place to change if the source moves.

### 3. Destructure the needed slice at the top
Each component does `const { hero, personalInfo } = data` (or similar) right after
the import, then reads fields off that. Keep this pattern for readability.

### 4. Assets
- Site-served media is in `public/media/` and referenced by absolute path
  (`/media/...`) from `portfolio.json`. `public/` is copied verbatim to the
  deploy root — no import, no hashing.
- The resume PDF sits at the `public/` root and is linked by absolute path.

### 5. Shared UI primitives are tone-aware
`SectionHeader` takes a `tone` prop (`dark` | `light`) because sections alternate
between dark (`#0a0a0a`/black), red (`#ff2a2a`), and light (white, Education)
backgrounds. Reuse `SectionHeader`/`Chip` rather than re-styling headings.

### 6. Section rhythm
Most content sections use `min-h-screen` with vertically centered content so each
reads as a full "page" when scrolled to. Red↔dark transitions use `TornDivider`;
red sections get decorative `Star` accents.

### 7. Brand colors
- Primary red: `#ff2a2a`
- Dark backgrounds: `#0a0a0a`, `#111111`, black
- Accent red for hovers/markers: red-400/red-500 family

### 8. Content sources when syncing with a new resume
The resume PDF in `public/` is the primary source of truth for site content,
but it is not the only one — **cross-reference the owner's LinkedIn
(https://www.linkedin.com/in/withrvr/) and GitHub (https://github.com/withrvr)
before removing anything the resume omits.** The resume is space-constrained
and may drop entries the site should keep. Standing decision (July 2026): the
**Government Polytechnic Amravati diploma stays in `education`** (and in
`index.html`'s JSON-LD `alumniOf`) even though the July 2026 resume lists only
the B.E. — it is on LinkedIn. Additions/changes in the resume are applied
directly; removals need a LinkedIn/GitHub check or owner confirmation first.

### 9. SEO is in `index.html`, not React
Title, meta description, Open Graph, Twitter card, JSON-LD Person schema, and the
`<noscript>` crawlable fallback all live in `index.html`. If job title, name, or
social links change in `portfolio.json`, mirror the relevant ones in
`index.html`'s meta + JSON-LD by hand (they are not auto-synced).

## Common tasks → where to go

| Task                              | File(s)                                        |
|-----------------------------------|------------------------------------------------|
| Change any text / link / asset    | `src/data/portfolio.json`                       |
| Add / reorder a section           | `src/App.jsx` + `Navbar.jsx` `navLinks` + new component |
| Tweak a shared heading/pill/divider| `src/components/ui/*`                            |
| Change mail subject/body          | `portfolio.json` → `contactMail`                |
| Swap the resume                   | `public/*.pdf` + `portfolio.json` `resumeUrl`   |
| Update SEO/social preview         | `index.html` (meta + JSON-LD)                   |
| Bump the version                  | `package.json` `version` (see `versioning.md`)  |
| Change deploy                     | `.github/workflows/deploy.yml`                  |
