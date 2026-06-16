import Image from "next/image";
import { CheckCircle2, Monitor, Users, Video, Sparkles, Layout } from "lucide-react";

const features = [
  "One-to-One Precision Mentoring",
  "High-Density Structured Syllabus",
  "Real-time Logic Interaction",
  "Archived Session Synchronisation"
];

const MentoringPreview: React.FC = () => {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: CONTENT CONSOLE */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Live Integration</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-[950] text-slate-950 tracking-tighter leading-tight">
                Master-Led <br />
                <span className="text-indigo-600 italic">Live Session</span> Ecosystem.
              </h2>
              
              <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-xl">
                Experience the next generation of academic delivery. Our live environment 
                is optimized for low-latency knowledge transfer and direct mentor-student interaction.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 group">
                   <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-1 group-hover:scale-110 transition-transform" />
                   <span className="text-sm font-bold text-slate-700 leading-tight">{f}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-100 flex items-center gap-8">
               <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-slate-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Web Engine</span>
               </div>
               <div className="flex items-center gap-2">
                  <Layout className="w-5 h-5 text-slate-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">HD Dashboard</span>
               </div>
            </div>
          </div>

          {/* RIGHT: INTERFACE ANCHOR */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 p-2 sm:p-4 bg-slate-50 border border-slate-100 rounded-[3rem] shadow-2xl">
               <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-slate-900 border-8 border-white shadow-inner group">
                  <Image
                    src="/mentor-preview.png"
                    alt="Mentoring session interface preview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  
                  {/* FLOATING OVERLAY CHIP */}
                  <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-3">
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Stream Encryption Active</span>
                  </div>

                  {/* MINI INDICATORS */}
                  <div className="absolute bottom-6 right-6 flex gap-2">
                     <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                        <Users size={18} />
                     </div>
                     <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-900 shadow-xl">
                        <Video size={18} />
                     </div>
                  </div>
               </div>

               {/* DECORATIVE ORBS */}
               <div className="absolute -z-10 -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
               <div className="absolute -z-10 -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MentoringPreview;
