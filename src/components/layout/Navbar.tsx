"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { profile } from "@/data/profile";
import { navItems } from "@/lib/constants";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const frameRef = useRef<number | null>(null);

  // Strip hash from URL on mount (safety net)
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

        if (!section) {
          continue;
        }

        const top = section.getBoundingClientRect().top;

        if (top <= offset) {
          current = id;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;

      if (nearBottom) {
        current = "contact";
      }

      setActiveSection((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        updateActiveSection();
        frameRef.current = null;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[rgba(5,5,7,0.82)] backdrop-blur-lg">
      <Container>
        <div className="flex h-[76px] items-center justify-between gap-4">
          <div className="flex w-40 items-center">
            <button
              type="button"
              className="group inline-flex items-center text-text"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.replaceState(null, "", window.location.pathname);
              }}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[rgba(196,181,253,0.35)] bg-[rgba(255,255,255,0.04)] transition-all duration-200 hover:opacity-90">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6">
                  <defs>
                    <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c4b5fd" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M21 11 C21 9.3 19.2 8 17 8 H15 C12.8 8 11 9.3 11 11 C11 12.7 12.8 14 15 14 H17 C19.2 14 21 15.3 21 17 C21 18.7 19.2 20 17 20 H15 C12.8 20 11 18.7 11 17"
                    fill="none"
                    stroke="url(#navLogoGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <ul className="flex items-center gap-3 text-[14px] font-medium xl:gap-5">
              {navItems.map((item) => (
                <li key={item.sectionId} className="flex items-center">
                  <button
                    type="button"
                    className={cn(
                      "group inline-flex items-center px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-[rgba(196,181,253,0.06)] whitespace-nowrap",
                      activeSection === item.sectionId
                        ? "text-white font-semibold"
                        : "text-[#a1a1aa] font-medium",
                    )}
                    onClick={() => scrollToSection(item.sectionId)}
                  >
                    <span className="group-hover:text-[#c4b5fd] transition-colors duration-200 shrink-0">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden w-40 justify-end lg:flex">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 px-5 items-center justify-center rounded-full border border-[rgba(196,181,253,0.35)] bg-transparent font-heading text-xs font-bold text-[#f8fafc] transition-all duration-300 hover:bg-[#c4b5fd] hover:text-[#050507]"
            >
              Resume
            </a>
          </div>

          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(196,181,253,0.35)] bg-[rgba(255,255,255,0.04)] text-[#c4b5fd] transition-all duration-300 hover:opacity-90 lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            {isOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isOpen ? (
          <div className="border-t border-white/[0.08] pb-4 pt-3 lg:hidden px-2">
            <nav>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.sectionId}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200",
                        activeSection === item.sectionId
                          ? "text-white bg-[rgba(196,181,253,0.08)] font-semibold"
                          : "text-[#a1a1aa] hover:text-white hover:bg-[rgba(196,181,253,0.04)] font-medium",
                      )}
                      onClick={() => {
                        scrollToSection(item.sectionId);
                        setIsOpen(false);
                      }}
                    >
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-3">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 items-center justify-center rounded-full border border-[rgba(196,181,253,0.35)] bg-transparent font-heading text-xs font-bold text-[#f8fafc] transition-all duration-300 hover:bg-[#c4b5fd] hover:text-[#050507] w-full"
              >
                Resume
              </a>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
