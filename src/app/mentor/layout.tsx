import Sidebar from "@/components/Sidebar";
import Protected from "@/components/Protected";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected roles={["mentor"]}>
      <div className="flex min-h-screen">
        <Sidebar role="mentor" />
        <main className="flex-1 p-6 pt-20 bg-gray-100">
          {children}
        </main>
      </div>
    </Protected>
  );
}
