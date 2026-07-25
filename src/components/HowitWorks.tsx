"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Enquire & Demo",
    desc: "Book a free demo class and explore how Edvora can help students learn better.",
    image: "/how-it-works/demo.jpg",
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
    image: "/how-it-works/mentor.png",
    color: "bg-purple-600",
    line: "bg-purple-600",
  },
  {
    id: "04",
    title: "Schedule Sync",
    desc: "Choose your convenient timing and schedule classes seamlessly.",
    image: "/how-it-works/shedule.png",
    color: "bg-orange-500",
    line: "bg-orange-500",
  },
  {
    id: "05",
    title: "Learning Begins",
    desc: "Join live interactive classes and begin your learning journey.",
    image: "/how-it-works/learning.jpg",
    color: "bg-green-600",
    line: "bg-green-600",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      
    },
  },
};

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-8 lg:py-10">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-secondary/10 blur-[140px]" />

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

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mx-auto mb-14 max-w-4xl text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            ✨ HOW IT WORKS
          </div>

          <h2 className="text-4xl font-[950] leading-tight text-navy md:text-5xl">
            Your Learning Journey
            <br />

            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
              In 5 Easy Steps
            </span>
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-slate-600 lg:text-xl">
            From booking a demo to attending live classes,
            we make every step simple, safe and effective
            for KG-12 students.
          </p>

        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Main Dotted Line */}
          <div className="absolute left-[10%] top-10 z-0 hidden w-[80%] border-t-[3px] border-dashed border-primary/40 lg:block"></div>

          <motion.div
            className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={item}
                className="relative group"
              >                {/* Step Number */}
                <div
                  className={`absolute -top-10 left-1/2 z-20 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full ${step.color} border-[6px] border-white text-3xl font-extrabold text-white shadow-2xl`}
                >
                  {step.id}
                </div>

                {/* Card */}
                <div className="h-full rounded-[35px] border border-white bg-white/80 px-6 pb-8 pt-16 text-center shadow-[0_20px_50px_rgba(59,117,177,0.15)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_70px_rgba(59,117,177,0.25)]">

                  {/* Cartoon Image */}
                  <div className="relative flex h-52 items-center justify-center">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={300}
                      height={500}
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 mb-4 text-2xl font-bold text-navy">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-slate-600">
                    {step.desc}
                  </p>

                  {/* Bottom Line */}
                  <div
                    className={`mx-auto mt-8 h-1 w-14 rounded-full ${step.line}`}
                  />
                </div>

              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>

    </section>
  );
}