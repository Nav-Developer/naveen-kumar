// "use client";

// import { useRef } from "react";
// import { motion } from "framer-motion";

// function seeded(n: number) {
//   const x = Math.sin(n * 9999) * 10000;
//   return x - Math.floor(x);
// }

// const MOTES = Array.from({ length: 26 }, (_, k) => ({
//   left: `${seeded(k + 1) * 100}%`,
//   top: `${seeded(k + 50) * 100}%`,
//   size: 2 + Math.round(seeded(k + 90) * 2),
//   dur: 6 + seeded(k + 130) * 8,
//   delay: seeded(k + 170) * 6,
// }));

// const spotlightMask = (r: number) =>
//   `radial-gradient(circle ${r}px at var(--mx) var(--my), #000 0%, transparent 100%)`;

// type Props = {
//   children: React.ReactNode;
//   className?: string;
// };

// export default function MotionBackground({ children, className = "" }: Props) {
//   const ref = useRef<HTMLElement>(null);

//   const onMove = (e: React.MouseEvent<HTMLElement>) => {
//     const r = e.currentTarget.getBoundingClientRect();
//     ref.current?.style.setProperty("--mx", `${e.clientX - r.left}px`);
//     ref.current?.style.setProperty("--my", `${e.clientY - r.top}px`);
//   };

//   return (
//     <section
//       ref={ref}
//       onMouseMove={onMove}
//       className={`relative overflow-hidden ${className}`}
//       style={
//         {
//           "--mx": "72%",
//           "--my": "30%",
//           background:
//             "radial-gradient(ellipse at 78% 20%, #1a0b3d 0%, #07040f 55%, #05030a 100%)",
//         } as React.CSSProperties
//       }
//     >
//       {/* cursor glow */}
//       <div
//         className="pointer-events-none absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(520px circle at var(--mx) var(--my), rgba(139,92,246,0.2), transparent 65%)",
//         }}
//       />

//       {/* grid only under the cursor */}
//       <div
//         className="pointer-events-none absolute inset-0"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.3) 1px, transparent 1px)",
//           backgroundSize: "56px 56px",
//           maskImage: spotlightMask(300),
//           WebkitMaskImage: spotlightMask(300),
//         }}
//       />

//       {/* rising light dust */}
//       {MOTES.map((m, k) => (
//         <motion.span
//           key={k}
//           className="pointer-events-none absolute rounded-full bg-pale"
//           style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
//           animate={{ y: [0, -170], opacity: [0, 0.9, 0] }}
//           transition={{
//             duration: m.dur,
//             repeat: Infinity,
//             delay: m.delay,
//             ease: "easeOut",
//           }}
//         />
//       ))}

//       <div className="relative z-10">{children}</div>
//     </section>
//   );
// }

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

// all decorative layers fade out at the top & bottom edge, so the section
// edge is always the plain base colour -> neighbouring sections blend
// together with no visible seam.
const edgeFade =
  "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** set to false for a section that should keep a hard top/bottom edge (e.g. hero) */
  fade?: boolean;
};

export default function MotionBackground({
  children,
  className = "",
  fade = true,
}: Props) {
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
          "--my": "40%",
          // same flat colour for every section = no seams
          background: "#05030a",
        } as React.CSSProperties
      }
    >
      {/* decorative layers (faded at the edges) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={
          fade ? { maskImage: edgeFade, WebkitMaskImage: edgeFade } : undefined
        }
      >
        {/* soft ambient glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 78% 45%, rgba(26,11,61,0.95) 0%, rgba(7,4,15,0.6) 50%, transparent 75%)",
          }}
        />

        {/* cursor glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(520px circle at var(--mx) var(--my), rgba(139,92,246,0.2), transparent 65%)",
          }}
        />

        {/* grid only under the cursor */}
        <div
          className="absolute inset-0"
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
            className="absolute rounded-full bg-pale"
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
      </div>

      <div className="relative z-10">{children}</div>
    </section>
  );
}
