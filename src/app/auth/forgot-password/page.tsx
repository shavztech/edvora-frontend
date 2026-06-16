"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import { Mail, ArrowLeft, SendHorizontal, ShieldQuestion } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await api.post("/auth/forgot-password", { email });
      router.push(`/auth/reset-password?email=${email}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-[440px] animate-fade-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/edvora.png"
            alt="Edvora Logo"
            width={140}
            height={46}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-navy/5 overflow-hidden border border-gray-100">
          <div className="bg-navy p-8 text-white relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/20 rounded-full blur-xl" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl w-fit mb-2">
                <ShieldQuestion size={32} className="text-secondary" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">Forgot Password?</h1>
              <p className="text-white/70 text-sm font-medium">No worries! Enter your email and we'll send you an OTP to reset your password.</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center gap-3 animate-shake">
                <p className="text-xs text-red-600 font-bold">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2 group">
                <label className="text-xs font-bold text-navy/70 ml-1 group-focus-within:text-primary transition-colors">
                  Registered Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium placeholder:text-gray-300"
                  />
                </div>
              </div>

              <button
                onClick={submit}
                disabled={loading}
                className="w-full py-4 bg-primary hover:bg-navy disabled:bg-gray-300 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  <>
                    <span>Send Recovery OTP</span>
                    <SendHorizontal size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-navy transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Return to Login
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-[.2em]">
          &copy; 2026 EDVORA LMS. SECURE ACCESS.
        </p>
      </div>
    </div>
  );
}
