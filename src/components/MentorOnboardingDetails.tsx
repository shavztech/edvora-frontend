"use client";

import {
  BookOpen,
  Users,
  Zap,
  CheckCircle2,
  Sparkles,
  Calendar,
  ArrowRight,
} from "lucide-react";

interface MentorOnboardingData {
  syllabus: string;
  classLevel?: string[] | string;
  classLevels?: string[];
  classes?: string[];     
  subjects: string[];
  experience: string;
}


interface OnboardingDetailsProps {
  data: MentorOnboardingData;
}

export default function MentorOnboardingDetails({ data }: OnboardingDetailsProps) {
  const { syllabus, classLevel, classLevels, classes, subjects, experience } = data;

const displayClasses =
  classes?.length
    ? classes.join(", ")
    : classLevels?.length
      ? classLevels.join(", ")
      : Array.isArray(classLevel)
        ? classLevel.join(", ")
        : classLevel ?? "Not specified";


  return (
    <div className="min-h-screen bg-[#fcfcfd] relative overflow-hidden flex flex-col items-center justify-center py-12 px-4 selection:bg-primary/10">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 animate-fade-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Professional Identity
            </div>
            <h1 className="text-4xl font-[900] text-slate-900 tracking-tight leading-none">
              Academic Credentials
            </h1>
          </div>
          <div className="flex items-center justify-center gap-3 px-5 py-3 bg-emerald-50/50 text-emerald-700 rounded-2xl border border-emerald-100 shadow-sm backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-black text-[11px] uppercase tracking-widest text-emerald-600">
              Verified Expert
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 grid gap-6 sm:grid-cols-3">
            {/* SYLLABUS */}
            <div className="bg-white p-7 rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col gap-5 group hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 group-hover:scale-110 transition-transform shadow-sm">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                  Academic Board
                </p>
                <p className="text-xl font-[900] text-slate-800 capitalize tracking-tight">{syllabus}</p>
              </div>
            </div>

            {/* CLASS */}
            <div className="bg-white p-7 rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col gap-5 group hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-100 group-hover:scale-110 transition-transform shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                  Grade Support
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {displayClasses.split(",").map(c => (
                    <span key={c} className="text-sm font-black text-slate-800 leading-none">{c.trim()}{displayClasses.split(",").indexOf(c) !== displayClasses.split(",").length - 1 ? " • " : ""}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="bg-white p-7 rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col gap-5 group hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform shadow-sm">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                  Professional Tenure
                </p>
                <p className="text-xl font-[900] text-slate-800 capitalize tracking-tight">{experience}</p>
              </div>
            </div>
          </div>

          {/* SUBJECTS */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100 h-full">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-50 uppercase tracking-[0.2em] text-[10px] font-black text-slate-400">
                Major Focus Areas
              </div>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <span
                    key={s}
                    className="px-4 py-2 bg-slate-50 text-slate-700 text-xs font-black rounded-xl border border-slate-100 hover:bg-white hover:border-primary/20 hover:text-primary transition-all cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-4 text-slate-300 font-bold text-[11px] uppercase tracking-widest">
                  <Calendar className="w-4 h-4" />
                  Academic Session 2025-26
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION FOOTER */}
        <div className="mt-8 p-8 bg-slate-900 rounded-[32px] shadow-2xl shadow-slate-900/10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group text-left">
          <div className="relative z-10">
            <h3 className="text-2xl font-[900] text-white mb-2 tracking-tight">Access Your Console</h3>
            <p className="text-slate-400 text-sm font-medium">Your teaching environment is fully configured and ready for sessions.</p>
          </div>
          <button
            onClick={() => (window.location.href = "/mentor/dashboard")}
            className="relative z-10 px-8 py-4 bg-white text-slate-900 font-black rounded-[20px] hover:shadow-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2.5 group/btn text-sm uppercase tracking-widest"
          >
            Launch Dashboard
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </button>

          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-20 -mt-20 blur-3xl transition-transform group-hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
