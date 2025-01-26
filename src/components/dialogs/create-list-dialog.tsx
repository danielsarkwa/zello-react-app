import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { createList } from "@/feature/project-management"
import { createListSchema, CreateListValues } from "@/schemas/task-list"
import { ListPlus, Loader2 } from "lucide-react"

export default function CreateListDialog({
  projectId,
  buttonVariant
}: {
  projectId: string
  buttonVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null
}) {
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = createList(projectId)

  const form = useForm<CreateListValues>({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = async (values: CreateListValues) => {
    mutate(values)

    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant={buttonVariant}>
          <ListPlus className="mr-2" /> Create New List
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New List</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: Todo or In Progress" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : <ListPlus />}
                Create list
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
