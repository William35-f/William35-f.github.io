"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";
import { transcript } from "@/data/site";

const top = (g: string) => g === "A" || g === "DIST";

export default function Transcript() {
  const [open, setOpen] = useState<number | null>(transcript.length - 1);
  const latest = transcript[transcript.length - 1];
  const all = transcript.flatMap((s) => s.modules);
  const aCount = all.filter((m) => top(m.grade)).length;

  return (
    <div>
      <div className="mb-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        <Reveal className="bg-ink p-6">
          <p className="font-display text-5xl font-semibold text-accent">{latest.cumulative}</p>
          <p className="mt-2 text-sm text-paper/60">Cumulative GPA out of 4.00</p>
        </Reveal>
        <Reveal delay={0.08} className="bg-ink p-6">
          <p className="font-display text-5xl font-semibold text-accent">{aCount}/{all.length}</p>
          <p className="mt-2 text-sm text-paper/60">Graded modules at A or Distinction</p>
        </Reveal>
        <Reveal delay={0.16} className="bg-ink p-6">
          <p className="font-display text-5xl font-semibold text-accent">{latest.gpa}</p>
          <p className="mt-2 text-sm text-paper/60">Latest semester GPA ({latest.stage})</p>
        </Reveal>
      </div>

      <div className="mb-12 flex h-40 items-end gap-4 md:gap-8">
        {transcript.map((s, i) => {
          const h = ((parseFloat(s.gpa) - 3.5) / 0.5) * 100;
          return (
            <div key={s.term} className="flex flex-1 flex-col items-center gap-2">
              <span className="font-mono text-sm text-paper/80">{s.gpa}</span>
              <motion.div
                className="w-full rounded-t-lg bg-accent/85"
                initial={{ height: 0 }}
                whileInView={{ height: `${Math.max(h, 8)}px` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="label text-center">{s.stage}</span>
            </div>
          );
        })}
      </div>

      <ul className="border-b border-line">
        {transcript.map((s, i) => (
          <li key={s.term} className="border-t border-line">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <span>
                <span className="font-display block text-2xl">{s.term}</span>
                <span className="text-sm text-paper/60">{s.stage} · {s.programme}</span>
              </span>
              <span className="flex items-center gap-6">
                <span className="label hidden sm:inline">GPA <span className="text-paper">{s.gpa}</span></span>
                <span className={`flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden"
                >
                  <table className="mb-8 w-full text-sm">
                    <thead className="label text-left">
                      <tr>
                        <th className="pb-3 font-normal">Code</th>
                        <th className="pb-3 font-normal">Module</th>
                        <th className="pb-3 pr-3 text-right font-normal">Credits</th>
                        <th className="pb-3 text-right font-normal">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.modules.map((m) => (
                        <tr key={m.code} className="border-t border-line/60">
                          <td className="py-3 pr-4 font-mono text-paper/50">{m.code}</td>
                          <td className="py-3 pr-4">{m.name}</td>
                          <td className="py-3 pr-3 text-right text-paper/60">{m.credits}</td>
                          <td className="py-3 text-right">
                            <span className={`inline-block min-w-12 rounded-full px-2.5 py-0.5 text-center text-xs ${top(m.grade) ? "bg-accent text-ink" : "border border-line"}`}>
                              {m.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="label mb-8">Semester GPA {s.gpa} · Cumulative GPA {s.cumulative}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-paper/50">From official Singapore Polytechnic examination results. Full transcripts available on request.</p>
    </div>
  );
}
