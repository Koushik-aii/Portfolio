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

          <div className="border-y border-white/10">
            {skillCategories.map((group, index) => (
              <Reveal
                key={group.title}
                delay={0.06 * index}
                className="grid gap-6 border-b border-white/10 py-7 last:border-b-0 md:grid-cols-[180px_1fr]"
              >
                <p className="font-heading text-2xl font-semibold tracking-[-0.03em] text-white">{group.title}</p>
                <div className="flex flex-wrap gap-3">
                  {group.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/88 transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/[0.06]"
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
