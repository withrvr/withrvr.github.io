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
- A closed project card sitting next to an open sibling got stretched by the
  grid's default row-height matching into a tall card with a big empty box
  below its tags. `self-start` now opts a closed card out of that stretch so
  it sizes to its own compact content; two open cards in the same row still
  stretch to match each other as intended. (#2)
- The custom site cursor (and the lightbox's own zoom/grab cursor) were both
  invisible while the image lightbox was open: the cursor and the lightbox's
  portal share the same z-index, so the portal (mounted later) painted over
  it, and the site's `cursor: none` rule also suppressed the library's own
  cursor styling inside the portal. The custom cursor now fully steps aside
  while the lightbox is open. (#2)

### Verified, no change needed

- The "show more/fewer projects" toggle keeping its on-screen position
  stable was already fixed in the prior [D27](docs/decisions.md#d27) round: a
  `ResizeObserver`-driven scroll compensation. Re-verified with instrumented
  Playwright measurements (sub-pixel scroll deltas on both open and
  collapse).
