"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { 
  ClipboardCheck, 
  Search,
  Filter,
  Check,
  X,
  AlertCircle,
  Users,
  User as UserIcon,
  BookOpen,
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  UserCircle
} from "lucide-react";
import toast from "react-hot-toast";

interface Booking {
  _id: string;
  subject: string;
  classLevel: string;
  startTime: string;
  endTime: string;
  date: string;
  status: string;
  student: {
    _id: string;
    name: string;
    email: string;
  };
  mentor: {
    _id: string;
    name: string;
    email: string;
  };
  studentAttendance: boolean | null;
  mentorAttendance: boolean | null;
  attendanceStatus: "pending" | "completed" | "absent" | "conflict";
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: "student" | "mentor" | "admin";
  isBlocked: boolean;
  createdAt: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const YEARS = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];

export default function AdminAttendancePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  
  // Selection View Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "student" | "mentor">("all");

  // Detail View Filters
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterAttendance, setFilterAttendance] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users");
      // Filter out admins from selection
      const filtered = (res.data.users || []).filter((u: User) => u.role !== "admin");
      setUsers(filtered);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserAttendance = async (user: User) => {
    setDetailLoading(true);
    try {
      const params: any = { status: "accepted" };
      if (user.role === "student") params.studentId = user._id;
      if (user.role === "mentor") params.mentorId = user._id;
      
      if (filterMonth) params.month = filterMonth;
      if (filterYear) params.year = filterYear;
      if (filterAttendance) params.attendance = filterAttendance;

      const res = await api.get("/bookings/admin", { params });
      setUserBookings(res.data);
    } catch (err) {
      toast.error("Failed to load attendance records");
    } finally {
      setDetailLoading(false);
    }
  };
