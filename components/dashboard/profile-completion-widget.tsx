"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, User, Camera, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProfileCompletionWidgetProps {
  profile: {
    full_name: string | null
    avatar_url: string | null
    email?: string
  } | null
  type: "guest" | "host"
}

export function ProfileCompletionWidget({ profile, type }: ProfileCompletionWidgetProps) {
  // Calculate completion percentage
  const steps = [
    {
      id: "email",
      label: "Account Created",
      completed: !!profile?.email, // Email is always present if profile exists
      icon: FileText,
    },
    {
      id: "name",
      label: "Full Name",
      completed: !!profile?.full_name,
      icon: User,
    },
    {
      id: "avatar",
      label: "Profile Photo",
      completed: !!profile?.avatar_url,
      icon: Camera,
    },
  ]

  const completedCount = steps.filter((s) => s.completed).length
  const totalCount = steps.length
  const percentage = Math.round((completedCount / totalCount) * 100)

  if (percentage === 100) return null

  return (
    <Card className="border-none shadow-lg overflow-hidden relative card-gradient">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <User className="w-32 h-32" />
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-serif">Complete your profile</CardTitle>
          <span className="text-sm font-medium text-primary">{percentage}%</span>
        </div>
        <Progress value={percentage} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {type === "host"
            ? "Hosts with complete profiles get 3x more bookings."
            : "Complete your profile to build trust with hosts."}
        </p>

        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-3">
              {step.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground" />
              )}
              <span className={cn("text-sm", step.completed ? "text-foreground" : "text-muted-foreground")}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <Button asChild className="w-full mt-2 group bg-transparent" variant="outline">
          <Link href={type === "host" ? "/host/settings" : "/dashboard/settings"}>
            Finish Profile
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
