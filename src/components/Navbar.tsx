"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { LogIn, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { toggle: toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const isDashboardPage =
    pathname.startsWith("/admin") || pathname.startsWith("/student") || pathname.startsWith("/mentor");

  // 🔥 FIX HERE
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleToggle = () => {
    if (isDashboardPage) toggleSidebar();
    else setOpen(!open);
  };

  const handleLogout = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-bold text-slate-800">Are you sure you want to log out?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              localStorage.clear();
              setIsLoggedIn(false);
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

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-sm">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/edvora.png"
            alt="Edvora Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        <div className="ml-auto flex items-center">
          <nav className="hidden md:flex items-center gap-12 text-white">
            <button
              onClick={() => {
                const token = localStorage.getItem("token");
                const userJson = localStorage.getItem("user");
                
                if (token && userJson) {
                  const user = JSON.parse(userJson);
                  const role = user.role;
                  
                  if (role === "super_admin" || role === "admin") {
                    router.push("/admin/dashboard");
                  } else if (role === "mentor") {
                    router.push("/mentor/dashboard");
                  } else if (role === "student") {
                    router.push("/student/dashboard");
                  } else {
                    router.push("/");
                  }
                } else {
                  toast.error("Please login to access your dashboard");
                  router.push("/auth/login");
                }
              }}
              className="hover:opacity-80 transition-opacity"
            >
              My Dashboard
            </button>

            {!isLoggedIn ? (
              <Link href="/auth/login" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            ) : (
              <button onClick={handleLogout} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}

            <Link
              href="/demo-booking"
              className="rounded-md bg-secondary px-5 py-2 font-medium"
            >
              Get Demo
            </Link>
          </nav>

          <button
            className="ml-4 md:hidden text-2xl text-white"
            onClick={handleToggle}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
