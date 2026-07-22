
"use client";

import {
  MonitorPlay,
  Users,
  BookOpen,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: MonitorPlay,
    title: "Interactive Live Classes",
    description:
      "Deliver engaging online sessions using Edvora's advanced virtual classroom with screen sharing, whiteboard and quizzes.",
    color: "from-primary to-blue-500",
  },
  {
    icon: Users,
    title: "Small Batch Learning",
    description:
      "Focus on every learner through personalized mentoring and meaningful classroom interactions.",
    color: "from-secondary to-emerald-500",
  },
  {
    icon: BookOpen,
    title: "Ready Teaching Resources",
    description:
      "Access lesson plans, digital notes, presentations, worksheets and assessments prepared by experts.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Student Progress Analytics",
    description:
      "Monitor student performance with detailed reports, attendance tracking and learning insights.",
    color: "from-orange-500 to-yellow-500",
  },
];

export default function TeachingApproach() {
  return (
    <section className="relative py-3 lg:py-7 overflow-hidden">

      {/* Background */}

      <div className="absolute -left-32 top-0 w-[420px] h-[420px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="absolute -right-32 bottom-0 w-[420px] h-[420px] rounded-full bg-secondary/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">



        {/* LEFT */}



        <div className="text-center max-w-3xl mx-auto mb-6">

          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-4">
            ✨ OUR TEACHING APPROACH
          </span>

          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tightlg:-mt-4 ">
            Teach Smarter<br />
            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
              Inspire Better </span>

          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">


            At Edvora, we combine technology, personalized mentoring,
            and structured learning to create meaningful classroom
            experiences that help every student succeed.


          </p>

        </div>

<div className="flex flex-col md:flex-row gap-8 items-start">

        <div className="mt-0 space-y-6 flex-1">

          {features.map((item, index) => (

            <div
              key={index}
              className="group rounded-[28px] bg-white border border-slate-100 p-6 shadow-[0_15px_45px_rgba(59,111,182,.08)] hover:-translate-y-2 hover:shadow-[0_25px_55px_rgba(59,111,182,.15)] transition-all duration-500"
            >

              <div className="flex gap-5">

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  <item.icon size={30} />
                </div>

                <div>

                  <h3 className="text-lg font-bold text-navy">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-base text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* BLUE CARD (right side) */}
        <div className="relative  w-full md:w-auto md:mt-0   max-w-lg  hidden lg:block self-start">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[40px] blur-3xl" />
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-navy via-primary to-[#4A7BC0] p-10 shadow-[0_30px_70px_rgba(30,58,95,.35)]">
            {/* Decorative Circles */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-secondary/20 blur-3xl" />
            <div className="relative">
              <span className="inline-flex rounded-full bg-white/10 backdrop-blur-md px-5 py-2 text-white font-semibold">What You'll Love</span>
              <h3 className="mt-6 text-3xl font-black text-white leading-tight">
                Everything You Need
                <span className="block text-secondary">To Become An Amazing Teacher</span>
              </h3>
              <p className="mt-5 text-white/80 leading-relaxed">
                Edvora provides modern teaching tools, continuous mentoring, structured lesson plans and a collaborative environment where educators can truly thrive.
              </p>
              {/* Checklist */}
              <div className="mt-13 space-y-5 w-50">
                {[
                  "Live Interactive Classes",
                  "Digital Teaching Resources",
                  "Dedicated Academic Support",
                  "Monthly Performance Rewards",
                  "Career Growth Opportunities"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <CheckCircle2 className="text-white" size={20} />
                    </div>
                    <span className="text-white text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </section>
  );
}
