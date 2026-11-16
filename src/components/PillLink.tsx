"use client";
import Magnetic from "./Magnetic";

export default function PillLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <Magnetic strength={0.25}>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-line px-6 py-3 text-sm"
      >
        <span className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:translate-y-0" />
        <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">{children}</span>
      </a>
    </Magnetic>
  );
}
