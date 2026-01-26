import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, Building, Calendar } from "lucide-react"

const kpis = [
  {
    title: "Total Revenue",
    value: "$1,234,567",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    description: "vs. last month",
  },
  {
    title: "Active Bookings",
    value: "3,456",
    change: "+12.5%",
    trend: "up",
    icon: Calendar,
    description: "Currently active",
  },
  {
    title: "Platform Users",
    value: "12,345",
    change: "+8.3%",
    trend: "up",
    icon: Users,
    description: "Total registered",
  },
  {
    title: "Listed Properties",
    value: "4,521",
    change: "-2.1%",
    trend: "down",
    icon: Building,
    description: "Active listings",
  },
]

export function PlatformKPICards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={`flex items-center ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {kpi.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {kpi.change}
              </span>
              {kpi.description}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
