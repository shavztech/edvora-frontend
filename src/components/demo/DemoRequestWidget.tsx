"use client";

import React, { useState } from "react";
import api from "@/lib/api"; // Assuming axios instance is configured here

export default function DemoRequestWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "", // Or subject
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Assuming you mount the new backend route appropriately
      // For standalone testing, you might need to adjust the API endpoint path.
      const res = await api.post("/course-demo-requests", formData);
      if (res.data.success) {
        setSuccessMessage("Demo request submitted successfully!");
        setFormData({ name: "", email: "", phone: "", course: "", message: "" });
        setTimeout(() => setIsOpen(false), 3000);
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Demo Request Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
      >
        Demo Request
      </button>

      {/* Demo Request Modal / Form */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Request a Demo</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {successMessage ? (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
              {successMessage}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {errorMessage && (
                <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 234 567 890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course / Subject *</label>
                <input
                  type="text"
                  name="course"
                  required
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Eg. ReactJS, Node.js"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any specific topics you want to cover?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
