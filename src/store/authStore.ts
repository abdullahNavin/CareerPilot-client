import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/schemas/auth";

const AUTH_TOKEN_COOKIE = "cp_token";
const AUTH_ROLE_COOKIE = "cp_role";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function syncAuthCookies(user: User | null, token: string | null) {
  if (typeof document === "undefined") {
    return;
  }

  if (!user || !token) {
    document.cookie = `${AUTH_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
    document.cookie = `${AUTH_ROLE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
    return;
  }

  document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  document.cookie = `${AUTH_ROLE_COOKIE}=${encodeURIComponent(user.role)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        syncAuthCookies(user, token);
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        syncAuthCookies(null, null);
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        syncAuthCookies(state?.user ?? null, state?.token ?? null);
      },
    }
  )
);
