




"use client";

const journeySteps = [
  {
    step: "01",
    title: "Demo Booking",
    description:
      "Book a free demo session and discover how Edvora transforms learning.",
    image: "/program-journey/demo.png",
    color: "from-blue-500 to-sky-500",
  },
  {
    step: "02",
    title: "Registration",
    description:
      "Complete your registration and create your personalized student profile.",
    image: "/program-journey/registration.png",
    color: "from-emerald-500 to-green-500",
  },
  {
    step: "03",
    title: "Onboarding",
    description:
      "Meet your mentor, understand the platform and prepare your learning path.",
    image: "/program-journey/onboarding.png",
    color: "from-violet-500 to-purple-500",
  },
  {
    step: "04",
    title: "Book Slot",
    description:
      "Choose the perfect class schedule that fits your daily routine.",
    image: "/program-journey/bookslot.png",
    color: "from-orange-400 to-amber-500",
  },
  {
    step: "05",
    title: "Attend Class",
    description:
      "Join engaging live interactive sessions guided by experienced educators.",
    image: "/program-journey/attend.png",
    color: "from-cyan-500 to-sky-500",
  },
  {
    step: "06",
    title: "Mark Attendance",
    description:
      "Track attendance and maintain consistency throughout your journey.",
    image: "/program-journey/attendance.png",
    color: "from-green-500 to-emerald-500",
  },
  {
    step: "07",
    title: "Review Progress",
    description:
      "Receive detailed reports and personalized feedback for continuous growth.",
    image: "/program-journey/review.png",
    color: "from-primary to-secondary",
  },
];

export default function LearningJourney() {
  return (
    <section className="relative overflow-hidden py-6 lg:py-8">

      {/* Background Glow */}

      <div className="absolute -left-44 top-0 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[150px]" />

      <div className="absolute -right-44 bottom-0 h-[450px] w-[450px] rounded-full bg-secondary/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Badge */}

        <div className="flex justify-center">

          <span className="inline-flex items-center rounded-full bg-secondary/10 px-5 py-2 text-sm font-semibold text-secondary">

            ✨ PROGRAM JOURNEY

          </span>

        </div>

        {/* Heading */}

        <div className="mx-auto mt-3 max-w-4xl text-center">

          <h2 className="text-4xl md:text-5xl font-[950] text-navy leading-tight">

            Your Learning Journey <br/>

            <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">

              Starts Here

            </span>

          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-lg leading-8 text-slate-600">

            From your very first demo session to continuous progress reviews,
            Edvora guides every learner through a structured,
            engaging and rewarding learning experience.

          </p>

        </div>
        {/* Timeline */}

<div className="mt-20">

  <div className="grid gap-10 lg:grid-cols-2">

    {/* ================= LEFT COLUMN ================= */}

    <div className="space-y-8">

      {journeySteps.slice(0, 3).map((item) => (

        <div
          key={item.step}
          className="group flex items-center gap-6 -mt-10"
        >

          {/* Step Icon */}

          <div
            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${item.color} text-2xl font-black text-white shadow-[0_10px_30px_rgba(59,111,182,.25)]`}
          >
            {item.step}
          </div>

          {/* Card */}

          <div className="relative flex-1 overflow-hidden rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,.08)] backdrop-blur-xl transition-all duration-500 group-hover:translate-x-2 group-hover:shadow-[0_25px_60px_rgba(59,111,182,.15)]">

            <div className="flex items-center gap-5">

              <img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 object-contain transition duration-500 group-hover:scale-110"
              />

              <div>

                <h3 className="text-xl font-black text-navy">
                  {item.title}
                </h3>

                <p className="mt-2 text-[15px] leading-6 text-slate-600">
                  {item.description}
                </p>

              </div>

            </div>

            <div
              className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-r ${item.color} opacity-10 blur-3xl transition-all duration-500 group-hover:scale-125`}
            />

          </div>

        </div>

      ))}

    </div>

    {/* ================= RIGHT COLUMN ================= */}

        <div className="space-y-8">

      {journeySteps.slice(3, 6).map((item) => (

        <div
          key={item.step}
          className="group flex items-center gap-6 -mt-10"
        >

          {/* Step Icon */}

          <div
            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${item.color} text-2xl font-black text-white shadow-[0_10px_30px_rgba(59,111,182,.25)]`}
          >
            {item.step}
          </div>

          {/* Card */}

          <div className="relative flex-1 overflow-hidden rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,.08)] backdrop-blur-xl transition-all duration-500 group-hover:translate-x-2 group-hover:shadow-[0_25px_60px_rgba(59,111,182,.15)]">

            <div className="flex items-center gap-5">

              <img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 object-contain transition duration-500 group-hover:scale-110"
              />

              <div>

                <h3 className="text-xl font-black text-navy">
                  {item.title}
                </h3>

                <p className="mt-2 text-[15px] leading-6 text-slate-600">
                  {item.description}
                </p>

              </div>

            </div>

            {/* Hover Glow */}

            <div
              className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-r ${item.color} opacity-10 blur-3xl transition-all duration-500 group-hover:scale-125`}
            />

          </div>

        </div>

      ))}

    </div>

  </div>
        {/* ================= STEP 7 (CENTER) ================= */}

      <div className="mt-12 flex justify-center">

        <div className="w-full max-w-2xl">

          <div
            key={journeySteps[6].step}
            className="group flex items-center gap-6"
          >

            {/* Step Icon */}

            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${journeySteps[6].color} text-2xl font-black text-white shadow-[0_10px_30px_rgba(59,111,182,.25)]`}
            >
              {journeySteps[6].step}
            </div>

            {/* Card */}

            <div className="relative flex-1 overflow-hidden rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,.08)] backdrop-blur-xl transition-all duration-500 group-hover:translate-y-1 group-hover:shadow-[0_25px_60px_rgba(59,111,182,.15)]">

              <div className="flex items-center gap-5">

                <img
                  src={journeySteps[6].image}
                  alt={journeySteps[6].title}
                  className="h-16 w-16 object-contain transition duration-500 group-hover:scale-110"
                />

                <div>

                  <h3 className="text-xl font-black text-navy">
                    {journeySteps[6].title}
                  </h3>

                  <p className="mt-2 text-[15px] leading-6 text-slate-600">
                    {journeySteps[6].description}
                  </p>

                </div>

              </div>

              {/* Hover Glow */}

              <div
                className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-r ${journeySteps[6].color} opacity-10 blur-3xl transition-all duration-500 group-hover:scale-125`}
              />

            </div>

          </div>

        </div>

      </div>

        
          {/* Bottom Note */}

          <div className="mt-20 flex justify-center">

            <div className="rounded-full border border-primary/10 bg-white/80 px-8 py-4 shadow-lg backdrop-blur-xl">

              <p className="text-center text-base font-medium text-slate-700">

                🚀 Every step is carefully designed to provide a smooth,
                engaging and rewarding learning experience with Edvora.

              </p>

            </div>



          </div>
        </div>
      </div>
    </section>
  );
}