# Progress Tracker

Updated as work moves.

## Status as of 2026-07-25

- Phase 0, reference analysis: DONE (reference-analysis.md).
- Phase 0.5, content inventory: DONE (content-inventory.md).
- Phase 1 plan: APPROVED with amendments (phase1-plan.md), all decisions resolved
  (decisions.md D1 to D20).
- Build: COMPLETE. The full site is built and all quality gates pass.

## What is built

- Scaffold: Next 16 static export, Tailwind v4 tokens (reference theme kept),
  next-themes dark and light, custom themed scrollbar, fonts.
- Content layer: typed JSON for site, profile, skills, experience, projects (all
  12, honest statuses), achievements, education. Loaders, mail helpers, version.
- UI primitives: Icon, MagneticButton, FloatingSparkles, PageTexture (grain and
  deterministic doodles), SectionWrapper, SectionHeader, Chip, HeroMedia,
  ScrollIndicator (tailed arrow).
- Chrome: Navbar with mobile menu and theme toggle, Footer with version and a
  commit hash linking to the commit on GitHub, custom Cursor (clickable state,
  touch and reduced-motion aware), water-fill LoadingScreen reading
  "> running withrvr.exe".
- Sections: Hero (poster plus play-once video with audio, no autoplay or loop),
  About (honest resume stats), Skills (icon registry plus text fallback),
  Experience (timeline plus sticky detail), Projects (1Link and TypeRush open by
  default, the rest behind a "Show more projects" toggle plus a link to all
  GitHub repos), Achievements (replaces Publications), Education (both entries),
  Schedule (Gmail-compose button), Contact (Gmail-compose form).
- Pages: composed home, creative interactive 404, sitemap, robots, manifest,
  llms.txt.
- SEO: metadata and Open Graph, no Twitter card, web app manifest, llms.txt
  markdown mirror for AI agents and bots.
- Assets: v1 hero image and video, profile photo, project images, og image,
  favicon copied into public/media and public.
- Tests: 22 Vitest tests (content integrity, mail helpers, component renders).
- Deploy: GitHub Actions workflow for Pages; Vercel works with no config.
- Repo hygiene: LICENSE (MIT), CODE_OF_CONDUCT.md, CONTRIBUTING.md, and
  `.github/` issue templates plus a PR template.

## Quality gates (all green, 2026-07-25)

- `npm run lint`: 0 problems.
- `npm run build`: 0 errors, static export to out/ (index.html, 404.html,
  sitemap.xml, robots.txt, .nojekyll, media).
- `npm test`: 22 passed across 3 files.
- Accessibility and SEO polish shipped (D22): keyboard focus ring, skip link,
  app-wide reduced motion, accessible hero heading, keyboard-operable project
  cards, JSON-LD Person schema, and theme-color. Gates re-verified green.

## Open, non-blocking (future or on Raghav)

- Final theme-aware hero videos (dark and light). Placeholders in use.
- Optional images for the projects that have none.
- Calendly or Cal.com scheduling integration (futurescope).
- Optional richer LinkedIn about prose.
- Review the drafted hero, about, and section microcopy and rewrite to taste.

## Log

- 2026-07-22: Phase 0 and Phase 0.5. Docs scaffold. Build location and static
  export confirmed. Versions resolved.
- 2026-07-23: Plan approved with amendments. Scaffold built and verified.
  Full site built section by section. Fell back TypeScript to 5.9.3 and ESLint to
  9.39.5. Added Vitest suite. Wrote README and deploy workflow. All gates green.
- 2026-07-23: Desktop and tablet polish pass (decisions D21). Header
  containerized, Resume link removed, nav trimmed and home-anchored, hero and
  section scaling reduced, Experience rebuilt (click-driven, scrollable),
  Projects cards cleaned up (status on expand only), Contact rebuilt to the
  reference layout with the schedule button, standalone Schedule section removed,
  About photo removed, coursework added to both degrees, Coding Ninjas moved to
  Achievements only, footer reduced to brand plus version, cursor shows the
  native cursor, theme-aware RVR favicon. Gates green, 21 tests.
