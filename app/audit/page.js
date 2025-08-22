import AuditGuild from '@/core/sections/guildAudit'
import { api } from '@/lib/api'

import { Public_Sans } from 'next/font/google'
const publicSans = Public_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    fallback: ['system-ui', 'arial', 'sans-serif'],
    preload: false, // Disable preloading to avoid build issues
})

// Enable revalidation for this page
export const revalidate = 600 // Revalidate every 10 minutes

// Server-side data fetching
async function getGuildData() {
    try {
        // Fetch main guild data
        const guildResponse = await api.getFilteredGuildData({
            filter: 'all',
            page: 1,
            limit: 300 // Get a reasonable amount for dashboard
        });


        return {
            data: guildResponse.data,
            statistics: guildResponse.statistics,
            timestamp: guildResponse.timestamp,
            missingEnchants: null,
            topPvp: null,
            topPve: null,
            roleCounts: null,
            error: null
        }
    } catch (error) {
        console.error('Error fetching guild data:', error)
        return {
            data: null,
            statistics: null,
            timestamp: null,
            missingEnchants: null,
            topPvp: null,
            topPve: null,
            roleCounts: null,
            error: error.message
        }
    }
}

// Page wrapper
export default async function AuditPage() {
    const guildData = await getGuildData()

    return (
        <main className={`fullbody ${publicSans.className}`}>
            <AuditGuild auditable initialData={guildData} />
        </main>
    )
}