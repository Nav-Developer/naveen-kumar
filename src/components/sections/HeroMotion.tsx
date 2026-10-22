"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import assets from "@/assets";

/* ---------------- EDIT THESE ---------------- */
const FULL_NAME = "Naveen Kumar";
const ROLE = "Full Stack Engineer";
const VERSION = "v2026.10";
const PHRASES = [
  "digital products.",
  "fast interfaces.",
  "smooth motion.",
  "scalable apps.",
];
const TAGLINE =
  "Building digital products. Creating content. Living performance.";
const STATS = [
  { k: "2+", v: "Years building" },
  { k: "Full", v: "Stack engineer" },
  { k: "Open", v: "To opportunities" },
];
const STACK = [
  "React",
  "TypeScript",
  "Next.js",
  "NestJS",
  "MongoDB",
  "Node.js",
  "Tailwind",
  "GSAP",
  "Framer Motion",
  "Git",
];

const PHOTO = assets.images.me;

// Set to true only if your photo does NOT already have "BUILD. LEARN. EVOLVE" baked in.
const SHOW_POSTER_TEXT = false;
/* -------------------------------------------- */

function seeded(n: number) {
  const x = Math.sin(n * 9999) * 10000;
  return x - Math.floor(x);
}

const MOTES = Array.from({ length: 26 }, (_, k) => ({
  left: `${seeded(k + 1) * 100}%`,
  top: `${35 + seeded(k + 50) * 65}%`,
  size: 2 + Math.round(seeded(k + 90) * 2),
  dur: 6 + seeded(k + 130) * 8,
  delay: seeded(k + 170) * 6,
}));

/* ---------- text scramble hook ---------- */
const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

function useScramble(words: string[], hold = 2600) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    let i = 0;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    let alive = true;

    const run = (from: string, to: string, done: () => void) => {
      const len = Math.max(from.length, to.length);
      const queue = Array.from({ length: len }, (_, k) => {
        const start = Math.floor(Math.random() * 14);
        return {
          from: from[k] ?? "",
          to: to[k] ?? "",
          start,
          end: start + 10 + Math.floor(Math.random() * 14),
          ch: "",
        };
      });
      let frame = 0;
      const tick = () => {
        if (!alive) return;
        let out = "";
        let complete = 0;
        for (const q of queue) {
          if (frame >= q.end) {
            complete++;
            out += q.to;
          } else if (frame >= q.start) {
            if (!q.ch || Math.random() < 0.28)
              q.ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            out += q.ch;
          } else out += q.from;
        }
        setText(out);
        if (complete === queue.length) done();
        else {
          frame++;
          raf = requestAnimationFrame(tick);
        }
      };
      tick();
    };

    const next = () => {
      timer = setTimeout(() => {
        const from = words[i];
        i = (i + 1) % words.length;
        run(from, words[i], next);
      }, hold);
    };
    next();

    return () => {
      alive = false;
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [words, hold]);

  return text;
}

const spotlightMask = (r: number) =>
  `radial-gradient(circle ${r}px at var(--mx) var(--my), #000 0%, transparent 100%)`;

