"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "motion/react";

// Dark and light, class strategy, matching the reference. System theme is off so
// the site opens in its intended default (dark) with no flash.
// MotionConfig reducedMotion="user" makes every Framer animation honor the OS
// "reduce motion" setting: transforms are skipped, opacity fades are kept.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
