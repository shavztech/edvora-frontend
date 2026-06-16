"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";
import { Lock, KeyRound, CheckCircle2, ArrowLeft, RefreshCw } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!otp || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await api.post("/auth/reset-password-otp", {
        email,
        otp: otp.trim(),
        newPassword: password,
      });

      alert("Password reset successful");
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP or request failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="text-center p-8 bg-white rounded-3xl shadow-xl">
        <h1 className="text-navy font-bold mb-4">Invalid Request</h1>
        <Link href="/auth/forgot-password" className="text-primary font-bold hover:underline">
          Go back to Forgot Password
        </Link>
      </div>
    );
  }

  return (
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
        <div className="bg-primary p-8 text-white relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-navy/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/20 rounded-full blur-xl" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl w-fit mb-2">
              <KeyRound size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Set New Password</h1>
            <p className="text-white/80 text-sm font-medium">We've sent a 6-digit code to <span className="text-white font-bold">{email}</span></p>
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
                Verification Code (OTP)
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                  <RefreshCw size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-bold tracking-[0.2em] placeholder:tracking-normal placeholder:font-medium placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-bold text-navy/70 ml-1 group-focus-within:text-primary transition-colors">
                New Secure Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium placeholder:text-gray-300"
                />
              </div>
            </div>

            <button
              onClick={submit}
              disabled={loading}
              className="w-full py-4 bg-navy hover:bg-primary disabled:bg-gray-300 text-white font-bold rounded-2xl shadow-lg shadow-navy/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Updating Password...</span>
                </div>
              ) : (
                <>
                  <span>Reset Password</span>
                  <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </div>

          <div className="pt-4 border-t border-gray-100 text-center">
            <Link
              href="/auth/forgot-password"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-navy transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Resend Code
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
