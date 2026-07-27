import AboutHero from "@/components/about/AboutHero";
import AboutTimeline from "@/components/about/AboutTimeline";
import MissionVision from "@/components/about/MissionVision";
import WhyEdvora from "@/components/about/WhyEdvora";
import StatsSection from "@/components/StatsSection";
import MentorShowcase from "@/components/about/MentorShowcase";
// import LearningEcosystem from "@/components/about/LearningEcosystem";
import AboutCTA from "@/components/about/AboutCTA";
import Reveal from "@/components/Reveal";

export default function AboutPage() {
  return (
      <>
      <main className="min-h-screen px-1">
      
        <AboutHero />
        
        
        <AboutTimeline />
        <Reveal>
        <MissionVision />
        </Reveal>
        <Reveal>
        <WhyEdvora />
        </Reveal>
        <Reveal>
        <StatsSection />
        </Reveal>
        <Reveal>
        <MentorShowcase />
        </Reveal>
        {/* <LearningEcosystem /> */}
        <Reveal>
        <AboutCTA />
        </Reveal>
        </main>
      </>
  );
}