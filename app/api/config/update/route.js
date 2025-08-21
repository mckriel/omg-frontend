import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function POST(request) {
    try {
        const { key, value } = await request.json()

        // Validate the key and value
        if (!key || value === undefined) {
            return NextResponse.json(
                { success: false, error: 'Key and value are required' },
                { status: 400 }
            )
        }

        // Only allow specific keys to be updated for security
        const allowed_keys = ['RAID_TEAM_ILVL']
        if (!allowed_keys.includes(key)) {
            return NextResponse.json(
                { success: false, error: 'This configuration key cannot be updated' },
                { status: 403 }
            )
        }

        // Validate the value based on the key
        if (key === 'RAID_TEAM_ILVL') {
            const ilvl = parseInt(value)
            if (isNaN(ilvl) || ilvl < 400 || ilvl > 1000) {
                return NextResponse.json(
                    { success: false, error: 'Invalid item level. Must be between 400 and 1000.' },
                    { status: 400 }
                )
            }
        }

        // Read the current config file
        const config_file_path = path.join(process.cwd(), 'app.config.js')
        const config_content = fs.readFileSync(config_file_path, 'utf8')

        // Parse and update the config
        // This is a simple string replacement approach - in production you might want a more robust solution
        const updated_content = config_content.replace(
            new RegExp(`"${key}":\\s*\\d+`),
            `"${key}": ${value}`
        )

        // Write the updated config back to the file
        fs.writeFileSync(config_file_path, updated_content, 'utf8')

        return NextResponse.json({
            success: true,
            message: `${key} updated to ${value}`,
            key,
            value
        })

    } catch (error) {
        console.error('Error updating config:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update configuration',
                message: error.message
            },
            { status: 500 }
        )
    }
}

// Only allow POST requests
export async function GET() {
    return NextResponse.json(
        { success: false, error: 'Method not allowed' },
        { status: 405 }
    )
}