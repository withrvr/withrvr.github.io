import type { Metadata } from "next";
import RouteRedirect from "@/components/RouteRedirect";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `About | ${site.fullName}`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.meta.url}/#about` },
};

export default function AboutRoute() {
  return <RouteRedirect to="/#about" label="the About section" />;
}
