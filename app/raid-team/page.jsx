import Dashboard from '@/core/sections/dashboard'
import { Poppins } from 'next/font/google'
import { api } from '@/lib/api'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    fallback: ['system-ui', 'arial', 'sans-serif'],
    preload: false, // Disable preloading to avoid build issues
})

export const revalidate = 600

async function getRaidTeamData() {
    try {
        const raidTeamResponse = await api.getRaidTeamData();

        return {
            data: raidTeamResponse.data,
            statistics: null,
            timestamp: null,
            missingEnchants: null,
            topPvp: null,
            topPve: null,
            roleCounts: null,
            error: null
        }
    } catch (error) {
        console.error('Error fetching raid team data:', error)
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

export default async function DashboardPage() {
    const raidTeamData = await getRaidTeamData()

    return (
        <main className={`fullbody ${poppins.className}`}>
            <Dashboard guildData={raidTeamData} />
        </main>
    )
}