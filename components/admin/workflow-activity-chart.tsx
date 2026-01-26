"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Mon", executions: 1420, success: 1389, errors: 31 },
  { date: "Tue", executions: 1680, success: 1644, errors: 36 },
  { date: "Wed", executions: 1890, success: 1852, errors: 38 },
  { date: "Thu", executions: 2100, success: 2058, errors: 42 },
  { date: "Fri", executions: 2340, success: 2294, errors: 46 },
  { date: "Sat", executions: 1820, success: 1784, errors: 36 },
  { date: "Sun", executions: 1560, success: 1528, errors: 32 },
]

export function WorkflowActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Activity</CardTitle>
        <CardDescription>Daily execution metrics for the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            executions: {
              label: "Total Executions",
              color: "hsl(var(--chart-1))",
            },
            success: {
              label: "Successful",
              color: "hsl(var(--chart-2))",
            },
            errors: {
              label: "Errors",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="success"
                stackId="1"
                stroke="var(--color-success)"
                fill="var(--color-success)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="errors"
                stackId="1"
                stroke="var(--color-errors)"
                fill="var(--color-errors)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
