"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import {
  Loader2,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Layers,
  Calendar,
  Clock,
  X,
  Filter,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Search
} from "lucide-react";
import toast from "react-hot-toast";

type DemoRequest = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  className: string;
  subject: string;
  syllabus: string;
  status: "pending" | "accepted" | "rejected";
  mentorStatus?: "pending" | "accepted" | "rejected";

  slot?: {
    _id: string;
    date: string;
    startTime: string;
    endTime: string;
  };

  meetLink?: string;

  assignedMentor?: {
    _id: string;
    name: string;
  };

  createdAt: string;
};

export default function AdminDemoPage() {
  const [demos, setDemos] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  interface Mentor {
    _id: string;
    name: string;
    email: string;
  }

  interface Slot {
    _id: string;
    date: string;
    startTime: string;
    endTime: string;
  }

  // Mentor & Slot state management
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selectedMentorId, setSelectedMentorId] = useState<Record<string, string>>({});
  const [selectedSlotId, setSelectedSlotId] = useState<Record<string, string>>({});
  const [slots, setSlots] = useState<Record<string, Slot[]>>({});

  // Loading states
  const [loadingMentors, setLoadingMentors] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState<Record<string, boolean>>({});

  const formatSlotLabel = (slot: Slot) => {
    let formattedDate = slot.date;
    try {
      const parts = slot.date.split("-");
      if (parts.length === 3) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const day = parts[2];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (monthNum >= 1 && monthNum <= 12) {
          formattedDate = `${day} ${months[monthNum - 1]} ${year}`;
        }
      }
    } catch (e) {
      console.error("Date formatting error:", e);
    }

    const formatTime = (time24: string) => {
      try {
        const parts = time24.split(":");
        if (parts.length >= 2) {
          const hour24 = parseInt(parts[0], 10);
          const minutes = parts[1];
          const period = hour24 >= 12 ? "PM" : "AM";
          const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
          const displayHour = hour12 < 10 ? `0${hour12}` : hour12;
          return `${displayHour}:${minutes} ${period}`;
        }
      } catch (e) {
        console.error("Time formatting error:", e);
      }
      return time24;
    };

    return `${formattedDate} | ${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`;
  };

  const loadDemos = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (filterStatus) params.status = filterStatus;
      if (filterDate) params.date = filterDate;

      const res = await api.get("/admin/demo", { params });
      setDemos(res.data);
    } catch {
      toast.error("Failed to load demo requests.");
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterDate]);

  const loadMentors = useCallback(async () => {
    try {
      setLoadingMentors(true);
      const res = await api.get("/slots/available-mentors");
      setMentors(res.data || []);
    } catch (error) {
      console.error("Failed to load available mentors:", error);
      toast.error("Failed to load available mentors");
    } finally {
      setLoadingMentors(false);
    }
  }, []);

  const handleMentorChange = async (demoId: string, mentorId: string) => {
    setSelectedMentorId((prev) => ({ ...prev, [demoId]: mentorId }));
    
    // Clear slot selection when mentor changes
    setSelectedSlotId((prev) => {
      const updated = { ...prev };
      delete updated[demoId];
      return updated;
    });

    if (!mentorId) return;

    try {
      setLoadingSlots((prev) => ({ ...prev, [mentorId]: true }));
      const res = await api.get(`/slots/available/${mentorId}`);
      setSlots((prev) => ({ ...prev, [mentorId]: res.data || [] }));
    } catch (error) {
      console.error("Failed to load available slots:", error);
      toast.error("Failed to load available slots for this mentor");
    } finally {
      setLoadingSlots((prev) => ({ ...prev, [mentorId]: false }));
    }
  };
useEffect(() => {
  const init = async () => {
    await loadDemos();

    // Mark demo notifications as read
    try {
      await api.patch("/notifications/read-demo");
    } catch (err) {
      console.error(err);
    }
  };

  init();

  const interval = setInterval(() => {
    loadDemos();
  }, 10000);

  return () => clearInterval(interval);
}, [loadDemos]);

  useEffect(() => {
    loadMentors();
  }, [loadMentors]);
//   return () => clearInterval(interval);
// }, [filterStatus, filterDate]);

//   const handleAccept = async (id: string) => {
//     const assignMentor = async (demoId: string) => {
//   try {
//     const mentorId = mentorMap[demoId];

//     if (!mentorId) {
//       return toast.error("Select a mentor first");
//     }

//     await api.patch(`/${demoId}/assign`, {
//       mentorId,
//     });

