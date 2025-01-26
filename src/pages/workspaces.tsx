import { motion } from "framer-motion"
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
    <motion.div
      className="w-full h-full flex justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute top-6 left-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Link to="/" className="flex items-center gap-2 font-medium">
          <img src={logo} alt="Zello Logo" className="w-11 h-11" />
          Zello App
        </Link>
      </motion.div>
      <motion.div
        className="flex flex-col justify-center items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h1 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Choose a workspace to continue
          </h1>
          {userProfile && (
            <p className="leading-7 text-muted-foreground">
              These are workspaces you can access with your account{" "}
              <strong>@{userProfile.username}</strong>
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <WorkspaceList />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button size="lg" onClick={handleCreate}>
            <Grid2x2Plus /> Create New Workspace
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
