// 

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProgramsCTA() {
  return (
    <section className="py-8 lg:py-10">

      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* CTA Card */}

        <div className="rounded-[30px] border border-secondary/100 bg-secondary/5 px-8 py-5 shadow-[0_15px_40px_rgba(15,23,42,0.06]">

          {/* Small Badge */}

          <div className="flex justify-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">

              GET STARTED

            </span>

          </div>

          {/* Heading */}

          <h2 className="mt-6 text-center text-3xl font-black leading-tight text-navy md:text-4xl">

            Ready to Begin Your

            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">

              Learning Journey?

            </span>

          </h2>

           <p className="relative mx-auto mt-6 max-w-3xl text-center text-base leading-8 text-slate-600">

            Join thousands of students learning with expert mentors,
            interactive live classes and personalized guidance designed
            to unlock every learner's true potential.

          </p>

         
          {/* Buttons */}

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              href="/demo-booking"
              className="inline-flex items-center gap-3 rounded-full bg-secondary px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Book Free Demo

              <ArrowRight size={18} />

            </Link>

            <Link
              href="/programs"
              className="inline-flex items-center gap-3 rounded-full border border-primary/20 px-8 py-3.5 font-semibold text-primary transition-all duration-300 hover:border-primary bg-primary text-white"
            >
              Explore Programs
                          </Link>

          </div>

          {/* Bottom Text */}

          <div className="mt-3 border-t border-slate-100 pt-6">

            <p className="text-center text-md leading-7 text-slate-500">

              Personalized learning • Expert mentors • Flexible schedules

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}