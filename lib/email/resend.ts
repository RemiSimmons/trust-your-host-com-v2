import { Resend } from 'resend'

// Lazy initialize Resend only when needed to avoid build-time errors
let resend: Resend | null = null

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

export async function sendPropertySubmissionNotification(submission: {
  propertyName: string
  hostName: string
  hostEmail: string
  submissionId: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email Mock] Property submission notification:', submission)
    return { success: false, error: 'No API key configured' }
  }

  try {
    console.log('[Email] Attempting to send submission notification to:', process.env.ADMIN_EMAIL)
    
    const client = getResendClient()
    if (!client) {
      return { success: false, error: 'Resend client not initialized' }
    }
    
    const result = await client.emails.send({
      from: 'TrustYourHost <hello@trustyourhost.com>',
      to: process.env.ADMIN_EMAIL || 'admin@trustyourhost.com',
      subject: `New Property Submission: ${submission.propertyName}`,
      html: `
        <h2>New Property Submission</h2>
        <p><strong>Property:</strong> ${submission.propertyName}</p>
        <p><strong>Host:</strong> ${submission.hostName} (${submission.hostEmail})</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/submissions?id=${submission.submissionId}">Review Submission</a></p>
      `
    })
    
    console.log('[Email] Sent successfully! ID:', result.data?.id)
    return { success: true, emailId: result.data?.id }
  } catch (error) {
    console.error('[Email] Failed to send submission notification:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendTrialEndingNotification(host: {
  email: string
  name: string
  propertyName: string
  trialEndsAt: Date
  daysRemaining: number
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email Mock] Trial ending notification:', host)
    return
  }

  const client = getResendClient()
  if (!client) return

  await client.emails.send({
    from: 'TrustYourHost <hello@trustyourhost.com>',
    to: host.email,
    subject: `Your TrustYourHost trial ends in ${host.daysRemaining} days`,
    html: `
      <h2>Your Trial is Ending Soon</h2>
      <p>Hi ${host.name},</p>
      <p>Your 60-day free trial for <strong>${host.propertyName}</strong> ends on ${host.trialEndsAt.toLocaleDateString()}.</p>
      <p>To continue receiving referral traffic, please update your payment method in the host portal.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/host/dashboard">Manage Billing</a></p>
      <p>The subscription is $49/month after your trial ends.</p>
    `
  })
}

export async function sendPaymentFailedNotification(host: {
  email: string
  name: string
  propertyName: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email Mock] Payment failed notification:', host)
    return
  }

  const client = getResendClient()
  if (!client) return

  await client.emails.send({
    from: 'TrustYourHost <hello@trustyourhost.com>',
    to: host.email,
    subject: `Payment Failed for ${host.propertyName}`,
    html: `
      <h2>Payment Failed</h2>
      <p>Hi ${host.name},</p>
      <p>We were unable to process payment for your property listing: <strong>${host.propertyName}</strong>.</p>
      <p>Your listing has been paused until payment is updated.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/host/dashboard">Update Payment Method</a></p>
    `
  })
}

export async function sendMonthlyAnalyticsSummary(host: {
  email: string
  name: string
  propertyName: string
  clicks: number
  changePercent: number
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email Mock] Monthly analytics summary:', host)
    return
  }

  const client = getResendClient()
  if (!client) return

  const trend = host.changePercent > 0 ? 'up' : 'down'
  const trendIcon = host.changePercent > 0 ? '📈' : '📉'

  await client.emails.send({
    from: 'TrustYourHost <hello@trustyourhost.com>',
    to: host.email,
    subject: `Monthly Analytics: ${host.propertyName}`,
    html: `
      <h2>Your Monthly Performance Summary</h2>
      <p>Hi ${host.name},</p>
      <p>Here's how <strong>${host.propertyName}</strong> performed this month:</p>
      <ul>
        <li><strong>Total Clicks:</strong> ${host.clicks}</li>
        <li><strong>Change:</strong> ${trendIcon} ${Math.abs(host.changePercent)}% ${trend} from last month</li>
      </ul>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/host/dashboard">View Full Analytics</a></p>
    `
  })
}

