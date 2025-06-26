// src/stores/useAuthStore.ts - Auth Store Implementation
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/services/types/user.types";

// Use the existing AuthUser interface from services

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

interface AuthActions {
  login: (user: AuthUser, token?: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<AuthUser>) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: (user: AuthUser, token?: string) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          token: token || null,
        });

        // Store token in localStorage if provided
        if (token && typeof window !== "undefined") {
          localStorage.setItem("auth_token", token);
        }
      },

      logout: () => {
        set(initialState);

        // Clear token from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("refresh_token");
        }
      },

      updateUser: (userData: Partial<AuthUser>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      clearAuth: () => {
        set(initialState);
      },
    }),
    {
      name: "auth-storage", // Key in localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }), // Only persist these fields
    }
  )
);
