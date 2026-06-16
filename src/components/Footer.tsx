import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[rgb(var(--edvora-primary))] text-white mt-12">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 items-start">

        {/* Brand */}
        <div className="md:col-span-2">
          <div className="mb-5">
            <Image
              src="/edvora.png"
              alt="Edvora Logo"
              width={160}
              height={48}
              className="object-contain"
              priority
            />
          </div>

          <p className="text-white/80 max-w-md leading-relaxed text-sm">
            Edvora is a modern EdTech platform empowering students and mentors
            through structured learning, progress tracking, and expert guidance.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[rgb(var(--edvora-accent))]">
            Platform
          </h4>
          <ul className="space-y-3 text-sm text-white/85">
            <li><Link href="/" className="hover:text-[rgb(var(--edvora-accent))]">Home</Link></li>
            <li><Link href="/courses" className="hover:text-[rgb(var(--edvora-accent))]">Courses</Link></li>
            <li><Link href="/about" className="hover:text-[rgb(var(--edvora-accent))]">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[rgb(var(--edvora-accent))]">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[rgb(var(--edvora-accent))]">
            Support
          </h4>
          <ul className="space-y-3 text-sm text-white/85">
            <li><Link href="/auth/login" className="hover:text-[rgb(var(--edvora-accent))]">Login</Link></li>
            <li><Link href="/privacy" className="hover:text-[rgb(var(--edvora-accent))]">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[rgb(var(--edvora-accent))]">Terms & Conditions</Link></li>
            <li><Link href="/help" className="hover:text-[rgb(var(--edvora-accent))]">Help Center</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Edvora. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-[rgb(var(--edvora-accent))]">LinkedIn</Link>
            <Link href="#" className="hover:text-[rgb(var(--edvora-accent))]">Twitter</Link>
            <Link href="#" className="hover:text-[rgb(var(--edvora-accent))]">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
