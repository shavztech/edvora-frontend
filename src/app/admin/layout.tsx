"use client";

import Sidebar from "@/components/Sidebar";
import Protected from "@/components/Protected";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected roles={["admin", "super_admin"]}>
      <div className="flex min-h-screen bg-slate-50/50">
        <Sidebar role="admin" />
        <main className="flex-1 p-8 lg:p-12 pt-16 lg:pt-20 transition-all duration-300 min-w-0">
          <div className="max-w-7xl mx-auto animate-fade-up">
            {children}
          </div>
        </main>
      </div>
    </Protected>
  );
}
