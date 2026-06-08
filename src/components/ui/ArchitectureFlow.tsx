"use client";

import { motion } from "framer-motion";

interface FlowStep {
  label: string;
}

interface ArchitectureFlowProps {
  steps: FlowStep[];
  accentColor?: string;
}

export function ArchitectureFlow({
  steps,
  accentColor = "#C6FF00",
}: ArchitectureFlowProps) {
  return (
    <div className="flex flex-col items-start gap-0 py-2">
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-col items-start">
          {/* Step box */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group relative flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 transition-all duration-300 hover:border-[rgba(198,255,0,0.25)] hover:bg-[rgba(198,255,0,0.04)]"
          >
            {/* Numbered indicator */}
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
              style={{
                background: `rgba(198,255,0,0.12)`,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
              }}
            >
              {i + 1}
            </span>
            <span className="font-mono text-xs font-medium text-white/80 group-hover:text-white transition-colors">
              {step.label}
            </span>
          </motion.div>

          {/* Connector line with animated dot */}
          {i < steps.length - 1 && (
            <div className="relative ml-6 flex h-8 w-px items-center justify-center">
              {/* Static line */}
              <div className="absolute inset-0 mx-auto w-px bg-white/10" />
              {/* Animated flowing dot */}
              <motion.div
                className="absolute h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 0 6px ${accentColor}`,
                  top: 0,
                  left: "-2px",
                }}
                animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
              {/* Arrow tip */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                  borderTop: `5px solid ${accentColor}60`,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
