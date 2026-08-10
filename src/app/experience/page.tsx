import type { Metadata } from "next";
import RouteRedirect from "@/components/RouteRedirect";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Experience | ${site.fullName}`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.meta.url}/#experience` },
};

export default function ExperienceRoute() {
  return <RouteRedirect to="/#experience" label="the Experience section" />;
}
