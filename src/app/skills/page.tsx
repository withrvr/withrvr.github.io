import type { Metadata } from "next";
import RouteRedirect from "@/components/RouteRedirect";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Skills | ${site.fullName}`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.meta.url}/#skills` },
};

export default function SkillsRoute() {
  return <RouteRedirect to="/#skills" label="the Skills section" />;
}
