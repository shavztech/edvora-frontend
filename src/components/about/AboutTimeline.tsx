





"use client";

import {
  Rocket,
  School,
  GraduationCap,
  Trophy,
} from "lucide-react";

const timeline = [
  {
    year: "2022",
    title: "Edvora Founded",
    description:
      "Started with a vision to transform KG–12 education through technology and expert mentorship.",
    icon: Rocket,
    color: "from-primary to-blue-500",
  },
  {
    year: "2023",
    title: "1,000+ Students",
    description:
      "Built a growing community of passionate learners and dedicated educators.",
    icon: School,
    color: "from-secondary to-green-500",
  },
  {
    year: "2024",
    title: "5,000+ Students",
    description:
      "Expanded our programs with live classes, assessments and personalized mentoring.",
    icon: GraduationCap,
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2025",
    title: "10,000+ Learners",
    description:
      "Empowering thousands of students across multiple grades with future-ready education.",
    icon: Trophy,
    color: "from-orange-400 to-yellow-500",
  },
];

export default function AboutTimeline() {
  return (
    <section className="relative py-1 lg:py-2 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute -top-24 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-10">

          <span className="inline-flex px-5 py-2 rounded-full bg-secondary/10 text-secondary font-semibold mb-6">
            OUR JOURNEY
          </span>

          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tight">
            Growing Together
          </h2>

          <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg">
            Every milestone reflects our commitment to providing quality
            education, expert mentorship, and a better future for every learner.
          </p>

        </div>

        {/* Desktop Timeline */}

        <div className="hidden lg:block relative">

          {/* Line */}

          <div className="absolute top-12 left-0 w-full border-t-4 border-dashed border-primary/20" />

          <div className="grid grid-cols-4 gap-8 relative">

            {timeline.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="relative text-center group"
                >

                  {/* Icon */}

                  <div
                    className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br ${item.color}
                    flex items-center justify-center text-white shadow-xl
                    transition duration-500 group-hover:scale-110`}
                  >
                    <Icon size={34} />
                  </div>

                  {/* Card */}

                  <div className="mt-10 rounded-[30px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_60px_rgba(59,111,182,0.08)] p-7 transition duration-500 hover:-translate-y-3 hover:shadow-[0_25px_70px_rgba(59,111,182,0.18)]">

                    <h3 className="text-primary text-3xl font-black">
                      {item.year}
                    </h3>

                    <h4 className="mt-3 text-xl font-bold text-[#1E3A5F]">
                      {item.title}
                    </h4>

                    <p className="mt-4 text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Mobile Timeline */}

        <div className="lg:hidden relative">

          <div className="absolute left-8 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary rounded-full"></div>

          <div className="space-y-10">

            {timeline.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="relative pl-20"
                >

                  {/* Icon */}

                  <div
                    className={`absolute left-0 top-2 w-16 h-16 rounded-full bg-gradient-to-br ${item.color}
                    flex items-center justify-center text-white shadow-xl`}
                  >
                    <Icon size={28} />
                  </div>

                  {/* Card */}

                  <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl p-6">

                    <span className="text-primary text-2xl font-black">
                      {item.year}
                    </span>

                    <h3 className="mt-2 text-xl font-bold text-[#1E3A5F]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}

