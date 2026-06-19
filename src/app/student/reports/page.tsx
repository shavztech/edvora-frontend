"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  FileText,
  Send,
  Clock,
  Pencil,
  X,
  Check,
  MessageSquare,
  Loader2,
  Sparkles
} from "lucide-react";
import toast from "react-hot-toast";

export default function StudentReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mentorId, setMentorId] = useState("");
const [mentors, setMentors] = useState<any[]>([]);

  // ➕ New report
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // ✏️ Edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMessage, setEditMessage] = useState("");

  // 🔄 Load reports
  const loadReports = async () => {
    try {
      const res = await api.get("/reports");
      setReports(res.data.reports || []);
    } catch (error) {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  loadReports();
  
 const loadMentors = async () => {
  try {  
  const res = await api.get("/mentors/all");

    console.log("MENTORS DATA:", res.data);

    setMentors(res.data.mentors || res.data || []);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load mentors");
  }
};

  loadMentors();
}, []);
const canEdit = (createdAt: string) => {
  const diff =
    (Date.now() - new Date(createdAt).getTime()) / 1000;

  return diff <= 300;
};

  // ➕ Submit report
  const submitReport = async () => {
  if (!mentorId || !title || !message) {
    return toast.error("Please fill in all fields");
  }

  try {
    await api.post("/reports", {
      mentorId,
      title,
      message,
    });

    toast.success("Report submitted successfully");

    setMentorId("");
    setTitle("");
    setMessage("");

    loadReports();
  } catch (error) {
    toast.error("Failed to submit report");
  }
};

  // ✏️ Start edit
  const startEdit = (r: any) => {
    setEditingId(r._id);
    setEditTitle(r.title);
    setEditMessage(r.message);
  };

  // 💾 Save edit
  const saveEdit = async () => {
    try {
      await api.patch(`/reports/${editingId}`, {
        title: editTitle,
        message: editMessage,
      });
      toast.success("Report updated successfully");
      setEditingId(null);
      setEditTitle("");
      setEditMessage("");
      loadReports();
    } catch (error) {
      toast.error("Failed to update report");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-80" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 animate-fade-up">
      <div className="mb-8 md:mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-[900] text-gray-900 tracking-tight">Student Reports</h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 font-medium">Submit inquiries and track your academic requests.</p>
      </div>

      <div className="grid gap-6 lg:gap-10 lg:grid-cols-12 items-start">
        {/* ➕ SUBMIT FORM (Left Column - 4 cols) */}
        <div className="lg:col-span-4 h-fit lg:sticky lg:top-4 z-10">
          <div className="bg-white p-4 sm:p-6 rounded-[24px] shadow-lg shadow-gray-200/50 border border-gray-100 transition-shadow hover:shadow-xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
              <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl text-primary shadow-sm">
                <Send className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">New Report</h2>
            </div>

            <div className="space-y-5">
              <div>
  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
    Mentor
  </label>

  <select
    value={mentorId}
    onChange={(e) => setMentorId(e.target.value)}
    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
  >
    <option value="">Select Mentor</option>

    {mentors.map((mentor: any) => (
      <option key={mentor._id} value={mentor._id}>
        {mentor.name}
      </option>
    ))}
  </select>
</div>
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1 transition-colors group-focus-within:text-primary">Subject</label>
                <div className="relative transform transition-transform duration-200 focus-within:scale-[1.01]">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-gray-700 placeholder:text-gray-400"
                    placeholder="e.g. Grade Issue"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1 transition-colors group-focus-within:text-primary">Details</label>
                <div className="relative transform transition-transform duration-200 focus-within:scale-[1.01]">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <textarea
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none font-medium text-gray-700 placeholder:text-gray-400"
                    rows={4}
                    placeholder="Describe your issue clearly..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={submitReport}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 mt-1"
              >
                <Send className="w-5 h-5" />
                Submit Report
              </button>
            </div>
          </div>
        </div>

        {/* 📋 REPORT LIST (Right Column - 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-800">History</h2>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200">
                {reports.length}
              </span>
            </div>
          </div>

          {reports.length === 0 && (
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-dashed border-gray-300 text-center flex flex-col items-center justify-center min-h-[300px]">
              <div className="p-6 bg-gray-50 rounded-full mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/50" />
                <Sparkles className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No reports yet</h3>
              <p className="text-gray-500 text-base max-w-xs mx-auto leading-relaxed">
                When you submit a report or inquiry, it will appear here for you to track.
              </p>
            </div>
          )}

          <div className="space-y-4 md:space-y-6">
            {reports.map((r) => (
              <div
                key={r._id}
                className="group bg-white p-4 sm:p-5.5 rounded-[22px] shadow-sm border border-gray-100/80 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-200/40 hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                {editingId === r._id ? (
                  <div className="space-y-4 animate-fade-in-up">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded tracking-wide uppercase">Editing Mode</span>
                    </div>
                    <div>
                      <input
                        className="w-full text-lg font-bold p-3 bg-blue-50/30 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800 placeholder:text-gray-400"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        autoFocus
                        placeholder="Report Title"
                      />
                    </div>

                    <div>
                      <textarea
                        className="w-full p-3 bg-blue-50/30 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-gray-700 placeholder:text-gray-400 leading-relaxed"
                        rows={4}
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                        placeholder="Report Description"
                      />
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
                      <button
                        onClick={() => setEditingId(null)}
                        className="w-full sm:w-auto px-5 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm font-bold flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                      <button
                        onClick={saveEdit}
                        className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all text-sm font-bold flex items-center justify-center gap-2 transform active:scale-95"
                      >
                        <Check className="w-4 h-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full relative">
                    <div className="flex justify-between items-start gap-4 mb-2.5">
                      <h3 className="font-bold text-lg text-gray-800 leading-tight group-hover:text-primary transition-colors">
                        {r.title}
                      </h3>
                      {canEdit(r.createdAt) && (
                        <button
                          onClick={() => startEdit(r)}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transform hover:scale-105 active:scale-95"
                          title="Edit Report"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap flex-grow">
                      {r.message}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5 pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-2.5 py-1.5 rounded-lg w-fit">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold tracking-wide">
                          {new Date(r.createdAt).toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      {canEdit(r.createdAt) ? (
                        <span className="flex items-center justify-center gap-1.5 text-[10px] font-[900] uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-2 rounded-full border border-emerald-100/50 shadow-sm w-fit">
                          <Clock className="w-3 h-3" />
                          Editable Now
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-[10px] font-[900] uppercase tracking-wider text-gray-400 bg-gray-50 px-3 py-2 rounded-full w-fit">
                          Archived
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
