import { redirect } from "next/navigation"

export default function GuestProfilePage() {
  redirect("/dashboard/settings")
}
