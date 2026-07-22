// // import {
// //   BookOpen,
// //   Video,
// //   BarChart3,
// //   Trophy,
// //   Users,
// //   ClipboardCheck
// // } from "lucide-react";

// // const items = [
// //   BookOpen,
// //   Video,
// //   BarChart3,
// //   Trophy,
// //   Users,
// //   ClipboardCheck
// // ];

// // export default function LearningEcosystem() {
// //   return (
// //     <section className="py-24">
// //       <div className="max-w-7xl mx-auto px-6">
// //         <h2 className="text-center text-5xl font-bold text-navy mb-16">
// //           Learning Ecosystem
// //         </h2>

// //         <div className="grid md:grid-cols-3 gap-8">
// //           {items.map((Icon,index)=>(
// //             <div key={index} className="bg-white rounded-3xl p-10 shadow-xl text-center">
// //               <Icon className="mx-auto text-primary" size={50}/>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }



// "use client";

// import {
//   BookOpen,
//   MonitorPlay,
//   BarChart3,
//   Trophy,
//   Users,
//   ClipboardCheck,
// } from "lucide-react";

// const ecosystem = [
//   {
//     icon: BookOpen,
//     title: "Smart Curriculum",
//     description:
//       "A structured KG–12 curriculum designed to make learning engaging, practical and future-ready.",
//     gradient: "from-primary to-blue-500",
//   },
//   {
//     icon: MonitorPlay,
//     title: "Interactive Live Classes",
//     description:
//       "Attend live sessions with experienced mentors, ask questions instantly and collaborate with peers.",
//     gradient: "from-secondary to-green-500",
//   },
//   {
//     icon: BarChart3,
//     title: "Performance Analytics",
//     description:
//       "Track academic progress with detailed reports, insights and personalized recommendations.",
//     gradient: "from-purple-500 to-pink-500",
//   },
//   {
//     icon: ClipboardCheck,
//     title: "Assignments & Assessments",
//     description:
//       "Practice with quizzes, assignments and regular evaluations to strengthen concepts.",
//     gradient: "from-orange-400 to-amber-500",
//   },
//   {
//     icon: Users,
//     title: "Parent Dashboard",
//     description:
//       "Parents can monitor attendance, assignments, academic progress and mentor feedback.",
//     gradient: "from-cyan-500 to-sky-500",
//   },
//   {
//     icon: Trophy,
//     title: "Achievements & Rewards",
//     description:
//       "Earn certificates, badges and recognition for academic excellence and consistent performance.",
//     gradient: "from-emerald-500 to-lime-500",
//   },
// ];

// export default function LearningEcosystem() {
//   return (
//     <section className="relative py-20 lg:py-14 overflow-hidden">

//       {/* Background Glow */}

//       <div className="absolute -left-20 top-0 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[120px]" />

//       <div className="absolute right-0 bottom-0 w-[350px] h-[350px] rounded-full bg-secondary/10 blur-[120px]" />

//       {/* Grid Background */}

//       <div className="absolute inset-0 bg-[linear-gradient(rgba(59,111,182,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,111,182,0.03)_1px,transparent_1px)] bg-[size:34px_34px]" />

//       <div className="relative max-w-7xl mx-auto px-6">

//         {/* Heading */}

//         <div className="text-center max-w-3xl mx-auto">

//           <span className="inline-flex px-5 py-2 rounded-full bg-primary/10 text-primary font-semibold">
//             LEARNING ECOSYSTEM
//           </span>

//           <h2 className="mt-6 text-4xl md:text-5xl font-black text-navy leading-tight">
//             Everything Students Need
//             <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//               To Learn, Grow & Succeed
//             </span>
//           </h2>

//           <p className="mt-6 text-lg text-slate-600 leading-relaxed">
//             Edvora combines innovative technology, experienced mentors and
//             personalized learning experiences into one complete education
//             ecosystem.
//           </p>

//         </div>

//         {/* Cards */}

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

//           {ecosystem.map((item, index) => {

//             const Icon = item.icon;

//             return (

//               <div
//                 key={index}
//                 className="group relative overflow-hidden rounded-[32px] bg-white/75 backdrop-blur-xl border border-white p-8 shadow-[0_20px_60px_rgba(59,111,182,0.08)] hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(59,111,182,0.18)] transition-all duration-500"
//               >

//                 {/* Glow */}

//                 <div
//                   className={`absolute -top-20 -right-20 w-44 h-44 rounded-full bg-gradient-to-br ${item.gradient} opacity-15 blur-3xl group-hover:scale-125 transition-all duration-700`}
//                 />

//                 {/* Icon */}

//                 <div
//                   className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
//                 >
//                   <Icon size={30} />
//                 </div>

//                 {/* Title */}

//                 <h3 className="text-2xl font-black text-navy">
//                   {item.title}
//                 </h3>

//                 {/* Description */}

//                 <p className="mt-4 text-slate-600 leading-relaxed">
//                   {item.description}
//                 </p>

                
//                 {/* Bottom Gradient Line */}

//                 <div
//                   className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${item.gradient} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
//                 />

//               </div>

//             );

//           })}

//         </div>

//         {/* Bottom CTA */}

//         <div className="mt-24">

//           <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-primary via-[#4d82cb] to-secondary p-[1px]">

//             <div className="relative rounded-[35px] bg-white/90 backdrop-blur-xl px-8 py-12 md:px-16 md:py-16">

//               {/* Glow */}

//               <div className="absolute -left-20 top-0 w-56 h-56 rounded-full bg-primary/10 blur-[120px]" />
//               <div className="absolute -right-20 bottom-0 w-56 h-56 rounded-full bg-secondary/10 blur-[120px]" />

//               <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">

//                 <div className="max-w-2xl">

//                   <span className="inline-flex px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
//                     Complete Learning Platform
//                   </span>

//                   <h3 className="mt-5 text-3xl md:text-4xl font-black text-navy leading-tight">
//                     A Complete Digital Learning
//                     <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                       Ecosystem For Every Student
//                     </span>
//                   </h3>

//                   <p className="mt-5 text-slate-600 text-lg leading-relaxed">
//                     From live interactive classes and personalized mentoring
//                     to assessments, analytics and parent monitoring,
//                     Edvora provides everything required for academic success
//                     under one platform.
//                   </p>

//                 </div>

//                 <div className="flex flex-wrap gap-4 justify-end">

//                   <button className="rounded-full bg-gradient-to-r from-primary to-blue-500 text-white px-8 py-4 font-bold shadow-[0_8px_25px_rgba(59,111,182,0.25)] hover:scale-105 hover:shadow-[0_12px_35px_rgba(59,111,182,0.45)] transition-all duration-300">
//                     Explore Programs
//                   </button>

//                   <button className="rounded-full bg-gradient-to-r from-secondary to-emerald-500 text-white px-8 py-4 font-bold shadow-[0_8px_25px_rgba(111,168,67,0.4)] hover:scale-110 hover:shadow-[0_12px_35px_rgba(111,168,67,0.6)] transition-all duration-300">
//                     Book Free Demo
//                   </button>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }



