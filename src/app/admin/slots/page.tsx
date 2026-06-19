"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { 
  Clock, 
  Calendar, 
  User, 
  Book, 
  Users, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Activity
} from "lucide-react";

interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  subject?: string;
  mentor: {
    _id: string;
    name: string;
    email?: string;
    subjects?: string[];
    mentorOnboarding?: {
  syllabus?: string;
  classes?: string[];
  subjects?: string[];
};

onboardingData?: {
  syllabus?: string;
  classLevel?: string;
  subjects?: string[];
};
  };
}

interface MentorGroup {
  mentor: Slot['mentor'];
  slots: Slot[];
  earliestStart: string;
  latestEnd: string;
}

// Helper to format time to 12-hour format
const formatTimeTo12h = (timeStr: string) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(':');
  let h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12;
  return `${h}:${minutes} ${ampm}`;
};

const formatTimeRange = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return formatTimeTo12h(startTime || endTime);
  return `${formatTimeTo12h(startTime)} - ${formatTimeTo12h(endTime)}`;
};

export default function AdminSlotsPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

 const loadSlots = async (showLoader = false) => {
  try {
    if (showLoader) setLoading(true);

    const res = await api.get("/admin/slots");
    setSlots(res.data);
  } catch (error: any) {
    console.error("ADMIN_SLOTS_LOAD_ERROR:", error);
  } finally {
    if (showLoader) setLoading(false);
  }
};

useEffect(() => {
  // First load with spinner
  loadSlots(true);

  const interval = setInterval(() => {
    // Auto refresh without spinner
    loadSlots(false);
  }, 10000);

  return () => clearInterval(interval);
}, []);
  // Group slots by mentor for Today only and calculate overall range
  const mentorGroups = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todaySlots = slots.filter((slot) => slot.date === todayStr);

    const groups: Record<string, { mentor: Slot['mentor'], slots: Slot[] }> = {};

    todaySlots.forEach((slot) => {
      const mentorId = slot.mentor?._id;
      if (!mentorId) return;

      if (!groups[mentorId]) {
        groups[mentorId] = {
          mentor: slot.mentor,
          slots: [],
        };
      }
      groups[mentorId].slots.push(slot);
    });

    return Object.values(groups)
      .sort((a, b) => (a.mentor.name || "").localeCompare(b.mentor.name || ""))
      .map(group => {
         // Sort slots by start time to find earliest/latest
         const sortedSlots = [...group.slots].sort((a, b) => a.startTime.localeCompare(b.startTime));
         
         const earliestStart = sortedSlots[0].startTime;
         
         // Find absolute latest end time
         const latestEnd = sortedSlots.reduce((latest, s) => {
            return s.endTime.localeCompare(latest) > 0 ? s.endTime : latest;
         }, sortedSlots[0].endTime);

         return {
            ...group,
            slots: sortedSlots,
            earliestStart,
            latestEnd
         };
      });
  }, [slots]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Daily Slots Monitor</h1>
          <p className="text-gray-500 text-sm font-medium">Viewing today's overall availability range for all mentors.</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 flex items-center gap-2">
           <Activity className="w-4 h-4 text-blue-500" />
           <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{mentorGroups.length} Mentors Online Today</span>
        </div>
      </div>

      {mentorGroups.length === 0 ? (
        <div className="bg-gray-50 rounded-3xl border border-gray-100 p-12 text-center">
           <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-4" />
           <p className="text-gray-400 font-bold">No sessions scheduled for today.</p>
           <button
  onClick={() => loadSlots(true)}
  className="mt-4 text-blue-600 text-xs font-black uppercase tracking-widest hover:underline"
>
  Refresh Data
</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentorGroups.map(({ mentor, earliestStart, latestEnd, slots: mentorSlots }) => {
            const m = mentor || {};
            
            const subjects = Array.from(new Set([
              ...(m.mentorOnboarding?.subjects || []),
              ...(m.onboardingData?.subjects || []),
              ...(m.subjects || []),
            ]));

            const classes = Array.from(new Set([
              ...(m.mentorOnboarding?.classes || []),
              ...(m.onboardingData?.classLevel ? [m.onboardingData.classLevel] : []),
            ]));

            const syllabus = m.mentorOnboarding?.syllabus || m.onboardingData?.syllabus || "Not set";

            const totalBooked = mentorSlots.filter(s => s.status === "Booked").length;

            return (
              <div 
                key={m._id}
                className="bg-white border border-gray-200 rounded-[28px] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                {/* Header Section */}
                <div className="p-5 flex items-center gap-4 bg-gray-50/50 border-b border-gray-100">
                    <div className="w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 font-black shadow-sm">
                      {m.name?.[0].toUpperCase() || "?"}
                    </div>
                    <div>
                      <h2 className="text-base font-black text-gray-800 leading-tight truncate max-w-[180px]">
                        {m.name || "Mentor"}
                      </h2>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                        {syllabus} Syllabus
                      </p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="p-5 grid grid-cols-2 gap-4 border-b border-gray-50">
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.15em] flex items-center gap-1">
                            <Book className="w-2.5 h-2.5" /> Expertise
                        </span>
                        <p className="text-[11px] font-bold text-gray-600 truncate">{subjects[0] || "General"}{subjects.length > 1 ? ` +${subjects.length - 1}` : ""}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.15em] flex items-center gap-1">
                            <Users className="w-2.5 h-2.5" /> Classes
                        </span>
                        <p className="text-[11px] font-bold text-gray-600 truncate">{classes.join(", ") || "All"}</p>
                    </div>
                </div>

                {/* Range Display Section */}
                <div className="p-5 bg-white">
                   <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-center space-y-2">
                       <div className="flex items-center justify-center gap-1.5 text-[9px] font-black text-blue-500 uppercase tracking-widest">
                           <Clock className="w-3.5 h-3.5" /> Today's Slot Window
                       </div>
                       <p className="text-lg font-black text-blue-900 italic tracking-tight">
                           {formatTimeRange(earliestStart, latestEnd)}
                       </p>
                   </div>
                </div>

                {/* Footer / Summary */}
                <div className="mt-auto px-5 py-3 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                      <Calendar className="w-3 h-3" /> Monitor Only
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full shadow-sm">
                         {mentorSlots.length} Total
                      </span>
                      {totalBooked > 0 && (
                        <span className="text-[10px] font-black text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                           {totalBooked} Booked
                        </span>
                      )}
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
