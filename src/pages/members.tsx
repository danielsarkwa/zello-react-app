import { UserPlus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import EmptyState from "@/components/empty-state"
import WorkspaceMemberList from "@/components/project-list"
import { Button } from "@/components/ui/button"
import { CardContainer } from "@/components/ui/card-container"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"

export default function MembersPage() {
  const { toast } = useToast()
  const members = []

  const handleOnAddMember = () => {
    toast({
      title: "🫣Ooops! Feature not implemented",
      description: "This is just a demo, and it's not functioning yet.",
      duration: 1500
    })
  }

  return (
    <>
      <Header />
      <motion.main
        className="p-5 flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full flex flex-col">
          <AnimatePresence mode="wait">
            {members.length === 0 ? (
              <motion.div
                key="empty"
                className="flex-1 flex justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardContainer>
                  <EmptyState
                    title="No members found for this workspace"
                    description="Add your first team member."
                    button={
                      <Button onClick={handleOnAddMember}>
                        <UserPlus />
                        Add Member
                      </Button>
                    }
                  />
                </CardContainer>
              </motion.div>
            ) : (
              <motion.div
                key="members"
                className="flex-1 flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex justify-end gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Button onClick={handleOnAddMember}>
                    <UserPlus />
                    Add Member
                  </Button>
                </motion.div>
                <WorkspaceMemberList projects={members} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
    </>
  )
}
