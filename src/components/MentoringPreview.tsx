// import Image from "next/image";
// import { CheckCircle2, Monitor, Users, Video, Sparkles, Layout } from "lucide-react";

// const features = [
//   "One-to-One Precision Mentoring",
//   "High-Density Structured Syllabus",
//   "Real-time Logic Interaction",
//   "Archived Session Synchronisation"
// ];

// const MentoringPreview: React.FC = () => {
//   return (
//     <section className="bg-white overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid lg:grid-cols-12 gap-16 items-center">

//           {/* LEFT: CONTENT CONSOLE */}
//           <div className="lg:col-span-6 space-y-10">
//             <div className="space-y-6">
//               <div className="inline-flex items-center gap-2 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
//                 <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
//                 <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Live Integration</span>
//               </div>

//               <h2 className="text-4xl md:text-5xl font-[950] text-slate-950 tracking-tighter leading-tight">
//                 Master-Led <br />
//                 <span className="text-indigo-600 italic">Live Session</span> Ecosystem.
//               </h2>

//               <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-xl">
//                 Experience the next generation of academic delivery. Our live environment 
//                 is optimized for low-latency knowledge transfer and direct mentor-student interaction.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {features.map((f, i) => (
//                 <div key={i} className="flex items-start gap-3 group">
//                    <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-1 group-hover:scale-110 transition-transform" />
//                    <span className="text-sm font-bold text-slate-700 leading-tight">{f}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="pt-8 border-t border-slate-100 flex items-center gap-8">
//                <div className="flex items-center gap-2">
//                   <Monitor className="w-5 h-5 text-slate-400" />
//                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Web Engine</span>
//                </div>
//                <div className="flex items-center gap-2">
//                   <Layout className="w-5 h-5 text-slate-400" />
//                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">HD Dashboard</span>
//                </div>
//             </div>
//           </div>

//           {/* RIGHT: INTERFACE ANCHOR */}
//           <div className="lg:col-span-6 relative">
//             <div className="relative z-10 p-2 sm:p-4 bg-slate-50 border border-slate-100 rounded-[3rem] shadow-2xl">
//                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-slate-900 border-8 border-white shadow-inner group">
//                   <Image
//                     src="/mentor-preview.png"
//                     alt="Mentoring session interface preview"
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
//                   />

//                   {/* FLOATING OVERLAY CHIP */}
//                   <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-3">
//                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
//                      <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Stream Encryption Active</span>
//                   </div>

//                   {/* MINI INDICATORS */}
//                   <div className="absolute bottom-6 right-6 flex gap-2">
//                      <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
//                         <Users size={18} />
//                      </div>
//                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-900 shadow-xl">
//                         <Video size={18} />
//                      </div>
//                   </div>
//                </div>

//                {/* DECORATIVE ORBS */}
//                <div className="absolute -z-10 -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
//                <div className="absolute -z-10 -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default MentoringPreview;



"use client";

import Image from "next/image";
import {
  User,
  MessageCircle,
  TrendingUp,
  Calendar,
  Play,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Sparkles,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: User,
    title: "100% Individual Attention",
    desc: "Every session focuses completely on your child.",
  },
  {
    icon: MessageCircle,
    title: "Ask Questions Freely",
    desc: "Students can clear doubts instantly.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    desc: "Regular feedback and performance reports.",
  },
];

export default function MentorPreview() {
  return (
    <section className="relative py-6 lg:py-14 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-secondary/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

       <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT CONTENT */}
          <div className="space-y-4 lg:-mt-19">

                        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-5 py-2 rounded-full font-bold text-sm mb-">
              🟢 ONE TO ONE MENTORING
            </div>

            <h2 className="text-4xl md:text-5xl font-[950]  text-navy leading-tight">
              Personalized Learning
              <br />

              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                With Expert Mentors
              </span>
            </h2>

            <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-xl">
              One-to-one live sessions focused on your child's learning pace,
              doubts and goals. Learn better with individual attention.
            </p>

            {/* Features */}
            <div className="mt-6 space-y-6">

              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start bg-white rounded-2xl p-3 shadow-lg border border-slate-100"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <item.icon size={28} />
                  </div>

                  <div>
                    <h3 className="font-bold text-navy text-lg">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">

              <button className="bg-gradient-to-r from-secondary to-emerald-500 text-white px-8 py-4 rounded-full font-bold shadow-[0_8px_25px_rgba(111,168,67,0.4)] hover:scale-105 hover:shadow-[0_12px_35px_rgba(111,168,67,0.6)] transition-all flex items-center gap-3">
                <Calendar size={20} />
                Book Free Demo
              </button>

              <button className="border-2 border-primary text-primary px-8 py-4 rounded-full font-bold bg-primary text-white hover:scale-105 transition-all flex items-center gap-3">
                <Play size={18} />
                See How It Works
              </button>

            </div>
          </div>

          
  <div className="relative w-full max-w-lg lg:mt-8 hidden lg:block self-start">

    {/* Main Card */}

    <div className="relative overflow-hidden rounded-[36px] border border-white/20 bg-gradient-to-br from-navy via-primary to-[#4B79BF] p-10 shadow-[0_30px_80px_rgba(30,60,139,.35)]">

      {/* Decorative Blur */}

      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-59 w-59 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative">

      

        <h3 className="mt-2 text-3xl font-black leading-tight text-white">Everything You Need<span className="mt-2 block text-secondary">To Empower Your Learning</span></h3>

        <p className="mt-5 leading-8 text-white/80">At Edvora, students gain access to expert mentors, personalized study plans, interactive live sessions, and resources designed to boost confidence and accelerate learning.</p>

        {/* Features */}

        <div className="mt-8 space-y-5">

          {[
            {
              title: "Personalized Path",
              desc: "Tailored study plans for each learner.",
            },
            {
              title: "Interactive Sessions",
              desc: "Live Q&A with expert mentors.",
            },
            {
              title: "Flexible Learning",
              desc: "Study anytime, anywhere on any device.",
            },
            
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition duration-300 hover:bg-white/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary shadow-lg">
                <CheckCircle2 className="text-white" size={20} />
              </div>

              <div>
                  <h4 className="font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    {item.desc}
                  </p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
          </div> {/* end of right side container */}
        </div> {/* end of grid lg:grid-cols-2 */}
      </div> {/* end of max-w-7xl container */}
    </section>
  );
}
