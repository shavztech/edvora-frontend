"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Loader from "@/components/Loader";
import { User, Mail, Calendar, AlertOctagon, Sparkles, Search, XCircle, X, CheckCircle2, AlertCircle, BookOpen, ShieldAlert } from "lucide-react";
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

export default function AdminUnpaidPage() {
  const [unpaidStudents, setUnpaidStudents] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const fetchData = async () => {
    try {
      const [usrRes, payRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/payments")
      ]);
      
      const users = usrRes.data.users || [];
      const allPayments = payRes.data.payments || [];
      setPayments(allPayments);
      
      const unpaid = users.filter((u: any) => u.role === "student" && isStudentUnpaid(u, allPayments));
      setUnpaidStudents(unpaid);
    } catch (err) {
      console.error("Failed to load unpaid ledger", err);
      toast.error("Failed to load unpaid ledger");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async (userId: string, currentStatus: boolean) => {
    try {
      await api.patch(`/admin/users/${userId}/block`);
      toast.success(currentStatus ? "User unblocked successfully" : "User blocked successfully");
      
      // Update local state for unpaidStudents and selectedUser
      setUnpaidStudents(prev => prev.map(u => u._id === userId ? { ...u, isBlocked: !currentStatus } : u));
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser({ ...selectedUser, isBlocked: !currentStatus });
      }
    } catch (err) {
      toast.error("Failed to update block status");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredUnpaid = unpaidStudents.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto py-8 px-4 sm:px-0 animate-fade-in relative">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="max-w-xl">
           <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full border border-rose-100/50 mb-4 animate-bounce-subtle shrink-0">
             <AlertOctagon className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase tracking-widest">Fee Ledger Update</span>
           </div>
           <h1 className="text-4xl font-black text-slate-800 tracking-tighter leading-tight">
             Unpaid <span className="text-rose-600">Accounts</span>
           </h1>
           <p className="text-slate-500 mt-2 font-medium leading-relaxed">
             Real-time monitoring of students who have not cleared their dues for the current billing cycle. 
             Based on individual joining dates.
           </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
           <div className="relative group w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
              <input 
                 type="text"
                 placeholder="Search unpaid students..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold shadow-sm focus:ring-4 focus:ring-rose-500/5 focus:border-rose-400 outline-none transition-all"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-rose-500">
                   <XCircle className="w-4 h-4" />
                </button>
              )}
           </div>
           <div className="bg-white shadow-sm border border-slate-200 px-6 py-3.5 rounded-2xl flex items-center gap-3 shrink-0">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-sm font-black text-slate-800 tracking-tight">{filteredUnpaid.length} Pending</span>
           </div>
        </div>
      </div>

      {/* Main Grid */}
      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
           <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnpaid.length === 0 ? (
            <div className="col-span-full py-24 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200 flex flex-col items-center justify-center animate-fade-up">
              <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/10">
                <Sparkles className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Ledger Is Clear</h3>
              <p className="text-slate-500 max-w-sm mt-2 font-medium">Excellent work! No students are currently flagged for unpaid fees in this billing cycle.</p>
            </div>
          ) : (
            filteredUnpaid.map((user) => (
              <UnpaidCard 
                key={user._id} 
                user={user} 
                onClick={() => setSelectedUser(user)}
                onBlock={handleToggleBlock}
              />
            ))
          )}
        </div>
      )}

      {/* Detail Modal Overlay */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-fade-in shadow-2xl">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg border border-slate-200/50 flex flex-col scale-in-center overflow-hidden">
            <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-50">
               <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 sm:w-7 sm:h-7 text-rose-500" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight truncate">{selectedUser.name}</h2>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                       <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 border border-rose-200 uppercase tracking-widest flex items-center gap-1">
                          Unpaid
                       </span>
                       <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-widest">
                          {selectedUser.role}
                       </span>
                    </div>
                  </div>
               </div>
               <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-slate-50 rounded-2xl transition-all shrink-0">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
               </button>
            </div>

            <div className="p-5 sm:p-8 space-y-4">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <InfoPill icon={<Mail />} label="Email" value={selectedUser.email} />
                  <InfoPill icon={<Calendar />} label="Joined" value={new Date(selectedUser.createdAt).toLocaleDateString()} />
               </div>
               
               <div className="bg-slate-50/50 rounded-3xl p-5 sm:p-6 border border-slate-100 space-y-2 sm:space-y-3">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                    <BookOpen className="w-3 h-3" /> Academic Summary
                  </h3>
                  <DetailLine label="Syllabus" value={selectedUser.onboarding?.syllabus || selectedUser.syllabus || "N/A"} />
                  <DetailLine label="Class" value={selectedUser.studentOnboarding?.class || selectedUser.onboarding?.class || "N/A"} />
                  <DetailLine label="Cycle" value={calculateMissedMonth(selectedUser)} />
               </div>
            </div>

            <div className="p-4 sm:p-6 pt-0 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-end gap-3">
               <button 
                  onClick={() => handleToggleBlock(selectedUser._id, selectedUser.isBlocked)}
                  className={`flex-1 sm:flex-none px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
                    ${selectedUser.isBlocked 
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100" 
                      : "bg-rose-100 text-rose-600 border border-rose-200 hover:bg-rose-200"
                    }
                  `}
               >
                 {selectedUser.isBlocked ? "Unblock Account" : "Restrict Account"}
               </button>
               <button 
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 sm:flex-none px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
               >
                 Close Detail
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------- Helper Logic ----------------

const calculateMissedMonth = (user: any) => {
  const joinedAt = new Date(user.createdAt);
  const joiningDay = joinedAt.getDate();
  const now = new Date();
  let lastDueDate = new Date(now.getFullYear(), now.getMonth(), joiningDay);
  if (now < lastDueDate) lastDueDate.setMonth(lastDueDate.getMonth() - 1);
  if (lastDueDate < joinedAt) lastDueDate = joinedAt;
  return lastDueDate.toLocaleString("en-IN", { month: "short", year: "numeric" });
};

function UnpaidCard({ user, onClick, onBlock }: { user: any, onClick: () => void, onBlock: (id: string, status: boolean) => void }) {
  const joinedAt = new Date(user.createdAt);
  const joiningDay = joinedAt.getDate();
  const now = new Date();
  let lastDueDate = new Date(now.getFullYear(), now.getMonth(), joiningDay);
  if (now < lastDueDate) lastDueDate.setMonth(lastDueDate.getMonth() - 1);
  if (lastDueDate < joinedAt) lastDueDate = joinedAt;

  return (
    <div 
       onClick={onClick}
       className={`bg-white border ${user.isBlocked ? 'border-rose-400 bg-rose-50/10' : 'border-slate-200/50'} rounded-[2.25rem] p-7 hover:shadow-2xl hover:shadow-rose-100 hover:border-rose-300 transition-all duration-500 cursor-pointer group relative overflow-hidden flex flex-col h-full`}
    >
      {/* Glow Effect */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 ${user.isBlocked ? 'bg-rose-200/20' : 'bg-rose-50'} rounded-full blur-[80px] group-hover:bg-rose-100 transition-colors duration-500`} />
      
      <div className="flex items-start justify-between mb-6 relative">
        <div className="w-14 h-14 bg-slate-50 group-hover:bg-rose-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:border-rose-100 transition-colors duration-500">
          <User className="w-6 h-6 text-slate-400 group-hover:text-rose-500 transition-colors" />
        </div>
        <div className="flex flex-col items-end gap-2">
           <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
             <AlertOctagon className="w-3.5 h-3.5" /> Unpaid
           </span>
           {user.isBlocked && (
             <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-rose-200">
               <ShieldAlert className="w-3 h-3" /> Blocked
             </span>
           )}
        </div>
      </div>
      
      <div className="relative">
        <h3 className="text-xl font-black text-slate-800 tracking-tight mb-1 truncate group-hover:text-rose-600 transition-colors">{user.name}</h3>
        <p className="text-xs font-bold text-slate-400 flex items-center gap-2 mb-8 truncate">
           <Mail className="w-3.5 h-3.5" /> {user.email}
        </p>
      </div>

      <div className="relative mb-6">
         <button 
           onClick={(e) => {
             e.stopPropagation();
             onBlock(user._id, user.isBlocked);
           }}
           className={`w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm
             ${user.isBlocked 
               ? "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100" 
               : "bg-rose-600 text-white hover:bg-rose-700 shadow-rose-200"
             }
           `}
         >
           <ShieldAlert className="w-4 h-4" />
           {user.isBlocked ? "Revoke Block" : "Block Identity"}
         </button>
      </div>
      
      <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-slate-50 relative">
        <div className="p-3 bg-slate-50 rounded-2xl border border-transparent group-hover:bg-white group-hover:border-slate-100 transition-all">
           <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Cycle Day</span>
           <span className="text-sm font-black text-slate-800 tracking-tighter">{joiningDay} of every month</span>
        </div>
        <div className="p-3 bg-rose-50/50 rounded-2xl border border-transparent group-hover:bg-white group-hover:border-rose-100 transition-all">
           <span className="block text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1">Last Due</span>
           <span className="text-sm font-black text-rose-700 tracking-tighter">{lastDueDate.toLocaleString("en-IN", { month: 'short' })} {lastDueDate.getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}

function InfoPill({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
       <div className="text-slate-300 [&>svg]:w-4 [&>svg]:h-4">{icon}</div>
       <div className="min-w-0">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</div>
          <div className="text-xs font-bold text-slate-800 truncate">{value}</div>
       </div>
    </div>
  );
}

function DetailLine({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">{label}</span>
       <span className="text-xs font-black text-slate-800 bg-white px-3 py-1.5 rounded-xl border border-slate-200/60 shadow-sm truncate">{value}</span>
    </div>
  );
}
