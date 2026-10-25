"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

function seeded(n: number) {
  const x = Math.sin(n * 9999) * 10000;
  return x - Math.floor(x);
}

const MOTES = Array.from({ length: 26 }, (_, k) => ({
  left: `${seeded(k + 1) * 100}%`,
  top: `${seeded(k + 50) * 100}%`,
  size: 2 + Math.round(seeded(k + 90) * 2),
  dur: 6 + seeded(k + 130) * 8,
  delay: seeded(k + 170) * 6,
}));

const spotlightMask = (r: number) =>
  `radial-gradient(circle ${r}px at var(--mx) var(--my), #000 0%, transparent 100%)`;

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MotionBackground({ children, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current?.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          "--mx": "72%",
          "--my": "30%",
          background:
            "radial-gradient(ellipse at 78% 20%, #1a0b3d 0%, #07040f 55%, #05030a 100%)",
        } as React.CSSProperties
      }
    >
      {/* cursor glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx) var(--my), rgba(139,92,246,0.2), transparent 65%)",
        }}
      />

      {/* grid only under the cursor */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.3) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: spotlightMask(300),
          WebkitMaskImage: spotlightMask(300),
        }}
      />

      {/* rising light dust */}
      {MOTES.map((m, k) => (
        <motion.span
          key={k}
          className="pointer-events-none absolute rounded-full bg-pale"
          style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
          animate={{ y: [0, -170], opacity: [0, 0.9, 0] }}
          transition={{
            duration: m.dur,
            repeat: Infinity,
            delay: m.delay,
            ease: "easeOut",
          }}
        />
      ))}

      <div className="relative z-10">{children}</div>
    </section>
  );
}
