"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { Project } from "@/types/project";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

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

const slugToArchitecture: Record<string, string[]> = {
  codelens: [
    "GitHub Repository URL Input",
    "Repository Metadata Fetch",
    "File Tree & Language Analysis",
    "AI Processing via OpenAI",
    "Architecture Summary Output",
    "Insights Dashboard",
  ],
  storix: [
    "Chunked File Upload",
    "Hash-Based Deduplication",
    "Metadata Indexing (PostgreSQL)",
    "Redis Cache Layer",
    "Access-Controlled Storage",
    "Version History Management",
  ],
  globesync: [
    "Multi-Role Authentication",
    "Trip Booking & Itinerary Engine",
    "Package Management System",
    "Payment Workflow Handling",
    "Support Ticket System",
    "Role-Based Access Control",
  ],
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    if (project) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-4 top-16 z-[101] mx-auto max-w-3xl overflow-y-auto rounded-2xl border border-white/[0.10] bg-[#0A0A0A] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.8)] md:p-8"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] text-[#A1A1AA] transition hover:border-[#C6FF00]/40 hover:text-[#C6FF00]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-6 space-y-2 pr-10">
              {project.status && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C6FF00]/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#C6FF00]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C6FF00] animate-pulse" />
                  {project.status}
                </span>
              )}
              <h2 className="font-heading text-3xl font-bold text-white">{project.name}</h2>
              <p className="text-[#A1A1AA] leading-7">{project.summary}</p>
            </div>

            {/* Architecture */}
            <div className="mb-6">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C6FF00]">
                Architecture
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {(slugToArchitecture[project.slug] ?? []).map((step, i) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C6FF00]/10 text-[10px] font-bold text-[#C6FF00]">
                      {i + 1}
                    </span>
                    <span className="text-xs text-white/70">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A1A1AA]">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[#A1A1AA] transition hover:border-[#C6FF00]/30 hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A1A1AA]">
                Engineering Highlights
              </p>
              <ul className="space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-[#A1A1AA]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C6FF00]" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-white/[0.06]">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition hover:border-[#C6FF00]/40 hover:bg-[#C6FF00]/05 hover:text-[#C6FF00]"
                >
                  <GitHubIcon />
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#C6FF00]/30 bg-[#C6FF00]/10 px-4 py-2 text-sm font-medium text-[#C6FF00] transition hover:bg-[#C6FF00]/20"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
