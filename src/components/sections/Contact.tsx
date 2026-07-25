"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send, CalendarDays } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { BrandIcon } from "@/components/ui/Icon";
import { site } from "@/lib/content";
import { buildContactCompose, buildScheduleCompose } from "@/lib/mail";

const github = site.socials.find((s) => s.icon === "github");
const linkedin = site.socials.find((s) => s.icon === "linkedin");

function displayHref(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

// No backend. Submitting opens a Gmail compose window addressed to Raghav,
// prefilled with the visitor's name, email, and message.
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [opened, setOpened] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.open(buildContactCompose(form), "_blank", "noopener,noreferrer");
    setOpened(true);
  }

  return (
    <SectionWrapper id="contact">
      <div className="flex flex-col gap-10">
        <SectionHeader index="07" label="Contact" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-stretch">
          {/* Left: heading, info, schedule */}
          <div className="flex flex-col gap-7">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Let&apos;s work together
              <span className="text-primary">.</span>
            </h2>
            <p className="max-w-md font-sans text-sm leading-relaxed text-muted-foreground">
              Open to backend and full-stack roles and interesting problems. Send a note and it opens
              in your email, ready to go. I read everything.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${site.email}`}
                className="flex w-fit items-center gap-3 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail size={15} className="text-primary" />
                {site.email}
              </a>
              {site.phone && (
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="flex w-fit items-center gap-3 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone size={15} className="text-primary" />
                  {site.phone}
                </a>
              )}
              <div className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
                <MapPin size={15} className="text-primary" />
                {site.location}
              </div>
              {github && (
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-3 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <BrandIcon name="github" size={15} className="text-primary" />
                  {displayHref(github.href)}
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-3 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="w-[15px] text-center text-xs font-bold text-primary">in</span>
                  {displayHref(linkedin.href)}
                </a>
              )}
            </div>

            <div className="h-px bg-border" />

            <a
              href={buildScheduleCompose()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-3 rounded-xl border border-primary/40 px-5 py-3 font-mono text-sm text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
            >
              <CalendarDays size={15} />
              Schedule a 30-min Call
            </a>
          </div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:p-7"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-mono text-xs text-muted-foreground">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="rounded-lg border border-border bg-background px-4 py-2.5 font-mono text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-xs text-muted-foreground">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="rounded-lg border border-border bg-background px-4 py-2.5 font-mono text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="message" className="font-mono text-xs text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Write your message here..."
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="flex-1 resize-none rounded-lg border border-border bg-background px-4 py-2.5 font-mono text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-sm text-primary-foreground transition-all duration-200 hover:bg-primary/90"
            >
              <Send size={15} />
              {opened ? "Opened in your email" : "Send Message"}
            </button>

            {opened && (
              <span className="font-mono text-xs text-muted-foreground">
                If nothing opened, email me directly at {site.email}.
              </span>
            )}
          </motion.form>
        </div>
      </div>
    </SectionWrapper>
  );
}
