"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type DemoRequest = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

export default function AdminDemoRequestsListPage() {
  const [demos, setDemos] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadDemos = async () => {
    try {
      // Assuming new backend route handles this. Adjust if necessary.
      const res = await api.get("/course-demo-requests");
      setDemos(res.data);
    } catch (err: any) {
      console.error("Error loading demo requests", err);
      setError("Failed to load demo requests.");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  loadDemos();

  const interval = setInterval(() => {
    loadDemos();
  }, 10000); // 10 seconds

  return () => clearInterval(interval);
}, []);

  const handleAccept = async (id: string) => {
    if (!window.confirm("Are you sure you want to accept this demo request?")) return;

    setProcessingId(id);
    try {
      const res = await api.put(`/course-demo-requests/${id}/accept`);
      if (res.data.success) {
        // Update local state to reflect accepted status
        setDemos((prevDemos) =>
          prevDemos.map((demo) =>
            demo._id === id ? { ...demo, status: "accepted" } : demo
          )
        );
      }
    } catch (err: any) {
      console.error("Error accepting request", err);
      alert("Failed to accept the request.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <div className="p-6">Loading demo requests...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md m-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Course Demo Requests (New Feature)
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 font-semibold text-gray-700">Date</th>
              <th className="p-3 font-semibold text-gray-700">Student Info</th>
              <th className="p-3 font-semibold text-gray-700">Course</th>
              <th className="p-3 font-semibold text-gray-700">Message</th>
              <th className="p-3 font-semibold text-gray-700">Status</th>
              <th className="p-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {demos.map((demo) => (
              <tr key={demo._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 text-gray-600">
                  {new Date(demo.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <div className="font-medium text-gray-800">{demo.name}</div>
                  <div className="text-gray-500 text-xs">{demo.email}</div>
                  <div className="text-gray-500 text-xs">{demo.phone}</div>
                </td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {demo.course}
                  </span>
                </td>
                <td className="p-3 text-gray-600 truncate max-w-xs" title={demo.message || "-"}>
                  {demo.message || <span className="text-gray-400 italic">No message</span>}
                </td>
                <td className="p-3">
                  {demo.status === "pending" && (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                  {demo.status === "accepted" && (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      Accepted
                    </span>
                  )}
                  {demo.status === "rejected" && (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                      Rejected
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {demo.status === "pending" && (
                    <button
                      onClick={() => handleAccept(demo._id)}
                      disabled={processingId === demo._id}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-xs font-medium transition disabled:opacity-50"
                    >
                      {processingId === demo._id ? "Accepting..." : "Accept"}
                    </button>
                  )}
                  {demo.status !== "pending" && (
                    <span className="text-gray-400 text-xs italic">Reviewed</span>
                  )}
                </td>
              </tr>
            ))}
            {demos.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-8 text-gray-500">
                  No demo requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
