export default function MentorShowcase() {
  return (
    <section className="py-4 lg:py-8">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-5xl font-bold text-navy mb-11">
          Meet Our Experts
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map((mentor)=>(
            <div key={mentor} className="bg-white rounded-3xl py-14 px-6 shadow-xl text-center flex flex-col justify-between items-center min-h-[420px]">
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-slate-100 shadow-md">
                <img
                  src={`/mentors/mentor-${mentor}.jpg`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-8">
                <h3 className="font-bold text-2xl text-navy">Sarah Johnson</h3>
                <p className="text-slate-500 font-semibold mt-2">Mathematics Mentor</p>
                <p className="text-secondary mt-4 font-bold text-lg">⭐ 4.9 Rating</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   Star,
//   BookOpen,
//   ArrowRight,
//   Linkedin,
//   Mail,
// } from "lucide-react";

// const mentors = [
//   {
//     name: "Sarah Johnson",
//     subject: "Mathematics",
//     experience: "12 Years Experience",
//     rating: "4.9",
//     students: "2,500+ Students",
//     image: "/mentors/mentor1.jpg",
//     gradient: "from-primary to-blue-500",
//   },
//   {
//     name: "David Miller",
//     subject: "Science",
//     experience: "10 Years Experience",
//     rating: "4.8",
//     students: "2,100+ Students",
//     image: "/mentors/mentor2.jpg",
//     gradient: "from-secondary to-green-500",
//   },
//   {
//     name: "Emily Carter",
//     subject: "English",
//     experience: "9 Years Experience",
//     rating: "4.9",
//     students: "1,900+ Students",
//     image: "/mentors/mentor3.jpg",
//     gradient: "from-purple-500 to-pink-500",
//   },
//   {
//     name: "Michael Brown",
//     subject: "Computer Science",
//     experience: "11 Years Experience",
//     rating: "5.0",
//     students: "3,000+ Students",
//     image: "/mentors/mentor4.jpg",
//     gradient: "from-orange-400 to-amber-500",
//   },
// ];

// export default function MentorShowcase() {
//   return (
//     <section className="relative py-24 overflow-hidden">

//       {/* Background Glow */}

//       <div className="absolute -top-20 left-0 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[120px]" />

//       <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-secondary/10 blur-[120px]" />

//       <div className="relative max-w-7xl mx-auto px-6">

//         {/* Heading */}

//         <div className="text-center mb-20">

//           <span className="inline-flex items-center px-5 py-2 rounded-full bg-primary/10 text-primary font-semibold">
//             OUR EDUCATORS
//           </span>

//           <h2 className="mt-6 text-4xl md:text-5xl font-black text-navy">
//             Meet Our Expert Mentors
//           </h2>

//           <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
//             Learn from experienced educators who inspire confidence,
//             creativity and academic excellence through personalized guidance.
//           </p>

//         </div>

//         {/* Mentor Cards */}

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

//           {mentors.map((mentor, index) => (

//             <div
//               key={index}
//               className="group relative rounded-[32px] overflow-hidden bg-white/75 backdrop-blur-xl border border-white shadow-[0_20px_60px_rgba(59,111,182,0.08)] hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(59,111,182,0.18)] transition-all duration-500"
//             >

//               {/* Glow */}

//               <div
//                 className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${mentor.gradient} opacity-15 blur-3xl group-hover:scale-125 transition-all duration-700`}
//               />

//               {/* Image */}

//               <div className="relative h-72 overflow-hidden">

//                 <Image
//                   src={mentor.image}
//                   alt={mentor.name}
//                   fill
//                   className="object-cover transition-transform duration-700 group-hover:scale-110"
//                 />

//                 {/* Subject Badge */}

//                 <div
//                   className={`absolute top-4 left-4 bg-gradient-to-r ${mentor.gradient} text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg`}
//                 >
//                   {mentor.subject}
//                 </div>

//                 {/* Rating */}

//                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xl rounded-full px-3 py-2 flex items-center gap-1 shadow-lg">

//                   <Star
//                     size={14}
//                     className="fill-yellow-400 text-yellow-400"
//                   />

//                   <span className="font-bold text-sm">
//                     {mentor.rating}
//                   </span>

//                 </div>

//               </div>

//               {/* Card Content */}

//               <div className="p-6">

//                 <h3 className="text-2xl font-black text-navy">
//                   {mentor.name}
//                 </h3>

//                 <p className="mt-3 text-slate-600">
//                   {mentor.experience}
//                 </p>

//                 <div className="mt-5 flex items-center gap-3">

//                   <div
//                     className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mentor.gradient} flex items-center justify-center text-white`}
//                   >
//                     <BookOpen size={22} />
//                   </div>

//                   <div>

//                     <div className="font-bold text-primary">
//                       {mentor.students}
//                     </div>

//                     <div className="text-sm text-slate-500">
//                       Successfully Guided
//                     </div>

//                   </div>

                

                
//                 </div>

//                 {/* Social Icons */}

//                 <div className="mt-6 flex items-center justify-between">

//                   <div className="flex items-center gap-3">

//                     <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center">
//                       <Linkedin size={18} />
//                     </button>

//                     <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-secondary hover:text-white transition-all duration-300 flex items-center justify-center">
//                       <Mail size={18} />
//                     </button>

//                   </div>

//                   <button
//                     className={`px-5 py-2 rounded-full bg-gradient-to-r ${mentor.gradient} text-white font-semibold shadow-lg hover:scale-105 transition`}
//                   >
//                     View Profile
//                   </button>

//                 </div>

//               </div>

//               {/* Hover Bottom Border */}

//               <div
//                 className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${mentor.gradient} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
//               />

//             </div>

//           ))}

//         </div>

//         {/* Bottom CTA */}

//         <div className="mt-20 flex justify-center">

//           <Link
//             href="/mentors"
//             className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-white font-bold shadow-[0_10px_30px_rgba(59,111,182,0.25)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(59,111,182,0.35)] transition-all duration-300"
//           >

//             View All Mentors

//             <ArrowRight
//               size={20}
//               className="group-hover:translate-x-1 transition-transform"
//             />

//           </Link>

//         </div>

//       </div>

//     </section>
//   );
// }







