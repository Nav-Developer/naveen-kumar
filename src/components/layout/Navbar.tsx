"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Highlight the active route.
  const isActive = (href: string) => pathname === href;

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
        aria-label="Main navigation"
        className={`flex items-center justify-between rounded-2xl px-5 py-3 ${
          scrolled ? "glass-strong" : "glass"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Naveen home"
          className="flex items-center gap-2 text-lg font-bold text-white"
        >
          <span>
            Naveen<span className="text-gradient">.</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 text-sm md:flex">
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <li key={link.href} className="relative">
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/10"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}

                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative block rounded-lg px-3 py-2 transition-colors hover:text-white ${
                    active ? "text-white" : "text-white/60"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="glow-electric rounded-xl bg-gradient-to-r from-[oklch(0.72_0.21_250)] to-[oklch(0.68_0.25_300)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Let's Talk
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((previous) => !previous)}
            className="glass flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-xl md:hidden"
          >
            <span
              className={`h-0.5 w-4 bg-white transition-transform ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />

            <span
              className={`h-0.5 w-4 bg-white transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-0.5 w-4 bg-white transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="glass-strong mt-2 flex flex-col rounded-2xl p-2 md:hidden"
          >
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 transition-colors hover:bg-white/10 hover:text-white ${
                      active ? "bg-white/10 text-white" : "text-white/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export { Nav as Navbar };
export default Nav;
