"use client";
// Hover nav where a lime pill slides to the link under the cursor.
// Inspired by "Slide Tabs" (21st.dev/@uniquesonu/components/slide-tabs); own implementation.
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

type Item = { href: string; label: string };
type Pos = { left: number; width: number; opacity: number };

export default function SlideTabs({ items, className = "" }: { items: Item[]; className?: string }) {
  const [pos, setPos] = useState<Pos>({ left: 0, width: 0, opacity: 0 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <ul
      onMouseLeave={() => {
        setPos((p) => ({ ...p, opacity: 0 }));
        setHovered(null);
      }}
      className={`relative flex items-center ${className}`}
    >
      {items.map((it, i) => (
        <Tab key={it.href} item={it} active={hovered === i} onHover={(el) => {
          setHovered(i);
          setPos({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
        }} />
      ))}
      <motion.li
        aria-hidden
        animate={pos}
        initial={false}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
        className="pointer-events-none absolute inset-y-0 z-0 rounded-full bg-accent"
      />
    </ul>
  );
}

function Tab({ item, active, onHover }: { item: Item; active: boolean; onHover: (el: HTMLLIElement) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li ref={ref} className="relative z-10" onMouseEnter={() => ref.current && onHover(ref.current)}>
      <Link
        href={item.href}
        onFocus={() => ref.current && onHover(ref.current)}
        className={`block rounded-full px-4 py-2 transition-colors duration-200 focus-visible:outline-none ${active ? "text-ink" : "text-paper"}`}
      >
        {item.label}
      </Link>
    </li>
  );
}
