import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      role: null,

      // Set the entire user object
      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
          role: user?.role || null,
        });
      },

      // Clear the user state on logout
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
          role: null,
        }),

      // Check if user is admin
      isAdmin: () => {
        const role = get().role;
        return role === "admin" || isAdmin === true;
      },

      // Update user profile
      updateUserProfile: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),
    }),
    {
      name: "user-storage", // unique name for localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        role: state.role,
      }),
    }
  )
);

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
