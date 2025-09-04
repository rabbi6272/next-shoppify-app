"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/firebase";

import { toast } from "react-hot-toast";
import { Input } from "@material-tailwind/react";

import { UpdatePhotoUrlDialog } from "./updatePhotoUrl";
import { useAuthStore } from "@/lib/hooks/useAuthStore";

export default function UserProfilePage() {
  const { user, loading, updateProfile: updateUserProfile } = useAuthStore();

  // Initialize state with empty values first
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Update form values when user data becomes available
  React.useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Not Logged In</h1>
        <p>
          Please{" "}
          <Link href="/auth/login" className="text-indigo-500 ">
            log in
          </Link>{" "}
          to view your profile.
        </p>
      </div>
    );
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Name and email are required");
      return;
    }

    setUpdatingProfile(true);

    try {
      // Update display name if changed
      if (name !== user.displayName) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      // Update email if changed
      if (email !== user.email) {
        await updateEmail(auth.currentUser, email);
      }

      // Update user data in Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name,
        email,
        updatedAt: new Date().toISOString(),
      });

      // Update the user in our Zustand store
      updateUserProfile({ displayName: name, email });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setUpdatingPassword(true);

    try {
      // Re-authenticate user first (this is a simplified approach)
      // In a real app, you'd need to re-authenticate the user with their current credentials
      // before allowing password changes

      await updatePassword(auth.currentUser, newPassword);

      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      if (error.code === "auth/requires-recent-login") {
        toast.error(
          "Please log in again before changing your password for security reasons"
        );
      } else {
        toast.error(error.message || "Failed to update password");
      }
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center items-center mb-4">
          <div className="relative">
            {user?.photoURL ? (
              <CldImage
                src={user?.photoURL}
                alt={user?.displayName}
                width={200}
                height={200}
                crop="thumb"
                gravity="faces"
                className="rounded-full"
              />
            ) : (
              <svg
                className="h-[150px] w-[150px] rounded-full p-1.5 bg-gray-300 text-gray-400 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
            <div className="absolute bottom-1 right-1">
              <UpdatePhotoUrlDialog />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Profile Information
            </h2>

            <form onSubmit={handleProfileUpdate}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Input
                    variant="standard"
                    label="Full Name"
                    placeholder="John Doe"
                    type="text"
                    name="name"
                    id="name"
                    // className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Input
                    variant="standard"
                    label="Email Address"
                    placeholder="john.doe@example.com"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={updatingProfile}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700  ${
                      updatingProfile ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {updatingProfile ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Change Password
            </h2>

            <form onSubmit={handlePasswordChange}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Input
                    variant="standard"
                    label="Current Password"
                    type="password"
                    name="current-password"
                    id="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Input
                    variant="standard"
                    label="New Password"
                    type="password"
                    name="new-password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <Input
                    variant="standard"
                    label="Confirm New Password"
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={updatingPassword}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700  ${
                      updatingPassword ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {updatingPassword ? "Updating..." : "Change Password"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
