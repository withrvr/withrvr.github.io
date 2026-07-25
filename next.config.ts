import type { NextConfig } from "next";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Build-time metadata. Read once at build so the footer version and commit hash
// always match what is actually deployed. The build tool runs git here, not by
// hand. Each read falls back safely if git is unavailable (for example a fresh
// checkout with no history).
function git(cmd: string, fallback: string): string {
  try {
    return execSync(`git ${cmd}`, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return fallback;
  }
}

const pkg = JSON.parse(readFileSync("./package.json", "utf8")) as {
  version: string;
};

const nextConfig: NextConfig = {
  // Fully static output for GitHub Pages. No server runtime.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Lets `next dev` accept requests (HMR, /_next assets) from tunneled
  // origins so the site can be tested on a real mobile device.
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.app", "*.loca.lt", "bore.pub"],
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
    NEXT_PUBLIC_COMMIT_HASH: git("rev-parse --short HEAD", "dev"),
    NEXT_PUBLIC_COMMIT_DATE: git("log -1 --format=%cI", new Date().toISOString()),
  },
};

export default nextConfig;
