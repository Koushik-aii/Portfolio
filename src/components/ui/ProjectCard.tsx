"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  index: number;
};

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.15-4.56-5.09 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.36 1.9-1.33 2.75-1.05 2.75-1.05.54 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.83-4.57 5.08.36.32.68.94.68 1.9 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function PreviewFrame({
  children,
  shouldReduceMotion,
}: {
  children: ReactNode;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_8px_30px_rgba(94,234,212,0.03)]"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

function CodeLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`font-mono text-[13px] leading-7 text-zinc-400 md:text-sm ${className}`}>
      {children}
    </div>
  );
}

function StoriXPreview() {
  return (
    <div className="p-5 md:p-6 bg-gradient-to-b from-surface to-background/50">
      <div className="space-y-4">
        <div className="border-b border-border pb-3 flex items-center justify-between">
          <p className="font-mono text-xs text-accent flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-warm inline-block mr-1.5" />
            storix.upload.ts
          </p>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-text/[0.08]" />
            <span className="w-2 h-2 rounded-full bg-text/[0.08]" />
            <span className="w-2 h-2 rounded-full bg-text/[0.08]" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-[#0e1016] p-4 md:p-5">
          <CodeLine>
            <span className="text-accent">const</span> <span className="text-zinc-200">filePipeline</span>{" "}
            <span className="text-accent-warm">=</span> <span className="text-accent-warm">{"{"}</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-zinc-300">input</span>
            <span className="text-zinc-500">: </span>
            <span className="text-emerald-400">&quot;large file upload&quot;</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-zinc-300">upload</span>
            <span className="text-zinc-500">: [</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-400">&quot;chunk splitting&quot;</span>
            <span className="text-zinc-500">, </span>
            <span className="text-emerald-400">&quot;resumable transfer&quot;</span>
            <span className="text-zinc-500">, </span>
            <span className="text-emerald-400">&quot;progress tracking&quot;</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-zinc-500">]</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-zinc-300">process</span>
            <span className="text-zinc-500">: </span>
            <span className="text-accent-warm">{"{"}</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-zinc-300">integrity</span>
            <span className="text-zinc-500">: </span>
            <span className="text-emerald-400">&quot;hash verification&quot;</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-zinc-300">optimization</span>
            <span className="text-zinc-500">: </span>
            <span className="text-emerald-400">&quot;duplicate file detection&quot;</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-zinc-300">access</span>
            <span className="text-zinc-500">: </span>
            <span className="text-emerald-400">&quot;permission-controlled sharing&quot;</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-accent-warm">{"}"}</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-zinc-300">storage</span>
            <span className="text-zinc-500">: [</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-400">&quot;file service&quot;</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-400">&quot;PostgreSQL metadata&quot;</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-400">&quot;Redis cache&quot;</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-400">&quot;version history&quot;</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-zinc-500">]</span>
          </CodeLine>
          <CodeLine>
            <span className="text-accent-warm">{"};"}</span>
          </CodeLine>
        </div>

        <div className="flex flex-wrap gap-2">
          {["Chunk Uploads", "Deduplication", "Metadata Search"].map((item) => (
            <span
              key={item}
              className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodeLensPreview() {
  return (
    <div className="p-5 md:p-6 bg-gradient-to-b from-surface to-background/50">
      <div className="space-y-4">
        <div className="border-b border-border pb-3 flex items-center justify-between">
          <p className="font-mono text-xs text-accent flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-warm inline-block mr-1.5" />
            codelens.analysis.ts
          </p>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-text/[0.08]" />
            <span className="w-2 h-2 rounded-full bg-text/[0.08]" />
            <span className="w-2 h-2 rounded-full bg-text/[0.08]" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-[#0e1016] p-4 md:p-5">
          <CodeLine>
            <span className="text-accent">const</span> <span className="text-zinc-200">analysisPipeline</span>{" "}
            <span className="text-accent-warm">=</span> <span className="text-accent-warm">{"{"}</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-zinc-300">input</span>
            <span className="text-zinc-500">: </span>
            <span className="text-emerald-400">&quot;GitHub repository URL&quot;</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-zinc-300">fetch</span>
            <span className="text-zinc-500">: [</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-400">&quot;metadata&quot;</span>
            <span className="text-zinc-500">, </span>
            <span className="text-emerald-400">&quot;file tree&quot;</span>
            <span className="text-zinc-500">, </span>
            <span className="text-emerald-400">&quot;README&quot;</span>
            <span className="text-zinc-500">, </span>
            <span className="text-emerald-400">&quot;language stats&quot;</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-zinc-500">]</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-zinc-300">process</span>
            <span className="text-zinc-500">: </span>
            <span className="text-accent-warm">{"{"}</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-zinc-300">structure</span>
            <span className="text-zinc-500">: </span>
            <span className="text-emerald-400">&quot;map folders and key files&quot;</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-zinc-300">context</span>
            <span className="text-zinc-500">: </span>
            <span className="text-emerald-400">&quot;extract project purpose and stack&quot;</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-zinc-300">intelligence</span>
            <span className="text-zinc-500">: </span>
            <span className="text-emerald-400">&quot;generate AI-assisted explanation&quot;</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-accent-warm">{"}"}</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-zinc-300">output</span>
            <span className="text-zinc-500">: [</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-400">&quot;architecture summary&quot;</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-400">&quot;codebase walkthrough&quot;</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-400">&quot;tech stack breakdown&quot;</span>
            <span className="text-zinc-500">,</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-400">&quot;developer insights&quot;</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-zinc-500">]</span>
          </CodeLine>
          <CodeLine>
            <span className="text-accent-warm">{"};"}</span>
          </CodeLine>
        </div>

        <div className="flex flex-wrap gap-2">
          {["GitHub API", "OpenAI API", "Repo Insights"].map((item) => (
            <span
              key={item}
              className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;

  return (
    <article className="grid gap-8 border-t border-border pb-4 pt-8 md:grid-cols-2 md:items-start md:gap-10 md:pt-10">
      <div className={isEven ? "order-1 md:pt-1" : "order-1 md:order-2 md:pt-1"}>
        {project.previewImage ? (
          <PreviewFrame shouldReduceMotion={reduceMotion}>
            <div className="p-5 md:p-6 bg-gradient-to-b from-surface to-background/50">
              <div className="space-y-4">
                <div className="border-b border-border pb-3 flex items-center justify-between">
                  <p className="font-mono text-xs text-accent flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-warm inline-block mr-1.5" />
                    globesync.portal.app
                  </p>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-text/[0.08]" />
                    <span className="w-2 h-2 rounded-full bg-text/[0.08]" />
                    <span className="w-2 h-2 rounded-full bg-text/[0.08]" />
                  </div>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-black border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                  <Image
                    alt={`${project.name} preview`}
                    className="object-cover object-left-top transition duration-500 ease-out group-hover:scale-[1.02]"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src={project.previewImage}
                  />
                </div>
              </div>
            </div>
          </PreviewFrame>
        ) : (
          <PreviewFrame shouldReduceMotion={reduceMotion}>
            {project.slug === "storix" ? <StoriXPreview /> : <CodeLensPreview />}
          </PreviewFrame>
        )}
      </div>

      <div className={isEven ? "order-2" : "order-2 md:order-1"}>
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium text-muted">
              Project {String(index + 1).padStart(2, "0")}
            </span>
            {project.status === "In Development" ? <StatusBadge status={project.status} /> : null}
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-text md:text-4xl">
                {project.name}
              </h3>
            </div>
            <p className="max-w-2xl text-base leading-7 text-muted md:text-lg">{project.summary}</p>
          </div>

          <div className="space-y-5 border-t border-border pt-5">
            {project.githubUrl && (
              <div className="flex flex-wrap gap-3">
                <ButtonLink
                  href={project.githubUrl}
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                >
                  <GitHubIcon />
                  GitHub
                </ButtonLink>
              </div>
            )}

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted/70">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-text/88"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted/70">Engineering Focus</p>
              <ul className="mt-3 grid gap-2.5 md:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2.5 text-sm leading-7 text-muted">
                    <span className="mt-2.5 h-1 w-1 rounded-full bg-accent/60 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.liveUrl && (
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={project.liveUrl} variant="secondary" size="sm">
                  Demo
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
