# Phase 0: Reference Analysis

Reference repo: `withrvr.github.io/sadakakarla_portfolio/Sada-Portfolio-Website`.
Read only. It is itself a content fork of an earlier portfolio (see its
`progress.md`), built for a different person (Sada Kakarla, an AI/ML engineer).
The visual and motion system is mature. The content and some component names
carry a different identity, and several files are dead leftovers.

## 0.1 Stack and tooling

- Next.js 16.2.4, App Router. React 19.2.4. TypeScript 5, strict mode on.
- Tailwind CSS v4, CSS first (no JS config), via `@tailwindcss/postcss`.
- Framer Motion 12.38.0 (imported as `framer-motion`). Note: the package also
  ships as `motion` / `motion/react`; our brief names `motion`.
- next-themes 0.4.6 for dark/light. lucide-react, @icons-pack/react-simple-icons,
  devicons-react for icons.
- Backend piece: `resend` used in `src/app/api/contact/route.ts` to send the
  contact form email. This is the only server dependency.
- ESLint 9 flat config (next core-web-vitals + typescript). No Prettier.
- Hosting: Vercel, deploy on push to main. `next.config.ts` empty. No static
  export, and it has a server route, so as built it is a server deployment.

Dead or unused (confirmed 0 imports in src): `ui/neural-canvas.tsx`,
`ui/loader-10.tsx`, `ui/navbar-menu.tsx` (only a commented import references it),
`ui/button.tsx`. Unused deps: `three`, `@types/three`, `next-mdx-remote`,
`gray-matter`, `@fontsource/syne`, `@fontsource/jetbrains-mono`, and `shadcn`
(runtime). `@base-ui/react` and `class-variance-authority` are used only by the
dead button file. None of these carry over.

## 0.2 Architecture

Single page (`/`) plus one API route (`/api/contact`). No `not-found.tsx`
(default 404). No dynamic routes.

```
src/app/           layout.tsx, page.tsx, globals.css, favicon.ico, api/contact/route.ts
src/components/     Navbar, Cursor, LoadingScreen, Footer, ThemeProvider
src/components/sections/  SectionWrapper, Hero, About, skills, Experience,
                          Projects, Education, Publications, Contact
src/components/ui/  magnetic-button, floating-sparkles, page-texture (used),
                    neural-canvas, loader-10, navbar-menu, button (dead)
src/lib/utils.ts    cn() helper
public/             profile.png (1348x1422, 1.1MB), Next default SVGs (unused)
```

Hierarchy: RootLayout wraps ThemeProvider around LoadingScreen, Navbar, Cursor,
children. Home renders Hero, GrainOverlay, then a relative wrapper with
DoodleField plus About, Skills, Experience, Projects, Education, Publications,
Contact, Footer. Every section except Hero uses SectionWrapper.

State: local useState only. Theme state in next-themes. No global store.

Content model: hardcoded. Every section holds its data as a typed const array at
the top of its own .tsx file. No JSON, no CMS, no markdown. This is the single
biggest structural change for v2, which requires all content in JSON.

## 0.3 Styling system

Tailwind v4 CSS first. `globals.css` imports tailwindcss, tw-animate-css,
shadcn/tailwind.css, defines a `dark` custom variant, maps tokens under
`@theme inline`. Palette is teal, peach, cream, via CSS variables on `:root`
(light) and `.dark` (dark):

- Light: background `#FDF3E7`, foreground `#1B3A35`, primary `#1B6B5C`, card
  `#FBEADA`, plus `--peach #F2A785`, `--gold #F2C078`, text-safe `--peach-text
  #B85C34`, `--gold-text #9C6B1E`.
- Dark: background `#0D1A17`, foreground `#F5EBDD`, primary `#3ECFB8`, card
  `#132420`; peach and gold constant; text-safe variants brighten.
- Radius derived from one `--radius: 0.625rem` via calc multipliers.

