"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArchitectureFlow } from "@/components/ui/ArchitectureFlow";
import { ProjectModal } from "@/components/ui/ProjectModal";
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

const slugToFlowSteps: Record<string, string[]> = {
  codelens: [
    "GitHub Repository",
    "Analysis Engine",
    "AI Processing",
    "Insights Dashboard",
  ],
  storix: [
    "Chunk Upload",
    "Deduplication",
    "Metadata Index",
    "Storage Layer",
  ],
  globesync: [
    "User Authentication",
    "Trip Booking Engine",
    "Payment Workflow",
    "Role-Based Access",
  ],
};

function TiltCard({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200, damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200, damping: 24,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  const tiltStyle = disabled
    ? {}
    : { rotateX, rotateY, transformStyle: "preserve-3d" as const };

  return (
    <motion.div
      ref={ref}
      style={{
        ...tiltStyle,
        boxShadow: hovered
          ? "0 0 0 1px rgba(198,255,0,0.18), 0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(198,255,0,0.06)"
          : "0 4px 20px rgba(0,0,0,0.4)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.015 }}
      transition={{ duration: 0.2 }}
      className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] transition-all duration-300"
    >
      {/* Animated border sweep on hover */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "conic-gradient(from var(--angle, 0deg), transparent 20%, rgba(198,255,0,0.25) 40%, transparent 60%)",
            padding: "1px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            animation: "borderSpin 2.5s linear infinite",
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const flowSteps = slugToFlowSteps[project.slug] ?? [];

  const accentColor = index === 0 ? "#8B5CF6" : "#C6FF00";

  return (
    <>
      <motion.article
        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid gap-8 md:grid-cols-2 md:items-start md:gap-12"
      >
        {/* ─── Preview side ─────────────────────────────── */}
        <div className={index % 2 !== 0 ? "md:order-2" : ""}>
          <TiltCard
            disabled={shouldReduceMotion}
            onClick={() => setModalOpen(true)}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                <span className="font-mono text-[11px] text-[#A1A1AA]">
                  {project.slug}.{project.previewImage ? "preview" : "architecture"}
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/[0.06]" />
                <span className="h-2 w-2 rounded-full bg-white/[0.06]" />
                <span className="h-2 w-2 rounded-full bg-white/[0.06]" />
              </div>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">
              {project.previewImage ? (
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-black">
                  <Image
                    alt={`${project.name} preview`}
                    className="object-cover object-left-top"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src={project.previewImage}
                  />
                </div>
              ) : (
                <ArchitectureFlow
                  steps={flowSteps.map((label) => ({ label }))}
                  accentColor={accentColor}
                />
              )}
            </div>

            {/* Click hint */}
            <div className="border-t border-white/[0.04] px-5 py-2.5 text-right">
              <span className="font-mono text-[10px] text-[#3F3F46]">
                Click to expand →
              </span>
            </div>
          </TiltCard>
        </div>

        {/* ─── Info side ────────────────────────────────── */}
        <div className={index % 2 !== 0 ? "md:order-1" : ""}>
          <div className="space-y-5">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-[#3F3F46]">
                Project {String(index + 1).padStart(2, "0")}
              </span>
              {project.status && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C6FF00]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#C6FF00]">
                  <span className="h-1 w-1 rounded-full bg-[#C6FF00] animate-pulse" />
                  {project.status}
                </span>
              )}
            </div>

            {/* Name */}
            <h3
              className="font-heading font-bold tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              {project.name}
            </h3>

            <p className="text-base leading-7 text-[#A1A1AA] md:text-lg">{project.summary}</p>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Stack */}
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A1A1AA] mb-3">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-[#A1A1AA] transition-all duration-200 hover:border-[rgba(198,255,0,0.25)] hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A1A1AA] mb-3">
                Engineering Focus
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 font-mono text-xs font-medium text-[#A1A1AA] transition-all duration-200 hover:border-white/20 hover:text-white"
                >
                  <GitHubIcon />
                  GitHub
                </a>
              )}
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-semibold transition-all duration-200"
                style={{
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                  background: `${accentColor}08`,
                }}
              >
                View Details →
              </button>
            </div>
          </div>
        </div>
      </motion.article>

      <ProjectModal project={modalOpen ? project : null} onClose={() => setModalOpen(false)} />
    </>
  );
}
