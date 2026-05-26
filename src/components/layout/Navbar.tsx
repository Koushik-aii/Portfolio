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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-[rgba(247,243,234,0.88)] backdrop-blur-lg">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex w-40 items-center">
            <button
              type="button"
              className="group inline-flex items-center text-text"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.replaceState(null, "", window.location.pathname);
              }}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-accent/35 bg-surface font-heading text-lg font-bold text-accent transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                SK
              </span>
            </button>
          </div>

          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <ul className="flex items-center gap-9 text-[15px] font-medium xl:gap-10">
              {navItems.map((item) => (
                <li key={item.sectionId}>
                  <button
                    type="button"
                    className={cn(
                      "group inline-flex items-center gap-2 transition-colors duration-200",
                      activeSection === item.sectionId
                        ? "text-accent"
                        : "text-muted hover:text-text",
                    )}
                    onClick={() => scrollToSection(item.sectionId)}
                  >
                    <span className="font-mono text-[13.5px] font-bold text-accent/75 group-hover:text-accent-warm transition-colors duration-200">{`> ${item.number}`}</span>
                    <span>{item.label}</span>
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
              className="inline-flex h-12 px-6 items-center justify-center rounded-lg border border-accent/35 bg-surface font-heading text-sm font-bold text-accent transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
            >
              Resume
            </a>
          </div>

          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-accent/35 bg-surface text-accent transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white lg:hidden"
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
          <div className="border-t border-border/40 pb-4 pt-3 lg:hidden">
            <nav>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.sectionId}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition",
                        activeSection === item.sectionId
                          ? "text-accent bg-accent/[0.06]"
                          : "text-muted hover:text-text hover:bg-surface",
                      )}
                      onClick={() => {
                        scrollToSection(item.sectionId);
                        setIsOpen(false);
                      }}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className={cn(
                        "font-mono text-xs font-bold transition-colors",
                        activeSection === item.sectionId ? "text-accent-warm" : "text-accent/75"
                      )}>{`> ${item.number}`}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-3 px-3">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 items-center justify-center rounded-lg border border-accent/35 bg-surface font-heading text-sm font-bold text-accent transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white w-full"
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
