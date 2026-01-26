import type React from "react"
import { getConversations } from "@/lib/db/messages"
import { ConversationList } from "@/components/inbox/conversation-list"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"

export default async function InboxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const conversations = await getConversations()

  return (
    <div className="flex h-screen bg-background pt-16">
      {/* Sidebar */}
      <div className="w-full md:w-80 lg:w-96 border-r flex flex-col hidden md:flex">
        <div className="p-4 border-b font-semibold text-lg">Messages</div>
        <div className="flex-1 overflow-hidden">
          <ConversationList conversations={conversations} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  )
}
