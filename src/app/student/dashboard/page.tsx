"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  BookOpen,
  Video,
  ArrowUpRight,
  GraduationCap,
  Layers,
  LayoutDashboard,
  ChevronRight,
  Loader2,
  AlertTriangle,
  TrendingUp,
  Search,
} from "lucide-react";

interface Booking {
  _id: string;
  subject: string;
  classLevel: string;
  startTime: string;
  endTime: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
  meetLink?: string;
  mentor: { _id: string; name: string; email: string };
}

const formatTime = (t: string) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
};

function StatCard({
  label, value, icon: Icon, color, bg,
}: {
  label: string; value: number; icon: any; color: string; bg: string;
}) {
  return (
    <div className="bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-900 leading-tight">{value}</p>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<any>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, profileRes] = await Promise.all([
        api.get("/bookings/student"),
        api.get("/auth/me"),
      ]);
      setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : []);
      const user = profileRes.data?.user || profileRes.data;
      setProfile(user);
      if (user) localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter(b => b.date === today && b.status === "accepted");
  const pending = bookings.filter(b => b.status === "pending");
  const accepted = bookings.filter(b => b.status === "accepted");
  const rejected = bookings.filter(b => b.status === "rejected");

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600 opacity-70" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">

      {/* ══ HEADER ══ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.25em] mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Student Portal
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}!
          </h1>
          <p className="text-slate-500 font-medium mt-1">{todayStr}</p>
        </div>
        <Link
          href="/student/bookings"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
        >
          View My Bookings
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ══ HERO BANNER ══ */}
      <div className="relative bg-gradient-to-r from-indigo-950 to-slate-900 rounded-[28px] p-6 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <GraduationCap className="w-56 h-56" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-1">Today's Status</p>
            <h2 className="text-2xl font-black mb-1.5">
              {todayBookings.length === 0
                ? "No sessions today"
                : `${todayBookings.length} session${todayBookings.length > 1 ? "s" : ""} scheduled`}
            </h2>
            <p className="text-indigo-200 font-medium">
              {pending.length > 0
                ? `You have ${pending.length} pending request${pending.length > 1 ? "s" : ""} waiting for a mentor's response.`
                : "You're all caught up. No pending requests."}
            </p>
          </div>

        </div>
      </div>

      {/* ══ STATS ══ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard label="Today's Sessions" value={bookings.filter(b => b.date === today).length} icon={Users}        color="text-indigo-600" bg="bg-indigo-50" />
        <StatCard label="Total Accepted"   value={accepted.length}                               icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard label="Pending Approval" value={pending.length}                                icon={Clock} color="text-amber-600" bg="bg-amber-50" />
      </div>

      {/* ══ MAIN GRID ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Today's Sessions */}
        <div className="lg:col-span-2 bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              Today's Classes
            </h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {todayBookings.length} Scheduled
            </span>
          </div>

          {todayBookings.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Calendar className="w-7 h-7 text-slate-200" />
              </div>
              <p className="font-black text-slate-700 mb-1">Free day!</p>
              <p className="text-sm text-slate-400 font-medium">No accepted sessions scheduled for today.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {todayBookings.map(b => (
                <div key={b._id} className="p-3.5 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-900 text-white flex items-center justify-center font-black text-sm">
                      {b.mentor?.name?.[0]?.toUpperCase() || "M"}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">{b.mentor?.name || "Mentor"}</p>
                      <p className="text-[11px] text-slate-400 font-bold">
                        {b.subject} · Class {b.classLevel}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[11px] font-black text-slate-900">
                        {formatTime(b.startTime)}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold">
                        → {formatTime(b.endTime)}
                      </p>
                    </div>
                    {(() => {
                      // Check if the session has actually expired (date + endTime)
                      const now = new Date();
                      const [endH, endM] = b.endTime.split(":").map(Number);
                      const sessionEnd = new Date(`${b.date}T${String(endH).padStart(2,"0")}:${String(endM).padStart(2,"0")}:00`);
                      const isExpired = now > sessionEnd;

                      if (!b.meetLink || isExpired) {
                        return (
                          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-not-allowed">
                            <Video className="w-3.5 h-3.5" />
                            {isExpired ? "Expired" : "No Link"}
                          </div>
                        );
                      }
                      return (
                        <a
                          href={b.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-sm"
                        >
                          <Video className="w-3.5 h-3.5" />
                          Join
                        </a>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Profile + Quick Actions */}
        <div className="flex flex-col gap-6">

          {/* Profile Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-[24px] bg-indigo-900 text-white flex items-center justify-center font-black text-3xl shadow-sm mb-4">
              {profile?.name?.[0]?.toUpperCase() || "S"}
            </div>
            <p className="font-black text-slate-900 text-lg">{profile?.name || "Student"}</p>
            <p className="text-xs text-slate-400 font-medium mb-5">{profile?.email}</p>
            
            <div className="w-full pt-5 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Classes</p>
                <p className="text-2xl font-black text-slate-900">{accepted.length}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending</p>
                <p className="text-2xl font-black text-slate-900">{pending.length}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Quick Actions</p>
            <div className="space-y-2">
              {[
                { label: "My Bookings",   href: "/student/bookings",    icon: Calendar,  desc: "View your classes" },
                { label: "Settings",      href: "/student/settings",    icon: GraduationCap, desc: "Profile & password" },
              ].map(({ label, href, icon: Icon, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <Icon className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800">{label}</p>
                    <p className="text-[10px] text-slate-400 truncate">{desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ══ PENDING REQUESTS (if any) ══ */}
      {pending.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Pending Requests
              <span className="ml-1 px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[11px] font-black">
                {pending.length}
              </span>
            </h3>
            <Link
              href="/student/bookings"
              className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Manage All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {pending.slice(0, 5).map(b => (
              <div key={b._id} className="p-5 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-black text-sm">
                    {b.mentor?.name?.[0]?.toUpperCase() || "M"}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">Mentor {b.mentor?.name}</p>
                    <p className="text-[11px] text-slate-400 font-bold">
                      {b.subject} · Class {b.classLevel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-[11px] font-black text-slate-700">{b.date}</p>
                    <p className="text-[10px] text-slate-400 font-bold">
                      {formatTime(b.startTime)} – {formatTime(b.endTime)}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-amber-100 text-amber-600 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-default">
                    Waiting for Mentor
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}