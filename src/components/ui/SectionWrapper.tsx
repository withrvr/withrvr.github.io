"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

// Shared section shell. Reveals on scroll into view. Carries relative z-10 so its
// content always stacks above the ambient doodle layer (z-0).
export default function SectionWrapper({
  id,
  children,
  className = "",
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-15%" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className={`relative z-10 mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-16 sm:px-8 md:py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}
