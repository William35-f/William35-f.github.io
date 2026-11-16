import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import RoundButton from "@/components/RoundButton";
import ProjectCover from "@/components/ProjectCover";
import { categoryLabels, projects } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} · Hein Htet Aung`, description: p.short } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      <header className="section-pad pb-16 pt-40">
        <div className="mx-auto max-w-6xl">
          <Link href="/projects/" className="label mb-10 inline-block hover:text-accent">← All projects</Link>
          <p className="label mb-6 flex flex-wrap gap-3">
            <span className="text-accent">{categoryLabels[p.category]}</span>
            <span>{p.context}</span>
            <span>{p.year}</span>
            {p.status && <span className="rounded-full bg-accent px-2 text-ink">{p.status}</span>}
          </p>
          <h1 className="font-display text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[0.95]">{p.title}</h1>
          <p className="mt-6 max-w-2xl text-xl text-paper/70">{p.short}</p>
        </div>
      </header>

      <section className="section-pad pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 border-t border-line pt-12 md:grid-cols-[2fr_1fr]">
          <div>
            <p className="label mb-6">What I built</p>
            <ul className="space-y-6">
              {p.bullets.map((b, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <li className="flex gap-4 text-lg leading-relaxed text-paper/85">
                    <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    {b}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <aside className="space-y-10">
            <div>
              <p className="label mb-4">Stack</p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-line px-3 py-1 text-sm">{s}</span>
                ))}
              </div>
            </div>
            {p.github && (
              <div>
                <p className="label mb-4">Code</p>
                <RoundButton href={p.github} external size={130}>GitHub ↗</RoundButton>
              </div>
            )}
          </aside>
        </div>
      </section>

      {p.metrics && (
        <section className="section-pad pb-24">
          <div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {p.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08} className="bg-ink p-8">
                <p className="font-display text-5xl font-semibold text-accent">{m.value}</p>
                <p className="mt-3 text-paper/60">{m.label}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="section-pad pb-32">
        <div className="mx-auto max-w-6xl">
          {p.images.length > 0 ? (
            <>
              <p className="label mb-6">Showcase · click to enlarge</p>
              <Gallery images={p.images} title={p.title} />
            </>
          ) : (
            <div className="aspect-[16/7] overflow-hidden rounded-2xl">
              <ProjectCover p={p} />
            </div>
          )}
        </div>
      </section>

      <Link href={`/projects/${next.slug}/`} className="section-pad group block border-t border-line py-24">
        <div className="mx-auto max-w-6xl">
          <p className="label mb-4">Next project</p>
          <p className="font-display text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-none transition-colors group-hover:text-accent">
            {next.title} →
          </p>
        </div>
      </Link>
    </article>
  );
}
