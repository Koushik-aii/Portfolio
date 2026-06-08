import dynamic from "next/dynamic";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SocialSidebar } from "@/components/layout/SocialSidebar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { MouseGlow } from "@/components/effects/MouseGlow";

// Three.js scene must be client-only (no SSR)
const ThreeBackground = dynamic(
  () => import("@/components/effects/ThreeBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      {/* Global ambient effects */}
      <ThreeBackground />
      <MouseGlow />

      {/* Layout */}
      <Navbar />
      <SocialSidebar />

      {/* All sections sit above the fixed 3D canvas */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <LeadershipSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