- 2026-07-23: Accessibility and SEO polish pass (decisions D22). Global
  focus-visible ring, skip-to-content link, MotionConfig reducedMotion="user",
  aria-labelled hero heading, keyboard-operable project cards, role="img" 404
  display, JSON-LD Person schema, and per-theme theme-color. Verified present in
  built HTML. Gates green, 21 tests.
- 2026-07-23: Section reworks and content edits (decisions D23). Footer build
  date removed; education coursework updated (OOP moved to the diploma, added
  Advanced Java, Analysis of Algorithms, Data Warehousing, removed
  Microprocessors); Resume button reinstated in the header (desktop and mobile);
  Experience rebuilt as a no-click scroll-driven timeline tracker; Projects
  rebuilt as a smooth single-column stack (reference layout, status and images on
  open); Hero Play Reel moved to bottom-right so it no longer overlaps. Verified
  in built HTML. Gates green, 21 tests.
- 2026-07-23: Second feedback round (decisions D24). Brand scrolls to top;
  section links fixed to reliably smooth-scroll (native anchors plus a mobile
  handler) so Get in Touch and all redirects work; Experience made a two-column
  timeline (meta left by the dot, description and stack card right, no inner
  scroll); Projects returned to a smooth two-column grid (in-place expand);
  Play control is now a small icon-only glowing Play/Stop at bottom-right;
  landing tidied (removed location pill, socials icon-only LinkedIn/GitHub/
  LeetCode, no email/resume in that row); Contact gained a mobile number
  (placeholder pending the real one); About regained the profile photo in a
  two-column layout. Verified in built HTML. Gates green, 21 tests.
- 2026-07-25: Refactor/fix pass (decisions D25), no new features or redesign.
  Experience meta split to two lines and desktop-only single-line bullets;
  confirmed dark-by-default already worked; footer isolated from the doodle
  background and given its own commit-hash link to GitHub; resume link now
  falls back to a `site.json` default instead of hiding; cursor lag removed
  and its inner dot re-centered; hover polish extended to Hero socials, the
  Play Reel button, and Skills tags; Projects now opens 1Link/TypeRush by
  default behind a "Show more projects" toggle plus a GitHub-repos link; page
  title, loader text, and a diploma coursework entry updated; theme toggle no
  longer flashes; 404 eye now blinks on its own timer alongside cursor
  tracking; Contact form card now matches the left column's height. Verified
  visually across desktop, tablet, and mobile with Playwright. Gates green, 22
  tests.
- 2026-07-25: Selection styling, name shortening, SEO/repo files (decisions
  D26). Themed `::selection` replaces browser-default blue in both themes.
  `site.fullName` shortened to "Raghav Rathi" everywhere (was "Raghav Vikram
  Rathi"); Hero heading rebuilt to wrap only between first and last name,
  never mid-word, while still fitting one line when there's room. Added
  `manifest.ts` and `llms.txt` (both content-driven, like robots/sitemap),
  `LICENSE`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `.github/ISSUE_TEMPLATE/`,
  and a PR template, adapted from the `withrvr.github.io` reference repo to
  this project's actual stack. `package.json` gained standard npm metadata
  fields. Gates green, 22 tests (added a guard against "Vikram" regressing).
- 2026-07-25: Loader bug fix, Projects bug fixes, second hover pass
  (decisions D27). Loader was genuinely broken (two offset copies of the
  text instead of one water-fill); fixed a padding/inset mismatch between
  its two layers. Projects: 1Link/TypeRush card heights now match (grid
  stretch + flex-1 details + links pinned to the bottom via `mt-auto`), and
  "Show more projects" no longer jumps the page on click in either direction
  (a `ResizeObserver` on the grid compensates scroll against the actual
  layout change, which lands immediately on expand but ~250ms later on
  collapse due to the exit fade). Hover extended to `Chip` (every tag
  site-wide, via the shared component), Achievement/Education cards, the
  About photo and Projects screenshots (zoom on hover), and the Hero
  right-side panel (a small uneven shuffle of its pieces on hover, including
  the tagline card named in the request). Also found and fixed a real,
  unrelated bug while verifying the hover work: the D25 theme-transition CSS
  rule was unlayered and had been silently overriding every Tailwind
  `transition-*` utility site-wide since it shipped; moved it into
  `@layer base`. Gates green, 22 tests. Verified in an isolated copy of the
  project (running a second dev server against the live project's own
  `.next` cache corrupts it) via measured position/scale changes, not just
  screenshots.
- 2026-07-25: Footer alignment fix. Its content sat ~32px off from every
  other section's left/right edge: `SectionWrapper` (used by Contact and
  everything else) puts `max-w-6xl` and the `px-6 sm:px-8` padding on the
  same element, so padding is measured inside the already-centered 1152px
  box; Footer had padding on the outer full-width `<footer>` and the
  `max-w-6xl` centering on a separate inner `<div>`, so its padding was
  measured before centering instead of inside it. Moved padding onto the
  same inner div as the centering, matching `SectionWrapper`'s recipe
  exactly. Verified via measured `getBoundingClientRect`: Footer's brand
  mark and Contact's heading now share the same left edge (delta 0) at both
  1920px and 1280px viewports. Gates green, 22 tests.
