# Future Scope

Features intentionally deferred out of the v2 build. Each entry states what it
is, why it is deferred, and how to add it later without a refactor. These are not
gaps or bugs; they are scoped-out on purpose.

## Deferred features

### 1. GitHub profile README sync (withrvr/withrvr)

- What: the reference mirrors a profile README pattern (Sadakakarla/Sadakakarla;
  the equivalent here is withrvr/withrvr). The idea was to surface the GitHub
  profile README content on the site.
- Why deferred: Raghav asked to drop it. It adds a client fetch to GitHub and a
  render path with little payoff for a portfolio that already presents this
  content directly. The withrvr/withrvr README is currently just a banner image,
  so there is nothing textual to sync anyway.
- How to add later: a small client component that fetches
  `raw.githubusercontent.com/withrvr/withrvr/main/README.md`, renders the
  markdown, and degrades to nothing on failure. No backend needed. Keep it lazy
  and out of the critical render path.

### 2. Commit-hash keyed data caching and invalidation

- What: cache the JSON content client side (localStorage or Cache API), keyed to
  the deployed commit hash, and invalidate plus refetch when the hash changes.
- Why deferred: Raghav asked to drop it. For a fully static export the content
  JSON ships in the bundle and is already fast on repeat visits via normal HTTP
  and browser caching, so an app-level cache adds complexity for marginal gain.
- How to add later: inject the commit hash at build time (see the kept footer
  display below), store fetched content under a `content:<hash>` key, and on load
  compare the current build hash to the stored key, clearing stale entries. All
  client side.
- Kept, not deferred: the footer will still DISPLAY the build version and short
  commit hash, injected at build time (the v1 pattern via a build define). Only
  the caching and invalidation logic is deferred, not the display.

### 3. Scheduling integration (Calendly or Cal.com)

- What: real booking integration for the "Schedule a 30-min Call" section, an
  embedded Calendly or Cal.com scheduler.
- Why deferred: Raghav has no scheduling account yet. Rather than block the
  section, v2 ships it now with a working button that opens a Gmail compose with
  a default scheduling message, addressed to Raghav.
- How to add later: replace the button handler (or wrap it) with the Calendly or
  Cal.com embed or popup. The section and button are built so this is a config or
  handler swap, not a layout change. The mail redirect stays as a graceful
  fallback.

## Not deferred (recorded here to prevent confusion)

- Static export config (`output: 'export'`): kept in the main plan. It is
  required for GitHub Pages, not an optional feature. See decisions.md D2.

## Optional enhancements (nice to have, not committed)

- Real theme-aware hero videos (dark and light Gemini-generated variants). The
  build wires up the component so this is a file swap, not a refactor. Note the
  single (theme-agnostic) hero video is separately being re-recorded from a new
  script, which is tracked in content-inventory.md's gap report, not here; only
  the light/dark pair is deferred.
- Captions for the hero video. Now that the clip plays with audio (decisions.md
  D28), a `<track>` element with a WebVTT file is the accessible answer. Not
  deferred by choice, just blocked until the final cut exists.
- A mute or volume control on the hero video. Today the only control is
  play/stop, so a viewer who wants it silent has to stop it entirely. Left out
  deliberately to keep the control cluster to one button; revisit if it annoys.
- Project image galleries for the projects that currently have no images.
- A writing or blog section.
- Analytics (privacy friendly, client only) if ever wanted.
- Richer LinkedIn-sourced "about" prose once provided.
