"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // highlight the link of the section currently in view
  useEffect(() => {
    const els = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "w-[min(960px,92vw)]" : "w-[min(1100px,94vw)]"
      }`}
    >
      <nav
        className={`flex items-center justify-between rounded-2xl px-5 py-3 ${
          scrolled ? "glass-strong" : "glass"
        }`}
      >
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-bold text-white"
        >
          <span className="glow-electric inline-block h-7 w-7 rounded-lg bg-gradient-to-br from-[oklch(0.72_0.21_250)] via-[oklch(0.68_0.25_300)] to-[oklch(0.78_0.18_165)]" />
          <span>
            Naveen<span className="text-gradient">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 text-sm md:flex">
          {links.map((l) => (
            <li key={l.href} className="relative">
              {active === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg bg-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <a
                href={l.href}
                className={`relative block rounded-lg px-3 py-2 transition-colors hover:text-white ${
                  active === l.href ? "text-white" : "text-white/60"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="glow-electric rounded-xl bg-gradient-to-r from-[oklch(0.72_0.21_250)] to-[oklch(0.68_0.25_300)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Let&apos;s Talk
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="glass flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-xl md:hidden"
          >
            <span
              className={`h-0.5 w-4 bg-white transition ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-4 bg-white transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-4 bg-white transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            className="glass-strong mt-2 flex flex-col rounded-2xl p-2 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export { Nav as Navbar };
export default Nav;
