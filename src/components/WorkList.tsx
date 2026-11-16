"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Project } from "@/data/site";
import ProjectCover from "./ProjectCover";

// Featured work as big rows; on desktop a preview card follows the cursor.
export default function WorkList({ items }: { items: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 150, damping: 20 });
  const y = useSpring(my, { stiffness: 150, damping: 20 });

  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
    >
      <div className="label hidden grid-cols-[1fr_1fr_8rem] border-b border-line pb-4 md:grid">
        <span>Project</span>
        <span>Context</span>
        <span className="text-right">Year</span>
      </div>
      {items.map((p, i) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}/`}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          className="group grid grid-cols-1 gap-4 border-b border-line py-8 md:grid-cols-[1fr_1fr_8rem] md:items-center md:py-12"
        >
          <div className="aspect-[16/10] overflow-hidden rounded-lg md:hidden">
            <ProjectCover p={p} />
          </div>
          <div className="transition-all duration-500 md:group-hover:translate-x-4 md:group-hover:opacity-60">
            <h3 className="font-display text-4xl font-medium md:text-6xl">
              {p.title}
              {p.status && (
                <span className="ml-3 inline-block -translate-y-2 rounded-full bg-accent px-2.5 py-1 align-middle font-sans text-xs font-normal tracking-normal text-ink">
                  {p.status}
                </span>
              )}
            </h3>
            <p className="mt-2 text-paper/60">{p.short}</p>
          </div>
          <p className="text-sm text-paper/70 transition-all duration-500 md:group-hover:-translate-x-4 md:group-hover:opacity-60">{p.context}</p>
          <p className="label md:text-right">{p.year}</p>
        </Link>
      ))}

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
            style={{ x, y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <div className="relative h-[260px] w-[380px] overflow-hidden rounded-xl bg-ink-2 shadow-2xl">
                <motion.div
                  className="absolute inset-0"
                  animate={{ y: `-${active * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  {items.map((p) => (
                    <div key={p.slug} className="h-full w-full">
                      <ProjectCover p={p} />
                    </div>
                  ))}
                </motion.div>
              </div>
              <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-sm font-medium text-ink">
                View
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
