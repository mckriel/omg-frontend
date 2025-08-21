import { NextResponse } from 'next/server'
import config from '@/app.config.js'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        // Only return specific config values that are safe to expose
        const safe_config = {
            RAID_TEAM_ILVL: config.RAID_TEAM_ILVL,
            // Add other safe config values here as needed
        }

        return NextResponse.json({
            success: true,
            config: safe_config
        })

    } catch (error) {
        console.error('Error fetching config:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch configuration',
                message: error.message
            },
            { status: 500 }
        )
    }
}

// Only allow GET requests
export async function POST() {
    return NextResponse.json(
        { success: false, error: 'Method not allowed' },
        { status: 405 }
    )
}