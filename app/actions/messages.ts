"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const sendMessageSchema = z.object({
  conversationId: z.string().uuid(),
  content: z.string().min(1, "Message cannot be empty"),
})

export async function sendMessage(conversationId: string, content: string) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Unauthorized" }

  try {
    // 1. Verify user is part of conversation
    const { data: conversation, error: convError } = await supabase
      .from("conversations")
      .select("id")
      .eq("id", conversationId)
      .or(`guest_id.eq.${user.id},host_id.eq.${user.id}`)
      .single()

    if (convError || !conversation) return { error: "Conversation not found" }

    // 2. Insert message
    const { error: insertError } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content,
    })

    if (insertError) throw insertError

    // 3. Update conversation timestamp
    await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId)

    revalidatePath(`/inbox/${conversationId}`)
    revalidatePath("/inbox")
    return { success: true }
  } catch (error) {
    console.error("Error sending message:", error)
    return { error: "Failed to send message" }
  }
}

export async function createConversation(propertyId: string) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Unauthorized" }

  try {
    // Get host id
    const { data: property } = await supabase.from("properties").select("host_id").eq("id", propertyId).single()

    if (!property) return { error: "Property not found" }

    if (property.host_id === user.id) return { error: "Cannot message yourself" }

    // Check if exists
    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("property_id", propertyId)
      .eq("guest_id", user.id)
      .eq("host_id", property.host_id)
      .single()

    if (existing) return { success: true, conversationId: existing.id }

    // Create new
    const { data: newConv, error } = await supabase
      .from("conversations")
      .insert({
        property_id: propertyId,
        guest_id: user.id,
        host_id: property.host_id,
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath("/inbox")
    return { success: true, conversationId: newConv.id }
  } catch (error) {
    console.error("Error creating conversation:", error)
    return { error: "Failed to create conversation" }
  }
}
