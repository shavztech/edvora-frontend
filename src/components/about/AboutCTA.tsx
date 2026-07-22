// 



// "use client";

// import Image from "next/image";
// import {
//   GraduationCap,
//   CalendarCheck,
//   Users,
//   ShieldCheck,
//   Globe,
//   ArrowRight,
//   BookOpen,
// } from "lucide-react";
// <div>
// {/* LEFT BAG */}
//         <div className="relative mt-20 overflow-hidden rounded-[35px] bg-gradient-to-r from-primary via-navy to-primary px-6 py-5 md:px-10 md:py-6 lg:px-14 lg:py-8 shadow-[0_25px_60px_rgba(59,117,177,0.35)]">

//           {/* Left Bag */}
//           <div className="absolute left-0 bottom-0 z-0 hidden md:block">
//             <img
//               src="/features/blue-bag-removebg-preview.png"
//               alt="School Bag"
//               className="
//         w-20 sm:w-28 md:w-40 lg:w-64
//         object-contain
//         opacity-80 md:opacity-100
//         animate-float-slow
//       "
//             />
//           </div>

//           {/* Left Plant */}
//           {/* <div className="absolute left-16 bottom-0 z-0">
//     <img
//       src="/features/plant-left.png"
//       alt="Plant"
//       className="
//         w-10 sm:w-14 md:w-16 lg:w-20
//         object-contain
//         animate-float-medium
//       "
//     />
//   </div> */}

//           {/* Right Books */}
//           <div className="absolute right-0 bottom-0 z-0 hidden md:block">
//             {/* <img
//       src="/features/book-stack-removebg-preview.png"
//       alt="Books"
//       className="
//         w-20 sm:w-32 md:w-44 lg:w-72
//         object-contain
//         opacity-80 md:opacity-100
//         animate-float-medium
//       "
//     /> */}

//             {/* <img
//   src="/features/book-stack-removebg-preview.png"
//   alt="Books"
//   className="
//     w-60 h-60
//     sm:w-32 sm:h-28
//     md:w-44 md:h-36
//     lg:w-[280px] lg:h-[180px]
//     object-contain
//     opacity-80 md:opacity-100
//     animate-float-medium
//   "
// /> */}
//             <img
//               src="/features/book-stack-removebg-preview.png"
//               alt="Books"
//               className="
//     w-24
//     sm:w-32
//     md:w-44
//     lg:w-60
//     h-auto
//     object-contain
//     animate-float-medium
//   "
//             />
//           </div>

//           {/* Right Plant */}
//           {/* <div className="absolute right-16 bottom-0 z-0">
//     <img
//       src="/features/plant-right.png"
//       alt="Plant"
//       className="
//         w-10 sm:w-14 md:w-16 lg:w-20
//         object-contain
//         animate-float-fast
//       "
//     />
//   </div> */}


//           {/* Background Glow */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[320px] md:h-[320px] bg-secondary/20 rounded-full blur-[100px]" />

//           {/* Center Content */}
//           <div className="relative z-10 text-center max-w-3xl mx-auto">

//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-xl px-4 py-2 rounded-full text-white/90 text-xs sm:text-sm font-semibold mb-3">
//               ✨ Trusted by 10,000+ Students
//             </div>

//             {/* Heading */}
//             <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
//               Ready To Begin Your
//               <br />
//               <span className="text-secondary">
//                 Learning Journey?
//               </span>
//             </h3>

//             {/* Description */}
//             <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-5">
//               Join thousands of students already learning and growing with
//               Edvora through expert teachers, interactive lessons and
//               personalised guidance.
//             </p>

//             {/* Button */}
//             <button
//               className="
//         bg-secondary
//         px-6 py-2.5
//         sm:px-7 sm:py-3
//         rounded-full
//         font-bold
//         text-sm sm:text-base
//         text-white
//         hover:scale-105
//         transition-all duration-300
//         shadow-[0_10px_30px_rgba(111,168,67,0.4)]
//         inline-flex
//         items-center
//         gap-3
//       "
//             >
//               Start Learning Today
//               <ArrowRight size={20} />
//             </button>

//           </div>
//         </div>



//       </div>
      

"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-6 lg:py-9">
      <div className="max-w-7xl mx-auto px-6">

        {/* CTA Banner */}
        <div className="relative overflow-hidden rounded-[35px] bg-gradient-to-r from-primary via-navy to-primary px-6 py-5 md:px-10 md:py-6 lg:px-14 lg:py-8 shadow-[0_25px_60px_rgba(59,117,177,0.35)]">

          {/* Left Bag */}
          <div className="absolute left-0 bottom-0 z-0 hidden md:block">
            <Image
              src="/features/blue-bag-removebg-preview.png"
              alt="School Bag"
              width={260}
              height={260}
              className="w-20 sm:w-28 md:w-40 lg:w-64 h-auto object-contain animate-float-slow"
            />
          </div>

          {/* Right Books */}
          <div className="absolute right-0 bottom-0 z-0 hidden md:block">
            <Image
              src="/features/book-stack-removebg-preview.png"
              alt="Books"
              width={260}
              height={260}
              className="w-24 sm:w-32 md:w-44 lg:w-60 h-auto object-contain animate-float-medium"
            />
          </div>

          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full bg-secondary/20 blur-[100px]" />

          {/* Content */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-2 text-xs sm:text-sm font-semibold text-white/90 mb-4">
              ✨ Trusted by 10,000+ Students
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Ready To Begin Your
              <br />
              <span className="text-secondary">
                Learning Journey?
              </span>
            </h2>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Join thousands of students already learning and growing with
              Edvora through expert teachers, interactive lessons and
              personalised guidance.
            </p>

            {/* Button */}
            <button className="inline-flex items-center gap-3 rounded-full bg-secondary px-7 py-3 text-white font-bold shadow-[0_10px_30px_rgba(111,168,67,0.4)] hover:scale-105 transition-all duration-300">
              Start Learning Today
              <ArrowRight size={20} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}