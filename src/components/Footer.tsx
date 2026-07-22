


"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mb-22 overflow-hidden bg-[rgb(var(--edvora-primary))] text-white">

      {/* Background Glow */}
      <div className="absolute -left-32 -top-40 h-[350px] w-[350px] rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-secondary/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

          {/* ================= COMPANY ================= */}

          <div className="text-center md:text-left">

            <div className="flex justify-center md:justify-start -mt-5">
              <Link href="/" className="flex items-center z-10">
                <Image
                  src="/edvora.png"
                  alt="Edvora Logo"
                  width={150}
                  height={50}
                  priority
                />
              </Link>
            </div>

            <p className="mx-auto mt-2 max-w-md leading-8 text-white/75 md:mx-0">
              Empowering students from Kindergarten to Grade 12 through
              personalized one-to-one online learning, expert mentors,
              and future-ready education.
            </p>

            {/* Social */}

            <div className="mt-8 flex justify-center gap-4 md:justify-start">

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary"
              >
                <Linkedin size={18} />
              </a>

            </div>

          </div>

          {/* ================= QUICK LINKS ================= */}

          <div className="text-center md:text-left">

            <h3 className="text-xl font-bold">
              Quick Links
            </h3>

            <div className="mt-7 flex flex-col gap-4">

              <Link
                href="/"
                className="text-white/70 transition hover:text-secondary"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="text-white/70 transition hover:text-secondary"
              >
                About Us
              </Link>

              <Link
                href="/programs"
                className="text-white/70 transition hover:text-secondary"
              >
                Programs
              </Link>

              <Link
                href="/career"
                className="text-white/70 transition hover:text-secondary"
              >
                Careers
              </Link>

              <Link
                href="/contact"
                className="text-white/70 transition hover:text-secondary"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* ================= PROGRAMS ================= */}

          <div className="text-center md:text-left">

            <h3 className="text-xl font-bold">
              Programs
            </h3>

            <div className="mt-7 flex flex-col gap-4">

              <Link
                href="/programs"
                className="text-white/70 transition hover:text-secondary"
              >
                Foundation Programs
              </Link>

              <Link
                href="/programs"
                className="text-white/70 transition hover:text-secondary"
              >
                Curriculum Programs
              </Link>

              <Link
                href="/programs"
                className="text-white/70 transition hover:text-secondary"
              >
                Grade-wise Learning
              </Link>

              <Link
                href="/book-demo"
                className="text-white/70 transition hover:text-secondary"
              >
                Book Free Demo
              </Link>

            </div>

          </div>

          {/* ================= CONTACT ================= */}

          <div className="text-center md:text-left">

            <h3 className="text-xl font-bold">
              Contact
            </h3>

            <div className="mt-7 space-y-6">


                            <div className="flex items-start justify-center gap-4 md:justify-start">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="font-semibold">Address</p>

                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Kerala, India
                  </p>
                </div>

              </div>

              <div className="flex items-start justify-center gap-4 md:justify-start">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="font-semibold">Email</p>

                  <a
                    href="mailto:hello@edvora.com"
                    className="mt-1 block text-sm text-white/70 transition hover:text-secondary"
                  >
                    hello@edvora.com
                  </a>
                </div>

              </div>

              <div className="flex items-start justify-center gap-4 md:justify-start">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="font-semibold">Phone</p>

                  <a
                    href="tel:+919999999999"
                    className="mt-1 block text-sm text-white/70 transition hover:text-secondary"
                  >
                    +91 99999 99999
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-10 h-px bg-white/10" />

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">

          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Edvora. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm">

            <Link
              href="/privacy-policy"
              className="text-white/60 transition hover:text-secondary"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-white/60 transition hover:text-secondary"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}
            