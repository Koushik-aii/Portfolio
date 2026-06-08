"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { profile } from "@/data/profile";

export function ContactSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section id="contact" className="scroll-mt-28 relative py-24 md:py-40 overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06] blur-[100px]"
          style={{ background: "radial-gradient(circle, #C6FF00, transparent 70%)" }}
        />
      </div>

      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6FF00] mb-6"
          >
            &gt; 05. Contact
          </motion.p>

          {/* Display headline */}
          <div className="space-y-0 mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-bold leading-[0.9] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
            >
              LET&apos;S BUILD
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-bold leading-[0.9] tracking-[-0.04em]"
              style={{
                fontSize: "clamp(2.8rem, 9vw, 7rem)",
                color: "transparent",
                backgroundImage: "linear-gradient(135deg, #C6FF00 0%, #8B5CF6 80%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SOMETHING
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.26, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-bold leading-[0.9] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
            >
              GREAT<span className="text-[#C6FF00]">.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-xl text-base leading-8 text-[#A1A1AA] md:text-lg mb-10"
          >
            I&apos;m currently open to new opportunities and collaborative work. If you have an idea, project,
            or opportunity where I can contribute — let&apos;s talk.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <a
                href={`mailto:${profile.email}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="group inline-flex items-center gap-3 rounded-full px-8 py-4 font-mono text-sm font-bold tracking-[0.06em] text-[#050505] transition-all duration-300"
                style={{
                  background: hovered
                    ? "linear-gradient(135deg, #d4ff26, #C6FF00)"
                    : "#C6FF00",
                  boxShadow: hovered
                    ? "0 0 40px rgba(198,255,0,0.55), 0 0 80px rgba(198,255,0,0.15)"
                    : "0 0 20px rgba(198,255,0,0.25)",
                  transform: hovered ? "scale(1.03)" : "scale(1)",
                }}
              >
                Say Hello
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </MagneticButton>

            <div className="flex items-center gap-6">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs font-medium text-[#A1A1AA] transition-all duration-200 hover:text-[#C6FF00]"
              >
                GitHub ↗
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs font-medium text-[#A1A1AA] transition-all duration-200 hover:text-[#C6FF00]"
              >
                LinkedIn ↗
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
