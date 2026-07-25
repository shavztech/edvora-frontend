
import CareerHero from "@/components/career/CareerHero";
import WhyJoinEdvora from "@/components/career/WhyJoinEdvora";
import TeachingApproach from "@/components/career/TeachingApproach";
import TeacherTestimonials from "@/components/career/TeacherTestimonials";
import ApplyForm from "@/components/career/ApplyForm";
import HiringProcess from "@/components/career/HiringProcess";
import CareerFAQ from "@/components/career/FAQ";
import CareerCTA from "@/components/career/CareerCTA";
import Reveal from "@/components/Reveal";

export default function CareersPage() {
    return (
        <main className="overflow-hidden px-1">
            <Reveal>
            {/* Hero */}
            <CareerHero />
            </Reveal>
            <Reveal>
            {/* Application Form */}

             <ApplyForm />
             </Reveal>

             <Reveal>
            {/* Why Join Edvora */}
            <WhyJoinEdvora />
            </Reveal>
               <Reveal>
            {/* Teaching Approach */}
            <TeachingApproach />
            </Reveal>
            <Reveal>

            {/* Teacher Testimonials */}
            <TeacherTestimonials />
            </Reveal>
                <Reveal>
            {/* HiringProcess */}

            <HiringProcess/>
            </Reveal>
            <Reveal>
            {/* FAQ */}
            <CareerFAQ />
            </Reveal>
            <Reveal>
             {/* CTA */}
            <CareerCTA />
            </Reveal>

        </main>
    );
}

