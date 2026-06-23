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
  Sparkles,
  CheckCircle2,
  Search,
  Filter,
  BarChart3
} from "lucide-react";
import toast from "react-hot-toast";

export default function MentorReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [response, setResponse] = useState("");
  const loadReports = async () => {
    try {
      setLoading(true);
      const res = await api.get("/reports");
      setReports(res.data.reports || []);
    } catch (error) {
      console.error("Load reports error:", error);
      toast.error("Failed to load session reports");
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-bold text-slate-800 text-sm">Delete this report permanently?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              setDeletingId(id);
              try {
                await api.delete(`/reports/${id}`);
                toast.success("Report deleted successfully");
                loadReports();
              } catch (error) {
                toast.error("Failed to delete the report");
              } finally {
                setDeletingId(null);
              }
            }}
            className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: 5000, position: "top-center" });
  };

  const markAsRead = async (id: string) => {
    try {
      await api.patch(`/reports/${id}/read`);
      toast.success("Report marked as handled");
      loadReports();
    } catch (error) {
      toast.error("Action not authorized");
    }
  };
const sendResponse = async (id: string) => {
  try {
    await api.patch(`/reports/${id}/respond`, {
      response,
    });

    toast.success("Response sent");

    setResponse("");
    loadReports();
  } catch (error) {
    toast.error("Failed to send response");
  }
};
  useEffect(() => {
    loadReports();
  }, []);

  const filteredReports = reports.filter(r => 
    r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.student?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: reports.length,
    pending: reports.filter(r => !r.isRead).length,
    resolved: reports.filter(r => r.isRead).length
  };

  if (loading && reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-70" />
        <p className="text-slate-400 font-[900] text-[10px] uppercase tracking-widest">Gathering data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 space-y-8 md:space-y-12 animate-fade-up">
      
      {/* ══ HEADER ══ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/20">
            <Sparkles className="w-3 h-3"/>
            Expert Console
          </div>
          <h1 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter">
            Issue Tracker
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Review and manage reports submitted by your students.
          </p>
        </div>

        {/* STATS BAR */}
        <div className="flex gap-4 sm:gap-6">
          {[
            { label: "Total", value: stats.total, icon: ClipboardList, color: "text-primary" }
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <s.icon className={`w-3 h-3 ${s.color}`}/>
                {s.label}
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FILTERS ══ */}
      <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-4 border border-white shadow-xl shadow-slate-200/40 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by student or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-sm text-slate-800 placeholder:text-slate-400"
          />
        </div>
        <button className="w-full sm:w-fit px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2">
          <Filter className="w-4 h-4"/>
          Filters
        </button>
      </div>

      {/* ══ CONTENT ══ */}
      {filteredReports.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-sm p-12 sm:p-24 rounded-[40px] shadow-sm border border-dashed border-slate-200 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
            <BarChart3 className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-2xl font-[900] text-slate-800 mb-2">Clean Dashboard</h3>
          <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed font-medium">
            {searchTerm ? "No reports match your current search criteria." : "No reports have been flagged yet. Your students are currently happy!"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredReports.map((r) => (
            <div
              key={r._id}
              className="group bg-white rounded-[32px] p-4 sm:p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden"
            >
              {/* STATUS INDICATOR SIDE BAR */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${r.isRead ? 'bg-emerald-500' : 'bg-primary'}`} />

              <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
                <div className="flex-1 w-full sm:w-auto space-y-4">
                  
                  {/* META TAGS */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-900/10">
                      <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center text-[10px] font-black font-italic">
                        {r.student?.name?.[0]?.toUpperCase()}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider">{r.student?.name}</span>
                    </div>
                    
                    {!r.isRead && (
                      <span className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl border border-amber-100 text-[9px] font-black uppercase tracking-widest animate-pulse">
                        <AlertCircle className="w-3 h-3"/>
                        New Action Required
                      </span>
                    )}

                    
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-[900] text-slate-900 tracking-tight leading-tight mb-2 group-hover:text-primary transition-colors">
                      {r.title}
                    </h2>
                    <div className="relative">
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner italic font-medium">
                        "{r.message}"
                      </p>
                      <div className="mt-4 space-y-3">
  <textarea
    value={response}
    onChange={(e) => setResponse(e.target.value)}
    placeholder="Write response to student..."
    className="w-full p-3 border border-slate-200 rounded-xl"
  />

  <button
    onClick={() => sendResponse(r._id)}
    className="px-4 py-2 bg-green-600 text-white rounded-xl"
  >
    Send Response
  </button>
</div>
                    </div>
                  </div>

                  {/* FOOTER META */}
                  <div className="flex items-center gap-2 text-slate-400 font-black text-[9px] uppercase tracking-[0.2em] ml-1">
                    <Clock className="w-3.5 h-3.5" />
                    Detected on {new Date(r.createdAt).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-fit mt-auto sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                  {!r.isRead && (
                    <button
                      onClick={() => markAsRead(r._id)}
                      className="flex-1 sm:w-32 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Handle
                    </button>
                  )}
                
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER INFO */}
      <div className="text-center pt-8 border-t border-slate-100">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center justify-center gap-2">
          <BarChart3 className="w-3.5 h-3.5"/>
          End of report thread
        </p>
      </div>

    </div>
  );
}
