"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";

interface ChipProps {
  label: string;
  index?: number;
  className?: string;
}

// Small tag chip, alternating peach and gold tints by index, matching the
// reference. Colors come from CSS vars so both themes are covered. Used for
// every tag across the site (tech stacks, coursework, highlights), so the
// hover lift here applies everywhere at once.
export default function Chip({ label, index = 0, className = "" }: ChipProps) {
  const even = index % 2 === 0;
  const style: CSSProperties = even
    ? {
        color: "var(--peach-text)",
        border: "1px solid color-mix(in srgb, var(--peach) 40%, transparent)",
        background: "color-mix(in srgb, var(--peach) 8%, transparent)",
      }
    : {
        color: "var(--gold-text)",
        border: "1px solid color-mix(in srgb, var(--gold) 45%, transparent)",
        background: "color-mix(in srgb, var(--gold) 12%, transparent)",
      };

  return (
    <motion.span
      style={style}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 font-sans text-xs transition-[filter] duration-200 hover:brightness-110 ${className}`}
    >
      {label}
    </motion.span>
  );
}
