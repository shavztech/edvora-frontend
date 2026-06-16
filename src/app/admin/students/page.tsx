"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Loader from "@/components/Loader";

export default function AdminMentorsPage() {
  const [mentors, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await api.get("/admin/students");
        setStudents(res.data.students || []);
      } catch (err) {
        console.error("Failed to load students", err);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Students</h1>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">
                {s.isBlocked ? (
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
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
