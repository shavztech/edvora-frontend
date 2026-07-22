"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import api from "@/lib/api";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Book, 
  Users,
  Video,
  Timer,
  ChevronRight,
  Sparkles,
  Filter,
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
  status: "pending" | "accepted" | "rejected";
  meetLink?: string;
  mentor: {
    _id: string;
    name: string;
    email: string;
    mentorOnboarding?: {
      syllabus?: string;
    }
  };
  studentAttendance: boolean | null;
  mentorAttendance: boolean | null;
  attendanceStatus: string;
}

const formatTimeTo12h = (timeStr: string) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(":");
  let h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  h = h ? h : 12;
  return `${h}:${minutes} ${ampm}`;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const YEARS = ["2024", "2025", "2026"];

export default function StudentBookingsPage() {
  const pathname = usePathname();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterDate, setFilterDate] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterAttendance, setFilterAttendance] = useState("");

  const loadBookings = async () => {
    setLoading(true);
    try {
      let params: any = {};
      if (filterDate) params.date = filterDate;
      if (filterMonth) params.month = filterMonth;
      if (filterYear) params.year = filterYear;
      if (filterAttendance) params.attendance = filterAttendance;

      const res = await api.get("/bookings/student", { params });
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilterDate("");
    setFilterMonth("");
    setFilterYear("");
    setFilterAttendance("");
  };

  const handleAttendance = async (bookingId: string, attendance: boolean) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <p className="font-bold text-slate-800 text-sm">
          Are you sure you want to mark yourself as <span className={attendance ? 'text-green-600' : 'text-red-600'}>{attendance ? 'Present' : 'Absent'}</span>?
        </p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loader = toast.loading("Updating attendance...");
              try {
                await api.patch(`/bookings/${bookingId}/student-attendance`, { attendance });
                toast.dismiss(loader);
                toast.success("Attendance updated successfully");
                loadBookings();
              } catch (err) {
                toast.dismiss(loader);
                toast.error("Failed to update attendance");
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white transition-all ${attendance ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: 5000, position: "top-center" });
  };

 useEffect(() => {
  loadBookings();

  const markNotificationsRead = async () => {
    try {
   await api.patch("/notifications/read-booking");
      window.dispatchEvent(new Event("refresh-notifications"));
    } catch (err) {
      console.error(err);
    }
  };

  markNotificationsRead();
}, [filterDate, filterMonth, filterYear, filterAttendance]);

  if (loading && bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
          Retrieving sessions...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 space-y-8 md:space-y-12">

      {/* HEADER */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/20">
          <Sparkles className="w-3 h-3"/>
          Personal Hub
        </div>

        <h1 className="text-4xl font-[900] text-slate-900 tracking-tighter">
          My Bookings
        </h1>

        <p className="text-slate-500 font-medium text-sm">
          Track your learning journey and join scheduled sessions.
        </p>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center justify-center border-b border-gray-100">
        <div className="flex gap-8">
          <Link 
            href="/student/slot"
            className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${
              pathname === '/student/slot' 
              ? 'text-primary' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Available Slots
            {pathname === '/student/slot' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
          <Link 
            href="/student/bookings"
            className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${
              pathname === '/student/bookings' 
              ? 'text-primary' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            My Bookings
            {pathname === '/student/bookings' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        </div>
      </div>

      {/* FILTERS */}
      <div className="md:sticky md:top-16 z-40 bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-[28px] border border-gray-100 shadow-sm transition-all duration-300 relative">
        <div className="space-y-4">
           <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                <Filter className="w-3.5 h-3.5 text-gray-500" />
              </div>
              Filter Results
           </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Exact Date</label>
                <input 
                  type="date" 
                  className="w-full bg-gray-50/50 border border-gray-100 px-3 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
             </div>

             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Month</label>
                <select 
                  className="w-full bg-gray-50/50 border border-gray-100 px-3 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none cursor-pointer appearance-none"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
             </div>

             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Year</label>
                <select 
                  className="w-full bg-gray-50/50 border border-gray-100 px-3 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none cursor-pointer appearance-none"
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
             </div>

             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Attendance</label>
                <select 
                  className="w-full bg-gray-50/50 border border-gray-100 px-3 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none cursor-pointer appearance-none"
                  value={filterAttendance}
                  onChange={(e) => setFilterAttendance(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="conflict">Conflict</option>
                </select>
             </div>

             <div className="flex items-end justify-center sm:justify-start gap-3 col-span-2 lg:col-span-1 pt-3 sm:pt-0 px-2 sm:px-0">
                <button 
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    setFilterDate(today);
                    setFilterMonth("");
                    setFilterYear("");
                  }}
                  className="flex-1 sm:flex-none min-w-[80px] h-[40px] bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-md shadow-primary/20 active:translate-y-0"
                >
                  Today
                </button>
                <button 
                   onClick={() => {
                     setFilterDate("");
                     setFilterMonth("");
                     setFilterYear("");
                     setFilterAttendance("");
                   }}
                   className="flex-1 sm:flex-none h-[40px] px-6 bg-red-50 text-red-600 border border-red-100 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-95"
                 >
                   Reset
                 </button>
             </div>
          </div>
        </div>
      </div>

      {bookings.length === 0 ? (

        <div className="bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 p-24 text-center space-y-4">

          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto">
            <Calendar className="w-10 h-10 text-slate-200"/>
          </div>

          <h3 className="text-lg font-black text-slate-800">
            No bookings yet
          </h3>

          <p className="text-slate-400 font-bold max-w-xs mx-auto">
            You haven't requested any sessions. Start by finding a mentor!
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">

          {bookings.map((booking) => {

            const today = new Date().toISOString().split('T')[0];
            const isExpired = today > booking.date;

            const statusColors = {
              pending: "bg-amber-50 text-amber-600 border-amber-100",
              accepted: isExpired ? "bg-slate-50 text-slate-500 border-slate-200" : "bg-green-50 text-green-600 border-green-100",
              rejected: "bg-red-50 text-red-600 border-red-100"
            };

            return (

              <div key={booking._id}
              className={`bg-white border border-slate-200 rounded-[30px] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group ${isExpired ? 'opacity-75' : ''}`}>

                {/* TOP */}
                <div className="p-2 sm:p-4 pb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-50">

                  <div className="flex items-center gap-4 min-w-0">

                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl font-black italic shadow-lg group-hover:scale-110 transition-transform shrink-0">
                      {booking.mentor?.name?.[0]?.toUpperCase() || "M"}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight line-clamp-1">
                        {booking.mentor?.name || "Mentor"}
                      </h3>

                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 truncate">
                        <MapPin className="w-3 h-3 shrink-0"/>
                        <span className="truncate">{booking.mentor?.mentorOnboarding?.syllabus || "General"}</span>
                      </p>
                    </div>

                  </div>

                  <div className={`self-start sm:self-auto shrink-0 px-3 sm:px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border w-fit ${statusColors[booking.status]}`}>
                    {isExpired && booking.status === "accepted" ? "Completed" : booking.status}
                  </div>

                </div>

                {/* DETAILS */}
                <div className="p-2 sm:p-4 pt-3.5 space-y-2.5">

                  <div className="grid grid-cols-2 gap-2.5">

                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Book className="w-3.5 h-3.5 text-primary"/>
                        Subject
                      </span>
                      <p className="text-sm font-black text-slate-700">
                        {booking.subject}
                      </p>
                    </div>

                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-primary"/>
                        Class
                      </span>
                      <p className="text-sm font-black text-slate-700">
                        {booking.classLevel}
                      </p>
                    </div>

                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">

                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                        {booking.date}
                      </span>

                      <p className="text-sm font-black text-slate-900 italic">
                        {formatTimeTo12h(booking.startTime)} - {formatTimeTo12h(booking.endTime)}
                      </p>
                    </div>

                    <Clock className="w-5 h-5 text-slate-200 hidden sm:block shrink-0"/>

                  </div>

                </div>

                {/* ACTION */}
                <div className="p-2 sm:p-4 pt-0 mt-auto">

                  {booking.status === "accepted" && booking.meetLink ? (
                    isExpired ? (
                      <div className="w-full bg-slate-100 text-slate-400 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-center border border-slate-200 cursor-not-allowed">
                        Session Expired
                      </div>
                    ) : (
                      <a
                        href={booking.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-primary text-white py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                      >
                        Join Live Session
                        <Video className="w-3.5 h-3.5"/>
                      </a>
                    )
                  ) : booking.status === "pending" ? (
                    <div className="w-full bg-amber-50 text-amber-600 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-center border border-amber-100">
                      Waiting for approval
                    </div>
                  ) : (
                    <div className="w-full bg-slate-50 text-slate-400 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-center border border-slate-100">
                      Declined
                    </div>
                  )}
                </div>

                {/* ATTENDANCE SECTION */}
                {booking.status === "accepted" && (
                  <div className="p-2 sm:p-4 pt-0 border-t border-slate-100 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3.5 gap-2">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance Status</span>
                      {booking.studentAttendance !== null ? (
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${booking.studentAttendance ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {booking.studentAttendance ? <Check className="w-3 h-3"/> : <X className="w-3 h-3"/>}
                          {booking.studentAttendance ? 'Attended' : 'Absent'}
                        </div>
                      ) : (
                        <div className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Pending</div>
                      )}
                    </div>

                    {booking.studentAttendance === null && (
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-[11px] font-bold text-slate-600 mb-2.5 text-center">Did you attend this session?</p>
                        <div className="flex gap-2.5">
                          <button
                            onClick={() => handleAttendance(booking._id, true)}
                            className="flex-1 bg-green-600 text-white py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-200 hover:bg-green-700 transition-all"
                          >
                            Yes, Attended
                          </button>
                          <button
                            onClick={() => handleAttendance(booking._id, false)}
                            className="flex-1 bg-red-600 text-white py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-200 hover:bg-red-700 transition-all"
                          >
                            No, Absent
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}