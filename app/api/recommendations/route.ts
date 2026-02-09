import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"
import { z } from "zod"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Define types for recommendations
interface UserPreferences {
  [key: string]: string | number | boolean | string[]
}

interface SearchHistoryItem {
  query?: string
  location?: string
  date?: string
  [key: string]: unknown
}

interface PropertyData {
  id: string
  name?: string
  highlights?: string[]
  [key: string]: unknown
}

interface RecommendationResult {
  propertyId: string
  matchScore: number
  reason: string
  highlights: string[]
}

// Validation schema for recommendations request
const RecommendationsRequestSchema = z.object({
  userPreferences: z.record(z.union([z.string(), z.number(), z.boolean(), z.array(z.string())])).optional(),
  searchHistory: z.array(z.record(z.unknown())).optional(),
  availableProperties: z.array(z.record(z.unknown())),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = RecommendationsRequestSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { userPreferences, searchHistory, availableProperties } = validationResult.data

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      // Return mock data if no API key is present
      return NextResponse.json({
        recommendations: availableProperties.slice(0, 3).map((p) => ({
          propertyId: (p as PropertyData).id,
          matchScore: 95 - Math.random() * 10,
          reason: "Based on your interest in luxury and nature, this property offers the perfect balance.",
          highlights: (p as PropertyData).highlights || ["Great views", "Luxury amenities"],
        })),
      })
    }

    // Use Gemini 2.0 Flash as primary model for best speed/performance balance
    // Gemini 3 Pro is currently restricted on free tier (quota limit 0)
    let model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const prompt = `
You are a luxury travel concierge for TrustYourHost, a curated short-term rental platform.

User Preferences:
${JSON.stringify(userPreferences, null, 2)}

Recent Search History:
${JSON.stringify(searchHistory, null, 2)}

Available Properties:
${JSON.stringify(availableProperties, null, 2)}

Task: Recommend the top 5 properties that best match this user's preferences and interests. 
For each recommendation, provide:
1. Property ID
2. Match score (0-100)
3. Brief personalized reason (2-3 sentences explaining why this is perfect for them)
4. Key highlights that align with their preferences

Respond in JSON format:
{
  "recommendations": [
    {
      "propertyId": "string",
      "matchScore": number,
      "reason": "string",
      "highlights": ["string", "string", "string"]
    }
  ]
}
`

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("Failed to parse AI response")
      }

      const recommendations = JSON.parse(jsonMatch[0])
      return NextResponse.json(recommendations)
    } catch (modelError) {
      // Fallback to alternative model if primary fails
      try {
        // Fallback to Gemini 1.5 Flash which is highly reliable
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
          throw new Error("Failed to parse AI response")
        }

        const recommendations = JSON.parse(jsonMatch[0])
        return NextResponse.json(recommendations)
      } catch (fallbackError) {
        // Both models failed, return fallback
        throw fallbackError
      }
    }
  } catch (error) {
    let availableProperties: PropertyData[] = []
    try {
      const body = await request.json()
      availableProperties = body.availableProperties || []
    } catch {
      // Ignore JSON parsing errors
    }

    const mockRecommendations = {
      recommendations: availableProperties
        .slice(0, 3)
        .map((p) => ({
          propertyId: p.id,
          matchScore: 90 - Math.floor(Math.random() * 15),
          reason:
            "We selected this property based on its popularity and high ratings, as our AI service is temporarily unavailable.",
          highlights: p.highlights || ["Guest Favorite", "Top Rated", "Premium Location"],
        })),
    }

    return NextResponse.json(mockRecommendations)
  }
}
