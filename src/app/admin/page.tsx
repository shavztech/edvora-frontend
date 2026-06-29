import StatCard from "@/components/StatCard";

export default function AdminHomePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={120} />
        <StatCard title="Active Subjects" value={8} />
        <StatCard title="Pending Payments" value={15} />
        <StatCard title="Blocked Users" value={3} />
      </div>
    </>
  );
}
