'use client'
import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import AuditBlock from '@/core/modules/auditBlock'
import config from '@/app.config.js'
import useAuditData from '@/core/hooks/useAuditData'
import getPreviousWednesdayAt1AM from '@/core/utils/currentLockout'

import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

// Icons
import GroupIcon from '@mui/icons-material/Group'
import BuildIcon from '@mui/icons-material/Build'
import LockIcon from '@mui/icons-material/Lock'
import StarIcon from '@mui/icons-material/Star'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ShieldIcon from '@mui/icons-material/Shield'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import SwordIcon from '@mui/icons-material/MyLocation'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import ScrollIcon from '@mui/icons-material/Description'
import Tooltip from '@mui/material/Tooltip'
import DiamondIcon from '@mui/icons-material/Diamond'


import './scss/dashboard.scss'
import StatCard from '@/core/components/StatCard'
import TopPlayersTable from '@/core/components/TopPlayersTable'
import RoleDistribution from '@/core/components/RoleDistribution'

const Dashboard = ({ guildData }) => {
    const [isDataLoaded, setIsDataLoaded] = React.useState(false)
    const [searchFilter, setSearchFilter] = React.useState('')
    const [showMissingEnchantsOnly, setShowMissingEnchantsOnly] = React.useState(false)
    const [showLockedOnly, setShowLockedOnly] = React.useState(false)
    const [query, setQuery] = React.useState('')
    const [classFilter, setClassFilter] = React.useState([])
    const [rankFilter, setRankFilter] = React.useState('all')
    const [specFilter, setSpecFilter] = React.useState('all')
    const [ilevelFilter, setIlevelFilter] = React.useState(
        config.INITIAL_FILTERS.defaultItemLevel
    )
    const [instanceIndex, setInstanceIndex] = React.useState(
        config.INITIAL_FILTERS.instanceIndex
    )
    const [lockTimeStamp, setLockTimeStamp] = React.useState(
        getPreviousWednesdayAt1AM(Date.now())
    )

    // Handle loading and error states
    if (!guildData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    if (guildData.error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">
                    <Typography variant="h6">Failed to load guild data</Typography>
                    <Typography variant="body2">{guildData.error}</Typography>
                </Alert>
            </Box>
        )
    }

    const guildDataToUse = guildData.data || []

    const auditData = useAuditData(guildDataToUse, [
        query,
        classFilter,
        rankFilter,
        specFilter,
        ilevelFilter,
        instanceIndex,
        lockTimeStamp,
    ])

    const data = useMemo(() => {
        const allPlayers = guildDataToUse || []

        // Use statistics from API response
        const statistics = guildData.statistics || {};
        const missingEnchants = guildData.missingEnchants || { all: 0, mains: 0, alts: 0 };
        const topPvp = guildData.topPvp || [];
        const topPve = guildData.topPve || [];
        const roleCounts = guildData.roleCounts || { tanks: 0, healers: 0, dps: 0 };

        // Calculate averages from top players
        const avgTopMplus = topPve.length > 0 
            ? topPve.reduce((acc, p) => acc + (p.score || 0), 0) / topPve.length 
            : 0
        const avgTopPvp = topPvp.length > 0 
            ? topPvp.reduce((acc, p) => acc + (p.rating || 0), 0) / topPvp.length 
            : 0

        // Count raid-ready players with raid lockouts (same criteria as raid-ready players)
        const totalLocked = (auditData.locked || []).filter(player =>
            player.itemLevel && player.itemLevel >= 675 && 
            player.guildRank >= 0 && player.guildRank <= 6
        ).length

        // Count raid-ready players (675+ ilvl AND guild rank 0-6)
        const raidReadyPlayers = allPlayers.filter(player => {
            return player.itemLevel && player.itemLevel >= 675 && 
                   player.guildRank >= 0 && player.guildRank <= 6
        })

        // Get raid-ready players with missing enchants (excluding head enchants)
        const missingEnchantsPlayers = raidReadyPlayers.filter(player => {
            if (!player.missingEnchants || player.missingEnchants.length === 0) {
                return false
            }
            
            // Filter out head enchants from missing enchants
            const nonHeadMissingEnchants = player.missingEnchants.filter(slot => slot !== 'head')
            return nonHeadMissingEnchants.length > 0
        })

        // Get raid-ready players with missing jewelry sockets (not 6/6)
        const missingSocketsPlayers = raidReadyPlayers.filter(player => {
            // Check if player doesn't have 6 gemmed sockets
            const jewelry = player.jewelry || {}
            const gemmedSockets = jewelry.gemmed_sockets || 0
            
            // Player needs gems if they don't have 6 gemmed sockets
            return gemmedSockets !== 6
        })

        // Get raid-ready players from processed auditData (includes lockout info)
        const raidReadyPlayersWithLockouts = auditData.all.filter(player => {
            return player.itemLevel && player.itemLevel >= 675 &&
                   player.guildRank >= 0 && player.guildRank <= 6
        })

        // Calculate role counts from raid-ready players
        const raidReadyTanks = raidReadyPlayers.filter(player => 
            config.TANKS.includes(player.spec)
        )
        const raidReadyHealers = raidReadyPlayers.filter(player => 
            config.HEALERS.includes(player.spec)
        )
        const raidReadyDPS = raidReadyPlayers.filter(player => 
            !config.TANKS.includes(player.spec) && !config.HEALERS.includes(player.spec)
        )

        setIsDataLoaded(true)

        // Apply filters if active
        let filteredRaidReadyPlayers = raidReadyPlayersWithLockouts;
        
        if (showMissingEnchantsOnly) {
            filteredRaidReadyPlayers = filteredRaidReadyPlayers.filter(player => 
                player.missingEnchants && player.missingEnchants.length > 0
            );
        }
        
        if (showLockedOnly) {
            filteredRaidReadyPlayers = filteredRaidReadyPlayers.filter(player => 
                player.lockedToString && player.lockedToString !== 'None'
            );
        }

        return {
            totalMembers: allPlayers.length,
            raidReadyCount: raidReadyPlayers.length,
            raidReadyPlayersData: filteredRaidReadyPlayers,
            missingEnchants: missingEnchantsPlayers.length,
            raidLocked: totalLocked,
            missingSockets: missingSocketsPlayers.length,
            avgTopPvp: avgTopPvp,
            topMplus: topPve,
            topPvp: topPvp,
            missingEnchantsPlayers: missingEnchantsPlayers,
            missingSocketsPlayers: missingSocketsPlayers,
            tanks: raidReadyTanks.length,
            healers: raidReadyHealers.length,
            dps: raidReadyDPS.length,
        }
    }, [auditData, guildData, showMissingEnchantsOnly, showLockedOnly])

    if (!isDataLoaded) {
        return null
    }

    return (
        <section className="dashboard">
            <Box>
                {/* Role Stats Cards */}
                <div className="dashboard-grid">
                    <StatCard
                        title="Tanks"
                        value={data.tanks}
                        description="Active tank players"
                        icon={ShieldIcon}
                    />
                    <StatCard
                        title="Healers"
                        value={data.healers}
                        description="Active healer players"
                        icon={LocalHospitalIcon}
                    />
                    <StatCard
                        title="DPS"
                        value={data.dps}
                        description="Active DPS players"
                        icon={SwordIcon}
                    />
                </div>

                {/* Other Stats Cards */}
                <div className="dashboard-grid">
                    <StatCard
                        title="Characters"
                        value={data.raidReadyCount}
                        description="Raid-ready"
                        icon={GroupIcon}
                    />
                    <StatCard
                        title="Missing Enchants"
                        value={data.missingEnchants}
                        description="Characters missing enchants"
                        icon={BuildIcon}
                    />
                    <StatCard
                        title="Missing Gems"
                        value={data.missingSockets}
                        description="Characters missing gems"
                        icon={DiamondIcon}
                    />
                    <StatCard
                        title="Raid Locked"
                        value={data.raidLocked}
                        description="Characters"
                        icon={LockIcon}
                    />
                </div>


                {/* Raid Roster Table */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.25 }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        className="missing-enchants-title"
                        sx={{ mb: 0 }}
                    >
                        Raid Roster
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 4 }}>
                        <Tooltip title="Show only players with missing enchants">
                            <IconButton
                                onClick={() => setShowMissingEnchantsOnly(!showMissingEnchantsOnly)}
                                sx={{
                                    backgroundColor: showMissingEnchantsOnly ? '#4a4a4a' : '#2a2a2a',
                                    color: showMissingEnchantsOnly ? '#ffa726' : '#fff',
                                    '&:hover': {
                                        backgroundColor: showMissingEnchantsOnly ? '#5a5a5a' : '#3a3a3a',
                                    },
                                    transition: 'all 0.2s ease',
                                    borderRadius: 1,
                                }}
                            >
                                <ScrollIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Show only players with raid lockouts">
                            <IconButton
                                onClick={() => setShowLockedOnly(!showLockedOnly)}
                                sx={{
                                    backgroundColor: showLockedOnly ? '#4a4a4a' : '#2a2a2a',
                                    color: showLockedOnly ? '#ffa726' : '#fff',
                                    '&:hover': {
                                        backgroundColor: showLockedOnly ? '#5a5a5a' : '#3a3a3a',
                                    },
                                    transition: 'all 0.2s ease',
                                    borderRadius: 1,
                                }}
                            >
                                <LockIcon />
                            </IconButton>
                        </Tooltip>
                        <TextField
                            size="small"
                            placeholder="Search players..."
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            className="modern-search-input"
                            sx={{ 
                                width: 300,
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'transparent',
                                    fontFamily: 'var(--font-blizzard-primary)',
                                    color: 'white',
                                    '& fieldset': {
                                        border: 'none',
                                    },
                                    '&:hover fieldset': {
                                        border: 'none',
                                    },
                                    '&.Mui-focused fieldset': {
                                        border: 'none',
                                    },
                                    '& input::placeholder': {
                                        fontFamily: 'var(--font-blizzard-primary)',
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        opacity: 1,
                                    },
                                    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                                        color: 'var(--wow-gold)',
                                    }
                                }
                            }}
                        />
                    </Box>
                </Box>
                <AuditBlock
                    data={{ all: data.raidReadyPlayersData }}
                    name="all"
                    searchFilter={searchFilter}
                    onSearchChange={(value) => setSearchFilter(value)}
                />

            </Box>
        </section>
    )
}

export default Dashboard
