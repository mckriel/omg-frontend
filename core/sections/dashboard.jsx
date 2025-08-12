'use client'
import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

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


import './scss/dashboard.scss'
import StatCard from '@/core/components/StatCard'
import TopPlayersTable from '@/core/components/TopPlayersTable'
import RoleDistribution from '@/core/components/RoleDistribution'

const Dashboard = ({ guildData }) => {
    const [isDataLoaded, setIsDataLoaded] = React.useState(false)
    const [searchFilter, setSearchFilter] = React.useState('')
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

        // Count players with raid lockouts using auditData
        const totalLocked = (auditData.locked || []).length

        // Get players with missing enchants from the optimized data
        const missingEnchantsPlayers = allPlayers.filter(player => 
            player.missingEnchants && player.missingEnchants.length > 0
        )

        // Count raid-ready players (675+ ilvl AND guild rank 0-6)
        const raidReadyPlayers = allPlayers.filter(player => {
            return player.itemLevel && player.itemLevel >= 675 && 
                   player.guildRank >= 0 && player.guildRank <= 6
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

        return {
            totalMembers: allPlayers.length,
            raidReadyCount: raidReadyPlayers.length,
            raidReadyPlayersData: raidReadyPlayersWithLockouts,
            missingEnchants: missingEnchants.all || 0,
            raidLocked: totalLocked,
            avgTopMplus: avgTopMplus,
            avgTopPvp: avgTopPvp,
            topMplus: topPve,
            topPvp: topPvp,
            missingEnchantsPlayers: missingEnchantsPlayers,
            tanks: raidReadyTanks.length,
            healers: raidReadyHealers.length,
            dps: raidReadyDPS.length,
        }
    }, [auditData, guildData])

    if (!isDataLoaded) {
        return null
    }

    return (
        <section className="dashboard">
            <Box>
                {/* Role Stats Cards */}
                <Grid container spacing={2} className="stats-cards">
                    <Grid item xs={12} sm={6} md={4}>
                        <StatCard
                            title="Tanks"
                            value={data.tanks}
                            description="Active tank players"
                            icon={ShieldIcon}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatCard
                            title="Healers"
                            value={data.healers}
                            description="Active healer players"
                            icon={LocalHospitalIcon}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatCard
                            title="DPS"
                            value={data.dps}
                            description="Active DPS players"
                            icon={SwordIcon}
                        />
                    </Grid>
                </Grid>

                {/* Other Stats Cards */}
                <Grid container spacing={2} className="stats-cards" sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <StatCard
                            title="Characters"
                            value={data.raidReadyCount}
                            description="Raid ready characters"
                            icon={GroupIcon}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <StatCard
                            title="Missing Enchants"
                            value={data.missingEnchants}
                            description="Players need attention"
                            icon={BuildIcon}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <StatCard
                            title="Raid Locked"
                            value={data.raidLocked}
                            description="Players with lockouts"
                            icon={LockIcon}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <StatCard
                            title="M+ Score"
                            value={Math.round(data.avgTopMplus)}
                            description="Average of top 5"
                            icon={StarIcon}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <StatCard
                            title="PvP Rating"
                            value={Math.round(data.avgTopPvp)}
                            description="Average of top 5"
                            icon={EmojiEventsIcon}
                        />
                    </Grid>
                </Grid>


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
                        sx={{ 
                            width: 300,
                            mt: 4,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#2a2a2a',
                                fontFamily: 'var(--font-blizzard-primary)',
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
                                    opacity: 0.7,
                                },
                            }
                        }}
                    />
                </Box>
                <AuditBlock
                    data={{ all: data.raidReadyPlayersData }}
                    name="all"
                    searchFilter={searchFilter}
                    onSearchChange={(value) => setSearchFilter(value)}
                />

                {/* Role Distribution */}
                <RoleDistribution tanks={data.tanks} healers={data.healers} dps={data.dps} />
            </Box>
        </section>
    )
}

export default Dashboard
