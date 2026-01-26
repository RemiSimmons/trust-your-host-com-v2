import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { BookingTrendsChart } from "@/components/admin/booking-trends-chart"
import { UserGrowthChart } from "@/components/admin/user-growth-chart"
import { TopPropertiesTable } from "@/components/admin/top-properties-table"
import { PlatformKPICards } from "@/components/admin/platform-kpi-cards"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive platform insights and business intelligence</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <PlatformKPICards />

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <RevenueChart />
          <TopPropertiesTable />
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <BookingTrendsChart />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <UserGrowthChart />
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <TopPropertiesTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
