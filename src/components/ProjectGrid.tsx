"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Category, categoryLabels, Project } from "@/data/site";
import ProjectCover from "./ProjectCover";

type Filter = "all" | Category;

export default function ProjectGrid({ items }: { items: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = items.filter((p) => filter === "all" || p.category === filter);
  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: items.length },
    ...(Object.keys(categoryLabels) as Category[]).map((k) => ({ key: k, label: categoryLabels[k], count: items.filter((p) => p.category === k).length })),
  ];

  return (
    <div>
      <div role="tablist" className="mb-10 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={filter === t.key}
            onClick={() => setFilter(t.key)}
            className={`relative rounded-full border px-5 py-2.5 text-sm transition-colors ${filter === t.key ? "border-accent text-ink" : "border-line hover:border-paper/40"}`}
          >
            {filter === t.key && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <span className="relative z-10">
              {t.label} <span className="opacity-60">{t.count}</span>
            </span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/projects/${p.slug}/`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-2">
                  <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105">
                    <ProjectCover p={p} />
                  </div>
                  {p.status && <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs text-ink">{p.status}</span>}
                  <span className="absolute bottom-3 right-3 flex h-12 w-12 scale-0 items-center justify-center rounded-full bg-accent text-ink transition-transform duration-500 group-hover:scale-100">↗</span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-medium">{p.title}</h3>
                    <p className="mt-1 text-sm text-paper/60">{p.short}</p>
                  </div>
                  <span className="label whitespace-nowrap pt-2">{p.year}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-paper/70">{s}</span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
