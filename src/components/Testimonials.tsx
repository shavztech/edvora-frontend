

"use client";

import { Quote, ShieldCheck, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ayaan Khan",
    role: "Graduate Student",
    text: "Edvora completely changed my learning experience. The mentors were incredibly supportive, and the interactive classes made even difficult concepts easy to understand.",
    avatar: "A",
    color: "from-primary to-blue-500",
  },
  {
    name: "Sara Thomas",
    role: "Parent",
    text: "The progress tracking and engaging activities helped my child become more confident in studies. I'm truly impressed with the quality of learning at Edvora.",
    avatar: "S",
    color: "from-secondary to-green-500",
  },
  {
    name: "Rahul Menon",
    role: "Verified Student",
    text: "The structured curriculum, expert mentors, and fun activities kept me motivated every day. Edvora is the best learning platform I've experienced.",
    avatar: "R",
    color: "from-orange-400 to-amber-500",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-19 lg:py-8">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-[140px]" />

      <div className="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-secondary/20 blur-[140px]" />

      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center mb-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-4">
           ✨ Testimonials
          </span>

          <h2 className="mt-0 text-4xl md:text-5xl font-[950] text-navy leading-tight">
            Loved by
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}
              Students & Parents
            </span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-slate-600 text-lg leading-8">
            Discover why thousands of students and parents trust Edvora for
            engaging, innovative, and future-ready learning experiences.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-0">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[32px] border border-white/40 bg-white/75 backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(59,111,182,.08)] transition-all duration-500 hover:-translate-y-3 hover:border-primary/20 hover:shadow-[0_35px_70px_rgba(59,111,182,.15)]"
            >
              {/* Glow */}

              <div
                className={`absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-r ${t.color} opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-30`}
              />

              {/* Quote */}

              <div className="absolute top-8 right-8 rounded-2xl bg-primary/10 p-3 text-primary">
                <Quote className="h-6 w-6" />
              </div>

              {/* Avatar */}

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${t.color} text-white text-2xl font-black shadow-lg`}
              >
                {t.avatar}
              </div>

              {/* Name */}

              <h3 className="mt-6 text-xl font-black text-slate-900">
                {t.name}
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {t.role}
              </p>

              {/* Stars */}

              <div className="mt-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}

              <p className="mt-6 text-[16px] leading-8 italic text-slate-600">
                “{t.text}”
              </p>

              {/* Verified */}

              <div className="mt-8 flex items-center gap-2 border-t border-slate-100 pt-5">
                <ShieldCheck className="h-5 w-5 text-green-500" />

                <span className="text-sm font-semibold text-slate-600">
                  Verified Review
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
  }