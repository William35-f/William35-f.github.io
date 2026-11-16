"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import NeuralField from "./NeuralField";
import { profile } from "@/data/site";
import { useIntroDone } from "@/lib/intro";

const ease = [0.76, 0, 0.24, 1] as const;

function Line({ children, delay, go }: { children: React.ReactNode; delay: number; go: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span className="block" initial={{ y: "110%" }} animate={go ? { y: 0 } : { y: "110%" }} transition={{ duration: 1.1, delay, ease }}>
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const go = useIntroDone();
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={ref} className="relative flex min-h-dvh flex-col justify-end overflow-hidden">
      <NeuralField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--ink)_85%)]" />

      <motion.div style={{ y, opacity: fade }} className="section-pad relative z-10 pb-10 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={go ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-4 py-2 text-xs backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to internships · {profile.location}
        </motion.div>

        <h1 className="font-display text-[clamp(2.8rem,8.5vw,8rem)] font-semibold leading-[0.92]">
          <Line go={go} delay={0}>I build AI that</Line>
          <Line go={go} delay={0.1}>
            <span className="text-accent">thinks</span> & ships.
          </Line>
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <motion.p
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-xl text-lg text-paper/75"
          >
            {profile.name} ({profile.nickname}), {profile.role} at {profile.school}. RAG systems, LLM tools and deep-learning
            models, from notebook to deployed app.
          </motion.p>
          <motion.a
            href="#work"
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="label flex items-center gap-3"
          >
            Scroll to explore
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>↓</motion.span>
          </motion.a>
        </div>
      </motion.div>

      <div className="relative z-10 overflow-hidden border-t border-line py-3">
        <motion.div style={{ x: marqueeX }}>
          <div className="marquee font-display flex w-max whitespace-nowrap text-xs uppercase tracking-[0.12em] text-paper/45 md:text-[13px]">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k} aria-hidden={k === 1} className="flex shrink-0">
                {["RAG", "LLM agents", "TensorFlow", "FastAPI", "React", "Power BI", "SQL", "Deep learning", "Evaluation", "Python", "MongoDB", "Computer vision"].map((t) => (
                  <span key={t} className="flex items-center gap-4 pr-4">
                    {t} <span className="text-[9px] text-accent">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
