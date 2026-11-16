"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Reveal from "./Reveal";

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + images.length) % images.length)), [images.length]);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, step]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((src, i) => (
          <Reveal key={src} delay={(i % 2) * 0.08} className={i === 0 ? "sm:col-span-2" : ""}>
            <button onClick={() => setOpen(i)} className="group block w-full overflow-hidden rounded-xl border border-line bg-ink-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${title}, slide ${i + 1}`} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-[1.03]" />
            </button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-label={`${title} slides`}
          >
            <motion.img
              key={open}
              src={images[open]}
              alt={`${title}, slide ${open + 1}`}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-h-full max-w-full rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="label absolute bottom-6 left-1/2 -translate-x-1/2 !text-paper">
              {open + 1} / {images.length} · ← → to browse · Esc to close
            </div>
            <button className="absolute left-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-ink-2 text-xl" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">←</button>
            <button className="absolute right-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-ink-2 text-xl" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">→</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
