import { useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Grid2x2Plus, Loader2 } from "lucide-react"

import logo from "@/assets/images/logo-zello.png"

import { Link, useNavigate } from "react-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createWorkspaceSchema, CreateWorkspaceValues } from "@/schemas/workspace"
import { createWorkspace } from "@/feature/workspace-management"
import { useToast } from "@/hooks/use-toast"

export default function CreateWorkspacePage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { mutate, isSuccess, isPending } = createWorkspace()

  const form = useForm<CreateWorkspaceValues>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = (values: CreateWorkspaceValues) => {
    mutate(values)
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Workspace created successfully",
        className:
          "bg-green-500 text-white border-green-500 dark:bg-green-700 dark:text-white dark:border-green-700"
      })

      navigate("/load-workspaces")
    }
  }, [isSuccess])

  return (
    <div className="w-full h-full flex justify-center items-center p-6">
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex items-center gap-2 font-medium">
          <img src={logo} alt="Zello Logo" className="w-11 h-11" />
          Zello App
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-6">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Create a new workspace</CardTitle>
            <CardDescription>
              Workspaces are where your team organizes projects, tasks, and members
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace name</FormLabel>
                      <FormControl>
                        <Input placeholder="eg: personal space" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex justify-end gap-4">
                <Button size="lg" variant="ghost" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button size="lg" disabled={isPending}>
                  {isPending ? <Loader2 className="animate-spin" /> : <Grid2x2Plus />}
                  Create workspace
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}
