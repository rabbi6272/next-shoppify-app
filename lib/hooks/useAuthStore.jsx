"use client";
import { useAuth } from "@/lib/AuthProvider";
import { useUserStore } from "@/lib/store/store";
import { useCallback } from "react";

/**
 * A custom hook that combines Firebase Auth context with Zustand store
 * This provides a unified API for accessing authentication state
 */
export const useAuthStore = () => {
  // Get auth methods from AuthContext
  const { user, login, signup, logout, loading } = useAuth();

  // Get user state and methods from Zustand store
  const {
    user: storeUser,
    isAuthenticated,
    role,
    isAdmin,
    updateUserProfile,
  } = useUserStore();

  // Enhanced logout function that ensures both context and store are cleared
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
      // Update the store
      updateUserProfile(userData);
      // NOTE: If you need to update Firebase profile, you would add that logic here
      // This function could be extended to update Firestore user document too
    },
    [updateUserProfile]
  );

  // Return the combined API
  return {
    // Auth state
    user: user || storeUser, // Prefer context user, fall back to store
    isAuthenticated,
    role,
    isAdmin,
    loading,

    // Auth methods
    login,
    signup,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
  };
};
