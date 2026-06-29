"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
  ArrowLeft, User, Mail, Shield, Calendar, Clock, BookOpen,
  CheckCircle2, XCircle, AlertTriangle, Activity, TrendingUp,
  CreditCard, Search, Star, Briefcase,
  GraduationCap, Users, Video, BarChart2, Lock, Unlock, Loader2,
  RefreshCw
} from "lucide-react";

// ─────────────────── Types ───────────────────
interface BookingRecord {
  _id: string;
  subject: string;
  classLevel: string;
  startTime: string;
  endTime: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
  meetLink?: string;
  studentAttendance: boolean | null;
  mentorAttendance: boolean | null;
  attendanceStatus: string;
  mentor?: { _id: string; name: string; email: string };
  student?: { _id: string; name: string; email: string };
}
interface PaymentRecord {
  _id: string;
  amount: number;
  month: string;
  method: string;
  status: "pending" | "paid" | "rejected";
  paidAt?: string;
  createdAt: string;
}
interface StudentData {
  user: any;
  student: any;
  bookings: BookingRecord[];
  stats: { totalBookings: number; upcomingBookings: number; completedBookings: number };
  attendance: { totalClasses: number; present: number; absent: number; percentage: string };
  payments: { history: PaymentRecord[]; totalPaid: number; pendingPaid: number };
}
interface MentorData {
  user: any;
  mentor: any;
  bookings: BookingRecord[];
  stats: { totalBookings: number; upcomingBookings: number; completedBookings: number };
  attendance: { totalSessions: number; present: number; absent: number; percentage: string };
}

// ─────────────────── Helpers ───────────────────
const fmt = (d?: string) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const badgeCls = (status: string) => {
  const map: Record<string, string> = {
    accepted: "bg-emerald-50 text-emerald-700 border-emerald-100",
    paid:     "bg-emerald-50 text-emerald-700 border-emerald-100",
    pending:  "bg-amber-50 text-amber-700 border-amber-100",
    rejected: "bg-rose-50 text-rose-700 border-rose-100",
    completed:"bg-blue-50 text-blue-700 border-blue-100",
    absent:   "bg-rose-50 text-rose-700 border-rose-100",
    conflict: "bg-orange-50 text-orange-700 border-orange-100",
  };
  return `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${map[status] ?? "bg-slate-50 text-slate-600 border-slate-200"}`;
};

// ─────────────────── Sub-components ───────────────────
function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <div className={`rounded-2xl p-4 border ${color} flex flex-col gap-2 shadow-sm`}>
      <div className="w-8 h-8 rounded-xl bg-white/60 flex items-center justify-center">{icon}</div>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-70 leading-tight">{label}</p>
      <p className="text-xl font-black tracking-tight">{value}</p>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">{icon}</div>
        <h2 className="text-sm font-black text-slate-700 uppercase tracking-widest">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-slate-50 last:border-0">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest sm:w-36 shrink-0">{label}</span>
      <span className="text-sm font-bold text-slate-800 break-all">{value || "—"}</span>
    </div>
  );
}

function AttendanceBar({ pct }: { pct: number }) {
  const color = pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
    </div>
  );
}

function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
      />
    </div>
  );
}

