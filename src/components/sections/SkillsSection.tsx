import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillCategories } from "@/data/profile";

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-32 py-16 md:py-24">
      <Container>
        <Reveal className="space-y-10">
          <SectionHeader eyebrow="> 02." title="Skills" />

          <div className="border-y border-border">
            {skillCategories.map((group, index) => (
              <Reveal
                key={group.title}
                delay={0.06 * index}
                className="grid gap-6 border-b border-border py-7 last:border-b-0 md:grid-cols-[180px_1fr]"
              >
                <p className="font-heading text-2xl font-semibold tracking-[-0.03em] text-text">{group.title}</p>
                <div className="flex flex-wrap gap-3">
                  {group.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm font-medium text-[#a1a1aa] transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(196,181,253,0.30)] hover:bg-[rgba(196,181,253,0.04)] hover:text-[#f5f5f5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
