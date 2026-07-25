"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import FloatingSparkles from "@/components/ui/FloatingSparkles";
import HeroMedia from "@/components/ui/HeroMedia";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { BrandIcon } from "@/components/ui/Icon";
import { profile, site } from "@/lib/content";

const { hero } = profile;
// Split into words, not just characters: each word is its own no-wrap unit, so
// the name only ever breaks at the real space between "Raghav" and "Rathi" (a
// clean two-line split), never mid-word, while still fitting on one line
// whenever there is room for it. The per-character stagger index is computed
// once here at module init (not during render), so each letter still gets a
// continuous delay across the whole name.
let nameCharIndex = 0;
const nameWords = site.fullName
  .split(" ")
  .map((word) => word.split("").map((char) => ({ char, index: nameCharIndex++ })));

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -60]);
  const [panelHover, setPanelHover] = useState(false);

  return (
    <motion.section
      id="home"
      ref={ref}
      style={{ opacity, y }}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-20 sm:px-8"
    >
      <FloatingSparkles />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-10 md:flex-row md:gap-12">
        {/* Left: text */}
        <div className="flex flex-1 flex-col gap-4">
          <h1
            aria-label={site.fullName}
            className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            {nameWords.map((letters, wi) => (
              // The space between word spans (below) is a plain text node in
              // the h1's normal white-space context, so it is the only valid
              // line-break point; whitespace-nowrap here keeps each word
              // itself atomic, so a break can never land mid-word.
              <span key={wi}>
                <span className="inline-block whitespace-nowrap">
                  {letters.map(({ char, index }) => (
                    <motion.span
                      key={index}
                      aria-hidden="true"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.03, duration: 0.4, ease: "easeOut" }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                {wi < nameWords.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="font-script text-3xl text-[color:var(--peach-text)] md:text-4xl"
          >
            {hero.headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="max-w-xl font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mt-2 flex flex-wrap items-center gap-3"
          >
            <MagneticButton>
              <a
                href={hero.ctaPrimary.href}
                className="inline-block rounded-full bg-primary px-6 py-3 font-sans text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 md:text-base"
              >
                {hero.ctaPrimary.text}
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={hero.ctaSecondary.href}
                className="inline-block rounded-full bg-[color:var(--peach)] px-6 py-3 font-sans text-sm font-medium text-[#1B3A35] transition-opacity hover:opacity-90 md:text-base"
              >
                {hero.ctaSecondary.text}
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="mt-3 flex items-center gap-4"
          >
            {site.socials.map((s) => (
              <MagneticButton key={s.label} strength={0.4}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary"
                >
                  <BrandIcon name={s.icon} size={18} />
                </a>
              </MagneticButton>
            ))}
          </motion.div>
        </div>

        {/* Right: media with decorative shapes. Hovering anywhere in this
            panel gives the decorative pieces a small, uneven shuffle (each
            moves by a different amount/direction) as a little "waking up"
            tease before the visitor presses play. Each shape that has its own
            mount-in entrance is split into an outer layer (the original
            entrance animation, untouched) wrapping an inner layer that only
            ever reacts to panelHover, so the one-time entrance delay and the
            repeatable hover reaction never fight over the same transition. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
          onHoverStart={() => setPanelHover(true)}
          onHoverEnd={() => setPanelHover(false)}
          className="relative h-[380px] w-[280px] flex-shrink-0 sm:h-[440px] sm:w-[330px] md:h-[500px] md:w-[380px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute -top-7 left-2 z-20 h-8 w-8 md:h-10 md:w-10"
          >
            <motion.svg
              animate={panelHover ? { x: -3, y: 4, rotate: -14, scale: 1.1 } : { x: 0, y: 0, rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              viewBox="0 0 40 40"
              className="h-full w-full text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M20 2v36M2 20h36M7 7l26 26M33 7L7 33" />
            </motion.svg>
          </motion.div>

          <motion.div
            animate={panelHover ? { x: 5, y: -4, rotate: 2 } : { x: 0, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
            className="absolute right-[6%] top-0 h-[92%] w-[80%] rounded-t-full bg-[color:var(--gold)]"
          />
          <motion.div
            animate={panelHover ? { x: -6, y: 6, scale: 1.06 } : { x: 0, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary md:h-40 md:w-40"
          />
          <motion.div
            animate={panelHover ? { x: -8, y: 10 } : { x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 12 }}
            className="absolute right-5 top-2 h-3.5 w-3.5 rounded-full border-2 border-background bg-[color:var(--peach)] md:h-4 md:w-4"
          />

          <div className="absolute right-[6%] top-0 z-10 h-[92%] w-[80%]">
            <HeroMedia poster={hero.poster} video={hero.video} alt={site.fullName} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ delay: 1.7, duration: 0.5 }}
            className="absolute -left-3 bottom-8 z-20 w-44 md:-left-8 md:w-52"
          >
            <motion.div
              animate={panelHover ? { y: -6, rotate: 4, scale: 1.04 } : { y: 0, rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-xl"
            >
              <p className="font-script text-xl leading-snug md:text-2xl">{hero.tagline}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <ScrollIndicator />
      </motion.div>
    </motion.section>
  );
}
