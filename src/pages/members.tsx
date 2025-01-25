import { UserPlus } from "lucide-react"
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
      <main className="p-5 flex-1">
        <div className="w-full h-full flex flex-col">
          {members.length === 0 ? (
            <div className="flex-1 flex justify-center items-center">
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
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-end gap-4">
                <Button onClick={handleOnAddMember}>
                  <UserPlus />
                  Add Member
                </Button>
              </div>
              <WorkspaceMemberList projects={members} />
            </div>
          )}
        </div>
      </main>
    </>
  )
}
