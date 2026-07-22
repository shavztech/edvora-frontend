
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 98765 43210",
    subtitle: "Mon – Sat | 9:00 AM – 6:00 PM",
    bg: "bg-gradient-to-br from-emerald-400 to-green-500",
    textColor: "text-white",
    lineBg: "bg-gradient-to-br from-emerald-400 to-green-500",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "support@edvora.com",
    subtitle: "We'll reply within 24 hours",
    bg: "bg-gradient-to-br from-sky-400 to-blue-500",
    textColor: "text-white",
    lineBg: "bg-gradient-to-br from-sky-400 to-blue-500",
    href: "mailto:support@edvora.com",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    value: "Chat With Us",
    subtitle: "Instant Support Available",
    bg: "bg-gradient-to-br from-purple-500 to-pink-500",
    textColor: "text-white",
    lineBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    href: "#contact-form",
  },
];

export default function ContactInfo() {
  return (
    <section className="relative overflow-hidden py-4 md:py-6 lg:py-8">

      {/* Background Glow */}

      <div className="absolute -left-40 top-0 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="absolute -right-40 bottom-0 w-[350px] h-[350px] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8 lg:mb-19">

          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs ">
            CONTACT INFORMATION

          </span>

          <h2 className="mt-1 md:mt-3 lg:mt-5 text-4xl md:text-5xl font-[950] text-navy leading-tight">

            We're Always<br/>

            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent mt-3 md:mt-5">

              Here To Help

            </span>

          </h2>

          <p className="mt-6 md:mt-9 text-lg text-primary leading-relaxed">

            Reach out through your preferred communication channel.
            Our team is always happy to assist parents, students,
            mentors and schools.

          </p>

        </div>

        {/* Cards */}

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-4 md:gap-3 px-4">

          {contactInfo.map((item, index) => (

            <Link
              key={index}
              href={item.href}
              className="group relative overflow-hidden rounded-[32px] border border-slate-100 bg-white p-6 md:p-8 flex flex-col h-auto justify-between shadow-[0_20px_60px_rgba(59,111,182,.08)] hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(59,111,182,.18)] transition-all duration-500 w-full"
            >

              {/* Top Gradient */}



              {/* Icon */}

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center ${item.bg} ${item.textColor} group-hover:scale-110 transition-all duration-300`}>
                  <item.icon className="w-6 h-6 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </div>
                <p className="mt-0 text-lg font-semibold text-navy">{item.value}</p>
              </div>

              {/* Subtitle */}

              <p className="mt-2 text-slate-500 leading-relaxed">

                {item.subtitle}

              </p>


              {/* Arrow */}

              <div className="mt-6 md:mt-auto flex items-center justify-between">
                <span className="text-primary font-semibold">
                  Contact Now
                </span>

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.textColor} group-hover:rotate-45 transition-all duration-300`}>
                  <ArrowRight size={20} />
                </div>
              </div>

              {/* Hover Glow */}

              <div className="absolute -right-16 -bottom-16 w-36 h-36 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

            </Link>

          ))}

        </div>

        {/* Bottom CTA */}

        <div className="mt-14 md:mt-20 lg:mt-40 px-4 md:px-0">

          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-primary via-[#4B7CC0] to-secondary p-[1px]">

            <div className="rounded-[35px] bg-white/90 backdrop-blur-xl px-8 py-12 md:px-16 md:py-14">

              <div className="absolute -left-24 top-0 w-72 h-72 rounded-full bg-primary/10 blur-[120px]" />

              <div className="absolute -right-24 bottom-0 w-72 h-72 rounded-full bg-secondary/10 blur-[120px]" />

              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">

                <div>

                  <span className="inline-flex rounded-full bg-secondary/10 px-4 py-2 text-secondary font-semibold">

                    Need Immediate Assistance?

                  </span>

                  <h3 className="mt-5 text-3xl md:text-4xl font-black text-navy">

                    Let's Start Your

                    <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">

                      Learning Journey Today

                    </span>

                  </h3>

                  <p className="mt-5 text-slate-600 max-w-xl leading-relaxed">

                    Our team is always available to help you choose
                    the right learning program and answer any
                    questions about Edvora.

                  </p>

                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/book-demo"
                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-blue-500 px-8 py-3.5 text-base text-white font-bold shadow-[0_8px_25px_rgba(59,111,182,0.25)] hover:scale-105 hover:shadow-[0_12px_35px_rgba(59,111,182,0.45)] transition-all duration-300"
                  >
                    Book Free Demo
                  </Link>
                  <button className="inline-block w-24 h-24 cursor-pointer hover:scale-110 transition-transform duration-300"><img src="/whatsapp.png" alt="WhatsApp" className="w-full h-full" /></button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>



    </section>
  );
}



