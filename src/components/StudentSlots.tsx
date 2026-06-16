"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function StudentSlots({ mentorId }: { mentorId: string }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSlots = async () => {
    try {
      console.log("Calling API with mentorId:", mentorId);

      const res = await api.get(`/slots/available/${mentorId}`);

      console.log("Slots received:", res.data);

      setSlots(res.data);
    } catch (error) {
      console.error("LOAD SLOT ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!mentorId) {
      setLoading(false);
      return;
    }

    loadSlots();
  }, [mentorId]);

  const bookSlot = async (id: string) => {
    try {
      await api.patch(`/slots/${id}/book`);
      alert("Slot booked successfully");
      loadSlots(); // refresh after booking
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    }
  };

  if (loading) return <p className="p-6">Loading slots...</p>;

  if (slots.length === 0)
    return <p className="p-6">No available slots.</p>;

  return (
    <div className="p-6 space-y-4">
      {slots.map((slot) => (
        <div
          key={slot._id}
          className="border p-4 rounded flex justify-between items-center"
        >
          <div>
            <b>{slot.date}</b> | {slot.startTime} - {slot.endTime}
          </div>

          <button
            onClick={() => bookSlot(slot._id)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Book
          </button>
        </div>
      ))}
    </div>
  );
}