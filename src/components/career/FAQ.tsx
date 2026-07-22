"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What are the qualifications required to teach at Edvora?",
    answer: "We look for educators who have deep subject expertise, a degree in their respective teaching fields, and a genuine passion for mentoring students. Prior online teaching experience is a plus, but not mandatory.",
  },
  
  {
    question: "How long does the teacher recruitment process take?",
    answer: "Our hiring process is extremely fast! From application submission to final verification and workspace training, it typically takes 1 to 2 days to get fully onboarded and start connecting with students.",
  },
  {
    question: "Can I choose my own flexible teaching hours?",
    answer: "Absolutely! Edvora offers complete flexibility. You can choose the batches and teaching slots that work best with your schedule, helping you maintain a perfect work-life balance.",
  },
 
];

export default function CareerFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-8 lg:py-10 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -left-32 top-10 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute -right-32 bottom-10 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
            <HelpCircle size={16} />
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tight -mt-4">
            Frequently Asked<br/>
            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Everything you need to know about teaching, onboarding, and growing with Edvora.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 -mt-9">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-slate-100 bg-white shadow-[0_4px_25px_rgba(59,111,182,.03)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(59,111,182,.06)] overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-5 p-6 text-left"
                >
                  <span className="text-lg font-bold text-navy group-hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-navy transition-all duration-300 ${
                      isOpen ? "bg-primary text-white rotate-180" : "group-hover:bg-slate-200"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-50 p-6 pt-0 text-slate-600 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
