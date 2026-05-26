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

export function HeroSection() {  return (
    <section id="top" className="relative overflow-hidden pb-8 pt-28 md:pb-12 md:pt-36">
      <Container className="relative">
        {/* Soft violet radial gradient behind the snapshot card */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.06),transparent_60%)]" />
        
        <div className="grid gap-10 pb-4 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14 md:pb-6">
          <Reveal className="space-y-7">
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-[3px] rounded-full bg-gradient-to-b from-[#c4b5fd]/60 to-[#7c3aed]/10 self-stretch shrink-0" />
                <div className="space-y-4">
                  <h1 className="max-w-[14ch] font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-text sm:text-5xl md:text-6xl lg:text-[4.2rem]">
                    {profile.name}
                  </h1>
                  <p className="font-heading text-xl font-medium tracking-[-0.02em] text-[#c4b5fd] md:text-2xl">
                    {profile.role}
                  </p>
                  <p className="max-w-xl text-base leading-7 text-[#c7c7d1] md:text-lg md:leading-8">
                    {profile.heroHeadline}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink
                href={profile.resumeUrl}
                className="min-w-[145px] !bg-gradient-to-r !from-[#c4b5fd] !to-[#8b5cf6] !text-[#050507] !font-bold !border-transparent hover:!brightness-110 hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-[#7c3aed]/15 rounded-lg"
              >
                Resume
              </ButtonLink>
              <ScrollButton
                sectionId="projects"
                variant="secondary"
                className="min-w-[145px] !border-[rgba(196,181,253,0.30)] !bg-[#101014] !text-[#f8fafc] hover:!bg-[rgba(196,181,253,0.10)] hover:-translate-y-0.5 transition-all duration-300 rounded-lg"
              >
                View Projects
              </ScrollButton>
              <ScrollButton
                sectionId="contact"
                variant="ghost"
                className="min-w-[120px] !text-[#a1a1aa] hover:!text-[#c4b5fd] hover:underline"
              >
                Contact
              </ScrollButton>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-[rgba(196,181,253,0.18)] bg-gradient-to-br from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.025)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-md p-6 md:p-7 transition-all duration-300 hover:border-[rgba(196,181,253,0.32)]">
              <div className="space-y-5">
                {/* Header with visual accent and Status Pill */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <div className="h-[2.5px] w-12 bg-gradient-to-r from-[#c4b5fd] to-[#7c3aed] rounded-full mb-2" />
                    <h3 className="font-heading text-lg font-bold text-[#f8fafc]">Professional Snapshot</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d97706]/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#d97706]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d97706] animate-pulse" />
                    Open to opportunities
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Two Column details */}
                  <div className="grid gap-4 sm:grid-cols-2 text-sm">
                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#a78bfa]">Location</p>
                      <p className="mt-1 text-[#f8fafc] font-medium">Vijayawada, Andhra Pradesh</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#a78bfa]">Education</p>
                      <p className="mt-1 text-[#f8fafc] font-medium">{educationTitle}</p>
                      <p className="text-[#8b8b99] text-xs mt-0.5">{educationInstitution}</p>
                    </div>
                  </div>

                  {/* Focus Chips */}
                  <div className="border-t border-white/[0.08] pt-4">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#a78bfa] mb-2">Current Focus</p>
                    <div className="flex flex-wrap gap-2">
                      {focusAreas.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-[rgba(196,181,253,0.15)] bg-[rgba(255,255,255,0.02)] px-2.5 py-1 text-xs font-semibold text-[#c7c7d1] transition-all hover:border-[#c4b5fd]/45 hover:bg-[rgba(196,181,253,0.06)] hover:text-[#f8fafc]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick links row */}
                  <div className="border-t border-white/[0.08] pt-4">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#a78bfa] mb-2">Quick Links</p>
                    <div className="flex flex-wrap gap-2">
                      {quickLinks.map((link) => (
                        <a
                          key={link.label}
                          className="inline-flex items-center rounded-md border border-[rgba(196,181,253,0.15)] bg-[#101014] px-3 py-1 text-xs font-semibold text-[#c7c7d1] transition duration-200 hover:border-[#c4b5fd]/45 hover:text-[#f8fafc] hover:bg-[rgba(196,181,253,0.06)]"
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
