

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LogIn,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Calendar,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const userJson = localStorage.getItem("user");

    if (userJson) {
      const user = JSON.parse(userJson);
      setUserRole(user.role);
    }
  }, [pathname]);

  if (!mounted) return null;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  const handleDashboard = () => {
    const userJson = localStorage.getItem("user");

    if (!userJson) {
      router.push("/auth/login");
      return;
    }

    const user = JSON.parse(userJson);

    if (user.role === "admin" || user.role === "super_admin") {
      router.push("/admin/dashboard");
    } else if (user.role === "mentor") {
      router.push("/mentor/dashboard");
    } else {
      router.push("/student/dashboard");
    }
  };





  return (
    <header className="sticky top-0 z-50 w-full bg-[rgb(var(--edvora-primary))] backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.15)]">

      {/* Glow Effects */}
      <div className="absolute left-20 top-0 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute right-20 top-0 w-40 h-40 bg-green-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center z-10">
            <Image
              src="/edvora.png"
              alt="Edvora Logo"
              width={150}
              height={50}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  group
                  relative
                  px-5 py-2.5
                  rounded-full
                  font-semibold
                  text-white/90
                  transition-all duration-300
                  hover:text-white
                  hover:bg-green/110
                  hover:backdrop-blur-md
                  hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]
                "
              >
                <span className="relative z-10">{item.name}</span>

                <span
                  className="
                    absolute
                    left-1/2
                    bottom-1
                    h-[3px]
                    w-0
                    rounded-full
                    bg-secondary
                    transition-all
                    duration-300
                    group-hover:w-8
                    group-hover:left-[calc(50%-16px)]
                  "
                ></span>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">

            {!isLoggedIn ? (
              <>
                {/* Login */}
                <Link
                  href="/auth/login"
                  className="
                    flex items-center gap-2
                    px-5 py-2.5
                    rounded-full
                    bg-white/10
                    backdrop-blur-lg
                    border border-white/20
                    text-white
                    font-semibold
                    hover:bg-white/20
                    hover:scale-105
                    transition-all duration-300
                  "
                >
                  <LogIn size={18} />
                  Login
                </Link>

                {/* Book Demo */}
                {(!isLoggedIn || userRole === "student") && (
                  <Link
                    href="/demo-booking"
                    className="
      rounded-full
      bg-gradient-to-r
      from-secondary
      to-emerald-500
      px-7 py-3
      text-white
      font-bold
      shadow-[0_8px_25px_rgba(111,168,67,0.4)]
      hover:scale-110
      hover:shadow-[0_12px_35px_rgba(111,168,67,0.6)]
      transition-all duration-300
    "
                  >
                    Book Demo
                  </Link>
                )}
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="
                    flex items-center gap-2
                    px-5 py-2.5
                    rounded-full
                    bg-white/10
                    border border-white/20
                    text-white
                    font-semibold
                    hover:bg-white/20
                    transition-all duration-300
                  "
                >
                  My Account
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-14 w-60 rounded-3xl bg-white shadow-2xl overflow-hidden">

                    <button
                      onClick={handleDashboard}
                      className="w-full px-5 py-4 flex items-center gap-3 hover:bg-sky-50 transition-all"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </button>

                    {userRole === "student" && (
                      <Link
                        href="/demo-booking"
                        className="px-5 py-4 flex items-center gap-3 hover:bg-emerald-50 transition-all"
                      >
                        <Calendar size={18} />
                        Book Demo
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full px-5 py-4 flex items-center gap-3 text-red-500 hover:bg-red-50 transition-all"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden py-6 space-y-4 border-t border-white/10">

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-white font-semibold py-2"
              >
                {item.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/login"
                  className="block text-white font-semibold py-2"
                >
                  Login
                </Link>

                {(!isLoggedIn || userRole === "student") && (
                  <Link
                    href="/demo-booking"
                    className="block text-center bg-secondary text-white py-3 rounded-full font-bold"
                  >
                    Book Demo
                  </Link>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={handleDashboard}
                  className="block text-white font-semibold py-2"
                >
                  Dashboard
                </button>

                {(!isLoggedIn || userRole === "student") && (
                  <Link
                    href="/demo-booking"
                    className="block text-center bg-secondary text-white py-3 rounded-full font-bold"
                  >
                    Book Demo
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block text-red-300 font-semibold py-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>

    </header>
  );
};

export default Navbar;