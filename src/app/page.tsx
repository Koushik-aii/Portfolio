import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SocialSidebar } from "@/components/layout/SocialSidebar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-text">
      <Navbar />
      <SocialSidebar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <LeadershipSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
