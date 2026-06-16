
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import MentorOnboardingForm from "@/components/MentorOnboardingForm";
import Loader from "@/components/Loader";
import MentorOnboardingDetails from "@/components/MentorOnboardingDetails";

type DashboardData = {
  isOnboarded: boolean;
  mentorOnboarding?: {
    syllabus: string;
    classLevel: string[];
    subjects: string[];
    experience: string;
    classes?: string[];
    
  };
};


export default function MentorOnboardingPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await api.get("/mentors/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // 🔄 Proper loader
  if (loading) {
    return <Loader />;
  }

  // 🛡️ Safety check
  if (!data) {
    return <p className="text-red-500">Failed to load data</p>;
  }

  // ✅ ALREADY ONBOARDED → DETAILS ONLY
 if (data.isOnboarded && data.mentorOnboarding) {
  return (
    <MentorOnboardingDetails
      data={{
        syllabus: data.mentorOnboarding.syllabus,
        classLevels: data.mentorOnboarding.classes, // 🔥 MAIN FIX
        subjects: data.mentorOnboarding.subjects,
        experience: data.mentorOnboarding.experience,
      }}
    />
  );
}     
  // ❗ FIRST TIME ONLY  
  return <MentorOnboardingForm />;
}
