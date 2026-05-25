import type { ProjectStatus } from "@/types/project";

type StatusBadgeProps = {
  status: ProjectStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-amber-200">
      {status}
    </span>
  );
}
