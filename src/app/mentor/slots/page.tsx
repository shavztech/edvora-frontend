"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Clock, CalendarPlus, Trash2, Loader2, CalendarCheck } from "lucide-react";
import toast from "react-hot-toast";

interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function MentorSlots() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingDate, setDeletingDate] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState("");

  const [form, setForm] = useState({
    date: "",
    fromTime: "09:00",
    toTime: "17:00",
  });

  // generate time dropdown options
  const generateTimeOptions = () => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const h = hour.toString().padStart(2, "0");
        const m = minute.toString().padStart(2, "0");
        times.push(`${h}:${m}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  // load mentor slots
  const loadSlots = async () => {
    try {
      const res = await api.get("/slots/mentor");
      setSlots(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSlots(); }, []);

  // format time to AM/PM
  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return time;
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-IN", {
      hour: "numeric", minute: "2-digit", hour12: true,
    });
  };

  // create slots
  const generateSlots = async () => {
    if (!form.date) { toast.error("Please select a date"); return; }
    if (form.toTime <= form.fromTime) { toast.error("Invalid time range — 'To' must be after 'From'"); return; }

    setSubmitting(true);
    try {
      await api.post("/slots", {
        date: form.date,
        startTime: formatTime(form.fromTime),
        endTime: formatTime(form.toTime),
      });
      setForm({ ...form, date: "" });
      toast.success("Availability added!");
      await loadSlots();
    } catch (err) {
      console.error(err);
      toast.error("Slots already exist for this date");
    } finally {
      setSubmitting(false);
    }
  };

  // group slots by date
  const groupedSlots = slots.reduce((acc: any, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedSlots).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const filteredDates = filterDate 
    ? sortedDates.filter(date => date === filterDate)
    : sortedDates;

  // delete full day slots
  const deleteDay = async (date: string) => {
    if (!confirm("Delete availability for this day?")) return;
    setDeletingDate(date);
    try {
      await api.delete(`/slots/day/${date}`);
      toast.success("Availability removed");
      await loadSlots();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete availability");
    } finally {
      setDeletingDate(null);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">

      {/* ══ HEADER ══ */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.25em] mb-2">
          <CalendarCheck className="w-3.5 h-3.5" />
          Scheduling
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Set Availability</h1>
        <p className="text-slate-500 font-medium mt-1">Define the time slots when you're available for student sessions.</p>
      </div>

      {/* ══ ADD SLOT FORM ══ */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <CalendarPlus className="w-5 h-5 text-indigo-500" />
          <h2 className="font-black text-slate-900">Add Availability</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Date</label>
            <input
              type="date"
              min={today}
              className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          {/* From */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">From</label>
            <select
              className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all appearance-none cursor-pointer"
              value={form.fromTime}
              onChange={(e) => setForm({ ...form, fromTime: e.target.value })}
            >
              {timeOptions.map((t) => (
                <option key={t} value={t}>{formatTime(t)}</option>
              ))}
            </select>
          </div>

          {/* To */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">To</label>
            <select
              className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all appearance-none cursor-pointer"
              value={form.toTime}
              onChange={(e) => setForm({ ...form, toTime: e.target.value })}
            >
              {timeOptions.map((t) => (
                <option key={t} value={t}>{formatTime(t)}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={generateSlots}
          disabled={submitting}
          className="flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all w-full sm:w-auto"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CalendarPlus className="w-4 h-4" />
          )}
          Generate Availability
        </button>
      </div>

      {/* ══ EXISTING SLOTS ══ */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              Your Availability
            </h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-lg">
              {filteredDates.length} day{filteredDates.length !== 1 ? "s" : ""}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">Filter:</span>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 outline-none transition-all"
            />
            {filterDate && (
              <button
                onClick={() => setFilterDate("")}
                className="text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-16">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
          </div>
        ) : filteredDates.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <CalendarCheck className="w-7 h-7 text-slate-200" />
            </div>
            <p className="font-black text-slate-700 mb-1">
              {filterDate ? "No availability found for this date" : "No availability set"}
            </p>
            <p className="text-sm text-slate-400 font-medium">
              {filterDate ? "Try clearing the filter or selecting another date." : "Add a date above to let students book sessions with you."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filteredDates.map((date) => {
              const daySlots = groupedSlots[date];
              const start = daySlots[0].startTime;
              const end = daySlots[daySlots.length - 1].endTime;
              const isPast = date < today;

              return (
                <div
                  key={date}
                  className={`p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors ${isPast ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isPast ? "bg-slate-100" : "bg-indigo-50"}`}>
                      <CalendarCheck className={`w-5 h-5 ${isPast ? "text-slate-300" : "text-indigo-500"}`} />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">
                        {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                          weekday: "short", year: "numeric", month: "short", day: "numeric",
                        })}
                        {isPast && (
                          <span className="ml-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">Past</span>
                        )}
                      </p>
                      <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {formatTime(start)} – {formatTime(end)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteDay(date)}
                    disabled={deletingDate === date || isPast}
                    className={`flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all w-full sm:w-auto ${
                      isPast
                        ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60"
                        : "bg-white text-red-600 border border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-50 shadow-sm sm:shadow-none"
                    }`}
                  >
                    {deletingDate === date ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    Remove Day
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}