import Sidebar from "@/components/Sidebar";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="mentor" />
      <main className="flex-1 p-6 pt-20 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
