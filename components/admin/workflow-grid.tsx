"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Bot,
  MessageSquare,
  Calendar,
  Package,
  Wrench,
  DollarSign,
  BarChart,
  Building,
  Settings,
  Play,
  Pause,
} from "lucide-react"
import Link from "next/link"

const workflows = [
  {
    id: "1",
    name: "Automated Guest Messaging",
    description: "Smart Communication Engine",
    icon: MessageSquare,
    status: "active",
    version: "v2",
    successRate: 98.5,
    tasksCompleted: 1247,
    lastRun: "2 minutes ago",
    details: "Auto-respond to common inquiries. Welcome messages sent automatically. Pre-arrival instructions.",
  },
  {
    id: "2",
    name: "Smart Scheduling",
    description: "Automated Operations Coordinator",
    icon: Calendar,
    status: "active",
    version: "v2",
    successRate: 95.2,
    tasksCompleted: 834,
    lastRun: "5 minutes ago",
    details: "Auto-schedule cleaning after checkout. Coordinate maintenance appointments. Schedule vendor services.",
  },
  {
    id: "3",
    name: "Inventory Management",
    description: "Supply Tracking & Auto-Reordering",
    icon: Package,
    status: "active",
    version: "v2",
    successRate: 92.8,
    tasksCompleted: 456,
    lastRun: "15 minutes ago",
    details: "Track inventory levels. Automatic reorder when low. Preferred vendor integration.",
  },
  {
    id: "4",
    name: "Vendor Management",
    description: "Preferred Service Provider Network",
    icon: Wrench,
    status: "active",
    version: "v2",
    successRate: 97.1,
    tasksCompleted: 623,
    lastRun: "8 minutes ago",
    details: "Store preferred vendor contacts. Quick contact from admin panel. Service history tracking.",
  },
  {
    id: "5",
    name: "Issue Resolution AI Agent",
    description: "Smart Problem Solver",
    icon: Bot,
    status: "active",
    version: "v3",
    successRate: 89.3,
    tasksCompleted: 342,
    lastRun: "3 minutes ago",
    details: "AI diagnoses problem severity. Send self-help or schedule vendor. Guest satisfaction follow-up.",
  },
  {
    id: "6",
    name: "Dynamic Pricing Engine",
    description: "Revenue Optimization",
    icon: DollarSign,
    status: "active",
    version: "v2",
    successRate: 100,
    tasksCompleted: 2341,
    lastRun: "1 minute ago",
    details: "AI-powered rate adjustments. Based on demand, events, seasonality. Revenue forecasting.",
  },
  {
    id: "7",
    name: "Occupancy Analytics",
    description: "Business Intelligence Dashboard",
    icon: BarChart,
    status: "active",
    version: "v2",
    successRate: 96.7,
    tasksCompleted: 1890,
    lastRun: "10 minutes ago",
    details: "Booking patterns and trends. Revenue analytics. Seasonal forecasting. ROI tracking.",
  },
  {
    id: "8",
    name: "Multi-Property Management",
    description: "Scale Your Business",
    icon: Building,
    status: "paused",
    version: "v3",
    successRate: 94.1,
    tasksCompleted: 567,
    lastRun: "2 hours ago",
    details: "Manage multiple properties. Cross-property calendar sync. Consolidated financials.",
  },
]

interface WorkflowGridProps {
  filter: string
}

export function WorkflowGrid({ filter }: WorkflowGridProps) {
  const filteredWorkflows = workflows.filter((workflow) => {
    if (filter === "all") return true
    return workflow.status === filter
  })

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {filteredWorkflows.map((workflow) => (
        <Card key={workflow.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <workflow.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    {workflow.name}
                    <Badge variant="secondary" className="text-xs">
                      {workflow.version}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{workflow.description}</CardDescription>
                </div>
              </div>
              <Switch checked={workflow.status === "active"} />
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <p className="text-sm text-muted-foreground">{workflow.details}</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Success Rate</span>
                <span className="font-medium">{workflow.successRate}%</span>
              </div>
              <Progress value={workflow.successRate} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Tasks Completed</p>
                <p className="font-semibold">{workflow.tasksCompleted.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Run</p>
                <p className="font-semibold">{workflow.lastRun}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                <Link href={`/admin/workflows/${workflow.id}`}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                {workflow.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
