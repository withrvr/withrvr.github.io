# Versioning

## Scheme: Semantic Versioning (`MAJOR.MINOR.PATCH`)

Example: `1.2.3`.

### Single source of truth
The **`version` field in `package.json`** is the one authoritative version.
Nothing else stores a version number by hand — the footer reads it at build time.
Do not hardcode a version string anywhere in the source.

### Bump rule

| Part      | Bump when…                                                        | Examples                                                   |
|-----------|-------------------------------------------------------------------|------------------------------------------------------------|
| **PATCH** | small fixes, copy edits, styling tweaks, content updates          | fix a layout bug, correct resume link, reword a paragraph  |
| **MINOR** | new features or non-breaking additions                            | add a new section, add a project, add a toggle             |
| **MAJOR** | breaking changes or a major redesign                              | full visual rebuild, restructure the content schema        |

When in doubt between two levels, pick the higher one only if a visitor or a
future maintainer would clearly notice the difference.

### How to bump
1. Edit `version` in `package.json` (or `npm version patch|minor|major`, which
   also creates a git tag — only run the tag form if a tag is wanted).
2. That's it. The footer stamp updates automatically on the next build.
3. Do **not** commit unless explicitly asked (standing repo rule).

## Build-time stamp (version + commit)

The footer displays the deployed **version** and **short git commit hash** so the
live site self-identifies. Both are generated automatically from real state — never
typed by hand — so they cannot drift from what is actually deployed.

### Mechanism
- `vite.config.js` at build time:
  - reads `version` from `package.json`;
  - runs `git rev-parse --short HEAD` (wrapped in try/catch → `"unknown"` if git
    is unavailable, e.g. building from a tarball);
  - exposes both via Vite `define` as the compile-time globals
    `__APP_VERSION__` and `__GIT_COMMIT_HASH__`.
- `src/lib/version.js` re-exports them as `APP_VERSION` and `GIT_COMMIT_HASH` so
  components import from one place.
- `Footer.jsx` renders them (the hash links to the GitHub commit).
- `eslint.config.js` declares `__APP_VERSION__` / `__GIT_COMMIT_HASH__` as
  read-only globals so lint passes.

### CI note
`.github/workflows/deploy.yml` uses `actions/checkout@v5`. Its default fetch
(depth 1) still resolves `HEAD`, so `git rev-parse --short HEAD` works in CI. If
the hash ever shows `unknown` in a deploy, check that the checkout still has a
`.git` directory.

### Gotcha
Because the hash is read at **build** time, running `npm run build` with
uncommitted changes stamps the hash of the last commit, not the working tree.
That's intended — the deployed build always comes from a pushed commit.
