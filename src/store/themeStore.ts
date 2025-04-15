import { create } from "zustand";
import { persist } from "zustand/middleware";


type ThemeState = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      darkMode: false,
      toggleTheme: () => set({ darkMode: !get().darkMode }),
    }),
    { name: "theme-storage" }
  )
);


export {useThemeStore}