"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { ALL_SUBJECTS, ALL_CLASSES } from "@/utils/subjects";

import {
  Book,
  Users,
  Clock,
  Calendar,
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Search,
  Filter,
  X
} from "lucide-react";

interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  mentor: {
    _id: string;
    name: string;
    email?: string;
    subjects?: string[];
    syllabus?: string;
    classLevel?: string;
    mentorOnboarding?: {
      syllabus?: string;
      classes?: string[];
      subjects?: string[];
    };
    onboarding?: {
      syllabus?: string;
      classLevel?: string;
      subjects?: string[];
    };
    onboardingData?: {
      syllabus?: string;
      classLevel?: string;
      subjects?: string[];
    };
  };
}

// Helper to format time to 12-hour format
const formatTimeTo12h = (timeStr: string) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(':');
  let h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; // 0 becomes 12
  return `${h}:${minutes} ${ampm}`;
};

// Helper to format time range
const formatTimeRange = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return formatTimeTo12h(startTime || endTime);
  return `${formatTimeTo12h(startTime)} - ${formatTimeTo12h(endTime)}`;
};

export default function StudentSlots() {
  const pathname = usePathname();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedState, setSelectedState] = useState("");

  // Selections per mentor card (for booking)
  const [selections, setSelections] = useState<{
    [mentorId: string]: {
      subject: string;
      class: string;
      slotId: string;
    };
  }>({});

  const loadSlots = async () => {
    try {
      const res = await api.get("/slots/available");
      setSlots(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const bookSlot = async (mentorId: string) => {
    const selection = selections[mentorId];
    if (!selection?.slotId) {
      toast.error("Please select a time slot");
      return;
    }
    if (!selection?.subject) {
      toast.error("Please select a subject");
      return;
    }

    try {
      const slot = slots.find((s: any) => s._id === selection.slotId);
      if (!slot) return;

      await api.post(`/bookings`, { 
        mentorId,
        slotId: selection.slotId,
        subject: selection.subject,
        classLevel: selection.class,
        startTime: slot.startTime,
        endTime: slot.endTime,
        date: slot.date
      });

      toast.success("Booking request sent! Wait for mentor approval.");
      loadSlots();
    } catch (error) {
      console.error(error);
      toast.error("Booking request failed");
    }
  };

  // Extract unique filter options
  const filterOptions = useMemo(() => {
    const states = new Set<string>();

    slots.forEach(slot => {
      const m = slot.mentor || {};
      // States
      const state = m.mentorOnboarding?.syllabus || m.onboardingData?.syllabus || m.onboarding?.syllabus || m.syllabus;
      if (state) states.add(state);
    });

    return {
      subjects: ALL_SUBJECTS,
      classes: ALL_CLASSES,
      states: Array.from(states).sort(),
    };
  }, [slots]);

  // Combined Filtering Logic (including Today-only)
  const filteredMentorGroups = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    // Group first and filter by today
    const grouped = slots.reduce((acc, slot) => {
      // Filter for today's date only
      if (slot.date !== todayStr) return acc;

      const mentorId = slot.mentor?._id;
      if (!mentorId) return acc;
      if (!acc[mentorId]) {
        acc[mentorId] = {
          mentor: slot.mentor,
          slots: [],
        };
      }
      acc[mentorId].slots.push(slot);
      return acc;
    }, {} as { [key: string]: { mentor: Slot['mentor']; slots: Slot[] } });

    // Then filter the groups by name and global filters
    return Object.values(grouped).filter(({ mentor }) => {
      const m = mentor || {};
      const nameMatch = m.name?.toLowerCase().includes(searchTerm.toLowerCase());

      const mSubjects = [
        ...(m.mentorOnboarding?.subjects || []),
      ];
      const subjectMatch = !selectedSubject || mSubjects.includes(selectedSubject);

      const mClasses = [
        ...(m.mentorOnboarding?.classes || []),
        ...(m.onboardingData?.classLevel ? [m.onboardingData.classLevel] : []),
        ...(m.onboarding?.classLevel ? [m.onboarding.classLevel] : []),
        ...(m.classLevel ? [m.classLevel] : []),
      ];
      const gradeMatch = !selectedGrade || mClasses.includes(selectedGrade);

      const mState = m.mentorOnboarding?.syllabus || m.onboardingData?.syllabus || m.onboarding?.syllabus || m.syllabus || "General";
      const stateMatch = !selectedState || mState === selectedState;

      return nameMatch && subjectMatch && gradeMatch && stateMatch;
    });
  }, [slots, searchTerm, selectedSubject, selectedGrade, selectedState]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-400 text-sm font-bold tracking-widest animate-pulse">LOADING EXPERTS...</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="text-center space-y-3 pb-2">
        <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[9px] uppercase tracking-[0.4em] bg-blue-50 px-3.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3" />
          Student Hub
        </div>
        <h1 className="text-3xl md:text-4xl font-[900] text-gray-900 tracking-tighter">
          Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Perfect Slot</span>
        </h1>
        <p className="text-gray-400 text-sm font-medium max-w-md mx-auto">
          Connect with curated mentors for specialized sessions today.
        </p>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center justify-center border-b border-gray-100">
        <div className="flex gap-6">
          <Link 
            href="/student/slot"
            className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${
              pathname === '/student/slot' 
              ? 'text-blue-600' 
              : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Available Slots
            {pathname === '/student/slot' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </Link>
          <Link 
            href="/student/bookings"
            className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${
              pathname === '/student/bookings' 
              ? 'text-blue-600' 
              : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            My Bookings
            {pathname === '/student/bookings' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </Link>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="sticky top-16 z-40 bg-gray-100/95 backdrop-blur-xl py-3 -mx-4 px-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search mentor by name..."
            className="w-full bg-white border border-gray-100 pl-11 pr-4 py-2.5 rounded-2xl text-sm font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <select
            className="bg-white border border-gray-100 px-2 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold text-gray-600 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 appearance-none cursor-pointer text-center"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {filterOptions.subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            className="bg-white border border-gray-100 px-2 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold text-gray-600 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 appearance-none cursor-pointer text-center"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            <option value="">All Classes</option>
            {filterOptions.classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            className="bg-white border border-gray-100 px-2 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold text-gray-600 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 appearance-none cursor-pointer text-center"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">All States</option>
            {filterOptions.states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {filteredMentorGroups.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[32px] border border-gray-100 shadow-inner">
          <div className="bg-white w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-200" />
          </div>
          <h3 className="text-lg font-black text-gray-800">No slots available today</h3>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1.5 mb-6">Try adjusting your search or check back tomorrow</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedSubject("");
              setSelectedGrade("");
              setSelectedState("");
            }}
            className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          {filteredMentorGroups.map(({ mentor, slots: mentorSlots }) => {
            const m = mentor || {};
            const mentorId = m._id;

            // Robust Fallbacks for Subjects
            const subjects = Array.from(new Set([
              ...(m.mentorOnboarding?.subjects || []),
              ...(m.onboardingData?.subjects || []),
              ...(m.onboarding?.subjects || []),
              ...(m.subjects || []),
            ]));

            // Robust Fallbacks for Classes
            const classes = Array.from(new Set([
              ...(m.mentorOnboarding?.classes || []),
              ...(m.onboardingData?.classLevel ? [m.onboardingData.classLevel] : []),
              ...(m.onboarding?.classLevel ? [m.onboarding.classLevel] : []),
              ...(m.classLevel ? [m.classLevel] : []),
            ]));

            // State (Syllabus)
            const state =
              m.mentorOnboarding?.syllabus ||
              m.onboardingData?.syllabus ||
              m.onboarding?.syllabus ||
              m.syllabus ||
              "General";

            const currentSelection = selections[mentorId] || { subject: "", class: "", slotId: "" };

            // Generate Initials for Avatar
            const initials = (m.name || "??")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .substring(0, 2);

            return (
              <div
                key={mentorId}
                className="bg-white rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-400 overflow-hidden flex flex-col hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500"
              >
                {/* Top Section Compact */}
                <div className="p-4 sm:p-5.5 pb-2.5 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg flex items-center justify-center text-xl font-black text-white shrink-0">
                      {initials}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest truncate">Certified Mentor</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-[900] text-gray-900 tracking-tight leading-none truncate pr-2">
                        {m.name || "Expert Mentor"}
                      </h2>
                    </div>
                  </div>
                  <div className="shrink-0 bg-gray-50/80 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 flex items-center gap-1.5 sm:self-start">
                    <MapPin className="w-2.5 h-2.5" />
                    {state}
                  </div>
                </div>

                {/* Middle Section Compact Details */}
                <div className="px-4 sm:px-5.5 py-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-gray-100 p-3 rounded-2xl border border-gray-100/40">
                    <div className="flex items-center gap-1.5 mb-2 text-gray-400 font-bold text-[9px] uppercase tracking-widest">
                      <Book className="w-3 h-3" />
                      Expertise
                    </div>
                    <div className="text-[12px] font-black text-gray-700 capitalize truncate">
                      {subjects.length > 0 ? subjects.join(" • ") : "Specialist"}
                    </div>
                  </div>

                  <div className="bg-gray-100 p-3 rounded-2xl border border-gray-100/40">
                    <div className="flex items-center gap-1.5 mb-2 text-gray-400 font-bold text-[9px] uppercase tracking-widest">
                      <Users className="w-3 h-3" />
                      Classroom
                    </div>
                    <div className="text-[12px] font-black text-gray-700 capitalize truncate">
                      {classes.length > 0 ? classes.join(" • ") : "All Classes"}
                    </div>
                  </div>
                </div>

                {/* Selection Section Compact */}
                <div className="px-4 sm:px-5.5 py-4 bg-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {/* Subject Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-gray-400 uppercase px-1 tracking-widest">Subject</label>
                      <select
                        className="w-full border-2 border-transparent bg-white shadow-sm p-2.5 rounded-xl text-[13px] font-bold text-gray-700 outline-none border-gray-300 focus:border-blue-600 transition-all appearance-none cursor-pointer"
                        value={currentSelection.subject}
                        onChange={(e) =>
                          setSelections({
                            ...selections,
                            [mentorId]: { ...currentSelection, subject: e.target.value },
                          })
                        }
                      >
                        <option value="">Subject</option>
                        {subjects.map((sub, i) => (
                          <option key={i} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>

                    {/* Grade Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-gray-400 uppercase px-1 tracking-widest">Class</label>
                      <select
                        className="w-full border-2 border-transparent bg-white shadow-sm p-3 rounded-xl text-[13px] font-bold text-gray-700 outline-none focus:border-blue-600 transition-all appearance-none cursor-pointer"
                        value={currentSelection.class}
                        onChange={(e) =>
                          setSelections({
                            ...selections,
                            [mentorId]: { ...currentSelection, class: e.target.value },
                          })
                        }
                      >
                        <option value="">Class</option>
                        {classes.map((cls, i) => (
                          <option key={i} value={cls}>{cls}</option>
                        ))}
                      </select>
                    </div>

                    {/* Time Dropdown (12-hour format) */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-gray-400 uppercase px-1 tracking-widest">Timing</label>
                      <select
                        className="w-full border-2 border-transparent bg-white shadow-sm p-3 rounded-xl text-[13px] font-black text-gray-900 outline-none focus:border-blue-600 transition-all appearance-none cursor-pointer"
                        value={currentSelection.slotId}
                        onChange={(e) =>
                          setSelections({
                            ...selections,
                            [mentorId]: { ...currentSelection, slotId: e.target.value },
                          })
                        }
                      >
                        <option value="">Time Slot</option>
                        {mentorSlots
                          .sort((a, b) => a.startTime.localeCompare(b.startTime))
                          .map((slot) => (
                            <option key={slot._id} value={slot._id}>
                              {formatTimeRange(slot.startTime, slot.endTime)}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bottom Section Compact */}
                <div className="p-4 sm:p-5.5 bg-white border-t border-gray-50 flex flex-col items-center gap-3">
                  <button
                    onClick={() => bookSlot(mentorId)}
                    className="w-full bg-black text-white py-3 rounded-2xl font-black text-base tracking-tight shadow-xl shadow-black/5 hover:bg-gray-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group"
                  >
                    Book Session Now
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
                    <Clock className="w-3.5 h-3.5" />
                    60 MIN DURATION
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