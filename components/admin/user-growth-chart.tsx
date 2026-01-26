"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", guests: 5230, hosts: 892 },
  { month: "Feb", guests: 5678, hosts: 934 },
  { month: "Mar", guests: 6012, hosts: 987 },
  { month: "Apr", guests: 6543, hosts: 1045 },
  { month: "May", guests: 7234, hosts: 1123 },
  { month: "Jun", guests: 8012, hosts: 1234 },
  { month: "Jul", guests: 8789, hosts: 1356 },
  { month: "Aug", guests: 9234, hosts: 1423 },
  { month: "Sep", guests: 9876, hosts: 1512 },
  { month: "Oct", guests: 10345, hosts: 1598 },
  { month: "Nov", guests: 11023, hosts: 1687 },
  { month: "Dec", guests: 11789, hosts: 1756 },
]

export function UserGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Guest and host acquisition over the past year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            guests: {
              label: "Guests",
              color: "hsl(var(--chart-1))",
            },
            hosts: {
              label: "Hosts",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="guests"
                stackId="1"
                stroke="var(--color-guests)"
                fill="var(--color-guests)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="hosts"
                stackId="2"
                stroke="var(--color-hosts)"
                fill="var(--color-hosts)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
