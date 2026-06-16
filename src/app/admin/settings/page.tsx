"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Shield,
  Plus,
  Loader2,
  Eye,
  EyeOff,
  UserCheck,
  ShieldCheck,
  Save,
  Pencil,
  X,
  Sparkles,
  Key,
  Crown
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [adminUser, setAdminUser] = useState<any>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    api.get("/admin/settings").then((res) => {
      setAdminUser(res.data);
      setEditName(res.data.name);
    }).catch(err => {
      console.error("Failed to fetch admin settings", err);
    });
  }, []);

  const isSuperAdmin = adminUser?.role === "super_admin";

  const createUser = async () => {
    if (!name || !email || !password) {
      return toast.error("Please fill in all required fields");
    }
    setSubmitting(true);
    try {
      await api.post("/superadmin/create-user", { name, email, password, role });
      toast.success("User created successfully!");
      setName(""); setEmail(""); setPassword(""); setRole("student");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  const changeAdminPassword = async () => {
    if (!currentPassword || !newPassword) {
      return toast.error("Please fill in both password fields");
    }
    setLoading(true);
    try {
      await api.patch("/admin/settings/password", { currentPassword, newPassword });
      toast.success("Password updated successfully!");
      setCurrentPassword(""); setNewPassword("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!editName) return toast.error("Name is required");
    setUpdatingProfile(true);
    try {
      const res = await api.patch("/admin/settings/profile", { name: editName });
      toast.success(res.data.message || "Profile updated!");
      setAdminUser((prev: any) => ({ ...prev, name: editName }));
      setIsEditingProfile(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdatingProfile(false);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
    <div className="max-w-6xl mx-auto p-3 sm:p-6 md:p-10 space-y-6 md:space-y-8 animate-fade-up">

      {/* ══ HEADER ══ */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/20">
          <Sparkles className="w-3 h-3" />
          Command Center
        </div>
        <h1 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter">Admin Settings</h1>
        <p className="text-slate-500 font-medium text-sm">Manage your profile, security, and user provisioning.</p>
      </div>

      {/* ══ MAIN GRID ══ */}
      <div className={`grid gap-6 ${isSuperAdmin ? 'lg:grid-cols-2' : 'max-w-2xl'}`}>

        {/* ── PROFILE CARD ── */}
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden h-fit">
          {/* Card Header */}
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-2xl bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-[900] text-slate-800 tracking-tight">Profile Information</h2>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Account Details</p>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {!adminUser ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* Name Field */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    {!isEditingProfile && isSuperAdmin && (
                      <button
                        onClick={() => { setIsEditingProfile(true); setEditName(adminUser.name); }}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {isEditingProfile && (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setIsEditingProfile(false)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={handleProfileUpdate}
                          disabled={updatingProfile}
                          className="p-1.5 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-all disabled:opacity-50"
                        >
                          {updatingProfile ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${isEditingProfile ? 'bg-white border-primary ring-4 ring-primary/5' : 'bg-slate-50 border-slate-100'}`}>
                    <User className={`w-4 h-4 flex-shrink-0 ${isEditingProfile ? 'text-primary' : 'text-slate-400'}`} />
                    {isEditingProfile ? (
                      <input
                        className="w-full bg-transparent border-none focus:outline-none text-sm font-bold text-slate-700"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <span className="text-sm font-bold text-slate-700">{adminUser.name}</span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Email Address</label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-sm font-bold text-slate-700 break-all">{adminUser.email}</span>
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Role</label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    {isSuperAdmin ? <Crown className="w-4 h-4 text-amber-500" /> : <Shield className="w-4 h-4 text-primary" />}
                    <span className={`text-sm font-[900] uppercase tracking-wider ${isSuperAdmin ? 'text-amber-600' : 'text-primary'}`}>
                      {adminUser.role?.replace('_', ' ')}
                    </span>
                    {isSuperAdmin && (
                      <span className="ml-auto text-[9px] font-black text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 uppercase tracking-widest">Super</span>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-50">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-center">Identity Verification Module Active</p>
          </div>
        </div>

        {/* ── SECURITY / PASSWORD CARD ── */}
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden h-fit">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-2xl bg-rose-500/10 flex items-center justify-center">
                <Key className="w-4 h-4 text-rose-500" />
              </div>
              <div>
                <h2 className="text-sm font-[900] text-slate-800 tracking-tight">Security & Password</h2>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Admin Auth</p>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Current Password */}
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block group-focus-within:text-primary transition-colors">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-300 text-slate-700"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block group-focus-within:text-primary transition-colors">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-300 text-slate-700"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={changeAdminPassword}
              disabled={loading}
              className="w-full py-3.5 bg-primary hover:opacity-90 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShieldCheck className="w-4 h-4" /> Update Password</>}
            </button>
          </div>

          <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-50">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-center">Encrypted Credential Storage</p>
          </div>
        </div>
      </div>

      {/* ══ SUPER ADMIN: CREATE USER ══ */}
      {isSuperAdmin && (
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden max-w-2xl">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                <UserPlus className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h2 className="text-sm font-[900] text-slate-800 tracking-tight">Register New User</h2>
                <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Super Admin Only</p>
              </div>
            </div>
            <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 uppercase tracking-widest flex items-center gap-1">
              <Crown className="w-2.5 h-2.5" /> Privileged
            </span>
          </div>

          <div className="p-5 space-y-4">
            {/* Name */}
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block group-focus-within:text-primary transition-colors">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-300 text-slate-700"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block group-focus-within:text-primary transition-colors">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-300 text-slate-700"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block group-focus-within:text-primary transition-colors">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-300 text-slate-700"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Assigned Role</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "student", label: "Student", icon: <User className="w-3.5 h-3.5" /> },
                  { id: "mentor", label: "Mentor", icon: <UserCheck className="w-3.5 h-3.5" /> },
                  { id: "admin", label: "Admin", icon: <Shield className="w-3.5 h-3.5" /> }
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`py-3 px-3 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all flex flex-col items-center gap-1.5 ${role === r.id
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"
                    }`}
                  >
                    {r.icon}
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={createUser}
              disabled={submitting}
              className="w-full py-3.5 bg-primary hover:opacity-90 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> Create Account</>}
            </button>
          </div>

          <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-50">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-center">Secure User Provisioning Protocol</p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
