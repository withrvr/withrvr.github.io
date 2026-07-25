# Phase 1: Target Specification and Build Plan

Status: drafted 2026-07-22, APPROVED with amendments 2026-07-23, BUILT.
No em dash characters anywhere, by rule.

HISTORICAL DOCUMENT. This is the Phase 1 plan as approved, kept as a record of
what was intended. It is not a description of the shipped site. The build
diverged from it in several places, and the site has had multiple rounds of
fixes since. Where this document and the shipped code disagree, the code and
[decisions.md](decisions.md) are authoritative, and decisions.md is the place
to look for why.

Known divergences from this plan, all recorded in decisions.md: the hero video
does not loop and is not muted (D13, D28); the Experience and Projects sections
were both rebuilt more than once (D21, D23, D24, D27); the loader shows
"> running withrvr.exe" rather than the brand mark (D25); ambient motion runs at
full count on all screens (D14). The "Amendments" section at the foot of this
file captures the first round of these inline.

## 1. Stack manifest (versions resolved from the npm registry)

Runtime dependencies:

| Package | Version | Purpose |
|---|---|---|
| next | 16.2.11 | Framework, App Router, static export |
| react | 19.2.8 | UI runtime |
| react-dom | 19.2.8 | UI runtime |
| motion | 12.42.2 | Animation (import from `motion/react`) |
| next-themes | 0.4.6 | Dark/light theme, class strategy |
| lucide-react | 1.25.0 | UI glyph icons |
| @icons-pack/react-simple-icons | 13.13.0 | Brand icons (GitHub, LeetCode, etc.) |
| devicons-react | 1.5.0 | Tech-stack icons for Skills |
| clsx | 2.1.1 | className helper |
| tailwind-merge | 3.6.0 | className merge helper |

Dev dependencies:

| Package | Version | Purpose |
|---|---|---|
| typescript | 7.0.2 | Types, strict mode (see risk R1) |
| @types/node | 26.1.1 | Node types |
| @types/react | 19.2.17 | React types |
| @types/react-dom | 19.2.3 | React DOM types |
| tailwindcss | 4.3.3 | Styling, CSS first |
| @tailwindcss/postcss | 4.3.3 | Tailwind PostCSS plugin |
| postcss | 8.5.22 | PostCSS |
| eslint | 10.7.0 | Lint (see risk R2) |
| eslint-config-next | 16.2.11 | Next lint rules |

Dropped from the reference (backend or dead): resend, three, @types/three,
next-mdx-remote, gray-matter, @fontsource/syne, @fontsource/jetbrains-mono,
shadcn, @base-ui/react, class-variance-authority, tw-animate-css.

Fonts: `next/font/google`, self hosted. Starting set matches the reference roles
(Fraunces heading, Manrope body, Caveat script accents). Subject to the identity
decision point below.

Static export config (`next.config.ts`):

- `output: 'export'` so `next build` writes a static `out/`.
- `images: { unoptimized: true }` because the default optimizer needs a server.
- `trailingSlash: true` for clean static paths.
- No `basePath`. `withrvr.github.io` is a user site served at the domain root.
- Build-time injection: read `git rev-parse --short HEAD` and the last commit
  date in `next.config.ts`, expose as `NEXT_PUBLIC_COMMIT_HASH` and
  `NEXT_PUBLIC_COMMIT_DATE`. Read `version` from package.json as
  `NEXT_PUBLIC_APP_VERSION`. The build tool runs git, not the assistant.
- `public/.nojekyll` so GitHub Pages serves the `_next` folder.
- `.env.example` documents `NEXT_PUBLIC_RESUME_URL` (Drive link) and is not
  committed as `.env`.

Deploy: a `.github/workflows/deploy.yml` that runs `npm ci`, `npm run build`, and
publishes `out/` to GitHub Pages, mirroring the v1 flow. Raghav runs all git.

## 2. Folder structure (withrvr_portfolio_version_2)

