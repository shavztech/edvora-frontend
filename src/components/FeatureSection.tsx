import { 
    GraduationCap, 
    CalendarCheck, 
    Users, 
    ShieldCheck, 
    Zap, 
    Globe, 
    ArrowRight,
    Search,
    BookOpen,
    Clock
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Mentoring",
    desc: "Collaborate with industry-leading experts vetted through our rigorous multi-stage certification process.",
    label: "Quality"
  },
  {
    icon: CalendarCheck,
    title: "Dynamic Scheduling",
    desc: "Seamlessly book demo sessions and masterclasses with real-time availability synchronization.",
    label: "Efficiency"
  },
  {
    icon: Users,
    title: "Personalised Growth",
    desc: "Experience one-to-one mentoring focused on your specific technical path and improvement goals.",
    label: "Focus"
  },
  {
    icon: ShieldCheck,
    title: "Admin Oversight",
    desc: "Every session and student record is managed through our secure administrative console.",
    label: "Security"
  },
  {
    icon: Search,
    title: "Advanced Discovery",
    desc: "Find the perfect mentor match using our high-precision search and filtering algorithms.",
    label: "Discovery"
  },
  {
    icon: Globe,
    title: "Global Network",
    desc: "Connect with a diverse ecosystem of educators and operatives across 50+ international regions.",
    label: "Reach"
  }
];

export default function FeatureSection() {
  return (
    <section className="bg-white">
      {/* 🛠️ PHASE 2: CORE CAPABILITY MATRIX */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* HEADER */}
          <div className="max-w-3xl mb-16 space-y-6">
            <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Integrated Features</h2>
            <h3 className="text-5xl font-[950] text-[#001f3f] tracking-tighter leading-none">
              A Standard for <br />
              <span className="text-blue-600">Advanced</span> Learning.
            </h3>
            <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-2xl">
              Edvora provides the essential infrastructure for modern educational management, 
              delivering high-density tools for mentors, students, and administrators alike.
            </p>
          </div>

          {/* FEATURES MATRIX */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {features.map((f, i) => (
              <div key={i} className="group space-y-6">
                
                {/* ICON & LABEL */}
                <div className="flex items-center justify-between">
                   <div className="w-16 h-16 rounded-[2rem] bg-white border-2 border-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-600/20 group-hover:-translate-y-1">
                      <f.icon className="w-7 h-7" />
                   </div>
                   <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors">{f.label}</span>
                </div>

                {/* CONTENT */}
                <div className="space-y-3">
                   <h4 className="text-2xl font-[900] text-[#001f3f] tracking-tight leading-none group-hover:translate-x-1 transition-transform">
                     {f.title}
                   </h4>
                   <p className="text-slate-500 font-bold text-sm leading-relaxed">
                     {f.desc}
                   </p>
                </div>

                {/* ACTION INDICATOR */}
                <div className="pt-2 flex items-center gap-2 group/link cursor-pointer">
                   <div className="h-0.5 w-6 bg-slate-100 group-hover/link:w-10 group-hover/link:bg-blue-600 transition-all" />
                   <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-600 uppercase tracking-widest">Learn More</span>
                </div>

              </div>
            ))}
          </div>

          {/* BOTTOM CTA CALLOUT */}
          <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                         {String.fromCharCode(64+i)}
                      </div>
                   ))}
                </div>
                <p className="text-sm font-bold text-slate-500">
                   Join over <span className="text-[#001f3f] font-black underline decoration-blue-600 decoration-2 underline-offset-4">4,000+ elite operatives</span> in the network.
                </p>
             </div>
             
             <button className="h-14 px-8 bg-[#001f3f] text-white font-[950] text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:-translate-y-1 transition-all active:scale-[0.98] flex items-center gap-3">
                Initialize Search <ArrowRight className="w-4 h-4" />
             </button>
          </div>

        </div>
      </div>

    </section>
  );
}
