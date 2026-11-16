"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { finishIntro } from "@/lib/intro";

const words = ["Hello", "မင်္ဂလာပါ", "Selamat datang", "你好", "வணக்கம்", "Bonjour", "Hello"];

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [i, setI] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("seen-intro") === "1";
      sessionStorage.setItem("seen-intro", "1");
    } catch {}
    if (seen) {
      setShow(false);
      finishIntro();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    let n = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      n += 1;
      if (n >= words.length) {
        setShow(false);
        setTimeout(finishIntro, 350);
        document.documentElement.style.overflow = "";
        return;
      }
      setI(n);
      t = setTimeout(tick, n === words.length - 1 ? 450 : 170);
    };
    t = setTimeout(tick, 650);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-2"
          exit={{ y: "-100%", borderBottomLeftRadius: "50% 20%", borderBottomRightRadius: "50% 20%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display flex items-center gap-3 text-4xl md:text-6xl"
            style={{ fontFamily: "var(--font-display), var(--font-myanmar), system-ui, sans-serif" }}
          >
            <span className="inline-block h-3 w-3 rounded-full bg-accent" />
            {words[i]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