```
docs/                         already created
public/
  .nojekyll
  favicon.svg
  robots.txt
  media/                      hero_image.webp, hero_video.mp4, profile_photo.jpg,
                              og_image.jpg, project images, later theme videos
src/
  app/
    layout.tsx                fonts, metadata, providers, chrome
    page.tsx                  section composition
    not-found.tsx             creative interactive 404
    globals.css               Tailwind v4 tokens, palette, scrollbar, keyframes
    sitemap.ts                generated sitemap
    robots.ts                 generated robots (or static file)
  components/
    ThemeProvider.tsx
    Navbar.tsx                fixed header, mobile menu, theme toggle
    Footer.tsx                short, version and commit hash
    Cursor.tsx                one cursor, clickable state, touch degrade
    LoadingScreen.tsx         water-fill port
    ScrollIndicator.tsx       tailed arrow
    sections/
      SectionWrapper.tsx
      Hero.tsx
      About.tsx
      Skills.tsx
      Experience.tsx
      Projects.tsx
      Achievements.tsx        replaces Publications
      Education.tsx
      Schedule.tsx            Schedule a 30-min Call
      Contact.tsx             Gmail-compose form
    ui/
      MagneticButton.tsx
      FloatingSparkles.tsx
      PageTexture.tsx         GrainOverlay + DoodleField
      HeroMedia.tsx           theme-aware video, play control, poster
      SectionHeader.tsx       numbered section label
      Chip.tsx                tag and coursework chips
  data/
    site.json                 metadata, socials, nav, mail defaults
    profile.json              identity, hero, about
    skills.json
    experience.json
    projects.json
    achievements.json
    education.json
  lib/
    types.ts                  all content types
    content.ts                typed JSON loaders
    site.ts                   buildGmailCompose, buildScheduleCompose, resumeUrl
    version.ts                build-time version and hash from env
    utils.ts                  cn()
next.config.ts, tsconfig.json, postcss.config.mjs, eslint.config.mjs,
package.json, .gitignore, .env.example, README.md, .github/workflows/deploy.yml
```

Content is JSON in `src/data/` (Rule 5), typed by `lib/types.ts`, imported
through `lib/content.ts` with `resolveJsonModule`.

## 3. TypeScript types and JSON schema

```ts
// lib/types.ts
export type IconName = "github" | "linkedin" | "leetcode" | "code360"
  | "external" | "crates";

export interface Social { label: string; href: string; icon: IconName; }

export interface SiteMeta {
  shortName: string;          // "RVR"
  fullName: string;           // "Raghav Rathi"
  title: string;              // "Backend Software Engineer"
  location: string;           // "Mumbai, India"
  email: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;            // "/media/og_image.jpg"
  socials: Social[];          // no Twitter/X
  nav: { label: string; href: string }[];
  mail: {                     // prefilled contact compose
    contactSubject: string;
    contactGreeting: string;  // body preamble
    scheduleSubject: string;
    scheduleBody: string;     // default 30-min-call message
  };
}

export interface HeroContent {
  greeting: string;
  headline: string;
  subheadline: string;
  tagline: string;            // script accent
  poster: string;             // image placeholder
  videoDark: string;          // theme-aware, placeholders for now
  videoLight: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
}

export interface AboutContent {
  heading: string;
  photo: string;
  bio: string;
  paragraphs: string[];
  highlights: string[];
}

export interface Skill { name: string; icon?: string; color?: string }
export interface SkillCategory { label: string; skills: Skill[] }

export interface Experience {
  id: string; company: string; role: string; period: string;
  location: string; subtitle?: string; bullets: string[]; tags: string[];
}

export type ProjectStatus =
  | "complete" | "complete-learning" | "active-learning"
  | "in-development" | "cancelled";

export interface ProjectLink { label: string; href: string; icon: IconName }
export interface Project {
  id: string; name: string; tagline: string;
  status: ProjectStatus; statusLabel: string;
  summary: string; bullets: string[]; techTags: string[];
  images: string[]; imageLayout?: "wide" | "phones" | "none";
  links: ProjectLink[]; featured?: boolean;
}

export interface Achievement {
  id: string; title: string; description: string;
  link?: { label: string; href: string };
}

export interface Education {
  id: string; institution: string; degree: string;
  period: string; location: string; coursework?: string[];
}
```

Each JSON file validates against these. `ProjectStatus` maps to a display
`statusLabel` and a color, so the honest labels are explicit data, not styling.

## 4. Content map (source per field)

Legend: [resume] [v1] [brief] [drafted] [env].

- site.json: fullName, title, location, email [resume]/[v1]; shortName "RVR"
  [brief]; socials github, linkedin, leetcode, code360 [v1] (Twitter removed);
  nav labels [drafted]; ogTitle, ogDescription [drafted]; mail defaults [drafted].
- profile.json hero: greeting, headline, subheadline, tagline [drafted, backend
  positioning]; poster, videoDark, videoLight [v1 placeholders]; CTAs [brief].
  about: bio, paragraphs, highlights [v1]/[resume], lightly redrafted.
- skills.json: five categories and members [resume]/[v1]; icons and colors
  [drafted mapping to devicons and simple-icons]; order emphasizes Django,
  Python, FastAPI, AI/LLM [brief].
