"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Mentor = {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
};

type DemoForm = {
  studentName: string;
  studentEmail: string; // ✅ ADDED
  phone: string;
  studentClass: string;
  subject: string;
  board: "Kerala" | "CBSE" | "";
  mentorId: string;
};

export default function DemoBookingPage() {
  const [loading, setLoading] = useState(false);
  const [mentorsLoading, setMentorsLoading] = useState(false);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const [form, setForm] = useState<DemoForm>({
    studentName: "",
    studentEmail: "", // ✅ ADDED
    phone: "",
    studentClass: "",
    subject: "",
    board: "",
    mentorId: "",
  });

  // Fetch mentors
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setMentorsLoading(true);

        const res = await fetch("http://localhost:7000/api/users/mentors/all");
        const data = await res.json();

        if (!res.ok) {
          toast.error(data?.message || "Failed to load mentors");
          return;
        }

        setMentors(data || []);
      } catch (error) {
        console.log("Mentor fetch error:", error);
        toast.error("Mentor fetch failed");
      } finally {
        setMentorsLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMentorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mentorId = e.target.value;

    setForm((prev) => ({ ...prev, mentorId }));

    const mentorObj = mentors.find((m) => m._id === mentorId) || null;
    setSelectedMentor(mentorObj);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ validation (email added)
    if (
      !form.studentName ||
      !form.studentEmail ||
      !form.phone ||
      !form.studentClass ||
      !form.subject ||
      !form.board ||
      !form.mentorId
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:7000/api/demo/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Demo booking failed");
        return;
      }

      toast.success("✅ Demo request submitted successfully!");

      // reset form
      setForm({
        studentName: "",
        studentEmail: "",
        phone: "",
        studentClass: "",
        subject: "",
        board: "",
        mentorId: "",
      });

      setSelectedMentor(null);
    } catch (error) {
      console.log("Demo booking error:", error);
      toast.error("❌ Backend error / CORS error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-xl rounded-2xl bg-white shadow border p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Book a Demo Class
        </h1>

        <p className="text-gray-500 mt-2">
          Fill details and select a mentor for demo session.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              name="studentName"
              value={form.studentName}
              onChange={handleChange}
              placeholder="Enter student name"
              className="mt-1 w-full rounded-xl border px-4 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="studentEmail"
              value={form.studentEmail}
              onChange={handleChange}
              placeholder="Enter student email"
              className="mt-1 w-full rounded-xl border px-4 py-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="mt-1 w-full rounded-xl border px-4 py-2"
            />
          </div>

          {/* Class */}
          <div>
            <label className="text-sm font-medium text-gray-700">Class</label>
            <input
              name="studentClass"
              value={form.studentClass}
              onChange={handleChange}
              placeholder="Ex: 6"
              className="mt-1 w-full rounded-xl border px-4 py-2"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm font-medium text-gray-700">Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Ex: Math"
              className="mt-1 w-full rounded-xl border px-4 py-2"
            />
          </div>

          {/* Board */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Syllabus / Board
            </label>
            <select
              name="board"
              value={form.board}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-4 py-2"
            >
              <option value="">-- Select Board --</option>
              <option value="Kerala">Kerala</option>
              <option value="CBSE">CBSE</option>
            </select>
          </div>

          {/* Mentor */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Select Mentor
            </label>

            <select
              name="mentorId"
              value={form.mentorId}
              onChange={handleMentorSelect}
              disabled={mentorsLoading}
              className="mt-1 w-full rounded-xl border px-4 py-2"
            >
              <option value="">
                {mentorsLoading ? "Loading mentors..." : "-- Select Mentor --"}
              </option>

              {mentors.map((mentor) => (
                <option key={mentor._id} value={mentor._id}>
                  {mentor.name}
                </option>
              ))}
            </select>

            {selectedMentor && (
              <div className="mt-4 rounded-xl border bg-gray-50 p-4 text-sm">
                <p className="font-bold">{selectedMentor.name}</p>
                {selectedMentor.email && <p>Email: {selectedMentor.email}</p>}
                {selectedMentor.phone && <p>Phone: {selectedMentor.phone}</p>}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-secondary text-white py-3 font-bold"
          >
            {loading ? "Submitting..." : "Book Demo"}
          </button>
        </form>
      </div>
    </div>
  );
}
