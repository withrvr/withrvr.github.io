import type { Metadata } from "next";
import RouteRedirect from "@/components/RouteRedirect";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Contact | ${site.fullName}`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.meta.url}/#contact` },
};

export default function ContactRoute() {
  return <RouteRedirect to="/#contact" label="the Contact section" />;
}
