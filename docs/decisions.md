# Decision Log

One entry per decision. Status is RESOLVED or OPEN. Dates are absolute.

## D1. Build location, RESOLVED 2026-07-22

The v2 project lives in a new sibling folder,
`/home/withrvr/projects/withrvr_portfolio_version_2/`, next to
`withrvr.github.io`. Honors Rule 7. Docs live in its `docs/` subfolder.

## D2. Static export, RESOLVED 2026-07-22

Keep `output: 'export'` in the main plan. Required for GitHub Pages. Side effects
accepted: `next/image` runs unoptimized, no API routes. A `.nojekyll` file is
needed so GitHub Pages serves the `_next` folder.

## D3. GitHub README sync, RESOLVED 2026-07-22

Deferred to future scope. See futurescope.md item 1.

## D4. Commit-hash data caching, RESOLVED 2026-07-22

Caching and invalidation deferred to future scope. Footer still displays the
build version and short commit hash, injected at build time. See futurescope.md
item 2.

## D5. Contact form, RESOLVED 2026-07-22

No backend. On Send, the form redirects to Gmail web compose
(mail.google.com/mail/?view=cm), addressed to Raghav's email, with the visitor's
name, email, and message prefilled into the subject and body. This is the v1
`buildGmailCompose` pattern. No visitor signup, no caps, no server.

## D6. Twitter/X removal and the Twitter-Tweepy-API project, RESOLVED 2026-07-22

Remove all of Raghav's own Twitter/X presence site wide (the `@codewithrvr`
account, the X icon, any link to it). Keep every project from the brief Phase 3,
in the given order, including the one named "Twitter-Tweepy-API", with proper
descriptions. The remove-Twitter rule targets Raghav's own X presence, not a
legitimately named project. GitHub repos may be referenced to enrich each
project description.

## D7. Education entries, RESOLVED 2026-07-22

Keep both: Thadomal Shahani Engineering College (B.E., 2021 to 2025) and
Government Polytechnic Amravati (Diploma, 2018 to 2021).

## D8. Online fetching, RESOLVED 2026-07-22

Fetching and scraping Raghav's own online profiles is allowed. LinkedIn and
bio.link hard block automated fetch (HTTP 999 and 403), so those need manual
paste. Project GitHub repos may be fetched to enrich descriptions.

## D9. Tooling, RESOLVED 2026-07-22

Use rtk for file reads, listings, and searches. Reserve the built-in reader for
fidelity-critical extraction (resume PDF, content JSON).

## D10. Scheduling section, RESOLVED 2026-07-22

Build the "Schedule a 30-min Call" section with a button now. For now the button
redirects to mail (Gmail compose) with a default scheduling message. Calendly or
Cal.com integration is deferred to future scope, and the button is built so the
swap is a config change, not a refactor. See futurescope.md item 3.

## D11. Resume URL, RESOLVED 2026-07-22

The resume no longer ships in the repo. It is served from a public env var
`NEXT_PUBLIC_RESUME_URL`, opened in a new tab. Value provided by Raghav:
`https://drive.google.com/file/d/1Q6aHAMRMlef_HT59oVHJCgoEpQXvvR4h/view?usp=drive_link`.

## D12. Theme and identity, RESOLVED 2026-07-23

Do not change the theme, palette, or fonts. Keep the reference teal, peach, cream
tokens and the dark and light mode exactly as they are. No identity retune. This
resolves plan decision point P1.

## D13. Hero video behavior, RESOLVED 2026-07-23, PARTLY SUPERSEDED by D28

No autoplay. The poster image shows by default. A visible play button starts the
video, which plays once and then stops and returns to the poster (on end or on a
second click). No looping, no auto restart. Muted and playsInline are kept so the
user-initiated play works on mobile. Theme-aware dark and light video variants
are deferred until the custom v2 videos exist; for now a single placeholder video
and image from v1 are used.

