"use client";

import { motion } from "motion/react";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { buildScheduleCompose } from "@/lib/mail";

// For now the button opens a Gmail compose with a default scheduling message.
// A Calendly or Cal.com embed will replace the handler later (see futurescope).
export default function Schedule() {
  return (
    <SectionWrapper id="schedule">
      <div className="flex flex-col gap-10">
        <SectionHeader index="07" label="Book Time" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-start gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center md:justify-between md:p-10"
        >
          <div className="flex flex-col gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalendarDays size={20} />
            </span>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Schedule a 30 minute call
            </h2>
            <p className="max-w-md font-sans text-sm leading-relaxed text-muted-foreground">
              Want to talk through a role, a project, or an idea? Pick a few slots that work for you
              and the button opens an email to me, ready to send.
            </p>
          </div>

          <a
            href={buildScheduleCompose()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-4 font-sans text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Request a call
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
