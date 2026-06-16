"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { User, Mail, Phone, GraduationCap, BookOpen, Layers, Sparkles, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

type DemoForm = {
  studentName: string;
  studentEmail: string; 
  phone: string;
  studentClass: string;
  subject: string;
  board: "Kerala" | "CBSE" | "";
};

export default function DemoBookingPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<DemoForm>({
    studentName: "",
    studentEmail: "", 
    phone: "",
    studentClass: "",
    subject: "",
    board: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.studentName ||
      !form.studentEmail ||
      !form.phone ||
      !form.studentClass ||
      !form.subject ||
      !form.board
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:7000/api/demo/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Demo booking failed");
        return;
      }

      setSubmitted(true);
      toast.success("Demo request submitted successfully!");

      // reset form
      setForm({
        studentName: "",
        studentEmail: "",
        phone: "",
        studentClass: "",
        subject: "",
        board: "",
      });

    } catch (error) {
       console.error("Demo booking error:", error);
       toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 animate-fade-in">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl shadow-indigo-100 border border-slate-100">
           <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 animate-bounce-subtle">
              <CheckCircle2 className="w-12 h-12 text-indigo-600" />
           </div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Request Received!</h1>
           <p className="text-slate-500 font-medium mb-10 leading-relaxed">
             Our educational consultants will reach out to you within 24 hours to schedule your exclusive demo session.
           </p>
           <button 
             onClick={() => setSubmitted(false)}
             className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
           >
             Book Another Demo
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfe] selection:bg-indigo-100 relative overflow-hidden flex items-center justify-center py-16 px-4">
      {/* Abstract Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-50 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 opacity-40" />
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center relative z-10">
        
        {/* Left Content (Branding) */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8 animate-fade-up text-center xl:text-left px-4 lg:px-12 xl:px-0">
           <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-500 fill-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Premium Educational Content</span>
           </div>
           <div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-[ -0.05em] leading-[0.9] mb-6">
                Redefine Your <br className="hidden lg:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Learning Path</span>
              </h1>
              <p className="text-slate-400 font-bold text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Experience world-class mentorship with our specialized demo sessions. Tailored specifically for your curriculum and pace.
              </p>
           </div>
           
           <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Benefits icon={<CheckCircle2 />} label="Real-time Mentorship" />
              <Benefits icon={<CheckCircle2 />} label="Curated Syllabus" />
              <Benefits icon={<CheckCircle2 />} label="Flexible Scheduling" />
           </div>
        </div>

        {/* Right Content (Form Card) */}
        <div className="lg:col-span-12 xl:col-span-7 animate-fade-in delay-200">
           <div className="bg-white/70 backdrop-blur-2xl rounded-[3.5rem] p-8 lg:p-12 shadow-[0_32px_80px_-20px_rgba(79,70,229,0.12)] border border-white relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-600/10 transition-colors" />
              
              <div className="mb-10 relative">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Reserve Your Seat</h2>
                <div className="w-12 h-1 bg-indigo-600 rounded-full mt-2" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <InputGroup 
                     icon={<User />} 
                     label="Student Identity" 
                     placeholder="Ex: John Doe" 
                     name="studentName" 
                     value={form.studentName} 
                     onChange={handleChange} 
                   />
                   <InputGroup 
                     icon={<Mail />} 
                     label="Contact Email" 
                     type="email" 
                     placeholder="john@example.com" 
                     name="studentEmail" 
                     value={form.studentEmail} 
                     onChange={handleChange} 
                   />
                   <InputGroup 
                     icon={<Phone />} 
                     label="Phone Connectivity" 
                     placeholder="+91 0000 000000" 
                     name="phone" 
                     value={form.phone} 
                     onChange={handleChange} 
                   />
                   <InputGroup 
                     icon={<GraduationCap />} 
                     label="Current Class" 
                     placeholder="Ex: Class 10" 
                     name="studentClass" 
                     value={form.studentClass} 
                     onChange={handleChange} 
                   />
                   <InputGroup 
                     icon={<BookOpen />} 
                     label="Core Subject" 
                     placeholder="Ex: Mathematics" 
                     name="subject" 
                     value={form.subject} 
                     onChange={handleChange} 
                   />
                   
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-none">Curriculum/Board</label>
                     <div className="relative group">
                       <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                       <select
                         name="board"
                         value={form.board}
                         onChange={handleChange}
                         className="w-full pl-11 pr-4 h-[58px] bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 hover:bg-white outline-none transition-all appearance-none cursor-pointer"
                       >
                         <option value="">Select Board</option>
                         <option value="Kerala">Kerala State</option>
                         <option value="CBSE">CBSE International</option>
                       </select>
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                          <ChevronRight className="w-4 h-4 rotate-90" />
                       </div>
                     </div>
                   </div>
                </div>

                <div className="pt-4">
                   <button
                     type="submit"
                     disabled={loading}
                     className="w-full h-16 bg-slate-900 group-hover:bg-indigo-600 text-white rounded-[1.25rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-slate-200 group-hover:shadow-indigo-200 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                   >
                     {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                     ) : (
                        <>
                          Secure Appointment
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </>
                     )}
                   </button>
                   <p className="text-center text-[10px] text-slate-400 font-bold mt-6 tracking-tight">
                     By booking, you agree to our <span className="text-indigo-500 underline cursor-pointer">Education Policy</span> and <span className="text-indigo-500 underline cursor-pointer">Privacy Guidelines</span>.
                   </p>
                </div>
              </form>
           </div>
        </div>

      </div>
    </div>
  );
}

function Benefits({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:-translate-y-1">
       <span className="text-indigo-500 scale-90">{icon}</span>
       <span className="text-xs font-black text-slate-700 tracking-tight">{label}</span>
    </div>
  );
}

function InputGroup({ icon, label, placeholder, name, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-none">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors [&>svg]:w-4 [&>svg]:h-4">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 h-[58px] bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 hover:bg-white outline-none transition-all"
        />
      </div>
    </div>
  );
}
