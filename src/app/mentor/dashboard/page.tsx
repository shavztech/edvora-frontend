"use client";

import React, { useEffect, useState } from "react";
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
  Edit2,
  X,
  Save,
  List,
} from "lucide-react";
import toast from "react-hot-toast";

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
interface MentorOnboarding {
  syllabus?: string[];
  classes?: string[];
  subjects?: string[];
  experience?: string;
}

interface MentorProfile {
  name?: string;
  email?: string;
  mentorOnboarding?: MentorOnboarding;
}
/* ─── Constants ──────────────────────────────────────────────── */
const SYLLABUS_OPTIONS = [
  { id: "Kerala State", label: "Kerala State", icon: "🌴", queryKey: "kerala" },
  { id: "CBSE",         label: "CBSE Board",   icon: "🏛️", queryKey: "cbse"   },
];
const CLASS_LEVELS     = ["KG","1","2","3","4","5","6","7","8","9","10","11","12"];
const EXP_OPTIONS      = ["0-1 years","1-3 years","3-5 years","5+ years"];

/* ─── Helpers ────────────────────────────────────────────────── */
const formatTime = (t: string) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
};

/* ─── StatCard ───────────────────────────────────────────────── */
function StatCard({ label, value, icon: Icon, color, bg }: {
  label: string; value: number; icon: React.ElementType; color: string; bg: string;
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

/* ─── EditOnboardingModal ────────────────────────────────────── */
function EditOnboardingModal({
  current,
  onClose,
  onSaved,
}: {
  current: { syllabus?: string | string[]; classes?: string[]; subjects?: string[]; experience?: string } | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  // Normalise stored syllabus → always array of exact IDs
  const normaliseSyllabus = (raw: unknown): string[] => {
    if (!raw) return [];
    const arr = Array.isArray(raw) ? (raw as string[]) : [raw as string];
    return arr.filter((s: string) => SYLLABUS_OPTIONS.some((o) => o.id === s));
  };

  const [syllabuses,        setSyllabuses]        = useState<string[]>(normaliseSyllabus(current?.syllabus));
  const [classes,           setClasses]           = useState<string[]>(current?.classes  || []);
  const [subjects,          setSubjects]          = useState<string[]>(current?.subjects || []);
  const [experience,        setExperience]        = useState<string>(current?.experience || "");
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [loadingSubjects,   setLoadingSubjects]   = useState(false);
  const [saving,            setSaving]            = useState(false);

  /* fetch subjects whenever syllabuses change */
  useEffect(() => {
    if (syllabuses.length === 0) { setAvailableSubjects([]); return; }
    setLoadingSubjects(true);
    Promise.all(
      syllabuses.map((syl) => {
        const key = SYLLABUS_OPTIONS.find((o) => o.id === syl)?.queryKey ?? syl.toLowerCase();
        return api.get(`/mentors/subjects?syllabus=${key}`)
          .then((res) => {
            const data = res.data.subjects || res.data.data || [];
            return data.map((s: unknown) =>
              typeof s === "string" ? s : (s as Record<string, string>).subject || (s as Record<string, string>).name || (s as Record<string, string>).title
            ) as string[];
          })
          .catch(() => [] as string[]);
      })
    ).then((arrays) => {
      const merged = Array.from(new Set(arrays.flat()));
      setAvailableSubjects(merged);
      // remove subjects no longer in available list
      setSubjects((prev) => prev.filter((s) => merged.includes(s)));
      setLoadingSubjects(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syllabuses.join(",")]);

  const toggleSyllabus = (id: string) =>
    setSyllabuses((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const toggleClass = (c: string) =>
    setClasses((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);

  const toggleSubject = (s: string) =>
    setSubjects((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleSave = async () => {
    if (syllabuses.length === 0) return toast.error("Select at least one syllabus");
    if (classes.length    === 0) return toast.error("Select at least one class");
    if (subjects.length   === 0) return toast.error("Select at least one subject");
    if (!experience)              return toast.error("Select your experience level");

    setSaving(true);
    try {
      await api.post("/mentors/onboarding", { syllabus: syllabuses, classes, subjects, experience });
      toast.success("Profile updated successfully!");
      onSaved();
      onClose();
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-100">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm">Edit Teaching Profile</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Update your onboarding info</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="overflow-y-auto flex-1 p-6 space-y-7">

          {/* Syllabus */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" /> Academic Board
            </p>
            <div className="grid grid-cols-2 gap-3">
              {SYLLABUS_OPTIONS.map((s) => {
                const selected = syllabuses.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSyllabus(s.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                      selected
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-black text-sm">
                      <span>{s.icon}</span> {s.label}
                    </span>
                    {selected && <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Classes */}
          {syllabuses.length > 0 && (
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Users className="w-3 h-3" /> Classes Taught
              </p>
              <div className="grid grid-cols-7 gap-2">
                {CLASS_LEVELS.map((c) => {
                  const selected = classes.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleClass(c)}
                      className={`p-2.5 rounded-xl border-2 font-black text-xs transition-all text-center ${
                        selected
                          ? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm"
                          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Subjects */}
          {syllabuses.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <List className="w-3 h-3" /> Subjects
                  {subjects.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded-md text-[9px] font-black">
                      {subjects.length} selected
                    </span>
                  )}
                </p>
                {availableSubjects.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSubjects(availableSubjects)}
                    className="text-[10px] font-black text-indigo-600 px-3 py-1 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors uppercase tracking-widest"
                  >
                    Select All
                  </button>
                )}
              </div>
              {loadingSubjects ? (
                <div className="flex items-center justify-center py-6 bg-slate-50 rounded-2xl">
                  <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                  <span className="ml-2 text-xs text-slate-400 font-bold">Loading subjects…</span>
                </div>
              ) : availableSubjects.length === 0 ? (
                <p className="text-xs text-slate-400 font-bold text-center py-6 bg-slate-50 rounded-2xl">
                  No subjects found for selected board(s).
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1">
                  {availableSubjects.map((sub) => {
                    const selected = subjects.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubject(sub)}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 text-xs font-bold transition-all text-left ${
                          selected
                            ? "border-orange-400 bg-orange-50 text-orange-800 shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <span className="truncate">{sub}</span>
                        {selected && <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Experience */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3" /> Experience
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {EXP_OPTIONS.map((exp) => {
                const selected = experience === exp;
                return (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => setExperience(exp)}
                    className={`p-3 rounded-xl border-2 font-black text-xs transition-all text-center ${
                      selected
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    {exp}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-end gap-3 shrink-0 bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function MentorDashboard() {
  const [loading,       setLoading]       = useState(true);
  const [bookings,      setBookings]      = useState<Booking[]>([]);
  const [profile, setProfile] = useState<MentorProfile | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const today         = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter((b) => b.date === today && b.status === "accepted");
  const pending       = bookings.filter((b) => b.status === "pending");

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

  // Display syllabus as comma-separated string
  const syllabusDisplay = (() => {
    if (!onboarding?.syllabus) return "—";
    const arr = Array.isArray(onboarding.syllabus) ? onboarding.syllabus : [onboarding.syllabus];
    return arr.join(", ") || "—";
  })();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">

      {/* Edit Onboarding Modal */}
      {showEditModal && (
        <EditOnboardingModal
         current={onboarding ?? null}
          onClose={() => setShowEditModal(false)}
          onSaved={loadData}
        />
      )}

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
            <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-1">Today&apos;s Status</p>
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
        <StatCard label="Today's Requests" value={bookings.filter((b) => b.date === today).length} icon={Users}        color="text-indigo-600"  bg="bg-indigo-50"  />
        <StatCard label="Today Accepted"   value={todayBookings.length}                            icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard label="Today Rejected"   value={bookings.filter((b) => b.date === today && b.status === "rejected").length} icon={XCircle} color="text-rose-600" bg="bg-rose-50" />
      </div>

      {/* ══ MAIN GRID ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Today's Sessions */}
        <div className="lg:col-span-2 bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              Today&apos;s Sessions
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
              {todayBookings.map((b) => (
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
                      <p className="text-[11px] font-black text-slate-900">{formatTime(b.startTime)}</p>
                      <p className="text-[10px] text-slate-400 font-bold">→ {formatTime(b.endTime)}</p>
                    </div>
                    {(() => {
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

        {/* Sidebar */}
        <div className="flex flex-col gap-6">

          {/* Profile Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            {/* Avatar row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-900 text-white flex items-center justify-center font-black text-2xl">
                  {profile?.name?.[0]?.toUpperCase() || "M"}
                </div>
                <div>
                  <p className="font-black text-slate-900">{profile?.name || "Mentor"}</p>
                  <p className="text-xs text-slate-400 font-medium">{profile?.email}</p>
                </div>
              </div>
              {/* Edit button */}
              <button
                onClick={() => setShowEditModal(true)}
                title="Edit Onboarding"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            </div>

            {/* Onboarding Info */}
            {onboarding ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="uppercase tracking-widest text-slate-400">Syllabus</span>
                  <span className="ml-auto font-black text-right text-slate-800 text-[11px]">{syllabusDisplay}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="uppercase tracking-widest text-slate-400">Experience</span>
                  <span className="ml-auto font-black text-slate-800">{onboarding.experience || "—"}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="uppercase tracking-widest text-slate-400">Classes</span>
                  <span className="ml-auto font-black text-slate-800">
                    {onboarding.classes?.length ? onboarding.classes.join(", ") : "—"}
                  </span>
                </div>
               {(onboarding.subjects ?? []).length > 0 && (
                  <div className="pt-3 border-t border-slate-50">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Subjects</p>
                    <div className="flex flex-wrap gap-1.5">
                     {(onboarding.subjects ?? []).slice(0, 6).map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-bold">
                          {s}
                        </span>
                      ))}
                     {(onboarding.subjects?.length ?? 0) > 6 && (
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold">
                          +{(onboarding.subjects?.length ?? 0) - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4 bg-slate-50 rounded-2xl">
                <p className="text-xs text-slate-400 font-medium mb-3">No onboarding data yet.</p>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-indigo-700 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Set up profile
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Quick Actions</p>
            <div className="space-y-2">
              {[
                { label: "Manage Bookings", href: "/mentor/bookings",  icon: Calendar,      desc: "Accept or reject requests" },
                { label: "My Slots",        href: "/mentor/slots",     icon: Clock,         desc: "View your availability"   },
                { label: "Settings",        href: "/mentor/settings",  icon: GraduationCap, desc: "Profile & password"       },
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

      {/* ══ PENDING REQUESTS ══ */}
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
            {pending.slice(0, 5).map((b) => (
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