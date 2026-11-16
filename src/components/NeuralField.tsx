"use client";
import { useEffect, useRef } from "react";

// A drifting network of nodes; links light up near the cursor.
export default function NeuralField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];
    const resize = () => {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(110, (w * h) / 14000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 160) { p.x += (p.x - mouse.x) * 0.006; p.y += (p.y - mouse.y) * 0.006; }
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
            const near = Math.hypot(mx - mouse.x, my - mouse.y) < 180;
            ctx.strokeStyle = near ? `rgba(198,255,61,${0.6 * (1 - d / 130)})` : `rgba(243,241,236,${0.13 * (1 - d / 130)})`;
            ctx.lineWidth = near ? 1.2 : 0.8;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        const near = Math.hypot(p.x - mouse.x, p.y - mouse.y) < 180;
        ctx.fillStyle = near ? "#c6ff3d" : "rgba(243,241,236,0.45)";
        ctx.beginPath(); ctx.arc(p.x, p.y, near ? 2.4 : 1.6, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    const move = (e: MouseEvent) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const leave = () => { mouse.x = -9999; mouse.y = -9999; };
    resize(); draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