- experience.json: three roles, all fields and bullets [resume]/[v1] verbatim in
  substance; tags [drafted from each role's stack].
- projects.json: 13 projects [brief order]. TypeRush and 1Link full detail
  [resume]/[v1] with images. The other 11 summaries and bullets [drafted from the
  brief descriptions], enriched per repo from github.com/withrvr at build time.
  status and statusLabel [brief].
- achievements.json: GFF 2025, Coding Ninjas, LeetCode, with links [resume]/[v1].
- education.json: TSEC and Government Polytechnic Amravati [resume]/[v1]; optional
  coursework [drafted or left empty].
- resume link: read from `NEXT_PUBLIC_RESUME_URL` [env], not in JSON, not shipped.

Drafted copy is marked in the JSON with a leading note in a `_draft` sibling key
or tracked here, so Raghav can review and rewrite before ship. Any missing fact
becomes a `[NEEDS: ...]` marker, never an invented metric.

## 5. Component inventory

Legend: [port] [adapt] [new]. FM means Framer Motion (`motion`).

- ThemeProvider [port]: next-themes wrapper. No FM.
- Navbar [adapt]: fixed header, logo "RVR.", nav, theme toggle, plus a mobile
  menu the reference lacked. FM: header slide-in, mobile menu transitions.
- Footer [adapt]: short, adds version and short commit hash from env. No FM.
- Cursor [adapt]: one dot, spring follow, grows or changes on clickable elements,
  hidden on touch and when reduced motion is set. FM: useSpring.
- LoadingScreen [adapt]: water-fill brand reveal then shutter-up, ported from v1.
  FM: clip-path fill, AnimatePresence exit. Decoupled from magic-number delays.
- ScrollIndicator [new]: trailing or tailed arrow near the hero bottom. FM: loop.
- SectionWrapper [port]: in-view reveal. FM: useInView, opacity and y.
- SectionHeader [new]: numbered label plus rule, extracted from repeated markup.
- Chip [new]: tag and coursework chip, alternating peach and gold.
- MagneticButton [port]: pointer-follow spring wrapper. FM: useSpring.
- FloatingSparkles [port]: hero ambient particles. FM: drifting loops.
- PageTexture [port]: GrainOverlay plus deterministic DoodleField. FM: drift.
- HeroMedia [new]: poster image plus theme-aware video, visible play control,
  loops, muted, playsInline, poster fallback, respects reduced motion. Minimal FM.
- Hero [adapt]: split layout, headline, CTAs, HeroMedia, socials (no X). FM:
  scroll fade and lift, intro stagger tied to loader end, not a fixed delay.
- About [adapt]: bio plus highlights. Stats grid only if honest numbers exist,
  otherwise dropped (no invented metrics). FM: reveal, optional CountUp.
- Skills [adapt]: categorized icon-tile grid, backend stack, hover brand color.
  FM: spring pop-in.
- Experience [port]: timeline plus sticky detail, three roles. FM: progress line,
  active dot pulse, AnimatePresence swap.
- Projects [adapt]: expandable card grid, images in the expanded view, honest
  status badge per card. FM: layout expand, hover tilt.
- Achievements [new, replaces Publications]: cards with optional external link.
  FM: staggered reveal.
- Education [port]: two cards, optional coursework chips. FM: reveal.
- Schedule [new]: "Schedule a 30-min Call" card and button, opens Gmail compose
  with the default scheduling message. FM: reveal. Calendly later.
- Contact [adapt]: info column plus a form that on Send opens Gmail compose
  prefilled with name, email, message, addressed to Raghav. No backend, no X,
  no recruiter-bait copy. FM: reveal.
- not-found (404) [new]: creative interactive page, on-theme, playful, links home.
  FM: interactive motion.

## 6. Build order (mobile first, each step verifiable)

1. Scaffold: Next + TS strict + Tailwind v4, static export config, `.nojekyll`,
   fonts, ThemeProvider, globals with RVR tokens and both-theme custom scrollbar.
   Verify: dev server runs, theme toggles with no flash, `npm run build` writes
   `out/`.
2. Content layer: JSON files, types.ts, content.ts, site.ts, version.ts.
   Verify: typecheck passes, sample values render.
3. Shell: Navbar with mobile menu, Footer with version and hash, Cursor with
   touch and reduced-motion guards. Verify mobile first, then md, then desktop.
4. LoadingScreen water-fill port. Verify timing and exit on mobile.
5. Hero plus HeroMedia: poster, play control, looping muted video, mobile
   autoplay handling. Verify mobile playback and fallback.
6. About. 7. Skills. 8. Experience. 9. Projects with expanded images and status
   badges. 10. Achievements. 11. Education. 12. Schedule. 13. Contact (Gmail
   compose). Verify each at mobile width first.
14. Ambient layers (FloatingSparkles, PageTexture) and ScrollIndicator, with the
    stacking rules (`relative z-10` on sections, doodles at z-0).
15. 404 page.
16. SEO and metadata: title, description, Open Graph, sitemap, robots, favicon,
    og_image.
17. Accessibility and reduced-motion pass across all motion.
18. Version and hash footer wired to the build define.
19. Deploy workflow file.
Final: full mobile, tablet, desktop verification and a production static build.

## 7. Decision points (recommendations)

- P1 Identity, palette and fonts: the reference is warm teal, peach, cream with
  editorial fonts, tuned for an AI/ML persona. Options: (a) keep it as the
  starting look, (b) retune to a cooler, more backend-engineer identity while
  keeping the same token mechanism. Recommendation: start with (a) to move fast,
  then a short identity pass. Low risk either way since tokens are centralized.
- P2 TypeScript version: 7.0.2 is the latest (native compiler). Options: adopt 7,
  or pin to the latest 5.x for maximum tooling compatibility. Recommendation:
  attempt 7, fall back to 5.x latest if eslint-config-next or the editor tooling
  is unhappy. See risk R1.
- P3 Skills icons: most backend items have icons in devicons or simple-icons.
  Frappe and a few abstract entries (LLM Integration) have none. Recommendation:
  icon where one exists, clean text chip otherwise (the tile supports both).
- P4 About stats: the reference shows animated metrics. Recommendation: only
  include stats we can source honestly (for example years of experience), or drop
  the stat grid rather than invent numbers.

## 8. Gaps (exhaustive)

- Images for 11 projects without any. Text-only cards until provided.
- Final theme-aware hero videos (dark and light). v1 placeholders for now.
- Optional richer LinkedIn about prose (LinkedIn blocks automated fetch).
- Optional coursework lists for education (resume omits them).
- Any drafted line that would need a specific unstated fact gets a `[NEEDS: ...]`
  marker. No metrics, dates, or outcomes are invented.
- Scheduling account (Calendly or Cal.com) for the later swap.

## 9. Risk list

- R1 TypeScript 7 is a new major (native compiler). Tooling or type-check edge
  cases possible. Mitigation: pin to 5.x latest if friction appears.
- R2 ESLint 10 and eslint-config-next 16 majors. Mitigation: use the config Next
  ships; relax rules only if they block, never by disabling type safety.
- R3 Next 16 static export details: image handling (unoptimized), no runtime
  features. Mitigation: verify `out/` early in step 1, keep everything client or
  build time.
- R4 Hero video autoplay on mobile: browsers block autoplay with sound.
  Mitigation: muted, playsInline, loop, poster fallback, visible play control.
- R5 Ambient motion cost on low-end mobile (doodles plus sparkles). Mitigation:
  reduce counts on small screens, gate on reduced motion.
- R6 Identity mismatch: the reference look reads AI/ML, not backend. Mitigation:
  P1 identity pass, centralized tokens keep it cheap.
- R7 Icon coverage for the backend stack. Mitigation: text-chip fallback.
- R8 Drafted copy is placeholder quality until Raghav reviews. Mitigation: mark
  drafts clearly, keep [NEEDS] markers, never invent facts.

## Amendments (2026-07-23, plan approved with these changes)

- P1 resolved (D12): keep the reference theme, palette, fonts, and dark/light
  mode exactly. No identity change.
- P2 resolved (D15): try TypeScript 7, fall back to 5.x.
- P3 resolved (D16): skills icons where available, text chip fallback.
- P4 resolved (D17): honest metrics only; About stats come from real resume
  numbers or the stat grid is dropped.
- HeroMedia (D13): correction to section 5. No autoplay and no loop. Poster by
  default, a visible play button plays the video once, then it stops and returns
  to the poster. Muted and playsInline retained for user-initiated mobile play.
  Type carries a single `poster` and `video` for now; theme-aware `posterLight`
  and `videoLight` are added when the custom v2 videos exist.
  SUPERSEDED IN PART 2026-07-25 (D28): `muted` was removed. It is only required
  for autoplay, which this never does, so it was never what enabled
  user-initiated mobile play (that is `playsInline`, which is retained), and
  keeping it made the clip's spoken audio unhearable. The rest still holds.
- R5 amended (D14): keep full ambient motion on all screens, cost accepted;
  reduced-motion still honored for accessibility only.
- Plan is approved. Build proceeds from step 1.
