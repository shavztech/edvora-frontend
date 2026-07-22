"use client";

import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  MessageCircleMore,
  BarChart3,
  Laptop,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Teachers",
    description:
      "Learn from experienced educators dedicated to helping every student succeed.",
  },
  {
    icon: Users,
    title: "One-on-One Classes",
    description:
      "Personalized live sessions focused on each student's learning pace and goals.",
  },
  {
    icon: BookOpen,
    title: "Foundation & Curriculum Learning",
    description:
      "Build strong concepts while covering your complete school syllabus.",
  },
  {
    icon: ClipboardCheck,
    title: "Weekly Assessments",
    description:
      "Regular tests and assignments to monitor learning and improve performance.",
  },
  {
    icon: MessageCircleMore,
    title: "Doubt Clearing",
    description:
      "Interactive sessions where students can ask questions and gain confidence.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Continuous performance monitoring with detailed feedback and improvement plans.",
  },
  {
    icon: Laptop,
    title: "Learn Anywhere",
    description:
      "Attend live online classes from the comfort of your home using any device.",
  },
  {
    icon: ShieldCheck,
    title: "Parent Updates",
    description:
      "Regular communication keeps parents informed about their child's academic progress.",
  },
];

export default function WhyChooseEdvora() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Why Choose Edvora?
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            A Better Way to Learn
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            At Edvora, learning goes beyond completing the syllabus. We
            focus on conceptual understanding, personalized attention,
            and continuous academic growth to help every student reach
            their full potential.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}