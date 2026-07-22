// 


"use client";

import {
  Sparkles,
  BookOpen,
  GraduationCap,
  School,
  UserRoundCheck,
} from "lucide-react";

const programs = [
  {
    title: "Foundation\nPrograms",
    icon: BookOpen,
    gradient: "from-blue-500 via-blue-600 to-indigo-600",
    glow: "bg-blue-500/15",
    line: "bg-blue-600",
    shadow: "shadow-[0_20px_45px_rgba(59,111,182,.35)]",
    iconSize: 34,
  },
  {
    title: "Curriculum\nPrograms",
    icon: GraduationCap,
    gradient: "from-green-500 via-emerald-500 to-green-600",
    glow: "bg-green-500/15",
    line: "bg-green-500",
    shadow: "shadow-[0_20px_45px_rgba(111,168,67,.35)]",
    iconSize: 34,
  },
  {
    title: "Grade-wise\nLearning",
    icon: School,
    gradient: "from-orange-400 via-orange-500 to-amber-500",
    glow: "bg-orange-500/15",
    line: "bg-orange-500",
    shadow: "shadow-[0_20px_45px_rgba(251,146,60,.35)]",
    iconSize: 34,
  },
  {
    title: "Personality\nDevelopment",
    icon: UserRoundCheck,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    glow: "bg-violet-500/15",
    line: "bg-violet-500",
    shadow: "shadow-[0_20px_45px_rgba(139,92,246,.35)]",
    iconSize: 34,
  },
];

export default function ProgramOverview() {
  return (
    <section className="relative overflow-hidden py-4 lg:py-10 px-6 md:px-10 lg:px-28">

      {/* Background */}

      <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[150px]" />

      <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-secondary/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Badge */}

        <div className="flex justify-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-sm font-semibold text-secondary">

            <Sparkles
              size={18}
              className="text-secondary"
            />

            PROGRAM OVERVIEW

          </div>

        </div>

        {/* Heading */}

        <div className="mx-auto mt-2  lg:mt-5 max-w-4xl text-center">

          <h2 className="text-4xl md:text-5xl font-black leading-tight">

            <span className="text-4xl md:text-5xl font-[950] text-navy leading-tight">
              One Platform<br/>
            </span>

            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
              Unlimited Learning Opportunities
            </span>

          </h2>

          <div className="mx-auto mt-7 flex items-center justify-center gap-3">

            <div className="h-[2px] w-12 rounded-full bg-primary/20" />

            <div className="h-3 w-3 rounded-full bg-primary" />

            <div className="h-[2px] w-12 rounded-full bg-primary/20" />

          </div>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">

            Whether your child is beginning their learning journey,
            preparing for board examinations, or strengthening
            academic foundations, Edvora provides personalized
            online learning experiences for every stage of education.

          </p>

        </div>

                {/* Cards */}

        <div className="mt-7  grid gap-6  sm:grid-cols-2 xl:grid-cols-4">

          {programs.map((program, index) => {
            const Icon = program.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[20px] border border-white/60 bg-white/80 p-0.5 sm:p-1 lg:p-2 max-w-[280px] backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_35px_70px_rgba(59,111,182,.16)]"
              >

                {/* Glow */}

                <div
                  className={`absolute -right-10 -top-10 h-36 w-36 rounded-full ${program.glow} blur-3xl transition-all duration-500 group-hover:scale-150`}
                />

                {/* Icon */}

                <div className="relative mx-auto flex h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 items-center justify-center">

                  <div
                    className={`absolute inset-0 rounded-[30px] bg-gradient-to-br ${program.gradient} opacity-15 blur-xl`}
                  />

                  <div
                    className={`className="relative flex h-16 w-16 md:h-[72px] md:w-[72px] lg:h-20 lg:w-20 items-center  justify-center rounded-[26px] bg-gradient-to-br ${program.gradient} text-white ring-4 ring-white ${program.shadow} transition duration-500 group-hover:scale-110 group-hover:-rotate-3`}
                  >

                    <div className="absolute left-3 top-3 h-3 w-3 rounded-full bg-white/40 blur-sm" />
                      <Icon
  className="h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
  strokeWidth={2.2}
/>

                  </div>

                </div>

                {/* Line */}

                <div
                  className={`mx-auto mt-4 h-1 w-14 rounded-full ${program.line}`}
                />

                {/* Title */}

                <h3 className="mt-5 text-sm md:text-base font-black leading-tight text-center text-navy whitespace-pre-line">

                  {program.title}

                </h3>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}