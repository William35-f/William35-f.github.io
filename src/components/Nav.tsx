"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Magnetic from "./Magnetic";
import { profile } from "@/data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/projects/", label: "All projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="section-pad absolute left-0 right-0 top-0 z-40 flex items-center justify-between py-6 text-sm">
        <Magnetic strength={0.2}>
          <Link href="/" className="group flex items-center gap-2">
            <span className="inline-block transition-transform duration-500 group-hover:rotate-[360deg]">©</span>
            <span className="relative overflow-hidden">
              <span className="block transition-transform duration-500 group-hover:-translate-y-full">Built by Hein</span>
              <span className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full">
                {profile.name}
              </span>
            </span>
          </Link>
        </Magnetic>
        <nav className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <Magnetic key={l.href} strength={0.3}>
              <Link href={l.href} className="group relative px-3 py-2">
                {l.label}
                <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 scale-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-100" />
              </Link>
            </Magnetic>
          ))}
        </nav>
        <button onClick={() => setOpen(true)} className="md:hidden" aria-label="Open menu">
          Menu
        </button>
      </header>

      <AnimatePresence>
        {(scrolled || open) && (
          <motion.div
            className="fixed right-4 top-4 z-[60] md:right-8 md:top-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            <Magnetic strength={0.4}>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
                className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors md:h-20 md:w-20 ${open ? "bg-accent" : "bg-ink-2 border border-line"}`}
              >
                <span className="relative block h-3 w-7">
                  <span className={`absolute left-0 h-[2px] w-full transition-all duration-300 ${open ? "top-1/2 rotate-45 bg-ink" : "top-0 bg-paper"}`} />
                  <span className={`absolute left-0 h-[2px] w-full transition-all duration-300 ${open ? "top-1/2 -rotate-45 bg-ink" : "bottom-0 bg-paper"}`} />
                </span>
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[50] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-[55] flex h-dvh w-full max-w-md flex-col justify-between bg-ink-2 px-10 py-24 md:px-16"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <div>
                <p className="label border-b border-line pb-6">Navigation</p>
                <ul className="mt-8 space-y-3">
                  {[{ href: "/", label: "Home" }, ...links].map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <Link href={l.href} onClick={() => setOpen(false)} className="font-display group flex items-center gap-4 text-5xl">
                        <span className="h-2 w-2 scale-0 rounded-full bg-accent transition-transform group-hover:scale-100" />
                        {l.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label mb-4">Socials</p>
                <div className="flex flex-wrap gap-6 text-sm">
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                  <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                  <a href={`mailto:${profile.email}`}>Email</a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
