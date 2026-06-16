"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  IndianRupee, 
  ArrowUpRight, 
  UserPlus, 
  ShieldCheck,
  LayoutDashboard
} from "lucide-react";
import StatCard from "@/components/StatCard";
import Link from "next/link";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    students: 0,
    mentors: 0,
    admins: 0,
    bookings: 0,
    accepted: 0,
    revenue: 0,
    pendingPayments: 0,
    demoRequests: 0
  });

  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentDemos, setRecentDemos] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Get role from localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setRole(JSON.parse(savedUser).role);
      }

      const [bookingsRes, usersRes, paymentsRes, demosRes] = await Promise.all([
        api.get("/bookings/admin"),
        api.get("/admin/users"),
        api.get("/payments"),
        api.get("/admin/demo")
      ]);

      const users = usersRes.data?.users || [];
      const studentsCount = users.filter((u: any) => u.role === "student").length;
      const mentorsCount = users.filter((u: any) => u.role === "mentor").length;
      const adminsCount = users.filter((u: any) => u.role === "admin" || u.role === "super_admin").length;
      
      // ... rest of loadData logic
      const todayDate = new Date().toISOString().split('T')[0];
      const bookings = Array.isArray(bookingsRes.data) ? bookingsRes.data : [];
      const payments = paymentsRes.data?.payments || [];
      const demos = Array.isArray(demosRes.data) ? demosRes.data : [];

      const todayTotalBookings = bookings.filter((b: any) => b.date === todayDate && b.status !== 'rejected');
      const pendingDemosList = demos.filter((d: any) => d.status === "pending");
      
      const totalRevenue = payments
        .filter((p: any) => p.status === "paid")
        .reduce((acc: number, curr: any) => acc + (curr.amount || 0), 0);
      
      const pendingPayCount = payments.filter((p: any) => p.status === "pending").length;

      setStats({
        students: studentsCount,
        mentors: mentorsCount,
        admins: adminsCount,
        bookings: todayTotalBookings.length,
        accepted: bookings.filter((b: any) => b.status === "accepted").length,
        revenue: totalRevenue,
        pendingPayments: pendingPayCount,
        demoRequests: pendingDemosList.length
      });

      setRecentBookings(todayTotalBookings.slice(0, 10));
      setRecentDemos(pendingDemosList.slice(0, 10));

    } catch (error: any) {
      console.error("Dashboard load error details:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const isSuperAdmin = role === 'super_admin';

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 🏙️ HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium">{today}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/bookings" className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            View All Bookings
          </Link>
        </div>
      </div>

      {/* 🏰 HERO BANNER */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <LayoutDashboard className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-3">Welcome back, {isSuperAdmin ? 'Super' : ''} Admin</h2>
          <p className="text-indigo-200 max-w-xl text-lg font-medium">
            There are <span className="text-white font-bold">{stats.pendingPayments} pending payments</span> and <span className="text-white font-bold">{stats.demoRequests} pending demo requests</span> requiring your attention.
          </p>
        </div>
      </div>

      {/* 📊 STATS GRID */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${isSuperAdmin ? '4' : '3'} gap-6`}>
        <StatCard title="Total Students" value={stats.students} icon={Users} color="text-indigo-600" bgColor="bg-indigo-50" />
        <StatCard title="Active Mentors" value={stats.mentors} icon={GraduationCap} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatCard title="Today's Session" value={stats.bookings} icon={Calendar} color="text-amber-600" bgColor="bg-amber-50" />
        {isSuperAdmin && (
          <StatCard title="Admin Network" value={stats.admins} icon={ShieldCheck} color="text-rose-600" bgColor="bg-rose-50" />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🕒 TODAY'S ACTIVITY */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              Today's Priorities
            </h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Action Required</span>
          </div>
          <div className="divide-y divide-slate-50">
            {recentBookings.length === 0 && recentDemos.length === 0 ? (
               <div className="p-20 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <CheckCircle2 className="w-8 h-8 text-slate-200" />
                  </div>
                  <h4 className="font-black text-slate-800">No immediate tasks</h4>
                  <p className="text-sm text-slate-500 font-medium">All sessions and demos for today are up to date.</p>
               </div>
            ) : (
              <>
                {/* Bookings */}
                {recentBookings.map((booking) => (
                  <div key={booking._id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        booking.status === 'pending' ? 'bg-amber-50 text-amber-500' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 capitalize">{booking.subject} Session</p>
                        <p className="text-xs text-slate-500">{booking.date} • {booking.startTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        booking.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' : 
                        booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Demos */}
                {recentDemos.map((demo) => (
                  <div key={demo._id} className="p-5 flex items-center justify-between hover:bg-indigo-50/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                        <UserPlus className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{demo.name} (Demo Request)</p>
                        <p className="text-xs text-slate-500">{demo.subject} • {demo.className}th Grade</p>
                      </div>
                    </div>
                    <Link href={`/admin/demo-requests?id=${demo._id}`} className="text-[10px] font-black text-indigo-600 hover:bg-indigo-600 hover:text-white px-3 py-1.5 rounded-lg border border-indigo-200 transition-all">
                      PROCESS
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* 🛡️ QUICK ACTIONS & STATUS */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link href="/admin/settings" className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-all group">
                <ShieldCheck className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                <span className="font-bold text-slate-700 group-hover:text-indigo-900">Security Settings</span>
              </Link>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <p className="text-indigo-100 text-sm font-bold mb-1">System Health</p>
            <h4 className="text-xl font-black mb-4">All Systems Online</h4>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
               <div className="bg-emerald-400 w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
