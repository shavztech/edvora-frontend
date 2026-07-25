import Banner from "@/components/Banner";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import FeatureSection from "@/components/FeatureSection";
import HowItWorks from "@/components/HowitWorks";
import MentoringPreview from "@/components/MentoringPreview";
import StatsSection from "@/components/StatsSection";
import Reveal from "@/components/Reveal";

import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen px-2">
      {/* Full Width Hero */}
    

      <Banner />
      

      {/* Main Content Container */}
        <Reveal>
        <MentoringPreview />
        </Reveal>
        <Reveal>
        <StatsSection />
        </Reveal>
        <Reveal>
        <HowItWorks />
        </Reveal>
        <Reveal>
        <FeatureSection />
        </Reveal>
        <Reveal>
        <Testimonials />
        </Reveal>
        <Reveal>
         <FAQSection />
         </Reveal>
         <Reveal>
         <CTASection />
         </Reveal>
      

    </main>
  );
}