- 2026-07-25: Hero decorative peach dot, dark-mode contrast fix. It sits on
  the `bg-primary` circle; in light mode that circle is dark teal so the
  peach dot popped fine, but in dark mode the circle is bright teal, close
  enough in lightness to the peach that the dot read as flat/muddy. Added a
  `border-2 border-background` ring so the dot reads as a clean "punched out" circle
  against either theme's primary color, no per-theme color swap needed.
  Verified visually in both themes via a cropped screenshot. Gates green,
  22 tests.
- 2026-07-25: Hero video audio fix. The `<video>` in `HeroMedia.tsx` had
  `muted` hardcoded with no unmute control, so the clip's spoken intro could
  never be heard by anyone. `muted` is only required to satisfy browser
  autoplay policy; nothing here autoplays (no `autoplay` attribute, and the
  sole `play()` call is inside the button's click handler), and a
  user-initiated play is allowed to carry audio. Removed `muted`; kept
  `playsInline`, which is still needed independently so iOS plays in place
  instead of going fullscreen. Confirmed first that `hero_video.mp4`
  actually has a real audio stream (AAC stereo 48kHz, mean -24.1 dB / peak
  -2.7 dB, i.e. genuine speech, not a silent track) so the fix would have an
  effect. Verified at runtime under Chromium's strict
  `--autoplay-policy=document-user-activation-required`: paused with zero
  audio bytes decoded on load (no autoplay), then after clicking play
  `muted: false` with `webkitAudioDecodedByteCount` climbing 44k to 76k
  (audio genuinely decoding, not just an unset flag), stop still resets to
  `currentTime: 0`, and no console errors (i.e. the `play()` promise did not
  reject, which was the main risk of unmuting). Built `out/index.html`
  emits `<video playsInline preload="metadata">` with no `muted`/`autoplay`.
  Gates green, 22 tests.
- 2026-07-27: Performance pass (decisions D29), no visual or feature change.
  Diagnosed a Lighthouse mobile Performance score of 35-42/100 and 23-27s LCP
  to two root causes: `devicons-react` shipping a 9.4MB JS chunk for one used
  icon (its entry module unconditionally `require()`s all ~3,700 icons it
  bundles, which no bundler can tree-shake), and the hero poster
  (`hero_image.webp`, the LCP resource) actually being raw PNG data
  mislabeled with a `.webp` extension at 1672x941/1.5MB. Removed
  `devicons-react` (replaced its one usage with a hand-inlined SVG); re-encoded
  the hero image as true WebP at 1200px (1.5MB to 46KB) and fixed the
  identical bug in the OG image (1.5MB to 63KB). Local Lighthouse mobile:
  Performance 35-42 to 84, LCP 23-27s to 4.0s, TBT 1.4-3.1s to 207ms, Speed
  Index 6-12.4s to 1.7s, page weight 5.05MB to 496KB. Accessibility, Best
  Practices, SEO unchanged at 100/100/100. Version bumped to 2.0.2. Gates
  green, 22 tests.