// ═════════════════════════════════════════════
//  MAIN PAGE
// ═════════════════════════════════════════════
export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [baseUser, setBaseUser] = useState<any>(null);
  const [data, setData] = useState<StudentData | MentorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [togglingBlock, setTogglingBlock] = useState(false);
  const [bookingSearch, setBookingSearch] = useState("");
  const [paymentSearch, setPaymentSearch] = useState("");
  const [attendanceSearch, setAttendanceSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const userRes = await api.get(`/admin/users/${id}`);
      const user = userRes.data.user;
      setBaseUser(user);
      const detailEndpoint =
        user.role === "student"
          ? `/admin/users/${id}/student-details`
          : `/admin/users/${id}/mentor-details`;
      const detailRes = await api.get(detailEndpoint);
      setData(detailRes.data.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const handleBlockToggle = async () => {
    if (!baseUser) return;
    setTogglingBlock(true);
    try {
      const res = await api.patch(`/admin/users/${id}/block`);
      if (res.data.success) {
        toast.success(res.data.message);
        setBaseUser((prev: any) => ({ ...prev, isBlocked: res.data.isBlocked }));
        setData((prev: any) =>
          prev ? { ...prev, user: { ...prev.user, isBlocked: res.data.isBlocked } } : prev
        );
      }
    } catch {
      toast.error("Failed to update block status");
    } finally {
      setTogglingBlock(false);
    }
  };

  // ── Loading skeleton ──
  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="text-slate-400 font-black text-[10px] tracking-widest uppercase">Loading Profile…</p>
      </div>
    </div>
  );

  if (!baseUser || !data) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <AlertTriangle className="w-12 h-12 text-amber-400" />
      <p className="text-slate-600 font-bold">Profile not found or access denied.</p>
      <button onClick={() => router.back()} className="text-indigo-600 font-black text-sm flex items-center gap-1 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Go Back
      </button>
    </div>
  );

  const isStudent = baseUser.role === "student";
  const sd = isStudent ? (data as StudentData) : null;
  const u = data.user ?? baseUser;

  // Filtered table rows
  const filteredBookings = data.bookings.filter(b => {
    const term = bookingSearch.toLowerCase();
    const person = isStudent ? b.mentor?.name : b.student?.name;
    return !term || b.subject?.toLowerCase().includes(term) || person?.toLowerCase().includes(term) || b.date?.includes(term);
  });
  const filteredAttendance = data.bookings.filter(b => {
    const term = attendanceSearch.toLowerCase();
    const person = isStudent ? b.mentor?.name : b.student?.name;
    return !term || b.subject?.toLowerCase().includes(term) || person?.toLowerCase().includes(term) || b.date?.includes(term);
  });
  const filteredPayments = (sd?.payments.history ?? []).filter(p => {
    const term = paymentSearch.toLowerCase();
    return !term || p.month?.toLowerCase().includes(term) || p.method?.toLowerCase().includes(term) || p.status?.toLowerCase().includes(term);
  });

  const headerGrad = isStudent
    ? "from-indigo-600 via-violet-600 to-purple-700"
    : "from-emerald-500 via-teal-600 to-cyan-700";

  const attendancePct = parseFloat(
    isStudent
      ? (data as StudentData).attendance.percentage
      : (data as MentorData).attendance.percentage
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Users
      </button>

      {/* ════ HERO HEADER ════ */}
      <div className={`relative bg-gradient-to-br ${headerGrad} rounded-3xl p-8 text-white shadow-xl overflow-hidden`}>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 shrink-0 rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm flex items-center justify-center text-4xl font-black border-2 border-white/30">
            {u.name?.charAt(0)?.toUpperCase() ?? "?"}
          </div>

          {/* Name + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-black tracking-tight">{u.name ?? "Unknown"}</h1>
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-white/20 uppercase tracking-widest">{u.role}</span>
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${u.isBlocked ? "bg-rose-500/80" : "bg-emerald-500/80"}`}>
                {u.isBlocked ? "Blocked" : "Active"}
              </span>
            </div>
            <p className="text-white/70 text-sm font-medium flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />{u.email}
            </p>
            <p className="text-white/50 text-xs font-medium mt-1 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Joined {fmt(u.createdAt)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={handleBlockToggle}
              disabled={togglingBlock}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-md ${
                u.isBlocked ? "bg-emerald-500 hover:bg-emerald-400" : "bg-rose-500 hover:bg-rose-400"
              } text-white disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {togglingBlock
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : u.isBlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              {u.isBlocked ? "Unblock User" : "Block User"}
            </button>
            <button onClick={load} className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl font-black text-xs bg-white/10 hover:bg-white/20 transition-all">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="relative mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Bookings", value: data.stats.totalBookings },
            { label: "Upcoming", value: data.stats.upcomingBookings },
            { label: "Completed", value: data.stats.completedBookings },
            { label: "Attendance", value: `${attendancePct}%` },
          ].map(s => (
            <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 text-center border border-white/10">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/60">{s.label}</p>
              <p className="text-xl font-black mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ════ TWO-COLUMN LAYOUT ════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── LEFT: Details pane ── */}
        <div className="space-y-6 lg:col-span-1">

          {/* Personal Details */}
          <Section title="Personal Details" icon={<User className="w-4 h-4" />}>
            <div>
              <InfoRow label="Full Name" value={u.name} />
              <InfoRow label="Email" value={u.email} />
              <InfoRow label="Phone" value={u.phone ?? null} />
              <InfoRow label="User ID" value={u._id} />
              <InfoRow label="Role" value={u.role} />
              <InfoRow label="Registered" value={fmt(u.createdAt)} />
            </div>
          </Section>

          {/* Onboarding */}
          <Section
            title={isStudent ? "Student Onboarding" : "Mentor Onboarding"}
            icon={<GraduationCap className="w-4 h-4" />}
          >
            {isStudent ? (
              <div>
                <InfoRow label="Class" value={u.studentOnboarding?.class ?? u.onboarding?.class ?? u.classLevel} />
                <InfoRow label="Syllabus" value={u.studentOnboarding?.syllabus ?? u.onboarding?.syllabus ?? u.syllabus} />
                <InfoRow label="Course Type" value={u.studentOnboarding?.courseType ?? u.onboarding?.courseType ?? u.courseType} />
                <InfoRow label="Subjects" value={(u.studentOnboarding?.subjects ?? u.onboarding?.subjects ?? u.subjects ?? []).join(", ") || null} />
                <InfoRow label="Onboarding" value={u.onboardingCompleted ? "✅ Completed" : "⏳ Pending"} />
              </div>
            ) : (
              <div>
                <InfoRow label="Syllabus" value={u.mentorOnboarding?.syllabus} />
                <InfoRow label="Classes" value={(u.mentorOnboarding?.classes ?? []).join(", ") || null} />
                <InfoRow label="Subjects" value={(u.mentorOnboarding?.subjects ?? []).join(", ") || null} />
                <InfoRow label="Experience" value={u.mentorOnboarding?.experience} />
                <InfoRow label="Bio" value={u.mentorOnboarding?.bio} />
                <InfoRow label="Onboarding" value={u.isOnboarded ? "✅ Completed" : "⏳ Pending"} />
              </div>
            )}
          </Section>

          {/* Account Status */}
          <Section title="Account Status" icon={<Shield className="w-4 h-4" />}>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                <p className={`text-base font-black mt-0.5 ${u.isBlocked ? "text-rose-600" : "text-emerald-600"}`}>
                  {u.isBlocked ? "🚫 Blocked" : "✅ Active"}
                </p>
              </div>
              <button
                onClick={handleBlockToggle}
                disabled={togglingBlock}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all ${
                  u.isBlocked ? "bg-emerald-500 hover:bg-emerald-600" : "bg-rose-500 hover:bg-rose-600"
                } text-white disabled:opacity-60`}
              >
                {togglingBlock ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : u.isBlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                {u.isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          </Section>

          {/* Payment summary — students only */}
          {isStudent && sd && (
            <Section title="Payment Summary" icon={<CreditCard className="w-4 h-4" />}>
              <div className="grid grid-cols-2 gap-3">
                <StatCard icon={<TrendingUp className="w-4 h-4 text-emerald-600" />} label="Total Paid" value={`₹${sd.payments.totalPaid.toLocaleString()}`} color="bg-emerald-50 text-emerald-800 border-emerald-100" />
                <StatCard icon={<AlertTriangle className="w-4 h-4 text-amber-600" />} label="Pending" value={`₹${sd.payments.pendingPaid.toLocaleString()}`} color="bg-amber-50 text-amber-800 border-amber-100" />
              </div>
            </Section>
          )}
        </div>

        {/* ── RIGHT: Data pane ── */}
        <div className="space-y-6 lg:col-span-2">

          {/* Attendance */}
          <Section title="Attendance Analytics" icon={<BarChart2 className="w-4 h-4" />}>
            {isStudent ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <StatCard icon={<BookOpen className="w-4 h-4 text-indigo-600" />} label="Total Classes" value={(data as StudentData).attendance.totalClasses} color="bg-indigo-50 text-indigo-800 border-indigo-100" />
                <StatCard icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />} label="Present" value={(data as StudentData).attendance.present} color="bg-emerald-50 text-emerald-800 border-emerald-100" />
                <StatCard icon={<XCircle className="w-4 h-4 text-rose-600" />} label="Absent" value={(data as StudentData).attendance.absent} color="bg-rose-50 text-rose-800 border-rose-100" />
                <StatCard icon={<Activity className="w-4 h-4 text-violet-600" />} label="Attendance %" value={`${(data as StudentData).attendance.percentage}%`} color="bg-violet-50 text-violet-800 border-violet-100" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <StatCard icon={<Video className="w-4 h-4 text-teal-600" />} label="Total Sessions" value={(data as MentorData).attendance.totalSessions} color="bg-teal-50 text-teal-800 border-teal-100" />
                <StatCard icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />} label="Present" value={(data as MentorData).attendance.present} color="bg-emerald-50 text-emerald-800 border-emerald-100" />
                <StatCard icon={<XCircle className="w-4 h-4 text-rose-600" />} label="Absent" value={(data as MentorData).attendance.absent} color="bg-rose-50 text-rose-800 border-rose-100" />
                <StatCard icon={<Activity className="w-4 h-4 text-violet-600" />} label="Attendance %" value={`${(data as MentorData).attendance.percentage}%`} color="bg-violet-50 text-violet-800 border-violet-100" />
              </div>
            )}
            <AttendanceBar pct={attendancePct} />

            {/* Attendance table */}
            <div className="mt-5">
              <SearchInput value={attendanceSearch} onChange={setAttendanceSearch} placeholder="Search attendance records…" />
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Subject</th>
                      <th className="px-4 py-3 text-left">{isStudent ? "Mentor" : "Student"}</th>
                      <th className="px-4 py-3 text-left">Attendance</th>
                      <th className="px-4 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredAttendance.length === 0 ? (
                      <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400 font-bold text-xs">No records found</td></tr>
                    ) : filteredAttendance.map(b => (
                      <tr key={b._id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap">{fmt(b.date)}</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{b.subject}</td>
                        <td className="px-4 py-3 text-slate-600 font-medium text-xs">{isStudent ? b.mentor?.name : b.student?.name}</td>
                        <td className="px-4 py-3">
                          {(isStudent ? b.studentAttendance : b.mentorAttendance) === true
                            ? <span className={badgeCls("accepted")}>Present</span>
                            : (isStudent ? b.studentAttendance : b.mentorAttendance) === false
                            ? <span className={badgeCls("rejected")}>Absent</span>
                            : <span className={badgeCls("pending")}>—</span>}
                        </td>
                        <td className="px-4 py-3"><span className={badgeCls(b.attendanceStatus)}>{b.attendanceStatus}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>

          {/* Bookings */}
          <Section title="Booking History" icon={<BookOpen className="w-4 h-4" />}>
            <SearchInput value={bookingSearch} onChange={setBookingSearch} placeholder="Search by subject, name, or date…" />
            {filteredBookings.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-bold text-sm">No bookings found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBookings.map(b => (
                  <div key={b._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-sm transition-all gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${b.status === "accepted" ? "bg-emerald-500" : b.status === "rejected" ? "bg-rose-500" : "bg-amber-400"}`} />
                      <div>
                        <p className="font-black text-slate-800 text-sm">{b.subject}</p>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                          <Users className="w-3 h-3" />
                          {isStudent ? (b.mentor?.name ?? "—") : (b.student?.name ?? "—")}
                        </p>
                        <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                          <Calendar className="w-3 h-3" />{fmt(b.date)}
                          <Clock className="w-3 h-3 ml-1" />{b.startTime} – {b.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <span className={badgeCls(b.status)}>{b.status}</span>
                      {b.meetLink && (
                        <a href={b.meetLink} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors">
                          <Video className="w-3 h-3" /> Meet
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Payments — students only */}
          {isStudent && sd && (
            <Section title="Payment History" icon={<CreditCard className="w-4 h-4" />}>
              <SearchInput value={paymentSearch} onChange={setPaymentSearch} placeholder="Search by month, method, or status…" />
              {filteredPayments.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <CreditCard className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="font-bold text-sm">No payment records found</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                        <th className="px-4 py-3 text-left">Month</th>
                        <th className="px-4 py-3 text-left">Amount</th>
                        <th className="px-4 py-3 text-left">Method</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredPayments.map(p => (
                        <tr key={p._id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-4 py-3 font-bold text-slate-700">{p.month}</td>
                          <td className="px-4 py-3 font-black text-slate-800">₹{p.amount.toLocaleString()}</td>
                          <td className="px-4 py-3 font-medium text-slate-600 capitalize">{p.method}</td>
                          <td className="px-4 py-3"><span className={badgeCls(p.status)}>{p.status}</span></td>
                          <td className="px-4 py-3 font-medium text-slate-500 whitespace-nowrap">{fmt(p.paidAt ?? p.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}