SUPERSEDED 2026-07-25 (see D28): the "muted" half of this was wrong. `muted` is
only required for autoplay, and nothing here autoplays, so it was never needed
for the user-initiated mobile play this entry claims it enables (that is
`playsInline`'s job, which is retained). Keeping it silently made the clip's
spoken intro unhearable. Everything else in this entry still holds.

## D14. Ambient motion cost, RESOLVED 2026-07-23

Keep the full ambient effect (doodles and sparkles) at full count on all screen
sizes. Performance cost is acceptable per Raghav. Reduced-motion is still honored
for accessibility, which is separate from cost. This amends risk R5.

## D15. TypeScript version, RESOLVED 2026-07-23

Attempted the latest TypeScript (7.0.2, the native compiler). Next 16's build
time TypeScript integration does not recognize it and crashes ("The id argument
must be of type string. Received undefined"). Fell back to the latest 5.x,
5.9.3, which builds cleanly to a static export. Confirms plan decision point P2
and realizes risk R1.

## D16. Skills icons, RESOLVED 2026-07-23

Use an icon wherever one exists (devicons or simple-icons cover almost the whole
stack), and a clean text chip for the rare item with no icon. Confirms P3.

## D17. Metrics honesty, RESOLVED 2026-07-23

All metrics stay honest and sourced from the resume. The About stats, if shown,
are drawn from real resume numbers (for example the concurrency and latency
figures), never invented. Confirms P4.

## D18. npm audit, RESOLVED 2026-07-23

The reported vulnerabilities (sharp high, a nested postcss moderate) live in
Next's transitive dependencies. In a static export with `images.unoptimized` and
no server, sharp and the server image path are never used, so they are not
reachable at runtime. Our direct postcss is 8.5.22 (patched). The npm auto-fix
would downgrade Next to 9.x, which is wrong, so it is not applied. Revisit when
Next ships patched transitive deps.

## D19. ESLint version, RESOLVED 2026-07-23

Attempted ESLint 10.7.0. It crashes with eslint-config-next 16's bundled
eslint-plugin-react (the plugin predates the ESLint 10 rule context API:
"contextOrFilename.getFilename is not a function"). eslint-config-next 16 targets
ESLint 9, so ESLint was pinned to 9.39.5, which lints cleanly. Realizes risk R2.

## D20. Deploy target, RESOLVED 2026-07-23

Primary deploy is Vercel (import the repo, it builds and serves the static
export). The site stays a full static export (output: export) so it is frontend
only and also deploys to GitHub Pages via .github/workflows/deploy.yml. No
backend anywhere.

## Build milestones (2026-07-23)

- Step 1 scaffold: DONE and verified. Static export builds to out/.
- Full build: content layer, all UI primitives, chrome, nine sections, a creative
  404, sitemap, and robots. DONE.
- Quality gates green: `npm run lint` (0 problems), `npm run build` (0, static
  export to out/), `npm test` (19 passing across 3 files).
- Version fallbacks: TypeScript 7 to 5.9.3 (D15); ESLint 10 to 9.39.5 (D19).

## D21. Desktop polish and layout revision, RESOLVED 2026-07-23

A round of desktop and tablet fixes plus content changes, all shipped:

- Header containerized to the content max width. Resume link removed from the
  header. Nav trimmed to About, Experience, Projects, Education, Contact, with
  home-anchored hrefs (/#...) so the links also work from the 404 page.
- Desktop scaling reduced (hero name, hero media, section padding), and widths
  unified to max-w-6xl. Mobile was already good.
- Experience rebuilt as click-driven with a scrollable detail panel so long roles
  are fully readable. Removed the janky scroll-driven active index.
- Project cards show title, short description, and tech only. The status badge
  appears only after a card is expanded. Cards aligned to equal height.
- Contact rebuilt in the reference layout: email, location, GitHub, LinkedIn (in
  label), a divider, then the Schedule a 30-min Call button (Gmail compose). The
  standalone Schedule section was removed from the page (file kept, unused, per
  the no-delete rule).
- About profile photo removed. Coursework added to both education entries
  (drafted from standard Computer Engineering curriculum).
- Coding Ninjas removed from the social icons. It stays in Achievements only.
- Footer reduced to the brand on the left, version and commit hash on the right.
- Custom cursor no longer hides the native cursor. The dot is an accent that
  grows on clickable elements.
- Favicon replaced with a theme-aware RVR monogram.

Gates after this revision: lint 0, `npm test` 21 passing, `npm run build` 0.

## D22. Accessibility and SEO polish pass, RESOLVED 2026-07-23

A focused accessibility and SEO pass, no visual or content changes to taste, all
shipped:

- Visible keyboard focus. A global `:focus-visible` ring (var(--ring), 2px,
  offset) so keyboard and assistive-tech users can see focus on nav links, CTA
  buttons, social links, and form controls. Pointer clicks do not trigger it.
- Skip-to-content link. A visually hidden `.skip-link` that appears on focus and
  jumps to `#main-content`. Both the home `<main>` and the 404 `<main>` carry
  `id="main-content"` and `tabIndex={-1}` so focus lands there; their own focus
  ring is suppressed.
- App-wide reduced motion. `MotionConfig reducedMotion="user"` wraps the tree in
  ThemeProvider, so every Framer entrance animation honors the OS reduce-motion
  setting (transforms skipped, opacity fades kept). Complements the existing
  per-component `useReducedMotion` usage and honors D14.
- Hero name reads correctly. The `<h1>` splits the name into per-character spans
  for the animation; it now carries `aria-label={fullName}` with the spans
  `aria-hidden`, so screen readers read the whole name, not letter by letter.
- Project cards are keyboard operable. The clickable card gained `role="button"`,
  `tabIndex={0}`, `aria-expanded`, an `aria-label`, and an Enter/Space key
  handler, so cards expand without a mouse.
- 404 display. The decorative "4 [eye] 4" block is now `role="img"` with
  `aria-label="Error 404, page not found"`.
- SEO. A JSON-LD Person schema (built from site.json, so it stays in sync) with
  name, jobTitle, url, image, location, and socials as sameAs. A theme-color
  viewport export tints the mobile browser chrome per theme (light and dark).

Gates after this pass: lint 0, `npm test` 21 passing, `npm run build` 0. The
JSON-LD, skip link, theme-color, and main-content anchor were verified present in
the built out/index.html.

## D23. Section reworks and content edits, RESOLVED 2026-07-23

A round of Raghav-requested changes, all shipped:

- Footer. Removed the "Built <date>" line. The footer now shows the version and
  commit hash on the first line and the copyright on the second, always. The
  COMMIT_DATE formatting was dropped from Footer (version.ts still exports it).
- Education coursework. Government Polytechnic Amravati: removed Microprocessors,
  added Advanced Java and Object Oriented Programming. Thadomal Shahani (B.E.):
  removed Object Oriented Programming (now a polytechnic course), added Analysis
  of Algorithms and Data Warehousing. So OOP sits under the diploma, not the
  degree.
- Header Resume button. Reinstated (it was removed in D21). It uses
  NEXT_PUBLIC_RESUME_URL via resumeUrl, opens in a new tab, and renders only when
  the URL is set. Outline button on desktop, an entry at the end of the mobile
  menu. This intentionally revises the D21 "Resume link removed" decision.
- Experience (03) rebuilt as a scroll-driven tracker. This reverses the D21
  click-to-change model. Every company is now always visible in a stacked
  timeline; a vertical progress line fills as the section scrolls through the
  viewport center (useScroll + useSpring), and each dot lights while its card is
  in the middle band (useInView). No clicks to browse companies. Matches the
  reference feel (all cards visible, animate in on scroll).
- Projects (04) rebuilt for smoothness in the reference layout. Replaced the
  three-column grid whose expand changed col-span (the source of the jank) with a
  single-column stack of full-width cards: number, title, tagline, and tech tags
  always visible; entrance is a fade-up on scroll. Opening a card smoothly
  reveals the status badge, summary, bullets, images (if any), and links. So the
  only card-specific extras beyond the reference are the status (shown on open)
  and images (if any); everything else follows the reference and its animation.
  Cards stay keyboard operable (role/button, aria-expanded, Enter/Space).
- Hero Play Reel button moved from bottom-center to bottom-right of the media, so
  it no longer overlaps the tagline card at the bottom-left.

Gates after this round: lint 0, `npm test` 21 passing, `npm run build` 0. The
coursework edits, the removed build date, and the Resume button were verified in
the built out/index.html.

## D24. Second feedback round, RESOLVED 2026-07-23

Another round of Raghav-requested changes, all shipped:

- Brand click scrolls to top. The header brand is a Link to "/" with an onClick
  that, on the home page, prevents the no-op navigation and smooth-scrolls to the
  top instead. The logo and favicon were already theme-aware (text tokens and a
  prefers-color-scheme favicon), so no change was needed there.
- Reliable section links. Same-page anchors were switching routes without
  scrolling (Next Link to "/#id" from "/" is a no-op for the hash). Desktop nav
  and Hero CTAs are now native anchors so the browser handles the smooth scroll
  (CSS scroll-behavior plus scroll-mt on sections). Mobile menu links use a
  handler that closes the menu (which unlocks body scroll) then scrolls to the
  target, and still navigates home from the 404 page. This fixes "Get in Touch"
  and every other section redirect. The Gmail-compose contact and schedule
  helpers were already correct (covered by tests) and unchanged.
- Experience (03) is now a two-column timeline. Left, next to the dot: period and
  location, role, company, subtitle. Right: a card with the description bullets
  and the stack chips. No inner scrollbar anywhere; each card grows to show its
  full description. The scroll-driven fill line and dot activation are kept.
- Projects (04) back to a grid. Two-column grid (single column on mobile) with
  items-start. Cards expand in place (height only, no col-span change) so the
  grid stays smooth. Status on open, images if any, tech tags always visible.
- Play control. The Play Reel label is gone; it is now an icon-only Play/Stop
  button, smaller, at the bottom-right, with a constant color and a soft primary
  glow pulse. Fixed size means toggling no longer shifts its position. The heavy
  bottom scrim was removed for a cleaner image.
- Hero landing tidy. Removed the "Mumbai, India" location pill. The social row is
  now icon-only and limited to LinkedIn, GitHub, LeetCode (in that order); Email
  and Resume were removed from that row. site.json socials were reordered to
  match, and the content test updated.
- Contact (07). Added the mobile number (site.phone) with a tel: link and a phone
  icon. The value is a placeholder (+91 00000 00000) pending the real number.
- About (01). Brought the profile photo back to fill the empty space: a two-column
  layout with the copy on the left and a framed portrait (with soft accent shapes)
  on the right.

Gates after this round: lint 0, `npm test` 21 passing, `npm run build` 0. The
profile photo, the tel: link, and the removal of the Play Reel label were
verified in the built out/index.html.

Open: replace the placeholder phone number with Raghav's real mobile number.

## D25. Refactor/fix pass, RESOLVED 2026-07-25

A scoped fix list from Raghav, no new features or redesign. Shipped:

- Experience (03) meta now two lines (period, then location) instead of one
  line joined by a middle dot, for every role. Desktop-only: description
  bullets now stay on one line each (the card's left meta column narrows and
  its text drops to 13px at `lg:`, tablet and mobile untouched, still wrapping
  as before).
- Dark mode was already the default (`next-themes` `defaultTheme="dark"`,
  `enableSystem={false}`) and is verified as such (no flash, confirmed via a
  fresh browser context with no stored preference); no code change was needed.
- Footer moved outside the `DoodleField`'s shared wrapper `<div>` and given its
  own `bg-background`, so the ambient doodle background layer for About
  through Contact stops at Contact and the footer reads as its own isolated,
  contained block, not a continuation of the section above it.
- Resume link: `resumeUrl` now falls back to a new `site.json` field
  (`resumeFallbackUrl`) when `NEXT_PUBLIC_RESUME_URL` is unset, instead of
  silently hiding the Resume button.
- Custom cursor: position tracking dropped its `useSpring` smoothing (raw
  motion values instead), so it follows the pointer with no added lag. The
  inner dot is now `absolute`-positioned and offset by exactly half its own
  size (matching the ring's existing technique), fixing a bottom-right offset
  that came from the dot being the only in-flow child sizing its animated
  parent. The ring's own spin and hover-scale spring were untouched.
- Hover polish extended (not duplicated) from the existing "View My Work"/"Get
  in Touch" treatment: the Hero social icons and the HeroMedia Play Reel
  button now sit in `MagneticButton`, and Skills tech tags gained a
  `whileHover` lift/scale layered on their existing border-glow.
- Projects (04): the two `featured: true` entries (1Link, TypeRush) render
  open by default; every other project is now mounted only after "Show more
  projects" is clicked (an `AnimatePresence`-wrapped toggle), and a second
  button links out to the full `github.com/withrvr?tab=repositories` list.
  Original list order/index is preserved for the "01, 02, ..." numbering
  regardless of which group a card is in. Updated the Projects render test,
  which previously asserted every project name was always in the DOM.
- Page `<title>` is now the literal "Raghav Rathi | Backend Software
  Engineer" (`site.pageTitle`, a new field), decoupled from the Open Graph
  title (`site.meta.ogTitle`, unchanged) so social-preview copy didn't have to
  change to fix the tab title.
- Loader text changed from the brand mark ("RVR.") to "> running
  withrvr.exe", at a smaller monospace size so the longer string fits.
- Theme toggle no longer flashes: a broad but low-specificity `background-
  color`/`border-color`/`color`/`fill`/`stroke` transition on `html, body, *`
  smooths the swap; anything with its own `transition-*` utility (hover
  states, existing Framer Motion animations) keeps that instead since a class
  selector always wins over the universal one. Disabled under
  `prefers-reduced-motion: reduce`, matching the rest of the site.
- 404 eyes: kept the existing cursor-tracking pupil and added an independent
  blink timer (random 2.5-5s cadence) that keeps blinking through cursor
  movement rather than only reacting to it; the pupil also fades out during
  the blink.
- Education diploma coursework: "Programming in C" to "Programming in C/C++".
- Contact (07) form: the grid switched from `items-start` to (the default)
  stretch so the form card matches the left column's height, with the message
  textarea as a `flex-1` child that grows to fill the extra room, instead of
  floating short next to the taller contact-info column.
- Footer commit hash is now a link to the commit on GitHub
  (`site.meta.repoUrl` + `/commit/` + the short hash) when a real commit hash
  exists; falls back to plain, unlinked text when it doesn't (for example a
  local build outside a git checkout, where `COMMIT_HASH` is "dev").
- Left unchanged, on Raghav's instruction: every existing "Python ecosystem"
  occurrence (Hero subheadline, About bio/paragraph, Experience subtitle).
  Initially misread as a Skills-section edit; the phrase does not appear in
  `skills.json`, so no wording was touched anywhere.

Gates after this round: lint 0, `npm test` 22 passing (added a second Projects
test for the toggle), `npm run build` 0. Verified visually with Playwright
across desktop (1440px), tablet (834px), and mobile (390px) viewports,
including a fresh-context check for the dark-by-default flash, a forced-timer
check that the 404 blink actually fires, and a pixel-level crop confirming the
cursor's inner dot is centered.

## D26. Selection styling, name shortening, and SEO/repo standard files, RESOLVED 2026-07-25

- Text selection: themed `::selection` (background from `color-mix` on
  `--primary`, so it already adapts per theme) replaces the browser default
  blue, in `globals.css`. Section-specific overrides remain available via
  Tailwind's `selection:` variant if one is ever needed; none currently is.
- Name shortened everywhere: `site.fullName` is now "Raghav Rathi" (dropped
  the middle name "Vikram"), including `package.json`, `README.md`, and the
  docs that quoted it. The Hero heading's per-letter reveal was restructured
  from one flat character list to a per-word grouping (`whitespace-nowrap` on
  each word, a real space as a sibling text node between them), so the name
  fits on one line whenever there's room and otherwise wraps exactly between
  "Raghav" and "Rathi", never mid-word. The stagger index for the reveal
  animation is now precomputed once at module load (not mutated during
  render), since the previous inline mutable counter tripped the
  `react-hooks/immutability` lint rule.
- SEO/discoverability and repo hygiene: added `src/app/manifest.ts` (Next.js
  metadata route, auto-linked in `<head>`, output `manifest.webmanifest`) and
  `src/app/llms.txt/route.ts`, a markdown mirror of the whole page for AI
  agents and bots per the [llms.txt](https://llmstxt.org) convention, both
  built from the same `src/data/*.json` the page renders. `robots.txt` and
  `sitemap.xml` already existed as metadata routes (`src/app/robots.ts`,
  `src/app/sitemap.ts`); confirmed both still emit correctly. Added
  `LICENSE` (MIT), `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, and
  `.github/ISSUE_TEMPLATE/` (bug report, feature request, other, config) plus
  `.github/PULL_REQUEST_TEMPLATE.md`, adapted from the reference repo
  `withrvr.github.io` to this project's actual stack (Next.js not Vite,
  content split across `src/data/*.json` not one `portfolio.json`, `docs/`
  not `.claude/skills/portfolio-dev/`, `npm test` added to the checklists).
  Added `author`, `license`, `homepage`, `repository`, `bugs`, and `keywords`
  to `package.json`, matching the reference repo's fields. Skipped
  `.htaccess`: neither GitHub Pages nor Vercel run Apache, so it would be
  inert dead weight, not a fix.

Gates after this round: lint 0, `npm test` 22 passing (added a guard that
`site.fullName` never contains "Vikram"), `npm run build` 0, including
`out/manifest.webmanifest` and `out/llms.txt` both present and correctly
linked/formed. Verified visually: the name fits on one line at normal mobile
widths and wraps cleanly between words at an artificially narrow width;
selection highlight checked in both themes.

## D27. Loader bug, Projects bugs, and a second hover pass, RESOLVED 2026-07-25

- Loader (very important, first thing a visitor sees): fixed a real bug where
  "> running withrvr.exe" rendered as two visibly offset copies instead of
  one water-fill reveal. Root cause: the wrapper had `px-6` padding, so the
  absolutely positioned reveal layer (`inset-0`, which resolves against the
  padding box) sat 24px to the left of the dim background layer (a normal
  in-flow child, positioned at the content box). Fix: `px-6` to `mx-6`
  (margin, outside the box `inset-0` measures against), so both layers now
  share the exact same box. Confirmed via `getBoundingClientRect` that both
  layers have identical x/width, and visually that the fill reads as one
  string bottom-filling correctly. Root-caused this by copying the project
  into an isolated scratch directory with its own dev server, since testing
  in the live project's own `.next` cache had been corrupting an
  already-running session (see the note below on that).
- Projects section, two real bugs: (a) when 1Link and TypeRush are both open
  by default, one card was short and the other tall, with no relationship
  between them. The grid had `items-start` (each column sized to its own
  content) and the details block had no way to grow. Fixed by having the
  grid stretch (removed `items-start`, default is `stretch`), each
  `ProjectRow` is now `flex h-full flex-col`, and its open "details" block is
  `flex-1` with the links row pushed to the very bottom via `mt-auto` — a
  shorter project's card now grows to match its taller sibling, with the gap
  landing between the description and the buttons, exactly as asked, instead
  of at a random spot. (b) "Show more projects" caused the page to visually
  jump away from the button on click, in both directions. A first attempt
  (measure the button's position, `requestAnimationFrame` twice, then
  `scrollBy` the delta) fixed expand (new cards mount immediately, so the
  layout change is synchronous) but not collapse, because the removed
  `ProjectRow`s have a 0.25s exit fade (added along the way, so removal
  isn't jarring) and the grid doesn't actually shrink until that finishes,
  ~250ms after the double-rAF already ran. Replaced it with a
  `ResizeObserver` on the grid container that compensates scroll against a
  running height baseline for every resize notification it gets (not just
  the first, since the exit fade can emit more than one before settling),
  self-disconnecting after 600ms. Verified with real before/after
  measurements: button's viewport position moves by under 2px in both
  directions now, versus roughly 960px before the fix.
- Hover pass, continuing from the D25 round: `Chip` (used for every tag
  site-wide: tech stacks, coursework, highlights) now lifts and scales on
  hover via Framer Motion, so the effect reaches every usage from one place.
  Achievement and Education cards gained a lift (`whileHover`) plus a
  border/shadow brighten on hover, matching Projects' existing card
  language. The About profile photo and every Projects screenshot thumbnail
  now zoom slightly on hover (`group-hover/thumb:scale-110`, a Tailwind
  named group so it doesn't clash with the project card's own unnamed
  `group`). The Hero right-side panel (poster/video, sparkle, gold shape,
  primary circle, peach dot, tagline card) now does a small uneven shuffle
  on hover, each piece moving a different amount, as a "waking up" tease
  before the visitor presses play; the tagline card (the one explicitly
  named in the request) is one of the pieces that shuffles. Implementation
  note for future-me: a first attempt used Framer Motion variant
  propagation (`whileHover="hover"` on the parent, each child on
  `animate="rest"` with matching `variants`) instead of lifted state,
  expecting it to be cleaner; it never actually triggered in testing (traced
  to real vs. synthetic pointer events, not conclusively root-caused) and
  was replaced with plain lifted `useState` + `onHoverStart`/`onHoverEnd`,
  which does work and is what's shipped. Each shape with its own mount
  entrance is split into an outer layer (the original entrance animation,
  completely untouched) wrapping an inner layer that only ever reacts to the
  lifted hover boolean, so the one-time entrance delay and the repeatable
  hover reaction never share a transition and can't fight over timing.
- Found and fixed a real, unrelated correctness bug while chasing why the new
  CSS-only hover effects (image zoom, card border-brighten) appeared not to
  apply: the D25 "smooth theme toggle" rule
  (`html, body, * { transition-property: ... }` in `globals.css`) was
  unlayered. Cascade layers rule: unlayered CSS always wins over layered CSS
  regardless of specificity, so this one rule was silently overriding every
  Tailwind `transition-*` utility site-wide (confirmed via
  `getComputedStyle(el).transitionProperty`, which showed only the D25
  rule's properties, never `transform`, on elements with their own
  `transition-transform` class). Fixed by wrapping it in `@layer base`,
  which restores normal specificity-based resolution against Tailwind's
  `@layer utilities`. This was a latent bug from the moment D25 shipped, not
  something this round introduced; nothing before this round depended on a
  CSS `transition-*` utility overriding that rule; only made visible now
  because it's the first time this project added a plain-CSS (non-Framer)
  hover animation.
- Testing note for future rounds: do not run a second `npm run dev` (or
  `npm run build`) against this project's own `.next` while another dev
  server for it might still be running (including one the user is looking
  at) — Turbopack's persistent cache is not safe for two concurrent
  processes and corrupts (`Persisting failed`, `ChunkLoadError`,
  `Cannot find module '../chunks/ssr/[turbopack]_runtime.js'`). If a second
  server is needed for verification, copy the project to a scratch
  directory (source only; `node_modules` needs a real copy, not a symlink,
  since Turbopack refuses a `node_modules` symlink that points outside the
  project root) and run it there instead, on its own port.

Gates after this round: lint 0, `npm test` 22 passing, `npm run build` 0.
Verified in an isolated copy of the project (see the testing note above):
loader layer alignment via `getBoundingClientRect`, Projects card heights
equal (836.45px both) and toggle button position stable (<2px delta) across
expand and collapse, and every new hover effect confirmed via measured
`scale`/position changes rather than by eye alone (a first pass of screenshot
comparisons proved unreliable because of scroll-settling and cursor timing,
not because the features were broken).

## D28. Footer alignment, hero dot contrast, and hero video audio, RESOLVED 2026-07-25

Three smaller fixes after the D27 round, plus one reversal of D13.

- Footer alignment. Its content sat about 32px inside every other section's
  left and right edge. `SectionWrapper` (Contact and every other section) puts
  `max-w-6xl` and the `px-6 sm:px-8` padding on the same element, so the
  padding is measured inside the already-centered 1152px box. Footer instead
  had the padding on the outer full-width `<footer>` and the `max-w-6xl`
  centering on a separate inner `<div>`, so its padding applied before
  centering rather than inside it. Moved the padding onto the same inner div
  as the centering, matching `SectionWrapper`'s recipe exactly. Verified with
  `getBoundingClientRect`: the footer brand mark and the Contact heading now
  share a left edge to the pixel (delta 0) at both 1920px and 1280px.
- Hero decorative peach dot. It sits on the `bg-primary` circle. In light mode
  that circle is dark teal (`#1B6B5C`) so the peach popped; in dark mode it is
  bright teal (`#3ECFB8`), close enough in lightness to the peach that the dot
  read as flat and muddy. Added a `border-2 border-background` ring so it reads
  as a clean punched-out circle against either theme's primary, with no
  per-theme color swap needed. This came out of a wider accent-color
  discussion for the hero backdrop; the backdrop color itself is Raghav's call
  and is not a code change (recommendation on file: `var(--peach)` / `#F2A785`,
  which is already theme-invariant in `globals.css`).
- Hero video audio, and the reversal of D13's "muted". The `<video>` in
  `HeroMedia.tsx` had `muted` hardcoded with no unmute control, so the clip's
  spoken intro could never be heard by anyone. `muted` is only required to
  satisfy browser autoplay policy; nothing here autoplays (no `autoplay`
  attribute, and the only `play()` call is inside the button's click handler),
  and a user-initiated play is allowed to carry audio. D13 justified `muted` as
  making "user-initiated play work on mobile", which is wrong: that is
  `playsInline`'s job, and `playsInline` is retained. Removed `muted` only.
  Confirmed first with `ffprobe` that `hero_video.mp4` actually carries a real
  audio stream (AAC stereo 48kHz, mean -24.1 dB / peak -2.7 dB, i.e. genuine
  speech and not a silent track) so the fix would have any effect at all.

Gates after this round: lint 0, `npm test` 22 passing, `npm run build` 0. The
audio fix was verified at runtime under Chromium's strict
`--autoplay-policy=document-user-activation-required`, so the no-autoplay check
is meaningful rather than passing by default: paused with zero audio bytes
decoded on load, then after clicking play `muted: false` with
`webkitAudioDecodedByteCount` climbing 44k to 76k (audio genuinely decoding,
not merely an unset flag), stop still resetting to `currentTime: 0`, and no
console errors, which matters because unmuting risks the `play()` promise
rejecting into the existing `.catch()` and silently leaving the video hidden.
Built `out/index.html` emits `<video playsInline preload="metadata">` with no
`muted` or `autoplay`.

Open, on Raghav: the hero video and its poster are being re-recorded from a new
script (the spoken line is now "Most code works on the happy path. I work the
other one - messy data, real load, three a.m. Boring, correct systems. That's
what I build."). Once the final cut lands, the video needs a `<track>` caption
file: the audio now carries meaningful content, so WCAG 1.2.2 applies and there
is currently no caption track. Also note both `hero_video.mp4` (1280x720) and
`hero_image.webp` (1672x941) are 16:9, while the hero container renders at
roughly 304x460 (2:3 portrait), so `object-cover` currently discards about 63%
of each frame's width. Raghav has decided to keep 16:9 for now because the
asset is also used outside this site.

## D29. Performance pass: devicons-react removal and image re-encoding, RESOLVED 2026-07-27

A Lighthouse mobile audit reported Performance 35-42/100 and LCP 23-27s. Root
cause, diagnosed rather than guessed at:

- `devicons-react`'s entry module (`lib/index.js`) does an unconditional
  CommonJS `require()` of all ~3,700 icons it ships. The app used exactly one
  of them (the AWS wordmark in Skills), but bundlers cannot tree-shake
  eagerly-executed `require()` calls, so that single import pulled the whole
  icon set into the client bundle as a single 9.4MB JS chunk. Under
  Lighthouse's mobile CPU throttling, parsing and executing that chunk
  delayed hydration, which gates the hero content's Framer Motion opacity-in
  animation (`initial={{ opacity: 0 }}`), directly delaying LCP: an element
  at opacity 0 does not count as painted.
- Separately, `hero_image.webp` (the `priority`-loaded hero poster, and the
  actual LCP resource) was raw PNG data mislabeled with a `.webp` extension:
  1672x941px, 1.5MB, despite rendering at a max of about 380 CSS px wide.

Fix: replaced the sole `devicons-react` usage with a hand-inlined SVG
component (`AwsIcon` in `Icon.tsx`) using the same path data (pixel-identical
output), and dropped the dependency. Re-encoded `hero_image.webp` as true
WebP at 1200px wide, quality 82 (1.5MB to 46KB; same crop via `object-cover`,
no visual change). `og_image_v2.jpg` had the identical mislabeled-PNG bug
(same source photo, only ever fetched by social-media crawlers, never by the
page itself) and was fixed alongside it (1.5MB to 63KB real JPEG).

Result, local Lighthouse mobile with simulated throttling (same methodology
as the reported baseline): Performance 35-42 to 84. LCP 23-27s to 4.0s. TBT
1.4-3.1s to 207ms. Speed Index 6-12.4s to 1.7s. Total page weight 5.05MB to
496KB. Accessibility, Best Practices, and SEO unchanged at 100/100/100. No
component, layout, animation, or copy changed.

Not fixed, flagged rather than silently patched: the remaining LCP headroom
(4.0s versus the under-2.5s target) now traces to a different element on
typical mobile viewports (412x823), the About-section portrait photo, gated
by its existing `whileInView` fade-in (a deliberate scroll-reveal feature,
left untouched). Closing that gap further would mean cutting aggregate
main-thread JS work at hydration, for example migrating Framer Motion's
`motion` usage to its `LazyMotion`/`m` pattern, or deferring hydration of
below-fold sections. Both are mechanical but touch 10+ files each with many
call sites; left for a dedicated follow-up rather than a blind refactor with
no room here for the interaction-level regression testing it would need.

Version bumped to 2.0.2 (`package.json`, `version.ts` fallback) to mark this
release.

Gates after this round: lint 0, `npm test` 22 passing, `npm run build` 0.
Verified visually (mobile 390px and desktop 1440px screenshots of Hero and
the Skills section's AWS icon) with no visible change from before the pass.

## D30. Issue #2 bug batch (hero video, play-button pulse, lightbox, keyboard), RESOLVED 2026-07-29

Four real bugs from a Chrome-on-macOS bug report, one already-fixed pair
re-verified, and one deeper bug found while building the fourth fix.

- Hero video rectangle on play, macOS Chrome/Safari only. Root cause: a
  playing `<video>` gets promoted to its own hardware-decode compositing
  layer on macOS, and that layer ignores the wrapper's `border-radius` +
  `overflow: hidden` clip, painting as a plain rectangle over the pill shape.
  Windows and mobile don't promote the layer the same way, so they never
  showed it. Fixed by applying the same `rounded-t-[999px] rounded-b-3xl` to
  the `<video>` element itself (`HeroMedia.tsx`), so its own layer clips its
  own corners regardless of ancestor clipping.
- Play-button pulse animation snapping back to frame 1 every cycle. The glow
  ring animates keyframes `scale: [1, 1.7]` with `repeat: Infinity` and
  Motion's default `repeatType: "loop"`, which restarts from the first
  keyframe instead of reversing. Changed to `repeatType: "mirror"` (reverses
  both value and easing, for a symmetric turnaround) and skipped entirely
  under `useReducedMotion()`. Verified by sampling the ring's computed
  `transform`/`opacity` every 150ms through a full cycle: scale rose to
  ~1.70 then descended smoothly (1.70, 1.64, 1.55, 1.47, ...) with no jump.
- "Show more/fewer" scroll stability, first pass: re-verified D27's
  `ResizeObserver` + `scrollBy` compensation with instrumented Playwright
  measurements (native DOM `.click()`, not Playwright's own
  click-and-scroll-into-view helper, which was a red herring on the first
  attempt and produced a false ~578px "overshoot" that traced to
  Playwright's own actionability behavior, not the app): toggle button
  position moved under 1px on both expand and collapse, so this was
  initially logged as no change needed. That measured only the resting
  position before and after, not the motion in between, and missed a real
  bug (see below).
- Image lightbox for project screenshots: previously clicking an image did
  nothing. Added `yet-another-react-lightbox` (Raghav approved; ~360KB
  unpacked, loaded via `next/dynamic` so it's not in the initial bundle) with
  its Zoom plugin, in a new `ProjectLightbox.tsx` mounted once at the
  `Projects` section level (not per-card) and driven by lifted state so only
  one instance ever exists. The library handles Esc/backdrop close,
  arrow-key nav, swipe/pinch-zoom, and scroll lock on its own; two gaps
  needed covering explicitly: it doesn't hide prev/next arrows for a
  single-image project (suppressed via its `render.buttonPrev/buttonNext`
  slots when `slides.length <= 1`), and its focus-restore-on-close relies on
  the browser populating `FocusEvent.relatedTarget`, which only happens for
  a real mouse click, not a keyboard Tab-then-Enter open; `Projects.tsx` now
  also stores the triggering button and focuses it explicitly on close.
- Found while building the lightbox, not part of the original report: Enter
  on any nested control inside an open card (an image thumbnail, or the
  pre-existing GitHub/crates.io links) didn't activate it. `ProjectRow`'s
  card-level `onKeyDown` (added for the card's own Enter/Space-to-toggle
  keyboard support) fired on every bubbled keydown regardless of source,
  calling `preventDefault()` and closing the very card the nested control
  lives in. This silently broke keyboard activation of the existing links
  too, not just the new lightbox trigger. Fixed by checking
  `e.target === e.currentTarget` before toggling.
- Found after the first pass, from screenshots showing a closed card
  (TypeRush, or "Prompt Navigator" once expanded) sitting next to an open
  sibling: my initial read of D27's row-height fix was incomplete. D27's
  `items-stretch` (removed `items-start`) correctly equalizes two OPEN
  cards' heights, but it also stretches a CLOSED card to match an open
  sibling, producing exactly the empty-box-below-the-tags symptom in the
  screenshots; my first verification pass only measured the "both open" and
  "both closed" cases (which happen to look identical either way) and never
  the mixed case. Fixed with `self-start` on a closed card so it opts out
  of the row stretch and sizes to its own compact content, while leaving
  the "both open" stretch behavior untouched.
- Also found from the screenshots: the custom cursor (and the lightbox's
  own zoom/grab cursor) were invisible whenever the lightbox was open. Both
  the cursor ring and the lightbox portal use `z-index: 9999`; the portal,
  mounted later in the DOM, painted over the ring, and the site's
  `cursor: none` rule (how the custom cursor hides the native one) also
  applies inside the portal, blocking the library's own cursor styling.
  `ProjectLightbox` now dispatches a small window event on open/close, and
  `Cursor.tsx` fully steps aside for the duration instead of fighting for
  z-index space.
- Reported again after the above round shipped: "show more/fewer projects"
  still visibly scrolled/redirected the page. Root cause: `globals.css`
  sets `scroll-behavior: smooth` on `<html>` site-wide, and the legacy
  two-argument `window.scrollBy(x, y)` form inherits that instead of
  snapping, so D27's compensation was animating over roughly 300-500ms
  instead of jumping instantly. Combined with the `ResizeObserver` firing
  more than once per toggle (an already-documented possibility, for the
  collapse case in particular), a new animation would restart mid-flight
  through the previous one, reading as the page moving on its own, even
  though the resting position was correct, which is exactly why the D27
  re-verification above measured before/after and found nothing wrong.
  Switched to `window.scrollBy({ top: delta, left: 0, behavior: "instant" })`
  to bypass the CSS default. Verified by sampling `window.scrollY` at 30ms
  intervals through both directions: expand held steady then snapped to
  its final value within one sample (no animated in-between values), and
  collapse held steady through the ~300ms exit-fade delay then likewise
  snapped in a single step.

Version bumped to 2.0.3 (`package.json`, `version.ts` fallback), a patch
release per `CONTRIBUTING.md`'s versioning rule (bug fixes, no new features
or breaking changes). Added `CHANGELOG.md` (Keep a Changelog format; didn't
exist before this round).

Gates after this round: lint 0, `npm test` 22 passing (updated the footer
version-string assertion to v2.0.3), `npm run build` 0, `tsc --noEmit` 0.
Verified with Playwright (Chromium) at 375/768/1440px in both themes: hero
playback and pulse, card open/close, "show more/fewer", lightbox open/nav/
close/keyboard/mouse paths, and focus restore. Not verified: real macOS
Chrome/Safari playback (the original bug's actual environment), and touch
swipe/pinch-zoom gestures (no touch-capable device in this environment).
