

"use client";


import {
  Heart,
  MessageCircle,
  Instagram,
  Play,
  Plus,
  X,
  Trash2,
  Video,
} from "lucide-react";



export default function SuccessStoriesPage() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20">
      {/* Left side – text */}
      <div className="flex-1 space-y-6">
        <span className="inline-flex items-center gap-2.5 rounded-full bg-primary/10 pl-2 pr-4 py-1.5 text-primary font-semibold text-sm">
          <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-sm">
            <Instagram size={14} />
          </span>
          Join Our Community
        </span>

        <h3 className="mt-6 text-3xl md:text-4xl font-black text-navy leading-tight">
          Be Part of Our
          <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Learning Journey
          </span>
        </h3>

        <p className="mt-5 text-lg text-slate-600 leading-relaxed">
          Follow Edvora on Instagram to explore inspiring student achievements, classroom moments, educational tips, competitions, workshops and exciting updates from our learning community.
        </p>
      </div>

      {/* Right side – button */}
      <div className="mt-8 md:mt-0">
        <a
          href="https://instagram.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] px-8 py-4 text-white font-bold shadow-[0_12px_35px_rgba(238,42,123,0.25)] hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(238,42,123,0.35)] transition-all duration-300"
        >
          <Instagram size={22} className="group-hover:rotate-12 transition-transform duration-300" />
          Follow on Instagram
        </a>
      </div>
    </section>
  );
}