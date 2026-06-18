"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/data/profile";

const CATEGORY_ORDER = ["Languages", "Backend", "Frontend", "Databases", "Tools"];

const CATEGORY_COLORS: Record<string, string> = {
  Languages: "#C6FF00",
  Backend: "#8B5CF6",
  Frontend: "#06B6D4",
  Databases: "#F59E0B",
  Tools: "#EC4899",
};

// Hex grid offset layout: alternating rows are shifted right
function getHexPositions(count: number) {
  const positions: { col: number; row: number }[] = [];
  const perRow = [4, 4, 4, 4]; // pattern of columns per row
  let idx = 0;
  for (let row = 0; row < perRow.length && idx < count; row++) {
    const cols = perRow[row];
    for (let col = 0; col < cols && idx < count; col++) {
      positions.push({ col, row });
      idx++;
    }
  }
  return positions;
}

const HEX_W = 88;
const HEX_H = 76;
const HEX_GAP_X = 6;
const HEX_GAP_Y = 6;

function hexPoints(w: number, h: number) {
  const hw = w / 2;
  const hh = h / 2;
  return [
    [hw * 0.5, 0],
    [hw * 1.5, 0],
    [hw * 2, hh],
    [hw * 1.5, h],
    [hw * 0.5, h],
    [0, hh],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");
}

export function SkillsConstellation() {
  const [activeCategory, setActiveCategory] = useState<string>("Backend");

  const activeGroup = skillCategories.find((g) => g.title === activeCategory);
  const tags = activeGroup?.tags ?? [];
  const accentColor = CATEGORY_COLORS[activeCategory] ?? "#C6FF00";
  const positions = getHexPositions(tags.length);

  // Compute SVG canvas size
  const perRow = [4, 3, 4, 3];
  const maxCols = Math.max(...perRow);
  const numRows = Math.ceil(tags.length / 3.5); // rough
  const canvasW = maxCols * (HEX_W + HEX_GAP_X) + HEX_W / 2 + 12;
  const canvasH = perRow.length * (HEX_H * 0.77 + HEX_GAP_Y) + HEX_H * 0.23 + 12;

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

      {/* Hex Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative"
        >
          {/* Subtle ambient glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-40 rounded-full blur-[90px] opacity-15"
            style={{ background: accentColor }}
          />

          {/* Hex tile grid */}
          <div
            className="relative flex flex-col gap-[6px]"
            style={{ paddingBottom: 8 }}
          >
            {(() => {
              const rows: string[][] = [];
              const perRow = [4, 4, 4, 4];
              let i = 0;
              for (const count of perRow) {
                const row: string[] = [];
                for (let c = 0; c < count && i < tags.length; c++, i++) {
                  row.push(tags[i]);
                }
                if (row.length > 0) rows.push(row);
              }
              return rows.map((rowTags, rowIdx) => {
                const isOffset = rowIdx % 2 === 1;
                const globalStart = perRow.slice(0, rowIdx).reduce((a, b) => a + b, 0);
                return (
                  <div
                    key={rowIdx}
                    className="flex gap-[6px]"
                    style={{ marginLeft: isOffset ? `${(HEX_W + HEX_GAP_X) / 2}px` : 0 }}
                  >
                    {rowTags.map((tag, colIdx) => {
                      const delay = (globalStart + colIdx) * 0.07;
                      return (
                        <HexTile
                          key={tag}
                          label={tag}
                          accentColor={accentColor}
                          delay={delay}
                        />
                      );
                    })}
                  </div>
                );
              });
            })()}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function HexTile({
  label,
  accentColor,
  delay,
}: {
  label: string;
  accentColor: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const w = HEX_W;
  const h = HEX_H;
  const pts = hexPoints(w, h);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 16 }}
      className="relative flex-shrink-0 cursor-default select-none"
      style={{ width: w, height: h }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        {/* Glow on hover */}
        {hovered && (
          <polygon
            points={pts}
            fill={accentColor}
            fillOpacity={0.08}
            filter="url(#hexGlow)"
          />
        )}
        {/* Hex body */}
        <polygon
          points={pts}
          fill={hovered ? `${accentColor}14` : "rgba(255,255,255,0.025)"}
          stroke={hovered ? accentColor : `${accentColor}30`}
          strokeWidth={hovered ? 1.5 : 1}
          style={{ transition: "all 0.25s ease" }}
        />
        {/* Inner accent line (top edge highlight) */}
        <polygon
          points={pts}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={0.5}
        />
        <defs>
          <filter id="hexGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Label */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-1 text-center"
        style={{
          color: hovered ? "#ffffff" : "rgba(161,161,170,0.85)",
          transition: "color 0.25s ease",
        }}
      >
        {/* Slim accent bar — replaces the dot */}
        <div
          className="mb-[5px] rounded-full transition-all duration-300"
          style={{
            width: hovered ? 18 : 12,
            height: 1.5,
            background: hovered ? accentColor : `${accentColor}40`,
            boxShadow: hovered ? `0 0 6px ${accentColor}80` : "none",
          }}
        />
        <span
          className="font-mono leading-tight"
          style={{ fontSize: label.length > 9 ? "9px" : "10px", fontWeight: 500 }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}
