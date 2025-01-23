import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router"
import { Workspace } from "@/schemas/workspace"
import { useWorkspaceStore } from "@/store/workspace"

export default function WorkspaceListItem({ workspace }: { workspace: Workspace }) {
  const setCurrentWorkspace = useWorkspaceStore((state) => state.setCurrentWorkspace)
  const navigate = useNavigate()

  const handleClick = () => {
    setCurrentWorkspace(workspace)
    navigate("/")
  }

  return (
    <div
      className="flex items-center justify-between rounded-lg p-5 cursor-pointer
       dark:bg-slate-700/20 bg-slate-500/10 hover:bg-slate-400/20 dark:hover:bg-slate-700/30 transition-all duration-100"
      onClick={handleClick}
    >
      <p className="leading-7 text-lg tracking-tight"># {workspace.name}</p>
      <ChevronRight />
    </div>
  )
}
