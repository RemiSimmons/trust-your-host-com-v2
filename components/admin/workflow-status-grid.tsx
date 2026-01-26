"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, MessageSquare, Calendar, Package, Wrench, DollarSign } from "lucide-react"
import Link from "next/link"

const workflows = [
  {
    id: "1",
    name: "Guest Messaging",
    icon: MessageSquare,
    status: "active",
    version: "v2",
    successRate: 98.5,
    tasksCompleted: 1247,
  },
  {
    id: "2",
    name: "Smart Scheduling",
    icon: Calendar,
    status: "active",
    version: "v2",
    successRate: 95.2,
    tasksCompleted: 834,
  },
  {
    id: "3",
    name: "Inventory Management",
    icon: Package,
    status: "active",
    version: "v2",
    successRate: 92.8,
    tasksCompleted: 456,
  },
  {
    id: "4",
    name: "Vendor Management",
    icon: Wrench,
    status: "active",
    version: "v2",
    successRate: 97.1,
    tasksCompleted: 623,
  },
  {
    id: "5",
    name: "Issue Resolution AI",
    icon: Bot,
    status: "active",
    version: "v3",
    successRate: 89.3,
    tasksCompleted: 342,
  },
  {
    id: "6",
    name: "Dynamic Pricing",
    icon: DollarSign,
    status: "active",
    version: "v2",
    successRate: 100,
    tasksCompleted: 2341,
  },
]

export function WorkflowStatusGrid() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Workflows</CardTitle>
        <CardDescription>Monitor automated workflow performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <workflow.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{workflow.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    {workflow.version}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {workflow.tasksCompleted} tasks • {workflow.successRate}% success
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/admin/workflows/${workflow.id}`}>Configure</Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
