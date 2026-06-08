"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { scrollToSection } from "@/lib/scroll";
import { MagneticButton } from "@/components/ui/MagneticButton";

const focusAreas = ["Backend Engineering", "REST APIs", "Full-Stack Dev"];
const roles = ["Full-Stack Engineer", "Backend Systems", "AI Applications"];
const [educationTitle, educationInstitution] = profile.education.split(", ");

// ─── 3D Tilt Glass Card ───────────────────────────────────────
function HeroGlassPanel() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 180, damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 180, damping: 22,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative">
      {/* Floating glow beneath */}
      <div
        className="absolute -inset-4 -z-10 rounded-3xl opacity-40 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 40% 60%, rgba(198,255,0,0.18), rgba(139,92,246,0.14), transparent 70%)",
        }}
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="animated-border relative rounded-2xl"
      >
        <div className="rounded-2xl border border-white/[0.10] bg-gradient-to-br from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.02)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-xl md:p-7">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#C6FF00] animate-pulse" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C6FF00]">
                Profile.init()
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C6FF00]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wide text-[#C6FF00]">
              Open to Work
            </span>
          </div>

          {/* Info rows */}
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A1A1AA]">
                  Location
                </p>
                <p className="mt-1.5 font-medium text-white">Vijayawada, AP</p>
                <p className="text-xs text-[#71717A] mt-0.5">India</p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A1A1AA]">
                  Education
                </p>
                <p className="mt-1.5 font-medium text-white">{educationTitle}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{educationInstitution}</p>
              </div>
            </div>

            {/* Current Focus */}
            <div className="border-t border-white/[0.07] pt-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A1A1AA] mb-3">
                Current Focus
              </p>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-md border border-[#C6FF00]/20 bg-[#C6FF00]/05 px-3 py-1.5 font-mono text-[11px] font-medium text-[#C6FF00]/80 transition-all duration-200 hover:border-[#C6FF00]/40 hover:text-[#C6FF00]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="border-t border-white/[0.07] pt-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A1A1AA] mb-3">
                Quick Links
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "GitHub", href: profile.githubUrl },
                  { label: "LinkedIn", href: profile.linkedinUrl },
                  { label: "Email", href: `mailto:${profile.email}` },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] font-medium text-[#A1A1AA] transition-all duration-200 hover:border-white/20 hover:text-white"
                  >
                    {link.label}
                    <span className="opacity-50">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Animated role text ───────────────────────────────────────
function RoleText() {
  return (
    <div className="flex flex-col gap-1">
      {roles.map((role, i) => (
        <motion.p
          key={role}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease: "easeOut" }}
          className="font-mono text-sm font-medium tracking-[0.06em] text-[#A1A1AA]"
        >
          <span className="text-[#C6FF00] mr-2">▸</span>
          {role}
        </motion.p>
      ))}
    </div>
  );
}

// ─── Main Hero ─────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden"
      style={{ paddingTop: "clamp(100px, 15vh, 160px)" }}
    >
      {/* Background gradient orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Lime orb */}
        <div
          className="absolute left-[5%] top-[15%] h-[500px] w-[500px] rounded-full opacity-[0.07] blur-[100px]"
          style={{
            background: "radial-gradient(circle, #C6FF00, transparent 70%)",
            animation: "float 12s ease-in-out infinite",
          }}
        />
        {/* Purple orb */}
        <div
          className="absolute right-[5%] bottom-[15%] h-[450px] w-[450px] rounded-full opacity-[0.06] blur-[90px]"
          style={{
            background: "radial-gradient(circle, #8B5CF6, transparent 70%)",
            animation: "float 15s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1160px] px-4 pb-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16">
          {/* ─── LEFT: Typography ────────────────────────── */}
          <div className="space-y-8">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-[#C6FF00]/20 bg-[#C6FF00]/05 px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#C6FF00] animate-pulse" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C6FF00]">
                {profile.heroTag}
              </span>
            </motion.div>

            {/* Name */}
            <div className="space-y-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-bold leading-[0.92] tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(3.2rem, 8vw, 6.5rem)" }}
              >
                SAI KOUSHIK
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-bold leading-[0.92] tracking-[-0.04em]"
                style={{
                  fontSize: "clamp(3.2rem, 8vw, 6.5rem)",
                  color: "transparent",
                  backgroundImage: "linear-gradient(135deg, #C6FF00 30%, #8B5CF6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                CHOWDARY
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-bold leading-[0.92] tracking-[-0.04em] text-white/60"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                THATI
              </motion.h1>
            </div>

            {/* Roles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <RoleText />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
              className="max-w-[44ch] text-base leading-7 text-[#A1A1AA] md:text-lg md:leading-8"
            >
              Building scalable backend systems, AI-powered applications, and developer-focused tools.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3"
            >
              {/* View Projects — primary CTA */}
              <MagneticButton>
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#C6FF00] px-6 py-3 font-mono text-sm font-bold tracking-[0.05em] text-[#050505] transition-all duration-300 hover:bg-white hover:shadow-[0_0_24px_rgba(198,255,0,0.5)]"
                >
                  View Projects
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </MagneticButton>

              {/* Resume — secondary */}
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-3 font-mono text-sm font-bold tracking-[0.05em] text-white transition-all duration-300 hover:border-[#C6FF00]/40 hover:bg-[#C6FF00]/08 hover:text-[#C6FF00]"
              >
                Resume
                <span className="text-xs opacity-60">↗</span>
              </a>
            </motion.div>
          </div>

          {/* ─── RIGHT: Glass panel ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroGlassPanel />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#3F3F46]">SCROLL</span>
        <div className="h-8 w-px bg-gradient-to-b from-[#3F3F46] to-transparent" />
      </motion.div>
    </section>
  );
}
