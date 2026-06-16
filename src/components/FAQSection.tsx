"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles, Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does the demo session initialize?",
    answer:
      "The demo session is a live, high-density class where the student interacts directly with a verified mentor to understand the teaching methodology and syllabus alignment.",
  },
  {
    question: "Is the initial demo consultation free?",
    answer:
      "Yes, the demo session is completely free. It is designed to ensure a perfect match between student requirements and mentor expertise before any commitment.",
  },
  {
    question: "What is the mentor assignment protocol?",
    answer:
      "Mentors are assigned through our rigorous administrative console based on specific subject expertise, teaching style, and student performance goals.",
  },
  {
    question: "Can I specify a technical subject focus?",
    answer:
      "Absolutely. During the demo booking initialization, you can define your specific subject focus to ensure the session is hyper-targeted to your needs.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number): void => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Information Desk</span>
           </div>
           <h2 className="text-4xl font-[950] text-slate-950 tracking-tighter">Operational <span className="text-indigo-600">F.A.Q</span></h2>
           <p className="text-slate-500 font-bold text-base">Key protocol details for students and mentors entering the ecosystem.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`group rounded-[2rem] border transition-all duration-500 ${
                  isOpen ? "bg-slate-50 border-indigo-100" : "bg-blue-50 border-slate-100 hover:border-slate-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-8 text-left outline-none"
                >
                  <span className={`text-lg font-[900] tracking-tight transition-colors ${
                    isOpen ? "text-indigo-600" : "text-slate-900"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    isOpen ? "bg-indigo-600 text-white rotate-180" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                  }`}>
                     <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-8 pb-8 text-slate-500 font-bold text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
