import { create } from "zustand"

interface AuthState {
  isAuthenticated: boolean
  user: null | { id: string; email: string; name: string }
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

// when the app load get the user details from the local storage
// and set the user to the state

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: true,
  user: null,
  login: async (email, password) => {
    // Implement your login logic here
    // Call your API and store the token
    set({ isAuthenticated: true, user: { id: "1", email, name: "John Doe" } })
  },
  logout: () => {
    // Implement your logout logic here
    // Clear the token and user data
    set({ isAuthenticated: false, user: null })
  }
}))
