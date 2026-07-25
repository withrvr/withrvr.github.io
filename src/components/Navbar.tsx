"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { site } from "@/lib/content";
import { resumeUrl } from "@/lib/mail";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);

  // Lock the page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  // Brand click scrolls to the top of the home page. From any other route the
  // href navigates home; on the home page we smooth-scroll instead of no-op.
  const goToTop = (e: MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Mobile menu links. The open menu locks body scroll, so a native anchor jump
  // is blocked. If the target exists on this page, close the menu and scroll to
  // it; otherwise (e.g. the 404 page) let the href navigate home.
  const handleMobileNav = (e: MouseEvent, href: string) => {
    const id = href.includes("#") ? href.split("#")[1] : "";
    const el = id ? document.getElementById(id) : null;
    setOpen(false);
    if (el) {
      e.preventDefault();
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5 sm:px-8">
          <Link
            href="/"
            onClick={goToTop}
            aria-label="Back to top"
            className="font-heading text-xl font-bold tracking-tight text-foreground"
          >
            {site.shortName}
            <span className="text-primary">.</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {site.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-lg border border-primary/50 px-4 py-1.5 font-mono text-sm text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground md:inline-block"
              >
                Resume
              </a>
            )}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary"
              aria-label="Toggle theme"
            >
              <Sun size={15} className="hidden dark:block" />
              <Moon size={15} className="block dark:hidden" />
            </button>

            <button
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary md:hidden"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/95 px-6 py-3.5 backdrop-blur-lg md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading text-xl font-bold text-foreground">
                {site.shortName}
                <span className="text-primary">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-6">
              {site.nav.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleMobileNav(e, link.href)}
                    className="font-heading text-3xl font-bold text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
              {resumeUrl && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * site.nav.length }}
                >
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="font-heading text-3xl font-bold text-primary transition-colors hover:opacity-80"
                  >
                    Resume
                  </a>
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
