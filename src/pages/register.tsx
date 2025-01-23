import { RegisterForm } from "@/components/register-form"
import { Link } from "react-router"
import logo from "@/assets/images/logo-zello.png"
import image from "@/assets/images/register.jpg"

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-xs flex flex-col items-center justify-center gap-16">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <img src={logo} alt="Zello Logo" className="w-11 h-11" />
            Zello App
          </Link>

          <RegisterForm />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={image}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
