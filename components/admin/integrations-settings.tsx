"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Database, Mail, CreditCard, MessageSquare } from "lucide-react"

const integrations = [
  {
    name: "Supabase",
    description: "Database and authentication",
    icon: Database,
    status: "connected",
    color: "text-green-600",
  },
  {
    name: "Stripe",
    description: "Payment processing",
    icon: CreditCard,
    status: "connected",
    color: "text-purple-600",
  },
  {
    name: "Resend",
    description: "Email delivery",
    icon: Mail,
    status: "not_connected",
    color: "text-blue-600",
  },
  {
    name: "Google Maps",
    description: "Location services",
    icon: MessageSquare,
    status: "connected",
    color: "text-red-600",
  },
]

export function IntegrationsSettings() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {integrations.map((integration) => (
        <Card key={integration.name}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`rounded-lg bg-background border p-3 ${integration.color}`}>
                  <integration.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {integration.name}
                    {integration.status === "connected" ? (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1">
                        <XCircle className="h-3 w-3" />
                        Not Connected
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {integration.status === "connected" ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Configure
                </Button>
                <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button size="sm" className="w-full">
                Connect
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
