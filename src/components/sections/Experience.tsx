"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Chip from "@/components/ui/Chip";
import { experience } from "@/lib/content";
import type { ExperienceRole } from "@/lib/types";

const roles = experience.roles;

// One role on the timeline. Meta sits on the left by the dot; the description
// and stack sit in a card on the right. Everything is shown in full, no inner
// scroll. The dot lights while the row is in the middle band of the viewport.
function RoleItem({ role }: { role: ExperienceRole }) {
  const ref = useRef(null);
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });

  return (
    <div ref={ref} className="relative pl-8 sm:pl-10">
      {/* Dot on the track */}
      <span className="absolute left-[7px] top-1.5 z-10 -translate-x-1/2">
        <span
          className={`relative block h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 ${
            active
              ? "border-primary bg-primary shadow-[0_0_12px_var(--primary)]"
              : "border-border bg-background"
          }`}
        >
          {active && (
            <motion.span
              className="absolute inset-0 rounded-full bg-primary"
              animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </span>
      </span>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid gap-4 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-8 lg:grid-cols-[minmax(0,11rem)_1fr]"
      >
        {/* Left: meta, next to the dot */}
        <div className="flex flex-col gap-1 md:pt-0.5">
          <div className="flex flex-col font-sans text-xs uppercase tracking-widest text-primary">
            <span>{role.period}</span>
            <span>{role.location}</span>
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground">{role.role}</h3>
          <span className="font-script text-lg text-[color:var(--peach-text)]">{role.company}</span>
          <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">
            {role.subtitle}
          </p>
        </div>

        {/* Right: description and stack, in a card */}
        <div
          className={`flex flex-col gap-4 rounded-2xl border bg-card p-6 transition-colors duration-500 sm:p-7 lg:px-6 ${
            active ? "border-primary/50" : "border-border"
          }`}
        >
          <ul className="flex flex-col gap-3">
            {role.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-sans text-sm leading-relaxed text-muted-foreground lg:whitespace-nowrap lg:text-[13px]"
              >
                <span className="mt-1 flex-shrink-0 text-primary">▸</span>
                {b}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {role.tags.map((tag, i) => (
              <Chip key={tag} label={tag} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const trackRef = useRef(null);
  // Fill the timeline as the section scrolls through the viewport center.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <SectionWrapper id="experience">
      <div className="flex flex-col gap-10">
        <SectionHeader index="03" label="Experience" />

        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          {experience.heading}
          <span className="text-primary">.</span>
        </h2>

        <div ref={trackRef} className="relative flex flex-col gap-8">
          {/* Track background line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          {/* Scroll-driven progress fill */}
          <motion.div
            style={{ scaleY: fill }}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-primary"
          />
          {roles.map((role) => (
            <RoleItem key={role.id} role={role} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
