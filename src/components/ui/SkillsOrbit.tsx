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

export function SkillsOrbit() {
  const [activeCategory, setActiveCategory] = useState<string>("Backend");

  const activeGroup = skillCategories.find((g) => g.title === activeCategory);
  const tags = activeGroup?.tags ?? [];
  const accentColor = CATEGORY_COLORS[activeCategory] ?? "#C6FF00";

  return (
    <div className="flex flex-col items-center gap-12 w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 relative z-30">
        {CATEGORY_ORDER.map((cat) => {
          const color = CATEGORY_COLORS[cat] ?? "#C6FF00";
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className="relative rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300"
              style={{
                color: isActive ? "#050505" : "#A1A1AA",
                background: isActive ? color : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? color : "rgba(255,255,255,0.08)"}`,
                boxShadow: isActive ? `0 0 20px ${color}40` : "none",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Orbital System */}
      <div 
        className="relative flex items-center justify-center w-full max-w-[800px] h-[450px] sm:h-[600px] overflow-hidden"
        style={{ WebkitMaskImage: 'radial-gradient(circle, white 40%, transparent 80%)', maskImage: 'radial-gradient(circle, white 40%, transparent 80%)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Core Star */}
            <div
              className="absolute z-20 flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full shadow-2xl"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${accentColor}, #000)`,
                boxShadow: `0 0 60px ${accentColor}80, inset 0 0 20px rgba(255,255,255,0.5)`,
              }}
            >
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-white/90 drop-shadow-md z-30 uppercase text-center px-2">
                {activeCategory}
              </span>
            </div>

            {/* Orbital Rings & Planets */}
            {(() => {
               // Distribute tags across 1 to 3 rings based on length
               const ringsCount = tags.length > 5 ? 3 : tags.length > 2 ? 2 : 1;
               
               const rings = [
                 { radius: 110, speed: 25, tags: [] as string[] },
                 { radius: 170, speed: 35, tags: [] as string[] },
                 { radius: 230, speed: 45, tags: [] as string[] },
               ].slice(0, ringsCount);

               // simple distribution
               tags.forEach((tag, i) => {
                 const ringIndex = i % rings.length;
                 rings[ringIndex].tags.push(tag);
               });

               return rings.map((ring, ringIdx) => {
                 if (ring.tags.length === 0) return null;
                 
                 // Alternate direction for each ring
                 const direction = ringIdx % 2 === 0 ? 1 : -1;
                 const baseRadius = ring.radius; // Mobile base
                 
                 return (
                   <div key={ringIdx} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     {/* The Ring Track */}
                     <div
                       className="absolute rounded-full border border-white/[0.06] hidden sm:block"
                       style={{
                         width: baseRadius * 2.5,
                         height: baseRadius * 2.5,
                         boxShadow: `0 0 10px ${accentColor}10`,
                       }}
                     />
                     
                     <div
                       className="absolute rounded-full border border-white/[0.06] sm:hidden"
                       style={{
                         width: baseRadius * 1.5,
                         height: baseRadius * 1.5,
                         boxShadow: `0 0 10px ${accentColor}10`,
                       }}
                     />
                     
                     {/* The Orbiting Container */}
                     <motion.div
                       animate={{ rotate: direction * 360 }}
                       transition={{ repeat: Infinity, duration: ring.speed, ease: "linear" }}
                       className="absolute flex items-center justify-center hidden sm:flex"
                       style={{ width: baseRadius * 2.5, height: baseRadius * 2.5 }}
                     >
                       {ring.tags.map((tag, tagIdx) => {
                         const angle = (tagIdx / ring.tags.length) * 360;
                         const r = baseRadius * 1.25;
                         const x = r * Math.cos((angle * Math.PI) / 180);
                         const y = r * Math.sin((angle * Math.PI) / 180);

                         return (
                           <motion.div
                             key={tag}
                             animate={{ rotate: -direction * 360 }}
                             transition={{ repeat: Infinity, duration: ring.speed, ease: "linear" }}
                             className="absolute flex items-center justify-center pointer-events-auto"
                             style={{ x, y, width: 0, height: 0 }}
                           >
                             <div 
                               className="group flex items-center justify-center whitespace-nowrap rounded-full border border-white/[0.15] bg-[#050505] px-4 py-2 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/[0.4] hover:z-50 cursor-crosshair"
                               style={{
                                 boxShadow: `0 0 15px ${accentColor}20`,
                                 transform: 'translate(-50%, -50%)'
                               }}
                             >
                               <span className="font-mono text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                                 {tag}
                               </span>
                             </div>
                           </motion.div>
                         );
                       })}
                     </motion.div>

                     {/* Mobile Orbiting Container (smaller radius) */}
                     <motion.div
                       animate={{ rotate: direction * 360 }}
                       transition={{ repeat: Infinity, duration: ring.speed, ease: "linear" }}
                       className="absolute flex items-center justify-center sm:hidden"
                       style={{ width: baseRadius * 1.5, height: baseRadius * 1.5 }}
                     >
                       {ring.tags.map((tag, tagIdx) => {
                         const angle = (tagIdx / ring.tags.length) * 360;
                         const r = baseRadius * 0.75;
                         const x = r * Math.cos((angle * Math.PI) / 180);
                         const y = r * Math.sin((angle * Math.PI) / 180);

                         return (
                           <motion.div
                             key={tag}
                             animate={{ rotate: -direction * 360 }}
                             transition={{ repeat: Infinity, duration: ring.speed, ease: "linear" }}
                             className="absolute flex items-center justify-center pointer-events-auto"
                             style={{ x, y, width: 0, height: 0 }}
                           >
                             <div 
                               className="flex items-center justify-center whitespace-nowrap rounded-full border border-white/[0.15] bg-[#050505] px-3 py-1.5 backdrop-blur-md transition-all duration-300"
                               style={{
                                 boxShadow: `0 0 10px ${accentColor}20`,
                                 transform: 'translate(-50%, -50%)'
                               }}
                             >
                               <span className="font-mono text-[10px] font-semibold text-white/90">
                                 {tag}
                               </span>
                             </div>
                           </motion.div>
                         );
                       })}
                     </motion.div>
                   </div>
                 );
               });
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
