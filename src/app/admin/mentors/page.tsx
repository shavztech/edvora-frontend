"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Loader from "@/components/Loader";

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMentors = async () => {
    try {
      const res = await api.get("/admin/mentors");
      setMentors(res.data.mentors || []);
    } catch (err) {
      console.error("Failed to load mentors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMentors();

    const interval = setInterval(() => {
      loadMentors();
    }, 10000); // refresh every 10 sec

    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Mentors</h1>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {mentors.map((mentor) => (
            <tr key={mentor._id}>
              <td className="border p-2">{mentor.name}</td>
              <td className="border p-2">{mentor.email}</td>
              <td className="border p-2">
                {mentor.isBlocked ? (
                  <span className="text-red-600">Blocked</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </td>
            </tr>
          ))}

          {mentors.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                No mentors found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
