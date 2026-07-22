
"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  PhoneCall,
  BookOpen

} from "lucide-react";


export default function ProgramCTA() {


  return (
    <section className="relative overflow-hidden py-19 lg:py-7">

      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 mt-2">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
          ✨ Ready To Begin?

          </span>

          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tight">
            Start Your Child's

           <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
              Learning Journey Today

            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">

            Choose how you'd like to connect with Edvora.
            Book a free demo, speak with our learning advisor,
            or explore programs designed for every learner.

          </p>

        </div>

        {/* CTA Cards */}

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
                    {/* Card 1 */}

          <div className="group relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(59,111,182,.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(59,111,182,.18)]">

            {/* Glow */}

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-primary to-blue-500 opacity-20 blur-3xl transition-all duration-700 group-hover:scale-125" />

            {/* Icon */}

            <div className="relative flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-blue-500 text-white shadow-[0_20px_40px_rgba(59,111,182,.35)] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">

              <CalendarDays size={34} />

            </div>

            <h3 className="mt-8 text-2xl font-black text-navy">

              Book Free Demo

            </h3>

            <p className="mt-4 leading-7 text-slate-600">

              Experience a live one-to-one class with our expert mentors
              before enrolling. Discover how personalized learning can
              transform your child's academic journey.

            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
            >

              Book Now

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </Link>

          </div>

          {/* Card 2 */}

          <div className="group relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(59,111,182,.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(59,111,182,.18)]">

            {/* Glow */}

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-secondary to-green-500 opacity-20 blur-3xl transition-all duration-700 group-hover:scale-125" />

            {/* Icon */}

            <div className="relative flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-br from-secondary to-green-500 text-white shadow-[0_20px_40px_rgba(111,168,67,.35)] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">

              <PhoneCall size={34} />

            </div>

            <h3 className="mt-8 text-2xl font-black text-navy">

              Talk to an Advisor

            </h3>

            <p className="mt-4 leading-7 text-slate-600">

              Connect with our academic experts to receive personalized
              guidance, curriculum recommendations, and answers to all
              your questions before getting started.

            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-secondary to-green-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
            >

              Contact Us

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </Link>

          </div>
                    {/* Card 3 */}

          <div className="group relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(59,111,182,.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(59,111,182,.18)]">

            {/* Glow */}

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 opacity-20 blur-3xl transition-all duration-700 group-hover:scale-125" />

            {/* Icon */}

            <div className="relative flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-[0_20px_40px_rgba(251,146,60,.35)] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">

              <BookOpen size={34} />

            </div>

            <h3 className="mt-8 text-2xl font-black text-navy">

              Explore Programs

            </h3>

            <p className="mt-4 leading-7 text-slate-600">

              Discover our Foundation, Curriculum, and Grade-wise
              learning programs designed for students from
              Kindergarten to Grade 12.Find the perfect one.

            </p>

            <Link
              href="/programs"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
            >

              View Programs

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </Link>

          </div>

        </div>


      </div>

    </section>
  );
}