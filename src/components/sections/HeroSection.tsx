import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
    <section id="top" className="relative overflow-hidden pb-20 pt-24 md:pb-28 md:pt-32">
      <Container className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_20%_20%,rgba(110,231,249,0.16),transparent_22%),radial-gradient(circle_at_78%_12%,rgba(139,92,246,0.16),transparent_24%),radial-gradient(circle_at_center,rgba(255,255,255,0.035),transparent_42%)]" />
        <div className="absolute inset-x-0 top-12 -z-10 h-[440px] bg-hero-grid bg-[size:34px_34px] opacity-[0.07]" />
        <div className="absolute left-[18%] top-16 -z-10 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />

        <div className="grid gap-10 border-b border-white/10 pb-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-12 md:pb-20">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                {profile.heroTag}
              </span>

              <div className="space-y-4">
                <h1 className="max-w-[12ch] font-heading text-5xl font-semibold leading-[0.98] tracking-[-0.07em] text-white sm:text-[3.4rem] md:text-6xl lg:text-7xl">
                  {profile.name}
                </h1>
                <p className="font-heading text-xl tracking-[-0.03em] text-white/84 md:text-2xl">
                  {profile.role}
                </p>
                <p className="max-w-2xl text-base leading-8 text-muted md:text-xl md:leading-9">
                  {profile.heroHeadline}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href={profile.resumeUrl} className="min-w-[148px]">
                Resume
              </ButtonLink>
              <ButtonLink href="#projects" variant="secondary" className="min-w-[148px]">
                View Projects
              </ButtonLink>
              <ButtonLink href="#contact" variant="ghost" className="min-w-[128px]">
                Contact
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))] p-5 shadow-glow md:p-6">
              <div className="absolute inset-0 bg-hero-grid bg-[size:28px_28px] opacity-[0.06]" />
              <div className="relative space-y-5">
                <div className="flex items-center gap-2 opacity-80">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                </div>

                <div className="grid gap-4 text-sm leading-6 text-white/84">
                  <div className="grid gap-3 border-b border-white/10 pb-4 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">Location</p>
                      <p className="mt-1.5 text-white">India</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">Education</p>
                      <p className="mt-1.5 text-white">{educationTitle}</p>
                      <p className="text-muted">{educationInstitution}</p>
                    </div>
                  </div>

                  <div className="border-b border-white/10 pb-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">Current Focus</p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {focusAreas.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-white/88"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">Quick Links</p>
                    <div className="mt-2.5 flex flex-wrap gap-2.5">
                      {quickLinks.map((link) => (
                        <a
                          key={link.label}
                          className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-white/88 transition duration-200 hover:border-accent/40 hover:text-accent"
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
