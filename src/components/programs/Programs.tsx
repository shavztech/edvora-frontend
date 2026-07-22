// 

"use client";

import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const programs = [
  {
    title: "Foundation\nPrograms",
    image: "/programs/cbse-book-2.png",
    gradient: "from-[#3B82F6] via-[#60A5FA] to-[#2563EB]",
    badge: "Early Learning",
    description:
      "Build strong literacy, numeracy, communication and critical thinking through engaging activities and guided learning.",
    features: [
      "Activity Based Learning",
      "Early Literacy Skills",
      "Creative Thinking",
      "Interactive Sessions",
    ],
  },

  {
    title: "Curriculum\nPrograms",
    image: "/programs/igcse-globe-2.png",
    gradient: "from-[#10B981] via-[#34D399] to-[#059669]",
    badge: "School Curriculum",
    description:
      "Comprehensive CBSE and State syllabus support through live classes, concept clarity and regular assessments.",
    features: [
      "CBSE & State Board",
      "Live Interactive Classes",
      "Exam Preparation",
      "Doubt Clearing",
    ],
  },

  {
    title: "Grade-wise\nLearning",
    image: "/programs/icse-cap-2.png",
    gradient: "from-[#8B5CF6] via-[#A78BFA] to-[#7C3AED]",
    badge: "Personalized Learning",
    description:
      "Learning plans designed for every grade with personalized attention, continuous practice and progress tracking.",
    features: [
      "Grade-specific Lessons",
      "Concept Clarity",
      "Practice Sessions",
      "Progress Tracking",
    ],
  },

  {
    title: "Personality\nDevelopment",
    image: "/programs/personality development-2.png",
    gradient: "from-[#F59E0B] via-[#FBBF24] to-[#EA580C]",
    badge: "Life Skills",
    description:
      "Develop confidence, communication, leadership and creativity through interactive activities and mentoring.",
    features: [
      "Communication Skills",
      "Leadership Development",
      "Confidence Building",
      "Creative Activities",
    ],
  },
];

export default function CurriculumPrograms() {
  return (
    <section className="relative overflow-hidden py-5 lg:py-7">

      {/* Background Blur */}
      <div className="absolute -left-52 top-0 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[170px]" />
      <div className="absolute -right-52 bottom-0 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[170px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Badge */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
            OUR PROGRAMS
          </span>
        </div>

        {/* Heading */}
        <div className="mx-auto mt-2 max-w-4xl text-center">

          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tight -mt-5">

            Learn Through <br/>

            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">

              Your Preferred Programs

            </span>

          </h2>

          <p className="mt-4 text-lg lg:text-xl text-slate-600 leading-relaxed -mt-6">

            Whether your child is beginning their learning journey,
            strengthening academic foundations or preparing for school
            examinations, Edvora delivers personalized online learning
            designed for every stage of education.

          </p>

        </div>

        {/* Cards */}
        <div className="mt-7  gap-6 grid  md:grid-cols-2 lg:grid-cols-2">

          {programs.map((program, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-[34px] bg-gradient-to-br from-primary/10 via-white to-secondary/10 p-[1.5px] transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_35px_80px_rgba(59,111,182,.16)]"
            >

              <div className="relative h-full rounded-[33px] border border-white/40 bg-white/80 p-5 lg:p-6 backdrop-blur-2xl">

                <div
                  className={`absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${program.gradient} opacity-10 blur-3xl`}
                />

                <div
                  className={`inline-flex rounded-full bg-gradient-to-r ${program.gradient} px-4 py-2 text-xs font-bold tracking-wide text-white shadow-lg`}
                >
                  {program.badge}
                </div>

                <div className="mt-7 flex justify-center">

                  <div className="relative">

                    {/* Glow */}
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${program.gradient} opacity-25 blur-2xl`}
                    />

                    {/* Icon Container */}
                    <div
                      className={`relative flex h-30 w-30 md:h-24 md:w-24 items-center justify-center rounded-[28px] bg-gradient-to-br ${program.gradient} shadow-[0_20px_50px_rgba(59,111,182,.28)] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6`}
                    >
                      <Image
                        src={program.image}
                        alt={program.title}
                        width={62}
                        height={62}
                        className="relative z-10 md:w-[70px] md:h-[65px]"
                      />

                      <div className="absolute left-4 top-4 h-4 w-4 rounded-full bg-white/40 blur-sm" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-6 whitespace-pre-line text-center text-xl md:text-2xl font-black leading-tight text-navy">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-center text-[15px] md:text-base leading-7 text-slate-600">
                  {program.description}
                </p>

                {/* Divider */}
                <div
                  className={`mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r ${program.gradient}`}
                />

                {/* Features */}
                <div className="mt-6 space-y-3">

                  {program.features.map((feature) => (

                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r ${program.gradient}`}
                      >
                        <CheckCircle2
                          size={15}
                          className="text-white"
                        />
                      </div>

                      <span className="text-sm md:text-[15px] font-medium text-slate-700">
                        {feature}
                      </span>
                    </div>

                  ))}

                </div>

              <div className="mt-8 flex justify-center">
  <Link
    href="/demo-class"
    className={`group flex w-full md:w-1/2 lg:w-1/2
      items-center justify-center gap-2
      rounded-full bg-gradient-to-r ${program.gradient}
      px-6 py-3
      font-bold text-white
      shadow-[0_18px_45px_rgba(59,111,182,.25)]
      transition-all duration-300
      hover:-translate-y-1 hover:scale-[1.02]`}
  >
    <span className="whitespace-nowrap text-sm md:text-md">
      Free Demo
    </span>

    <ArrowRight
      size={18}
      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
    />
  </Link>
</div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>


  );
}