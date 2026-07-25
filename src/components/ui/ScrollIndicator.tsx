"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

// Trailing arrow indicator: a short segment travels down a track (the tail),
// with a bobbing chevron beneath it. Static under reduced motion.
export default function ScrollIndicator() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none flex flex-col items-center gap-2">
      <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
        Scroll
      </span>
      <div className="relative h-9 w-px overflow-hidden bg-border">
        {!reduce && (
          <motion.div
            className="absolute left-0 top-0 h-4 w-px bg-primary"
            animate={{ y: [-16, 36] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        )}
      </div>
      <motion.div
        animate={reduce ? undefined : { y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-primary"
      >
        <ChevronDown size={16} />
      </motion.div>
    </div>
  );
}
