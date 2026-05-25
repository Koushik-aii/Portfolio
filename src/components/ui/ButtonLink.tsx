"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
};

const variantClasses: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary:
    "border border-white/15 bg-white/[0.08] text-white shadow-[0_14px_40px_rgba(10,18,38,0.35)] hover:border-accent/40 hover:bg-white/[0.12]",
  secondary:
    "border border-white/10 bg-transparent text-white/84 hover:border-white/20 hover:bg-white/[0.04] hover:text-white",
  ghost: "border border-transparent bg-transparent text-muted hover:bg-white/[0.04] hover:text-white",
};

const sizeClasses: Record<NonNullable<ButtonLinkProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
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
        "inline-flex items-center justify-center rounded-full font-medium tracking-[-0.01em] transition duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      href={href}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
    >
      {children}
    </motion.a>
  );
}
