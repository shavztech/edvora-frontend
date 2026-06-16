"use client";

import { useState } from "react";
import api from "@/lib/api";
import { UserPlus, Mail, Lock, Shield, User } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const createUser = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await api.post("/superadmin/create-user", {
        name,
        email,
        password,
        role,
      });

      toast.success("User created successfully");
      setName("");
      setEmail("");
      setPassword("");
      setRole("student");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Onboard New User</h1>
        <p className="text-slate-500 font-medium mt-1">Add a new administrative or academic account to the system.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
               <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800">Account Details</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Secure Registration</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <User className="w-3.5 h-3.5" />
                Full Name
              </label>
              <input
                className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all placeholder:text-slate-300"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </label>
              <input
                className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all placeholder:text-slate-300"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Lock className="w-3.5 h-3.5" />
                Password
              </label>
              <input
                type="password"
                className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all placeholder:text-slate-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Shield className="w-3.5 h-3.5" />
                System Role
              </label>
              <select
                className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all cursor-pointer appearance-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={createUser}
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
            >
              {loading ? "Onboarding User..." : "Confirm & Create Account"}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
        <p className="text-xs font-bold text-indigo-600 leading-relaxed uppercase tracking-wide">
           Security Note: All new accounts are created as active by default. Passwords should be communicated securely to the respective users.
        </p>
      </div>
    </div>
  );
}
