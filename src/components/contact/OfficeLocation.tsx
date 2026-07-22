
// "use client";

// import {
//   MapPin,
//   Phone,
//   Mail,
//   Clock,
//   Navigation,
//   Car,
// } from "lucide-react";

// export default function OfficeLocation() {
//   return (
//     <section
//       id="location"
//       className="relative overflow-hidden py-24 bg-gradient-to-b from-[#F8FBFF] to-white"
//     >
//       {/* Background Glow */}

//       <div className="absolute -left-32 top-0 w-[380px] h-[380px] rounded-full bg-primary/10 blur-[120px]" />

//       <div className="absolute -right-32 bottom-0 w-[380px] h-[380px] rounded-full bg-secondary/10 blur-[120px]" />

//       <div className="relative max-w-7xl mx-auto px-6">

//         {/* Heading */}

//         <div className="text-center mb-20">

//           <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-primary font-semibold">

//             <MapPin size={18} />

//             OUR LOCATION

//           </span>

//           <h2 className="mt-6 text-4xl md:text-5xl font-black text-navy">

//             Visit

//             <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">

//               Edvora Office

//             </span>

//           </h2>

//           <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">

//             We'd love to welcome you to our office. Meet our academic
//             counsellors, explore our learning environment, and discover
//             how Edvora helps students achieve success.

//           </p>

//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 items-start">

//           {/* LEFT */}

//           <div>

//             <div className="rounded-[36px] bg-white border border-slate-100 p-8 shadow-[0_20px_60px_rgba(59,111,182,.08)]">

//               <div className="flex items-center gap-4">

//                 <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">

//                   <MapPin
//                     className="text-primary"
//                     size={30}
//                   />

//                 </div>

//                 <div>

//                   <h3 className="text-2xl font-black text-navy">

//                     Edvora Learning Center

//                   </h3>

//                   <p className="text-slate-500 mt-1">

//                     Kochi, Kerala, India

//                   </p>

//                 </div>

//               </div>

//               {/* Address */}

//               <div className="mt-10 space-y-8">

//                 <div className="flex gap-4">

//                   <MapPin
//                     className="text-primary mt-1"
//                     size={22}
//                   />

//                   <div>

//                     <h4 className="font-bold text-navy">

//                       Office Address

//                     </h4>

//                     <p className="mt-2 text-slate-600 leading-7">

//                       Edvora Learning Centre
//                       <br />
//                       MG Road,
//                       <br />
//                       Kochi,
//                       <br />
//                       Kerala - 682016

//                     </p>

//                   </div>

//                 </div>

//                 <div className="flex gap-4">

//                   <Phone
//                     className="text-secondary mt-1"
//                     size={22}
//                   />

//                   <div>

//                     <h4 className="font-bold text-navy">

//                       Phone Number

//                     </h4>

//                     <p className="mt-2 text-slate-600">

//                       +91 98765 43210

//                     </p>

//                   </div>

//                 </div>

//                 <div className="flex gap-4">

//                   <Mail
//                     className="text-primary mt-1"
//                     size={22}
//                   />

//                   <div>

//                     <h4 className="font-bold text-navy">

//                       Email Address

//                     </h4>

//                     <p className="mt-2 text-slate-600">

//                       support@edvora.com

//                     </p>

//                   </div>

//                 </div>

//                 <div className="flex gap-4">

//                   <Clock
//                     className="text-secondary mt-1"
//                     size={22}
//                   />

//                   <div>

//                     <h4 className="font-bold text-navy">

//                       Working Hours

//                     </h4>

//                     <div className="mt-3 space-y-2 text-slate-600">

//                       <p>
//                         Monday - Friday :
//                         <span className="font-semibold text-navy">
//                           {" "}
//                           9:00 AM - 6:00 PM
//                         </span>
//                       </p>

//                       <p>
//                         Saturday :
//                         <span className="font-semibold text-navy">
//                           {" "}
//                           9:00 AM - 2:00 PM
//                         </span>
//                       </p>

//                       <p>
//                         Sunday :
//                         <span className="font-semibold text-red-500">
//                           {" "}
//                           Closed
//                         </span>
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//                 {/* More content continues in Response 2 */}


                
//                 {/* Facilities */}

//                 <div className="rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 p-6">

//                   <div className="flex items-start gap-4">

//                     <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">

//                       <Car
//                         size={26}
//                         className="text-secondary"
//                       />

//                     </div>

//                     <div>

//                       <h4 className="text-xl font-bold text-navy">

//                         Visitor Facilities

//                       </h4>

//                       <ul className="mt-4 space-y-2 text-slate-600">

//                         <li>✅ Free Visitor Parking</li>

//                         <li>✅ Air Conditioned Office</li>

//                         <li>✅ Parent Counselling Area</li>

//                         <li>✅ Demo Classroom</li>

//                         <li>✅ Student Help Desk</li>

//                       </ul>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* RIGHT */}

//           <div>

//             {/* Google Map */}

//             <div className="overflow-hidden rounded-[36px] border border-slate-100 shadow-[0_20px_60px_rgba(59,111,182,.10)]">

//               <iframe
//                 src="https://www.google.com/maps?q=Kochi,Kerala&output=embed"
//                 width="100%"
//                 height="520"
//                 loading="lazy"
//                 allowFullScreen
//                 referrerPolicy="no-referrer-when-downgrade"
//                 className="border-0"
//               />

//             </div>

//             {/* Directions Card */}

//             <div className="mt-8 rounded-[32px] bg-gradient-to-r from-primary via-navy to-primary p-[1px]">

//               <div className="rounded-[31px] bg-white px-8 py-8">

//                 <div className="flex items-center justify-between gap-6 flex-wrap">

//                   <div>

//                     <h3 className="text-2xl font-black text-navy">

//                       Need Directions?

//                     </h3>

//                     <p className="mt-3 text-slate-600 leading-relaxed">

//                       Use Google Maps to navigate directly
//                       to the Edvora Learning Centre.

//                     </p>

//                   </div>

//                   <a
//                     href="https://maps.google.com/?q=Kochi,Kerala"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-4 font-bold text-white shadow-[0_15px_35px_rgba(59,111,182,.25)] hover:-translate-y-1 transition-all duration-300"
//                   >

//                     <Navigation size={20} />

//                     Get Directions

//                   </a>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }



