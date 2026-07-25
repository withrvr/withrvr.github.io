import { site } from "@/lib/content";
import { APP_VERSION, COMMIT_HASH } from "@/lib/version";

// COMMIT_HASH falls back to "dev" outside a git checkout (see next.config.ts),
// in which case there is no real commit to link to.
const hasRealCommit = COMMIT_HASH !== "dev";
const commitUrl = `${site.meta.repoUrl}/commit/${COMMIT_HASH}`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-background py-8">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 sm:px-8">
        <span className="font-heading text-2xl font-bold text-foreground">
          {site.shortName}
          <span className="text-primary">.</span>
        </span>

        <div className="flex flex-col items-end gap-0.5 text-right font-mono text-[11px] text-muted-foreground">
          {hasRealCommit ? (
            <span>
              {`v${APP_VERSION} · `}
              <a
                href={commitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-2 transition-colors hover:text-primary"
              >
                {COMMIT_HASH}
              </a>
            </span>
          ) : (
            <span>{`v${APP_VERSION} · ${COMMIT_HASH}`}</span>
          )}
          <span>{`© ${year} ${site.fullName}`}</span>
        </div>
      </div>
    </footer>
  );
}
