"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { AmazonwebservicesOriginalWordmark } from "devicons-react";
import {
  SiDjango,
  SiPython,
  SiFastapi,
  SiPydantic,
  SiCelery,
  SiFrappe,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGooglecloud,
  SiDocker,
  SiLinux,
  SiGit,
  SiAnthropic,
  SiGooglegemini,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiChartdotjs,
} from "@icons-pack/react-simple-icons";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { skills } from "@/lib/content";

type IconComponent = React.ComponentType<{ size?: number; color?: string; title?: string }>;

interface SkillMeta {
  Icon: IconComponent;
  color: string;
  // A few brand colors (near-black) are unreadable on the dark card; this
  // swaps in a brighter hover color for the dark theme only.
  colorDark?: string;
}

// Icon plus brand color per skill name, all drawn from simple-icons so every
// tile shares the same behavior: grey by default, brand color on hover. Skills
// with no real logo (concepts, not products) render as a clean text chip.
const META: Record<string, SkillMeta> = {
  Django: { Icon: SiDjango, color: "#44B78B" },
  Python: { Icon: SiPython, color: "#3776AB" },
  FastAPI: { Icon: SiFastapi, color: "#009688" },
  Pydantic: { Icon: SiPydantic, color: "#E92063" },
  Celery: { Icon: SiCelery, color: "#37814A" },
  Frappe: { Icon: SiFrappe, color: "#0089FF" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  PostgreSQL: { Icon: SiPostgresql, color: "#336791" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Redis: { Icon: SiRedis, color: "#DC382D" },
  "GCP GCS/VM": { Icon: SiGooglecloud, color: "#4285F4" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  Linux: { Icon: SiLinux, color: "#FCC624" },
  Git: { Icon: SiGit, color: "#F05032" },
  "Claude Code": { Icon: SiAnthropic, color: "#D97757" },
  "Gemini API": { Icon: SiGooglegemini, color: "#8E75B2" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "HTML/CSS": { Icon: SiHtml5, color: "#E34F26" },
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "#000000", colorDark: "#F5EBDD" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Chart.js": { Icon: SiChartdotjs, color: "#FF6384" },
};

// AWS has no neutral logo in simple-icons (trademark), so the official
// multi-color wordmark is kept. Its dark navy text disappears on the dark
// theme card, so it is forced to white there; grayscale plus opacity stands in
// for the grey-to-color hover reveal every other tile gets.
function AwsMark({ hovered }: { hovered: boolean }) {
  return (
    <span
      className={`inline-flex transition-all duration-300 dark:brightness-0 dark:invert ${
        hovered ? "opacity-100 grayscale-0" : "opacity-55 grayscale"
      }`}
    >
      <AmazonwebservicesOriginalWordmark size={18} />
    </span>
  );
}

function SkillTile({ name, delay }: { name: string; delay: number }) {
  const { resolvedTheme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const meta = META[name];
  const color =
    resolvedTheme === "dark" && meta?.colorDark ? meta.colorDark : meta?.color ?? "var(--primary)";
  const isAws = name === "AWS S3/EC2";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -3, scale: 1.05, transition: { type: "spring", stiffness: 350, damping: 18 } }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 18 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={hovered ? { borderColor: color, boxShadow: `0 0 18px ${color}50` } : {}}
      className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 transition-all duration-300"
    >
      {isAws ? (
        <AwsMark hovered={hovered} />
      ) : (
        // title="" suppresses simple-icons' default <title>{brandName}</title>,
        // which would otherwise duplicate (and double-announce) the label text.
        meta && <meta.Icon size={18} color={hovered ? color : "#888888"} title="" />
      )}
      <span
        style={{ color: hovered ? color : undefined, transition: "color 0.3s" }}
        className="whitespace-nowrap font-mono text-sm text-muted-foreground"
      >
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="flex flex-col gap-10">
        <SectionHeader index="02" label="Skills" />

        <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
          {skills.heading}
          <span className="text-primary">.</span>
        </h2>

        {skills.categories.map((cat) => (
          <div key={cat.label} className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {cat.label}
            </span>
            <div className="flex flex-wrap gap-3">
              {cat.skills.map((name, i) => (
                <SkillTile key={`${cat.label}-${name}`} name={name} delay={i * 0.03} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
