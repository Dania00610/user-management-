import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  accessToken: string;
  expiresIn: number | null;
  setAccessToken: (token: string, expiresIn: number) => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      accessToken: "",
      expiresIn: null,
      setAccessToken: (token, expiresIn) =>
        set({ accessToken: token, expiresIn }),
      logout: () => set({ accessToken: "", expiresIn: null }),
    }),
    {
      name: "session-storage",
    }
  )
);



