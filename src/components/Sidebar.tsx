"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import {
  X,
  LogOut,
  LayoutDashboard,
  UserCircle,
  Settings,
  BookOpen,
  Calendar,
  Users,
  ShieldCheck,
  CreditCard,
  FileText,
  ClipboardCheck,
  AlertOctagon
} from "lucide-react";
import toast from "react-hot-toast";

type Role = "super_admin" | "admin" | "student" | "mentor";

export default function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, close } = useSidebar();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    close();
  }, [pathname, close]);

  const logout = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-bold text-slate-800">Are you sure you want to log out?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              localStorage.clear();
              toast.dismiss(t.id);
              window.location.href = "/auth/login";
            }}
            className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: "top-center",
    });
  };

  const menuIcons: Record<string, any> = {
    "Dashboard": LayoutDashboard,
    "onboarding": UserCircle,
    "slot": Calendar,
    "Slots": Calendar,
    "Payments": CreditCard,
    "reports": FileText,
    "Reports": FileText,
    "Settings": Settings,
    "Create User": ShieldCheck,
    "Students": Users,
    "Subjects": BookOpen,
    "My Bookings": Calendar,
    "Bookings": Calendar,
    "Users": Users,
    "Unpaid": AlertOctagon,
    "My Attendance": ClipboardCheck,
    "Attendance": ClipboardCheck,
  };

  const menus: Record<Role, { label: string; href: string }[]> = {
    super_admin: [
      { label: "Dashboard", href: "/admin/dashboard" },
      { label: "Users", href: "/admin/users" },
      { label: "Unpaid", href: "/admin/unpaid" },
      { label: "Slots", href: "/admin/slots" },
      { label: "Bookings", href: "/admin/bookings" },
      { label: "Attendance", href: "/admin/attendance" },
      { label: "Payments", href: "/admin/payments" },
      { label: "Reports", href: "/admin/reports" },
      { label: "Demo Requests", href: "/admin/demo-requests" },
      { label: "Create User", href: "/admin/create-user" },
      { label: "Settings", href: "/admin/settings" },
    ],
    admin: [
      { label: "Dashboard", href: "/admin/dashboard" },
      { label: "Users", href: "/admin/users" },
      { label: "Unpaid", href: "/admin/unpaid" },
      { label: "Slots", href: "/admin/slots" },
      { label: "Bookings", href: "/admin/bookings" },
      { label: "Attendance", href: "/admin/attendance" },
      { label: "Payments", href: "/admin/payments" },
      { label: "Reports", href: "/admin/reports" },
      { label: "Demo Requests", href: "/admin/demo-requests" },
      { label: "Settings", href: "/admin/settings" },
    ],
    student: [
      { label: "Dashboard", href: "/student/dashboard" },
      { label: "onboarding", href: "/student/onboarding" },
      { label: "Slots", href: "/student/slot" },
      { label: "My Bookings", href: "/student/bookings" },
      { label: "My Attendance", href: "/student/attendance" },
      { label: "Payments", href: "/student/payments" },
      { label: "reports", href: "/student/reports" },
      { label: "Settings", href: "/student/settings" },
    ],
    mentor: [
      { label: "Dashboard", href: "/mentor/dashboard" },
      { label: "Onboarding", href: "/mentor/onboarding" },
      { label: "Slots", href: "/mentor/slots" },
      { label: "Bookings", href: "/mentor/bookings" },
      { label: "My Attendance", href: "/mentor/attendance" },
      { label: "Reports", href: "/mentor/reports" },
      { label: "Settings", href: "/mentor/settings" },
    ],
  };

  return (
    <>
      {/* 🌑 MOBILE BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden transition-opacity duration-300"
          onClick={close}
        />
      )}

      {/* 🚀 SIDEBAR CONTAINER */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-0 z-[80] lg:z-10 w-64 bg-slate-950 text-slate-300 h-screen lg:h-screen px-6 py-4 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-800/20 shadow-2xl
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* LOGO AREA */}
        <div className="flex items-center justify-between mb-3">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/edvora.png"
              alt="Edvora Logo"
              width={140}
              height={40}
              className="object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase mt-1">
                {role === 'super_admin' || role === 'admin' ? 'Admin Panel' : role === 'mentor' ? 'Mentor Portal' : 'Student Portal'}
              </span>
            </div>
          </Link>
          <button
            onClick={close}
            className="lg:hidden p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-0.5 flex-1 overflow-y-auto hide-scrollbar">
          {menus[role]?.map((m) => {
            const Icon = menuIcons[m.label] || BookOpen;
            const isActive = pathname === m.href;
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`flex items-center gap-4 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 group
                  ${isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }
                `}
              >
                <Icon className={`w-[22px] h-[22px] transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : "text-slate-500 group-hover:text-indigo-400"}`} />
                <span className="capitalize tracking-wide">{m.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 🔴 LOGOUT AREA */}
        <div className="mt-auto pt-4 border-t border-slate-900/50">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl bg-rose-600/5 text-rose-500 hover:bg-rose-600 hover:text-white transition-all duration-200 font-black text-sm shadow-sm group border border-rose-600/10 hover:border-rose-600/20"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
