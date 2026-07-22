"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [

 {
    question: "How do I enroll in a program?",
    answer:
      "Simply click the 'Book Free Demo' button, speak with our academic counselor, choose the appropriate program, and begin your learning journey with Edvora.",
  },

   {
    question: "How are student progress and performance tracked?",
    answer:
      "Students undergo regular assessments, assignments, and progress reviews. Parents also receive periodic updates to monitor academic growth.",
  },
  
  {
    question: "Do you provide Foundation Programs?",
    answer:
      "Yes. Our Foundation Program is available for students from KG to Grade 12. It focuses on strengthening core concepts, improving critical thinking, and building academic confidence.",
  }, 
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
             FAQs
          </span>

          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tight">
            Have Questions?{" "}<br/>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              We're Here to Help.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Find answers to the most common questions about our programs,
            curriculum, learning process, and enrollment.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="mx-auto mt-8 max-w-3xl space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-[0_15px_45px_rgba(59,111,182,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(59,111,182,0.12)]"
            >
              <button
                onClick={() => toggleFAQ(index)}
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