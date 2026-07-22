



"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Baby,
  BookOpen,
  School,
  GraduationCap,
  Briefcase,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";

const featured = {
  id: "01",
  title: "Kindergarten (KG)",
  icon: Baby,
  image: "/programs/kg.png",
  gradient: "from-pink-500 to-rose-500",

  description:
    "Interactive and activity-based learning designed to build curiosity, creativity, confidence and communication skills from the very beginning.",

  highlights: [
    "Fun Learning",
    "Interactive Activities",
    "Live Classes",
  ],

  subjects: [
    "English",
    "Mathematics",
    "Phonics",
    "General Awareness",
  ],
};

export default function GradePrograms() {

  const [openCard, setOpenCard] = useState<number | null>(null);
  const [subjectsOpen, setSubjectsOpen] = useState(false);

  return (

<section className="relative overflow-hidden py-7 lg:py-9">

<div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

<div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-secondary/10 blur-[140px]" />

<div className="relative mx-auto max-w-7xl px-6 ">

{/* Heading */}

<div className="mx-auto  max-w-3xl text-center">

<span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">

KG program

</span>

<h2 className="-mt-1 text-3xl sm:text-4xl md:text-5xl font-[950] text-navy leading-tight">

 Learn, Play & Grow <br/>


<span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">

{" "}With Edvora KG Programs

</span>

</h2>

<p className="mt-9 text-lg leading-8 text-slate-600">

Our Kindergarten programs provide a joyful and engaging learning experience,
  helping children build strong foundations in literacy, numeracy, creativity,
  communication, and social development through interactive activities.
</p>

</div>

{/* Featured KG */}

<div className="relative mt-9 overflow-hidden rounded-[40px] border border-pink-100 bg-white shadow-[0_30px_80px_rgba(236,72,153,.08)]">

<div className="absolute inset-0 bg-gradient-to-r from-pink-50/70 via-white to-rose-50/70" />

<div className="relative grid items-center gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_1.3fr_.9fr] p-10">

{/* Image */}

<div className="relative flex justify-center">

<div className="absolute h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />

<img

src={featured.image}

alt={featured.title}

className="relative z-10 w-full max-w-[320px] object-contain"

/>

</div>

{/* Center */}

<div>

<span className="text-sm font-bold uppercase tracking-[.25em] text-pink-500">

★ Featured Program

</span>

<div className="mt-4 flex items-center gap-4">

<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white">

<Baby size={24} />

</div>

<div>

<h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy">

Kindergarten (KG)

</h3>

</div>

</div>

<p className="mt-6 text-lg leading-8 text-slate-600">

{featured.description}

</p>

<div className="mt-8 flex flex-wrap gap-3">

{featured.highlights.map((item)=>(

<div

key={item}

className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2"

>

<CheckCircle2

size={16}

className="text-pink-500"

/>

<span>{item}</span>

</div>

))}

</div>

</div>

{/* Right */}

<div>

<h4 className="font-bold text-navy">Subjects</h4>

{/* Mobile dropdown */}
<div className="mt-5">
  {/* Button visible on small screens */}
  <button
    type="button"
    className="flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm md:hidden"
    onClick={() => setSubjectsOpen(!subjectsOpen)}
  >
    Subjects
    {subjectsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
  </button>

  {/* Subject list: hidden on mobile when closed, always visible on md+ */}
  <div className={`mt-3 flex flex-wrap gap-3 ${subjectsOpen ? 'flex' : 'hidden'} md:flex`}>
    {featured.subjects.map((subject) => (
      <span
        key={subject}
        className="rounded-full border border-pink-200 bg-white px-4 py-2 text-sm"
      >
        {subject}
      </span>
    ))}
  </div>
</div>

</div>

<Link

href="/contact"

className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 font-semibold text-white shadow-xl"

>

Book Free Demo

<ArrowRight size={18}/>

</Link>

</div>

</div>

</div>


{/* Bottom Note */}

<div className="mx-auto mt-16 max-w-4xl rounded-full border border-primary/10 bg-white px-4 py-3 sm:px-6 md:px-8 shadow-lg">

  <p className="text-center text-slate-600">

    Every program is carefully designed to help learners achieve
    <span className="font-semibold text-primary">
      {" "}academic excellence
    </span>
    {" "}while building confidence, creativity and lifelong learning skills.

  </p>

</div>

</section>

);
}