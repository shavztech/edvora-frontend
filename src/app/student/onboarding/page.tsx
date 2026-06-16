"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import OnboardingForm from "./OnboardingForm";
import Loader from "@/components/Loader";
import OnboardingDetails from "@/components/OnboardingDetails";

type DashboardData = {
  isOnboarded: boolean;
  onboarding?: {
    syllabus: string;
    classLevel: string;
    subjects: string[];
    courseType: string;
  };
};

export default function StudentOnboardingPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await api.get("/students/dashboard");
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
  if (data.isOnboarded && data.onboarding) {
    return <OnboardingDetails data={data} />;
  }

  // ❗ FIRST TIME ONLY
  return <OnboardingForm />;
}
