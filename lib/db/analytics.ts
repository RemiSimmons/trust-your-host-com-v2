import { createServerClient } from '@/lib/supabase/server'

export interface PropertyClickAnalytics {
  today: number
  week: number
  month: number
  allTime: number
  dailyBreakdown: Record<string, number>
}

export async function getPropertyClickAnalytics(propertyId: string): Promise<PropertyClickAnalytics> {
  const supabase = await createServerClient()
  
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  // Today's clicks
  const { count: todayClicks } = await supabase
    .from('property_clicks')
    .select('*', { count: 'exact', head: true })
    .eq('property_id', propertyId)
    .gte('clicked_at', todayStart.toISOString())
  
  // This week's clicks
  const { count: weekClicks } = await supabase
    .from('property_clicks')
    .select('*', { count: 'exact', head: true })
    .eq('property_id', propertyId)
    .gte('clicked_at', weekStart.toISOString())
  
  // This month's clicks
  const { count: monthClicks } = await supabase
    .from('property_clicks')
    .select('*', { count: 'exact', head: true })
    .eq('property_id', propertyId)
    .gte('clicked_at', monthStart.toISOString())
  
  // All-time clicks
  const { count: allTimeClicks } = await supabase
    .from('property_clicks')
    .select('*', { count: 'exact', head: true })
    .eq('property_id', propertyId)
  
  // Daily breakdown for chart (last 30 days)
  const { data: dailyClicks } = await supabase
    .from('property_clicks')
    .select('clicked_at')
    .eq('property_id', propertyId)
    .gte('clicked_at', monthStart.toISOString())
    .order('clicked_at', { ascending: true })
  
  // Group by day
  const clicksByDay: Record<string, number> = {}
  dailyClicks?.forEach(click => {
    const day = new Date(click.clicked_at).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
    clicksByDay[day] = (clicksByDay[day] || 0) + 1
  })
  
  return {
    today: todayClicks || 0,
    week: weekClicks || 0,
    month: monthClicks || 0,
    allTime: allTimeClicks || 0,
    dailyBreakdown: clicksByDay
  }
}

export async function getHostStats() {
  // Placeholder for now - can expand later
  return {
    totalProperties: 0,
    totalClicks: 0,
    activeListings: 0
  }
}
