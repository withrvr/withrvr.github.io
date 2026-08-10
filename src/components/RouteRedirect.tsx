"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface RouteRedirectProps {
  /** Internal hash target (e.g. "/#contact") or an absolute external URL. */
  to: string;
  /** True for links that leave the site (the resume). */
  external?: boolean;
  /** Human label used in the on-screen and no-JS fallback copy. */
  label: string;
}

// This site is a static export (output: "export"), so no route here can ever
// send back a real HTTP redirect status - GitHub Pages just serves whatever
// file it finds at 200, or 404 if it can't. This fires the fastest redirect a
// static host can do: replace the history entry the instant the client
// hydrates. The <meta refresh> and <noscript> link below cover the sliver of
// clients that never run the script.
export default function RouteRedirect({ to, external = false, label }: RouteRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    if (external) {
      window.location.replace(to);
    } else {
      router.replace(to);
    }
  }, [to, external, router]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <meta httpEquiv="refresh" content={`0;url=${to}`} />
      <p className="font-sans text-sm text-muted-foreground" role="status" aria-live="polite">
        Taking you to {label}...
      </p>
      <noscript>
        <a href={to} className="font-sans text-sm text-primary underline">
          Continue to {label}
        </a>
      </noscript>
    </main>
  );
}
