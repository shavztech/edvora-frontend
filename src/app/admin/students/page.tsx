"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Loader from "@/components/Loader";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStudents = async (showLoader: boolean = false) => {
    try {
      if (showLoader) setLoading(true);

      const res = await api.get("/admin/students");
      setStudents(res.data.students || []);
    } catch (err) {
      console.error("Failed to load students", err);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents(true);

    const interval = setInterval(() => {
      loadStudents(false);
    }, 10000);

    return () => clearInterval(interval);
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
          {students.map((student) => (
            <tr key={student._id}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.email}</td>
              <td className="border p-2">
                {student.isBlocked ? (
                  <span className="text-red-600">Blocked</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </td>
            </tr>
          ))}

          {students.length === 0 && (
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