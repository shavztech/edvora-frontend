import Banner from "@/components/Banner";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import FeatureSection from "@/components/FeatureSection";
import HowItWorks from "@/components/HowitWorks";
import MentoringPreview from "@/components/MentoringPreview";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <FeatureSection />
      <HowItWorks />
      <MentoringPreview />
      <StatsSection />
      <Testimonials />
      <CTASection />
      <FAQSection />
    </main>
  );
}
