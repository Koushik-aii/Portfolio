"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { profile } from "@/data/profile";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const frameRef = useRef<number | null>(null);

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-accent/10 bg-[rgba(5,8,20,0.9)] backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex w-40 items-center">
            <a href="#top" className="group inline-flex items-center text-white">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/50 bg-[#09101f] font-heading text-xl font-semibold text-accent shadow-[0_0_0_1px_rgba(110,231,249,0.08)] transition duration-200 group-hover:border-accent group-hover:shadow-[0_0_22px_rgba(110,231,249,0.16)]">
                SK
              </span>
            </a>
          </div>

          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <ul className="flex items-center gap-8 text-sm text-white/82 xl:gap-9">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    className={cn(
                      "group inline-flex items-center gap-2 transition-colors duration-200",
                      activeSection === item.href.slice(1)
                        ? "text-cyan-300"
                        : "text-slate-300/70 hover:text-cyan-200",
                    )}
                    href={item.href}
                  >
                    <span className="font-mono text-xs tracking-[0.22em] text-accent">{`> ${item.number}`}</span>
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden w-40 justify-end lg:flex">
            <ButtonLink
              href={profile.resumeUrl}
              variant="secondary"
              size="sm"
              className="border-accent/40 text-accent hover:border-accent hover:bg-accent/10"
            >
              Resume
            </ButtonLink>
          </div>

          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex items-center rounded-xl border border-accent/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-accent transition hover:border-accent/50 hover:bg-accent/10 lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>

        {isOpen ? (
          <div className="border-t border-accent/10 pb-4 pt-4 lg:hidden">
            <nav>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      className={cn(
                        "flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition",
                        activeSection === item.href.slice(1)
                          ? "border-accent/30 bg-accent/10 text-accent"
                          : "border-white/8 bg-white/[0.02] text-white/84 hover:border-accent/30 hover:text-white",
                      )}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="font-mono text-xs tracking-[0.22em] text-accent">{item.number}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-4">
              <ButtonLink
                href={profile.resumeUrl}
                variant="secondary"
                size="sm"
                className="w-full border-accent/40 text-accent hover:border-accent hover:bg-accent/10"
              >
                Resume
              </ButtonLink>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
