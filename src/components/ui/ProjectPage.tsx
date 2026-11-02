"use client";

import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/project";
import MotionBackground from "./MotionBackground";

type Cat = (typeof projects.cats)[number];

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

export function ProjectPage() {
  const [active, setActive] = useState<Cat>("All");

  const filtered =
    active === "All"
      ? projects.items
      : projects.items.filter((p) => p.cat === active);

  return (
    <MotionBackground className="relative py-32 px-6">
      <section>
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={projects.eyebrow}
            heading={projects.heading}
            subheading={projects.subtitle}
          />

          {/* Category Filters */}
          <Reveal>
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {projects.cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative px-4 py-2 rounded-full text-sm transition ${
                    active === c
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {active === c && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-white/15"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl"
                >
                  {/* Project Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={p.image.src}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition" />

                    {/* Project Status */}
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-widest text-white">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          p.status === "Live"
                            ? "bg-emerald-400"
                            : "bg-amber-400 animate-pulse"
                        }`}
                      />
                      {p.status}
                    </span>

                    {/* Action Buttons */}
                    <div
                      className="
                        absolute inset-x-0 bottom-0 p-4
                        flex gap-2
                        translate-y-0 opacity-100
                        md:translate-y-full md:opacity-0
                        md:group-hover:translate-y-0
                        md:group-hover:opacity-100
                        transition-all duration-300
                      "
                    >
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-xl py-2.5 text-sm font-medium text-white inline-flex items-center justify-center gap-1.5 border border-white/15 bg-black/60 backdrop-blur-xl hover:bg-white/20 active:scale-95 transition"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                      </a>

                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-xl py-2.5 text-sm font-medium text-white inline-flex items-center justify-center gap-1.5 border border-white/15 bg-black/60 backdrop-blur-xl hover:bg-white/20 active:scale-95 transition"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        Code
                      </a>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-white">
                        {p.title}
                      </h3>

                      <span className="text-[10px] uppercase tracking-widest text-white/60 rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                        {p.cat}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-white/60">{p.desc}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono rounded-md bg-white/5 px-2 py-0.5 text-white/80"
                        >
                          #{t.toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </MotionBackground>
  );
}
