"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RoundButton from "./RoundButton";
import { profile } from "@/data/site";

// Portrait that drifts with scroll; greyscale until hovered.
export default function AboutPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <motion.div ref={ref} style={{ y }} className="relative mx-auto w-[260px] md:mx-0 md:w-[320px]">
      <div className="group aspect-[4/5] overflow-hidden rounded-2xl bg-ink-2">
        <motion.img
          src="/hein.jpg"
          alt={`Portrait of ${profile.name}`}
          style={{ y: imgY }}
          className="h-[112%] w-full -translate-y-[6%] object-cover object-[50%_30%] grayscale contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0"
        />
      </div>
      <div className="absolute -bottom-12 -left-12 md:-left-16">
        <RoundButton href={profile.resumes[0].href} external size={140}>
          Download resume
        </RoundButton>
      </div>
    </motion.div>
  );
}
