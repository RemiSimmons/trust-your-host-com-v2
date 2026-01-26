"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", revenue: 45000, bookings: 234 },
  { month: "Feb", revenue: 52000, bookings: 267 },
  { month: "Mar", revenue: 48000, bookings: 245 },
  { month: "Apr", revenue: 61000, bookings: 312 },
  { month: "May", revenue: 73000, bookings: 378 },
  { month: "Jun", revenue: 89000, bookings: 456 },
  { month: "Jul", revenue: 105000, bookings: 523 },
  { month: "Aug", revenue: 98000, bookings: 489 },
  { month: "Sep", revenue: 87000, bookings: 434 },
  { month: "Oct", revenue: 76000, bookings: 378 },
  { month: "Nov", revenue: 82000, bookings: 412 },
  { month: "Dec", revenue: 95000, bookings: 478 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue and booking trends for the past year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
