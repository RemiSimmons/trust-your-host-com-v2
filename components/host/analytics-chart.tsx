"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Jan", revenue: 4000, occupancy: 65 },
  { name: "Feb", revenue: 3000, occupancy: 55 },
  { name: "Mar", revenue: 2000, occupancy: 40 },
  { name: "Apr", revenue: 2780, occupancy: 50 },
  { name: "May", revenue: 1890, occupancy: 35 },
  { name: "Jun", revenue: 2390, occupancy: 45 },
  { name: "Jul", revenue: 3490, occupancy: 60 },
  { name: "Aug", revenue: 5200, occupancy: 85 },
  { name: "Sep", revenue: 4800, occupancy: 80 },
  { name: "Oct", revenue: 3200, occupancy: 55 },
  { name: "Nov", revenue: 2100, occupancy: 40 },
  { name: "Dec", revenue: 4600, occupancy: 75 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip contentStyle={{ background: "#333", border: "none", borderRadius: "8px", color: "#fff" }} />
              <Line type="monotone" dataKey="revenue" stroke="#adfa1d" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function OccupancyChart() {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle>Occupancy Rate (%)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#333", border: "none", borderRadius: "8px", color: "#fff" }} />
              <Bar dataKey="occupancy" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
