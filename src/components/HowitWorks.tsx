import {
  UserPlus,
  ShieldCheck,
  UserCheck,
  CalendarClock,
  GraduationCap,
  ArrowRight
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Inquire & Demo",
    desc: "Prospective students initialize their journey by requesting a comprehensive demo.",
    id: "01"
  },
  {
    icon: ShieldCheck,
    title: "Identity Verification",
    desc: "Admin operatives verify credentials and establish the secure student profile.",
    id: "02"
  },
  {
    icon: UserCheck,
    title: "Expert Matching",
    desc: "Our algorithm assigns the optimal verified mentor based on subject expertise.",
    id: "03"
  },
  {
    icon: CalendarClock,
    title: "Schedule Sync",
    desc: "Mentor synchronizes availability and initializes the session infrastructure.",
    id: "04"
  },
  {
    icon: GraduationCap,
    title: "Knowledge Transfer",
    desc: "Student joins the live ecosystem and begins high-density learning.",
    id: "05"
  },
];

export default function HowItWorks() {
  return (
    <section className=" py-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
           <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Operational Protocol</h2>
           <h3 className="text-4xl font-[950] text-slate-950 tracking-tighter">How the Ecosystem <span className="text-indigo-600">Integrates.</span></h3>
           <p className="text-slate-500 font-bold text-base">A streamlined five-phase initialization process from first contact to expert-led education.</p>
        </div>

        {/* STEPS GRID */}
        <div className="relative">
           {/* OPTIONAL: CONNECTING LINE (DESKTOP) */}
           <div className="hidden lg:block absolute top-[100px] left-0 w-full h-px bg-slate-100 z-0" />

           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 relative z-10">
              {steps.map((step, i) => (
                <div key={i} className="group space-y-8">
                  
                  {/* ICON & INDEX */}
                  <div className="relative">
                     <div className="w-20 h-20 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-indigo-600/20 group-hover:-translate-y-2 relative z-10">
                        <step.icon className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors duration-500" />
                     </div>
                     <span className="absolute -top-4 -right-4 text-5xl font-[950] text-slate-100 group-hover:text-indigo-50/50 transition-colors pointer-events-none select-none italic">
                        {step.id}
                     </span>
                  </div>

                  {/* CONTENT */}
                  <div className="space-y-3">
                    <h4 className="text-xl font-[900] text-slate-900 tracking-tight leading-none">
                      {step.title}
                    </h4>
                    <p className="text-slate-500 font-bold text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* MOBILE INDICATOR */}
                  {i < steps.length - 1 && (
                     <div className="lg:hidden flex justify-center py-4">
                        <ArrowRight className="w-6 h-6 text-slate-200 rotate-90 md:rotate-0" />
                     </div>
                  )}
                </div>
              ))}
           </div>
        </div>

        {/* CTA CALLOUT */}
        <div className="mt-20 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100">
                 <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-600">All phases are monitored and verified by our central administrative console.</p>
           </div>
           <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors flex items-center gap-2 group">
              View Detailed Curriculum <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

      </div>
    </section>
  );
}
