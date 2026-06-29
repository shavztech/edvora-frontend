"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "@/lib/auth";

export default function Protected({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: string[];
}) {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.replace("/auth/login");
    } else if (!roles.includes(user.role)) {
      if (user.role === "admin" || user.role === "super_admin") {
        router.replace("/admin/dashboard");
      } else if (user.role === "student") {
        router.replace("/student/dashboard");
      } else if (user.role === "mentor") {
        router.replace("/mentor/dashboard");
      } else {
        router.replace("/auth/login");
      }
    }
  }, [router, roles]);

  return <>{children}</>;
}
