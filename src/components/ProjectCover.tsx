import { Project } from "@/data/site";

// Real screenshot when we have one, otherwise a typographic cover in the project's colour.
export default function ProjectCover({ p, className = "" }: { p: Project; className?: string }) {
  const src = p.cover ?? p.images[0];
  if (src)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={`${p.title} preview`} loading="lazy" className={`h-full w-full object-cover object-top ${className}`} />;
  return (
    <div className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-6 ${className}`} style={{ background: p.accent }}>
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <span className="label !text-white/70">{p.context}</span>
      <div>
        <p className="font-display text-4xl font-semibold text-white">{p.title}</p>
        <p className="mt-2 max-w-xs text-sm text-white/80">{p.short}</p>
      </div>
    </div>
  );
}
