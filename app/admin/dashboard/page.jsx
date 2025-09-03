"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthProvider";
import Link from "next/link";
import { getCookie } from "@/utils/cookies";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check if we have both user auth and admin cookie
    const adminSession = getCookie("admin_session");
    // console.log("Admin dashboard - User:", user);

    if (!loading) {
      if (user && (user?.isAdmin === true || adminSession)) {
        setAuthorized(true);
      } else {
        // Redirect if not admin
        router.push("/auth/login");
      }
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If we have a user and they're authorized, show the dashboard
  if (user && authorized) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome, {user.displayName || user.email}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                href="/admin/add-products"
                className="block w-full bg-indigo-600 text-white px-4 py-2 rounded text-center hover:bg-indigo-700 transition"
              >
                Add New Product
              </Link>
              <Link
                href="/products"
                className="block w-full bg-gray-200 text-gray-800 px-4 py-2 rounded text-center hover:bg-gray-300 transition"
              >
                View All Products
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <div className="space-y-4">
              <Link
                href="/profile"
                className="block w-full bg-gray-200 text-gray-800 px-4 py-2 rounded text-center hover:bg-gray-300 transition"
              >
                Edit Profile
              </Link>
              <button
                onClick={() => router.push("/")}
                className="block w-full bg-gray-200 text-gray-800 px-4 py-2 rounded text-center hover:bg-gray-300 transition"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // This should not be visible due to the redirect, but just in case
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Loading Admin Dashboard...</h1>
    </div>
  );
}
