"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Loader2,
  User,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Layers,
  Calendar,
  CheckCircle,
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
  createdAt: string;
};

export default function AdminDemoPage() {
  const [demos, setDemos] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadDemos = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filterStatus) params.status = filterStatus;
      if (filterDate) params.date = filterDate;

      const res = await api.get("/admin/demo", { params });
      setDemos(res.data);
    } catch (err: any) {
      toast.error("Failed to load demo requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  loadDemos();

  const interval = setInterval(() => {
    loadDemos();
  }, 10000); // 10 seconds

  return () => clearInterval(interval);
}, [filterStatus, filterDate]);

  const handleAccept = async (id: string) => {
    setProcessingId(id);
    try {
      const res = await api.put(`/admin/demo/${id}/accept`);
      if (res.data.success) {
        toast.success("Demo request accepted!");
        setDemos((prev) =>
          prev.map((d) => d._id === id ? { ...d, status: "accepted" } : d)
        );
      }
    } catch (err: any) {
      toast.error("Failed to accept the request.");
    } finally {
      setProcessingId(null);
    }
  };

  const confirmAccept = (id: string, name: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 min-w-[260px]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <p className="text-sm font-bold text-slate-800">Accept Demo Request?</p>
          </div>
          <p className="text-xs text-slate-500">
            This will accept <span className="font-bold text-slate-700">{name}'s</span> demo request and notify them.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => { toast.dismiss(t.id); handleAccept(id); }}
              className="flex-1 py-2 bg-emerald-600 text-white text-xs font-black rounded-xl uppercase tracking-widest hover:bg-emerald-700 transition-colors"
            >
              Accept
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

  const handleReset = () => {
    setFilterStatus("");
    setFilterDate("");
    setSearchTerm("");
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
              <option value="accepted">Accepted</option>
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
                    <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                      d.status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      d.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {d.status === "accepted" ? <CheckCircle2 className="w-2.5 h-2.5"/> : <Clock className="w-2.5 h-2.5"/>}
                      {d.status}
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
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                    <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{d.phone}</span>
                  </div>
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
                    <button
                      onClick={() => confirmAccept(d._id, d.name)}
                      disabled={processingId === d._id}
                      className="w-full py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-100 font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {processingId === d._id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5" />
                      )}
                      Accept Request
                    </button>
                  ) : (
                    <div className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      — Processed —
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
