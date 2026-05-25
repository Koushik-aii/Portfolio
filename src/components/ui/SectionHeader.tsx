import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl space-y-5", className)}>
      <div className="flex items-center gap-4">
        <p className="font-mono text-2xl font-semibold tracking-[0.08em] text-cyan-300 md:text-3xl">{eyebrow}</p>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-cyan-300 md:text-3xl">{title}</h2>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      {description ? <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">{description}</p> : null}
    </div>
  );
}
