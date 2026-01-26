"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { Message } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { sendMessage } from "@/app/actions/messages"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { toast } from "sonner"

interface ChatWindowProps {
  conversationId: string
  initialMessages: Message[]
  currentUserId: string
}

export function ChatWindow({ conversationId, initialMessages, currentUserId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Sync with server updates (when revalidated)
  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    const content = newMessage.trim()
    setNewMessage("") // Clear input immediately
    setIsSending(true)

    // Optimistic update
    const optimisticMsg: Message = {
      id: `temp-${Date.now()}`,
      conversationId,
      senderId: currentUserId,
      content,
      read: false,
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, optimisticMsg])

    const result = await sendMessage(conversationId, content)

    if (result.error) {
      toast.error(result.error)
      // Rollback
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id))
      setNewMessage(content) // Restore text
    }

    setIsSending(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend(e)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId
          return (
            <div key={msg.id} className={cn("flex w-full", isMe ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[75%] rounded-lg px-4 py-2 text-sm",
                  isMe
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none",
                )}
              >
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                <p
                  className={cn(
                    "text-[10px] mt-1 text-right opacity-70",
                    isMe ? "text-primary-foreground" : "text-muted-foreground",
                  )}
                >
                  {format(new Date(msg.createdAt), "h:mm a")}
                </p>
              </div>
            </div>
          )
        })}
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-8 text-sm">No messages yet. Say hello!</div>
        )}
      </div>
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSend} className="flex gap-2 items-end">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[50px] max-h-[150px] resize-none"
          />
          <Button type="submit" size="icon" disabled={isSending || !newMessage.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
