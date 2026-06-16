import StatCard from "@/components/StatCard";

export default function AdminHomePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Students" value={120} />
        <StatCard label="Active Subjects" value={8} />
        <StatCard label="Pending Payments" value={15} />
        <StatCard label="Blocked Users" value={3} />
      </div>
    </>
  );
}
