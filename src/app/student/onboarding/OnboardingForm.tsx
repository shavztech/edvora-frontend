"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  BookOpen,
  Users,
  List,
  Zap,
  CheckCircle2,
  ChevronRight,
  Loader2,
  GraduationCap
} from "lucide-react";
import toast from "react-hot-toast";

export default function OnboardingForm() {
  const [syllabus, setSyllabus] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [courseType, setCourseType] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!syllabus || !classLevel) return;

    api
      .get(
        `/students/subjects?syllabus=${syllabus}&classLevel=${classLevel}`
      )
      .then((res) => setAvailableSubjects(res.data.subjects));
  }, [syllabus, classLevel]);

  const toggleSubject = (s: string) => {
    setSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const selectAll = () => setSubjects(availableSubjects);

  const submit = async () => {
    if (!syllabus || !classLevel || subjects.length === 0 || !courseType) {
      return toast.error("Please complete all fields");
    }

    setSubmitting(true);
    try {
      await api.post("/students/onboarding", {
  syllabus,
  classLevel,
  subjects,
  courseType,
  phone,
});
toast.success("🎉 Onboarding Completed Successfully!", {
  duration: 3000,
});

setTimeout(() => {
  window.location.reload();
}, 3000);
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] relative overflow-hidden flex flex-col items-center justify-center py-12 px-4 selection:bg-primary/10">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10 animate-fade-up">
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl text-primary mb-6 shadow-xl shadow-gray-200/50 border border-gray-100 ring-4 ring-gray-50/50">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-[900] text-slate-900 tracking-tight leading-none">
            Empower Your <span className="text-primary italic">Journey</span>
          </h1>
          <p className="text-slate-500 mt-4 font-medium text-sm max-w-sm mx-auto">
            Customize your academic workspace with Edvora's precision onboarding.
          </p>
        </div>

        <div className="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100/80 overflow-hidden">
          <div className="divide-y divide-slate-50">

            {/* SYLLABUS SECTION */}
            <div className="p-8 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl text-indigo-600 border border-indigo-100/50 flex items-center justify-center shadow-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-800 tracking-tight">Academic Board</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Select your primary curriculum</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
  { id: "Kerala State", label: "Kerala State", icon: "🌴" },
  { id: "CBSE", label: "CBSE Board", icon: "🏛️" }
].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSyllabus(s.id);
                      setClassLevel("");
                      setSubjects([]);
                    }}
                    className={`relative p-5 rounded-[20px] border-2 text-left transition-all group overflow-hidden ${syllabus === s.id
                      ? "border-primary bg-primary/[0.02] shadow-sm"
                      : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/30"
                      }`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{s.icon}</span>
                        <span className={`font-black tracking-tight ${syllabus === s.id ? "text-primary" : "text-slate-600"}`}>
                          {s.label}
                        </span>
                      </div>
                      {syllabus === s.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CLASS LEVEL SECTION */}
            {syllabus && (
              <div className="p-8 group animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl text-purple-600 border border-purple-100/50 flex items-center justify-center shadow-sm">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Grade Level</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Current year of study</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
                  {["KG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setClassLevel(c);
                        setSubjects([]);
                      }}
                      className={`p-3 rounded-xl border-2 font-black text-xs transition-all ${classLevel === c
                        ? "border-purple-500 bg-purple-50/50 text-purple-700 shadow-sm"
                        : "border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SUBJECTS SECTION */}
            {availableSubjects.length > 0 && (
              <div className="p-8 group animate-fade-in-up">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl text-orange-600 border border-orange-100/50 flex items-center justify-center shadow-sm">
                      <List className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-800 tracking-tight">Focus Areas</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Select specific subjects</p>
                    </div>
                  </div>
                  <button
                    onClick={selectAll}
                    className="text-[10px] font-black text-primary px-4 py-2 bg-primary/5 rounded-xl hover:bg-primary/10 transition-all border border-primary/10 uppercase tracking-widest"
                  >
                    Select All
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableSubjects.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSubject(s)}
                      className={`flex items-center justify-between p-4 rounded-[18px] border-2 transition-all text-xs font-bold ${subjects.includes(s)
                        ? "bg-orange-50/50 border-orange-200 text-orange-900 shadow-sm"
                        : "bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50/50"
                        }`}
                    >
                      {s}
                      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${subjects.includes(s) ? "bg-orange-500 border-orange-500 shadow-md shadow-orange-500/20" : "border-slate-200 bg-slate-50"
                        }`}>
                        {subjects.includes(s) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* COURSE TYPE SECTION */}
            {classLevel && (
              <div className="p-8 group animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100/50 flex items-center justify-center shadow-sm">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Study Mode</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Specialized track</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "foundation", label: "Foundation", desc: "Building core mastery" },
                    { id: "tuition", label: "Tuition", desc: "Active school support" }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setCourseType(t.id)}
                      className={`p-5 rounded-[22px] border-2 text-left transition-all relative ${courseType === t.id
                        ? "border-emerald-500 bg-emerald-50/50 shadow-sm"
                        : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50"
                        }`}
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <span className={`font-black tracking-tight ${courseType === t.id ? "text-emerald-900" : "text-slate-700"}`}>{t.label}</span>
                        {courseType === t.id && <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />}
                      </div>
                      <p className="text-[11px] text-slate-400 font-bold leading-tight">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="p-8 animate-fade-in-up">
  <label className="block text-sm font-bold text-slate-700 mb-3">
    Phone Number
  </label>

  <input
    type="text"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="Enter your phone number"
    className="w-full h-12 rounded-xl border border-slate-300 px-4 outline-none focus:border-primary"
  />
</div>
            {/* SUBMIT SECTION */}
            <div className="p-8 bg-slate-50/50 border-t border-slate-100">
              <button
                onClick={submit}
                disabled={submitting}
                className="w-full h-14 bg-slate-900 hover:bg-black text-white font-black rounded-[20px] shadow-2xl shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group text-sm uppercase tracking-widest"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Finalize Profile
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <div className="mt-6 flex flex-col items-center gap-1.5">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
                  Secure Enrollment Verified
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-slate-200" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