useEffect(() => {
  fetchUsers();

  const interval = setInterval(() => {
    fetchUsers();
  }, 10000);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    if (selectedUser) {
      fetchUserAttendance(selectedUser);
    }
  }, [selectedUser, filterMonth, filterYear, filterAttendance]);

  const filteredUsers = users.filter(u => {
    const nameMatch = u.name.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = roleFilter === "all" || u.role === roleFilter;
    return (nameMatch || emailMatch) && roleMatch;
  });

  const formatTime = (time: string) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${m} ${ampm}`;
  };

  // Stats for selected user
  const stats = {
    total: userBookings.length,
    completed: userBookings.filter(b => b.attendanceStatus === "completed").length,
    absent: userBookings.filter(b => b.attendanceStatus === "absent").length,
    conflict: userBookings.filter(b => b.attendanceStatus === "conflict").length,
    pending: userBookings.filter(b => b.attendanceStatus === "pending").length,
  };

  if (!selectedUser) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 space-y-8 animate-fade-in relative z-10">
        {/* HEADER */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm shadow-indigo-50/50">
             <ClipboardCheck className="w-3.5 h-3.5" />
             Attendance Portal
          </div>
          <h1 className="text-4xl sm:text-5xl font-[900] text-gray-900 tracking-tighter leading-tight">Registry Explorer</h1>
          <p className="text-gray-500 font-medium text-sm sm:text-base max-w-2xl">Audit individual attendance performance. Select a profile below to examine their complete session history and reporting accuracy.</p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white p-6 sm:p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/20 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text"
              placeholder="Filter by name or email identity..."
              className="w-full pl-14 pr-4 py-5 bg-gray-50/40 border border-transparent rounded-[2rem] text-sm font-bold focus:bg-white focus:border-indigo-600 focus:ring-[12px] focus:ring-indigo-100/30 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-gray-100/60 p-1.5 rounded-[2rem] w-full md:w-auto border border-gray-100">
            {(["all", "student", "mentor"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-8 py-3.5 rounded-[1.75rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  roleFilter === r ? "bg-white text-indigo-600 shadow-lg shadow-gray-200" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {r === 'all' ? 'Entire Portal' : r + 's'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-gray-50/50 rounded-[40px] border border-gray-100/50 animate-pulse"></div>
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="bg-gray-50/30 rounded-[4rem] border-2 border-dashed border-gray-100 p-28 text-center space-y-5">
             <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto border border-gray-50">
                <UserCircle className="w-12 h-12 text-gray-200" />
             </div>
             <p className="text-gray-300 font-black text-xs uppercase tracking-[0.4em]">Zero Identities Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {filteredUsers.map((u) => (
              <div 
                key={u._id} 
                onClick={() => setSelectedUser(u)}
                className="bg-white border border-gray-100 p-7 rounded-[40px] shadow-sm hover:shadow-2xl hover:border-indigo-200 hover:-translate-y-2 transition-all duration-500 group cursor-pointer flex items-center justify-between relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/0 group-hover:to-indigo-50/30 transition-colors pointer-events-none"></div>
                <div className="flex items-center gap-5 relative z-10">
                  <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-white text-xl font-black transition-all duration-500 group-hover:bg-opacity-90 group-hover:rounded-[30px] ${
                    u.role === 'mentor' ? 'bg-indigo-600 shadow-xl shadow-indigo-100' : 'bg-slate-950 shadow-xl shadow-slate-100'
                  }`}>
                    {u.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[9px] font-black uppercase tracking-widest block leading-none ${u.role === 'mentor' ? 'text-indigo-400' : 'text-slate-400'}`}>
                        {u.role} identity
                      </span>
                      {u.isBlocked && (
                        <span className="bg-rose-50 text-rose-700 text-[12px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full border border-rose-100 italic">
                          Blocked
                        </span>
                      )}
                    </div>
                    <h3 className="font-black text-gray-900 leading-none text-base mb-1 group-hover:text-indigo-600 transition-colors">{u.name}</h3>
                    <p className="text-[11px] text-gray-400 font-bold tracking-tight truncate max-w-[150px]">{u.email}</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 text-gray-300 shadow-sm border border-gray-100 relative z-10">
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // INDIVIDUAL VIEW
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 space-y-10 animate-fade-in relative z-10">
       {/* HEADER & NAV */}
       <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
         <div className="space-y-6">
            <button 
              onClick={() => setSelectedUser(null)}
              className="flex items-center gap-2 text-[11px] font-[900] uppercase tracking-[0.2em] text-indigo-600 hover:gap-4 transition-all bg-indigo-50/50 px-5 py-2.5 rounded-full border border-indigo-100/50"
            >
              <ArrowLeft className="w-4 h-4" />
              Registry Overview
            </button>
            <div className="flex items-center gap-6">
              <div className={`w-20 h-20 rounded-[30px] flex items-center justify-center text-white text-3xl font-black shadow-2xl ${
                selectedUser.role === 'mentor' ? 'bg-indigo-600 shadow-indigo-200/50' : 'bg-slate-950 shadow-slate-200/50'
              }`}>
                {selectedUser.name[0].toUpperCase()}
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <h1 className="text-4xl font-[900] text-gray-900 tracking-tighter leading-none">{selectedUser.name}</h1>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest w-fit">
                      {selectedUser.role} Level
                    </span>
                    {selectedUser.isBlocked && (
                      <span className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-[9px] font-black uppercase tracking-widest w-fit shadow-lg shadow-rose-200">
                        Blocked
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 font-bold text-sm bg-gray-50 w-fit px-3 py-1 rounded-lg border border-gray-100">{selectedUser.email}</p>
              </div>
            </div>
         </div>

         {/* STATS ROW */}
         <div className="flex flex-wrap gap-4">
            {[
              { label: "Completed", value: stats.completed, color: "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-50", icon: Check },
              { label: "Absent", value: stats.absent, color: "bg-rose-50 text-rose-600 border-rose-100 shadow-rose-50", icon: X },
              { label: "Conflict", value: stats.conflict, color: "bg-purple-50 text-purple-600 border-purple-100 shadow-purple-50", icon: AlertCircle },
            ].map((stat, idx) => (
              <div key={idx} className={`px-7 py-5 rounded-[2rem] border ${stat.color} flex items-center gap-5 shadow-xl transition-transform hover:-translate-y-1`}>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none mb-1.5">{stat.label}</span>
                  <p className="text-3xl font-black tracking-tighter leading-none">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center shadow-sm">
                  <stat.icon className="w-5 h-5 opacity-70" strokeWidth={3} />
                </div>
              </div>
            ))}
         </div>
       </div>

       {/* FILTERS */}
       <div className="bg-white p-7 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:items-end">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 leading-none">Status Filter</label>
            <select 
              className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3.5 rounded-2xl text-xs font-bold focus:bg-white focus:border-indigo-600 transition-all cursor-pointer appearance-none outline-none h-[52px]"
              value={filterAttendance}
              onChange={(e) => setFilterAttendance(e.target.value)}
            >
              <option value="">Full History</option>
              <option value="present">Completed</option>
               <option value="absent">Absent</option>
               <option value="conflict">Conflict</option>
               <option value="pending">Pending Status</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 leading-none">Log Month</label>
            <select 
              className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3.5 rounded-2xl text-xs font-bold focus:bg-white focus:border-indigo-600 transition-all cursor-pointer appearance-none outline-none h-[52px]"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              <option value="">All Months</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 leading-none">Log Year</label>
            <select 
              className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3.5 rounded-2xl text-xs font-bold focus:bg-white focus:border-indigo-600 transition-all cursor-pointer appearance-none outline-none h-[52px]"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="">Year Selection</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="pb-0.5">
             <button 
               onClick={() => { setFilterAttendance(""); setFilterMonth(""); setFilterYear(""); }}
               className="w-full h-[52px] bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
             >
               Reset Filters
             </button>
          </div>
       </div>

       {/* HISTORY SECTION */}
       <div className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-gray-300">Session Narrative</h2>
            <div className="h-px flex-1 bg-gray-100"></div>
          </div>

          {detailLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-5">
               <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-lg shadow-indigo-100"></div>
               <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Aggregating session data...</p>
            </div>
          ) : userBookings.length === 0 ? (
            <div className="bg-gray-50/50 rounded-[4rem] border border-gray-100 p-24 text-center space-y-5">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto border border-gray-50">
                 <AlertCircle className="w-10 h-10 text-gray-100" />
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 font-bold text-sm">No historical reports discovered for this configuration.</p>
                <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest">System Status: Clean</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 pb-20">
               {userBookings.map((b) => (
                 <div key={b._id} className="bg-white border border-gray-100 p-6 sm:p-8 rounded-[3rem] shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 flex flex-col lg:flex-row lg:items-center justify-between gap-10 group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-indigo-50/30 transition-colors"></div>
                   
                   <div className="flex items-center gap-7 lg:flex-1 relative z-10">
                      <div className="w-16 h-16 rounded-[24px] bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-indigo-600 transition-all duration-500 group-hover:rounded-[28px] group-hover:shadow-xl group-hover:shadow-indigo-100 group-hover:border-indigo-600">
                        <BookOpen className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                           <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none group-hover:text-indigo-600 transition-colors truncate">{b.subject}</h3>
                           <span className="px-2.5 py-1 rounded-lg bg-gray-100 group-hover:bg-indigo-50 text-[10px] font-black text-gray-500 group-hover:text-indigo-500 transition-colors whitespace-nowrap">Grade {b.classLevel}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                           <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                             <UserIcon className="w-3.5 h-3.5 text-indigo-400"/> 
                             <span className="text-xs font-black text-gray-600 truncate max-w-[120px]">
                               {selectedUser.role === 'student' ? b.mentor?.name : b.student?.name}
                             </span>
                           </div>
                           <div className="flex items-center gap-2">
                             <Calendar className="w-3.5 h-3.5 text-gray-300" />
                             <span className="text-[11px] font-bold text-gray-400">{b.date}</span>
                           </div>
                        </div>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 lg:border-l lg:pl-10 border-gray-100 relative z-10">
                      <div className="flex items-center gap-4 bg-gray-50/50 p-2.5 rounded-2xl border border-gray-100">
                         <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                            <Clock className="w-5 h-5 text-indigo-600" />
                         </div>
                         <div>
                            <p className="text-xs font-black text-gray-900 leading-none mb-1">{formatTime(b.startTime)}</p>
                            <p className="text-[10px] font-bold text-gray-400 leading-none">Reporting Interval</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-6">
                         <div className="flex items-center gap-6 bg-slate-50/80 px-6 py-3 rounded-2xl border border-slate-100/50">
                            <div className="flex flex-col items-center gap-2">
                               <span className="text-[9px] font-black text-gray-400 uppercase tracking-tight">Student</span>
                               {b.studentAttendance === true ? <Check className="w-5 h-5 text-emerald-500" strokeWidth={3} /> : b.studentAttendance === false ? <X className="w-5 h-5 text-rose-500" strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse"></div>}
                            </div>
                            <div className="w-px h-8 bg-slate-200"></div>
                            <div className="flex flex-col items-center gap-2">
                               <span className="text-[9px] font-black text-gray-400 uppercase tracking-tight">Mentor</span>
                               {b.mentorAttendance === true ? <Check className="w-5 h-5 text-emerald-500" strokeWidth={3} /> : b.mentorAttendance === false ? <X className="w-5 h-5 text-rose-500" strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse"></div>}
                            </div>
                         </div>
                         <div className={`px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-lg whitespace-nowrap group-hover:-translate-y-1 transition-transform ${
                           b.attendanceStatus === "completed" ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-100" :
                           b.attendanceStatus === "absent" ? "bg-rose-600 text-white border-rose-600 shadow-rose-100" :
                           b.attendanceStatus === "conflict" ? "bg-purple-600 text-white border-purple-600 shadow-purple-100" :
                           "bg-amber-400 text-white border-amber-400 shadow-amber-100"
                         }`}>
                           {b.attendanceStatus}
                         </div>
                      </div>
                   </div>
                 </div>
               ))}
            </div>
          )}
       </div>
    </div>
  );
}
