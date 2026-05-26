import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";

const emphasizedTerms = [
  "B.Tech in Computer Science and Engineering",
  "Indian Institute of Information Technology, Sri City",
  "backend engineering",
  "Data Structures and Algorithms",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
];

function emphasizeText(text: string) {
  const pattern = new RegExp(`(${emphasizedTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");

  return text.split(pattern).map((part, index) => {
    if (emphasizedTerms.includes(part)) {
      return (
        <span key={`${part}-${index}`} className="font-semibold text-text">
          {part}
        </span>
      );
    }

    return part;
  });
}

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-32 pt-20 pb-12 md:pt-28 md:pb-16">
      <Container>
        <Reveal className="space-y-8">
          <SectionHeader eyebrow="> 01." title="About" />

          <div className="mt-10 max-w-5xl space-y-7">
            {profile.about.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-muted/95 md:text-xl md:leading-9">
                {emphasizeText(paragraph)}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
