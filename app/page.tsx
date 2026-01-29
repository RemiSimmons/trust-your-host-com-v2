import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { HeroSection } from "@/components/home/hero-section"
import { HostCTA } from "@/components/home/host-cta"
import { FeaturedProperties } from "@/components/home/featured-properties"
import { FeaturedContent } from "@/components/home/featured-content"
import { ExperienceCategories } from "@/components/home/experience-categories"
import { FifaCitiesSection } from "@/components/home/fifa-cities-section"
import { HowItWorksExplainer } from "@/components/home/how-it-works-explainer"
import { HomepageFAQ } from "@/components/home/homepage-faq"
import { getFeaturedProperties } from "@/lib/db/properties"
import { getArticlesByCategory } from "@/lib/data/articles"
import { generateHomeMetadata } from "@/lib/seo/metadata"
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo/schema"
import { SchemaMarkup } from "@/components/seo/schema-markup"

export const metadata = generateHomeMetadata()

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties()
  
  // Get featured articles from each category
  const guides = getArticlesByCategory("guides")
  const journal = getArticlesByCategory("journal")
  const insights = getArticlesByCategory("insights")
  const resources = getArticlesByCategory("resources")

  // Generate schema markup for homepage
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()

  return (
    <div className="min-h-screen flex flex-col">
      <SchemaMarkup schema={[organizationSchema, websiteSchema]} />
      <NavBar />
      <main className="flex-1">
        <div className="relative">
          {/* Full-page parallax background */}
          <div className="fixed inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80)",
                backgroundAttachment: "fixed",
              }}
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Page content with relative positioning */}
          <div className="relative z-10">
            <HeroSection />
            <FifaCitiesSection />
            <HowItWorksExplainer />
            <ExperienceCategories />

            <div className="relative">
              {/* Large gradient blend from parallax background to solid background */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

              <div className="relative bg-background/95 backdrop-blur-sm pt-8">
                <FeaturedProperties properties={featuredProperties} />
              </div>
            </div>

            <div className="bg-background/95 backdrop-blur-sm">
              <FeaturedContent 
                guides={guides}
                journal={journal}
                insights={insights}
                resources={resources}
              />
              <HomepageFAQ />
              <HostCTA />
            </div>
          </div>
        </div>
      </main>
      <div className="relative z-10 bg-background">
        <Footer />
      </div>
    </div>
  )
}
