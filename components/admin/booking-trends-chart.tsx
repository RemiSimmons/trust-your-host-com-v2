"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Mon", confirmed: 42, pending: 12, cancelled: 3 },
  { day: "Tue", confirmed: 38, pending: 15, cancelled: 2 },
  { day: "Wed", confirmed: 45, pending: 18, cancelled: 4 },
  { day: "Thu", confirmed: 52, pending: 14, cancelled: 3 },
  { day: "Fri", confirmed: 58, pending: 20, cancelled: 5 },
  { day: "Sat", confirmed: 67, pending: 25, cancelled: 6 },
  { day: "Sun", confirmed: 62, pending: 22, cancelled: 4 },
]

export function BookingTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Trends</CardTitle>
        <CardDescription>Daily booking status breakdown for the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            confirmed: {
              label: "Confirmed",
              color: "hsl(var(--chart-2))",
            },
            pending: {
              label: "Pending",
              color: "hsl(var(--chart-3))",
            },
            cancelled: {
              label: "Cancelled",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="confirmed" fill="var(--color-confirmed)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="var(--color-pending)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
