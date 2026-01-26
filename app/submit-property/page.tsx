import { SubmissionForm } from '@/components/submit/submission-form'
import { NavBar } from '@/components/navigation/nav-bar'
import { Footer } from '@/components/navigation/footer'

export default function SubmitPropertyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-32 pb-16 bg-gray-50 dark:bg-gray-900">
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
      </main>
      <Footer />
    </div>
  )
}
