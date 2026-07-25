


import ProgramOverview from "@/components/programs/ProgramOverview";
import Programs from "@/components/programs/Programs";
import GradePrograms from "@/components/programs/GradePrograms";
import WhyChooseEdvora from "@/components/programs/WhyChoosePrograms";
import ProgramFAQS from "@/components/programs/ProgramFAQS";
import FeatureSection from "@/components/FeatureSection";
import ProgramSteps from "@/components/programs/programSteps";
import ProgramCTA from "@/components/programs/ProgramCTA";
import Reveal from "@/components/Reveal";


export default function ProgramsPage() {
  return (
    <main className="min-h-screen px-1">
      <div className="max-w-[1650px] mx-auto px-1">
        <Reveal>
        <ProgramOverview />
        </Reveal>
        <Reveal>
        <Programs />
        </Reveal>
        <Reveal>
        <ProgramSteps />
        </Reveal>
        <Reveal>
        <GradePrograms />
        </Reveal>
        <Reveal>
        <ProgramCTA />
        </Reveal>
        <Reveal>
        <ProgramFAQS />
        </Reveal>
        
      </div>
    </main>
  );
}