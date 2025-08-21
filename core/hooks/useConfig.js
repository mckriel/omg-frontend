import { useState, useEffect } from 'react'
import baseConfig from '@/app.config.js'

export const useConfig = () => {
    const [config, setConfig] = useState(baseConfig)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch_dynamic_config = async () => {
            try {
                const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
                
                // Fetch specific settings from backend
                const raid_team_response = await fetch(`${backend_url}/settings/raid-team`, {
                    cache: 'no-store'
                })
                
                let backend_config = {}
                
                if (raid_team_response.ok) {
                    const raid_team_data = await raid_team_response.json()
                    if (raid_team_data.success && raid_team_data.settings) {
                        // Map backend settings to frontend config keys
                        if (raid_team_data.settings['ilvl-requirement']) {
                            backend_config.RAID_TEAM_ILVL = raid_team_data.settings['ilvl-requirement']
                        }
                    }
                }
                
                // Merge backend config with base config
                setConfig({
                    ...baseConfig,
                    ...backend_config
                })
                
            } catch (error) {
                console.log('useConfig: falling back to base config:', error.message)
                // Keep base config on error
            } finally {
                setLoading(false)
            }
        }

        fetch_dynamic_config()
    }, [])

    return { config, loading }
}

export default useConfig