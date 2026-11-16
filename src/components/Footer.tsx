"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RoundButton from "./RoundButton";
import PillLink from "./PillLink";
import { profile } from "@/data/site";

function useSgTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(new Intl.DateTimeFormat("en-SG", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Singapore", hour12: true }).format(new Date()));
    f();
    const id = setInterval(f, 30000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Footer() {
  const time = useSgTime();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [-120, 0]);
  const btnX = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden bg-ink-2">
      <motion.div style={{ y }} className="section-pad pt-44 pb-10">
        <div className="mx-auto max-w-6xl">
          <p className="label mb-6">Open to AI engineering & data internships</p>
          <h2 className="font-display text-[clamp(3rem,9vw,8.5rem)] font-semibold leading-[0.9]">
            Let&apos;s build
            <br />
            something <span className="text-accent">smart.</span>
          </h2>

          <div className="relative mt-16 border-t border-line">
            <motion.div style={{ x: btnX }} className="absolute right-0 -translate-y-1/2 md:right-16">
              <RoundButton href={`mailto:${profile.email}`} size={170}>
                Get in touch
              </RoundButton>
            </motion.div>
          </div>

          <div className="mt-28 flex flex-wrap gap-4 md:mt-24">
            <PillLink href={`mailto:${profile.email}`}>{profile.email}</PillLink>
            <PillLink href={profile.phoneHref}>{profile.phone}</PillLink>
          </div>

          <div className="mt-24 grid gap-10 border-t border-line pt-8 text-sm md:grid-cols-4">
            <div>
              <p className="label mb-2">Local time</p>
              <p>{time} SGT</p>
            </div>
            <div>
              <p className="label mb-2">Based in</p>
              <p>{profile.location}</p>
            </div>
            <div>
              <p className="label mb-2">Resume</p>
              <div className="flex flex-col gap-1">
                {profile.resumes.map((r) => (
                  <a key={r.href} href={r.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                    {r.label} ↓
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="label mb-2">Socials</p>
              <div className="flex flex-col gap-1">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn ↗</a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent">GitHub ↗</a>
                <a href={`mailto:${profile.email}`} className="hover:text-accent">Email ↗</a>
              </div>
            </div>
          </div>
          <p className="label mt-16">© {new Date().getFullYear()} {profile.name}. Designed & built with Next.js.</p>
        </div>
      </motion.div>
    </footer>
  );
}
