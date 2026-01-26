"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Conversation } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

interface ConversationListProps {
  conversations: Conversation[]
}

export function ConversationList({ conversations }: ConversationListProps) {
  const pathname = usePathname()

  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground text-sm">
        No messages yet. Contact a host to start chatting!
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 overflow-y-auto h-full p-2">
      {conversations.map((conv) => {
        const isActive = pathname === `/inbox/${conv.id}`
        return (
          <Link
            key={conv.id}
            href={`/inbox/${conv.id}`}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-accent",
              isActive ? "bg-accent" : "bg-transparent",
            )}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={conv.otherUser.avatar || "/placeholder.svg"} />
              <AvatarFallback>{conv.otherUser.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-semibold truncate text-sm">{conv.otherUser.name}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-xs font-medium text-muted-foreground mb-1 truncate">{conv.property.name}</p>
              <p
                className={cn(
                  "text-sm truncate",
                  conv.lastMessage && !conv.lastMessage.read && conv.lastMessage.senderId !== "me"
                    ? "font-bold text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {conv.lastMessage?.content || "Start a conversation"}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
