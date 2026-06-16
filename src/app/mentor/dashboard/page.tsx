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
  student: { _id: string; name: string; email: string };
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

export default function MentorDashboard() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<any>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, profileRes] = await Promise.all([
        api.get("/bookings/mentor"),
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

  const onboarding = profile?.mentorOnboarding;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">

      {/* ══ HEADER ══ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.25em] mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Mentor Portal
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}!
          </h1>
          <p className="text-slate-500 font-medium mt-1">{todayStr}</p>
        </div>
        <Link
          href="/mentor/bookings"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
        >
          View All Bookings
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
                ? `You have ${pending.length} pending request${pending.length > 1 ? "s" : ""} waiting for your response.`
                : "You're all caught up. No pending requests."}
            </p>
          </div>
          {pending.length > 0 && (
            <Link
              href="/mentor/bookings"
              className="shrink-0 flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-black text-sm transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Review Requests
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* ══ STATS ══ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard label="Today's Requests" value={bookings.filter(b => b.date === today).length} icon={Users}        color="text-indigo-600" bg="bg-indigo-50" />
        <StatCard label="Today Accepted"   value={todayBookings.length}                          icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard label="Today Rejected"   value={bookings.filter(b => b.date === today && b.status === "rejected").length} icon={XCircle} color="text-rose-600" bg="bg-rose-50" />
      </div>

      {/* ══ MAIN GRID ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Today's Sessions */}
        <div className="lg:col-span-2 bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              Today's Sessions
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
                      {b.student?.name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">{b.student?.name}</p>
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
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-900 text-white flex items-center justify-center font-black text-2xl">
                {profile?.name?.[0]?.toUpperCase() || "M"}
              </div>
              <div>
                <p className="font-black text-slate-900">{profile?.name || "Mentor"}</p>
                <p className="text-xs text-slate-400 font-medium">{profile?.email}</p>
              </div>
            </div>
            {onboarding && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="uppercase tracking-widest text-slate-400">Syllabus</span>
                  <span className="ml-auto capitalize font-black">{onboarding.syllabus || "—"}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="uppercase tracking-widest text-slate-400">Experience</span>
                  <span className="ml-auto font-black">{onboarding.experience || "—"}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="uppercase tracking-widest text-slate-400">Classes</span>
                  <span className="ml-auto font-black">
                    {onboarding.classes?.length ? onboarding.classes.join(", ") : "—"}
                  </span>
                </div>
                {onboarding.subjects?.length > 0 && (
                  <div className="pt-3 border-t border-slate-50">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Subjects</p>
                    <div className="flex flex-wrap gap-1.5">
                      {onboarding.subjects.slice(0, 6).map((s: string) => (
                        <span key={s} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-bold">
                          {s}
                        </span>
                      ))}
                      {onboarding.subjects.length > 6 && (
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold">
                          +{onboarding.subjects.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Quick Actions</p>
            <div className="space-y-2">
              {[
                { label: "Manage Bookings",   href: "/mentor/bookings",    icon: Calendar,  desc: "Accept or reject requests" },
                { label: "My Slots",          href: "/mentor/slots",       icon: Clock,     desc: "View your availability" },
                { label: "Settings",          href: "/mentor/settings",    icon: GraduationCap, desc: "Profile & password" },
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
        <div className="bg-white rounded-3xl border border-amber-200/60 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-amber-100/60 flex items-center justify-between bg-amber-50/40">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Pending Requests
              <span className="ml-1 px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[11px] font-black">
                {pending.length}
              </span>
            </h3>
            <Link
              href="/mentor/bookings"
              className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Manage All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {pending.slice(0, 5).map(b => (
              <div key={b._id} className="p-5 flex items-center justify-between hover:bg-amber-50/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-black text-sm">
                    {b.student?.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">{b.student?.name}</p>
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
                  <Link
                    href="/mentor/bookings"
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}