import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, sendContactConfirmation } from '@/lib/email/resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Validate field lengths
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be less than 100 characters' },
        { status: 400 }
      )
    }

    if (subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject must be less than 200 characters' },
        { status: 400 }
      )
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be less than 5000 characters' },
        { status: 400 }
      )
    }

    // Send email to admin
    const adminEmail = await sendContactEmail({
      to: process.env.ADMIN_EMAIL || 'hello@trustyourhost.com',
      from: email,
      fromName: name,
      subject: subject,
      message: message
    })

    if (!adminEmail.success) {
      console.error('[Contact API] Failed to send admin email:', adminEmail.error)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    const confirmationEmail = await sendContactConfirmation({
      userEmail: email,
      userName: name
    })

    // Don't fail the request if confirmation email fails
    if (!confirmationEmail.success) {
      console.error('[Contact API] Failed to send confirmation email:', confirmationEmail.error)
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully',
        emailId: adminEmail.emailId
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('[Contact API] Error processing contact form:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
