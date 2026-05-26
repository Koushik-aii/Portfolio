import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, className }: SectionHeaderProps) {
  const isArrowEyebrow = eyebrow.startsWith("> ");
  const arrowPart = isArrowEyebrow ? "> " : "";
  const numberPart = isArrowEyebrow ? eyebrow.slice(2) : eyebrow;

  return (
    <div className={cn("max-w-3xl space-y-4", className)}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xl font-bold md:text-2xl shrink-0">
          <span className="text-accent-warm">{arrowPart}</span>
          <span className="text-accent">{numberPart}</span>
        </span>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-text md:text-3xl shrink-0">{title}</h2>
        <span className="h-[2px] flex-1 bg-gradient-to-r from-accent/25 to-transparent" />
      </div>
      {description ? <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">{description}</p> : null}
    </div>
  );
}
