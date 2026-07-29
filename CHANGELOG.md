# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [2.0.3] - 2026-07-29

### Fixed

- Hero video showing a rectangle over the rounded pill shape on play, on
  macOS Chrome and Safari. macOS promotes a playing `<video>` to its own
  hardware-decode compositing layer, which ignored the wrapper's
  `border-radius` and `overflow: hidden` clip. The same radius is now applied
  directly to the `<video>` element so its own layer clips itself. (#2)
- Landing-page play-button pulse animation snapping back to its start frame
  every cycle instead of breathing smoothly in and out. The pulse's
  `transition.repeatType` was the Motion default (`"loop"`, restart from the
  first keyframe); changed to `"mirror"` so it reverses smoothly, and it's
  now skipped entirely under `prefers-reduced-motion`. (#2)
- Image viewer for project screenshots. Clicking a project image previously
  did nothing; added a full-screen, zoomable lightbox
  (`yet-another-react-lightbox` with its Zoom plugin) with keyboard
  navigation, Esc/backdrop close, swipe and pinch-zoom, background scroll
  lock, and a focus trap with restore on close. Projects with one image show
  no prev/next arrows. (#2)
- Keyboard activation of controls nested inside an open project card (an
  image thumbnail, or the existing GitHub/crates.io links): the card's own
  `onKeyDown` handler fired on every bubbled Enter/Space keypress and closed
  the card instead of letting the nested control handle it. Now only handles
  the keypress when the card itself is the event target. (#2)

### Verified, no change needed

- Project card open/close and the "show more/fewer projects" toggle were
  already fixed in the prior [D27](docs/decisions.md#d27) round: equal row
  heights when cards are open, and a `ResizeObserver`-driven scroll
  compensation that keeps the toggle button visually pinned. Re-verified with
  instrumented Playwright measurements (sub-pixel scroll deltas on both open
  and close) as part of this batch; the original report (#2) predates that
  fix reaching a release.
