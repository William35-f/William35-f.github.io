import Reveal from "./Reveal";

export default function SectionHead({ index, title, kicker }: { index: string; title: React.ReactNode; kicker?: string }) {
  return (
    <Reveal className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-none">{title}</h2>
      <p className="label flex gap-3">
        <span className="text-accent">{index}</span>
        {kicker}
      </p>
    </Reveal>
  );
}
