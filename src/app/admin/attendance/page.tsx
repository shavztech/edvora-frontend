"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { 
  Book, Calendar, Clock, User, Check, X as Cross, 
  Search, RefreshCw, ChevronLeft, ChevronRight, Activity, Circle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Types
interface AttendanceRecord {
  _id: string;

  studentId: string;
  mentorId: string;

  subject: string;
  class: string;

  studentName: string;
  mentorName: string;

  date: string;
  time: string;

  studentAttendance: boolean | null;
  mentorAttendance: boolean | null;

  status: "completed" | "pending" | "cancelled";
}
interface Stats {
  totalSessions: number;
  completed: number;
  pending: number;
  attendancePercentage: number;
}

export default function AdminAttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalSessions: 0,
    completed: 0,
    pending: 0,
    attendancePercentage: 0,
  });
  
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  
  // Search
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1); // Reset page on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch Stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get("/admin/attendance/stats");
      if (res.data.success) {
        const backendStats = res.data.data || res.data.stats;
        setStats({
          totalSessions: backendStats.totalSessions || 0,
          completed: backendStats.completedSessions || backendStats.completed || 0,
          pending: backendStats.pendingSessions || backendStats.pending || 0,
          attendancePercentage: backendStats.attendancePercentage || 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  }, []);

  // Fetch Data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (debouncedSearch) {
        res = await api.get("/admin/attendance/search", { 
          params: { query: debouncedSearch, page, limit: 10 } 
        });
      } else if (statusFilter !== "all" || monthFilter !== "all" || yearFilter !== "all") {
        res = await api.get("/admin/attendance/filter", {
          params: { status: statusFilter, month: monthFilter, year: yearFilter, page, limit: 10 }
        });
      } else {
        res = await api.get("/admin/attendance", {
          params: { page, limit: 10 }
        });
      }
      
      if (res.data.success) {
        console.log("ATTENDANCE RESPONSE");
console.log(res.data);
        setRecords(res.data.records || res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error("Failed to fetch attendance data", error);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, statusFilter, monthFilter, yearFilter, page]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReset = () => {
    setStatusFilter("all");
    setMonthFilter("all");
    setYearFilter("all");
    setSearchInput("");
    setDebouncedSearch("");
    setPage(1);
  };

  // Helper for attendance icon
  const getAttendanceIcon = (status: boolean | null) => {
    if (status === true) return <Check className="w-5 h-5 text-emerald-500 font-bold" />;
    if (status === false) return <Cross className="w-5 h-5 text-rose-500 font-bold" />;
    return <Circle className="w-2.5 h-2.5 text-slate-300 fill-slate-300 mx-auto" />;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight mb-2">Attendance</h1>
          <p className="text-blue-100 font-medium">Monitor attendance of students and mentors.</p>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Sessions", value: stats.totalSessions, icon: <Book className="w-5 h-5 text-blue-600" />, color: "bg-blue-50 border-blue-100" },
          { label: "Completed", value: stats.completed, icon: <Check className="w-5 h-5 text-emerald-600" />, color: "bg-emerald-50 border-emerald-100" },
          { label: "Pending", value: stats.pending, icon: <Clock className="w-5 h-5 text-amber-600" />, color: "bg-amber-50 border-amber-100" },
          { label: "Attendance %", value: `${stats.attendancePercentage}%`, icon: <Activity className="w-5 h-5 text-indigo-600" />, color: "bg-indigo-50 border-indigo-100" },
        ].map((stat, idx) => (
          <div key={idx} className={`rounded-3xl p-6 border ${stat.color} shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 bg-white/80 backdrop-blur-sm`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.color.replace('border', 'bg').replace('50', '100')}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          
          <div className="flex-1 w-full relative group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Student, Mentor, or Subject..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>

          <div className="w-full md:w-48">
             <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Status Filter</label>
             <select
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer appearance-none"
             >
               <option value="all">All</option>
               <option value="completed">Completed</option>
               <option value="pending">Pending</option>
             </select>
          </div>

          <div className="w-full md:w-40">
             <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Log Month</label>
             <select
               value={monthFilter}
               onChange={(e) => setMonthFilter(e.target.value)}
               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer appearance-none"
             >
               <option value="all">All Months</option>
               {Array.from({length: 12}).map((_, i) => (
                 <option key={i} value={i+1}>{new Date(2000, i, 1).toLocaleString('default', { month: 'long' })}</option>
               ))}
             </select>
          </div>

          <div className="w-full md:w-32">
             <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Log Year</label>
             <select
               value={yearFilter}
               onChange={(e) => setYearFilter(e.target.value)}
               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer appearance-none"
             >
               <option value="all">All Years</option>
               {[2024, 2025, 2026, 2027].map(y => (
                 <option key={y} value={y}>{y}</option>
               ))}
             </select>
          </div>

          <button
            onClick={handleReset}
            className="w-full md:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-colors shadow-md shrink-0 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reset Filters
          </button>
        </div>
      </div>

      {/* SESSION NARRATIVE / CARDS */}
      <div>
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-2">Session Narrative</h2>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-28 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-100 shadow-sm animate-pulse"></div>
            ))}
          </div>
        ) : records.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-slate-100 shadow-sm">
             <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
               <Book className="w-10 h-10 text-slate-300" />
             </div>
             <p className="text-slate-500 font-bold">No attendance records found</p>
             <p className="text-sm text-slate-400 mt-1">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {records.map((record) => (
             <motion.div
  key={record._id}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95 }}
  className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
>
                  
                  {/* Left: Icon & Subject Info */}
                  <div className="flex items-center gap-5 w-full md:w-1/3">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors shrink-0">
                      <Book className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-black text-slate-800">{record.subject}</h3>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px] font-bold">
                          {record.class}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                     <span
  onClick={() => router.push(`/admin/users/${record.studentId}`)}
  className="flex items-center gap-1.5 text-blue-600 hover:underline cursor-pointer"
>
  <User className="w-3.5 h-3.5" />
  {record.studentName}
</span>
<span
  onClick={() => router.push(`/admin/users/${record.mentorId}`)}
  className="flex items-center gap-1.5 text-purple-600 hover:underline cursor-pointer"
>
  <User className="w-3.5 h-3.5" />
  {record.mentorName}
</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> {record.date ? new Date(record.date).toISOString().split('T')[0] : "—"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Time */}
                  <div className="flex items-center gap-4 w-full md:w-1/4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-700">{record.time}</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Reporting Interval</p>
                    </div>
                  </div>

                  {/* Right: Attendance marks & Badge */}
                  <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 w-full md:w-auto">
                    
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Student</p>
                        <div className="h-6 flex items-center justify-center">
                           {getAttendanceIcon(record.studentAttendance)}
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Mentor</p>
                        <div className="h-6 flex items-center justify-center">
                           {getAttendanceIcon(record.mentorAttendance)}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {record.status === 'completed' && (
                        <div className="px-6 py-2.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                          Completed
                        </div>
                      )}
                      {record.status === 'pending' && (
                        <div className="px-6 py-2.5 rounded-full bg-amber-400 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-400/20">
                          Pending
                        </div>
                      )}
                      {record.status === 'cancelled' && (
                        <div className="px-6 py-2.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20">
                          Cancelled
                        </div>
                      )}
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-sm font-black text-slate-600">
            Page {page} of {totalPages}
          </span>
          
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
      
    </div>
  );
}
