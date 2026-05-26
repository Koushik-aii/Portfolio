import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, className }: SectionHeaderProps) {
  const isArrowEyebrow = eyebrow.startsWith("> ");
  const arrowPart = isArrowEyebrow ? ">" : "";

  return (
    <div className={cn("max-w-3xl space-y-4", className)}>
      <div className="flex items-center gap-3">
        {arrowPart ? (
          <span className="font-mono text-xl font-bold md:text-2xl shrink-0 text-[#c4b5fd]">
            {arrowPart}
          </span>
        ) : null}
        <h2 className="font-heading text-2xl font-bold tracking-tight text-[#f8fafc] md:text-3xl shrink-0">{title}</h2>
        <span className="h-[2px] flex-1 bg-gradient-to-r from-[rgba(255,255,255,0.10)] to-transparent" />
      </div>
      {description ? <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">{description}</p> : null}
    </div>
  );
}
