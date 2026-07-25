"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import FloatingSparkles from "@/components/ui/FloatingSparkles";
import { site } from "@/lib/content";

// A creative 404: the middle zero is an eye whose pupil follows the cursor
// (and drifts on its own on touch). It also blinks on its own, on a natural
// random cadence, independently of and alongside the cursor tracking. On
// theme, playful, with a way home.
export default function NotFound() {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const move = (clientX: number, clientY: number) => {
      const el = eyeRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(clientY - cy, clientX - cx);
      const radius = 14;
      setPupil({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
    };
    const onMouse = (e: MouseEvent) => move(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  // Blinks every 2.5-5s, on its own timer, so it keeps blinking through
  // cursor movement rather than only reacting to the pointer.
  useEffect(() => {
    let openTimer: ReturnType<typeof setTimeout>;
    let nextBlinkTimer: ReturnType<typeof setTimeout>;

    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 2500;
      nextBlinkTimer = setTimeout(() => {
        setBlinking(true);
        openTimer = setTimeout(() => {
          setBlinking(false);
          scheduleBlink();
        }, 140);
      }, delay);
    };
    scheduleBlink();

    return () => {
      clearTimeout(openTimer);
      clearTimeout(nextBlinkTimer);
    };
  }, []);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <FloatingSparkles />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div
          role="img"
          aria-label="Error 404, page not found"
          className="flex items-center gap-2 font-heading text-[6rem] font-bold leading-none text-foreground sm:text-[9rem]"
        >
          <span>4</span>
          <motion.div
            ref={eyeRef}
            animate={{ scaleY: blinking ? 0.08 : 1 }}
            transition={{ duration: 0.11, ease: "easeInOut" }}
            className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary bg-card sm:h-32 sm:w-32"
          >
            <motion.div
              className="h-8 w-8 rounded-full bg-primary sm:h-10 sm:w-10"
              animate={{ x: pupil.x, y: pupil.y, opacity: blinking ? 0 : 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
            />
          </motion.div>
          <span>4</span>
        </div>

        <p className="font-script text-3xl text-[color:var(--peach-text)] sm:text-4xl">
          This page took a wrong turn.
        </p>
        <p className="max-w-md font-sans text-sm text-muted-foreground">
          The link is broken or the page moved. The eye above is still looking for it. In the
          meantime, head back to the start.
        </p>

        <MagneticButton>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-sans text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ArrowLeft size={18} />
            Back to {site.shortName}
          </Link>
        </MagneticButton>
      </div>
    </main>
  );
}
