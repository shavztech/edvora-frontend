"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function MentorStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    api.get("/mentor/students").then((res) => setStudents(res.data.students));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="font-bold text-xl mb-4">Students</h1>

      <table className="w-full text-sm border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.onboarding?.classLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
