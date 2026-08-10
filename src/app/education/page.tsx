import type { Metadata } from "next";
import RouteRedirect from "@/components/RouteRedirect";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Education | ${site.fullName}`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.meta.url}/#education` },
};

export default function EducationRoute() {
  return <RouteRedirect to="/#education" label="the Education section" />;
}
