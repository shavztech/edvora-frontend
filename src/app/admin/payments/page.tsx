"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import {
  Loader2,
  IndianRupee,
  User,
  Mail,
  Calendar,
  CreditCard,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Clock,
  ExternalLink,
  Wallet,
  Filter,
  Sparkles
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminPaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  // Filters
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterMethod, setFilterMethod] = useState("");

  const loadPayments = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filterStatus) params.status = filterStatus;
      if (filterDate) params.date = filterDate;
      if (filterMethod) params.method = filterMethod;

      const res = await api.get("/payments", { params });
      setPayments(res.data.payments || []);
    } catch (error) {
      toast.error("Failed to load payment records");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id: string) => {
    setActionId(id);
    try {
      await api.patch(`/payments/${id}/approve`);
      toast.success("Payment approved successfully");
      loadPayments();
    } catch (error) {
      toast.error("Failed to approve payment");
    } finally {
      setActionId(null);
    }
  };

  const reject = async (id: string) => {
    setActionId(id);
    try {
      await api.patch(`/payments/${id}/reject`);
      toast.success("Payment rejected");
      loadPayments();
    } catch (error) {
      toast.error("Failed to reject payment");
    } finally {
      setActionId(null);
    }
  };

  // Toast-based confirmation dialogs
  const confirmApprove = (id: string, studentName: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 min-w-[260px]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <p className="text-sm font-bold text-slate-800">Approve Payment?</p>
          </div>
          <p className="text-xs text-slate-500">
            This will mark <span className="font-bold text-slate-700">{studentName}'s</span> payment as paid.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => { toast.dismiss(t.id); approve(id); }}
              className="flex-1 py-2 bg-emerald-600 text-white text-xs font-black rounded-xl uppercase tracking-widest hover:bg-emerald-700 transition-colors"
            >
              Confirm
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

  const confirmReject = (id: string, studentName: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 min-w-[260px]">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
            <p className="text-sm font-bold text-slate-800">Reject Payment?</p>
          </div>
          <p className="text-xs text-slate-500">
            This will flag <span className="font-bold text-slate-700">{studentName}'s</span> payment as rejected.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => { toast.dismiss(t.id); reject(id); }}
              className="flex-1 py-2 bg-rose-600 text-white text-xs font-black rounded-xl uppercase tracking-widest hover:bg-rose-700 transition-colors"
            >
              Reject
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

  const resetFilters = () => {
    setFilterStatus("");
    setFilterDate("");
    setFilterMethod("");
  };
useEffect(() => {
  loadPayments();

  api.put("/notifications/read/payment").then(() => {
    window.dispatchEvent(new Event("refresh-notifications"));
  });

  const interval = setInterval(() => {
    loadPayments();
  }, 10000);

  return () => clearInterval(interval);
}, [filterStatus, filterDate, filterMethod]);
  const StatusBadge = ({ status }: { status: string }) => {
    const s = status.toLowerCase();
    const styles: Record<string, string> = {
      paid: "bg-emerald-50 text-emerald-700 border-emerald-100",
      rejected: "bg-rose-50 text-rose-700 border-rose-100",
      pending: "bg-amber-50 text-amber-700 border-amber-100",
    };
    const icons: Record<string, React.ReactNode> = {
      paid: <CheckCircle className="w-3 h-3" />,
      rejected: <XCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${styles[s] || styles.pending}`}>
        {icons[s] || icons.pending}
        {status}
      </span>
    );
  };
const groupedPayments: Record<string, any[]> = payments.reduce(
  (acc: Record<string, any[]>, payment: any) => {

    const month =
      payment.month ||
      (payment.createdAt
        ? new Date(payment.createdAt).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })
        : "Unknown Month");

    if (!acc[month]) {
      acc[month] = [];
    }

    acc[month].push(payment);

    return acc;
  },
  {}
);
  if (loading && payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-70" />
        <p className="text-slate-400 font-[900] text-[10px] uppercase tracking-widest">Processing ledger...</p>
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
            <h1 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter">Payment Oversight</h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Verify and manage student fee submissions.</p>
          </div>
          {/* STATS */}
          <div className="flex gap-3 flex-shrink-0">
            <div className="bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total</span>
              <span className="text-xl font-[900] text-slate-800">{payments.length}</span>
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm flex flex-col">
              <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Pending</span>
              <span className="text-xl font-[900] text-amber-600">{payments.filter(p => p.status === 'pending').length}</span>
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm flex flex-col">
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Paid</span>
              <span className="text-xl font-[900] text-emerald-600">{payments.filter(p => p.status === 'paid').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ FILTERS ══ */}
      <div className="bg-white p-4 sm:p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
          <Filter className="w-3.5 h-3.5" />
          Filter Records
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-xl text-xs font-bold focus:bg-white focus:border-primary outline-none transition-all"
            >
              <option value="">All Transactions</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Method</label>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-xl text-xs font-bold focus:bg-white focus:border-primary outline-none transition-all"
            >
              <option value="">All Methods</option>
              <option value="upi">UPI / Digital</option>
              <option value="cash">Cash Payment</option>
              <option value="bank">Bank Transfer</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-xl text-xs font-bold focus:bg-white focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full h-[40px] bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* ══ PAYMENT CARDS ══ */}
      {payments.length === 0 ? (
        <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-dashed border-slate-200 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-slate-800">No Transactions</h3>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">The payment ledger is currently empty. No transactions have been logged yet.</p>
        </div>
      ) : (
      <div className="space-y-10">

{Object.entries(groupedPayments).map(
([month, monthPayments]) => (

<div key={month}>

<div className="flex items-center justify-between mb-5">

<h2 className="text-xl font-black text-slate-800">
💰 {month}
</h2>

<span className="px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-black">
Total {monthPayments.length} Payments
</span>

</div>


<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">


{monthPayments.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col"
            >
              {/* Card Header */}
              <div className="p-5 flex items-start justify-between border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
                    {p.student?.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                  <p
  onClick={() => router.push(`/admin/users/${p.student?._id}`)}
  className="text-sm font-black text-blue-600 tracking-tight cursor-pointer hover:underline"
>
  {p.student?.name || "Unknown"}
</p>
                    <p className="text-[10px] text-slate-400 font-medium break-all">{p.student?.email}</p>
                  </div>
                </div>
                <StatusBadge status={p.status} />
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col gap-4 flex-1">
                {/* Amount & Method */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <IndianRupee className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-2xl font-[900] text-slate-800 tracking-tighter">₹{p.amount}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <CreditCard className="w-3 h-3" />
                      {p.method || "—"}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Calendar className="w-3 h-3" />
                      {p.month || "—"}
                    </div>
                  </div>
                </div>

                {/* Proof of Payment */}
                {p.proof ? (
                  <button
                    onClick={() => setPreview(`${p.proof.url}`)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100/50 hover:bg-blue-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Payment Slip
                  </button>
                ) : (
                  <div className="w-full py-2.5 bg-slate-50 text-slate-400 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest border border-slate-100">
                    No Slip Attached
                  </div>
                )}

                {/* Actions */}
                {p.status === "pending" ? (
                  <div className="flex gap-2 mt-auto pt-2 border-t border-slate-50">
                    <button
                      onClick={() => confirmApprove(p._id, p.student?.name || "Student")}
                      disabled={actionId === p._id}
                      className="flex-1 py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-2xl border border-emerald-100 font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {actionId === p._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                      Approve
                    </button>
                    <button
                      onClick={() => confirmReject(p._id, p.student?.name || "Student")}
                      disabled={actionId === p._id}
                      className="flex-1 py-3 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white rounded-2xl border border-rose-100 font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {actionId === p._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="mt-auto pt-2 border-t border-slate-50 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    — Processed —
                  </div>
                )}
                           </div>
            </div>
          ))}

        </div>

      </div>

    ))}

</div>
      )}

      

      {/* ══ IMAGE PREVIEW MODAL ══ */}
      {preview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setPreview(null)}
          />
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl shadow-black/20 max-w-4xl w-full max-h-full overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-800 tracking-tight">Proof of Payment</h3>
              </div>
              <button
                onClick={() => setPreview(null)}
                className="p-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-100/30 flex items-center justify-center min-h-[300px]">
              <img
                src={preview}
                alt="Payment Slip"
                className="max-w-full h-auto rounded-2xl shadow-lg border border-white"
              />
            </div>

            <div className="p-5 bg-white border-t border-slate-50 flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click outside to close</p>
              <a
                href={preview}
                target="_blank"
                className="flex items-center gap-2 text-primary font-black text-xs hover:underline uppercase tracking-widest"
              >
                Open Full Size
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
