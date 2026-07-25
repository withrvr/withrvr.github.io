# Phase 0.5: Content Inventory

Sources: the resume PDF (source of truth), the v1 repo `withrvr.github.io`
(especially `src/data/portfolio.json`), and the public GitHub profile
`github.com/withrvr`. LinkedIn (`in/withrvr`) and bio.link block automated fetch,
so any richer LinkedIn prose must be pasted by Raghav.

## Identity and contact

- Name: Raghav Rathi. UI short name for v2 (per brief): RVR. GitHub handle
  styling: "RiVeR / With RVR".
- Title: Backend Software Engineer. Location: Mumbai, India.
- Email: raghavrathi8855@gmail.com. Phone: +91 8855996970.
- GitHub: github.com/withrvr. LinkedIn: linkedin.com/in/withrvr.
  LeetCode: leetcode.com/u/withrvr. Code360: naukri.com/code360/profile/withrvr.
- GitHub bio: "Backend engineer at a Fintech company by day, building side
  projects by night. Work recognized at the GFF 2025." Company: Homeville Group.
- Remove site wide: Twitter/X (`@codewithrvr`), present in resume, GitHub, and v1
  socialLinks.

## Experience (verbatim, resume and v1 agree)

1. Homeville Group, Software Engineer, Jun 2025 to Present, Mumbai. Under the VP
   of Technology: AI microservices, LLM integration, Python ecosystem. 12
   bullets: AsyncIO loan pipeline 300 to 6,000+ concurrent; batch runtime cut 95
   percent (30 min to under 2 min over ~800K rows); MySQL latency 80s to 7s;
   FastAPI speech to text and translation with Gemini summaries; Fast Whisper
   selection; AWS S3 vs GCP GCS economics; 2 Tier-1 bank integrations with
   idempotent contracts; CRON async workers; masked dummy datasets; post-deploy
   validation scripts; reconciliation engine migrated to Python; OCR pipeline
   with PII masking.
2. HN Web Marketing, Software Engineer Intern, Aug 2021 to Oct 2021, Pune. 16+
   client Linux environments, deployment pipelines, production troubleshooting.
3. Bitlance Tech Hub Pvt Ltd, Python and Django Developer Intern, May 2020 to
   Jul 2020, Amravati. DRF APIs with token auth, Django ORM and Admin, NumPy and
   Pandas plus Chart.js.

## Education

- Thadomal Shahani Engineering College, B.E. Computer Engineering, 2021 to 2025,
  Mumbai. (On resume.)
- Diploma, Government Polytechnic Amravati, 2018 to 2021. (In v1 JSON only, not
  on resume. Additive. Decision pending, leaning keep. See decisions.md.)

## Skills (5 categories)

- Backend: Python, FastAPI, Pydantic, Django, AsyncIO, Celery, RESTful APIs,
  Microservices, Frappe.
- Database: MySQL, PostgreSQL, MongoDB, Redis, Query Optimization, SQL/NoSQL.
- DevOps and Cloud: AWS S3/EC2, GCP GCS/VM, Docker, CI/CD, Linux, Git, CRON.
- AI/GenAI: LLM Integration, Gemini API, Claude Code.
- Frontend Exposure: JavaScript, TypeScript, HTML/CSS, React, Next.js, Tailwind
  CSS, Chart.js.

Positioning emphasis for v2 (per brief): Django, Python, FastAPI, AI/LLM
integration, in that order.

## Achievements (replaces the reference Publications section)

1. Global Fintech Festival 2025: work recognized for the Direct Assignment and
   Securitization project. Link: LinkedIn activity post (in v1 JSON).
2. Coding Ninjas: Master badge on Code360, top 4 percent.
3. LeetCode: contest rating 1,563, top 30 percent, 400+ solved, 11 badges.

## Projects

Fully documented in resume and v1 (with images):
- TypeRush: Rust terminal typing trainer, live WPM and accuracy, 5 modes,
  themeable TUI, persistent history, CI built binaries (Linux, macOS, Windows),
  built with Claude Code. Tags: Rust, TUI, GitHub Actions, Claude Code. Links:
  github.com/withrvr/typerush, crates.io/crates/typerush. Image: typerush.png
  (wide). Flagship.
- 1Link: modular Django link aggregator, 7 decoupled apps, DRF API, dynamic
  profile URL routing, PostgreSQL, Redis leaderboard, Celery jobs. Tags: Python,
  Django, DRF, PostgreSQL, Celery. Link: github.com/withrvr/1Link. Images:
  1link_1/2/3.jpeg (phones). 

From the brief Phase 3, descriptions to draft, each needs an honest status label.
Local clones available for some (prompt-navigator, mute-ads, typerush; also
django_projects, learn_python, other, testing). All under github.com/withrvr:
- prompt-navigator: in development, testing phase, ready to deploy. Core POC
  built and working.
