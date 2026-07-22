"use client"


import Link from "next/link";
import Image from "next/image";
import { BookOpen, Award, TrendingUp, ArrowRight, Compass, PlayCircle, } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";



export default function Banner() {


  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");


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

  return (
    <section className="relative text-gray-900 overflow-hidden py-6 lg:py-5">
      {/* 3D AMBIENT LIGHT BLOBS (BACKGROUND GLOW) */}
      <div className="absolute top-[-10%] left-[-15%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-primary/20 blur-[100px] md:blur-[140px] animate-glow-pulse-slow pointer-events-none " />
      <div className="absolute bottom-[-10%] right-[-15%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full bg-secondary/15 blur-[120px] md:blur-[160px] animate-glow-pulse pointer-events-none" />
      <div className="absolute top-[25%] left-[45%] w-[250px] md:w-[350px] h-[250px] md:h-[350px] rounded-full bg-purple-500/10 blur-[80px] md:blur-[110px] animate-glow-pulse-slow pointer-events-none" />

      {/* GRID OVERLAY FOR TECH LOOK */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8 max-w-2xl -mt-2 md:-mt-4 lg:-mt-12">

            {/* SUB BADGE */}
            <div
              className="inline-flex items-center gap-2.5 px-4 rounded-full glass-card border border-white/10 text-xs font-semibold tracking-wider text-secondary uppercase opacity-0 animate-slide-left-smooth mt-1 md:mt-2 lg:mt-6"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>✨ Next-Gen Learning Platform</span>
              </span>
            </div>

            {/* WRAPPER FOR ALL CONTENT EXCEPT SUB BADGE */}
            <div className="space-y-4 md:space-y-6 lg:space-y-8 ">
              {/* HEADING */}
              <div className="space-y-2 md:space-y-3 lg:space-y-4 -mt-4">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-[950] text-navy leading-tight">
                  Empowering Learning <br />

                  <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
                    and Growth
                  </span>
                </h1>

                <p
                  className="text-slate-600 text-base md:text-lg leading-relaxed opacity-0 animate-slide-left-smooth"
                  style={{ animationDelay: "0.8s" }}
                >
                  Join our platform and level up your education journey with expert
                  mentors, structured courses, and interactive tools to track your
                  progress and achievements.
                </p>
                <div className="block md:hidden mt-8 mb-4">
                  <Image
                    src="/about/about-hero.png"
                    alt="Banner image"
                    width={600}
                    height={400}
                    className="w-full object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div
                className="flex flex-wrap gap-4 mt-0 md:mt-0 lg:-mt-4 opacity-0 animate-slide-left-smooth"
                style={{ animationDelay: "1.1s" }}
              >

                {(!isLoggedIn || userRole === "student") && (
                  <Link
                    href="/demo-booking"
                    className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-3.5 text-white font-semibold shadow-[0_4px_20px_rgba(111,168,67,0.3)] hover:shadow-[0_8px_30px_rgba(111,168,67,0.5)] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-secondary via-[#82c253] to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <span className="relative z-10 flex items-center gap-2">
                      Get Demo
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </span>
                  </Link>
                )}

                <a
                  href="/demo-video"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-blue-500 text-white px-8 py-3.5 font-semibold shadow-[0_8px_25px_rgba(59,111,182,0.25)] hover:scale-105 hover:shadow-[0_12px_35px_rgba(59,111,182,0.45)] transition-all duration-300"
                >
                  <span>Explore Features</span>
                  <PlayCircle
                    size={22}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
              </div>

              {/* FEATURE CARDS */}
              <div
                className=" opacity-0 animate-slide-left-smooth"
                style={{ animationDelay: "1.4s" }}
              >
                <div className="flex flex-row justify-center items-center gap-8 sm:grid sm:grid-cols-3 sm:gap-5 mt-11 lg:mt-16">
                  {/* CARD 1 */}
                  <div className="group relative flex items-center justify-center rounded-3xl bg-transparent sm:bg-white/70 backdrop-blur-xl sm:backdrop-blur-xl border-0 sm:border border-white/60 p-0 sm:p-6 shadow-none sm:shadow-[0_15px_40px_rgba(59,130,246,0.08)] sm:hover:shadow-[0_25px_60px_rgba(34,197,94,0.18)] sm:hover:-translate-y-3 transition-all duration-500 animate-float-slow">
                    {/* Glow Effect */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-400/20 rounded-full blur-3xl group-hover:scale-125 transition-all duration-700 hidden sm:block" />

                    <div className="relative z-10 flex flex-col items-center justify-center sm:w-full">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white shadow-lg mb-0 sm:mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 cursor-pointer">
                        <BookOpen size={26} />
                      </div>

                      <h4 className="absolute top-16 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-100 shadow-md text-xs sm:relative sm:top-0 sm:left-0 sm:translate-x-0 sm:bg-transparent sm:px-0 sm:py-0 sm:border-0 sm:shadow-none sm:text-[#1e3a5f] sm:text-lg font-bold sm:mb-2 opacity-0 group-hover:opacity-100 sm:opacity-100 pointer-events-none transition-all duration-300 translate-y-1 sm:translate-y-0 whitespace-nowrap z-50 sm:text-center sm:w-full">
                        Gain Knowledge
                      </h4>
                    </div>
                  </div>

                  {/* CARD 2 */}
                  <div className="group relative flex items-center justify-center rounded-3xl bg-transparent sm:bg-white/70 backdrop-blur-xl sm:backdrop-blur-xl border-0 sm:border border-white/60 p-0 sm:p-6 shadow-none sm:shadow-[0_15px_40px_rgba(59,130,246,0.08)] sm:hover:shadow-[0_25px_60px_rgba(59,130,246,0.18)] sm:hover:-translate-y-3 transition-all duration-500 animate-float-medium">
                    {/* Glow Effect */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-sky-400/20 rounded-full blur-3xl group-hover:scale-125 transition-all duration-700 hidden sm:block" />

                    <div className="relative z-10 flex flex-col items-center justify-center sm:w-full">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white shadow-lg mb-0 sm:mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 cursor-pointer">
                        <TrendingUp size={26} />
                      </div>

                      <h4 className="absolute top-16 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-100 shadow-md text-xs sm:relative sm:top-0 sm:left-0 sm:translate-x-0 sm:bg-transparent sm:px-0 sm:py-0 sm:border-0 sm:shadow-none sm:text-[#1e3a5f] sm:text-lg font-bold sm:mb-2 opacity-0 group-hover:opacity-100 sm:opacity-100 pointer-events-none transition-all duration-300 translate-y-1 sm:translate-y-0 whitespace-nowrap z-50 sm:text-center sm:w-full">
                        Track Progress
                      </h4>
                    </div>
                  </div>

                  {/* CARD 3 */}
                  <div className="group relative flex items-center justify-center rounded-3xl bg-transparent sm:bg-white/70 backdrop-blur-xl sm:backdrop-blur-xl border-0 sm:border border-white/60 p-0 sm:p-6 shadow-none sm:shadow-[0_15px_40px_rgba(59,130,246,0.08)] sm:hover:shadow-[0_25px_60px_rgba(168,85,247,0.18)] sm:hover:-translate-y-3 transition-all duration-500 animate-float-slow [animation-delay:500ms]">
                    {/* Glow Effect */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-purple-400/20 rounded-full blur-3xl group-hover:scale-125 transition-all duration-700 hidden sm:block" />

                    <div className="relative z-10 flex flex-col items-center justify-center sm:w-full">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg mb-0 sm:mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 cursor-pointer">
                        <Award size={26} />
                      </div>

                      <h4 className="absolute top-16 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-100 shadow-md text-xs sm:relative sm:top-0 sm:left-0 sm:translate-x-0 sm:bg-transparent sm:px-0 sm:py-0 sm:border-0 sm:shadow-none sm:text-[#1e3a5f] sm:text-lg font-bold sm:mb-2 opacity-0 group-hover:opacity-100 sm:opacity-100 pointer-events-none transition-all duration-300 translate-y-1 sm:translate-y-0 whitespace-nowrap z-50 sm:text-center sm:w-full">
                        Achieve Success
                      </h4>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 3D COMPOSITION */}
          <div
            className="relative flex justify-center items-center perspective-1000 w-full min-h-[380px] md:min-h-[500px] opacity-0 animate-slide-down-smooth hidden lg:block lg:mt-16"
            style={{ animationDelay: "0.7s" }}
          >
            {/* Glowing background ring */}
            <div className="absolute w-72 h-72 md:w-[480px] md:h-[480px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl animate-glow-pulse pointer-events-none" />

            {/* Main Interactive 3D Frame */}
            <div
              className="relative group w-[280px] h-[280px] md:w-[440px] md:h-[440px] rounded-[2.5rem] p-1 bg-gradient-to-tr from-primary/80 via-white/10 to-secondary/80 shadow-[0_30px_70px_rgba(111,168,67,0.22)] transform transition-all duration-700 hover:rotate-y-6 hover:-rotate-x-6 hover:scale-102 preserve-3d animate-float-slow"
            >

              <div className="relative w-full h-full rounded-[2.3rem] overflow-hidden bg-gradient-to-br from-sky-50 to-emerald-50">
                <Image
                  src="/about/about-hero-2.png"
                  alt=" learning"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>



            <div className="absolute -top-4 left-[-10px] md:left-4 group z-20 animate-float-slow">
              <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-3xl group-hover:scale-110 transition-all duration-500"></div>

              <div className="relative bg-white/75 backdrop-blur-2xl rounded-3xl px-5 py-4 flex items-center gap-4 border border-white/60 shadow-[0_15px_40px_rgba(16,185,129,0.18)] hover:-translate-y-1 transition-all duration-500">

                <div className="relative flex items-center justify-center">
                  <span className="absolute flex h-4 w-4 rounded-full bg-emerald-400/40 animate-ping" />
                  <span className="relative flex h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                </div>

                <div>
                  <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em]">
                    Session Live
                  </div>

                  <div className="text-sm text-slate-800 font-extrabold">
                    1:1 Mentoring
                  </div>
                </div>
              </div>
            </div>







            <div className="absolute bottom-6 right-[-10px] md:right-4 group z-20 animate-float-medium">

              <div className="absolute inset-0 bg-sky-400/20 blur-2xl rounded-3xl group-hover:scale-110 transition-all duration-500"></div>

              <div className="relative bg-white/75 backdrop-blur-2xl rounded-3xl px-5 py-4 flex items-center gap-4 border border-white/60 shadow-[0_15px_40px_rgba(59,130,246,0.18)] hover:-translate-y-1 transition-all duration-500">

                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-400 to-emerald-400 flex items-center justify-center text-white shadow-[0_10px_25px_rgba(59,130,246,0.25)]">
                  <Compass
                    size={20}
                    className="animate-spin"
                    style={{ animationDuration: "10s" }}
                  />
                </div>

                <div>
                  <div className="text-[10px] text-sky-600 font-bold uppercase tracking-[0.2em]">
                    Guided Path
                  </div>

                  <div className="text-sm text-slate-800 font-extrabold">
                    98% Success Rate
                  </div>
                </div>

              </div>
            </div>


            <div className="absolute top-1/2 -right-8 md:-right-4 group z-20 animate-float-fast">

              <div className="absolute inset-0 bg-purple-400/20 blur-2xl rounded-3xl group-hover:scale-110 transition-all duration-500"></div>

              <div className="relative bg-white/75 backdrop-blur-2xl rounded-3xl p-4 border border-white/60 shadow-[0_15px_40px_rgba(168,85,247,0.18)] hover:scale-110 transition-all duration-500">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white text-2xl shadow-[0_10px_25px_rgba(168,85,247,0.25)]">
                  💡
                </div>

              </div>
            </div>
          </div>


        </div>
      </div>

    </section>

  );
}

