import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Shield } from "lucide-react"

const stats = [
  {
    title: "Total Users",
    value: "12,345",
    change: "+234 this week",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Users",
    value: "8,921",
    change: "72% activity rate",
    icon: UserCheck,
    color: "text-green-600",
  },
  {
    title: "Suspended",
    value: "45",
    change: "-12 this month",
    icon: UserX,
    color: "text-red-600",
  },
  {
    title: "Admin Accounts",
    value: "23",
    change: "5 roles assigned",
    icon: Shield,
    color: "text-purple-600",
  },
]

export function UserStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
