"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { leadershipTimeline } from "@/data/profile";

export function LeadershipSection() {
  return (
    <section id="leadership" className="scroll-mt-28 py-24 md:py-32">
      <Container>
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6FF00] mb-4"
        >
          &gt; 04. Leadership
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl mb-16"
        >
          Leadership
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-6 top-0 bottom-0 w-px origin-top md:left-8"
            style={{
              background: "linear-gradient(to bottom, #C6FF00, rgba(139,92,246,0.4), transparent)",
            }}
          />

          <div className="space-y-8 pl-16 md:pl-24">
            {leadershipTimeline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[42px] top-6 md:-left-[58px]">
                  <div className="relative flex h-4 w-4 items-center justify-center">
                    <span className="absolute h-4 w-4 rounded-full bg-[#C6FF00]/20 animate-pulse" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#C6FF00]" />
                  </div>
                </div>

                {/* Glass Card */}
                <div className="group rounded-2xl border border-white/[0.08] bg-[rgba(13,13,13,0.8)] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(198,255,0,0.18)] hover:shadow-[0_0_30px_rgba(198,255,0,0.05)] md:p-8">
                  {/* Top meta */}
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C6FF00]">
                      {item.subtitle}
                    </span>
                    <span className="h-px w-6 bg-white/10" />
                    <span className="text-xs text-[#A1A1AA]">2024–2025</span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] text-white mb-3 md:text-3xl">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-7 text-[#A1A1AA] mb-5 max-w-2xl">{item.description}</p>

                  {/* Responsibilities */}
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A1A1AA] mb-3">
                      Responsibilities
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {item.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B5CF6]" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
