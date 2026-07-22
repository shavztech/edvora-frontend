
"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How can I enroll my child at Edvora?",
    answer:
      "Getting started is easy. Simply book a free demo class, speak with our academic counsellor, choose the right learning program, and complete the enrollment process online.",
  },
  {
    question: "Do you provide a free demo class?",
    answer:
      "Yes. Every student can attend a free demo session to experience our teaching methodology, interact with mentors, and understand how Edvora's learning platform works.",
  },
  {
    question: "Are all classes conducted live?",
    answer:
      "Yes. Our expert mentors conduct interactive live classes. Students also receive access to recorded sessions for future revision whenever needed.",
  },

];

export default function FAQSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-3  lg:py-2">

      {/* Background Glow */}

      <div className="absolute -left-32 top-0 w-[380px] h-[380px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="absolute -right-32 bottom-0 w-[380px] h-[380px] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-12">

          <span className="inline-flex items-start gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs">

            <HelpCircle size={18} />

            FAQs

          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-[950] text-navy leading-tight">

            Have Questions?<br />

            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent ">

              We've Got Answers

            </span>

          </h2>

          <p className="mt-4 md:mt-9 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">

            Find answers to the most common questions about admissions,
            live classes, learning programs, mentors, and student support.

          </p>

        </div>

        {/* FAQ List */}

        <div className="space-y-6 -mt-6">

          {faqs.map((faq, index) => {

            const isOpen = active === index;

            return (

              <div
                key={index}
                className="group overflow-hidden rounded-[28px] max-w-lg mx-auto border border-slate-200 bg-white shadow-[0_15px_45px_rgba(59,111,182,.06)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(59,111,182,.12)]"
              >

                <button
                  onClick={() =>
                    setActive(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >

                  <h3 className="text-lg md:text-xl font-bold text-navy pr-6">

                    {faq.question}

                  </h3>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 ${isOpen ? "rotate-180 bg-primary text-white" : ""
                      }`}
                  >

                    <ChevronDown size={22} />

                  </div>

                </button>

                {/* Answer continues in Response 2 */}


                <div
                  className={`grid transition-all duration-500 ease-in-out ${isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">

                    <div className="border-t border-slate-100 px-6 pb-4 pt-3">

                      <p className="text-slate-600 leading-8">

                        {faq.answer}

                      </p>

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


