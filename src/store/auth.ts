// import { create } from "zustand"

// interface AuthState {
//   isAuthenticated: boolean
//   user: null | { id: string; email: string; name: string }
//   login: (email: string, password: string) => Promise<void>
//   logout: () => void
// }

// // when the app load get the user details from the local storage
// // and set the user to the state

// export const useAuth = create<AuthState>((set) => ({
//   isAuthenticated: false,
//   user: null,
//   login: async (email, password) => {
//     // Implement your login logic here
//     // Call your API and store the token
//     set({ isAuthenticated: true, user: { id: "1", email, name: "John Doe" } })
//   },
//   logout: () => {
//     // Implement your logout logic here
//     // Clear the token and user data
//     set({ isAuthenticated: false, user: null })
//   }
// }))

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LoginResponse } from '@/schemas/login'

interface AuthState {
  token: string | null
  expires: string | null
  accessLevel: string | null
  isAuthenticated: boolean
  setAuth: (response: LoginResponse) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      expires: null,
      accessLevel: null,
      isAuthenticated: false,
      setAuth: (response) => set({
        token: response.token,
        expires: response.expires,
        accessLevel: response.accessLevel,
        isAuthenticated: true
      }),
      clearAuth: () => set({
        token: null,
        expires: null,
        accessLevel: null,
        isAuthenticated: false
      })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        expires: state.expires,
        accessLevel: state.accessLevel,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)