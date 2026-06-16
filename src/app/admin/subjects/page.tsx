"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function AddSubject() {
  const [name, setName] = useState("");
  const [syllabus, setSyllabus] = useState("kerala");
  const [classLevel, setClassLevel] = useState(8);

  const submit = async () => {
    try {
      await api.post("/admin/subjects", {
        name,
        syllabus,
        classLevel,
      });

      alert("Subject added");
      setName("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h2 className="font-bold mb-4">Add Subject</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Subject name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-2"
        value={syllabus}
        onChange={(e) => setSyllabus(e.target.value)}
      >
        <option value="kerala">Kerala Syllabus</option>
        <option value="cbse">CBSE</option>
      </select>

      <select
        className="border p-2 w-full mb-4"
        value={classLevel}
        onChange={(e) => setClassLevel(Number(e.target.value))}
      >
        {[...Array(12)].map((_, i) => (
          <option key={i} value={i + 1}>
            Class {i + 1}
          </option>
        ))}
      </select>

      <button
        onClick={submit}
        className="bg-primary text-white px-4 py-2 rounded w-full"
      >
        Add Subject
      </button>
    </div>
  );
}
