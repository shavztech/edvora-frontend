"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Save, 
  Loader2, 
  Eye, 
  EyeOff,
  Sparkles,
  ShieldAlert,
  GraduationCap
} from "lucide-react";
import toast from "react-hot-toast";

export default function StudentSettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    api.get("/students/settings").then((res) => {
      setUser(res.data);
    }).catch(err => {
      console.error("Settings load error:", err);
      toast.error("Failed to load settings");
    });
  }, []);

  const changePassword = async () => {
    setLoading(true);

    if (!currentPassword || !newPassword) {
      setLoading(false);
      return toast.error("All fields are required");
    }

    try {
      await api.patch("/students/settings/password", {
        currentPassword,
        newPassword,
      });

      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Password update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-70" />
        <p className="text-slate-400 font-[900] text-[10px] uppercase tracking-widest">Securing your profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-10 space-y-8 md:space-y-12 animate-fade-up">
        
        {/* ══ HEADER ══ */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/20">
            <Sparkles className="w-3 h-3"/>
            Academic Center
          </div>
          <h1 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter">
            Account Settings
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Manage your personal profile and security preferences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-10">
          
          {/* PROFILE SECTION */}
          <div className="group bg-white rounded-[32px] p-4 sm:p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100/50 shadow-sm text-blue-600 transition-transform group-hover:scale-110 duration-500">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-[900] text-slate-900 tracking-tight">Identity</h2>
                <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Student Profile</p>
              </div>
            </div>

            <div className="space-y-5 flex-1">
              <div className="space-y-1.5 group/input">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/input:text-primary">Full Name</label>
                <div className="flex items-center gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 shadow-inner group-hover:bg-slate-50 transition-colors">
                  <User className="w-5 h-5 text-slate-400" />
                  <span className="font-bold text-slate-800 text-sm md:text-base">{user.name}</span>
                </div>
              </div>

              <div className="space-y-1.5 group/id">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Email</label>
                <div className="flex items-center gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 shadow-inner">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="font-bold text-slate-800 text-sm md:text-base break-all">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50">
              <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 bg-amber-50 w-fit px-3 py-1.5 rounded-xl border border-amber-100">
                <ShieldAlert className="w-3 h-3"/>
                LOCKED FOR SECURITY
              </div>
            </div>
          </div>

          {/* SECURITY SECTION */}
          <div className="group bg-white rounded-[32px] p-4 sm:p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100/50 shadow-sm text-emerald-600 transition-transform group-hover:scale-110 duration-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-[900] text-slate-900 tracking-tight">Security</h2>
                <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Authentication</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                <div className="relative group/pass">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/pass:text-primary transition-colors" />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter old password"
                    className="w-full pl-12 pr-12 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-slate-800 placeholder:text-slate-300"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                <div className="relative group/newpass">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/newpass:text-primary transition-colors" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full pl-12 pr-12 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-slate-800 placeholder:text-slate-300"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={changePassword}
                disabled={loading}
                className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-slate-200 hover:shadow-slate-300 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <> 
                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs uppercase tracking-[0.2em]">Update Security</span>
                  </> 
                )}
              </button> 
            </div>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="text-center pt-8 border-t border-slate-50">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5"/>
            Profile secured by Edvora Academic Guard
          </p>
        </div>
      </div>
    </div>
  );
}