export async function sendPropertyApprovedNotification(host: {
  email: string
  name: string
  propertyName: string
  loginUrl: string
  billingSetupUrl: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email Mock] Property approved notification:', host)
    return { success: false, error: 'No API key configured' }
  }

  try {
    console.log('[Email] Attempting to send approval notification to:', host.email)
    
    const client = getResendClient()
    if (!client) {
      return { success: false, error: 'Resend client not initialized' }
    }
    
    const result = await client.emails.send({
      from: 'TrustYourHost <hello@trustyourhost.com>',
      to: host.email,
      subject: `🎉 ${host.propertyName} is Approved! Set up billing to go live`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">Congratulations! Your Property is Approved 🎉</h2>
          
          <p>Hi ${host.name},</p>
          
          <p>Great news! <strong>${host.propertyName}</strong> has been approved and is ready to go live on TrustYourHost.</p>
          
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0;">
            <h3 style="margin-top: 0;">⚡ One More Step: Set Up Billing</h3>
            <p style="margin-bottom: 0;">To activate your listing and start receiving traffic, please set up your billing information.</p>
          </div>
          
          <div style="background-color: #dbeafe; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0;">🎁 Your 60-Day Free Trial</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>$0 due today</strong> - Your card won't be charged for 60 days</li>
              <li>Property goes live immediately after setup</li>
              <li>$49/month after trial ends</li>
              <li>Cancel anytime, no questions asked</li>
              <li>Keep 100% of your booking revenue</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${host.loginUrl}" style="display: inline-block; background-color: #ea580c; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Activate My Listing Now
            </a>
          </div>
          
          <h3>What happens next:</h3>
          <ol>
            <li><strong>Set up billing</strong> (takes 2 minutes)</li>
            <li><strong>Your property goes live</strong> immediately</li>
            <li><strong>Start receiving traffic</strong> from travelers</li>
            <li><strong>Track analytics</strong> in your host portal</li>
          </ol>
          
          <p style="margin-top: 30px;">
            <a href="${host.loginUrl}" style="color: #ea580c;">Sign In to Host Portal</a>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="font-size: 14px; color: #6b7280;">
            <strong>Questions?</strong> Reply to this email or contact us at hello@trustyourhost.com
          </p>
          
          <p style="font-size: 12px; color: #9ca3af;">
            Secure payment processing by Stripe. Your card details are never stored on our servers.
          </p>
        </div>
      `
    })
    
    console.log('[Email] Sent successfully! ID:', result.data?.id)
    return { success: true, emailId: result.data?.id }
  } catch (error) {
    console.error('[Email] Failed to send approval notification:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Enhanced trial ending reminder (Day 53 - 7 days before trial ends)
export async function sendTrialEndingReminder(host: {
  email: string
  name: string
  propertyName: string
  billingUrl: string
  trialEndsAt: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email Mock] Trial ending reminder:', host)
    return { success: false, error: 'No API key configured' }
  }

  try {
    const client = getResendClient()
    if (!client) {
      return { success: false, error: 'Resend client not initialized' }
    }
    
    const result = await client.emails.send({
      from: 'TrustYourHost <hello@trustyourhost.com>',
      to: host.email,
      subject: `⏰ Your TrustYourHost Trial Ends in 7 Days`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">Your Trial is Ending Soon</h2>
          
          <p>Hi ${host.name},</p>
          
          <p>Your 60-day free trial for <strong>${host.propertyName}</strong> ends on <strong>${new Date(host.trialEndsAt).toLocaleDateString()}</strong> (in 7 days).</p>
          
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0;">
            <h3 style="margin-top: 0;">⚡ Action Required</h3>
            <p style="margin-bottom: 0;">To continue receiving qualified traffic to your booking website, please ensure your billing information is up to date.</p>
          </div>
          
          <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0;">What happens on ${new Date(host.trialEndsAt).toLocaleDateString()}:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Your card will be charged <strong>$49</strong> for the first month</li>
              <li>Your property stays live in the directory</li>
              <li>You continue receiving traffic from travelers</li>
              <li>Billing repeats monthly (cancel anytime)</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${host.billingUrl}" style="display: inline-block; background-color: #ea580c; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Update Payment Method
            </a>
          </div>
          
          <p><strong>No action needed?</strong> If your billing is already set up, you're all good! Your subscription will continue seamlessly.</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="font-size: 14px; color: #6b7280;">
            <strong>Want to cancel?</strong> No problem! Cancel anytime from your <a href="${process.env.NEXT_PUBLIC_APP_URL}/host/billing" style="color: #ea580c;">billing dashboard</a>. No hard feelings!
          </p>
          
          <p style="font-size: 14px; color: #6b7280;">
            <strong>Questions?</strong> Reply to this email or contact us at hello@trustyourhost.com
          </p>
        </div>
      `
    })
    
    console.log('[Email] Trial ending reminder sent! ID:', result.data?.id)
    return { success: true, emailId: result.data?.id }
  } catch (error) {
    console.error('[Email] Failed to send trial ending reminder:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Payment failed notification (auto-pause)
export async function sendSubscriptionFailedNotification(host: {
  email: string
  name: string
  propertyName: string
  billingUrl: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email Mock] Subscription failed notification:', host)
    return { success: false, error: 'No API key configured' }
  }

  try {
    const client = getResendClient()
    if (!client) {
      return { success: false, error: 'Resend client not initialized' }
    }
    
    const result = await client.emails.send({
      from: 'TrustYourHost <hello@trustyourhost.com>',
      to: host.email,
      subject: `⚠️ Payment Failed - ${host.propertyName} Paused`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Payment Failed - Action Required</h2>
          
          <p>Hi ${host.name},</p>
          
          <p>We were unable to process payment for your TrustYourHost subscription for <strong>${host.propertyName}</strong>.</p>
          
          <div style="background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #dc2626;">⚠️ Your Property Has Been Paused</h3>
            <p style="margin-bottom: 0;">Your property is no longer visible in our directory until payment is resolved.</p>
          </div>
          
          <h3>To reactivate your listing:</h3>
          <ol>
            <li>Update your payment method</li>
            <li>We'll retry the payment automatically</li>
            <li>Your property goes live immediately</li>
          </ol>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${host.billingUrl}" style="display: inline-block; background-color: #dc2626; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Update Payment Method
            </a>
          </div>
          
          <p style="font-size: 14px; color: #6b7280;">
            <strong>Common causes:</strong> Expired card, insufficient funds, or card blocked by your bank
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="font-size: 14px; color: #6b7280;">
            <strong>Questions?</strong> Reply to this email or contact us at hello@trustyourhost.com
          </p>
          
          <p style="font-size: 12px; color: #9ca3af;">
            This is an automated notification. We'll continue to retry payment for the next 7 days. After that, your subscription will be canceled.
          </p>
        </div>
      `
    })
    
    console.log('[Email] Payment failed notification sent! ID:', result.data?.id)
    return { success: true, emailId: result.data?.id }
  } catch (error) {
    console.error('[Email] Failed to send payment failed notification:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
