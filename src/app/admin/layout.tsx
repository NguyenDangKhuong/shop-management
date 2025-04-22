import { auth } from "@/auth/auth"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  // const session = await auth()

  // if (!session || session.user.role !== "admin") {
  //   redirect("/login")
  // }

  return (
    {children}
  )
}

export default AdminLayout