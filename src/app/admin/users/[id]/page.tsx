"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get(`/admin/users/${id}`);
        setUser(res.data.user);
      } catch (error) {
        console.error("USER_LOAD_ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl border p-8 shadow-sm">
          <h2 className="text-2xl font-black text-red-600">
            User Not Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">

        <h1 className="text-3xl font-black text-slate-900 mb-8">
          User Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-xs text-slate-400 uppercase font-bold mb-1">
              Name
            </p>
            <p className="text-lg font-bold text-slate-800">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400 uppercase font-bold mb-1">
              Email
            </p>
            <p className="text-lg font-bold text-slate-800">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400 uppercase font-bold mb-1">
              Role
            </p>
            <p className="text-lg font-bold text-slate-800">
              {user.role}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400 uppercase font-bold mb-1">
              Status
            </p>
            <p
              className={`text-lg font-bold ${
                user.isBlocked
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {user.isBlocked ? "Blocked" : "Active"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400 uppercase font-bold mb-1">
              Joined Date
            </p>
            <p className="text-lg font-bold text-slate-800">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
         
     <div>
  <p className="text-xs text-slate-400 uppercase font-bold mb-1">
    Syllabus
  </p>
  <p className="text-lg font-bold text-slate-800">
    {user.onboarding?.syllabus || "N/A"}
  </p>
</div>

        </div>

      </div>
    </div>
  );
}