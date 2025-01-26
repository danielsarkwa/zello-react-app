import { motion } from "framer-motion"
import { RegisterForm } from "@/components/register-form"
import { Link } from "react-router"
import logo from "@/assets/images/logo-zello.png"
import image from "@/assets/images/register.jpg"

export default function RegisterPage() {
  return (
    <motion.div
      className="grid min-h-svh lg:grid-cols-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="max-w-xs flex flex-col items-center justify-center gap-16">
          <motion.div
            className="relative hidden lg:block"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link to="/" className="flex items-center gap-2 font-medium">
              <img src={logo} alt="Zello Logo" className="w-11 h-11" />
              Zello App
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <RegisterForm />
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="relative hidden bg-muted lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <img
          src={image}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </motion.div>
    </motion.div>
  )
}
