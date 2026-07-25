import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export const dynamic = "force-static";

// Minimal web app manifest: lets the site be added to a phone home screen
// with the right name and theme color. There is one manifest, not a
// per-theme pair, so it uses the dark palette (the site's default theme).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.fullName,
    short_name: site.shortName,
    description: site.meta.ogDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0D1A17",
    theme_color: "#0D1A17",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
