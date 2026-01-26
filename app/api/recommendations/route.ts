import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userPreferences, searchHistory, availableProperties } = body

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      // Return mock data if no API key is present
      return NextResponse.json({
        recommendations: availableProperties.slice(0, 3).map((p: any) => ({
          propertyId: p.id,
          matchScore: 95 - Math.random() * 10,
          reason: "Based on your interest in luxury and nature, this property offers the perfect balance.",
          highlights: p.highlights || ["Great views", "Luxury amenities"],
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
    } catch (modelError: any) {
      console.error("Gemini 2.0 Flash failed, trying fallback:", modelError.message)

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
      } catch (fallbackError: any) {
        console.error("All AI models failed:", fallbackError.message)
        throw fallbackError
      }
    }
  } catch (error) {
    console.error("Recommendation error:", error)
    const { availableProperties } = await request.json().catch(() => ({ availableProperties: [] }))

    const mockRecommendations = {
      recommendations: availableProperties
        ? availableProperties.slice(0, 3).map((p: any) => ({
            propertyId: p.id,
            matchScore: 90 - Math.floor(Math.random() * 15),
            reason:
              "We selected this property based on its popularity and high ratings, as our AI service is temporarily unavailable.",
            highlights: p.highlights || ["Guest Favorite", "Top Rated", "Premium Location"],
          }))
        : [],
    }

    return NextResponse.json(mockRecommendations)
  }
}
