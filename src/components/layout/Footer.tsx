import { Container } from "@/components/layout/Container";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>{profile.name}</p>
        <p>{profile.role}</p>
      </Container>
    </footer>
  );
}
