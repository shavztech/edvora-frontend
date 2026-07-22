
// "use client";

// import Image from "next/image";
//  import { Users } from "lucide-react";
//  import { CheckCircle } from "lucide-react";

//  const features = [
//   "One-to-One Mentoring",
//    "Live Interactive Classes",
//    "Progress Analytics",
//    "Parent Reports",
//    "Expert Teachers"
//  ];

//  export default function WhyEdvora() {
//    return (
//      <section className="py-1 lg:py-6">
//   <div className="flex justify-center mb-2">
//     <span className="inline-flex px-5 py-2 rounded-full bg-secondary/10 text-secondary font-semibold mb-6">
//       WHY EDVORA ?
//     </span>
//   </div>

//   {/* Heading */}
// <h2 className="text-5xl font-bold text-navy text-left lg:text-right mr-60 ">
//   Why Parents Choose <br />
//   Edvora
// </h2>

// <div className="grid gap-8 md:grid-cols-2 items-center">
//   {/* Image Container */}
//   <div className="relative flex justify-center mb-3 lg:mb-0">
//     <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
//     <div className="relative rounded-[38px] overflow-hidden p-2">
//       <Image src="/about/why-edvora.jpg" alt="Why Edvora" width={460} height={550} className="rounded-[30px] object-cover" />
//     </div>
//     <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-xl rounded-3xl px-6 py-5 border border-white shadow-xl animate-float-slow">
//       <div className="flex items-center gap-4">
//         <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-green-500 flex items-center justify-center text-white">
//           <Users size={26} />
//         </div>
//         <div>
//           <h3 className="text-2xl font-black text-navy">10K+</h3>
//           <p className="text-sm text-slate-500">Happy Learners</p>
//         </div>
//       </div>
//     </div>
//   </div>
//   {/* Feature List */}
//   <div className="space-y-5">
//     {features.map((feature) => (
//       <div className="flex items-center gap-6" key={feature}>
//         <CheckCircle className="text-secondary" />
//         <span>{feature}</span>
//       </div>
//     ))}
//   </div>
// </div>
// </section>
//   );
// }


"use client";

import Image from "next/image";
import { Users, CheckCircle } from "lucide-react";

const features = [
  {
    title: "One-to-One Mentoring",

  },
  {
    title: "Live Interactive Classes",

  },
  {
    title: "Progress Analytics",

  },

  {
    title: "Expert Teachers",

  },
];

export default function WhyEdvora() {
  return (
    <section className="py-4 lg:py-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Badge */}
        <div className="flex justify-center mb-5">
          <span className="inline-flex rounded-full bg-secondary/10 px-5 py-2 font-semibold text-secondary">
            WHY EDVORA?
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT IMAGE */}
            <div className="relative flex justify-center order-2 lg:order-1 hidden lg:block">

            <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-primary/15 to-secondary/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px]">
              <Image
                src="/about/why-edvora.jpg"
                alt="Why Edvora"
                width={500}
                height={620}
                className="rounded-[32px] object-cover shadow-2xl"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 rounded-3xl border border-white bg-white/90 backdrop-blur-xl p-5 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-green-500 text-white">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-navy">10K+</h3>
                  <p className="text-sm text-slate-500">Happy Learners</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT CONTENT */}
          <div className="order-1 lg:order-2">

              <h2 className="text-4xl md:text-5xl font-black text-navy leading-tight">
                Why Parents Choose
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Edvora
                </span>
              </h2>
 
  <div className="relative flex justify-center mb-4 lg:hidden">
  <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-primary/15 to-secondary/15 blur-3xl" />
  <div className="relative overflow-hidden rounded-[32px]">
    <Image src="/about/why-edvora.jpg" alt="Why Edvora" width={500} height={620} className="rounded-[32px] object-cover shadow-2xl" />
  </div>
  <div className="absolute bottom-6 right-2 rounded-3xl border border-white bg-white/90 backdrop-blur-xl p-5 shadow-2xl">
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-green-500 text-white">
        <Users size={24} />
      </div>
      <div>
        <h3 className="text-2xl font-black text-navy">10K+</h3>
        <p className="text-sm text-slate-500">Happy Learners</p>
      </div>
    </div>
  </div>
</div>

            {/* Feature Cards for Desktop */}
            <div className="hidden lg:block mt-6 space-y-3 flex flex-col items-center">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-5 rounded-3xl border border-slate-200 bg-white py-4 px-6 max-w-[550px] w-full mx-auto shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-secondary bg-secondary text-white transition-all">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
            {/* Feature Cards for Mobile/Tablet */}
            <div className="mt-4 lg:hidden space-y-3 flex flex-col items-center">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-5 rounded-3xl border border-slate-200 bg-white py-4 px-6 max-w-[550px] w-full mx-auto shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-secondary bg-secondary text-white transition-all">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}