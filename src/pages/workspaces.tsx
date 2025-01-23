import { Button } from "@/components/ui/button"
import WorkspaceList from "@/components/workspace-list"
import { useAuthStore } from "@/store/auth"
import { Grid2x2Plus } from "lucide-react"
import { Link, useNavigate } from "react-router"

import logo from "@/assets/images/logo-zello.png"

export default function WorkspacePage() {
  const { userProfile } = useAuthStore()
  const navigate = useNavigate()

  const handleCreate = () => {
    navigate("/create-workspace")
  }

  return (
    <div className="w-full h-full flex justify-center items-center p-6">
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex items-center gap-2 font-medium">
          <img src={logo} alt="Zello Logo" className="w-11 h-11" />
          Zello App
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="text-center">
          <h1 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Choose a workspace to continue
          </h1>
          {userProfile && (
            <p className="leading-7 text-muted-foreground">
              These are workspaces you can access with your account{" "}
              <strong>@{userProfile.username}</strong>
            </p>
          )}
        </div>

        <WorkspaceList />

        <Button size="lg" onClick={handleCreate}>
          <Grid2x2Plus /> Create New Workspace
        </Button>
      </div>
    </div>
  )
}
