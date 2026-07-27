
"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-6 lg:py-9 ">
      <div className="max-w-7xl mx-auto px-6">

        {/* CTA Banner */}
        <div className="relative overflow-hidden rounded-[35px] bg-gradient-to-r from-primary via-navy to-primary px-6 py-5 md:px-10 md:py-6 lg:px-14 lg:py-8  mb-2 mb:mb-2 lg:mb-4 shadow-[0_25px_60px_rgba(59,117,177,0.35)]">

          {/* Left Bag */}
          <div className="absolute left-0 bottom-0 z-0 hidden md:block">
            <Image
              src="/features/blue-bag.png"
              alt="School Bag"
              width={260}
              height={260}
              className="w-20 sm:w-28 md:w-40 lg:w-64 h-auto object-contain animate-float-slow"
            />
          </div>

          {/* Right Books */}
          <div className="absolute right-0 bottom-0 z-0 hidden md:block">
            <Image
              src="/features/book-stack-removebg-preview.png"
              alt="Books"
              width={260}
              height={260}
              className="w-24 sm:w-32 md:w-44 lg:w-60 h-auto object-contain animate-float-medium"
            />
          </div>

          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full bg-secondary/20 blur-[100px]" />

          {/* Content */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-2 text-xs sm:text-sm font-semibold text-white/90 mb-4">
              ✨ Trusted by 10,000+ Students
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Ready To Begin Your
              <br />
              <span className="text-secondary">
                Learning Journey?
              </span>
            </h2>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Join thousands of students already learning and growing with
              Edvora through expert teachers, interactive lessons and
              personalised guidance.
            </p>

            {/* Button */}
            <button className="inline-flex items-center gap-3 rounded-full bg-secondary px-7 py-3 text-white font-bold shadow-[0_10px_30px_rgba(111,168,67,0.4)] hover:scale-105 transition-all duration-300">
              Start Learning Today
              <ArrowRight size={20} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}