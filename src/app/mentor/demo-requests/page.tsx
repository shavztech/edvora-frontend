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
  CheckCircle2,
  XCircle,
  
  Sparkles,
  Timer,
  Filter,
  X,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

interface DemoRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  className: string;
  subject: string;
  syllabus: string;
  status: string;
  mentorStatus?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  slotId?: {
    _id: string;
    date: string;
    startTime: string;
    endTime: string;
  };
  createdAt: string;
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

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const monthNum = parseInt(parts[1], 10);
      const day = parts[2];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      if (monthNum >= 1 && monthNum <= 12) {
        return `${day} ${months[monthNum - 1]} ${parts[0]}`;
      }
    }
  } catch {
    // fallback
  }
  return dateStr;
};

export default function MentorDemoRequestsPage() {
  const [demos, setDemos] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadDemos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/demo/assigned");
      setDemos(res.data.requests || []);
    } catch {
      toast.error("Failed to load demo requests.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
  const init = async () => {
    await loadDemos();

    // Only ONCE when page opens
    await api.patch("/notifications/read-mentor-demo");
  };

  init();
}, []);

  const handleAccept = async (demoId: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="font-bold text-slate-800 text-sm">
            Confirm: <span className="text-green-600">Accept</span> this demo request?
          </p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                setProcessingId(demoId);
                try {
                  await api.patch(`/demo/${demoId}/status`, { status: "accepted" });
                  toast.success("Demo accepted successfully", { icon: "✅" });
                  setDemos((prev) =>
                    prev.map((d) =>
                      d._id === demoId ? { ...d, mentorStatus: "accepted" } : d
                    )
                  );
                } catch {
                  toast.error("Failed to accept demo");
                } finally {
                  setProcessingId(null);
                }
              }}
              className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white transition-all bg-green-600 hover:bg-green-700"
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
      ),
      { duration: 6000, position: "top-center" }
    );
  };

  const handleReject = async (demoId: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="font-bold text-slate-800 text-sm">
            Confirm: <span className="text-red-600">Reject</span> this demo request?
          </p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                setProcessingId(demoId);
                try {
                  await api.patch(`/demo/${demoId}/status`, { status: "rejected" });
                  toast.success("Demo rejected", { icon: "❌" });
                  setDemos((prev) =>
                    prev.map((d) =>
                      d._id === demoId ? { ...d, mentorStatus: "rejected" } : d
                    )
                  );
                } catch {
                  toast.error("Failed to reject demo");
                } finally {
                  setProcessingId(null);
                }
              }}
              className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white transition-all bg-red-600 hover:bg-red-700"
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
      ),
      { duration: 6000, position: "top-center" }
    );
  };

  
  const getSlotDate = (d: DemoRequest): string => {
    return d.slotId?.date || d.date || "";
  };

  const getSlotStartTime = (d: DemoRequest): string => {
    return d.slotId?.startTime || d.startTime || "";
  };

  const getSlotEndTime = (d: DemoRequest): string => {
    return d.slotId?.endTime || d.endTime || "";
  };

  const filteredDemos = demos.filter((d) => {
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
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
          Loading demo requests...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-3 sm:p-6 md:p-10 space-y-6 md:space-y-8">
        {/* HEADER */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/20">
            <Sparkles className="w-3 h-3" />
            Expert Console
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-[900] text-slate-900 tracking-tighter">
                Demo Requests
              </h1>
              <p className="text-slate-500 font-medium text-sm mt-1">
                Review and respond to assigned demo lesson requests.
              </p>
            </div>

            {/* STATS */}
            <div className="flex gap-3 flex-shrink-0">
              <div className="flex flex-col bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm text-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 justify-center">
                  <Timer className="w-2.5 h-2.5" />Total
                </span>
                <span className="text-xl font-[900] text-slate-800">{demos.length}</span>
              </div>
              <div className="flex flex-col bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm text-center">
                <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1 justify-center">
                  <Clock className="w-2.5 h-2.5" />Pending
                </span>
                <span className="text-xl font-[900] text-amber-600">
                  {demos.filter((d) => !d.mentorStatus || d.mentorStatus === "pending").length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            <Filter className="w-3.5 h-3.5" />
            Search Requests
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* CARDS */}
        {filteredDemos.length === 0 ? (
          <div className="bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 p-24 text-center space-y-4">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto">
              <Timer className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-lg font-black text-slate-800">No Demo Requests</h3>
            <p className="text-slate-400 font-bold max-w-xs mx-auto">
              You don&apos;t have any assigned demo requests right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
            {filteredDemos.map((d) => {
              const isPending = !d.mentorStatus || d.mentorStatus === "pending";
             const isAccepted = d.mentorStatus === "accepted";
const isRejected = d.mentorStatus === "rejected";

              const statusColors = isPending
                ? "bg-amber-50 text-amber-600 border-amber-100"
                : isAccepted
                ? "bg-green-50 text-green-600 border-green-100"
                : "bg-red-50 text-red-600 border-red-100";

              const statusLabel = isPending
                ? "Pending"
                : isAccepted
                ? "Accepted"
                : "Rejected";

              return (
                <div
                  key={d._id}
                  className="bg-white border border-slate-200 rounded-[30px] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group"
                >
                  {/* TOP */}
                  <div className="p-2 sm:p-4 pb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-50">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-md sm:text-xl font-black italic shadow-lg group-hover:scale-110 transition-transform shrink-0">
                        {d.name?.[0]?.toUpperCase() || "S"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight line-clamp-1">
                          {d.name}
                        </h3>
                        <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 truncate">
                          <Mail className="w-3 h-3 shrink-0" />
                          <span className="truncate">{d.email}</span>
                        </p>
                      </div>
                    </div>

                    <div
                      className={`self-start sm:self-auto shrink-0 px-3 sm:px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border w-fit ${statusColors}`}
                    >
                      {statusLabel}
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="p-2 sm:p-4 pt-3.5 space-y-2.5">
                    {/* Contact */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                        <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{d.phone}</span>
                      </div>
                    </div>

                    {/* Academic tags */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-primary" />
                          Subject
                        </span>
                        <p className="text-sm font-black text-slate-700">{d.subject}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-primary" />
                          Class
                        </span>
                        <p className="text-sm font-black text-slate-700">Class {d.className}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-primary" />
                        Syllabus
                      </span>
                      <p className="text-sm font-black text-slate-700">{d.syllabus}</p>
                    </div>

                    {/* Schedule */}
                    {getSlotDate(d) && (
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {formatDate(getSlotDate(d))}
                          </span>
                          {getSlotStartTime(d) && (
                            <p className="text-sm font-black text-slate-900 italic">
                              {formatTimeTo12h(getSlotStartTime(d))} - {formatTimeTo12h(getSlotEndTime(d))}
                            </p>
                          )}
                        </div>
                        <Clock className="w-5 h-5 text-slate-200 hidden sm:block shrink-0" />
                      </div>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="p-2 sm:p-4 pt-0 mt-auto space-y-2.5">
                    {/* WhatsApp */}
                  

                {isPending ? (
  <div className="flex gap-2.5">
    <button
      onClick={() => handleAccept(d._id)}
      disabled={processingId === d._id}
      className="flex-1 bg-primary text-white py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest"
    >
      Accept Demo
    </button>

    <button
      onClick={() => handleReject(d._id)}
      disabled={processingId === d._id}
      className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest"
    >
      Reject Demo
    </button>
  </div>
) : (
  <div
    className={`w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-center ${
      isAccepted
        ? "bg-green-50 text-green-600"
        : "bg-red-50 text-red-600"
    }`}
  >
    {isAccepted ? "✅ Accepted" : "❌ Rejected"}
  </div>
)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}