import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { RegistrationData, Contest } from '@/lib/types'

// Rate limiting (simple in-memory store - in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5 // requests per window
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false
  }

  userLimit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body: RegistrationData = await request.json()

    // Validate required fields
    if (!body.name || !body.whatsapp) {
      return NextResponse.json(
        { error: 'Name and WhatsApp number are required' },
        { status: 400 }
      )
    }

    // Validate WhatsApp number format
    const whatsappRegex = /^[6-9]\d{9}$/
    const cleanWhatsapp = body.whatsapp.replace(/\D/g, '')
    if (!whatsappRegex.test(cleanWhatsapp)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit mobile number' },
        { status: 400 }
      )
    }

    // Validate email format if provided
    if (body.email && body.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address (e.g., user@gmail.com)' },
        { status: 400 }
      )
    }

    // Message is now optional for all contests

    // Save to database
    const registration = await prisma.registration.create({
      data: {
        name: body.name,
        age: body.age,
        whatsapp: cleanWhatsapp,
        email: body.email,
        contest: body.contest,
        message: body.message,
        numberOfChildren: body.numberOfChildren,
        photoUrl: body.photoUrl,
        videoUrl: body.videoUrl,
        ipAddress: ip
      } as any
    })

    // Send to Google Sheets webhook
    try {
      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK
      if (webhookUrl) {
        const webhookPayload = {
          name: body.name,
          age: body.age,
          whatsapp: cleanWhatsapp,
          email: body.email,
          contest: body.contest,
          message: body.message,
          numberOfChildren: body.numberOfChildren,
          photoUrl: body.photoUrl,
          videoUrl: body.videoUrl,
          timestamp: new Date().toISOString()
        }

        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload),
        })
      }
    } catch (webhookError) {
      console.error('Failed to send to Google Sheets:', webhookError)
      // Don't fail the registration if webhook fails
    }

    // Send notification email (optional)
    try {
      if (process.env.SENDGRID_API_KEY && process.env.CLIENT_NOTIFICATION_EMAIL) {
        // In a real implementation, you would send an email here
        console.log('New registration:', registration)
      }
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError)
      // Don't fail the registration if email fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Registration successful!',
        id: registration.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
