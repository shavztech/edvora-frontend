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
    if (!user || !roles.includes(user.role)) {
      router.replace("/auth/login");
    }
  }, []);

  return <>{children}</>;
}
