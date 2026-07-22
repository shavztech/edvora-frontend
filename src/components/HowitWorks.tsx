


import Image from "next/image";
import { GraduationCap } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Enquire & Demo",
    desc: "Book a free demo class and explore how Edvora can help students learn better.",
    image: "/how-it-works/demo-3.jpg",
    color: "bg-green-500",
    line: "bg-green-500",
  },
  {
    id: "02",
    title: "Identity Verification",
    desc: "Our team verifies your details and creates a secure student profile.",
    image: "/how-it-works/verify.png",
    color: "bg-blue-600",
    line: "bg-blue-600",
  },
  {
    id: "03",
    title: "Expert Matching",
    desc: "Students are matched with the best mentor based on subject and goals.",
    image: "/how-it-works/mentor-2.png",
    color: "bg-purple-600",
    line: "bg-purple-600",
  },
  {
    id: "04",
    title: "Schedule Sync",
    desc: "Choose your convenient timing and schedule classes seamlessly.",
    image: "/how-it-works/shedule-3.png",
    color: "bg-orange-500",
    line: "bg-orange-500",
  },
  {
    id: "05",
    title: "Learning Begins",
    desc: "Join live interactive classes and begin your learning journey.",
    image: "/how-it-works/learning-5.jpg",
    color: "bg-green-600",
    line: "bg-green-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-8 lg:py-10 bg-edvora-gradient">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-secondary/10 rounded-full blur-[140px]" />

      {/* Decorations */}
      <div className="hidden lg:block absolute left-20 top-32 text-primary/20 animate-float-medium text-7xl">
        ✈️
      </div>

      <div className="hidden lg:block absolute right-20 top-24 text-primary/20 animate-float-slow">
        <GraduationCap size={120} />
      </div>

      {/* Left dotted path */}
      <svg
        className="hidden lg:block absolute left-20 top-40 z-0"
        width="220"
        height="120"
      >
        <path
          d="M10 60 C100 -20, 150 120, 210 50"
          stroke="#3B6FB6"
          strokeWidth="3"
          strokeDasharray="10 10"
          fill="none"
          opacity="0.5"
        />
      </svg>

      {/* Right dotted path */}
      <svg
        className="hidden lg:block absolute right-20 top-48 z-0"
        width="220"
        height="120"
      >
        <path
          d="M10 50 C80 120, 130 -20, 210 60"
          stroke="#3B6FB6"
          strokeWidth="3"
          strokeDasharray="10 10"
          fill="none"
          opacity="0.5"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-6 relative z-10 ">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">

          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
            ✨ HOW IT WORKS
          </div>

          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tight">
            Your Learning Journey
            <br />

            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
              In 5 Easy Steps
            </span>
          </h2>

          <p className="mt-8 text-lg lg:text-xl text-slate-600 leading-relaxed">
            From booking a demo to attending live classes,
            we make every step simple, safe and effective
            for KG-12 students.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Main Dotted Line */}
          <div className="hidden lg:block absolute top-10 left-[10%] w-[80%] border-t-[3px] border-dashed border-primary/40 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">

            {steps.map((step, index) => (
              <div key={index} className="relative group">

                {/* Step Number */}
                <div
                  className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full ${step.color} border-[6px] border-white shadow-2xl flex items-center justify-center text-white text-3xl font-extrabold z-20 `}
                >
                  {step.id}
                </div>

                {/* Card */}
                <div className="pt-16 pb-8 px-6  bg-white/150 backdrop-blur-xl rounded-[35px] border border-white shadow-[0_20px_50px_rgba(59,117,177,0.15)] hover:-translate-y-4 hover:shadow-[0_30px_70px_rgba(59,117,177,0.25)] transition-all duration-500 h-full text-center">

                  {/* Cartoon Image */}
                  <div className="relative h-51 flex items-center justify-center">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={300}
                      height={500}
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-navy mt-6 mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {step.desc}
                  </p>

                  {/* Bottom line */}
                  <div
                    className={`mt-8 mx-auto w-14 h-1 rounded-full ${step.line}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}