"use client";

import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

export default function ContactForm() {
  return (
    <section className="relative overflow-hidden py-4 md:py-6 lg:py-8 ">

      {/* Background Glow */}

      <div className="absolute -top-20 left-0 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-secondary/10 blur-[120px]" />

      <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto mb-4 md:mb-6 lg:mb-8">

          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-3 md:mb-4">
            CONTACT US
          </span>

          <h2 className=" text-4xl md:text-5xl font-[950] text-navy leading-tight">

            Let's Start a<br/>

            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
              Conversation
            </span>

          </h2>

          <p className="mt-4 md:mt-6 text-lg text-slate-600 leading-relaxed">

            Have questions about our programs? We'd love to hear from you.
            Fill out the form below and our academic team will get back to you shortly.

          </p>

        </div>

            <div className="grid grid-cols-1 gap-4 lg:gap-5 items-center">

            <div className="relative w-full max-w-2xl mx-auto">

              <div className="w-full rounded-[36px] bg-white/500 backdrop-blur-xl border border-white shadow-[0_25px_80px_rgba(59,111,182,0.08)] p-8 lg:p-12">

                <form className="space-y-6">

                  {/* Name */}

                  <div>

                    <label className="mb-2 block font-semibold text-navy">
                      Full Name
                    </label>

                    <div className="relative">

                      <User
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-primary"
                        size={20}
                      />

                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-5 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />

                    </div>

                  </div>

                  {/* Email */}

                  <div>

                    <label className="mb-2 block font-semibold text-navy">
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-primary"
                        size={20}
                      />

                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-5 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />

                    </div>

                  </div>

                  {/* Phone */}

                  <div>

                    <label className="mb-2 block font-semibold text-navy">
                      Phone Number
                    </label>

                    <div className="relative">

                      <Phone
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-primary"
                        size={20}
                      />

                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-5 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />

                    </div>

                  </div>

                  {/* Message */}

                  <div>

                    <label className="mb-2 block font-semibold text-navy">
                      Message
                    </label>

                    <div className="relative">

                      <MessageSquare
                        className="absolute left-5 top-6 text-primary"
                        size={20}
                      />

                      <textarea
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-5 outline-none transition-all resize-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />

                    </div>

                  </div>

                  {/* Button */}

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,111,182,0.25)]"
                  >

                    Send Message

                    <Send
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />

                  </button>

                </form>

              </div>

            </div>

          <div className="relative">

            {/* Glow */}

            <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-primary/10 blur-[100px]" />

            <div className="absolute -bottom-10 right-0 w-60 h-60 rounded-full bg-secondary/10 blur-[100px]" />

            

          </div>
          
          </div>

        </div>

      

      </section>
    );
}