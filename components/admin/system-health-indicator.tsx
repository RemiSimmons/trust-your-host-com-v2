import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle } from "lucide-react"

export function SystemHealthIndicator() {
  const systemStatus = "operational" // Mock: Replace with actual system health check

  return (
    <Card className="border-green-200 bg-green-50/50">
      <CardContent className="flex items-center gap-3 py-4">
        {systemStatus === "operational" ? (
          <>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">All Systems Operational</p>
              <p className="text-sm text-green-700">All workflows running normally. No issues detected.</p>
            </div>
          </>
        ) : (
          <>
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">System Degraded</p>
              <p className="text-sm text-yellow-700">Some workflows experiencing delays. Monitoring in progress.</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
