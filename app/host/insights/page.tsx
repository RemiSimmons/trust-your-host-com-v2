import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { RevenueChart, OccupancyChart } from "@/components/host/analytics-chart"

export default async function HostInsightsPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Insights</h1>
        <p className="text-muted-foreground">Analyze your property performance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <RevenueChart />
        </div>
        <div className="col-span-4 lg:col-span-3">
          <OccupancyChart />
        </div>
      </div>
    </div>
  )
}
