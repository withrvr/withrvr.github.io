import type { Metadata } from "next";
import RouteRedirect from "@/components/RouteRedirect";
import { site } from "@/lib/content";
import { resumeUrl } from "@/lib/mail";

// Not a real HTTP 302 - see RouteRedirect.tsx for why a static export can't
// send one. This is the closest a GitHub Pages-hosted site can get: the
// fastest possible client-side hop to wherever the resume currently lives.
export const metadata: Metadata = {
  title: `Resume | ${site.fullName}`,
  robots: { index: false, follow: false },
};

export default function ResumeRoute() {
  return <RouteRedirect to={resumeUrl} label="the resume" external />;
}
