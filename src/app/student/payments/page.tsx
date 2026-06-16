"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  IndianRupee,
  Calendar,
  CreditCard,
  Upload,
  Loader2,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Receipt,
  Sparkles,
  Banknote
} from "lucide-react";
import toast from "react-hot-toast";

const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const YEARS = ["2024", "2025", "2026", "2027", "2028"];

export default function StudentPaymentPage() {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [method, setMethod] = useState("upi");
  const [file, setFile] = useState<File | null>(null);

  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Filters
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  /* ================= LOAD PAYMENTS ================= */
  const loadPayments = async () => {
    try {
      const res = await api.get("/payments");
      setPayments(res.data.payments || []);
    } catch {
      toast.error("Failed to load payment history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  /* ================= SUBMIT PAYMENT ================= */
  const submit = async () => {
    if (!amount || !month || !file) {
      toast.error("All fields are required");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    const formattedMonth = new Date(month + "-01").toLocaleString("en-IN", {
      month: "short",
      year: "numeric",
    });

    setSubmitting(true);

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("month", formattedMonth);
    formData.append("method", method);
    formData.append("proof", file);

    try {
      await api.post("/payments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Payment submitted successfully");
      setAmount("");
      setMonth("");
      setMethod("upi");
      setFile(null);

      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      loadPayments();
    } catch {
      toast.error("Failed to submit payment");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= STATUS BADGE ================= */
  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      paid: "bg-emerald-50 text-emerald-600 border-emerald-200/50",
      rejected: "bg-red-50 text-red-600 border-red-200/50",
      pending: "bg-amber-50 text-amber-600 border-amber-200/50",
    };

    const icons = {
      paid: <CheckCircle className="w-3.5 h-3.5" />,
      rejected: <XCircle className="w-3.5 h-3.5" />,
      pending: <Clock className="w-3.5 h-3.5" />,
    };

    const s = status?.toLowerCase() as keyof typeof styles;

    return (
      <span
        className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border w-fit ${
          styles[s] || styles.pending
        }`}
      >
        {icons[s] || icons.pending}
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest animate-pulse">Loading Ledger...</p>
      </div>
    );
  }

  const filteredPayments = payments.filter((p) => {
    let match = true;
    if (filterMonth && p.month && !p.month.toLowerCase().includes(filterMonth.toLowerCase())) match = false;
    if (filterYear && p.month && !p.month.includes(filterYear)) match = false;
    return match;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 animate-fade-in overflow-hidden">
      
      {/* HEADER */}
      <div className="text-center md:text-left space-y-3 pb-2 border-b border-gray-100 w-fit max-w-full">
        <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-[9px] uppercase tracking-widest bg-indigo-50 px-3.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3" />
          Financial Hub
        </div>
        <h1 className="text-3xl md:text-4xl font-[900] text-gray-900 tracking-tighter">
          Payment Tracker
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Manage your tuition subscriptions and keep track of your transactions.
        </p>
      </div>

      <div className="grid gap-6 lg:gap-10 lg:grid-cols-12 flex-col-reverse lg:flex-row items-start">
        
        {/* ================= FORM ================= */}
        <div className="lg:col-span-4 h-fit lg:sticky lg:top-4 z-10 w-full order-2 lg:order-1">
          <div className="bg-white p-4 sm:p-6 rounded-[24px] shadow-xl shadow-gray-200/40 border border-gray-100">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-50">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-[900] text-gray-900 tracking-tight">New Payment</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Submit Receipt</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Amount Paid (<IndianRupee className="w-2.5 h-2.5 inline -translate-y-[1px]"/>)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IndianRupee className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    className="w-full bg-gray-50/50 border border-gray-100 pl-10 pr-4 py-3 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">For Month</label>
                <input
                  className="w-full bg-gray-50/50 border border-gray-100 px-4 py-3.5 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  type="month"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Payment Method</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                  </div>
                  <select
                    className="w-full bg-gray-50/50 border border-gray-100 pl-10 pr-4 py-3 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all appearance-none cursor-pointer"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                  >
                    <option value="upi">UPI Transfer</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="cheque">Cheque</option>
                    <option value="cash">Cash Handover</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 min-w-0">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Upload Proof</label>
                <div className="relative overflow-hidden w-full rounded-xl border border-gray-100 bg-gray-50/50 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="block w-full max-w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:border-0 file:text-xs file:font-black file:uppercase file:tracking-wider file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 hover:file:cursor-pointer outline-none cursor-pointer"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <button
                onClick={submit}
                disabled={submitting}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-black text-sm uppercase tracking-wider shadow-xl shadow-gray-200 hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Payment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ================= HISTORY ================= */}
        <div className="lg:col-span-8 order-1 lg:order-2 w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-100">
            <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
              <h2 className="text-xl font-[900] text-gray-900 tracking-tight leading-tight">Transaction Ledger</h2>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 whitespace-nowrap shrink-0">
                {filteredPayments.length} Records
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:flex items-center gap-3 sm:gap-2 w-full sm:w-auto">
              <select 
                className="w-full sm:w-auto bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none cursor-pointer appearance-none"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              >
                <option value="">All Months</option>
                {SHORT_MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>

              <select 
                className="w-full sm:w-auto bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none cursor-pointer appearance-none"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              >
                <option value="">All Years</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {filteredPayments.length === 0 ? (
            <div className="bg-white p-12 sm:p-20 rounded-[32px] text-center border-2 border-dashed border-gray-100 flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-[24px] flex items-center justify-center shadow-inner">
                <Receipt className="w-10 h-10 text-gray-300" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-800">No Transactions Found</h3>
                <p className="text-sm font-medium text-gray-400 mt-1 max-w-sm mx-auto">Your payment history will appear here once you submit your first receipt.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPayments.map((p) => (
                <div 
                  key={p._id} 
                  className="group bg-white p-4 sm:p-5.5 rounded-[22px] border border-gray-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6"
                >
                  <div className="flex items-start sm:items-center gap-5 min-w-0">
                    <div className="w-14 h-14 bg-gray-50 group-hover:bg-indigo-50/50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:border-indigo-100/50 transition-colors shrink-0">
                      <Banknote className="w-6 h-6 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <div className="min-w-0">
                       <h3 className="text-lg font-[900] text-gray-900 tracking-tight truncate">
                         {p.month} Tuition
                       </h3>
                       <div className="flex flex-wrap items-center gap-3 mt-1.5">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                           <CreditCard className="w-3 h-3" />
                           {p.method}
                         </span>
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-row-reverse sm:flex-col items-center sm:items-end justify-between gap-4 sm:gap-2 shrink-0 pt-4 sm:pt-0 border-t border-gray-50 sm:border-none">
                     <div className="text-right">
                       <p className="text-xl font-[900] text-gray-900 tracking-tight leading-none">
                         ₹{p.amount.toLocaleString("en-IN")}
                       </p>
                     </div>
                     <div className="flex items-center gap-3 w-full sm:w-auto">
                        <StatusBadge status={p.status} />
                        <a
                          href={p.proof.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-50 hover:bg-indigo-50 p-2 rounded-xl text-gray-400 hover:text-indigo-600 transition-colors shrink-0 ml-auto"
                          title="View Proof"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
