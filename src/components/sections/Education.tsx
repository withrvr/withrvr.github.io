"use client";

import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Chip from "@/components/ui/Chip";
import { education } from "@/lib/content";

export default function Education() {
  return (
    <SectionWrapper id="education">
      <div className="flex flex-col gap-12">
        <SectionHeader index="06" label="Education" />

        <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
          {education.heading}
          <span className="text-primary">.</span>
        </h2>

        <div className="flex flex-col gap-6">
          {education.items.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_12px_28px_rgba(27,107,92,0.14)] sm:p-8"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="font-heading text-xl font-bold text-foreground">{edu.degree}</h3>
                  <span className="font-script text-xl text-[color:var(--peach-text)]">
                    {edu.institution}
                  </span>
                </div>
                <div className="flex flex-shrink-0 flex-col gap-1 md:items-end">
                  <span className="font-sans text-xs text-muted-foreground">{edu.period}</span>
                  <span className="font-sans text-xs text-muted-foreground">{edu.location}</span>
                </div>
              </div>

              {edu.coursework.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                    Relevant Coursework
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course, ci) => (
                      <Chip key={course} label={course} index={ci} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
