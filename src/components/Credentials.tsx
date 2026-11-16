"use client";
import Reveal from "./Reveal";
import { certifications, education, experience, skills } from "@/data/site";

export function Skills() {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
      {skills.map((g, i) => (
        <Reveal key={g.group} delay={i * 0.06} className="bg-ink p-8">
          <p className="label mb-5">{g.group}</p>
          <div className="flex flex-wrap gap-2">
            {g.items.map((s) => (
              <span key={s} className="rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent">
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Timeline() {
  return (
    <div className="grid gap-16 md:grid-cols-2">
      <div>
        <p className="label mb-6">Experience & leadership</p>
        <ul>
          {experience.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.06}>
              <li className="border-t border-line py-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl">{e.title}</h3>
                  <span className="label whitespace-nowrap">{e.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent">{e.role}</p>
                <p className="mt-2 text-paper/70">{e.text}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
      <div>
        <p className="label mb-6">Education</p>
        <ul>
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.06}>
              <li className="border-t border-line py-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl">{e.school}</h3>
                  <span className="label whitespace-nowrap">{e.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent">{e.detail}</p>
                {e.notes.map((n) => (
                  <p key={n} className="mt-2 text-paper/70">{n}</p>
                ))}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Certifications() {
  return (
    <ul className="border-b border-line">
      {certifications.map((c, i) => (
        <Reveal key={c.name} delay={i * 0.04}>
          <li className="group grid grid-cols-[1fr_auto] items-center gap-4 border-t border-line py-5 transition-colors hover:bg-ink-2 md:grid-cols-[1fr_16rem_6rem] md:px-4">
            <span className="font-display text-xl md:text-2xl">
              {c.highlight && <span className="mr-2 text-accent">★</span>}
              {c.name}
            </span>
            <span className="hidden text-sm text-paper/60 md:block">{c.issuer}</span>
            <span className="label text-right">{c.date}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
