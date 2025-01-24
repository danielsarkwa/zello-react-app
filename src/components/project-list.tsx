import { ProjectWithDetails } from "@/schemas/project"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { format } from "date-fns"
import { useNavigate } from "react-router"
import { getStatusText, ProjectStatusEnum } from "@/types/project-status"

interface ProjectListProps {
  projects: ProjectWithDetails[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  if (!projects.length) {
    return <div className="text-center p-4 text-muted-foreground">No projects found</div>
  }
  const navigate = useNavigate()

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Lists</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className="cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{project.lists?.length || 0} Lists</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">High</Badge>
              </TableCell>
              <TableCell>
                {project.startDate ? format(new Date(project.startDate), "MMM dd") : "No date"}
              </TableCell>
              <TableCell>
                {project.endDate ? format(new Date(project.endDate), "MMM dd") : "No date"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Badge
                    variant="outline"
                    className={`${
                      project.status === ProjectStatusEnum.Completed
                        ? "bg-green-100 text-green-700"
                        : project.status === ProjectStatusEnum.InProgress
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {getStatusText(project.status)}
                  </Badge>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
