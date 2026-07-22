// import { Target, Eye, Heart } from "lucide-react";

// const cards = [
//   {
//     icon: Target,
//     title: "Mission",
//     desc: "Deliver personalized education for every learner."
//   },
//   {
//     icon: Eye,
//     title: "Vision",
//     desc: "Build future-ready students through innovation."
//   },
//   {
//     icon: Heart,
//     title: "Values",
//     desc: "Integrity, excellence and lifelong learning."
//   },
// ];

// export default function MissionVision() {
//   return (
//     <section className="py-24">
//       <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
//         {cards.map((card, index) => (
//           <div key={index} className="bg-white rounded-[32px] p-10 shadow-xl">
//             <card.icon size={50} className="text-primary mb-6" />
//             <h3 className="text-3xl font-bold text-navy mb-4">{card.title}</h3>
//             <p className="text-slate-600">{card.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }



"use client";

import { Target, Eye, Heart } from "lucide-react";

const cards = [
  {
    title: "Our Mission",
    icon: Target,
    color: "from-primary to-blue-500",
    description:
      "To provide every student with high-quality, personalized learning experiences that inspire curiosity, confidence, and academic excellence through expert mentorship and modern technology.",
  },
  {
    title: "Our Vision",
    icon: Eye,
    color: "from-secondary to-green-500",
    description:
      "To become the most trusted digital learning platform for KG–12 students by building a future where every learner reaches their highest potential.",
  },
  {
    title: "Our Values",
    icon: Heart,
    color: "from-purple-500 to-pink-500",
    description:
      "Integrity, innovation, compassion, collaboration and lifelong learning are at the heart of everything we do at Edvora.",
  },
];

export default function MissionVision() {
  return (
    <section className="relative py-5 lg:py-10 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute -top-20 left-0 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-secondary/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-12">

          <span className="inline-flex px-5 py-2 rounded-full bg-secondary/10 text-secondary font-semibold mb-6">
            ✨ OUR PURPOSE
          </span>

          <h2 className=" text-4xl md:text-5xl font-extrabold text-navy">
            Mission, Vision & Values
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed">
            Everything we do is driven by our commitment to empowering
            students with exceptional education, inspiring mentors, and
            innovative learning experiences.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {cards.map((card, index) => {

            const Icon = card.icon;

            return (

              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] bg-white/75 backdrop-blur-xl border border-white/70 p-8 shadow-[0_15px_50px_rgba(59,111,182,0.08)] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_25px_70px_rgba(59,111,182,0.18)]"
              >

                {/* Glow */}

                <div
                  className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${card.color} opacity-15 blur-3xl group-hover:scale-125 transition-all duration-700`}
                />

                {/* Icon */}

                <div
                  className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${card.color}
                  flex items-center justify-center text-white shadow-xl mb-8
                  transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}
                >

                  <Icon size={38} />

                </div>

                {/* Title */}

                <h3 className="relative text-2xl font-bold text-navy mb-5">
                  {card.title}
                </h3>

                {/* Description */}

                <p className="relative text-slate-600 leading-relaxed">
                  {card.description}
                </p>

                {/* Bottom Gradient */}

                <div
                  className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${card.color} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
                />

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}