import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { leadershipTimeline } from "@/data/profile";

export function LeadershipSection() {
  return (
    <section id="leadership" className="scroll-mt-32 py-16 md:py-24">
      <Container>
        <Reveal className="space-y-10">
          <SectionHeader eyebrow="> 04." title="Leadership" />

          <div className="relative border-l border-border pl-6 md:pl-10">
            {leadershipTimeline.map((item, index) => (
              <Reveal
                key={item.title}
                delay={0.06 * index}
                className="relative grid gap-4 border-b border-border py-7 last:border-b-0 md:grid-cols-[220px_1fr]"
              >
                <span className="absolute -left-[31px] top-9 h-3 w-3 rounded-full border border-[#b39ddb]/40 bg-background md:-left-[46px]" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">{item.subtitle}</p>
                  <p className="mt-3 font-heading text-2xl font-semibold tracking-[-0.03em] text-text">
                    {item.title}
                  </p>
                </div>
                <div className="max-w-2xl space-y-4">
                  <p className="text-sm leading-7 text-muted">{item.description}</p>
                  <ul className="space-y-2 text-sm leading-7 text-text/88">
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c4b5fd]" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
