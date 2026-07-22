import Link from "next/link";

export default function CareerCTA() {
  return (
          <section className="mt-0 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">

<div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-primary via-[#4b7bc4] to-secondary p-[1px]">

<div className="rounded-[35px] bg-white/90 px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div>
              <h3 className="text-3xl font-black text-navy md:text-4xl">
                Ready to Begin Your Teaching Journey?
              </h3>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Join thousands of educators shaping futures with Edvora. Apply now or get in touch.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              <Link
                href="#apply-form"
                className="rounded-full bg-secondary px-8 py-4 font-bold text-white shadow-[0_15px_35px_rgba(111,168,67,.35)] hover:-translate-y-1 transition-all"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-primary px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-primary-dark"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}