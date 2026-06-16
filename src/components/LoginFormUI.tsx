import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, LogIn, ChevronRight, Eye, EyeOff, Sparkles, ShieldCheck } from "lucide-react";

interface LoginFormUIProps {
    email: string;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    password: string;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    error?: string;
}

export default function LoginFormUI({
    email,
    onEmailChange,
    password,
    onPasswordChange,
    onSubmit,
    error,
}: LoginFormUIProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4 selection:bg-indigo-500 selection:text-white">

            {/* 🌌 DYNAMIC BACKGROUND ORBS */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse pointer-events-none delay-700" />
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-slate-400/5 rounded-full blur-[100px] pointer-events-none" />

            {/* 💎 GLASS CARD CONTAINER */}
            <div className="w-full max-w-[960px] grid grid-cols-1 lg:grid-cols-12 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.6)] overflow-hidden relative z-10 animate-fade-in group mx-4 h-fit">

                {/* 🎨 LEFT BRANDING SIDE (HIDDEN ON MOBILE) */}
                <div className="hidden lg:flex lg:col-span-5 relative overflow-hidden bg-slate-950 p-12 xl:p-14 flex-col justify-between border-r border-white/5">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.2),transparent_70%)]" />

                    <div className="relative z-10 space-y-10">
                        <Image
                          src="/edvora.png"
                          alt="Edvora Logo"
                          width={160}
                          height={48}
                          className="object-contain"
                          priority
                        />

                        <div className="space-y-5">
                            <h2 className="text-5xl font-[900] text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
                                Elevate <br />Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400 italic">Vision.</span>
                            </h2>
                            <p className="text-slate-500 font-bold text-base leading-relaxed max-w-[240px]">
                                Experience the future of educational management.
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 space-y-3">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[9px] font-black text-white">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-[9px] font-black text-white">
                                +2k
                            </div>
                        </div>
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Joined by 2000+ top educators</p>
                    </div>
                </div>

                {/* 📝 LOGIN FORM SIDE */}
                <div className="lg:col-span-7 p-7 md:p-12 lg:p-16 flex flex-col justify-between relative min-h-[600px] lg:min-h-0">

                    <div className="lg:hidden flex justify-between items-center py-4">
                        <Image
                          src="/edvora.png"
                          alt="Edvora Logo"
                          width={120}
                          height={36}
                          className="object-contain"
                          priority
                        />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Console</span>
                    </div>

                    <div className="space-y-8 max-w-[380px] mx-auto w-full py-8 lg:py-0">

                        <div className="space-y-3 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                                <Sparkles className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Authentication Secure</span>
                            </div>
                            <h1 className="text-3xl font-[900] text-white tracking-tighter leading-none">Console Login</h1>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-tight">Enter credentials to proceed</p>
                        </div>

                        <div className="space-y-6">
                            {error && (
                                <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-center gap-3 animate-shake">
                                    <div className="w-8 h-8 bg-rose-500/20 rounded-xl flex items-center justify-center">
                                        <ShieldCheck className="w-4 h-4 text-rose-500" />
                                    </div>
                                    <p className="text-[10px] text-rose-500 font-black uppercase tracking-tight leading-none">{error}</p>
                                </div>
                            )}

                            <div className="space-y-4">
                                <InputGroup
                                    label="Access Identity"
                                    icon={<Mail />}
                                    type="email"
                                    placeholder="[EMAIL_ADDRESS]"
                                    value={email}
                                    onChange={onEmailChange}
                                />

                                <div className="space-y-2 group">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>

                                    </div>

                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                                            <Lock size={16} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={onPasswordChange}
                                            className="w-full pl-11 pr-11 h-14 bg-white/[0.03] border border-white/5 rounded-2xl focus:bg-white/[0.08] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none font-bold text-white text-sm placeholder:text-slate-600"
                                        />
                                        <Link href="/auth/forgot-password" className="text-[9px] font-black text-indigo-500 hover:text-indigo-400 uppercase tracking-widest transition-colors flex items-center gap-2">
                                            Forgot Password? <ChevronRight className="w-3 h-3" />
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onSubmit}
                                className="w-full h-14 bg-white text-slate-950 font-[900] text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] hover:shadow-white/40 hover:-translate-y-1 transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                            >
                                <span className="z-10 flex items-center gap-3 tracking-[0.2em]">
                                    Login <LogIn size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                <span className="absolute z-20 group-hover/btn:text-white transition-colors flex items-center gap-3 opacity-0 group-hover/btn:opacity-100 duration-300 tracking-[0.2em]">
                                    Login <LogIn size={16} />
                                </span>
                            </button>
                        </div>


                    </div>

                    {/* FOOTER */}
                    <div className="py-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[8px] font-black text-slate-700 uppercase tracking-[.3em]">
                            <span>&copy;EDVORA LMS</span>
                            <div className="flex gap-6">
                                <span className="hover:text-slate-400 cursor-pointer transition-colors">Security</span>
                                <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* 🌀 BACKGROUND DECORATIVE LINES */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white transform rotate-[-5deg]" />
                <div className="absolute top-2/3 left-0 w-full h-[1px] bg-white transform rotate-[3deg]" />
            </div>
        </div>
    );
}

function InputGroup({ label, icon, type, placeholder, value, onChange }: any) {
    return (
        <div className="space-y-2 group">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-400 leading-none">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors [&>svg]:w-4 [&>svg]:h-4">
                    {icon}
                </div>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full pl-11 pr-4 h-14 bg-white/[0.03] border border-white/5 rounded-2xl focus:bg-white/[0.08] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none font-bold text-white text-sm placeholder:text-slate-600"
                />
            </div>
        </div>
    );
}
