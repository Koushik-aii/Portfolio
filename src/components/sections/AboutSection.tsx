"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { profile } from "@/data/profile";

const emphasizedTerms = [
  "B.Tech in Computer Science and Engineering",
  "Indian Institute of Information Technology, Sri City",
  "backend engineering",
  "Data Structures and Algorithms",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "Backend Engineering",
  "System Design",
  "AI Applications",
  "scalable backend systems",
  "developer-focused tools",
];

function emphasizeText(text: string) {
  const pattern = new RegExp(
    `(${emphasizedTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g",
  );
  return text.split(pattern).map((part, i) => {
    if (emphasizedTerms.includes(part)) {
      return (
        <span key={i} className="text-[#C6FF00] font-semibold">
          {part}
        </span>
      );
    }
    return part;
  });
}

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1px_1fr] md:gap-16">
          {/* Vertical lime accent bar */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block w-px origin-top rounded-full"
            style={{
              background: "linear-gradient(to bottom, #C6FF00, rgba(139,92,246,0.4), transparent)",
            }}
          />

          <div>
            {/* Section label */}
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6FF00] mb-4"
            >
              &gt; 01. About
            </motion.p>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl mb-10"
            >
              About Me
            </motion.h2>

            {/* Paragraphs */}
            <div className="max-w-3xl space-y-6">
              {profile.about.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                  className="text-base leading-8 text-[#A1A1AA] md:text-lg md:leading-9"
                >
                  {emphasizeText(paragraph)}
                </motion.p>
              ))}
            </div>

            {/* Keyword pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {["Backend Engineering", "System Design", "Data Structures", "AI Applications"].map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-[#C6FF00]/20 bg-[#C6FF00]/05 px-4 py-1.5 font-mono text-xs font-semibold text-[#C6FF00]/80"
                >
                  {kw}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
