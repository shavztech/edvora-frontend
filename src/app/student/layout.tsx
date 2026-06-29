import Sidebar from "@/components/Sidebar";
import Protected from "@/components/Protected";
import { Toaster } from "react-hot-toast";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected roles={["student"]}>
      <div className="flex min-h-screen">
        <Sidebar role="student" />

        <main className="flex-1 p-6 pt-20 bg-gray-100 transition-all duration-300">
          <Toaster position="top-right" /> {/* ✅ Toast container */}
          {children}
        </main>
      </div>
    </Protected>
  );
}