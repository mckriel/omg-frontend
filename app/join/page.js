import Join from "@/core/sections/recruitment";
import { api } from '@/lib/api'

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

const RosterPage = async () => {
  const guildData = await getGuildData();

  return <Join guildData={guildData} />;
};

export default RosterPage;