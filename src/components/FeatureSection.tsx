

"use client";

import Image from "next/image";
import {
  GraduationCap,
  CalendarCheck,
  Users,
  ShieldCheck,
  Globe,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Teachers",
    desc: "Learn from experienced mentors and educators who guide students every step of the way.",
    image: "/features/expert-teachers.jpg",
    label: "Mentors",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Classes",
    desc: "Attend sessions at convenient timings and schedule demos easily.",
    image: "/features/flexible-cls.jpg",
    label: "Schedule",
  },
  {
    icon: Users,
    title: "Personal Attention",
    desc: "Small batches and one-to-one support help students achieve better results.",
    image: "/features/personal-attention.jpg",
    label: "Support",
  },
  {
    icon: ShieldCheck,
    title: "Safe Learning Space",
    desc: "A secure and monitored environment for every student.",
    image: "/features/safe-learning.jpg",
    label: "Safety",
  },
  {
    icon: BookOpen,
    title: "Interactive Learning",
    desc: "Assignments, quizzes and engaging activities make learning fun.",
    image: "/features/interactive-learning.jpg",
    label: "Learning",
  },
  {
    icon: Globe,
    title: "Learn Anywhere",
    desc: "Access your classes and resources from anywhere in the world.",
    image: "/features/learn-anywhere.jpg",
    label: "Anywhere",
  },
];

export default function FeatureSection() {
  return (
    <section className="relative overflow-hidden py-15 lg:py-10">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-secondary/10 rounded-full blur-[140px]" />

      {/* Floating Decorations */}
      <div className="absolute top-20 left-10 text-primary/10 animate-float-slow">
        <GraduationCap size={120} />
      </div>

      <div className="absolute bottom-20 right-10 text-secondary/10 animate-float-medium">
        <BookOpen size={120} />
      </div>

      <div className="max-w-7xl mx-auto px-2 relative z-10">

        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center mb-10">

          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
          ✨ Why Students Love Edvora
          </div>

          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tight">
            Everything Students Need
            <br />

            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
              To Learn And Grow
            </span>
          </h2>

          <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Edvora combines expert mentoring, interactive learning,
            and personalized guidance to help students achieve
            academic excellence and build confidence for the future.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] bg-white/75 backdrop-blur-xl  border border-white/70 shadow-xl hover:-translate-y-4 hover:shadow-[0_30px_70px_rgba(59,117,177,0.18)] transition-all duration-500">

                {/* Image */}
                <div className="relative h-56 overflow-hidden">

                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"/>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Icon */}
                  <div className=" absolut top-5 left-5 w-14 h-14 rounded-2x bg-white/20 backdrop-blur-lg border border-white/30  flex items-center  justify-center     text-white">
                 
                <Icon size={28} />
                  </div>

                  {/* Label */}
                  <div className="
                  absolute
                  top-5
                  right-5
                  px-4
                  py-1.5
                  rounded-full
                  bg-secondary
                  text-white
                  text-xs
                  font-bold
                ">
                    {feature.label}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">

                  <h3 className="text-2xl font-bold text-navy mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed mb-6">
                    {feature.desc}
                  </p>

                  <button className="
                  flex
                  items-center
                  gap-2
                  text-primary
                  font-semibold
                  group-hover:gap-4
                  transition-all duration-300
                ">
                    Learn More
                    <ArrowRight size={18} />
                  </button>

                </div>

                {/* Hover Glow */}
                <div className="
                absolute
                -top-10
                -right-10
                w-32
                h-32
                bg-primary/10
                rounded-full
                blur-3xl
                opacity-0
                group-hover:opacity-100
                transition-all duration-500
              " />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}


       

        {/* LEFT BAG */}
        <div className="relative mt-8 overflow-hidden rounded-[35px] bg-gradient-to-r from-primary via-navy to-primary px-6 py-5 md:px-10 md:py-6 lg:px- lg:py-14 shadow-[0_25px_60px_rgba(59,117,177,0.35)]">

          {/* Left Bag */}
          <div className="absolute left-0 bottom-0 z-0 hidden md:block">
            <img
              src="/features/blue-bag.png"
              alt="School Bag"
              className="
                w-20 sm:w-28 md:w-40 lg:w-64
                object-contain
                opacity-80 md:opacity-100
                animate-float-slow"
            />
          </div>



          {/* Right Books */}
          <div className="absolute right-0 bottom-0 z-0 hidden md:block">



            <img
              src="/features/book-stack-removebg-preview.png"
              alt="Books"
              className="w-24 sm:w-32 md:w-44 lg:w-60 h-auto object-contain  animate-float-medium "
            />
          </div>



          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[320px] md:h-[320px] bg-secondary/20 rounded-full blur-[100px]" />

          {/* Center Content */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-xl px-4 py-2 rounded-full text-white/90 text-xs sm:text-sm font-semibold mb-3">
              ✨ Trusted by 10,000+ Students
            </div>

            {/* Heading */}
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
              Ready To Begin Your
              <br />
              <span className="text-secondary">
                Learning Journey?
              </span>
            </h3>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-5">
              Join thousands of students already learning and growing with
              Edvora through expert teachers, interactive lessons and
              personalised guidance.
            </p>

            {/* Button */}
            <button
              className="
        bg-secondary
        px-6 py-2.5
        sm:px-7 sm:py-3
        rounded-full
        font-bold
        text-sm sm:text-base
        text-white
        hover:scale-105
        transition-all duration-300
        shadow-[0_10px_30px_rgba(111,168,67,0.4)]
        inline-flex
        items-center
        gap-3
      "
            >
              Start Learning Today
              <ArrowRight size={20} />
            </button>

          </div>
        </div>



      </div>


    </section>
  );
}