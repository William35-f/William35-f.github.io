"use client";

import { useEffect, useRef } from "react";

// Cosmic Synapse canvas, adapted from the 21st.dev "neurons-hero" component
// (by Dhileep Kumar GM): a 3D sphere of neurons that tilts with the mouse,
// is pulled toward the cursor, and fires light pulses between neighbours.
// Changes: TypeScript, sized to its parent instead of the window, site colours,
// sphere sits to the right on wide screens, divide-by-zero guard.

const NEURON = "243, 241, 236"; // paper
const PULSE = "198, 255, 61"; // lime accent
const FADE = "rgba(13, 13, 16, 0.15)"; // ink, leaves motion trails

export default function CosmicSynapseCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrameId = 0;
    let neurons: Neuron[] = [];
    let pulses: Pulse[] = [];
    let cx = 0, cy = 0;
    const mouse = { x: 0, y: 0, radius: 150 };
    const perspective = 400;

    class Neuron {
      x: number; y: number; z: number; baseX: number; baseY: number;
      radius = Math.random() * 2 + 1;
      activation = 0;
      neighbors: Neuron[] = [];
      constructor(x: number, y: number, z: number) {
        this.x = x; this.y = y; this.z = z; this.baseX = x; this.baseY = y;
      }
      project() {
        const rotX = (mouse.y - cy) * 0.0001;
        const rotY = (mouse.x - cx) * 0.0001;
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY), cosX = Math.cos(rotX), sinX = Math.sin(rotX);
        const x1 = this.x * cosY - this.z * sinY;
        const z1 = this.z * cosY + this.x * sinY;
        const y1 = this.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + this.y * sinX;
        const scale = perspective / (perspective + z2);
        return { x: x1 * scale + cx, y: y1 * scale + cy, scale };
      }
      draw() {
        const { x, y, scale } = this.project();
        ctx.beginPath();
        ctx.arc(x, y, this.radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = this.activation > 0.05 ? `rgba(${PULSE}, ${0.3 + this.activation * 0.7})` : `rgba(${NEURON}, 0.22)`;
        ctx.fill();
      }
      update() {
        const p = this.project();
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        const force = Math.max(0, (mouse.radius - dist) / mouse.radius);
        this.x += (dx / dist) * force * 0.5;
        this.y += (dy / dist) * force * 0.5;
        this.x += (this.baseX - this.x) * 0.01;
        this.y += (this.baseY - this.y) * 0.01;
        if (this.activation > 0) this.activation -= 0.01;
        this.draw();
      }
      fire() {
        if (this.activation > 0.5) return;
        this.activation = 1;
        this.neighbors.forEach((n) => pulses.push(new Pulse(this, n)));
      }
    }

    class Pulse {
      progress = 0;
      speed = 0.05;
      constructor(public start: Neuron, public end: Neuron) {}
      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.end.activation = Math.min(1, this.end.activation + 0.5);
          return true;
        }
        return false;
      }
      draw() {
        const s = this.start.project(), e = this.end.project();
        const x = s.x + (e.x - s.x) * this.progress;
        const y = s.y + (e.y - s.y) * this.progress;
        const scale = s.scale + (e.scale - s.scale) * this.progress;
        ctx.beginPath();
        ctx.arc(x, y, 2.5 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PULSE}, ${1 - this.progress})`;
        ctx.shadowColor = `rgb(${PULSE})`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      neurons = [];
      pulses = [];
      const numNeurons = 1000;
      const radius = Math.min(250, canvas.width * 0.32);
      for (let i = 0; i < numNeurons; i++) {
        const phi = Math.acos(-1 + (2 * i) / numNeurons);
        const theta = Math.sqrt(numNeurons * Math.PI) * phi;
        neurons.push(new Neuron(radius * Math.cos(theta) * Math.sin(phi), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi)));
      }
      const link = radius * 0.16;
      for (const n of neurons)
        for (const o of neurons)
          if (n !== o && Math.hypot(n.x - o.x, n.y - o.y, n.z - o.z) < link) n.neighbors.push(o);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      cx = canvas.width >= 1024 ? canvas.width * 0.7 : canvas.width / 2;
      cy = canvas.width >= 1024 ? canvas.height * 0.45 : canvas.height * 0.3;
      mouse.x = cx;
      mouse.y = cy;
      init();
    };

    const animate = () => {
      ctx.fillStyle = FADE;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (Math.random() > 0.99) neurons[Math.floor(Math.random() * neurons.length)].fire();
      neurons.forEach((n) => n.update());
      pulses = pulses.filter((p) => !p.update());
      pulses.forEach((p) => p.draw());
      if (!reduce) animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    resizeCanvas();
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`absolute inset-0 z-0 h-full w-full bg-ink ${className}`} />;
}
