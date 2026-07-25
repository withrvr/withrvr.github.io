"use client";

import { motion } from "motion/react";
import { ExternalLink, Trophy } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { achievements } from "@/lib/content";

export default function Achievements() {
  return (
    <SectionWrapper id="achievements">
      <div className="flex flex-col gap-12">
        <SectionHeader index="05" label="Achievements" />

        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            {achievements.heading}
            <span className="text-[color:var(--peach-text)] dark:text-primary">.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-muted-foreground">
            {achievements.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {achievements.items.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_12px_28px_rgba(27,107,92,0.14)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Trophy size={16} />
                </span>
                {a.year && (
                  <span className="font-sans text-xs text-muted-foreground">{a.year}</span>
                )}
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{a.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                {a.description}
              </p>
              {a.link && (
                <a
                  href={a.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex w-fit items-center gap-2 font-sans text-xs font-medium text-primary transition-opacity hover:opacity-80"
                >
                  <ExternalLink size={13} />
                  {a.link.label}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
