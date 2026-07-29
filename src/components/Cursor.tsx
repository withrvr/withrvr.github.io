"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { LIGHTBOX_TOGGLE_EVENT } from "@/lib/lightboxEvents";

const CLICKABLE = "a,button,[role=button],input,textarea,select,label,summary,.cursor-target";

// Hydration-safe detection of a fine pointer (mouse). Server snapshot is false,
// so touch devices and the initial paint keep the native cursor.
function subscribe(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function usePointerFine() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
}

// One custom cursor for the whole site: a slow-spinning dashed ring around a
// solid center dot, drawn in var(--primary) so it flips color with the theme
// automatically. It grows and the ring tightens over clickable elements.
// Disabled on touch devices and under reduced motion, where the native cursor
// is kept. When enabled, the native cursor is hidden everywhere (see the
// "cursor-hidden" rule in globals.css) so this is the only cursor on screen.
export default function Cursor() {
  const reduce = useReducedMotion();
  const fine = usePointerFine();
  const enabled = fine && !reduce;
  const [hovering, setHovering] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  // Raw motion values, no spring smoothing: the cursor tracks the pointer with
  // zero added lag. Only the ring's own hover/spin animation below uses a spring.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // The project image lightbox sits at the same z-index as this cursor and
  // needs its own zoom/grab cursor affordances, which the cursor-hidden rule
  // below would otherwise block. Step aside entirely while one is open.
  useEffect(() => {
    const handle = (e: Event) => setSuppressed((e as CustomEvent<boolean>).detail);
    window.addEventListener(LIGHTBOX_TOGGLE_EVENT, handle);
    return () => window.removeEventListener(LIGHTBOX_TOGGLE_EVENT, handle);
  }, []);

  const active = enabled && !suppressed;

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("cursor-hidden");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target && target.closest(CLICKABLE)));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <motion.div
      style={{ left: x, top: y }}
      className="pointer-events-none fixed z-[9999]"
      aria-hidden="true"
    >
      <motion.svg
        width={36}
        height={36}
        viewBox="0 0 36 36"
        className="absolute -left-[18px] -top-[18px]"
        animate={{ rotate: 360, scale: hovering ? 1.35 : 1 }}
        transition={{
          rotate: { repeat: Infinity, duration: 7, ease: "linear" },
          scale: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <circle
          cx={18}
          cy={18}
          r={15}
          fill="none"
          strokeDasharray="7 6"
          strokeLinecap="round"
          style={{
            stroke: "var(--primary)",
            strokeWidth: hovering ? 2.5 : 1.5,
            transition: "stroke-width 0.3s ease",
          }}
        />
      </motion.svg>
      <motion.div
        animate={{ scale: hovering ? 0.4 : 1, opacity: hovering ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full"
        style={{ background: "var(--primary)" }}
      />
    </motion.div>
  );
}
