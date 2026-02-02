import { SubmissionForm } from '@/components/submit/submission-form'
import { NavBar } from '@/components/navigation/nav-bar'
import { Footer } from '@/components/navigation/footer'

export default function SubmitPropertyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-32 pb-16 relative">
        {/* Blurred background image */}
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/luxury-beachfront-villa-ocean-view.jpg)',
            filter: 'blur(8px)',
            transform: 'scale(1.1)', // Scale up to hide blur edges
          }}
          aria-hidden="true"
        />
        {/* Overlay for readability */}
        <div className="fixed inset-0 z-0 bg-white/80 dark:bg-gray-900/80" aria-hidden="true" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl font-bold mb-4">
                List Your Property
              </h1>
              <p className="text-lg text-muted-foreground">
                Join TrustYourHost and get direct booking traffic to your website.{' '}
                <strong>60-day free trial, then $49/month.</strong>
              </p>
            </div>
            <SubmissionForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
