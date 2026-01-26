import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const tasks = [
  {
    id: "1",
    title: "Review reported property listing",
    type: "content_moderation",
    priority: "high",
    status: "pending",
    time: "5 min ago",
  },
  {
    id: "2",
    title: "User account verification failed",
    type: "user_report",
    priority: "medium",
    status: "in_progress",
    time: "12 min ago",
  },
  {
    id: "3",
    title: "Pricing workflow error detected",
    type: "workflow_error",
    priority: "urgent",
    status: "pending",
    time: "18 min ago",
  },
  {
    id: "4",
    title: "Manual booking review required",
    type: "manual_review",
    priority: "low",
    status: "pending",
    time: "1 hour ago",
  },
]

const priorityColors = {
  low: "bg-gray-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
}

export function RecentTasksList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Queue</CardTitle>
        <CardDescription>Pending administrative tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start justify-between rounded-lg border p-3">
            <div className="flex gap-3">
              <div
                className={`mt-1 h-2 w-2 rounded-full ${priorityColors[task.priority as keyof typeof priorityColors]}`}
              />
              <div className="space-y-1">
                <p className="font-medium text-sm">{task.title}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {task.type.replace("_", " ")}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{task.time}</span>
                </div>
              </div>
            </div>
            <Button size="sm" variant="ghost">
              Review
            </Button>
          </div>
        ))}
        <Button variant="outline" className="w-full bg-transparent" asChild>
          <a href="/admin/tasks">View All Tasks</a>
        </Button>
      </CardContent>
    </Card>
  )
}