//     toast.success("Mentor assigned");
//     loadDemos();
//   } catch (error) {
//     console.log(error);
//     toast.error("Assignment failed");
//   }
// };
//     setProcessingId(id);
//     try {
//       const res = await api.put(`/admin/demo/${id}/accept`);
//       if (res.data.success) {
//         toast.success("Demo request accepted!");
//         setDemos((prev) =>
//           prev.map((d) => d._id === id ? { ...d, status: "accepted" } : d)
//         );
//       }
//     } catch (err: any) {
//       toast.error("Failed to accept the request.");
//     } finally {
//       setProcessingId(null);
//     }
//   };



  const handleReset = () => {
    setFilterStatus("");
    setFilterDate("");
    setSearchTerm("");
  };
 const openWhatsApp = (demo: DemoRequest) => {
  const phone = demo.phone.replace(/[^0-9]/g, "");

  const date = demo.slot?.date || "To be confirmed";
  const time = demo.slot
    ? `${demo.slot.startTime} - ${demo.slot.endTime}`
    : "To be confirmed";

  const meet = demo.meetLink || "Will be shared shortly";

  const message = `Hello ${demo.name} 👋

🎉 Your Edvora Demo Class has been confirmed.

━━━━━━━━━━━━━━━━━━

📚 Subject: ${demo.subject}
🎓 Class: ${demo.className}
📖 Syllabus: ${demo.syllabus}

📅 Date: ${date}
⏰ Time: ${time}

🔗 Meet Link:
${meet}

━━━━━━━━━━━━━━━━━━

📌 Please join the meeting 5 minutes before the scheduled time.

If you have any questions, feel free to contact us.

Regards,
Edvora Team 💙`;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};
  const assignMentor = async (demoId: string) => {
    try {
      const mentorId = selectedMentorId[demoId];
      const slotId = selectedSlotId[demoId];

      if (!mentorId || !slotId) {
        return toast.error("Select a mentor and an available slot first");
      }

      setProcessingId(demoId);

      await api.patch(`/demo/${demoId}/assign`, {
        mentorId,
        slotId,
      });

      toast.success("Mentor assigned successfully");

      // Clear selection for this demo
      setSelectedMentorId((prev) => {
        const next = { ...prev };
        delete next[demoId];
        return next;
      });
      setSelectedSlotId((prev) => {
        const next = { ...prev };
        delete next[demoId];
        return next;
      });

      loadDemos();
    } catch (error) {
      console.error("Failed to assign mentor:", error);
      toast.error("Failed to assign mentor");
    } finally {
      setProcessingId(null);
    }
  };
  const pendingCount = demos.filter(d => d.status === "pending").length;
  const acceptedCount = demos.filter(d => d.status === "accepted").length;

  const filteredDemos = demos.filter(d => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      d.name?.toLowerCase().includes(term) ||
      d.email?.toLowerCase().includes(term) ||
      d.subject?.toLowerCase().includes(term)
    );
  });

  if (loading && demos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-70" />
        <p className="text-slate-400 font-[900] text-[10px] uppercase tracking-widest">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
    <div className="max-w-7xl mx-auto p-3 sm:p-6 md:p-10 space-y-6 md:space-y-8 animate-fade-up">

      {/* ══ HEADER ══ */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/20">
          <Sparkles className="w-3 h-3" />
          Admin Central
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter">Demo Requests</h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Manage and process student demo lesson inquiries.</p>
          </div>
          {/* STATS */}
          <div className="flex gap-3 flex-shrink-0">
            <div className="flex flex-col bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm text-center">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 justify-center">
                <BarChart3 className="w-2.5 h-2.5"/>Total
              </span>
              <span className="text-xl font-[900] text-slate-800">{demos.length}</span>
            </div>
            <div className="flex flex-col bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm text-center">
              <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1 justify-center">
                <Clock className="w-2.5 h-2.5"/>Pending
              </span>
              <span className="text-xl font-[900] text-amber-600">{pendingCount}</span>
            </div>
            <div className="flex flex-col bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm text-center">
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1 justify-center">
                <CheckCircle2 className="w-2.5 h-2.5"/>Accepted
              </span>
              <span className="text-xl font-[900] text-emerald-600">{acceptedCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ SEARCH & FILTERS ══ */}
      <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
          <Filter className="w-3.5 h-3.5" />
          Filter Requests
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-slate-300"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-50 border border-slate-100 px-3 py-3 rounded-2xl text-xs font-bold focus:bg-white focus:border-primary outline-none transition-all"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Assigned</option>
              <option value="mentor_accepted">Mentor Accepted</option>
              <option value="mentor_rejected">Mentor Rejected</option>
            </select>

            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-slate-50 border border-slate-100 px-3 py-3 rounded-2xl text-xs font-bold focus:bg-white focus:border-primary outline-none transition-all"
            />

            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 h-full min-h-[44px] bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* ══ CARDS ══ */}
      {filteredDemos.length === 0 ? (
        <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-dashed border-slate-200 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-slate-800">No Requests Found</h3>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">No demo requests match your current filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredDemos.map((d) => (
            <div
              key={d._id}
              className={`bg-white rounded-[24px] border transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col overflow-hidden ${
                d.status === "pending" ? "border-amber-200/70" : "border-slate-100"
              }`}
            >
              {/* Accent bar */}
              {d.status === "pending" && (
                <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-400 w-full" />
              )}
              {d.status === "accepted" && (
                <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-400 w-full" />
              )}

              {/* Card Header */}
              <div className="p-5 flex items-start justify-between border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-[900] text-sm">
                    {d.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 tracking-tight">{d.name}</p>
                   <span
  className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
    d.mentorStatus === "accepted"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : d.mentorStatus === "rejected"
      ? "bg-rose-50 text-rose-600 border-rose-100"
      : d.status === "accepted"
      ? "bg-blue-50 text-blue-600 border-blue-100"
      : "bg-amber-50 text-amber-600 border-amber-100"
  }`}
>
  {d.mentorStatus === "accepted" ? (
    <CheckCircle2 className="w-2.5 h-2.5" />
  ) : d.mentorStatus === "rejected" ? (
    <Clock className="w-2.5 h-2.5" />
  ) : d.status === "accepted" ? (
    <CheckCircle2 className="w-2.5 h-2.5" />
  ) : (
    <Clock className="w-2.5 h-2.5" />
  )}

  {d.mentorStatus === "accepted"
    ? "Mentor Accepted"
    : d.mentorStatus === "rejected"
    ? "Mentor Rejected"
    : d.status === "accepted"
    ? "Assigned"
    : d.status}
</span>
                  </div>
                </div>
                <div className="text-[10px] font-black text-slate-400 flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3"/>
                  {new Date(d.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col gap-4 flex-1">
                {/* Contact info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                    <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="break-all">{d.email}</span>
                  </div>
                 {d.mentorStatus === "accepted" ? (
  <div
    onClick={() => openWhatsApp(d)}
    className="flex items-center gap-2 text-green-600 text-xs font-medium cursor-pointer hover:underline"
  >
    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
    <span>{d.phone}</span>
  </div>
) : (
  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
    <span>{d.phone}</span>
  </div>
)}
                </div>

                {/* Academic tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black border border-indigo-100 uppercase tracking-wider">
                    <Layers className="w-3 h-3"/>
                    Class {d.className}
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black border border-emerald-100 uppercase tracking-wider">
                    <BookOpen className="w-3 h-3"/>
                    {d.subject}
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-wider">
                    <GraduationCap className="w-3 h-3"/>
                    {d.syllabus}
                  </span>
                </div>

                {/* Action */}
                <div className="mt-auto pt-4 border-t border-slate-50">
                {d.status === "pending" ? (
                  <div className="space-y-4">
                    {/* Mentor Dropdown */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Available Mentor
                      </label>
                      {loadingMentors ? (
                        <div className="flex items-center gap-2 w-full bg-slate-50 border border-slate-100 px-3 py-3 rounded-2xl text-xs font-bold text-slate-400">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                          <span>Loading mentors...</span>
                        </div>
                      ) : (
                        <select
                          value={selectedMentorId[d._id] || ""}
                          onChange={(e) => handleMentorChange(d._id, e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 px-3 py-3 rounded-2xl text-xs font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all cursor-pointer"
                        >
                          <option value="">Select Mentor</option>
                          {mentors.map((mentor) => (
                            <option key={mentor._id} value={mentor._id}>
                              {mentor.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Slot Dropdown */}
                    {selectedMentorId[d._id] && (
                      <div className="space-y-1">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Select Available Slot
                        </label>
                        {loadingSlots[selectedMentorId[d._id]] ? (
                          <div className="flex items-center gap-2 w-full bg-slate-50 border border-slate-100 px-3 py-3 rounded-2xl text-xs font-bold text-slate-400">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                            <span>Loading slots...</span>
                          </div>
                        ) : !slots[selectedMentorId[d._id]] || slots[selectedMentorId[d._id]].length === 0 ? (
                          <select
                            disabled
                            className="w-full bg-slate-50 border border-slate-100 px-3 py-3 rounded-2xl text-xs font-bold text-rose-500/80 outline-none cursor-not-allowed"
                          >
                            <option>No available slots</option>
                          </select>
                        ) : (
                          <select
                            value={selectedSlotId[d._id] || ""}
                            onChange={(e) =>
                              setSelectedSlotId((prev) => ({
                                ...prev,
                                [d._id]: e.target.value,
                              }))
                            }
                            className="w-full bg-slate-50 border border-slate-100 px-3 py-3 rounded-2xl text-xs font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all cursor-pointer"
                          >
                            <option value="">Select Slot</option>
                            {slots[selectedMentorId[d._id]].map((slot) => (
                              <option key={slot._id} value={slot._id}>
                                {formatSlotLabel(slot)}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      onClick={() => assignMentor(d._id)}
                      disabled={!selectedMentorId[d._id] || !selectedSlotId[d._id] || processingId === d._id}
                      className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {processingId === d._id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Assigning...
                        </>
                      ) : (
                        "Assign Mentor"
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {d.assignedMentor && (
                      <div className="flex items-center gap-2 justify-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mentor:</span>
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{d.assignedMentor.name}</span>
                      </div>
                    )}
                    <div
  className={`text-center text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl border ${
    d.mentorStatus === "accepted"
      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
      : d.mentorStatus === "rejected"
      ? "bg-rose-50 text-rose-600 border-rose-100"
      : "bg-blue-50 text-blue-600 border-blue-100"
  }`}
>
  {d.mentorStatus === "accepted"
    ? "✅ Mentor Accepted"
    : d.mentorStatus === "rejected"
    ? "❌ Mentor Rejected"
    : "📋 Assigned — Awaiting Mentor"}
</div>
                  </div>
                )}
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
