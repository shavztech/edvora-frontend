"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { 
  ClipboardCheck, 
  Filter,
  BookOpen
} from "lucide-react";

interface Booking {
  _id: string;
  subject: string;
  classLevel: string;
  startTime: string;
  endTime: string;
  date: string;
  status: string;
  meetLink?: string;
  student: {
    _id: string;
    name: string;
    email: string;
  };
  mentorAttendance: boolean | null;
  studentAttendance: boolean | null;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const YEARS = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];

export default function MentorAttendancePage() {
  const [slots, setSlots] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterDate, setFilterDate] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const res = await api.get("/bookings/mentor");
      
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      // Show past completed class slots, or any slot that already has attendance marked
      const pastSlots = res.data.filter((booking: Booking) => {
        if (booking.status !== "accepted" || !booking.student) return false;
        
        // If marked early during testing, include it automatically.
        if (booking.mentorAttendance !== null || booking.studentAttendance !== null) return true;

        if (booking.date < today) return true;
        if (booking.date === today) {
           const [bHours, bMins] = booking.endTime.split(':').map(Number);
           const [cHours, cMins] = currentTime.split(':').map(Number);
           if (bHours < cHours || (bHours === cHours && bMins <= cMins)) return true;
        }
        return false;
      });

      setSlots(pastSlots);
    } catch (error: any) {
      console.error("LOAD_ATTENDANCE_ERROR:", error);
      toast.error("Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const getFilteredSlots = () => {
    return slots.filter((slot) => {
      let match = true;
      if (filterDate && slot.date !== filterDate) match = false;
      if (filterMonth) {
        const slotMonthIndex = new Date(slot.date).getMonth();
        const filterMonthIndex = MONTHS.indexOf(filterMonth);
        if (slotMonthIndex !== filterMonthIndex) match = false;
      }
      if (filterYear) {
        const slotYear = new Date(slot.date).getFullYear().toString();
        if (slotYear !== filterYear) match = false;
      }
      return match;
    });
  };

  const filteredSlots = getFilteredSlots();

  // Calculate total attendance
  const totalAttendance = filteredSlots.filter(s => 
    s.mentorAttendance === true && s.studentAttendance === true
  ).length;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100">
            <ClipboardCheck className="w-3 h-3"/>
            Mentor Dashboard
          </div>
          <h1 className="text-4xl font-[900] text-gray-900 tracking-tighter">
            My Attendance
          </h1>
          <p className="text-gray-500 font-medium text-sm">
            View your total attendance records based on completed sessions.
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 sm:p-5 rounded-[24px] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
          </div>
          Filter Records
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Exact Date</label>
            <input 
              type="date" 
              className="w-full bg-gray-50 border border-gray-100 px-3 py-2.5 rounded-xl text-xs font-bold focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all"
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
                setFilterMonth(""); // reset month if exact date picked
                setFilterYear("");  // reset year as well
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Month</label>
            <select 
              className="w-full bg-gray-50 border border-gray-100 px-3 py-2.5 rounded-xl text-xs font-bold focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all cursor-pointer appearance-none"
              value={filterMonth}
              onChange={(e) => {
                setFilterMonth(e.target.value);
                setFilterDate(""); // reset date if month picked
              }}
            >
              <option value="">All Months</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Year</label>
            <select 
              className="w-full bg-gray-50 border border-gray-100 px-3 py-2.5 rounded-xl text-xs font-bold focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all cursor-pointer appearance-none"
              value={filterYear}
              onChange={(e) => {
                setFilterYear(e.target.value);
                setFilterDate(""); // reset date if year picked
              }}
            >
              <option value="">All Years</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="flex flex-col justify-end">
             <button 
               onClick={() => { setFilterDate(""); setFilterMonth(""); setFilterYear(""); }}
               className="h-[46px] w-full bg-gray-100 text-gray-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all font-bold"
             >
               Clear Filters
             </button>
          </div>
        </div>
      </div>

      {/* TOTAL ATTENDANCE STAT */}
      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm py-6 sm:py-8 px-5 flex flex-col items-center justify-center text-center space-y-3.5 max-w-sm mx-auto w-full mt-2">
           <div className="w-12 h-12 bg-[#eafbf0] rounded-[18px] flex items-center justify-center border border-[#d2f3dd] shadow-sm">
             <ClipboardCheck className="w-5 h-5 text-[#0f9f4d]" strokeWidth={2.5} />
           </div>
           <div className="space-y-0.5">
             <h2 className="text-[10px] font-[900] text-gray-400 uppercase tracking-[0.25em]">Total Attendance</h2>
             <p className="text-4xl font-[900] text-[#1c1f3d] leading-none tracking-tight pt-1.5">{totalAttendance}</p>
           </div>
        </div>
      )}

      {/* SESSION HISTORY */}
      {!loading && (
        <div className="space-y-4 pb-12">
          <div className="flex items-center gap-3 px-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Session History ({filteredSlots.length})</h2>
            <div className="h-px flex-1 bg-gray-100"></div>
          </div>

          {filteredSlots.length === 0 ? (
            <div className="bg-gray-50 rounded-[2rem] border border-dashed border-gray-200 p-12 text-center text-gray-400 font-medium text-sm">
              No attendance records discovered for the selected configuration.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredSlots.map((slot) => (
                <div key={slot._id} className="bg-white border border-gray-100 p-5 rounded-[24px] shadow-sm flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                         <BookOpen className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 leading-tight mb-0.5">{slot.subject}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Class {slot.classLevel} • {slot.student?.name}</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-6">
                      <div className="flex flex-col text-right">
                         <span className="text-[10px] font-black text-gray-900 leading-none mb-1">{slot.date}</span>
                         <span className="text-[10px] font-bold text-gray-400 leading-none">{slot.startTime}</span>
                      </div>
                      <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                        slot.studentAttendance === true && slot.mentorAttendance === true ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm" :
                        slot.studentAttendance === false && slot.mentorAttendance === false ? "bg-rose-50 text-rose-600 border-rose-100 shadow-sm" :
                        "bg-amber-50 text-amber-600 border-amber-100 shadow-sm"
                      }`}>
                        {slot.studentAttendance === true && slot.mentorAttendance === true ? "Completed" : 
                         slot.studentAttendance === false && slot.mentorAttendance === false ? "Absent" : 
                         "Pending/Conflict"}
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
