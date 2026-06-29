"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import LoginFormUI from "@/components/LoginFormUI";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      // Clear any old session data first
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const user = res.data?.user || res.data?.data?.user;
      const token = res.data?.token || res.data?.data?.token || res.data?.accessToken;

      if (!user || !token) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const role = user.role;

      if (role === "super_admin" || role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "student") {
        router.push("/student/dashboard");
      } else if (role === "mentor") {
        router.push("/mentor/dashboard");
      }
    } catch (err: any) {
      setError("Invalid email or password");
    }
  };

  return (
    <LoginFormUI
      email={email}
      onEmailChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      password={password}
      onPasswordChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      onSubmit={submit}
      error={error}
    />
  );
}
