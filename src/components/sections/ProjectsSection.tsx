import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-32 py-16 md:py-24">
      <Container>
        <Reveal className="space-y-10">
          <SectionHeader eyebrow="> 03." title="Projects" />

          <div className="space-y-16">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={0.08 * index}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
