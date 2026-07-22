"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, CheckCircle, Users, Star } from "lucide-react";

export default function CareerHero() {
  return (
    <section className="relative overflow-hidden py-7 lg:py-9">
      {/* Background */}
      <div className="absolute -top-24 -left-24 w-[450px] h-[450px] rounded-full bg-primary/20 blur-[130px]" />
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-6 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs">
          <Briefcase size={18} />
          We're Hiring Passionate Teachers
        </div>

        {/* Heading */}
        <h1 className="mt-3 text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-navy">
          Inspire Young Minds.
          <br />
          <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
            Build A Career That Matters
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-slate-600">
          Join Edvora's growing community of passionate educators and shape the future of thousands of students through innovative online teaching. Experience a workplace where learning never stops, your efforts are recognized, and your career grows with purpose.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-5">
          <Link
            href="#apply-form"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-secondary via-[#82c253] to-secondary px-9 py-4 text-white font-bold shadow-[0_18px_40px_rgba(59,111,182,.28)] hover:-translate-y-1 transition-all duration-300"
          >
            Apply Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
          </Link>
         
        </div>

        {/* Feature Pills */}
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {[
            "Work From Home",
            "Flexible Schedule",
            "Career Growth",
            "Professional Training",
           
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-xl border border-white shadow-lg px-5 py-3"
            >
              <CheckCircle size={18} className="text-secondary" />
              <span className="font-semibold text-slate-700">{item}</span>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
}