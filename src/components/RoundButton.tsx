"use client";
import Magnetic from "./Magnetic";

type Props = { href: string; children: React.ReactNode; size?: number; external?: boolean; variant?: "accent" | "dark" };

export default function RoundButton({ href, children, size = 160, external, variant = "accent" }: Props) {
  const base = variant === "accent" ? "bg-accent text-ink" : "bg-ink-2 text-paper border border-line";
  return (
    <Magnetic strength={0.4}>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        style={{ width: size, height: size }}
        className={`group relative flex items-center justify-center overflow-hidden rounded-full text-center text-sm font-medium ${base}`}
      >
        <span className="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:translate-y-0" />
        <span className="relative z-10 px-4 transition-colors duration-300 group-hover:text-ink">{children}</span>
      </a>
    </Magnetic>
  );
}
