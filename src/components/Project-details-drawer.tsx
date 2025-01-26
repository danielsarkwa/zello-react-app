import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ProjectWithDetails } from "@/schemas/project"
import { format } from "date-fns"
import { Calendar, NotebookTabs, Goal, Ellipsis } from "lucide-react"
import { Badge } from "./ui/badge"
import { Separator } from "@radix-ui/react-separator"
import { PROJECT_STATUS_OPTIONS } from "@/types/project-status"

interface ProjectDetailsDrawerProps {
  project: ProjectWithDetails
}

export default function ProjectDetailsDrawer({ project }: ProjectDetailsDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <NotebookTabs className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="space-y-6 pt-10">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg">{project.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
              </div>
              <div>
                <Button variant="ghost" size="icon">
                  <Ellipsis />
                </Button>
              </div>
            </div>

            <Separator className="border-[0.5px] text-muted-foreground" />

            <div className="flex flex-col gap-4">
              <div className="flex gap-20 items-center">
                <div className="text-sm w-20 font-medium">Status</div>
                <Badge
                  variant="secondary"
                  className="font-normal flex items-center gap-1 w-fit-content py-1.5"
                >
                  <Goal className="h-4 w-4" />
                  {PROJECT_STATUS_OPTIONS.find((option) => option.value === project.status)
                    ?.label || "Status unknown"}
                </Badge>
              </div>

              <div className="flex gap-20 items-center">
                <div className="text-sm w-20 font-medium">Start Date</div>
                <Badge
                  variant="secondary"
                  className="font-normal flex items-center gap-1 w-fit-content py-1.5"
                >
                  <Calendar className="h-4 w-4" />
                  {project.startDate
                    ? format(new Date(project.startDate), "MMM dd, yyyy")
                    : "No start date yet"}
                </Badge>
              </div>

              <div className="flex gap-20 items-center">
                <div className="text-sm w-20 font-medium">Deadline</div>
                <Badge
                  variant="secondary"
                  className="font-normal flex items-center gap-1 w-fit-content py-1.5"
                >
                  <Calendar className="h-4 w-4" />
                  {project.endDate
                    ? format(new Date(project.endDate), "MMM dd, yyyy")
                    : "No deadline set"}
                </Badge>
              </div>

              <div className="flex gap-20 items-center justify-start">
                <div className="text-sm w-20 font-medium">Created At</div>
                <Badge
                  variant="secondary"
                  className="font-normal flex items-center gap-1 w-fit-content py-1.5"
                >
                  <Calendar className="h-4 w-4" />
                  {format(new Date(project.createdDate), "MMM dd, yyyy")}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
