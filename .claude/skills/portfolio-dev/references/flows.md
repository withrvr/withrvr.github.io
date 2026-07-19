# User-facing flows

How the interactive pieces of the site actually behave. File references point at
the source of truth for each flow.

## Page load / preloader (`Preloader.jsx`)

1. On mount, a full-screen `#ff2a2a` shutter covers the page with the brand name
   filling top-to-bottom (a clip-path "water fill" over 1.6s).
2. A `setTimeout` of **2200ms** flips `isLoading` to `false`.
3. `AnimatePresence` runs the exit: the shutter slides up (`y: -100%`) over 1.2s
   with an ease-in-out-quart curve, revealing the hero underneath.

The preloader is always shown once per page load; it is not gated on real asset
loading. (Note for screenshot/automation: wait ~4s after load before the hero is
fully visible.)

## Hero image ↔ video toggle (`Hero.jsx`)

- The hero shows a static image (`hero.image`, a WebP) by default. A talking-head
  intro video (`hero.video`, MP4) is stacked in the same box at `opacity-0`.
- Clicking **Play Reel** calls `toggleVideo()`:
  - If not playing: reset `video.currentTime = 0`, `video.play()`, and on success
    set `isPlaying` → image fades out, video fades in (700ms opacity crossfade).
  - If playing: `video.pause()` and `isPlaying` → false (back to image).
- The video does **not** loop. `onEnded` sets `isPlaying` false, returning to the
  image. Clicking again restarts from the beginning.
- Both media use `object-cover object-top` so the subject's head stays clear of
  the navbar at any viewport height.

## Navbar & scroll behavior (`Navbar.jsx`)

- The nav is `fixed` at the top, transparent over the hero.
- A window `scroll` listener sets `isScrolled` once `scrollY > 50`. When scrolled,
  the bar gets a solid dark blurred background (`bg-black/80 backdrop-blur-md`) so
  the white links stay legible over light sections (Education) and every other
  section. This was a real bug fix — transparent-over-white made links invisible.
- **Desktop:** center nav links + a "Hire Me" button linking to `#contact`.
- **Mobile:** a hamburger toggles `isOpen`; the slide-down menu uses a red
  background and closes on any link tap.

## "Routing" — anchor navigation (single page)

- There is **no router**. Every nav link is an in-page anchor: `#home`, `#about`,
  `#skills`, `#projects`, `#experience`, `#education`, `#contact`. Each maps to a
  section whose `id` matches.
- `html { scroll-behavior: smooth }` in `index.css` animates the jump.
- **Adding a section** = add the component to `App.jsx` in the desired order,
  give it a matching `id`, and add its label to the `navLinks` array in
  `Navbar.jsx` (the anchor is derived as `#${label.toLowerCase()}`).

## Contact action (`Contact.jsx`, helpers in `src/lib/site.js`)

- The contact section is **not a form** — no fields, no submit, no backend.
- The **Say Hello** button opens a Gmail web-compose window
  (`buildGmailCompose()`), pre-filled with the recipient, subject, and body from
  `portfolio.json.contactMail`. Gmail compose is used because it always opens
  somewhere visible, even on machines with no `mailto:` handler configured.
- A secondary plain-email link uses `buildMailto()` (a `mailto:` with the same
  prefill) for people who prefer their own client.
- The giant "CONTACT" background word parallax-scrolls via framer-motion
  `useScroll`/`useTransform`.
- To change any contact text/subject/body: edit `portfolio.json` →
  `personalInfo.email` and `contactMail.{subject,body}`. Do not hardcode in the
  component.

## Resume viewing (`Hero.jsx`)

- The **View Resume** button links to `personalInfo.resumeUrl`
  (`/raghav_rathi_backend_engineer_jul_2026.pdf` in `public/`) and opens it in a
  new tab (`target="_blank"`) for **in-browser viewing**, not a forced download.
  Viewers can download from the browser's built-in PDF controls.
- To swap the resume: replace the PDF in `public/`, then update
  `personalInfo.resumeUrl` (and `resumeFileName`) in `portfolio.json`.

## 404 / unknown URLs (`public/404.html`)

- GitHub Pages serves `404.html` for any unmatched path. This project's
  `404.html` redirects back to `/`, so deep links or stale URLs land on the
  homepage instead of a Pages error.

## Version + commit stamp (`Footer.jsx`)

- The footer shows the current `vMAJOR.MINOR.PATCH` and the short git commit hash
  of the deployed build, both injected at build time (see `versioning.md`). This
  lets anyone confirm exactly which build is live.
