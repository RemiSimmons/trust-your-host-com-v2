import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkflowGrid } from "@/components/admin/workflow-grid"
import { WorkflowActivityChart } from "@/components/admin/workflow-activity-chart"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Workflows</h1>
          <p className="text-muted-foreground">Configure and monitor automated agentic workflows</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      <WorkflowActivityChart />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Workflows</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
          <TabsTrigger value="error">Errors</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <WorkflowGrid filter="all" />
        </TabsContent>

        <TabsContent value="active">
          <WorkflowGrid filter="active" />
        </TabsContent>

        <TabsContent value="paused">
          <WorkflowGrid filter="paused" />
        </TabsContent>

        <TabsContent value="error">
          <WorkflowGrid filter="error" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
