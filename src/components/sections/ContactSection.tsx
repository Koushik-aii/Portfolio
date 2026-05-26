import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-32 py-20 md:py-28">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="space-y-8">
            <SectionHeader eyebrow="> 05." title="Contact" className="mx-auto max-w-4xl text-left" />
            <div className="space-y-5">
              <h2 className="font-heading text-5xl font-semibold tracking-[-0.06em] text-text md:text-7xl">
                Get In Touch
              </h2>
              <p className="mx-auto max-w-3xl text-lg leading-9 text-muted md:text-xl md:leading-9">
                I&apos;m currently looking for new opportunities and open to collaborative work. If you have an idea,
                project, or opportunity where I can contribute and grow, feel free to reach out.
              </p>
            </div>

            <div className="pt-2">
              <ButtonLink
                href={`mailto:${profile.email}`}
                variant="primary"
                size="lg"
                className="min-w-[220px] !border-[rgba(196,181,253,0.45)] !bg-[#0b0b10] !text-[#f5f5f5] hover:!bg-[#c4b5fd] hover:!text-[#050505] hover:!border-[#c4b5fd]"
              >
                Say Hello
              </ButtonLink>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm font-medium text-text/75">
              <a
                className="transition hover:text-accent"
                href={profile.githubUrl}
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              <a
                className="transition hover:text-accent"
                href={profile.linkedinUrl}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
