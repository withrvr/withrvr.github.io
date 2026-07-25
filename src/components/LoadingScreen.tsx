"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LOADER_TEXT = "> running withrvr.exe";

// Rebuilt from the v1.1.0 loader model, ported to Framer Motion: the brand mark
// water-fills top to bottom, then the whole panel lifts away like a shutter.
// Themed to the site primary instead of the old red.
export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-primary"
        >
          <motion.div
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative mx-6 whitespace-nowrap font-mono text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            <div className="text-primary-foreground/25">{LOADER_TEXT}</div>
            <motion.div
              className="absolute inset-0 overflow-hidden whitespace-nowrap text-primary-foreground"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
            >
              {LOADER_TEXT}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
