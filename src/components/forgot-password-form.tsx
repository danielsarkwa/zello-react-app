import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router"
import { ArrowLeftCircle  } from "lucide-react"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot password</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to reset your password
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <Button type="submit" className="w-full">
          Reset password
        </Button>
      </div>
      <div className="text-center text-sm flex items-center justify-center gap-2">
        <ArrowLeftCircle className="size-4 inline-block" />
        <Link to="/auth/login" className="underline underline-offset-4">
          Back to login
        </Link>
      </div>
    </form>
  )
}
