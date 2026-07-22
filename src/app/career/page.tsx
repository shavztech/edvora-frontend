
import CareerHero from "@/components/career/CareerHero";
import WhyJoinEdvora from "@/components/career/WhyJoinEdvora";
import TeachingApproach from "@/components/career/TeachingApproach";
import TeacherTestimonials from "@/components/career/TeacherTestimonials";
import ApplyForm from "@/components/career/ApplyForm";
import HiringProcess from "@/components/career/HiringProcess";
import CareerFAQ from "@/components/career/FAQ";
import CareerCTA from "@/components/career/CareerCTA";

export default function CareersPage() {
    return (
        <main className="overflow-hidden">

            {/* Hero */}
            <CareerHero />
            
            {/* Application Form */}

             <ApplyForm />

            {/* Why Join Edvora */}
            <WhyJoinEdvora />

            {/* Teaching Approach */}
            <TeachingApproach />

            {/* Teacher Testimonials */}
            <TeacherTestimonials />
            {/* HiringProcess */}
            <HiringProcess/>
            {/* FAQ */}
            <CareerFAQ />
             {/* CTA */}
            <CareerCTA />

        </main>
    );
}

