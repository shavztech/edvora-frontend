"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Loader from "@/components/Loader";
import { User, Mail, Shield, ShieldAlert, Edit2, CheckCircle2, XCircle, Briefcase, MapPin, BookOpen, GraduationCap, Calendar, X, Search, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const isStudentUnpaid = (student: any, allPayments: any[]) => {
  if (student.role !== "student") return false;
  
  const now = new Date();
  const joinedAt = new Date(student.createdAt);
  const joiningDay = joinedAt.getDate();
  
  let lastDueDate = new Date(now.getFullYear(), now.getMonth(), joiningDay);
  if (now < lastDueDate) {
    lastDueDate.setMonth(lastDueDate.getMonth() - 1);
  }
  
  if (lastDueDate < joinedAt) {
    lastDueDate = joinedAt;
  }
  
  const dueMonthString = lastDueDate.toLocaleString("en-IN", {
    month: "short",
    year: "numeric",
  });
  
  const hasPaid = allPayments.some(
    (p) => 
      (p.student?._id === student._id || p.student === student._id) && 
      p.status === "paid" && 
      p.month === dueMonthString
  );
  
  return !hasPaid;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"student" | "mentor" | "admin">("student");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "blocked" | "unpaid">("all");
  
  // Modal states
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<any>({});
  const [processingBlock, setProcessingBlock] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const [usrRes, payRes] = await Promise.all([
        api.get("/admin/users", { params: { name: searchTerm } }),
        api.get("/payments")
      ]);
      setUsers(usrRes.data.users || []);
      setPayments(payRes.data.payments || []);
    } catch (err) {
      console.error("Failed to load users", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    // Fetch current admin profile to check role
    api.get("/admin/settings").then(res => {
      setCurrentAdmin(res.data);
    }).catch(err => console.error("Failed to fetch admin settings", err));
  }, []);

  const openUserDetails = async (userId: string) => {
    try {
      const res = await api.get(`/admin/users/${userId}`);
      setSelectedUser(res.data.user);
      setEditForm(res.data.user);
      setIsEditMode(false);
    } catch (err) {
      toast.error("Failed to fetch user details");
    }
  };

  const handleBlockToggle = async () => {
    if (!selectedUser) return;
    setProcessingBlock(true);
    try {
      const res = await api.patch(`/admin/users/${selectedUser._id}/block`);
      if (res.data.success) {
        toast.success(res.data.message);
        // Update local state
        const updatedIsBlocked = res.data.isBlocked;
        setSelectedUser((prev: any) => ({ ...prev, isBlocked: updatedIsBlocked }));
        setUsers(users.map(u => u._id === selectedUser._id ? { ...u, isBlocked: updatedIsBlocked } : u));
      }
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setProcessingBlock(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      // Structure the data for PUT
      const payload: any = {
        name: editForm.name,
      };

      if (selectedUser.role === "student") {
        const selectedSyllabus = editForm.syllabus || editForm.studentOnboarding?.syllabus || editForm.onboarding?.syllabus;
        const selectedClass = editForm.class || editForm.studentOnboarding?.class || editForm.onboarding?.class || editForm.classLevel || editForm.studentOnboarding?.classLevel || editForm.onboarding?.classLevel;
        const selectedCourseType = editForm.courseType || editForm.studentOnboarding?.courseType || editForm.onboarding?.courseType;

        payload.syllabus = selectedSyllabus;
        payload.class = selectedClass;
        payload.courseType = selectedCourseType;
        
        let sub = editForm.subjects || editForm.studentOnboarding?.subjects || editForm.onboarding?.subjects;
        if (typeof sub === "string") sub = sub.split(",").map((s: string) => s.trim());
        payload.subjects = sub || [];
        
      } else if (selectedUser.role === "mentor") {
        const classes = editForm.mentorOnboarding?.classes || [];
        const sub = editForm.subjects || editForm.mentorOnboarding?.subjects || [];
        
        payload.subjects = sub;
        payload.mentorOnboarding = {
          syllabus: editForm.mentorOnboarding?.syllabus || "",
          experience: editForm.mentorOnboarding?.experience || "",
          classes: classes,
          subjects: sub
        };
      } else if (selectedUser.role === "admin") {
        // Only name is editable for admins here (security is in settings)
      }

      await api.put(`/admin/users/${selectedUser._id}`, payload);
      toast.success("User updated successfully");
      setIsEditMode(false);
      fetchUsers();
      // Re-fetch details to ensure consistency
      openUserDetails(selectedUser._id);
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  const filteredUsers = users.filter(u => {
    const roleMatch = u.role === activeTab;
    const isUnpaid = isStudentUnpaid(u, payments);
    let statusMatch = true;
    
    if (statusFilter === "active") statusMatch = !u.isBlocked;
    if (statusFilter === "blocked") statusMatch = u.isBlocked;
    if (statusFilter === "unpaid") statusMatch = isUnpaid;

    return roleMatch && statusMatch;
  });

  // Calculate status counts for the active tab
  const statusCounts = {
    all: users.filter(u => u.role === activeTab).length,
    active: users.filter(u => u.role === activeTab && !u.isBlocked).length,
    blocked: users.filter(u => u.role === activeTab && u.isBlocked).length,
    unpaid: users.filter(u => u.role === "student" && isStudentUnpaid(u, payments)).length
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto py-6">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">User Management</h1>
          <p className="text-slate-500 mt-1">Manage students and mentors</p>
        </div>
        
        {/* Modern Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-hidden">
          <button
            onClick={() => { setActiveTab("student"); setStatusFilter("all"); }}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              activeTab === "student" 
                ? "bg-white text-primary shadow-sm ring-1 ring-slate-200" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => { setActiveTab("mentor"); setStatusFilter("all"); }}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              activeTab === "mentor" 
                ? "bg-white text-primary shadow-sm ring-1 ring-slate-200" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            }`}
          >
            Mentors
          </button>
          {currentAdmin?.role === "super_admin" && (
            <button
              onClick={() => { setActiveTab("admin"); setStatusFilter("all"); }}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                activeTab === "admin" 
                  ? "bg-white text-primary shadow-sm ring-1 ring-slate-200" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              }`}
            >
              Admins
            </button>
          )}
        </div>
      </div>

      {/* 🔍 SEARCH & FILTER BAR */}
      <div className="bg-white p-4 sm:p-6 rounded-[2rem] border border-slate-100 shadow-sm animate-fade-up">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* SEARCH */}
          <div className="relative group w-full lg:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text"
              placeholder={`Search ${activeTab}s by name...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold shadow-none focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-rose-500 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* STATUS FILTERS */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-1.5 rounded-[1.25rem] border border-slate-100 w-full sm:w-auto">
            {[
              { id: "all", label: "All Users", count: statusCounts.all, color: "text-slate-600" },
              { id: "active", label: "Active", count: statusCounts.active, color: "text-emerald-600" },
              { id: "blocked", label: "Blocked", count: statusCounts.blocked, color: "text-rose-600" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  statusFilter === f.id
                    ? "bg-white text-primary shadow-sm border border-slate-200/50"
                    : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                }`}
              >
                <span className={statusFilter === f.id ? "text-primary" : f.color}>{f.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${
                  statusFilter === f.id ? "bg-primary/10 text-primary" : "bg-slate-200/50 text-slate-500"
                }`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <UserCircle className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>No {activeTab}s found.</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <UserCard 
                key={user._id} 
                user={user} 
                isUnpaid={activeTab === "student" && isStudentUnpaid(user, payments)}
                onClick={() => openUserDetails(user._id)} 
              />
            ))
          )}
        </div>
      )}

      {/* User Details / Edit Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg border border-slate-200/50 flex flex-col scale-in-center">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-800 truncate">{selectedUser.name}</h2>
                  <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                    <span className={`inline-flex items-center gap-1 text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                      selectedUser.isBlocked ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                    }`}>
                      {selectedUser.isBlocked ? "Blocked" : "Active"}
                    </span>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-widest border border-slate-200">
                      {selectedUser.role}
                    </span>
                    {selectedUser.role === "student" && isStudentUnpaid(selectedUser, payments) && (
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 uppercase tracking-widest border border-amber-100 flex items-center gap-1">
                        Unpaid
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { setSelectedUser(null); setIsEditMode(false); }}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 flex-1 bg-slate-50/50">
              {isEditMode ? (
                <EditForm 
                  user={selectedUser} 
                  editForm={editForm} 
                  setEditForm={setEditForm} 
                />
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <InfoTile icon={<Mail />} label="Email" value={selectedUser.email} />
                    <InfoTile icon={<Calendar />} label="Joined" value={new Date(selectedUser.createdAt).toLocaleDateString()} />
                  </div>
                  
                  {/* Onboarding Info */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-3 sm:mb-4 flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-primary" />
                      Academic Details
                    </h3>
                    
                    {selectedUser.role === "student" ? (
                      <div className="flex flex-col gap-1.5">
                        <DetailRow label="Syllabus" value={selectedUser.onboarding?.syllabus || selectedUser.syllabus || "N/A"} />
                        <DetailRow label="Class" value={selectedUser.studentOnboarding?.class || selectedUser.studentOnboarding?.classLevel || selectedUser.onboarding?.class || selectedUser.onboarding?.classLevel || "N/A"} />
                        <DetailRow label="Course Type" value={selectedUser.studentOnboarding?.courseType || selectedUser.onboarding?.courseType || "N/A"} />
                        <DetailRow label="Subjects" value={(selectedUser.studentOnboarding?.subjects || selectedUser.onboarding?.subjects || []).join(", ") || "N/A"} />
                      </div>
                    ) : selectedUser.role === "mentor" ? (
                      <div className="flex flex-col gap-1.5">
                        <DetailRow label="Syllabus" value={selectedUser.mentorOnboarding?.syllabus || "N/A"} />
                        <DetailRow label="Experience" value={selectedUser.mentorOnboarding?.experience || "N/A"} />
                        <DetailRow label="Classes handling" value={(selectedUser.mentorOnboarding?.classes || []).join(", ") || "N/A"} />
                        <DetailRow label="Subjects" value={(selectedUser.mentorOnboarding?.subjects || []).join(", ") || "N/A"} />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <Shield className="w-8 h-8 text-slate-300 mb-2" />
                        <p className="text-xs font-bold text-slate-500 italic">Administrative Account</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-3 rounded-b-2xl">
               <div className="w-full sm:w-auto">
                  {!isEditMode && (currentAdmin?.role === "super_admin" || selectedUser?.role !== "admin") && (
                     <button
                        onClick={handleBlockToggle}
                        disabled={processingBlock}
                        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[9px] uppercase tracking-widest font-black transition-colors disabled:opacity-50 border ${
                          selectedUser.isBlocked 
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100" 
                            : "bg-red-50 text-red-700 hover:bg-red-100 border-red-100"
                        }`}
                     >
                        {selectedUser.isBlocked ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                        {selectedUser.isBlocked ? "Unblock" : "Block"}
                     </button>
                  )}
               </div>
               
               <div className="flex gap-2 w-full sm:w-auto">
                 {isEditMode ? (
                   <>
                    <button 
                      onClick={() => setIsEditMode(false)}
                      className="flex-1 sm:flex-none px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveEdit}
                      className="flex-1 sm:flex-none px-6 py-2 bg-primary text-white hover:bg-primary/90 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-colors"
                    >
                      Save
                    </button>
                   </>
                 ) : (
                    (currentAdmin?.role === "super_admin" || selectedUser?.role !== "admin") && (
                      <button 
                        onClick={() => setIsEditMode(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/10 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    )
                 )}
               </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// ---------------- Helper Components ----------------

function UserCard({ user, isUnpaid, onClick }: { user: any, isUnpaid?: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-slate-100 group-hover:bg-primary/5 rounded-xl flex items-center justify-center transition-colors">
          <User className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className={`inline-flex items-center gap-1 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full border ${
            user.isBlocked ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
          }`}>
            {user.isBlocked ? "Blocked" : "Active"}
          </span>
          {isUnpaid && (
            <span className="inline-flex items-center gap-1 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
              <AlertCircle className="w-2.5 h-2.5" />
              Unpaid
            </span>
          )}
        </div>
      </div>
      
      <h3 className="text-lg font-black text-slate-800 group-hover:text-primary transition-colors tracking-tight">{user.name}</h3>
      <p className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-1.5 break-all">
        <Mail className="w-3.5 h-3.5" />
        {user.email}
      </p>
      
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {new Date(user.createdAt).toLocaleDateString()}</span>
        <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-black text-[10px] uppercase tracking-widest">
          View Profile &rarr;
        </span>
      </div>
    </div>
  );
}

function InfoTile({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow hover:border-indigo-200/50 transition-all duration-300 group">
      <div className="flex items-center gap-3 w-full">
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0">
          <div className="[&>svg]:w-4 [&>svg]:h-4">{icon}</div>
        </div>
        <div className="min-w-0 pr-2">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</div>
          <div className="text-xs font-bold text-slate-800 tracking-tight truncate">{value}</div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 py-2 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 gap-1.5 sm:gap-3">
      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest shrink-0">{label}</div>
      <div className="text-xs font-bold text-slate-800 bg-white px-2.5 py-1 rounded-md border border-slate-200/60 shadow-sm truncate">{value}</div>
    </div>
  );
}

function EditForm({ user, editForm, setEditForm }: { user: any, editForm: any, setEditForm: any }) {
  
  const isStudent = user.role === "student";
  const isAdmin = user.role === "admin";

  const [allSubjects, setAllSubjects] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  
  const currentSyllabus = isStudent 
    ? editForm.syllabus || user.studentOnboarding?.syllabus || user.onboarding?.syllabus
    : editForm.mentorOnboarding?.syllabus || user.mentorOnboarding?.syllabus;
    
  const currentClass = isStudent 
    ? editForm.class || user.studentOnboarding?.class || user.onboarding?.class || user.studentOnboarding?.classLevel || user.onboarding?.classLevel
    : "";

  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        setSelectedSubjects(user.studentOnboarding?.subjects || user.onboarding?.subjects || []);
      } else {
        setSelectedSubjects(user.mentorOnboarding?.subjects || []);
      }
    }
  }, [user]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (isStudent) {
          if (currentSyllabus && currentClass) {
            const res = await api.get(`/students/subjects?syllabus=${currentSyllabus}&classLevel=${currentClass}`);
            setAllSubjects(res.data.subjects || []);
          } else {
            setAllSubjects([]);
          }
        } else {
          // Mentor subjects
          if (currentSyllabus) {
            const res = await api.get(`/mentors/subjects?syllabus=${currentSyllabus}`);
            const fetched = res.data.subjects || res.data.data || [];
            const normalized = fetched.map((s: any) => typeof s === "string" ? s : s.name || s.title || s.subject);
            setAllSubjects(normalized);
          } else {
            setAllSubjects([]);
          }
        }
      } catch (err) {
        console.error("Failed to load subjects dynamically", err);
        setAllSubjects([]);
      }
    };
    fetchSubjects();
  }, [currentSyllabus, currentClass, isStudent]);

  const toggleClassLevel = (c: string) => {
    const currentClasses = editForm.mentorOnboarding?.classes || [];
    const newClasses = currentClasses.includes(c)
      ? currentClasses.filter((x: string) => x !== c)
      : [...currentClasses, c];
    
    setEditForm({
      ...editForm,
      mentorOnboarding: {
        ...(editForm.mentorOnboarding || {}),
        classes: newClasses
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const isSubjectReset = isStudent && (e.target.name === "class" || e.target.name === "syllabus");
    if (isSubjectReset) {
      setSelectedSubjects([]);
      setEditForm({ ...editForm, [e.target.name]: e.target.value, subjects: [] });
    } else {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  };

  const handleNestedChange = (field: string, subfield: string, val: string) => {
    setEditForm({
      ...editForm,
      [field]: {
        ...(editForm[field] || {}),
        [subfield]: val
      }
    });
  };

  const handleSubjectToggle = (subject: string) => {
    let newSubs = [...selectedSubjects];
    if (newSubs.includes(subject)) {
      newSubs = newSubs.filter(s => s !== subject);
    } else {
      newSubs.push(subject);
    }
    setSelectedSubjects(newSubs);
    setEditForm({ ...editForm, subjects: newSubs });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">Full Name</label>
          <input 
            type="text" 
            name="name" 
            value={editForm.name || ""} 
            onChange={handleChange}
            className="w-full bg-white border border-slate-300 px-4 py-3 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 flex items-center gap-1"><Lock className="w-3 h-3"/> Email (Read Only)</label>
          <input 
            type="email" 
            value={user.email} 
            disabled
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 cursor-not-allowed"
          />
        </div>
      </div>

      <hr className="border-slate-100 my-4" />

      {isStudent ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">Syllabus</label>
            <select 
              name="syllabus" 
              value={editForm.syllabus || editForm.onboarding?.syllabus || ""} 
              onChange={handleChange}
              className="w-full bg-white border border-slate-300 px-4 py-3 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
            >
              <option value="">Select</option>
              <option value="kerala">Kerala</option>
              <option value="cbse">CBSE</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">Class</label>
            <select 
              name="class" 
              value={editForm.class || editForm.studentOnboarding?.class || editForm.onboarding?.class || editForm.classLevel || editForm.onboarding?.classLevel || ""} 
              onChange={handleChange}
              className="w-full bg-white border border-slate-300 px-4 py-3 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
            >
              <option value="">Select Class</option>
              {["KG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((c) => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
          </div>
          <div>
             <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">Course Type</label>
            <select 
              name="courseType" 
              value={editForm.courseType || editForm.onboarding?.courseType || ""} 
              onChange={handleChange}
              className="w-full bg-white border border-slate-300 px-4 py-3 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
            >
              <option value="">Select</option>
              <option value="tuition">Tuition</option>
              <option value="foundation">Foundation</option>
            </select>
          </div>
          <div className="col-span-full">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">Subjects</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 max-h-48 overflow-y-auto custom-scrollbar">
              {!currentSyllabus || !currentClass ? (
                 <span className="text-xs font-bold text-slate-400 col-span-full text-center py-4">Select Syllabus and Class to load subjects</span>
              ) : allSubjects.length > 0 ? (
                 allSubjects.map((subName: string) => {
                  const isSelected = selectedSubjects.includes(subName);
                  return (
                    <label key={subName} className={`flex items-center gap-2.5 text-sm font-bold cursor-pointer p-3 rounded-xl border transition-all ${
                      isSelected ? "bg-white border-primary shadow-sm text-primary" : "bg-white border-transparent hover:border-slate-200 text-slate-700"
                    }`}>
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => handleSubjectToggle(subName)}
                        className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary/30"
                      />
                      <span className="truncate">{subName}</span>
                    </label>
                  )
                })
              ) : <span className="text-xs font-bold text-slate-400 col-span-full text-center py-4">No subjects found for this selection</span>}
            </div>
          </div>
        </div>
      ) : isAdmin ? (
        <div className="p-10 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
           <Shield className="w-12 h-12 mx-auto mb-3 text-slate-300" />
           <p className="font-[900] text-slate-800 text-lg">Admin Account</p>
           <p className="text-sm font-medium text-slate-500 mt-2 max-w-sm mx-auto">Only the full name is editable here. Other security settings are managed by the user in their settings panel.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">Syllabus</label>
            <select 
              value={editForm.mentorOnboarding?.syllabus || ""} 
              onChange={(e) => handleNestedChange("mentorOnboarding", "syllabus", e.target.value)}
              className="w-full bg-white border border-slate-300 px-4 py-3 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
            >
              <option value="">Select</option>
              <option value="kerala">Kerala</option>
              <option value="cbse">CBSE</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">Experience</label>
            <select 
              value={editForm.mentorOnboarding?.experience || ""} 
              onChange={(e) => handleNestedChange("mentorOnboarding", "experience", e.target.value)}
              className="w-full bg-white border border-slate-300 px-4 py-3 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
            >
               <option value="">Select</option>
               <option value="0-1 years">0-1 years</option>
               <option value="1-3 years">1-3 years</option>
               <option value="3-5 years">3-5 years</option>
               <option value="5+ years">5+ years</option>
            </select>
          </div>
          <div className="col-span-full">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">Select Classes</label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
              {["KG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((c) => {
                const isSelected = (editForm.mentorOnboarding?.classes || []).includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleClassLevel(c)}
                    className={`p-3 rounded-xl border font-bold text-xs transition-all ${
                      isSelected
                        ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="col-span-full">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">Subjects</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 max-h-48 overflow-y-auto custom-scrollbar">
              {allSubjects.map((subName: string) => {
                const isSelected = selectedSubjects.includes(subName);
                return (
                  <label key={subName} className={`flex items-center gap-2.5 text-sm font-bold cursor-pointer p-3 rounded-xl border transition-all ${
                    isSelected ? "bg-white border-primary shadow-sm text-primary" : "bg-white border-transparent hover:border-slate-200 text-slate-700"
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => handleSubjectToggle(subName)}
                      className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary/30"
                    />
                    <span className="truncate">{subName}</span>
                  </label>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------- Icons Placeholder ----------------
const UserCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
);
const Lock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
