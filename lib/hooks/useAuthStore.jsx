"use client";
import { useAuth } from "@/lib/AuthProvider";
import { useCallback } from "react";

/**
 * A custom hook that provides authentication state and methods from AuthProvider only
 */
export const useAuthStore = () => {
  const { user, login, signup, logout, loading, updateProfile } = useAuth();

  // Enhanced logout function
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }, [logout]);

  // Enhanced update profile function
  const handleUpdateProfile = useCallback(
    async (userData) => {
      try {
        await updateProfile(userData);
      } catch (error) {
        console.error("Update profile error:", error);
        throw error;
      }
    },
    [updateProfile]
  );

  return {
    user,
    loading,
    login,
    signup,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
  };
};
