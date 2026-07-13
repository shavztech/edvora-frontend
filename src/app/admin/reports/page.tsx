"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Loader2,
  Trash2,
  User,
  Mail,
  Clock,
  FileText,
  AlertCircle,
  ClipboardList,
  CheckCircle2,
  Eye,
  Filter,
  Sparkles,
  Search,
  BarChart3
} from "lucide-react";
import toast from "react-hot-toast";

type FilterStatus = "all" | "pending" | "read";

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const loadReports = async (status: FilterStatus = filterStatus) => {
    try {
      setLoading(true);
      const params: any = {};
      if (status !== "all") params.status = status;
      const res = await api.get("/reports", { params });
      setReports(res.data.reports || []);
    } catch (error) {
      toast.error("Failed to load student reports");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    setMarkingId(id);
    try {
      await api.patch(`/reports/${id}/read`);
      toast.success("Report marked as read");
      setReports(prev =>
        prev.map(r => r._id === id ? { ...r, isRead: true } : r)
      );
      await loadReports(filterStatus);
    } catch (error) {
      toast.error("Failed to mark as read");
    } finally {
      setMarkingId(null);
    }
  };

 const deleteReport = async (id: string) => {
  setDeletingId(id);
  try {
    await api.delete(`/reports/${id}`);
    toast.success("Report deleted successfully");

    await loadReports(filterStatus);
  } catch (error) {
    toast.error("Failed to delete the report");
  } finally {
    setDeletingId(null);
  }
};

  const confirmDelete = (id: string, title: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 min-w-[260px]">
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-rose-500 flex-shrink-0" />
            <p className="text-sm font-bold text-slate-800">Delete Report?</p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-700">"{title}"</span> will be permanently removed.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => { toast.dismiss(t.id); deleteReport(id); }}
              className="flex-1 py-2 bg-rose-600 text-white text-xs font-black rounded-xl uppercase tracking-widest hover:bg-rose-700 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 py-2 bg-slate-100 text-slate-600 text-xs font-black rounded-xl uppercase tracking-widest hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };

  const handleFilterChange = (status: FilterStatus) => {
    setFilterStatus(status);
    loadReports(status);
  };

 useEffect(() => {
  loadReports(filterStatus);

  const interval = setInterval(() => {
    loadReports(filterStatus);
  }, 10000); // 10 seconds

  return () => clearInterval(interval);
}, [filterStatus]);

  const pendingCount = reports.filter(r => !r.isRead).length;
  const readCount = reports.filter(r => r.isRead).length;

  const filteredReports = reports.filter(r => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      r.title?.toLowerCase().includes(term) ||
      r.message?.toLowerCase().includes(term) ||
      r.student?.name?.toLowerCase().includes(term)
    );
  });
 const groupedReports: Record<string, any[]> = filteredReports.reduce(
  (acc: Record<string, any[]>, report: any) => {

    const month = report.createdAt
      ? new Date(report.createdAt).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Unknown Month";

    if (!acc[month]) {
      acc[month] = [];
    }

    acc[month].push(report);

    return acc;
  },
  {}
);
  return (
    <div className="w-full max-w-full overflow-x-hidden">
    <div className="max-w-6xl mx-auto p-3 sm:p-6 md:p-10 space-y-6 md:space-y-8 animate-fade-up">

      {/* ══ HEADER ══ */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/20">
          <Sparkles className="w-3 h-3"/>
          Admin Oversight
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter">Issue Tracker</h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Review and manage reports submitted by students.</p>
          </div>
          {/* STATS */}
          <div className="flex gap-3 flex-shrink-0">
            <div className="flex flex-col bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm text-center">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <BarChart3 className="w-2.5 h-2.5"/>Total
              </span>
              <span className="text-xl font-[900] text-slate-800">{reports.length}</span>
            </div>
            <div className="flex flex-col bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm text-center">
              <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-2.5 h-2.5"/>New
              </span>
              <span className="text-xl font-[900] text-amber-600">{pendingCount}</span>
            </div>
            <div className="flex flex-col bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm text-center">
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5"/>Read
              </span>
              <span className="text-xl font-[900] text-emerald-600">{readCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ SEARCH & FILTER BAR ══ */}
      <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Search */}
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by student, title, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-slate-300"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100 gap-1 flex-shrink-0">
            {[
              { label: "All", value: "all" as FilterStatus },
              { label: "Pending", value: "pending" as FilterStatus },
              { label: "Read", value: "read" as FilterStatus },
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => handleFilterChange(tab.value)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filterStatus === tab.value
                    ? "bg-white text-primary shadow-sm border border-slate-200/50"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
                {tab.value === "pending" && pendingCount > 0 && (
                  <span className="ml-1.5 bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-md text-[9px]">{pendingCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CONTENT ══ */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-70" />
          <p className="text-slate-400 font-[900] text-[10px] uppercase tracking-widest">Loading reports...</p>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-dashed border-slate-200 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-slate-800">
            {searchTerm ? "No Results Found" : filterStatus === "pending" ? "All Caught Up!" : "No Reports"}
          </h3>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">
            {searchTerm
              ? "No reports match your search criteria."
              : filterStatus === "pending"
              ? "There are no pending reports to review."
              : "No reports have been submitted yet."}
          </p>
        </div>
      ) : (
       <div className="space-y-10">

{Object.entries(groupedReports).map(
([month, monthReports]) => (

<div key={month}>

<div className="flex items-center justify-between mb-5">

<h2 className="text-xl font-black text-slate-800">
📅 {month}
</h2>

<span className="px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-black">
Total {monthReports.length} Reports
</span>

</div>


<div className="flex flex-col gap-4">

{monthReports.map((r) => (
            <div
              key={r._id}
              className={`group bg-white rounded-[24px] border transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 overflow-hidden ${
                r.isRead ? "border-slate-100" : "border-amber-200/70"
              }`}
            >
              {/* Accent bar for unread */}
              {!r.isRead && (
                <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-400 w-full" />
              )}

              <div className="p-5 sm:p-6">
                {/* Top Row: Student + Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-100/50">
                    <User className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{r.student?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl border border-purple-100">
  <User className="w-3.5 h-3.5" />

  <span className="text-[10px] font-black uppercase tracking-widest">
    Mentor: {r.mentor?.name || "Not Assigned"}
  </span>
</div>
                  <div className="flex items-center gap-2 bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl border border-slate-100">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-medium break-all">{r.student?.email}</span>
                  </div>
                  {r.isRead ? (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-[9px] font-black uppercase tracking-widest">
                      <CheckCircle2 className="w-3 h-3" />
                      Read
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-xl border border-amber-100 text-[9px] font-black uppercase tracking-widest">
                      <AlertCircle className="w-3 h-3" />
                      New
                    </span>
                  )}
                </div>

                {/* Content */}
                <h2 className="text-xl font-[900] text-slate-900 tracking-tight mb-2">{r.title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed bg-slate-50/80 p-4 rounded-2xl border border-slate-100 italic">
                  "{r.message}"
                </p>
                {/* Mentor Response */}
{r.response && (
  <div className="mt-4 bg-green-50 border border-green-100 rounded-2xl p-4">

    <div className="flex items-center gap-2 mb-2">
      <CheckCircle2 className="w-4 h-4 text-green-600" />

      <p className="text-[10px] font-black text-green-700 uppercase tracking-widest">
        Mentor Response
      </p>
    </div>


    <p className="text-sm font-semibold text-slate-700">
      {r.response}
    </p>


    {r.respondedAt && (
      <p className="text-[10px] text-slate-400 mt-2 font-bold">
        Responded : {new Date(r.respondedAt).toLocaleString()}
      </p>
    )}

  </div>
)}

                {/* Footer Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(r.createdAt).toLocaleDateString(undefined, {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>

                  <div className="flex gap-2">
                    {!r.isRead && (
                      <button
                        onClick={() => markAsRead(r._id)}
                        disabled={markingId === r._id}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-100 transition-all font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
                      >
                        {markingId === r._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Eye className="w-3.5 h-3.5" />}
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => confirmDelete(r._id, r.title)}
                      disabled={deletingId === r._id}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-100 transition-all font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
                    >
                      {deletingId === r._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
                   ))}

        </div>

      </div>

    ))}

</div>
      )}
    </div>
    </div>
  );
}
