"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-28 py-24 md:py-32">
      <Container>
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6FF00] mb-4"
        >
          &gt; 03. Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl mb-4"
        >
          Featured Work
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[#A1A1AA] mb-16 max-w-xl"
        >
          A selection of projects built with a focus on scalability, clean architecture, and real-world impact.
        </motion.p>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
