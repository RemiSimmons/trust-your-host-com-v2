import { Shield, Award, Clock, Star } from "lucide-react"

const trustFeatures = [
  {
    icon: Shield,
    title: "Verified Hosts",
    description: "All hosts undergo background checks and property verification",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Award,
    title: "Guest Reviews",
    description: "Read authentic reviews from real travelers",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our team is always here to help you",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Star,
    title: "Best Price Guarantee",
    description: "Find the best deals with transparent pricing",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
]

export function TrustSection() {
  return (
    <section className="py-24 text-primary-foreground relative">
      {/* Subtle gradient divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Soft container */}
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-3xl px-6 sm:px-8 lg:px-12 py-16 border border-white/5 shadow-2xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Why Travelers Trust{" "}
              <span className="text-orange-500">TrustYourHost</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto text-balance leading-relaxed">
              Your safety and satisfaction are our top priorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 rounded-2xl ${feature.iconBg} flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-10 w-10 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-sm text-primary-foreground/70 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Subtle gradient divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
