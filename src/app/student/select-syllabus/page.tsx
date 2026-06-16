"use client";

import { useRouter } from "next/navigation";

export default function SelectSyllabus() {
  const router = useRouter();

  const choose = (syllabus: string) => {
    localStorage.setItem("syllabus", syllabus);
    router.push("/student/select-class");
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h1 className="text-xl font-bold mb-4">Select Syllabus</h1>

      <button
        className="w-full bg-primary text-white py-2 rounded mb-3"
        onClick={() => choose("kerala")}
      >
        Kerala Syllabus
      </button>

      <button
        className="w-full bg-primary text-white py-2 rounded"
        onClick={() => choose("cbse")}
      >
        CBSE Syllabus
      </button>
    </div>
  );
}
