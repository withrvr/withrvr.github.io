import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

// Single source of truth for the version is package.json.
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)))

// Short commit hash of the build. Generated from real git state so the footer
// stamp can never drift from what is actually deployed; falls back gracefully
// when git is unavailable (e.g. building from a source tarball).
function gitCommitHash() {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return 'unknown'
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __GIT_COMMIT_HASH__: JSON.stringify(gitCommitHash()),
  },
})
