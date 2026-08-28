"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/profile";

const CATEGORY_COLORS: Record<string, string> = {
  Languages: "#C6FF00",
  Backend: "#8B5CF6",
  Frontend: "#06B6D4",
  Databases: "#F59E0B",
  Tools: "#EC4899",
};

// Custom col-span mappings for the bento box layout to fit beautifully
const BENTO_SPANS: Record<string, string> = {
  Languages: "md:col-span-2 lg:col-span-3",
  Backend: "md:col-span-1 lg:col-span-3",
  Frontend: "md:col-span-1 lg:col-span-2",
  Databases: "md:col-span-1 lg:col-span-2",
  Tools: "md:col-span-1 lg:col-span-2",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function SkillsBento() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6"
    >
      {skillCategories.map((category) => {
        const accentColor = CATEGORY_COLORS[category.title] ?? "#C6FF00";
        const spanClass = BENTO_SPANS[category.title] || "col-span-1";

        return (
          <motion.div
            key={category.title}
            variants={itemVariants}
            className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.04] ${spanClass}`}
          >
            {/* Soft Glow Effect on Hover */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(600px circle at 50% 100%, ${accentColor}15, transparent 40%)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="h-2.5 w-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: accentColor, color: accentColor }}
                />
                <h3 className="font-mono text-sm font-bold tracking-widest text-white uppercase">
                  {category.title}
                </h3>
              </div>

              <div className="mt-auto flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-[#A1A1AA] transition-all duration-300 group-hover:border-white/[0.2] group-hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
