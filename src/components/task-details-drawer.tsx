import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { format } from "date-fns"
import { Calendar, NotebookTabs, Goal, Ellipsis } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TaskWithDetails } from "@/schemas/tasks"

interface TaskDetailsDrawerProps {
  task?: TaskWithDetails
}

export default function TaskDetailsDrawer({ task }: TaskDetailsDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <NotebookTabs className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="space-y-6 pt-10">task details</div>
      </SheetContent>
    </Sheet>
  )
}
