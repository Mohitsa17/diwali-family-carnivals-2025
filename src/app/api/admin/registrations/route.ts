import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Contest } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const adminSecret = request.headers.get('x-admin-secret')
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const contest = searchParams.get('contest') as Contest | 'ALL' | null
    const search = searchParams.get('search')
    const exportFormat = searchParams.get('export')

    // Build where clause
    const where: Record<string, unknown> = {}
    
    if (contest && contest !== 'ALL') {
      where.contest = contest
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { whatsapp: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Get registrations
    const registrations = await prisma.registration.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        age: true,
        whatsapp: true,
        email: true,
        contest: true,
        message: true,
        numberOfChildren: true,
        photoUrl: true,
        videoUrl: true,
        createdAt: true,
        ipAddress: true
      }
    })

    // Handle CSV export
    if (exportFormat === 'csv') {
      const csvHeaders = [
        'ID',
        'Name',
        'Age',
        'WhatsApp',
        'Email',
        'Contest',
        'Message',
        'Number of Children',
        'Photo URL',
        'Video URL',
        'Registration Date',
        'IP Address'
      ]

      const csvRows = registrations.map((reg) => [
        reg.id,
        reg.name,
        reg.age || '',
        reg.whatsapp,
        reg.email || '',
        reg.contest,
        reg.message || '',
        reg.numberOfChildren || '',
        reg.photoUrl || '',
        reg.videoUrl || '',
        reg.createdAt.toISOString(),
        reg.ipAddress || ''
      ])

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
      ].join('\n')

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="registrations-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    // Return JSON response
    return NextResponse.json({
      success: true,
      data: registrations,
      total: registrations.length,
      filters: {
        contest,
        search
      }
    })

  } catch (error) {
    console.error('Admin registrations error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
