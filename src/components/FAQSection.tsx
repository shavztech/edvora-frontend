


"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Who can join Edvora?",
    answer:
      "Edvora welcomes students from Kindergarten (KG) to Grade 12 through personalized one-on-one online learning programs designed for every stage of academic growth.",
  },
  {
    question: "Do you offer a free demo class?",
    answer:
      "Yes. Every student can attend a free live demo session to experience our teaching approach, interact with expert mentors, and choose the right learning program.",
  },
  {
    question: "Which curriculum do you support?",
    answer:
      "We provide personalized learning for CBSE, ICSE, State Board and IGCSE students with experienced mentors and structured lesson plans.",
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden py-13 lg:py-2">

      {/* Glow */}
     
      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
          FAQs ?
          </span>

          <h2 className=" text-4xl md:text-5xl font-[950]  text-navy leading-tight">
            Frequently Asked
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Everything you need to know before starting your learning
            journey with Edvora.
          </p>

        </div>

        {/* FAQ */}

        <div className="mx-auto mt-8 max-w-3xl space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-[0_15px_45px_rgba(59,111,182,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(59,111,182,0.12)]"
            >

              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? -1 : index)
                }
                className="flex w-full items-center justify-between px-7 py-6 text-left"
              >

                <h3 className="text-lg font-bold text-navy">
                  {faq.question}
                </h3>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 ${
                    openIndex === index
                      ? "rotate-180 bg-primary text-white"
                      : "text-primary"
                  }`}
                >
                  <ChevronDown size={20} />
                </div>

              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openIndex === index
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">

                  <div className="border-t border-slate-100 px-7 pb-6 pt-5">

                    <p className="leading-8 text-slate-600">
                      {faq.answer}
                    </p>

                  </div>

                </div>
              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