export default function HeroMotion() {
  const ref = useRef<HTMLElement>(null);
  const phrase = useScramble(PHRASES);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 16 });
  const smy = useSpring(my, { stiffness: 50, damping: 16 });

  const cardX = useTransform(smx, [-0.5, 0.5], [-10, 10]);
  const cardY = useTransform(smy, [-0.5, 0.5], [-6, 6]);
  const photoX = useTransform(smx, [-0.5, 0.5], [-10, 10]);
  const photoY = useTransform(smy, [-0.5, 0.5], [-6, 6]);

  // 3D tilt: the card leans toward the cursor
  const tiltY = useTransform(smx, [-0.5, 0.5], [-7, 7]);
  const tiltX = useTransform(smy, [-0.5, 0.5], [5, -5]);

  // light sheen that slides across the portrait with the cursor
  const sheenX = useTransform(smx, [-0.5, 0.5], [20, 85]);
  const sheenY = useTransform(smy, [-0.5, 0.5], [15, 70]);
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(216,204,255,0.38), transparent 48%)`;

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    ref.current?.style.setProperty("--mx", `${x}px`);
    ref.current?.style.setProperty("--my", `${y}px`);
    mx.set(x / r.width - 0.5);
    my.set(y / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-screen overflow-hidden"
      style={
        {
          "--mx": "72%",
          "--my": "38%",
          background:
            "radial-gradient(ellipse at 78% 35%, #1a0b3d 0%, #07040f 55%, #05030a 100%)",
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

      {/* grid appears only under the cursor */}
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

      {/* ===== PORTRAIT CARD ===== */}
      <div className="pointer-events-none absolute inset-x-0 bottom-24 mx-auto w-[min(78vw,340px)] opacity-40 md:inset-x-auto md:bottom-auto md:right-[6%] md:top-1/2 md:mx-0 md:w-[min(32vw,460px)] md:-translate-y-1/2 md:opacity-100">
        {/* soft aura behind card */}
        <div
          className="absolute left-1/2 top-[10%] aspect-square w-[110%] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.4), rgba(96,165,250,0.12) 45%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <motion.div
          style={{
            x: cardX,
            y: cardY,
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 1100,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="relative"
        >
          {/* floating: available freelance (peeks above card) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[9%] left-[14%] z-0 hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 backdrop-blur-xl md:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/25 text-violet-300">
              ✦
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-white/60">Available</span>
              <span className="block text-base font-bold text-white">
                Freelance
              </span>
            </span>
          </motion.div>

          {/* floating: code window (behind card, left) */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-[36%] top-[34%] z-0 hidden w-[64%] rounded-3xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl md:block"
          >
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <pre className="mt-3 font-mono text-[10px] leading-[1.7] text-white/35">
              {`const dev = {
  name: "Naveen",
  stack: [
    "React",
    "NestJS",
    "MongoDB"
  ],
  ship: () => "🚀"
}`}
            </pre>
          </motion.div>

          {/* floating: experience (moved left so it no longer covers the card text) */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
            className="absolute -bottom-[3%] -left-[44%] z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0a24]/80 px-4 py-2.5 backdrop-blur-xl md:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
              ▣
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-white/60">Experience</span>
              <span className="block text-base font-bold text-white">
                2+ Years
              </span>
            </span>
          </motion.div>

          {/* floating: location (peeks below card) */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="absolute -bottom-[9%] right-[8%] z-0 hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 backdrop-blur-xl md:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
              ⌖
            </span>
            <span className="text-base font-bold text-white">
              India · Remote
            </span>
          </motion.div>

          {/* the card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 shadow-[0_30px_80px_-20px_rgba(139,92,246,0.5)] backdrop-blur-xl"
          >
            {/* image area: photo is now full-bleed, full brightness */}
            <div
              className="relative isolate aspect-[4/5] w-full overflow-hidden rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 70% 60%, #2a1670 0%, #120a30 50%, #07040f 100%)",
              }}
            >
              {/* optional poster text, only if your photo doesn't already contain it */}
              {SHOW_POSTER_TEXT && (
                <div
                  className="absolute inset-x-0 top-0 -translate-y-[7%] select-none px-5 font-black uppercase leading-[0.95] text-[#6b5bd0]/60"
                  style={{
                    fontFamily: "Impact, 'Arial Narrow Bold', sans-serif",
                    fontSize: "clamp(3.6rem, 7vw, 6.5rem)",
                  }}
                >
                  <div>Build.</div>
                  <div>Learn</div>
                  <div>Evolve</div>
                </div>
              )}

              {/* photo: no blend mode, no heavy mask, so it stays bright and sharp.
                  Wipes up on load, then drifts with the cursor (parallax). */}
              <motion.div
                style={{ x: photoX, y: photoY }}
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{
                  duration: 1.1,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -inset-[4%]"
              >
                <Image
                  src={PHOTO}
                  alt={FULL_NAME}
                  fill
                  priority
                  sizes="(min-width:768px) 30vw, 78vw"
                  className="object-cover object-top"
                />
              </motion.div>

              {/* violet rim light from the lower right (keeps the glow, not the dimming) */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 55% at 85% 95%, rgba(139,92,246,0.45), transparent 70%)",
                  mixBlendMode: "screen",
                }}
              />

              {/* cursor-following sheen */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{ background: sheen, mixBlendMode: "soft-light" }}
              />

              {/* gentle bottom fade so the footer text blends in */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,4,15,0.8), transparent)",
                }}
              />

              {/* tiny code snippet */}
              <pre className="pointer-events-none absolute bottom-3 left-4 font-mono text-[7px] leading-[1.5] text-violet-200/50">
                {`const dev = {
  name: "Naveen",
  stack: ["React", "Nest"],
  passion: "Building scalable
    digital experiences",
};`}
              </pre>

              {/* thin inner border for a crisp frame */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-violet-300/20" />
            </div>

            {/* card footer */}
            <div className="px-2 pb-1 pt-4">
              <p className="text-2xl font-bold text-white">{FULL_NAME}</p>
              <p className="mt-0.5 text-base text-white/60">{ROLE}</p>
              <div className="mt-4 flex items-center justify-between font-mono text-sm">
                <span className="inline-flex items-center gap-2 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  Online
                </span>
                <span className="text-white/50">{VERSION}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== TEXT ===== */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-40 pt-36">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-sm text-pale"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            available for opportunities
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 font-mono text-base text-white/60"
          >
            Hello, world. I&apos;m{" "}
            <span className="text-white">{FULL_NAME}</span>
          </motion.p>

          <h1 className="mt-3 text-[clamp(2.75rem,4.8vw,5.25rem)] font-black leading-[1.02] tracking-tight">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block text-white"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                I build
              </motion.span>
            </span>
            {/* nowrap stops the scramble glyphs from breaking onto extra lines */}
            <span className="text-gradient block w-max min-h-[1.2em] whitespace-nowrap pb-2">
              {phrase}
              <span className="caret" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-5 max-w-lg text-xl text-white/70 md:text-2xl"
          >
            {TAGLINE}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="glow-electric group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[oklch(0.72_0.21_250)] to-[oklch(0.68_0.25_300)] px-9 py-4 text-lg font-semibold text-white transition hover:-translate-y-1"
            >
              View Projects
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-2xl px-9 py-4 text-lg font-semibold text-white transition hover:-translate-y-1 hover:bg-white/10"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-12 flex gap-12 border-t border-white/10 pt-6"
          >
            {STATS.map((s) => (
              <div key={s.v}>
                <p className="text-gradient text-4xl font-black md:text-5xl">
                  {s.k}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  {s.v}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* vertical label */}
      <div className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.45em] text-white/30 [writing-mode:vertical-rl] lg:block">
        PORTFOLIO · 2026 · SCROLL ↓
      </div>

      {/* tech ticker */}
      <div className="absolute inset-x-0 bottom-6 z-30 px-6">
        <div
          className="glass mx-auto max-w-7xl overflow-hidden rounded-full py-3"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <motion.div
            className="flex w-max whitespace-nowrap font-mono text-sm text-pale/80"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {[...STACK, ...STACK].map((s, k) => (
              <span key={k} className="mx-5 inline-flex items-center gap-10">
                {s}
                <span className="text-glow">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
