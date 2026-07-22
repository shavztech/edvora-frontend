
"use client";

import Image from "next/image";
import { Star, Quote, Award, Users } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    subject: "Mathematics Mentor",
    experience: "12 Years Experience",
    rating: 5,
    image: "/career/teacher1.jpg",
    quote:
      "Teaching at Edvora has transformed my career. The platform, support team and students make every class enjoyable.",
  },
  {
    name: "David Wilson",
    subject: "Science Mentor",
    experience: "8 Years Experience",
    rating: 5,
    image: "/career/teacher2.jpg",
    quote:
      "I love the flexibility and the opportunity to teach students across the country while working from home.",
  },
  {
    name: "Emily Thomas",
    subject: "English Mentor",
    experience: "10 Years Experience",
    rating: 5,
    image: "/career/teacher3.jpg",
    quote:
      "Edvora provides everything a teacher needs—from digital resources to continuous professional development.",
  },
];

export default function TeacherTestimonials() {
  return (
    <section className="relative py-6 lg:py-7 overflow-hidden">

      {/* Background */}

      <div className="absolute -left-40 top-0 w-[420px] h-[420px] rounded-full bg-primary/10 blur-[140px]" />

      <div className="absolute -right-40 bottom-0 w-[420px] h-[420px] rounded-full bg-secondary/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center mb-20">

          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">

            <Users size={18} />

            OUR EDUCATORS

          </span>

          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tight -mt-3 lg:-mt-4">

            Hear From Our<br/>

            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
              Expert Teachers

            </span>

          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">

            Our educators are the heart of Edvora. Here's what they say
            about teaching, growing and inspiring thousands of students.

          </p>

        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 gap-8 -mt-14 lg:-mt-12">

          {testimonials.map((teacher, index) => (

            <div
              key={index}
              className="group relative rounded-[32px] overflow-hidden bg-white border border-slate-100 shadow-[0_20px_60px_rgba(59,111,182,.08)] hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(59,111,182,.18)] transition-all duration-500"
            >

              {/* Top Gradient */}

              <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-secondary" />

              <div className="p-8">

                {/* Quote */}

                <div className="absolute top-6 right-6 text-primary/10">

                  <Quote size={80} />

                </div>

                {/* Teacher */}

                <div className="flex items-center gap-5">

                  <div className="relative">

                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover border-4 border-primary/10"
                    />

                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">

                      <Award
                        size={16}
                        className="text-white"
                      />

                    </div>

                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-navy">

                      {teacher.name}

                    </h3>

                    <p className="text-primary font-semibold">

                      {teacher.subject}

                    </p>

                    <p className="text-sm text-slate-500 mt-1">

                      {teacher.experience}

                    </p>

                  </div>

                </div>

                {/* Rating */}

                <div className="flex gap-1 mt-6">

                  {[...Array(teacher.rating)].map((_, i) => (

                    <Star
                      key={i}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />

                  ))}

                </div>

                {/* Quote */}

                <p className="mt-6 text-slate-600 leading-relaxed italic">

                  "{teacher.quote}"

                </p>

                
                {/* Bottom */}

                <div className="mt-8 flex items-center justify-between">

                  <div>

                    <span className="text-sm font-semibold text-secondary">
                      Verified Edvora Mentor
                    </span>

                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-all duration-500">

                    <Award size={22} />

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


