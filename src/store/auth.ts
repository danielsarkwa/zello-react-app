import { create } from "zustand"
import { persist } from "zustand/middleware"
import { LoginResponse } from "@/schemas/login"
import { User } from "@/schemas/user"

interface AuthState {
  token: string | null
  expires: string | null
  accessLevel: string | null
  isAuthenticated: boolean
  userProfile: User | null
  setAuth: (response: LoginResponse) => void
  setUserProfile: (profile: User) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      expires: null,
      accessLevel: null,
      isAuthenticated: false,
      userProfile: null,
      setAuth: (response) =>
        set({
          token: response.token,
          expires: response.expires,
          accessLevel: response.accessLevel,
          isAuthenticated: true
        }),
      setUserProfile: (profile) =>
        set({
          userProfile: profile
        }),
      clearAuth: () =>
        set({
          token: null,
          expires: null,
          accessLevel: null,
          isAuthenticated: false,
          userProfile: null
        })
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        expires: state.expires,
        accessLevel: state.accessLevel,
        isAuthenticated: state.isAuthenticated,
        userProfile: state.userProfile
      })
    }
  )
)
