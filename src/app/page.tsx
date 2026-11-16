import Hero from "@/components/Hero";
import ScrollText from "@/components/ScrollText";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import WorkList from "@/components/WorkList";
import ProjectGrid from "@/components/ProjectGrid";
import RoundButton from "@/components/RoundButton";
import { Certifications, Skills, Timeline } from "@/components/Credentials";
import { profile, projects, stats } from "@/data/site";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <>
      <Hero />

      <section id="about" className="section-pad py-32 md:py-44">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_auto]">
          <div>
            <p className="label mb-8"><span className="text-accent">01</span> About</p>
            <ScrollText
              className="font-display text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.15]"
              text="From Myanmar to Singapore Polytechnic, I turn messy problems into AI products people can trust. I build end-to-end: deep-learning models in TensorFlow, RAG and LLM tools with FastAPI and React, and the evaluation that proves they work."
            />
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08} className="bg-ink p-6">
                  <p className="font-display text-4xl font-semibold text-accent">{s.value}</p>
                  <p className="mt-2 text-sm text-paper/60">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="flex items-start justify-center md:pt-24">
            <RoundButton href={profile.resumes[0].href} external size={180}>
              Download resume
            </RoundButton>
          </div>
        </div>
      </section>

      <section id="work" className="section-pad pb-32">
        <div className="mx-auto max-w-6xl">
          <SectionHead index="02" kicker="Featured work" title={<>Selected <span className="text-accent">work</span></>} />
          <WorkList items={featured} />
        </div>
      </section>

      <section id="projects" className="section-pad pb-32">
        <div className="mx-auto max-w-6xl">
          <SectionHead index="03" kicker={`${rest.length} more projects`} title="More projects" />
          <ProjectGrid items={rest} />
        </div>
      </section>

      <section id="skills" className="section-pad pb-32">
        <div className="mx-auto max-w-6xl">
          <SectionHead index="04" kicker="Toolbox" title="Skills" />
          <Skills />
        </div>
      </section>

      <section id="journey" className="section-pad pb-32">
        <div className="mx-auto max-w-6xl">
          <SectionHead index="05" kicker="Journey" title="Experience & education" />
          <Timeline />
        </div>
      </section>

      <section id="certifications" className="section-pad pb-40">
        <div className="mx-auto max-w-6xl">
          <SectionHead index="06" kicker="Always learning" title="Certifications" />
          <Certifications />
        </div>
      </section>
    </>
  );
}
