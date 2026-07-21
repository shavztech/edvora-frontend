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
   console.log("MentorReports Render");

  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
 const [responses, setResponses] = useState<Record<string,string>>({});
  const loadReports = async () => {
      console.log("loadReports called");
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

    if (!responses[id]) {
      return toast.error("Enter response");
    }

    await api.patch(`/reports/${id}/respond`, {
      response: responses[id],
    });

    toast.success("Response sent");

    setResponses({
      ...responses,
      [id]: "",
    });

    loadReports();

  } catch (error) {
    toast.error("Failed to send response");
  }
};

  const filteredReports = reports.filter(r => 
    r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.student?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
  loadReports();
}, []);
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

    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">

        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/20">
          <Sparkles className="w-3 h-3" />
          Expert Console
        </div>

        <h1 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter">
          Issue Tracker
        </h1>

        <p className="text-slate-500 font-medium text-sm md:text-base">
          Review and manage reports submitted by your students.
        </p>

      </div>

      <div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Total Reports
        </span>

        <h2 className="text-3xl font-black">
          {reports.length}
        </h2>
      </div>
    </div>


    {/* SEARCH */}
    <div className="bg-white rounded-3xl p-4 border shadow-sm">

      <input
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        placeholder="Search reports..."
        className="w-full border rounded-xl p-3"
      />

    </div>


    {/* CONTENT */}

    {filteredReports.length === 0 ? (

      <div className="p-20 text-center bg-white rounded-3xl">
        No reports found
      </div>

    ) : (

      <div className="grid gap-6">

        {filteredReports.map((r)=>(

          <div
            key={r._id}
            className="bg-white rounded-[32px] p-8 shadow border"
          >


            {/* STUDENT */}
            <div className="flex items-center gap-3 mb-4">

              <User className="w-5 h-5"/>

              <span className="font-black">
                {r.student?.name}
              </span>

            </div>



            {/* TITLE */}
            <h2 className="text-xl font-black mb-3">

              {r.title}

            </h2>



            {/* STUDENT MESSAGE */}
            <p className="bg-slate-50 p-5 rounded-2xl text-slate-600">

              "{r.message}"

            </p>



            {/* MENTOR RESPONSE */}
            {r.response && (

              <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-4">

                <p className="text-xs font-black text-green-700 uppercase mb-2">
                  Your Response
                </p>


                <p className="text-sm text-slate-700">
                  {r.response}
                </p>


                {r.respondedAt && (

                  <p className="text-[10px] text-gray-400 mt-2">

                    {new Date(r.respondedAt).toLocaleString()}

                  </p>

                )}

              </div>

            )}



            {/* RESPONSE BOX */}

            <textarea

              value={responses[r._id] || ""}

              onChange={(e)=>

                setResponses({

                  ...responses,

                  [r._id]: e.target.value,

                })

              }

              placeholder="Write response to student..."

              className="w-full mt-4 p-3 border rounded-xl"

            />



            <button

              onClick={()=>sendResponse(r._id)}

              className="mt-3 px-5 py-2 bg-green-600 text-white rounded-xl font-bold"

            >

              Send Response

            </button>



            {/* DATE */}

            <div className="mt-5 text-xs text-gray-400 flex gap-2 items-center">

              <Clock className="w-3 h-3"/>

              {new Date(r.createdAt).toLocaleDateString()}

            </div>



            {/* HANDLE */}

            {!r.isRead && (

              <button

                onClick={()=>markAsRead(r._id)}

                className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-xl"

              >

                Mark Handled

              </button>

            )}

          </div>

        ))}

      </div>

    )}

   </div>
);
}