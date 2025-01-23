import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Workspace } from "../schemas/workspace"

interface WorkspaceStore {
  currentWorkspace: Workspace | null
  setCurrentWorkspace: (workspace: Workspace | null) => void
  clearWorkspace: () => void
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      currentWorkspace: null,
      setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
      clearWorkspace: () => {
        set({ currentWorkspace: null })
      }
    }),
    {
      name: "workspace-storage",
      partialize: (state) => ({ currentWorkspace: state.currentWorkspace })
    }
  )
)
