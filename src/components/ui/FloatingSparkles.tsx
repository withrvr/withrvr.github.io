"use client";

import { motion } from "motion/react";

type Particle = {
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
  duration: number;
  type: "dot" | "sparkle";
};

const particles: Particle[] = [
  { x: "8%", y: "15%", size: 8, color: "var(--peach)", delay: 0, duration: 6 },
  { x: "22%", y: "68%", size: 5, color: "var(--primary)", delay: 1.2, duration: 7 },
  { x: "38%", y: "10%", size: 10, color: "var(--gold)", delay: 0.6, duration: 8 },
  { x: "48%", y: "82%", size: 6, color: "var(--peach)", delay: 2, duration: 6.5 },
  { x: "65%", y: "20%", size: 7, color: "var(--primary)", delay: 1.6, duration: 7.5 },
  { x: "78%", y: "60%", size: 9, color: "var(--gold)", delay: 0.3, duration: 6.8 },
  { x: "90%", y: "35%", size: 5, color: "var(--peach)", delay: 2.4, duration: 7.2 },
  { x: "15%", y: "42%", size: 6, color: "var(--primary)", delay: 1, duration: 6.2 },
  { x: "58%", y: "48%", size: 8, color: "var(--gold)", delay: 1.8, duration: 7.8 },
  { x: "30%", y: "90%", size: 5, color: "var(--primary)", delay: 0.9, duration: 6.6 },
  { x: "3%", y: "55%", size: 6, color: "var(--gold)", delay: 2.2, duration: 7.1 },
  { x: "45%", y: "30%", size: 7, color: "var(--peach)", delay: 0.4, duration: 6.9 },
  { x: "70%", y: "80%", size: 5, color: "var(--primary)", delay: 1.4, duration: 7.6 },
  { x: "85%", y: "10%", size: 9, color: "var(--gold)", delay: 2.6, duration: 6.4 },
  { x: "12%", y: "78%", size: 6, color: "var(--peach)", delay: 0.7, duration: 7.3 },
  { x: "55%", y: "65%", size: 5, color: "var(--primary)", delay: 1.9, duration: 6.7 },
  { x: "95%", y: "55%", size: 7, color: "var(--gold)", delay: 0.2, duration: 7.9 },
  { x: "25%", y: "25%", size: 6, color: "var(--peach)", delay: 1.1, duration: 6.3 },
  { x: "62%", y: "5%", size: 8, color: "var(--primary)", delay: 2.8, duration: 7.4 },
  { x: "40%", y: "55%", size: 5, color: "var(--gold)", delay: 0.5, duration: 6.1 },
].map((p, i) => ({ ...p, type: i % 3 === 0 ? "sparkle" : "dot" }));

function Sparkle({ size, color }: { size: number; color: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size * 2.4}
      height={size * 2.4}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M20 4v32M4 20h32M9 9l22 22M31 9L9 31" />
    </svg>
  );
}

// Ambient drifting dots and sparkles behind the hero. Decorative only.
export default function FloatingSparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: p.x, top: p.y }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.5, 0.5, 0], y: [-10, -30] }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {p.type === "sparkle" ? (
            <Sparkle size={p.size} color={p.color} />
          ) : (
            <div
              className="rounded-full"
              style={{ width: p.size, height: p.size, background: p.color }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
