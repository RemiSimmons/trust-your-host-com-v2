"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { createConversation } from "@/app/actions/messages"
import { toast } from "sonner"
import { createBrowserClient } from "@/lib/supabase/client"

interface ContactHostButtonProps {
  propertyId: string
}

export function ContactHostButton({ propertyId }: ContactHostButtonProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleContact = async () => {
    const supabase = createBrowserClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      toast.error("Please log in to contact the host")
      router.push("/login")
      return
    }

    startTransition(async () => {
      const result = await createConversation(propertyId)

      if (result.error) {
        toast.error(result.error)
      } else if (result.conversationId) {
        router.push(`/inbox/${result.conversationId}`)
      }
    })
  }

  return (
    <Button variant="outline" className="gap-2 bg-transparent" onClick={handleContact} disabled={isPending}>
      <MessageSquare className="h-4 w-4" />
      {isPending ? "Starting chat..." : "Contact Host"}
    </Button>
  )
}
