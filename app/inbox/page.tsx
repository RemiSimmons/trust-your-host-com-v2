import { MessageSquare } from "lucide-react"

export default function InboxPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
      <div className="bg-muted p-4 rounded-full mb-4">
        <MessageSquare className="h-8 w-8" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
      <p>Choose a message from the sidebar to start chatting</p>

      {/* Mobile-only hint */}
      <p className="md:hidden mt-4 text-sm text-balance">(On mobile, tap the menu to see conversations)</p>
    </div>
  )
}