Tokens referenced through Tailwind classes and raw `var()` in arbitrary values
and `color-mix()` tinted chips. Fonts via `next/font/google`: Fraunces (heading),
Manrope (sans and mono), Caveat (script). Breakpoints: Tailwind defaults, in
practice sm, md, lg. Theme switch: next-themes, attribute class, defaultTheme
dark, enableSystem false, suppressHydrationWarning on html, toggle gated behind a
mounted flag.

## 0.4 Motion and interaction

- LoadingScreen: CSS keyframe orb (rotation plus shifting inset box-shadows),
  "Thinking...." text, over hardcoded `#080808`. Fade out via AnimatePresence.
  Time based, 2200ms setTimeout, not tied to real load. The whole intro (Navbar,
  Hero) is delay staggered to this magic number, which is fragile.
- Hero: useScroll plus useTransform fade and lift on scroll away. Per character
  name reveal. Magnetic CTA buttons.
- SectionWrapper: useInView with margin, animates opacity and y in and out.
- About: CountUp animates numbers from 0 on first in view.
- Skills: spring pop in, hover sets brand color and glow.
- Experience: scroll linked progress line, pulsing active dot, sticky detail
  panel swapping entries via AnimatePresence mode wait.
- Projects: layout animations, click to expand a card in place, siblings reflow,
  hover tilt and lift.
- Ambient: FloatingSparkles (Hero), DoodleField (deterministic, about 70 marks),
  GrainOverlay (SVG feTurbulence, mix-blend-overlay).
- Cursor: single 16px primary dot, mix-blend-difference, spring followed. Does
  not change state on hover. No touch handling.
- Page transitions: none. Reduced motion: none anywhere.

## 0.5 Content model and assets

Sections in order: Hero, About (bio plus animated stats), Skills (categorized
icon tiles), Experience (timeline plus sticky detail), Projects (expandable
cards), Education (cards plus coursework chips), Publications (paper cards with
DOI), Contact (info plus message form), Footer. Data shapes are inline consts.
One raster asset (profile.png) via next/image. Icons from three React libraries
plus hand authored inline SVG.

## 0.6 Notable details

- DoodleField positions are deterministic (no Math.random) to avoid hydration
  mismatch. Documented lesson.
- SectionWrapper and Footer carry explicit `relative z-10` because their
  transform creates a stacking context; doodle layer sits at z-0. Active cards
  must keep an opaque background or doodles bleed through. Carry these forward.
- SEO minimal: title and description only. No Open Graph, no sitemap, no robots.
- Accessibility partial: aria-label on theme toggle, cursor pointer-events-none.
  Missing: reduced motion, mobile menu, skip link, consistent aria-hidden on
  decorative SVGs.

## 0.7 Port assessment

PORT: Next+React+TS strict, Tailwind v4 token system, next-themes, SectionWrapper
reveal, Experience timeline, Education, ambient system (magnetic button,
FloatingSparkles, DoodleField, GrainOverlay).

ADAPT: Hero (swap static image for theme-aware looping video with play control
and poster; rework the delay coupled intro), About (refill from resume, honest
metrics only), Skills (re-pick icons for a Django first backend stack), Projects
(add image support in the expanded view, add honest status labels), Contact info
column (remove recruiter-bait framing, keep scheduling CTA), Footer (keep short,
add commit hash display, remove X), Cursor (add clickable-state change, touch
degradation), LoadingScreen (rebuild from v1 water-fill model, decouple from
magic-number delays), scroll indicator (trailing/tailed arrow), Framer Motion
import path (`motion`).

DROP: Publications (replaced by Achievements), Resend and the API route (backend),
all dead files and unused deps.

BLOCKED under no-backend: the Resend contact form. Resolve via the contact gate
(client-only service vs mailto). See decisions.md.

NEW: static export config, custom scrollbar (both themes), creative 404 page.
Deferred (see futurescope.md): GitHub README sync, commit-hash cache invalidation.
