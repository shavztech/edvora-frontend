"use client";

import Link from "next/link";
import {
  FileText,
  Users,
  CheckCircle,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const journeySteps = [
  {
    number: "01",
    title: "Submit application",
    description: "Fill out our simple online form",
    icon: FileText,
    color: "from-primary to-blue-500",
  },
  {
    number: "02",
    title: "Interview",
    description: "15-minute interview to showcase your teaching skills.",
    icon: Users,
    color: "from-secondary to-emerald-500",
  },
  {
    number: "03",
    title: "Complete your Registration",
    description: "Get verified and onboarded",
    icon: CheckCircle,
    color: "from-violet-500 to-purple-500",
  },
  {
    number: "04",
    title: "Quick Training",
    description: "Learn our platform and tools",
    icon: GraduationCap,
    color: "from-sky-500 to-cyan-500",
  },
  {
    number: "05",
    title: "Connect with New Students",
    description: "Start teaching and earning",
    icon: Sparkles,
    color: "from-orange-400 to-amber-500",
  },
];

export default function LearningJourney() {
  // Group into pairs (supporting odd number of steps)
  const stepPairs = [];
  for (let i = 0; i < journeySteps.length; i += 2) {
    stepPairs.push([journeySteps[i], journeySteps[i + 1]]);
  }

  return (
    <section className="relative overflow-hidden py-3 lg:py-5">

      {/* Background Glow */}

      <div className="absolute -top-24 left-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
            ONBOARDING JOURNEY
          </span>

          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tight -mt-4">
            Your Path to Becoming an<br/>

            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
              Edvora Educator

            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Our streamlined onboarding process is designed to help you start
            teaching and sharing your knowledge in just a few simple steps.

          </p>

        </div>

        {/* Connected Compact Timeline (Side-by-Side) */}

        <div className="relative mt-20 max-w-5xl mx-auto">

          {/* Center Connector Line */}

          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary via-secondary to-primary lg:block -mt-10 " />

          <div className="space-y-12 lg:space-y-16">

            {stepPairs.map((pair, rowIndex) => {
              const stepLeft = pair[0];
              const stepRight = pair[1]; // might be undefined
              const IconLeft = stepLeft.icon;
              const IconRight = stepRight ? stepRight.icon : null;

              return (
                <div
                  key={rowIndex}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-24 items-stretch"
                >
                  {/* Timeline Dot in the center */}

                  <div className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-primary shadow-md lg:block -mt-5" />

                  {/* Left Card */}

                  <div className="flex justify-center lg:justify-end h-full -mt-6 lg:-mt-6">

                    <div className="group relative w-full max-w-[380px] h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-white/30 backdrop-blur-md p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">

                      {/* Accent Glow */}

                      <div
                        className={`absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${stepLeft.color} opacity-10 blur-xl transition-all duration-500 group-hover:scale-125`}
                      />

                      {/* Top Row: Icon */}

                      <div className="flex justify-between items-center">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stepLeft.color} text-white shadow-md transition duration-300 group-hover:rotate-3 group-hover:scale-105`}>
                          <IconLeft size={20} />
                        </div>
                        <span className={`text-xs font-semibold text-white bg-gradient-to-r ${stepLeft.color} px-3 py-1 rounded-full border border-white/30 shadow-md`}
                         >{stepLeft.number}</span>
                      </div>

                    

                      {/* Title */}
<h3 className="mt-1 text-lg font-bold text-navy">
                        {stepLeft.title}
                      </h3>

                      {/* Description */}

                      <p className="mt-2 text-base text-slate-600 leading-relaxed">
                        {stepLeft.description}
                      </p>

                      {/* Bottom Border Accent */}

                      <div
                        className={`absolute bottom-0 left-0 h-1 w-full scale-x-0 bg-gradient-to-r ${stepLeft.color} origin-left transition-transform duration-350 group-hover:scale-x-100`}
                      />

                    </div>

                  </div>

                  {/* Right Card */}

                  <div className="flex justify-center lg:justify-start h-full -mt-6 lg:-mt-10 lg:-mt-6">

                    {stepRight ? (
                      <div className="group relative w-full max-w-[380px] h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-white/30 backdrop-blur-md p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">

                        {/* Accent Glow */}

                        <div
                          className={`absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${stepRight.color} opacity-10 blur-xl transition-all duration-500 group-hover:scale-125`}
                        />

                        {/* Top Row: Icon */}

                        <div className="flex justify-between items-center">
                          <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stepRight.color} text-white shadow-md transition duration-300 group-hover:rotate-3 group-hover:scale-105`}>
                            {IconRight && <IconRight size={20} />}
                          </div>
                          <span className={`text-xs font-semibold text-white bg-gradient-to-r ${stepRight.color} px-3 py-1 rounded-full border border-white/30 shadow-md`}>{stepRight.number}</span>
                        </div>


                        {/* Title */}

                        <h3 className="mt-1 text-lg font-bold text-navy">
                          {stepRight.title}
                        </h3>

                        {/* Description */}

                        <p className="mt-2 text-base text-slate-600 leading-relaxed">
                          {stepRight.description}
                        </p>

                        {/* Bottom Border Accent */}

                        <div
                          className={`absolute bottom-0 left-0 h-1 w-full scale-x-0 bg-gradient-to-r ${stepRight.color} origin-left transition-transform duration-350 group-hover:scale-x-100`}
                        />

                      </div>
                    ) : (
                      <div className="w-full max-w-[380px] hidden lg:block" />
                    )}

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