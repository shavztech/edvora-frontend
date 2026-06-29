"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { 
  Calendar, 
  Clock, 
  User as UserIcon, 
  Book, 
  Users, 
  Search,
  Timer,
  ChevronRight,
  Sparkles,
  Filter,
  ArrowRight,
  Check,
  X
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
  meetLink?: string;
  demoStatus?: string;
  mentorStatus?: string;
}

const formatTimeTo12h = (timeStr: string) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(':');
  let h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12;
  return `${h}:${minutes} ${ampm}`;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const YEARS = ["2024", "2025", "2026"];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [filterDate, setFilterDate] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterAttendance, setFilterAttendance] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const loadBookings = async () => {
    setLoading(true);
    try {
      let params: any = {};
      if (filterDate) params.date = filterDate;
      if (filterMonth) params.month = filterMonth;
      if (filterYear) params.year = filterYear;
      if (filterAttendance) params.attendance = filterAttendance;
      if (filterStatus) params.status = filterStatus;

      const res = await api.get("/bookings/admin", { params });
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();

    const markAsRead = async () => {
      try {
        await api.patch("/notifications/read-booking");
        window.dispatchEvent(new CustomEvent("refresh-notifications"));
      } catch (err) {
        console.error("Failed to mark booking notifications as read", err);
      }
    };
    markAsRead();

    const interval = setInterval(() => {
      loadBookings();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Removed handleApplyFilters as it's now automatic via useEffect

  const handleResetFilters = () => {
    setFilterDate("");
    setFilterMonth("");
    setFilterYear("");
    setFilterAttendance("");
    setFilterStatus("");
  };

  // Re-fetch bookings whenever any filter changes
  useEffect(() => {
    loadBookings();
  }, [filterDate, filterMonth, filterYear, filterAttendance, filterStatus]);

  if (loading && bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-black text-[10px] tracking-widest uppercase">Fetching Records...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
    <div className="max-w-7xl mx-auto p-3 sm:p-6 md:p-10 space-y-6 md:space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-gray-200">
             <Sparkles className="w-3 h-3" />
             Admin Central
          </div>
          <h1 className="text-3xl md:text-4xl font-[900] text-gray-900 tracking-tighter">Booking Monitor</h1>
          <p className="text-gray-500 font-medium text-sm">Supervise and audit all student-mentor bookings and requests.</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="sticky top-16 z-40 bg-gray-100/95 backdrop-blur-xl py-3 -mx-3 sm:-mx-6 md:-mx-10 px-3 sm:px-6 md:px-10 transition-all duration-300">
        <div className="space-y-3">
           <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                <Filter className="w-3.5 h-3.5 text-gray-500" />
              </div>
              Filter Results
           </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3">
             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Exact Date</label>
                <input 
                  type="date" 
                  className="w-full bg-gray-50/50 border border-gray-100 px-3 py-2.5 rounded-xl text-xs font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
             </div>

             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Month</label>
                <select 
                  className="w-full bg-gray-50/50 border border-gray-100 px-3 py-2.5 rounded-xl text-xs font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none cursor-pointer appearance-none"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
             </div>

             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                <select 
                  className="w-full bg-gray-50/50 border border-gray-100 px-3 py-2.5 rounded-xl text-xs font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none cursor-pointer appearance-none"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
             </div>

             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Attendance</label>
                <select 
                  className="w-full bg-gray-50/50 border border-gray-100 px-3 py-2.5 rounded-xl text-xs font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none cursor-pointer appearance-none"
                  value={filterAttendance}
                  onChange={(e) => setFilterAttendance(e.target.value)}
                >
                  <option value="">All Records</option>
                  <option value="pending">Pending</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="conflict">Conflict</option>
                </select>
             </div>

             <div className="col-span-2 lg:col-span-2 flex items-end gap-2">
                <button 
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    setFilterDate(today);
                    setFilterMonth("");
                    setFilterYear("");
                    loadBookings();
                  }}
                  className="flex-1 h-[38px] bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 hover:-translate-y-0.5 transition-all shadow-md shadow-indigo-200 active:translate-y-0"
                >
                  Today
                </button>
                <button 
                  onClick={() => {
                    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
                    setFilterDate(yesterday);
                    setFilterMonth("");
                    setFilterYear("");
                    loadBookings();
                  }}
                  className="flex-1 h-[38px] bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:-translate-y-0.5 transition-all shadow-md shadow-blue-200 active:translate-y-0"
                >
                  Prev
                </button>
                 <button 
                   onClick={handleResetFilters}
                   className="h-[38px] px-4 bg-red-50 text-red-600 border border-red-100 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-95"
                 >
                   Reset
                 </button>
             </div>
          </div>
        </div>
      </div>

      {/* DATA GRID */}
      {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-64 bg-gray-100 rounded-[35px]"></div>
            ))}
         </div>
      ) : bookings.length === 0 ? (
        <div className="bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200 p-24 text-center space-y-4">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto">
            <Timer className="w-10 h-10 text-gray-200" />
          </div>
          <h3 className="text-lg font-black text-gray-800">No records found</h3>
          <p className="text-gray-400 font-bold max-w-xs mx-auto">Try adjusting your filters to see historical booking data.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="bg-white border border-gray-200 rounded-[24px] p-5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col space-y-4"
            >
               {/* Profiles & Status */}
               <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-white text-[10px] font-black italic shadow-lg shadow-black/10">
                           {booking.student?.name?.[0].toUpperCase() || "?"}
                        </div>
                        <div>
                           <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block leading-3">Student</span>
                           <p className="text-sm font-black text-gray-800 tracking-tight">
                              {booking.student?.name || "Unknown Student"}
                           </p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black italic shadow-lg shadow-indigo-200">
                           {booking.mentor?.name?.[0].toUpperCase() || "?"}
                        </div>
                        <div>
                           <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block leading-3">Mentor</span>
                           <p className="text-sm font-black text-gray-800 tracking-tight">
                              {booking.mentor?.name || "Unknown Mentor"}
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
                     booking.status === 'accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                     booking.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                     'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                     {booking.status}
                  </div>
               </div>

               {/* Details */}
               <div className="space-y-3">
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Subject</span>
                        <p className="text-sm font-black text-gray-800">{booking.subject}</p>
                     </div>
                     <div className="space-y-0.5 text-right">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Class</span>
                        <p className="text-sm font-black text-gray-800">Class {booking.classLevel}</p>
                     </div>
                  </div>

                  <div className="bg-gray-50/50 px-4 py-3 rounded-2xl border border-gray-50 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[10px] font-black text-gray-600">{booking.date}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[10px] font-black text-gray-600">{formatTimeTo12h(booking.startTime)}</span>
                     </div>
                  </div>

                  {booking.meetLink && (
                    <div className="bg-blue-50/50 px-4 py-2.5 rounded-2xl border border-blue-100 flex items-center justify-between">
                       <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Meet Link</span>
                       <a href={booking.meetLink} target="_blank" rel="noreferrer" className="text-[10px] font-black text-blue-600 hover:underline truncate max-w-[150px]">
                         {booking.meetLink}
                       </a>
                    </div>
                  )}
               </div>

               <div className="mt-auto space-y-3">
                  {/* Demo Info */}
                  {(booking.demoStatus || booking.mentorStatus) && (
                    <div className="bg-purple-50/30 px-4 py-3 rounded-2xl border border-purple-100/50 space-y-2">
                       <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest block">Demo Details</span>
                       <div className="flex items-center justify-between">
                         <span className="text-[9px] font-bold text-slate-500">Demo Status:</span>
                         <span className="text-[9px] font-black uppercase tracking-widest text-purple-600">{booking.demoStatus || "N/A"}</span>
                       </div>
                       <div className="flex items-center justify-between">
                         <span className="text-[9px] font-bold text-slate-500">Mentor Status:</span>
                         <span className={`text-[9px] font-black uppercase tracking-widest ${
                            booking.mentorStatus === 'mentor_accepted' ? 'text-green-600' : 
                            booking.mentorStatus === 'mentor_rejected' ? 'text-red-600' : 'text-amber-600'
                         }`}>
                           {booking.mentorStatus === 'mentor_accepted' ? 'Accepted' : 
                            booking.mentorStatus === 'mentor_rejected' ? 'Rejected' : 
                            booking.mentorStatus || 'Pending'}
                         </span>
                       </div>
                    </div>
                  )}

                  {/* Attendance Tracking */}
                  <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 space-y-2">
                     <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Attendance</span>
                        <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                           booking.attendanceStatus === "completed" ? "bg-green-50 text-green-600 border-green-100" :
                           booking.attendanceStatus === "absent" ? "bg-red-50 text-red-600 border-red-100" :
                           booking.attendanceStatus === "conflict" ? "bg-purple-50 text-purple-600 border-purple-100" :
                           "bg-amber-50 text-amber-600 border-amber-100"
                        }`}>
                           {booking.attendanceStatus}
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-0.5">
                           <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest block">Student</span>
                           <div className="flex items-center gap-1.5">
                              {booking.studentAttendance === true ? (
                                 <><Check className="w-3 h-3 text-green-500"/><span className="text-[10px] font-black text-slate-600">Present</span></>
                              ) : booking.studentAttendance === false ? (
                                 <><X className="w-3 h-3 text-red-500"/><span className="text-[10px] font-black text-slate-600">Absent</span></>
                              ) : (
                                 <span className="text-[10px] font-black text-slate-400 italic">Pending</span>
                              )}
                           </div>
                        </div>
                        <div className="space-y-0.5">
                           <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest block">Mentor</span>
                           <div className="flex items-center gap-1.5">
                              {booking.mentorAttendance === true ? (
                                 <><Check className="w-3 h-3 text-green-500"/><span className="text-[10px] font-black text-slate-600">Present</span></>
                              ) : booking.mentorAttendance === false ? (
                                 <><X className="w-3 h-3 text-red-500"/><span className="text-[10px] font-black text-slate-600">Absent</span></>
                              ) : (
                                 <span className="text-[10px] font-black text-slate-400 italic">Pending</span>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="w-full border border-gray-100 rounded-xl py-2 px-4 flex items-center justify-between">
                     <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Audit Trail ID</span>
                     <span className="text-[9px] font-bold text-gray-300 font-mono">#{booking._id.slice(-6)}</span>
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
