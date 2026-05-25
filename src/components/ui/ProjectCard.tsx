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
      className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-950 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_24px_80px_rgba(110,231,249,0.12)]"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 12 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
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
    <div className={`font-mono text-[13px] leading-7 text-slate-300 md:text-sm ${className}`}>
      {children}
    </div>
  );
}

function StoriXPreview() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(110,231,249,0.14),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.96))] p-5 md:p-7">
      <div className="absolute inset-0 bg-hero-grid bg-[size:30px_30px] opacity-[0.05]" />
      <div className="relative space-y-5">
        <div className="border-b border-white/10 pb-4">
          <p className="font-mono text-[12px] text-accent">storix.upload.ts</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 md:p-5">
          <CodeLine>
            <span className="text-cyan-300">const</span> <span className="text-white">fileFlow</span>{" "}
            <span className="text-slate-400">=</span> <span className="text-slate-200">{"{"}</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-cyan-200">upload</span>
            <span className="text-slate-400">: </span>
            <span className="text-emerald-300">"chunked"</span>
            <span className="text-slate-400">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-cyan-200">transfer</span>
            <span className="text-slate-400">: </span>
            <span className="text-emerald-300">"resumable"</span>
            <span className="text-slate-400">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-cyan-200">deduplication</span>
            <span className="text-slate-400">: </span>
            <span className="text-emerald-300">"hash-based"</span>
            <span className="text-slate-400">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-cyan-200">metadata</span>
            <span className="text-slate-400">: </span>
            <span className="text-emerald-300">"PostgreSQL"</span>
            <span className="text-slate-400">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-cyan-200">cache</span>
            <span className="text-slate-400">: </span>
            <span className="text-emerald-300">"Redis"</span>
            <span className="text-slate-400">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-cyan-200">storage</span>
            <span className="text-slate-400">: </span>
            <span className="text-emerald-300">"file service"</span>
          </CodeLine>
          <CodeLine>
            <span className="text-slate-200">{"};"}</span>
          </CodeLine>
        </div>

        <div className="flex flex-wrap gap-2">
          {["Chunk Uploads", "Deduplication", "Metadata Search"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-300"
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
    <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(110,231,249,0.12),transparent_26%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.16),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.96))] p-5 md:p-7">
      <div className="absolute inset-0 bg-hero-grid bg-[size:30px_30px] opacity-[0.05]" />
      <div className="relative space-y-5">
        <div className="border-b border-white/10 pb-4">
          <p className="font-mono text-[12px] text-accent">codelens.analysis.ts</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 md:p-5">
          <CodeLine>
            <span className="text-cyan-300">const</span> <span className="text-white">analysisPipeline</span>{" "}
            <span className="text-slate-400">=</span> <span className="text-slate-200">{"{"}</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-cyan-200">input</span>
            <span className="text-slate-400">: </span>
            <span className="text-emerald-300">"GitHub repo URL"</span>
            <span className="text-slate-400">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-cyan-200">source</span>
            <span className="text-slate-400">: </span>
            <span className="text-emerald-300">"GitHub API"</span>
            <span className="text-slate-400">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-cyan-200">context</span>
            <span className="text-slate-400">: </span>
            <span className="text-emerald-300">"repository metadata"</span>
            <span className="text-slate-400">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-cyan-200">ai</span>
            <span className="text-slate-400">: </span>
            <span className="text-emerald-300">"OpenAI summary"</span>
            <span className="text-slate-400">,</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-cyan-200">output</span>
            <span className="text-slate-400">: [</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-300">"architecture insights"</span>
            <span className="text-slate-400">,</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-300">"project structure"</span>
            <span className="text-slate-400">,</span>
          </CodeLine>
          <CodeLine className="pl-8">
            <span className="text-emerald-300">"tech stack breakdown"</span>
          </CodeLine>
          <CodeLine className="pl-4">
            <span className="text-slate-400">]</span>
          </CodeLine>
          <CodeLine>
            <span className="text-slate-200">{"};"}</span>
          </CodeLine>
        </div>

        <div className="flex flex-wrap gap-2">
          {["GitHub API", "OpenAI API", "Repo Insights"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-300"
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
    <article className="grid gap-8 border-t border-white/10 pb-4 pt-8 md:grid-cols-2 md:items-start md:gap-10 md:pt-10">
      <div className={isEven ? "order-1 md:pt-1" : "order-1 md:order-2 md:pt-1"}>
        {project.previewImage ? (
          <PreviewFrame shouldReduceMotion={reduceMotion}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-[#f5f0e6]">
              <Image
                alt={`${project.name} preview`}
                className="object-contain object-left-top p-2 translate-y-1 scale-[1.01] transition duration-500 ease-out group-hover:translate-y-1 group-hover:scale-[1.03] group-hover:brightness-105 md:p-3 md:translate-y-2"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src={project.previewImage}
              />
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
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.status === "In Development" ? <StatusBadge status={project.status} /> : null}
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <h3 className="font-heading text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                {project.name}
              </h3>
            </div>
            <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">{project.summary}</p>
          </div>

          <div className="space-y-6 border-t border-white/10 pt-6">
            {project.githubUrl && (
              <div className="flex flex-wrap gap-3">
                <ButtonLink
                  href={project.githubUrl}
                  variant="secondary"
                  size="sm"
                  className="gap-2 border-accent/25 text-white/86 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                >
                  <GitHubIcon />
                  GitHub
                </ButtonLink>
              </div>
            )}

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Engineering Focus</p>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-7 text-white/82">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
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
