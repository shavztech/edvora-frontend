import AboutHero from "@/components/about/AboutHero";
import AboutTimeline from "@/components/about/AboutTimeline";
import MissionVision from "@/components/about/MissionVision";
import WhyEdvora from "@/components/about/WhyEdvora";
import StatsSection from "@/components/StatsSection";
import MentorShowcase from "@/components/about/MentorShowcase";
// import LearningEcosystem from "@/components/about/LearningEcosystem";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
      <>
        <AboutHero />
        <AboutTimeline />
        <MissionVision />
        <WhyEdvora />
        <StatsSection />
        <MentorShowcase />
        {/* <LearningEcosystem /> */}
        <AboutCTA />
      </>
  );
}