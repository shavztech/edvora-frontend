
"use client";

import {
  Laptop,
  Clock3,
  IndianRupee,
  GraduationCap,
  Trophy,
  HeartHandshake,
} from "lucide-react";

const benefits = [
  {
    icon: Laptop,
    title: "Teach From Anywhere",
    description:
      "Deliver engaging online classes from the comfort of your home with our advanced virtual classroom platform.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock3,
    title: "Flexible Schedule",
    description:
      "Choose teaching slots that fit your lifestyle and maintain the perfect work-life balance.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: IndianRupee,
    title: "Competitive Earnings",
    description:
      "Receive attractive compensation with performance incentives and timely monthly payouts.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: GraduationCap,
    title: "Professional Growth",
    description:
      "Attend training sessions, workshops, and certification programs to enhance your teaching skills.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Trophy,
    title: "Recognition & Rewards",
    description:
      "Outstanding educators are recognized through awards, bonuses, and appreciation programs.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: HeartHandshake,
    title: "Supportive Community",
    description:
      "Collaborate with experienced educators and become part of a passionate teaching family.",
    color: "from-secondary to-emerald-500",
  },
];

export default function WhyJoinEdvora() {
  return (
    <section className="relative py-5 lg:py-7 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute -left-32 top-10 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="absolute -right-32 bottom-10 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto mb-8 -mt-4">

          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
            ✨ WHY JOIN EDVORA?
          </span>
 
          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tight -mt-2">
            Why Teachers Love <br/>
            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
              Working With Edvora
            </span>
          </h2>

          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            We empower educators with innovative tools, flexible opportunities,
            and continuous support to create meaningful learning experiences.
          </p>

        </div>

        {/* Benefit Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {benefits.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[30px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_60px_rgba(59,111,182,0.08)] hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(59,111,182,0.18)] transition-all duration-500"
            >

              {/* Glow */}

              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl group-hover:scale-125 transition-all duration-500" />

              <div className="relative p-8">

                {/* Icon */}

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}
                >
                  <item.icon size={30} />
                </div>

                {/* Title */}

                <h3 className="mt-6 text-2xl font-bold text-navy">
                  {item.title}
                </h3>

                {/* Description */}

                <p className="mt-4 text-slate-600 leading-relaxed">
                  {item.description}
                </p>

              </div>

            </div>
          ))}


        </div>

      </div>

    </section>
  );
}

