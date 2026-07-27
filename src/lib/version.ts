// Build-time metadata, injected by next.config.ts. Displayed in the footer so
// the deployed version and commit are always visible and always match the build.
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "2.0.2";
export const COMMIT_HASH = process.env.NEXT_PUBLIC_COMMIT_HASH ?? "dev";
export const COMMIT_DATE = process.env.NEXT_PUBLIC_COMMIT_DATE ?? "";
