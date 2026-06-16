
import Link from "next/dist/client/link";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="bg-[#e8eced] py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* GRID WITH CONTROLLED WIDTH */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

          {/* LEFT CONTENT (WIDTH CONTROLLED) */}
          <div className="max-w-2xl space-y-6">

            <div className="text-xs uppercase tracking-wider text-navy/60 font-medium">
              Edvora &gt; Platform &gt; Learning
            </div>

            <h1 className="text-navy text-4xl md:text-5xl font-extrabold leading-tight">
              Empowering Learning <br />
              <span className="text-navy/90">and Growth</span>
            </h1>

            <p className="text-text/80 text-base md:text-lg">
              Join our platform and level up your education journey with expert mentors,
              structured courses, and tools to track your progress and achievements.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">

              <Link
                href="/demo-booking"
                className="rounded-full bg-secondary px-6 py-3 text-white font-semibold shadow-md hover:opacity-95 transition"
              >
                Get a Demo
              </Link>


              {/* <a
                href="/#get-demo"
                className="rounded-full bg-secondary px-6 py-3 text-white font-semibold shadow-md hover:opacity-95 transition"
              >
                Get a Demo
              </a> */}


              <a
                href="/auth/login"
                className="rounded-full border border-navy/20 px-6 py-3 text-navy hover:bg-navy/5 transition"
              >
                Register or Log In
              </a>
            </div>

            {/* FEATURE CARDS (FIXED WIDTH) */}
            <div className="pt-10 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="rounded-xl shadow-md p-4 bg-secondary text-white">
                  <h4 className="text-sm font-semibold">Gain Knowledge</h4>
                  <p className="text-xs opacity-90 mt-1">
                    Curated lessons & mentor sessions
                  </p>
                </div>

                <div className="rounded-xl shadow-md p-4 bg-primary text-white">
                  <h4 className="text-sm font-semibold">Track Progress</h4>
                  <p className="text-xs opacity-90 mt-1">
                    Visual reports & milestones
                  </p>
                </div>

                <div className="rounded-xl shadow-md p-4 bg-navy text-white">
                  <h4 className="text-sm font-semibold">Achieve Success</h4>
                  <p className="text-xs opacity-90 mt-1">
                    Reviews & mentor guidance
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT IMAGE*/}
          <div className="relative flex justify-center">
            <div className="rounded-full p-1 bg-gradient-to-br from-primary to-secondary shadow-lg">
              <div
                className="relative rounded-full bg-white overflow-hidden
                w-[280px] h-[280px]
                md:w-[420px] md:h-[420px]"
              >
                <Image
                  src="/banner.jpeg"
                  alt="Edvora visual"
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-10 left-14 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center text-lg">
                💡
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
