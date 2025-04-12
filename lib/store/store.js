import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
