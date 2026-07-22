

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-14 md:pt-10 md:pb-10 lg:pt-20 lg:pb-20">

      {/* Primary Glow */}
      <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-primary/12 blur-[150px]" />

      {/* Secondary Glow */}
      <div className="absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full bg-secondary/12 blur-[150px]" />

      {/* Extra Theme Blend */}
      <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/5 via-white/40 to-secondary/5 blur-[140px]" />

      {/* Floating Accent */}
      <div className="absolute top-24 right-[18%] h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-24 left-[15%] h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-center px-6">

        {/* Reduced height so next section won't appear */}
        <div className="flex min-h-[62vh] w-full items-center justify-center md:min-h-[66vh] lg:min-h-[68vh]">

          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">

            {/* Badge */}

            <span className="mb-5 inline-flex items-center rounded-full bg-secondary/10 px-6 py-2 text-xs font-bold tracking-wide text-secondary md:text-sm">
              ✨ THE EDVORA JOURNEY
            </span>

            {/* Heading */}

            <h1 className="
              font-black
              leading-[1.08]
              tracking-tight
              text-navy

              text-[2.5rem]
              sm:text-[3rem]
              md:text-[3.8rem]
              lg:text-[4.8rem]
              xl:text-[5.3rem]
            ">

              Shaping Curious Minds

              <br />

              <span className="mt-1 block bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent md:mt-2">
                Into Future Leaders
              </span>

            </h1>

            {/* Description */}

            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 md:mt-7 md:text-lg md:leading-8">

              Edvora combines technology, expert mentorship, and personalized
              learning experiences to empower every student with confidence,
              creativity, and academic excellence.

            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-5">
                          {/* Buttons */}

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-5">

              <Link
                href="/programs"
                className="rounded-full bg-gradient-to-r from-primary to-blue-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(59,111,182,.30)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(59,111,182,.45)] md:px-8 md:py-4 md:text-base"
              >
                Explore Programs
              </Link>

              <Link
                href="/demo-booking"
                className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-secondary to-emerald-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(111,168,67,.30)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(111,168,67,.45)] md:px-8 md:py-4 md:text-base"
              >
                Book Free Demo

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </Link>

            </div>

          </div>

        </div>

      </div>
      </div>

    </section>
  );
}
            