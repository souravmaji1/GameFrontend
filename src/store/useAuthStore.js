import { create } from "zustand";

const useAuthStore = create((set) => ({
  userData: null,
  isAuthenticated: false,
  setUserData: (data) => set({ userData: data, isAuthenticated: true }),
}));

export default useAuthStore;
