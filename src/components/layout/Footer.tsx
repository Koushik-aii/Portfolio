import { Container } from "@/components/layout/Container";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <Container className="flex flex-col gap-3 text-sm text-[#3F3F46] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold text-[#A1A1AA]">{profile.name}</span>
          <span className="text-white/20">·</span>
          <span>{profile.role}</span>
        </div>
        <p className="font-mono text-xs">
          Built with{" "}
          <span className="text-[#C6FF00]">Next.js</span>
          {" · "}
          <span>2026</span>
        </p>
      </Container>
    </footer>
  );
}
