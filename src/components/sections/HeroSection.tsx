"use client";

import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ScrollButton } from "@/components/ui/ScrollButton";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

const quickLinks = [
  { label: "GitHub", href: profile.githubUrl },
  { label: "LinkedIn", href: profile.linkedinUrl },
  { label: "Email", href: `mailto:${profile.email}` },
];

const focusAreas = ["Backend Engineering", "REST APIs", "Full-Stack Development"];
const [educationTitle, educationInstitution] = profile.education.split(", ");

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden pb-8 pt-24 md:pb-12 md:pt-32">
      <Container className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.06),transparent_22%),radial-gradient(circle_at_78%_12%,rgba(15,118,110,0.03),transparent_24%)]" />
        <div className="grid gap-12 pb-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14 md:pb-10">
          <Reveal className="space-y-7">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-accent/25 bg-accent/[0.03] px-3.5 py-1.5 text-xs font-medium text-accent">
                {profile.heroTag}
              </span>

              <div className="space-y-4">
                <h1 className="max-w-[14ch] font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-text sm:text-5xl md:text-6xl lg:text-[4.2rem]">
                  {profile.name}
                </h1>
                <p className="font-heading text-lg tracking-[-0.02em] text-muted md:text-xl">
                  {profile.role}
                </p>
                <p className="max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
                  {profile.heroHeadline}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href={profile.resumeUrl} className="min-w-[140px]">
                Resume
              </ButtonLink>
              <ScrollButton sectionId="projects" variant="secondary" className="min-w-[140px]">
                View Projects
              </ScrollButton>
              <ScrollButton sectionId="contact" variant="ghost" className="min-w-[120px]">
                Contact
              </ScrollButton>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-surface p-5 md:p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-card">
              <div className="space-y-5">
                <div className="grid gap-4 text-sm leading-6 text-muted">
                  <div className="grid gap-3 border-b border-border pb-4 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent/70">Location</p>
                      <p className="mt-1.5 text-text">India</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent/70">Education</p>
                      <p className="mt-1.5 text-text">{educationTitle}</p>
                      <p className="text-muted text-xs mt-0.5">{educationInstitution}</p>
                    </div>
                  </div>

                  <div className="border-b border-border pb-4">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent/70">Current Focus</p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {focusAreas.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-accent-warm/25 bg-accent-warm/[0.03] px-2.5 py-1 text-xs font-medium text-accent-warm transition-colors hover:border-accent-warm/40 hover:bg-accent-warm/[0.06]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent/70">Quick Links</p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {quickLinks.map((link) => (
                        <a
                          key={link.label}
                          className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1 text-xs text-text/88 transition duration-200 hover:border-accent hover:text-accent hover:bg-accent/[0.04]"
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
