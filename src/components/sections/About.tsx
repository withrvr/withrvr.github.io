"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, animate, useReducedMotion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Chip from "@/components/ui/Chip";
import { profile, site } from "@/lib/content";
import type { Stat } from "@/lib/types";

const { about } = profile;

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isInView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = value + suffix;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.floor(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [isInView, value, suffix, reduce]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="flex flex-col gap-12">
        <SectionHeader index="01" label={about.heading} />

        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-14">
          {/* Left: copy */}
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              I build backend systems{" "}
              <span className="text-[color:var(--peach-text)] dark:text-primary">
                that stay fast and correct at scale.
              </span>
            </h2>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">{about.bio}</p>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="font-sans text-sm leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <div className="mt-1 flex flex-wrap gap-2">
              {about.highlights.map((h, i) => (
                <Chip key={h} label={h} index={i} />
              ))}
            </div>
          </div>

          {/* Right: portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[280px] md:mx-0 md:w-[300px]"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[color:var(--gold)] opacity-40" />
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-2xl bg-primary opacity-20" />
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-card transition-colors duration-300 hover:border-primary/40">
              <Image
                src={about.photo}
                alt={site.fullName}
                fill
                sizes="(max-width: 768px) 280px, 300px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
          {about.stats.map((stat: Stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center gap-2 bg-background px-5 py-8 text-center"
            >
              <span className="font-heading text-3xl font-bold text-[color:var(--peach-text)] md:text-4xl dark:text-primary">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
