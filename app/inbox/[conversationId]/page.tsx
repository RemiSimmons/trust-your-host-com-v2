import { getMessages } from "@/lib/db/messages"
import { ChatWindow } from "@/components/inbox/chat-window"
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface ChatPageProps {
  params: {
    conversationId: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const messages = await getMessages(params.conversationId)

  return (
    <div className="flex flex-col h-full">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center p-4 border-b">
        <Link href="/inbox" className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <span className="font-semibold">Chat</span>
      </div>

      <ChatWindow conversationId={params.conversationId} initialMessages={messages} currentUserId={user.id} />
    </div>
  )
}
