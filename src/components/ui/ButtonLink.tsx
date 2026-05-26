"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const variantClasses: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary:
    "border border-[rgba(179,157,219,0.45)] bg-[rgba(179,157,219,0.12)] text-[#f5f5f5] hover:bg-[#b39ddb] hover:text-[#050505] hover:border-[#b39ddb] font-semibold transition-all duration-300",
  secondary:
    "border border-[rgba(255,255,255,0.08)] bg-[#111018] text-[#a1a1aa] hover:border-[rgba(179,157,219,0.25)] hover:text-[#f5f5f5] hover:bg-[rgba(255,255,255,0.02)] transition-all duration-300",
  ghost: "border border-transparent bg-transparent text-[#a1a1aa] hover:text-[#f5f5f5] transition-all duration-300",
};

const sizeClasses: Record<NonNullable<ButtonLinkProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base tracking-wide",
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
}: ButtonLinkProps) {
  const isExternal = href.startsWith("http");

  return (
    <motion.a
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      href={href}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
}
