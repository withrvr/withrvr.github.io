"use client";

import { motion } from "motion/react";

// Film-grain overlay via an inline SVG turbulence, single-encoded.
const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(#n)'/></svg>`,
  );

type DoodleKind = "sparkle" | "plus" | "ring" | "squiggle";
type Doodle = {
  top: string;
  left: string;
  size: number;
  color: string;
  rotate: number;
  kind: DoodleKind;
  duration: number;
  delay: number;
};

const KINDS: DoodleKind[] = ["sparkle", "plus", "ring", "squiggle"];
const COLORS = ["var(--primary)", "var(--primary)", "var(--peach)"];

// Deterministic positions from modular arithmetic. No Math.random, so server and
// client render identically (no hydration mismatch). Full count kept on all
// screens by design.
const doodles: Doodle[] = Array.from({ length: 60 }, (_, i) => {
  const n = i + 1;
  return {
    top: `${(n * 37) % 100}%`,
    left: `${(n * 53) % 100}%`,
    size: 22 + ((n * 7) % 14),
    color: COLORS[n % COLORS.length],
    rotate: ((n * 29) % 44) - 22,
    kind: KINDS[n % KINDS.length],
    duration: 8 + ((n * 3) % 20) / 10,
    delay: (n % 12) / 5,
  };
});

function DoodleIcon({ kind, size, color }: { kind: DoodleKind; size: number; color: string }) {
  const common = {
    width: size,
    height: size,
    fill: "none" as const,
    stroke: color,
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
  };
  if (kind === "sparkle") {
    return (
      <svg viewBox="0 0 40 40" {...common}>
        <path d="M20 4v32M4 20h32M9 9l22 22M31 9L9 31" />
      </svg>
    );
  }
  if (kind === "plus") {
    return (
      <svg viewBox="0 0 40 40" {...common}>
        <path d="M20 6v28M6 20h28" />
      </svg>
    );
  }
  if (kind === "ring") {
    return (
      <svg viewBox="0 0 40 40" {...common}>
        <circle cx="20" cy="20" r="13" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 20" {...common}>
      <path d="M2 10 Q10 2 20 10 T38 10" />
    </svg>
  );
}

export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.22] mix-blend-overlay"
      style={{
        backgroundImage: `url("${GRAIN_SVG}")`,
        backgroundSize: "200px 200px",
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
}

export function DoodleField() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {doodles.map((d, i) => (
        <motion.div
          key={i}
          className="absolute opacity-40"
          style={{ top: d.top, left: d.left, rotate: d.rotate }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <DoodleIcon kind={d.kind} size={d.size} color={d.color} />
        </motion.div>
      ))}
    </div>
  );
}
