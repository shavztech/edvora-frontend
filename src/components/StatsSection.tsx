

"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Users,
  Award,
  Heart,
} from "lucide-react";

const stats = [
  {
    label: "Parent Satisfaction",
    value: 99,
    suffix: "%",
    icon: Heart,
    gradient: "from-rose-500 to-pink-500",
  },
  {
    label: "Active Students",
    value: 10000,
    suffix: "+",
    icon: Users,
    gradient: "from-primary to-blue-500",
  },
  {
    label: "Expert Mentors",
    value: 500,
    suffix: "+",
    icon: Award,
    gradient: "from-secondary to-green-500",
  },
  {
    label: "Student Success",
    value: 98,
    suffix: "%",
    icon: TrendingUp,
    gradient: "from-orange-400 to-amber-500",
  },
];

export default function StatsSection() {
  const [count, setCount] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const intervals: ReturnType<typeof setInterval>[] = [];
    stats.forEach((stat, index) => {
      let current = 0;
      const step = Math.ceil(stat.value / 60);
      const interval = setInterval(() => {
        current += step;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(interval);
        }
        setCount((prev) => {
          const arr = [...prev];
          arr[index] = current;
          return arr;
        });
      }, 25);
      intervals.push(interval);
    });
    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);
  
return (
  <section className="relative overflow-hidden py-8 lg:py-8">
    {/* Background Glow */}
    <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-[140px]" />

    <div className="absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-secondary/20 blur-[140px]" />

    <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300/10 blur-[120px]" />

    <div className="relative max-w-7xl mx-auto px-6">
      {/* Heading */}

     

      {/* Stats */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(0,0,0,.12)] flex flex-col items-center space-y-2 p-4">
              <stat.icon className="h-6 w-6 text-primary" />
              <h5 className={`mt-6 text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>{count[index].toLocaleString()}{stat.suffix}</h5>
              <p className="mt-3 text-sm font-semibold text-slate-600">{stat.label}</p>
            </div>
          ))}
      </div>
    </div>
   </section>
  );
}
