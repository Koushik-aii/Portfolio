"use client";

import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/scroll";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ScrollButtonProps = {
  children: ReactNode;
  sectionId: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const variantClasses: Record<NonNullable<ScrollButtonProps["variant"]>, string> = {
  primary:
    "border border-accent bg-accent text-white hover:bg-accent/90 font-semibold shadow-sm",
  secondary:
    "border border-border bg-surface text-muted hover:border-accent hover:text-accent hover:bg-accent/[0.04]",
  ghost: "border border-transparent bg-transparent text-muted hover:text-text",
};

const sizeClasses: Record<NonNullable<ScrollButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base tracking-wide",
};

export function ScrollButton({
  children,
  sectionId,
  variant = "primary",
  size = "md",
  className,
}: ScrollButtonProps) {
  return (
    <motion.button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      onClick={() => scrollToSection(sectionId)}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
