import Link from "next/link";
import { ArrowUpRight, Zap, MessageSquare, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-32">
      <div className="relative overflow-hidden bg-[#020617] rounded-[3rem] p-12 lg:p-20 border border-white/5 shadow-2xl">

        {/* 🌌 BACKGROUND DECOR */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* TEXT CONTENT */}
          <div className="max-w-xl space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
              <Sparkles className="w-4 h-4 text-indigo-400 fill-indigo-400" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Deployment Ready</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-[950] text-white tracking-tighter leading-tight">
                Initialize Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400 ">Academic Future.</span>
              </h2>
              <p className="text-sm md:text-lg text-slate-400 font-bold text-lg leading-relaxed">
                Secure your place in the most advanced learning ecosystem.
                Join 4,000+ elite operatives and master your technical growth.
              </p>
            </div>
          </div>

          {/* ACTION CLUSTER */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Link
              href="/demo-booking"
              className="group h-16 px-10 bg-white text-slate-950 font-[900] text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:-translate-y-1 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              Initialize Demo <Zap size={16} className="fill-slate-950" />
            </Link>

            <Link
              href="/contac"
              className="h-16 px-10 bg-white/5 text-white border border-white/10 font-[900] text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              Contact Operatives <MessageSquare size={16} />
            </Link>
          </div>

        </div>

        {/* SUBTLE FOOTER TAG */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center lg:justify-start gap-8 opacity-40">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Server Network Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">256-Bit SSL Encryption Active</span>
          </div>
        </div>

      </div>
    </section>
  );
}
