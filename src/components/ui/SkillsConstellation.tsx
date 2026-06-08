"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/data/profile";

// Map our data categories to the display names
const CATEGORY_ORDER = ["Languages", "Backend", "Frontend", "Databases", "Tools"];

// Node layout: each skill gets a fixed position around its category
const NODE_POSITIONS: Record<string, { x: number; y: number }[]> = {
  Languages: [
    { x: 0, y: -80 }, { x: 65, y: -50 }, { x: 75, y: 25 },
    { x: 20, y: 80 }, { x: -55, y: 65 }, { x: -80, y: -10 },
  ],
  Backend: [
    { x: 0, y: -75 }, { x: 70, y: -20 }, { x: 45, y: 65 }, { x: -55, y: 55 },
  ],
  Frontend: [
    { x: 0, y: -75 }, { x: 70, y: 10 }, { x: -10, y: 80 },
  ],
  Databases: [
    { x: 0, y: -70 }, { x: 65, y: 25 }, { x: -60, y: 25 },
  ],
  Tools: [
    { x: 0, y: -75 }, { x: 60, y: -30 }, { x: 50, y: 55 }, { x: -55, y: 50 },
  ],
};

const CATEGORY_COLORS: Record<string, string> = {
  Languages: "#C6FF00",
  Backend: "#8B5CF6",
  Frontend: "#06B6D4",
  Databases: "#F59E0B",
  Tools: "#EC4899",
};

export function SkillsConstellation() {
  const [activeCategory, setActiveCategory] = useState<string>("Backend");

  const activeGroup = skillCategories.find((g) => g.title === activeCategory);
  const positions = NODE_POSITIONS[activeCategory] ?? [];
  const accentColor = CATEGORY_COLORS[activeCategory] ?? "#C6FF00";

  const CX = 160;
  const CY = 160;
  const viewSize = 320;

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORY_ORDER.map((cat) => {
          const color = CATEGORY_COLORS[cat] ?? "#C6FF00";
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className="relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-200"
              style={{
                color: isActive ? "#050505" : "#A1A1AA",
                background: isActive ? color : "rgba(255,255,255,0.04)",
                border: `1px solid ${isActive ? color : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Constellation + Skill List */}
      <div className="grid gap-8 md:grid-cols-[320px_1fr] md:items-center">
        {/* SVG Constellation */}
        <div className="relative mx-auto">
          <AnimatePresence mode="wait">
            <motion.svg
              key={activeCategory}
              width={viewSize}
              height={viewSize}
              viewBox={`0 0 ${viewSize} ${viewSize}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Connection lines */}
              {positions.map((pos, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={CX}
                  y1={CY}
                  x2={CX + pos.x}
                  y2={CY + pos.y}
                  stroke={accentColor}
                  strokeOpacity={0.18}
                  strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                />
              ))}

              {/* Hub node (center) */}
              <motion.circle
                cx={CX}
                cy={CY}
                r={22}
                fill={`${accentColor}18`}
                stroke={accentColor}
                strokeWidth={1.5}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
              />
              <motion.circle
                cx={CX}
                cy={CY}
                r={28}
                fill="none"
                stroke={accentColor}
                strokeOpacity={0.12}
                strokeWidth={1}
                animate={{ r: [28, 34, 28] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <text
                x={CX}
                y={CY + 4}
                textAnchor="middle"
                fontSize={9}
                fontFamily="var(--font-ibm-plex-mono)"
                fontWeight="600"
                fill={accentColor}
              >
                {activeCategory.toUpperCase().slice(0, 3)}
              </text>

              {/* Skill nodes */}
              {(activeGroup?.tags ?? []).map((tag, i) => {
                const pos = positions[i] ?? { x: 0, y: 0 };
                const nx = CX + pos.x;
                const ny = CY + pos.y;
                return (
                  <motion.g
                    key={tag}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.07, type: "spring", stiffness: 180, damping: 14 }}
                  >
                    <circle
                      cx={nx}
                      cy={ny}
                      r={10}
                      fill={`${accentColor}10`}
                      stroke={accentColor}
                      strokeOpacity={0.35}
                      strokeWidth={1}
                    />
                    <text
                      x={nx}
                      y={ny + 3}
                      textAnchor="middle"
                      fontSize={6.5}
                      fontFamily="var(--font-ibm-plex-mono)"
                      fill="white"
                      fillOpacity={0.7}
                    >
                      {tag.length > 7 ? tag.slice(0, 6) + "…" : tag}
                    </text>
                  </motion.g>
                );
              })}
            </motion.svg>
          </AnimatePresence>

          {/* Glow behind SVG */}
          <div
            className="absolute inset-0 -z-10 rounded-full blur-[80px] opacity-20"
            style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }}
          />
        </div>

        {/* Skill tags grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + "-tags"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-3"
          >
            {(activeGroup?.tags ?? []).map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                className="group relative cursor-default rounded-full px-4 py-2.5 text-sm font-medium text-[#A1A1AA] transition-all duration-300 hover:text-white"
                style={{
                  border: `1px solid rgba(255,255,255,0.08)`,
                  background: "rgba(255,255,255,0.03)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.border = `1px solid ${accentColor}40`;
                  (e.currentTarget as HTMLSpanElement).style.background = `${accentColor}08`;
                  (e.currentTarget as HTMLSpanElement).style.boxShadow = `0 0 12px ${accentColor}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.border = `1px solid rgba(255,255,255,0.08)`;
                  (e.currentTarget as HTMLSpanElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLSpanElement).style.boxShadow = "none";
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
