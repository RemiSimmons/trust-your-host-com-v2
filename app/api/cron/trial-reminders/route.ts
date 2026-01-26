'use server'

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendTrialEndingReminder } from '@/lib/email/resend'

/**
 * Cron job to send trial ending reminders
 * Run daily to check for trials ending in 7 days
 * 
 * Setup in Vercel:
 * 1. Go to project settings → Cron Jobs
 * 2. Add: /api/cron/trial-reminders
 * 3. Schedule: 0 9 * * * (daily at 9am)
 * 4. Set CRON_SECRET in environment variables
 */
export async function GET(req: NextRequest) {
  // Verify cron secret for security
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  try {
    // Calculate date 7 days from now
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)

    // Get properties with trials ending in 7 days
    // We want trials ending between 7 days from now (start of day) and 7 days + 1 day (end of day)
    const startOfDay = new Date(sevenDaysFromNow)
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(sevenDaysFromNow)
    endOfDay.setHours(23, 59, 59, 999)

    const { data: properties, error } = await supabase
      .from('properties')
      .select(`
        id,
        name,
        trial_ends_at,
        host_id,
        host:profiles (
          email,
          full_name
        )
      `)
      .eq('subscription_status', 'trial')
      .gte('trial_ends_at', startOfDay.toISOString())
      .lte('trial_ends_at', endOfDay.toISOString())

    if (error) {
      console.error('Error fetching trials:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!properties || properties.length === 0) {
      console.log('No trials ending in 7 days')
      return NextResponse.json({ 
        message: 'No trials ending in 7 days',
        count: 0 
      })
    }

    // Send reminders
    const results = await Promise.allSettled(
      properties.map(async (property) => {
        const host = property.host as any
        
        if (!host?.email) {
          console.warn(`No email for property ${property.id}`)
          return { success: false, propertyId: property.id, reason: 'No email' }
        }

        const result = await sendTrialEndingReminder({
          email: host.email,
          name: host.full_name || 'Host',
          propertyName: property.name,
          billingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/host/billing`,
          trialEndsAt: property.trial_ends_at,
        })

        return { 
          success: result.success, 
          propertyId: property.id, 
          email: host.email 
        }
      })
    )

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length
    const failed = results.length - successful

    console.log(`Trial reminders sent: ${successful} successful, ${failed} failed`)

    return NextResponse.json({
      message: 'Trial reminders processed',
      total: properties.length,
      successful,
      failed,
      results: results.map(r => r.status === 'fulfilled' ? r.value : { success: false })
    })

  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Allow POST as well for manual testing
export async function POST(req: NextRequest) {
  return GET(req)
}
