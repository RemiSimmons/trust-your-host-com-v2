import { createServerClient } from "@/lib/supabase/server"
import type { Conversation, Message } from "@/lib/types"

export async function getConversations(): Promise<Conversation[]> {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  // Ideally we would do a complex join here, but for simplicity with the current schema
  // we might need to fetch and stitch. Or use a view.
  // Let's try to query directly with select.

  try {
    // Use separate .eq() filters combined with .or() to avoid string interpolation
    // This is safe because user.id comes from Supabase auth (server-verified UUID)
    const { data: conversations, error } = await supabase
      .from("conversations")
      .select(`
        *,
        property:properties(name, images),
        guest:profiles!conversations_guest_id_fkey(id, full_name, avatar_url),
        host:profiles!conversations_host_id_fkey(id, full_name, avatar_url),
        messages(content, created_at, read, sender_id)
      `)
      .or(`guest_id.eq.${user.id},host_id.eq.${user.id}`)
      .order("updated_at", { ascending: false })

    if (error || !conversations) {
      console.error("Error fetching conversations:", error)
      return []
    }

    // Process to match the Conversation interface
    return conversations.map((conv: any) => {
      const isGuest = conv.guest_id === user.id
      const otherUser = isGuest ? conv.host : conv.guest

      // Get the last message (sorting happens in JS if not limited in SQL,
      // but messages array from select might not be sorted.
      // Ideally we limit to 1 ordered desc in the join, but Supabase syntax is tricky for that.
      // We'll sort here.)
      const sortedMessages = conv.messages?.sort(
        (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      const lastMessage = sortedMessages?.[0]

      return {
        id: conv.id,
        guestId: conv.guest_id,
        hostId: conv.host_id,
        propertyId: conv.property_id,
        otherUser: {
          id: otherUser?.id || "unknown",
          name: otherUser?.full_name || "Unknown User",
          avatar: otherUser?.avatar_url || "/placeholder.svg",
        },
        property: {
          name: conv.property?.name || "Unknown Property",
          image: conv.property?.images?.[0] || "/placeholder.svg",
        },
        lastMessage: lastMessage
          ? {
              content: lastMessage.content,
              createdAt: lastMessage.created_at,
              read: lastMessage.read,
              senderId: lastMessage.sender_id,
            }
          : undefined,
        updatedAt: conv.updated_at,
      }
    })
  } catch (err) {
    console.error("Unexpected error fetching conversations:", err)
    return []
  }
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const supabase = await createServerClient()

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })

  if (error || !messages) return []

  return messages.map((msg: any) => ({
    id: msg.id,
    conversationId: msg.conversation_id,
    senderId: msg.sender_id,
    content: msg.content,
    read: msg.read,
    createdAt: msg.created_at,
  }))
}
