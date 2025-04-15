import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  expiresIn: number | null;
  isLoggedIn: boolean;
  login: (token: string, expiresIn: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      expiresIn: null,
      isLoggedIn: false,
      login: (token, expiresIn) =>
        set({
          accessToken: token,
          expiresIn: expiresIn,
          isLoggedIn: true,
        }),
      logout: () =>
        set({
          accessToken: null,
          expiresIn: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: 'auth-storage', 
    }
  )
);


