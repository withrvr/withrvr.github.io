// Build-time version metadata. Both values are injected by Vite `define`
// (see vite.config.js) from real state — package.json's version and the git
// short hash — so they can never be hand-edited out of sync with a deploy.
export const APP_VERSION = __APP_VERSION__
export const GIT_COMMIT_HASH = __GIT_COMMIT_HASH__
