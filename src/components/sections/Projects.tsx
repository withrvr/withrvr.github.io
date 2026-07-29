"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Chip from "@/components/ui/Chip";
import { BrandIcon } from "@/components/ui/Icon";
import ProjectLightbox from "@/components/ui/ProjectLightbox";
import { projects as projectsContent } from "@/lib/content";
import type { Project, ProjectStatus } from "@/lib/types";

const projects = projectsContent.projects;
// "1Link" and "TypeRush" (featured: true in the data) are shown open by
// default; every other project sits behind the "Show more projects" toggle.
const featuredProjects = projects
  .map((project, index) => ({ project, index }))
  .filter((p) => p.project.featured);
const restProjects = projects
  .map((project, index) => ({ project, index }))
  .filter((p) => !p.project.featured);
const GITHUB_REPOS_URL = "https://github.com/withrvr?tab=repositories";

const STATUS_COLOR: Record<ProjectStatus, string> = {
  complete: "var(--primary)",
  "complete-learning": "var(--primary)",
  "active-learning": "var(--gold)",
  "in-development": "var(--peach)",
  cancelled: "var(--muted-foreground)",
};

function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  const color = STATUS_COLOR[status];
  return (
    <span
      className="flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[10px] uppercase tracking-wider"
      style={{
        color,
        border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`,
        background: `color-mix(in srgb, ${color} 8%, transparent)`,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function ProjectImages({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (index: number, trigger: HTMLElement) => void;
}) {
  if (project.imageLayout === "none" || project.images.length === 0) return null;

  if (project.imageLayout === "phones") {
    return (
      <div className="flex flex-wrap gap-4">
        {project.images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(i, e.currentTarget);
            }}
            aria-label={`Open ${project.name} screenshot ${i + 1} full screen`}
            className="group/thumb relative aspect-[9/19] w-24 overflow-hidden rounded-xl border border-border bg-background transition-colors duration-300 hover:border-primary/40 sm:w-28"
          >
            <Image
              src={src}
              alt={`${project.name} screenshot ${i + 1}`}
              fill
              sizes="112px"
              className="object-cover transition-transform duration-500 group-hover/thumb:scale-110"
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpen(0, e.currentTarget);
      }}
      aria-label={`Open ${project.name} screenshot full screen`}
      className="group/thumb relative aspect-video w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-background transition-colors duration-300 hover:border-primary/40"
    >
      <Image
        src={project.images[0]}
        alt={`${project.name} screenshot`}
        fill
        sizes="(max-width: 768px) 100vw, 672px"
        className="object-cover transition-transform duration-500 group-hover/thumb:scale-110"
      />
    </button>
  );
}

// Full-width stacked card, in the reference layout. Tapping the card opens it,
// revealing the status, summary, bullets, images (if any), and links. Entrance
// and expand are smooth; no grid reflow.
function ProjectRow({
  project,
  index,
  defaultOpen = false,
  onOpenLightbox,
}: {
  project: Project;
  index: number;
  defaultOpen?: boolean;
  onOpenLightbox: (project: Project, startIndex: number, trigger: HTMLElement) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const number = String(index + 1).padStart(2, "0");
  const toggle = () => setOpen((o) => !o);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.25, ease: "easeIn" } }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={`${project.name}, ${open ? "collapse" : "expand"} details`}
      onKeyDown={(e) => {
        // Only toggle for a keypress on the card itself. Without this check,
        // Enter/Space bubbles up from any nested control (an image thumbnail,
        // a GitHub/crates.io link) and this handler fires too, calling
        // preventDefault and closing the very card the user is trying to
        // keyboard-activate a control inside of.
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className={`group flex cursor-pointer flex-col rounded-2xl border bg-card p-5 transition-colors duration-300 sm:p-6 md:p-7 ${
        // The grid row stretches every item to match its tallest sibling by
        // default, which is right when both cards in a row are open (so a
        // shorter one's links row still lines up at the bottom) but wrong
        // when this card is closed next to an open sibling: it would then
        // get stretched into a tall card with a big empty box below its tags.
        // self-start opts a closed card out of that stretch so it sizes to
        // its own compact content instead.
        open ? "h-full" : "h-auto self-start"
      } ${
        open
          ? "border-primary/60 shadow-[0_0_24px_rgba(27,107,92,0.12)]"
          : "border-border hover:border-primary/40"
      }`}
    >
      {/* Header: number, title, tagline, chevron */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-baseline gap-2.5 sm:gap-3">
          <span className="flex-shrink-0 font-heading text-3xl font-bold italic leading-none text-foreground/10 sm:text-4xl">
            {number}
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="break-words font-heading text-lg font-bold leading-snug text-foreground sm:text-xl md:text-2xl">
              {project.name}
            </h3>
            <span className="font-script text-base text-[color:var(--peach-text)] sm:text-lg">
              {project.tagline}
            </span>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`mt-1 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-primary" : "text-muted-foreground group-hover:text-primary"
          }`}
        />
      </div>

      {/* Tech tags, always visible */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.techTags.map((tag, ti) => (
          <Chip key={tag} label={tag} index={ti} className="text-[10px]" />
        ))}
      </div>

      {/* Details, revealed on open. flex-1 lets this stretch to fill a taller
          row (the grid stretches featured cards to match height), with the
          links row pushed to the bottom via mt-auto so a shorter project's
          card still lines up with a taller sibling instead of leaving a
          floating gap mid-card. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="flex flex-1 flex-col gap-6 pt-6">
              <StatusBadge status={project.status} label={project.statusLabel} />
              <p className="max-w-3xl font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
                {project.summary}
              </p>
              <ul className="flex flex-col gap-3">
                {project.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-sans text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1 flex-shrink-0 text-primary">▸</span>
                    {b}
                  </li>
                ))}
              </ul>
              <ProjectImages
                project={project}
                onOpen={(startIndex, trigger) => onOpenLightbox(project, startIndex, trigger)}
              />
              {project.links.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-3 pt-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-sans text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <BrandIcon name={link.icon} size={14} />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxTrigger = useRef<HTMLElement | null>(null);

  const openLightbox = (project: Project, startIndex: number, trigger: HTMLElement) => {
    lightboxTrigger.current = trigger;
    setLightboxProject(project);
    setLightboxIndex(startIndex);
  };

  // yet-another-react-lightbox restores focus to whatever opened it via
  // FocusEvent.relatedTarget, which browsers only populate for a real mouse
  // click, not a keyboard Tab-then-Enter. Focusing the trigger button
  // ourselves on close covers that gap without fighting the library's own
  // (working, for mouse) restore.
  const closeLightbox = () => {
    setLightboxProject(null);
    lightboxTrigger.current?.focus();
  };

  // Toggling inserts/removes a whole row of cards above this button, which
  // shifts everything below it on the page. Compensate by scrolling the
  // window by exactly the resulting height change, so the button doesn't
  // visually jump. A plain rAF-after-setState isn't enough: expanding adds
  // cards and reflows immediately, but collapsing removes them only after
  // their exit fade finishes (see ProjectRow's exit transition), so the
  // height change lands ~250ms later. ResizeObserver reacts to the actual
  // layout change whenever it happens, instead of guessing the timing.
  const handleToggle = () => {
    const grid = gridRef.current;
    if (!grid) {
      setShowAll((s) => !s);
      return;
    }
    let lastHeight = grid.getBoundingClientRect().height;
    setShowAll((s) => !s);

    // Compensate every notification against a running baseline, not just the
    // first: the exit fade can produce more than one resize event before it
    // actually settles, and disconnecting after only the first risks catching
    // a spurious intermediate one and missing the real collapse afterward.
    const observer = new ResizeObserver(() => {
      const newHeight = grid.getBoundingClientRect().height;
      const delta = newHeight - lastHeight;
      if (delta !== 0) {
        window.scrollBy(0, delta);
        lastHeight = newHeight;
      }
    });
    observer.observe(grid);
    setTimeout(() => observer.disconnect(), 600);
  };

  return (
    <SectionWrapper id="projects">
      <div className="flex flex-col gap-10">
        <SectionHeader index="04" label="Projects" />

        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            {projectsContent.heading}
            <span className="text-[color:var(--peach-text)]">.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-muted-foreground">
            {projectsContent.description}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {featuredProjects.map(({ project, index }) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              defaultOpen
              onOpenLightbox={openLightbox}
            />
          ))}
          <AnimatePresence initial={false}>
            {showAll &&
              restProjects.map(({ project, index }) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  index={index}
                  onOpenLightbox={openLightbox}
                />
              ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            ref={toggleRef}
            type="button"
            onClick={handleToggle}
            className="flex items-center gap-2 rounded-xl border border-primary/40 px-5 py-3 font-mono text-sm text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            {showAll ? "Show fewer projects" : "Show more projects"}
            <ChevronDown
              size={15}
              className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
            />
          </button>
          <a
            href={GITHUB_REPOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 font-mono text-sm text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary"
          >
            <BrandIcon name="github" size={15} />
            All repos on GitHub
          </a>
        </div>
      </div>

      <ProjectLightbox
        open={lightboxProject !== null}
        index={lightboxIndex}
        onClose={closeLightbox}
        slides={
          lightboxProject
            ? lightboxProject.images.map((src, i) => ({
                src,
                alt:
                  lightboxProject.imageLayout === "phones"
                    ? `${lightboxProject.name} screenshot ${i + 1}`
                    : `${lightboxProject.name} screenshot`,
              }))
            : []
        }
      />
    </SectionWrapper>
  );
}
