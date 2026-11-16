"use client";
import { motion } from "framer-motion";

// Curtain that sweeps up off the screen each time a page mounts.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] bg-accent"
        initial={{ y: "0%" }}
        animate={{ y: "-100%", borderBottomLeftRadius: "50% 18%", borderBottomRightRadius: "50% 18%" }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </>
  );
}
