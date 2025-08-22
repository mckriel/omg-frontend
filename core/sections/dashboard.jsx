'use client'
import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import AuditBlock from '@/core/modules/auditBlock'
import baseConfig from '@/app.config.js'
import useAuditData from '@/core/hooks/useAuditData'
import useConfig from '@/core/hooks/useConfig'
import getPreviousWednesdayAt1AM from '@/core/utils/currentLockout'

import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

import GroupIcon from '@mui/icons-material/Group'
import BuildIcon from '@mui/icons-material/Build'
import LockIcon from '@mui/icons-material/Lock'
import StarIcon from '@mui/icons-material/Star'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ShieldIcon from '@mui/icons-material/Shield'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import SwordIcon from '@mui/icons-material/MyLocation'
import WarningIcon from '@mui/icons-material/Warning'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import ScrollIcon from '@mui/icons-material/Description'
import Tooltip from '@mui/material/Tooltip'
import DiamondIcon from '@mui/icons-material/Diamond'
import Button from '@mui/material/Button'


import './scss/dashboard.scss'
import StatCard from '@/core/components/StatCard'
import TopPlayersTable from '@/core/components/TopPlayersTable'
import RoleDistribution from '@/core/components/RoleDistribution'

const Dashboard = ({ guildData }) => {
    const { config, loading: config_loading } = useConfig()
    const [isDataLoaded, setIsDataLoaded] = React.useState(false)
    const [searchFilter, setSearchFilter] = React.useState('')
    const [showMissingEnchantsOnly, setShowMissingEnchantsOnly] = React.useState(false)
    const [showLockedOnly, setShowLockedOnly] = React.useState(false)
    const [show_not_raid_ready_highlighting, setShow_not_raid_ready_highlighting] = React.useState(false)
    const [query, setQuery] = React.useState('')
    const [classFilter, setClassFilter] = React.useState([])
    const [rankFilter, setRankFilter] = React.useState('all')
    const [specFilter, setSpecFilter] = React.useState('all')
    const [ilevelFilter, setIlevelFilter] = React.useState(
        baseConfig.INITIAL_FILTERS.defaultItemLevel
    )
    const [instanceIndex, setInstanceIndex] = React.useState(
        baseConfig.INITIAL_FILTERS.instanceIndex
    )
    const [lockTimeStamp, setLockTimeStamp] = React.useState(
        getPreviousWednesdayAt1AM(Date.now())
    )

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
        const allPlayers = (guildDataToUse || []).map(player => ({
            ...player,
            itemLevel: player.item_level,
            guildRank: parseInt(player.guild_rank),
            missingEnchantsCount: player.missing_enchants_count,
            missingCloak: player.missing_cloak,
            cloakItemLevel: player.cloak_item_level,
            tierSets: player.tier_sets,
            lockStatus: {
                isLocked: player.lockout_status?.isLocked || false,
                lockedTo: player.lockout_status?.lockedTo || {}
            },
            jewelrySummary: player.jewelry
        }))

        const statistics = guildData.statistics || {};
        const missingEnchants = guildData.missingEnchants || { all: 0, mains: 0, alts: 0 };
        const topPvp = guildData.topPvp || [];
        const topPve = guildData.topPve || [];
        const roleCounts = guildData.roleCounts || { tanks: 0, healers: 0, dps: 0 };

        const avgTopMplus = topPve.length > 0 
            ? topPve.reduce((acc, p) => acc + (p.score || 0), 0) / topPve.length 
            : 0
        const avgTopPvp = topPvp.length > 0 
            ? topPvp.reduce((acc, p) => acc + (p.rating || 0), 0) / topPvp.length 
            : 0

        const raidReadyData = {
            players: allPlayers,
            tanks: [],
            healers: [],
            dps: [],
            missingEnchants: [],
            missingSockets: []
        }

        allPlayers.forEach(player => {
            if (config.TANKS.includes(player.spec)) {
                raidReadyData.tanks.push(player)
            } else if (config.HEALERS.includes(player.spec)) {
                raidReadyData.healers.push(player)
            } else {
                raidReadyData.dps.push(player)
            }

            if (player.missingEnchants && player.missingEnchants.length > 0) {
                const nonHeadMissingEnchants = player.missingEnchants.filter(slot => slot !== 'head')
                if (nonHeadMissingEnchants.length > 0) {
                    raidReadyData.missingEnchants.push(player)
                }
            }

            const jewelry = player.jewelry || {}
            const gemmedSockets = jewelry.gemmed_sockets || 0
            if (gemmedSockets !== 6) {
                raidReadyData.missingSockets.push(player)
            }
        })

        const totalLocked = allPlayers.filter(player => 
            player.lockedToString && player.lockedToString !== 'None'
        ).length

        const maxCloakLevel = Math.max(...allPlayers.map(player => player.cloak_item_level || 0))
        const notRaidReadyCount = allPlayers.filter(player => 
            !player.raid_ready || player.cloak_item_level < maxCloakLevel
        ).length
        const raidReadyPlayersOnly = allPlayers.filter(player => player.raid_ready)
        const avgItemLevel = raidReadyPlayersOnly.length > 0 
            ? (raidReadyPlayersOnly.reduce((sum, player) => sum + player.itemLevel, 0) / raidReadyPlayersOnly.length).toFixed(1)
            : 0

        const raidReadyPlayers = raidReadyData.players
        const missingEnchantsPlayers = raidReadyData.missingEnchants
        const missingSocketsPlayers = raidReadyData.missingSockets
        const raidReadyTanks = raidReadyData.tanks
        const raidReadyHealers = raidReadyData.healers
        const raidReadyDPS = raidReadyData.dps

        setIsDataLoaded(true)

        let filteredRaidReadyPlayers = allPlayers;
        
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
            notRaidReady: notRaidReadyCount,
            avgItemLevel: avgItemLevel,
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

                <div className="dashboard-grid">
                    <StatCard
                        title="Characters"
                        value={data.raidReadyCount}
                        description="Raid-ready"
                        icon={GroupIcon}
                    />
                    <StatCard
                        title="Not Raid Ready"
                        value={data.notRaidReady}
                        description="Characters"
                        icon={WarningIcon}
                    />
                    <StatCard
                        title="Item Level"
                        value={data.avgItemLevel}
                        description="Average"
                        icon={TrendingUpIcon}
                    />
                    <StatCard
                        title="Raid Locked"
                        value={data.raidLocked}
                        description="Characters"
                        icon={LockIcon}
                    />
                </div>


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
                        <Tooltip title={show_not_raid_ready_highlighting ? 'Hide Not Raid Ready' : 'Show Not Raid Ready'}>
                            <IconButton
                                color={show_not_raid_ready_highlighting ? "warning" : "default"}
                                onClick={() => setShow_not_raid_ready_highlighting(!show_not_raid_ready_highlighting)}
                                sx={{ 
                                    mr: 2,
                                    backgroundColor: show_not_raid_ready_highlighting ? 'rgba(237, 108, 2, 0.1)' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: show_not_raid_ready_highlighting ? 'rgba(237, 108, 2, 0.2)' : 'rgba(255, 255, 255, 0.1)'
                                    }
                                }}
                            >
                                <WarningIcon />
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
                    show_not_raid_ready_highlighting={show_not_raid_ready_highlighting}
                />

            </Box>
        </section>
    )
}

export default Dashboard
