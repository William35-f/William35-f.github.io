"use client";
import { useEffect, useRef } from "react";

// Neurons wired to their nearest neighbours. Neurons near the cursor fire and
// send pulses of light along their connections; arriving pulses can fire the
// next neuron, so activity ripples through the network. Random sparks keep it
// alive when the mouse is still.
type N = { x: number; y: number; bx: number; by: number; ph: number; glow: number; cool: number; links: number[] };
type E = { a: number; b: number; cx: number; cy: number };
type P = { e: number; from: number; t: number; speed: number; gen: number };

export default function NeuronField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, last = performance.now(), sparkT = 0;
    let nodes: N[] = [], edges: E[] = [], pulses: P[] = [];
    const mouse = { x: -9999, y: -9999, moved: 0 };

    // soft glow sprite, drawn once and stamped
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const sg = sprite.getContext("2d")!;
    const grad = sg.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(198,255,61,1)");
    grad.addColorStop(0.25, "rgba(198,255,61,0.45)");
    grad.addColorStop(1, "rgba(198,255,61,0)");
    sg.fillStyle = grad;
    sg.fillRect(0, 0, 64, 64);

    const build = () => {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cell = w < 640 ? 70 : 95;
      nodes = [];
      for (let y = cell / 2; y < h + cell / 2; y += cell)
        for (let x = cell / 2; x < w + cell / 2; x += cell) {
          if (Math.random() < 0.18) continue;
          const nx = x + (Math.random() - 0.5) * cell * 0.8, ny = y + (Math.random() - 0.5) * cell * 0.8;
          nodes.push({ x: nx, y: ny, bx: nx, by: ny, ph: Math.random() * 6.28, glow: 0, cool: 0, links: [] });
        }
      edges = [];
      const seen = new Set<string>();
      nodes.forEach((n, i) => {
        const near = nodes
          .map((m, j) => ({ j, d: Math.hypot(m.bx - n.bx, m.by - n.by) }))
          .filter((o) => o.j !== i && o.d < cell * 1.9)
          .sort((a, b) => a.d - b.d)
          .slice(0, 3);
        for (const { j } of near) {
          const k = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (seen.has(k)) continue;
          seen.add(k);
          const a = nodes[i], b = nodes[j];
          const mx = (a.bx + b.bx) / 2, my = (a.by + b.by) / 2;
          const bend = (Math.random() - 0.5) * 0.5;
          edges.push({ a: i, b: j, cx: mx - (b.by - a.by) * bend, cy: my + (b.bx - a.bx) * bend });
          const ei = edges.length - 1;
          a.links.push(ei); b.links.push(ei);
        }
      });
      pulses = [];
    };

    const fire = (i: number, gen: number) => {
      const n = nodes[i];
      if (n.cool > 0) return;
      n.glow = 1;
      n.cool = 900;
      for (const ei of n.links) {
        if (gen > 0 && Math.random() > 0.75) continue;
        pulses.push({ e: ei, from: i, t: 0, speed: 0.0011 + Math.random() * 0.0006, gen });
      }
    };

    const pt = (e: E, from: number, t: number) => {
      const a = nodes[e.a], b = nodes[e.b];
      const [s, d] = from === e.a ? [a, b] : [b, a];
      const u = 1 - t;
      return { x: u * u * s.x + 2 * u * t * e.cx + t * t * d.x, y: u * u * s.y + 2 * u * t * e.cy + t * t * d.y };
    };

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, w, h);

      // drift + cursor-triggered firing
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x = n.bx + Math.sin(now * 0.0004 + n.ph) * 3;
        n.y = n.by + Math.cos(now * 0.0005 + n.ph) * 3;
        n.glow = Math.max(0, n.glow - dt * 0.0016);
        n.cool = Math.max(0, n.cool - dt);
        if (mouse.moved > 0 && Math.hypot(n.x - mouse.x, n.y - mouse.y) < 110) fire(i, 0);
      }
      mouse.moved = Math.max(0, mouse.moved - dt);

      sparkT -= dt;
      if (sparkT <= 0 && nodes.length) {
        fire(Math.floor(Math.random() * nodes.length), 1);
        sparkT = 700 + Math.random() * 900;
      }

      // connections
      ctx.lineWidth = 1;
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        const lit = Math.max(a.glow, b.glow);
        ctx.strokeStyle = lit > 0.02 ? `rgba(198,255,61,${0.08 + lit * 0.35})` : "rgba(243,241,236,0.07)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(e.cx, e.cy, b.x, b.y);
        ctx.stroke();
      }

      // pulses with short trails
      const next: P[] = [];
      for (const p of pulses) {
        p.t += p.speed * dt;
        const e = edges[p.e];
        if (p.t >= 1) {
          const to = e.a === p.from ? e.b : e.a;
          if (p.gen < 5 && Math.random() < 0.8 - p.gen * 0.12) fire(to, p.gen + 1);
          else nodes[to].glow = Math.max(nodes[to].glow, 0.5);
          continue;
        }
        next.push(p);
        for (let k = 0; k < 6; k++) {
          const tt = p.t - k * 0.025;
          if (tt < 0) break;
          const q = pt(e, p.from, tt);
          const s = 14 - k * 2;
          ctx.globalAlpha = 1 - k / 6;
          ctx.drawImage(sprite, q.x - s / 2, q.y - s / 2, s, s);
        }
        ctx.globalAlpha = 1;
      }
      pulses = next.length > 600 ? next.slice(-600) : next;

      // neurons
      for (const n of nodes) {
        if (n.glow > 0.02) {
          const s = 10 + n.glow * 34;
          ctx.globalAlpha = n.glow;
          ctx.drawImage(sprite, n.x - s / 2, n.y - s / 2, s, s);
          ctx.globalAlpha = 1;
        }
        ctx.fillStyle = n.glow > 0.05 ? `rgba(220,255,140,${0.5 + n.glow * 0.5})` : "rgba(243,241,236,0.32)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6 + n.glow * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.moved = 120;
    };
    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
