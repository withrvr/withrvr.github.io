import type { Metadata } from "next";
import RouteRedirect from "@/components/RouteRedirect";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Projects | ${site.fullName}`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.meta.url}/#projects` },
};

export default function ProjectsRoute() {
  return <RouteRedirect to="/#projects" label="the Projects section" />;
}
