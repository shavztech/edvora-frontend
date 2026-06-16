"use client";

import { useParams } from "next/navigation";
import StudentSlots from "@/components/StudentSlots";

export default function Page() {
  const params = useParams();
  const mentorId = params?.mentorId as string;

  console.log("Mentor ID from route:", mentorId);

  if (!mentorId) {
    return <div className="p-6">Mentor not found</div>;
  }

  return <StudentSlots mentorId={mentorId} />;
}