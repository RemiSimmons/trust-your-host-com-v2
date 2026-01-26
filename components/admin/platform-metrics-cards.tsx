import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building, CreditCard, TrendingUp } from "lucide-react"

const metrics = [
  {
    title: "Total Users",
    value: "12,345",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Properties",
    value: "4,521",
    change: "+8.2%",
    icon: Building,
    color: "text-green-600",
  },
  {
    title: "Monthly Revenue",
    value: "$125,430",
    change: "+15.3%",
    icon: CreditCard,
    color: "text-purple-600",
  },
  {
    title: "Workflow Success",
    value: "94.8%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

export function PlatformMetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{metric.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
