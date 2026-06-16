"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, Award, Heart } from "lucide-react";

const stats = [
  { label: "Satisfaction Rate", value: 99, suffix: "%", icon: Heart },
  { label: "Active Operatives", value: 32000, suffix: "+", icon: Users },
  { label: "Elite Mentors", value: 120, suffix: "+", icon: Award },
  { label: "Annual Growth", value: 240, suffix: "%", icon: TrendingUp },
];

export default function StatsSection() {
  const [count, setCount] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const durations = stats.map(s => {
      const step = Math.ceil(s.value / 40);
      return { step, value: s.value };
    });

    durations.forEach((d, i) => {
      let current = 0;
      const interval = setInterval(() => {
        current += d.step;
        if (current >= d.value) {
          current = d.value;
          clearInterval(interval);
        }
        setCount((prev) => {
          const copy = [...prev];
          copy[i] = current;
          return copy;
        });
      }, 30);
    });
  }, []);

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className="group relative">
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    <s.icon className="w-6 h-6" />
                 </div>
                 <div className="space-y-1">
                   <h3 className="text-4xl font-[950] text-slate-950 tracking-tighter leading-none">
                     {count[i].toLocaleString()}
                     {s.suffix || ""}
                   </h3>
                   <p className="text-[10px] font-[900] text-slate-400 uppercase tracking-widest leading-none">
                     {s.label}
                   </p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
