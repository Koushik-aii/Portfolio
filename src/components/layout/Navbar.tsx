"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "ABOUT", sectionId: "about" },
  { label: "SKILLS", sectionId: "skills" },
  { label: "PROJECTS", sectionId: "projects" },
  { label: "LEADERSHIP", sectionId: "leadership" },
  { label: "CONTACT", sectionId: "contact" },
];

import { useId } from "react";

function LogoBrandMark() {
  const gradId = useId();
  return (
    <svg 
      width="28" 
      height="32" 
      viewBox="0 0 28 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      aria-hidden="true"
      style={{ transform: "translateZ(0)" }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C6FF00" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path 
        d="M22 9C22 6.8 20 5 17.5 5H12C9.5 5 7.5 6.8 7.5 9C7.5 11.2 9.5 13 12 13H16C18.5 13 20.5 14.8 20.5 17C20.5 19.2 18.5 21 16 21H10.5C8 21 6 19.2 6 17" 
        stroke={`url(#${gradId})`} 
        strokeWidth={2.5} 
        strokeLinecap="round" 
      />
      <circle cx="22" cy="26" r="2.5" fill="#C6FF00" opacity={0.8} />
    </svg>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [scrolled, setScrolled] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const sectionIds = ["about", "skills", "projects", "leadership", "contact"];

    const updateActiveSection = () => {
      const offset = 140;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        const top = section.getBoundingClientRect().top;
        if (top <= offset) current = id;
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (nearBottom) current = "contact";

      setScrolled(window.scrollY > 60);
      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        updateActiveSection();
        frameRef.current = null;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={cn(
          "w-full max-w-[900px] rounded-2xl border border-white/[0.08] transition-all duration-300",
          "bg-[rgba(5,5,5,0.80)] backdrop-blur-xl",
          scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.6)]" : "shadow-none",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-5 transition-all duration-300",
            scrolled ? "h-[54px]" : "h-[64px]",
          )}
        >
          {/* Logo */}
          <button
            type="button"
            aria-label="Scroll to top"
            className="group flex items-center gap-2"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.replaceState(null, "", window.location.pathname);
            }}
          >
            <span className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(198,255,0,0.6)]">
              <LogoBrandMark />
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <button
                  key={item.sectionId}
                  type="button"
                  id={`nav-${item.sectionId}`}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={cn(
                    "group relative px-4 py-1.5 font-mono text-[11px] font-semibold tracking-[0.12em] transition-all duration-200",
                    isActive ? "text-[#C6FF00]" : "text-[#A1A1AA] hover:text-white",
                  )}
                >
                  {item.label}

                  {/* Arrow that slides in on hover */}
                  <span
                    className={cn(
                      "absolute -right-0.5 top-1/2 -translate-y-1/2 text-[#C6FF00] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1",
                      isActive && "opacity-100"
                    )}
                    style={{ fontSize: "8px" }}
                  >
                    ›
                  </span>

                  {/* Underline from center */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 h-px -translate-x-1/2 rounded-full bg-[#C6FF00] transition-all duration-300",
                      isActive ? "w-4" : "w-0 group-hover:w-3",
                    )}
                  />

                  {/* Active lime dot indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#C6FF00]"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Resume CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center rounded-full border border-[#C6FF00]/30 bg-[#C6FF00]/08 px-5 font-mono text-[11px] font-bold tracking-[0.08em] text-[#C6FF00] transition-all duration-200 hover:bg-[#C6FF00] hover:text-[#050505] hover:border-[#C6FF00] hover:shadow-[0_0_16px_rgba(198,255,0,0.35)]"
            >
              RESUME
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-[#A1A1AA] transition hover:border-[#C6FF00]/30 hover:text-[#C6FF00] lg:hidden"
            onClick={() => setIsOpen((v) => !v)}
            type="button"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-white/[0.06] lg:hidden"
            >
              <nav className="px-4 py-3">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.sectionId}>
                      <button
                        type="button"
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-mono text-[11px] font-semibold tracking-[0.1em] transition-all duration-200",
                          activeSection === item.sectionId
                            ? "bg-[#C6FF00]/08 text-[#C6FF00]"
                            : "text-[#A1A1AA] hover:bg-white/[0.04] hover:text-white",
                        )}
                        onClick={() => {
                          scrollToSection(item.sectionId);
                          setIsOpen(false);
                        }}
                      >
                        {item.label}
                        {activeSection === item.sectionId && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C6FF00]" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pb-1">
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-full items-center justify-center rounded-full border border-[#C6FF00]/30 font-mono text-[11px] font-bold tracking-[0.08em] text-[#C6FF00] transition hover:bg-[#C6FF00] hover:text-[#050505]"
                  >
                    RESUME
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
