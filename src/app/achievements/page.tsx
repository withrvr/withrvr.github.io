import type { Metadata } from "next";
import RouteRedirect from "@/components/RouteRedirect";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Achievements | ${site.fullName}`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.meta.url}/#achievements` },
};

export default function AchievementsRoute() {
  return <RouteRedirect to="/#achievements" label="the Achievements section" />;
}
