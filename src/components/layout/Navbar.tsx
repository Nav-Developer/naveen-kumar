"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import EnquiryDialog from "./EnquiryDialog";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/data/constant";

type NavLink = {
  label: string;
  href: string;
  /** If set, this link scrolls to <section id="..."> on the home page */
  section?: string;
};

const links: NavLink[] = [
  { label: "About", href: "/#about", section: "about" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/#services", section: "services" },
  // { label: "Contact", href: "/contact" },
];

const sectionIds = links.flatMap((l) => (l.section ? [l.section] : []));

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // back at the hero → nothing highlighted
      if (window.scrollY < 120) setActiveSection("");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll-spy: highlight the section currently crossing the middle of the screen.
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 120) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (link: NavLink) =>
    link.section
      ? isHome && activeSection === link.section
      : pathname === link.href;

  // On the home page, section links scroll smoothly instead of navigating.
  const handleClick = (e: React.MouseEvent, link: NavLink) => {
    setOpen(false);
    if (!isHome || !link.section) return; // normal route navigation

    const el = document.getElementById(link.section);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${link.section}`);
    setActiveSection(link.section);
  };

  const handleLogo = (e: React.MouseEvent) => {
    setOpen(false);
    if (!isHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
    setActiveSection("");
  };

  const [enquiryOpen, setEnquiryOpen] = useState(false);

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
          onClick={handleLogo}
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
            const active = isActive(link);

            return (
              <li key={link.label} className="relative">
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}

                <Link
                  href={link.href}
                  onClick={(e) => handleClick(e, link)}
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
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setEnquiryOpen(true);
            }}
            className="glow-electric rounded-xl bg-gradient-to-r from-[oklch(0.72_0.21_250)] to-[oklch(0.68_0.25_300)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Let&apos;s Talk
          </button>

          <EnquiryDialog
            open={enquiryOpen}
            onClose={() => setEnquiryOpen(false)}
            title="Let's Talk"
            subtitle="Tell me about your project. Let's make it happen."
            enquiryLabel="General Enquiry"
            defaultSubject=""
            defaultMessage=""
            whatsappNumber={WHATSAPP_NUMBER}
            email={CONTACT_EMAIL}
            recipientName="Naveen"
          />

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
              const active = isActive(link);

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={(e) => handleClick(e, link)}
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
