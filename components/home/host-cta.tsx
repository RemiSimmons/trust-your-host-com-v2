import { Button } from "@/components/ui/button"
import { Home, DollarSign, Users, Shield } from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    icon: DollarSign,
    title: "Earn Extra Income",
    description: "List your space and start earning from day one",
  },
  {
    icon: Users,
    title: "Meet New People",
    description: "Connect with travelers from around the world",
  },
  {
    icon: Shield,
    title: "Protected & Secure",
    description: "Host protection and verified guest reviews",
  },
]

export function HostCTA() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 lg:p-16 text-center">
          <Home className="h-12 w-12 text-accent mx-auto mb-6" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Share Your Space, Earn More
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
            Join thousands of hosts who trust our platform to connect with verified guests and grow their income.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/submit-property">Start Your Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/insights">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
