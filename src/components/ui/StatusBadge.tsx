import type { ProjectStatus } from "@/types/project";

type StatusBadgeProps = {
  status: ProjectStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent-warm/20 bg-accent-warm/[0.06] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-warm">
      {status}
    </span>
  );
}