- mute-ads: cancelled midway. Auto-mute ads during IPL streaming; Hotstar
  restrictions made it not worth the effort. Kept as an honest initiative.
- url_shortener: active learning project, incomplete by design. Django internals,
  scaling, architecture.
- Github-API: complete learning project. GraphQL and Apollo, dashboard and charts
  for a user's most active day and commit distribution.
- ChatGPT-Gmail-Bot: complete. Chrome extension automating email replies, built
  when ChatGPT launched.
- Chess-Training-Games: complete. Pattern muscle memory training games.
- Hulu-Clone: complete learning project. Next.js, Tailwind, clean UI, external
  API integration.
- 4-equals-10-app-bot: complete. Solves any puzzle from the "4 = 10" app.
- Twitter-Tweepy-API: complete. Built at a college faculty request. Fetch,
  search, filter Twitter data by hashtag, import/export, post analysis.
  Name collides with the remove-Twitter rule. Decision pending.
- Portfolio Website (withrvr.github.io): the v1 site being replaced.

## Assets to carry over (from v1 public/media)

- hero_image.webp (68KB): hero poster placeholder.
- hero_video.mp4 (2.5MB): hero play-reel placeholder.
- profile_photo.jpg (22.5KB): about photo.
- og_image.jpg (71KB): social preview, reusable.
- 1link_1/2/3.jpeg, typerush.png: project images.
- favicon.svg, 404.html, robots.txt, sitemap.xml.

## Loading screen (v1.1.0 Preloader), the design model

Full screen red `#ff2a2a`. Brand name "Raghav Rathi." twice. The foreground white
copy water fills top to bottom via animated clip-path inset over 1.6s, then the
whole panel exits upward like a shutter (y -100%, 1.2s, custom cubic bezier).
Total 2200ms. Already Framer Motion, so the v2 port is mostly a restyle.

AS SHIPPED IN v2: the water-fill mechanic and the 2200ms shutter exit are kept,
restyled to the site primary instead of red. The text is no longer the brand
mark; it reads "> running withrvr.exe" in the mono face (see decisions.md D25,
and D27 for the layer-offset bug that briefly made it render twice).

## Hero media (v1 mechanism to keep)

Hero image by default. A visible Play Reel button swaps in the talking video,
plays once (no loop), returns to the image on end or second click. playsInline,
preload metadata, poster is the image. v2 adapts this to loop, adds theme-aware
dark and light variants later, keeps the play control and poster, handles mobile
autoplay restrictions.

AS SHIPPED IN v2: no loop (decisions.md D13), and the play control is an
icon-only Play/Stop at the bottom-right rather than a labelled "Play Reel"
button (D24). The video is NOT muted: it carries a spoken intro, and `muted`
was only ever needed for autoplay, which this never does (D28). `playsInline`
is retained. Theme-aware light and dark variants remain deferred
(futurescope.md).

## Contact (client-only, no backend)

v1 uses a prefilled mailto plus a Gmail web compose fallback (buildMailto,
buildGmailCompose in src/lib/site.js). Prefill subject and body live in JSON
(contactMail). This is the no-backend contact approach.

## Gap report

- RESOLVED: NEXT_PUBLIC_RESUME_URL provided (Google Drive link, decisions D11).
  Since D26 the site also falls back to `resumeFallbackUrl` in site.json when
  the environment variable is unset, so the Resume button can no longer vanish
  from a build that forgot to set it.
- RESOLVED: scheduling section ships now with a Gmail-compose button and a default
  message; Calendly or Cal.com deferred to future scope (D10).
- NEEDS (optional): images for the projects that have none (all except 1Link and
  TypeRush). Text-only cards otherwise.
- IN PROGRESS (on Raghav): the hero video and poster are being re-recorded from
  a new spoken script. The shipped files are still the v1 placeholders
  (hero_image.webp, hero_video.mp4). Theme-aware light and dark variants remain
  deferred (futurescope.md).
- NEEDS (blocked on the above): a `<track>` caption file for the hero video.
  Since D28 the video plays with audio, so its spoken content is now meaningful
  media and WCAG 1.2.2 applies. There is no caption track today. This cannot be
  written until the final cut exists.
- OPTIONAL: richer LinkedIn "about" prose if Raghav pastes it.
- Drafted copy may leave [NEEDS: ...] markers where a fact is missing. No metrics
  or facts are invented.

## Discrepancies (resume wins)

1. Twitter/X present in resume, GitHub, v1 JSON. Removed site wide per brief
   (Raghav's own X presence only).
2. Project "Twitter-Tweepy-API": kept as a legitimately named project (D6).
3. v1 Diploma (Government Polytechnic Amravati) not on resume: kept, both
   education entries shown (D7).
