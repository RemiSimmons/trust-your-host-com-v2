import { createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const searchParams = request.nextUrl.searchParams
  const propertyId = searchParams.get('property_id')
  
  if (!propertyId) {
    return NextResponse.json({ error: 'Missing property_id' }, { status: 400 })
  }
  
  // Get property details
  const { data: property } = await supabase
    .from('properties')
    .select('external_booking_url')
    .eq('id', propertyId)
    .single()
  
  if (!property?.external_booking_url) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // Collect metadata
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const referrer = headersList.get('referer') || request.nextUrl.origin
  const forwarded = headersList.get('x-forwarded-for')
  const ipAddress = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip')
  
  // Parse device type from user agent
  const deviceType = userAgent.includes('Mobile') ? 'mobile' : 
                     userAgent.includes('Tablet') ? 'tablet' : 'desktop'
  
  const browser = userAgent.includes('Chrome') ? 'Chrome' :
                 userAgent.includes('Safari') ? 'Safari' :
                 userAgent.includes('Firefox') ? 'Firefox' :
                 userAgent.includes('Edge') ? 'Edge' : 'Other'
  
  // Generate or retrieve session ID from cookies
  const sessionId = request.cookies.get('tyh_session')?.value || 
                   crypto.randomUUID()
  
  // Get geographic data from IP (using ipapi.co)
  let geoData = { city: null, region: null, country: null }
  if (ipAddress && ipAddress !== '127.0.0.1' && ipAddress !== '::1') {
    try {
      const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
        headers: {
          'User-Agent': 'TrustYourHost/1.0'
        }
      })
      if (geoResponse.ok) {
        const geo = await geoResponse.json()
        geoData = {
          city: geo.city || null,
          region: geo.region || null,
          country: geo.country_name || null
        }
      }
    } catch (e) {
      console.error('Geo lookup failed:', e)
    }
  }
  
  // Log the click
  await supabase.from('property_clicks').insert({
    property_id: propertyId,
    referrer,
    user_agent: userAgent.substring(0, 500), // Truncate if too long
    ip_address: ipAddress,
    city: geoData.city,
    region: geoData.region,
    country: geoData.country,
    device_type: deviceType,
    browser,
    session_id: sessionId
  })
  
  // Increment cached total
  await supabase.rpc('increment_property_clicks', { 
    property_uuid: propertyId 
  })
  
  // Set session cookie and redirect
  const response = NextResponse.redirect(property.external_booking_url)
  response.cookies.set('tyh_session', sessionId, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    sameSite: 'lax'
  })
  
  return response
}
