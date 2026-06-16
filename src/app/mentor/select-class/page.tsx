"use client";

import { useRouter } from "next/navigation";

const classes = ["KG", ...Array.from({ length: 12 }, (_, i) => `${i + 1}`)];

export default function SelectClass() {
  const router = useRouter();

  const choose = (cls: string) => {
    localStorage.setItem("classLevel", cls);
    router.push("/mentor/subjects");
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h1 className="text-xl font-bold mb-4">Select Class</h1>

      <div className="grid grid-cols-3 gap-3">
        {classes.map((c) => (
          <button
            key={c}
            className="border py-2 rounded hover:bg-primary hover:text-white"
            onClick={() => choose(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
