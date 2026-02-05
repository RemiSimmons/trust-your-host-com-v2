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

// Contact form email functions
export async function sendContactEmail(data: {
  to: string
  from: string
  fromName: string
  subject: string
  message: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email Mock] Contact email:', data)
    return { success: false, error: 'No API key configured' }
  }

  try {
    console.log('[Email] Attempting to send contact email to:', data.to)
    
    const client = getResendClient()
    if (!client) {
      return { success: false, error: 'Resend client not initialized' }
    }
    
    const result = await client.emails.send({
      from: 'TrustYourHost <hello@trustyourhost.com>',
      to: data.to,
      replyTo: data.from,
      subject: `Contact Form: ${data.subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Contact Form Submission</h2>
          
          <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>From:</strong> ${data.fromName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${data.from}</p>
            <p style="margin: 0;"><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <h3>Message:</h3>
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; white-space: pre-wrap;">
${data.message}
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="font-size: 14px; color: #6b7280;">
            Reply directly to this email to respond to ${data.fromName}
          </p>
        </div>
      `
    })
    
    console.log('[Email] Contact email sent successfully! ID:', result.data?.id)
    return { success: true, emailId: result.data?.id }
  } catch (error) {
    console.error('[Email] Failed to send contact email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendContactConfirmation(data: {
  userEmail: string
  userName: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email Mock] Contact confirmation:', data)
    return { success: false, error: 'No API key configured' }
  }

  try {
    console.log('[Email] Attempting to send confirmation email to:', data.userEmail)
    
    const client = getResendClient()
    if (!client) {
      return { success: false, error: 'Resend client not initialized' }
    }
    
    const result = await client.emails.send({
      from: 'TrustYourHost <hello@trustyourhost.com>',
      to: data.userEmail,
      subject: 'We received your message',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">Thanks for contacting TrustYourHost!</h2>
          
          <p>Hi ${data.userName},</p>
          
          <p>We've received your message and our support team will get back to you within 24 hours.</p>
          
          <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0;">
            <p style="margin: 0;"><strong>💡 In the meantime:</strong></p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
              <li>Check out our <a href="${process.env.NEXT_PUBLIC_APP_URL}/help" style="color: #ea580c;">Help Center</a> for quick answers</li>
              <li>Browse our <a href="${process.env.NEXT_PUBLIC_APP_URL}/faq" style="color: #ea580c;">FAQ</a> for common questions</li>
              <li>Visit <a href="${process.env.NEXT_PUBLIC_APP_URL}/how-it-works" style="color: #ea580c;">How It Works</a> to learn more</li>
            </ul>
          </div>
          
          <p>We appreciate your patience!</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br />
            <strong>The TrustYourHost Team</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="font-size: 14px; color: #6b7280;">
            <strong>Questions?</strong> Feel free to reply to this email
          </p>
        </div>
      `
    })
    
    console.log('[Email] Confirmation email sent successfully! ID:', result.data?.id)
    return { success: true, emailId: result.data?.id }
  } catch (error) {
    console.error('[Email] Failed to send confirmation email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Property change request email notifications
export async function sendPropertyChangeRequestNotification(data: {
  propertyId: string
  propertyName: string
  hostName: string
  hostEmail: string
  changes: Record<string, any>
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email Mock] Property change request notification:', data)
    return { success: false, error: 'No API key configured' }
  }

  try {
    console.log('[Email] Sending change request notification to admin')
    
    const client = getResendClient()
    if (!client) {
      return { success: false, error: 'Resend client not initialized' }
    }
    
    // Format changes for email
    const changesHtml = Object.entries(data.changes)
      .map(([field, value]) => {
        const displayValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)
        return `<li><strong>${field.replace(/_/g, ' ')}:</strong> ${displayValue}</li>`
      })
      .join('')
    
    const result = await client.emails.send({
      from: 'TrustYourHost <hello@trustyourhost.com>',
      to: process.env.ADMIN_EMAIL || 'admin@trustyourhost.com',
      subject: `⚠️ Property Change Request: ${data.propertyName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">Property Change Request Requires Review</h2>
          
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0;">
            <p style="margin: 0;"><strong>⚠️ Action Required:</strong> A host has requested changes that require admin approval.</p>
          </div>
          
          <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Property:</strong> ${data.propertyName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Host:</strong> ${data.hostName} (${data.hostEmail})</p>
          </div>
          
          <h3>Requested Changes:</h3>
          <ul style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
            ${changesHtml}
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/change-requests" style="display: inline-block; background-color: #ea580c; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Review Change Request
            </a>
          </div>
          
          <p style="font-size: 14px; color: #6b7280;">
            <strong>Note:</strong> The property has been temporarily removed from search results until this request is reviewed.
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="font-size: 12px; color: #9ca3af;">
            This is an automated notification from TrustYourHost admin system.
          </p>
        </div>
      `
    })
    
    console.log('[Email] Change request notification sent! ID:', result.data?.id)
    return { success: true, emailId: result.data?.id }
  } catch (error) {
    console.error('[Email] Failed to send change request notification:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendPropertyChangeApprovedNotification(data: {
  hostEmail: string
  hostName: string
  propertyName: string
  adminNotes?: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email Mock] Change approved notification:', data)
    return { success: false, error: 'No API key configured' }
  }

  try {
    console.log('[Email] Sending change approved notification to host:', data.hostEmail)
    
    const client = getResendClient()
    if (!client) {
      return { success: false, error: 'Resend client not initialized' }
    }
    
    const result = await client.emails.send({
      from: 'TrustYourHost <hello@trustyourhost.com>',
      to: data.hostEmail,
      subject: `✅ Property Changes Approved: ${data.propertyName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Your Property Changes Have Been Approved! ✅</h2>
          
          <p>Hi ${data.hostName},</p>
          
          <p>Great news! Your requested changes for <strong>${data.propertyName}</strong> have been reviewed and approved.</p>
          
          <div style="background-color: #dcfce7; border-left: 4px solid #16a34a; padding: 16px; margin: 20px 0;">
            <h3 style="margin-top: 0;">✓ Changes Applied</h3>
            <p style="margin-bottom: 0;">Your property has been updated and is now live again in search results.</p>
          </div>
          
          ${data.adminNotes ? `
          <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Admin Note:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${data.adminNotes}</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/host/properties" style="display: inline-block; background-color: #ea580c; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              View Your Property
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="font-size: 14px; color: #6b7280;">
            <strong>Questions?</strong> Reply to this email or contact us at hello@trustyourhost.com
          </p>
        </div>
      `
    })
    
    console.log('[Email] Change approved notification sent! ID:', result.data?.id)
    return { success: true, emailId: result.data?.id }
  } catch (error) {
    console.error('[Email] Failed to send change approved notification:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendPropertyChangeRejectedNotification(data: {
  hostEmail: string
  hostName: string
  propertyName: string
  adminNotes: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email Mock] Change rejected notification:', data)
    return { success: false, error: 'No API key configured' }
  }

  try {
    console.log('[Email] Sending change rejected notification to host:', data.hostEmail)
    
    const client = getResendClient()
    if (!client) {
      return { success: false, error: 'Resend client not initialized' }
    }
    
    const result = await client.emails.send({
      from: 'TrustYourHost <hello@trustyourhost.com>',
      to: data.hostEmail,
      subject: `Property Change Request Update: ${data.propertyName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Property Change Request Update</h2>
          
          <p>Hi ${data.hostName},</p>
          
          <p>Thank you for submitting changes for <strong>${data.propertyName}</strong>. After review, we're unable to approve the requested changes at this time.</p>
          
          <div style="background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #dc2626;">Reason for Rejection:</h3>
            <p style="margin-bottom: 0; white-space: pre-wrap;">${data.adminNotes}</p>
          </div>
          
          <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0;">
            <p style="margin: 0;"><strong>What happens now:</strong></p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
              <li>Your property remains live with the original information</li>
              <li>You can submit a revised change request if needed</li>
              <li>Contact us if you have questions about this decision</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/host/properties" style="display: inline-block; background-color: #ea580c; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              View Your Property
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="font-size: 14px; color: #6b7280;">
            <strong>Questions?</strong> Reply to this email or contact us at hello@trustyourhost.com
          </p>
          
          <p style="font-size: 12px; color: #9ca3af;">
            We're here to help you maintain accurate and compliant property information on TrustYourHost.
          </p>
        </div>
      `
    })
    
    console.log('[Email] Change rejected notification sent! ID:', result.data?.id)
    return { success: true, emailId: result.data?.id }
  } catch (error) {
    console.error('[Email] Failed to send change rejected notification:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
