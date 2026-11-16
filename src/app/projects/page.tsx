import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/data/site";

export const metadata: Metadata = { title: "All projects · Hein Htet Aung" };

export default function ProjectsPage() {
  return (
    <section className="section-pad pb-40 pt-40">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-6">{projects.length} projects</p>
        <h1 className="font-display mb-16 text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.9]">
          All <span className="text-accent">work</span>
        </h1>
        <ProjectGrid items={projects} />
      </div>
    </section>
  );
}
