"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function StudentSubjectsPage() {
  const [syllabus, setSyllabus] = useState<string | null>(null);
  const [classLevel, setClassLevel] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!syllabus || !classLevel) return;

    api
      .get(
        `/students/subjects?syllabus=${syllabus}&classLevel=${classLevel}`
      )
      .then((res) => {
        setSubjects(res.data.subjects || []);
      });
  }, [syllabus, classLevel]);

  return (
    <div className="p-6 space-y-6 bg-white rounded shadow max-w-xl">

      {/* SYLLABUS */}
      <div>
        <h2 className="font-bold mb-2">Select Syllabus</h2>
        <div className="flex gap-2">
          {["kerala", "cbse"].map((s) => (
            <button
              key={s}
              onClick={() => {
                setSyllabus(s);
                setClassLevel(null);
                setSubjects([]);
              }}
              className={`px-4 py-2 border rounded ${
                syllabus === s ? "bg-blue-600 text-white" : ""
              }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* CLASS */}
      {syllabus && (
        <div>
          <h2 className="font-bold mb-2">Select Class</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "KG","1","2","3","4","5","6","7","8","9","10","11","12",
            ].map((cls) => (
              <button
                key={cls}
                onClick={() => setClassLevel(cls)}
                className={`px-3 py-1 border rounded ${
                  classLevel === cls ? "bg-green-600 text-white" : ""
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SUBJECTS */}
      {subjects.length > 0 && (
        <div>
          <h2 className="font-bold mb-2">Select Subjects</h2>
          <div className="space-y-2">
            {subjects.map((sub) => (
              <label key={sub} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={sub}
                  checked={selected.includes(sub)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelected([...selected, sub]);
                    } else {
                      setSelected(selected.filter((s) => s !== sub));
                    }
                  }}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* DEBUG */}
      {selected.length > 0 && (
        <pre className="bg-gray-100 p-2 text-sm">
          {JSON.stringify(selected, null, 2)}
        </pre>
      )}
    </div>
  );
}
