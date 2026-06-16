import { Quote, ShieldCheck, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ayaan Khan",
    role: "Graduate Operative",
    text: "The high-density information flow and expert mentoring accelerated my technical growth beyond expectations.",
    avatar: "A"
  },
  {
    name: "Sara Thomas",
    role: "Senior Educator",
    text: "An unparalleled infrastructure for academic management. The precision in scheduling and assignment is world-class.",
    avatar: "S"
  },
  {
    name: "Rahul Menon",
    role: "Verified Student",
    text: "Zero-latency sessions and instant access to verified mentors make Edvora the definitive choice for serious learners.",
    avatar: "R"
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                 <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Identity Verified</span>
              </div>
              <h2 className="text-4xl font-[950] text-slate-950 tracking-tighter">Trusted by <span className="text-indigo-600">Global</span> Elite.</h2>
           </div>
           <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
              <div className="flex -space-x-1">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">4.9/5 Master Rating</span>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group relative bg-white border border-slate-100 p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:border-indigo-100"
            >
              <div className="absolute top-8 right-8 text-indigo-50 group-hover:text-indigo-100 transition-colors">
                 <Quote className="w-12 h-12" />
              </div>

              <div className="relative z-10 space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/20">
                       {t.avatar}
                    </div>
                    <div>
                       <h4 className="text-lg font-[900] text-slate-900 tracking-tight leading-none mb-1">{t.name}</h4>
                       <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.role}</span>
                          <div className="w-1 h-1 rounded-full bg-slate-200" />
                          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Verified</span>
                       </div>
                    </div>
                 </div>

                 <p className="text-slate-600 font-bold text-base leading-relaxed italic">
                    “{t.text}”
                 </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
