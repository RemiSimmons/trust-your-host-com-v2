import { WorkflowStatusGrid } from "@/components/admin/workflow-status-grid"
import { PlatformMetricsCards } from "@/components/admin/platform-metrics-cards"
import { RecentTasksList } from "@/components/admin/recent-tasks-list"
import { SystemHealthIndicator } from "@/components/admin/system-health-indicator"

// Force dynamic rendering - admin pages should never be pre-rendered
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage platform operations, workflows, and user activities</p>
      </div>

      <SystemHealthIndicator />

      <PlatformMetricsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <WorkflowStatusGrid />
        <RecentTasksList />
      </div>
    </div>
  )
}
