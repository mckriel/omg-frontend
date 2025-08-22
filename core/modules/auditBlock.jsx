import { useState, useEffect } from 'react'
import { P } from '@/core/components/typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { visuallyHidden } from '@mui/utils'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

import config from '@/app.config.js'

const {
    GUILLD_RANKS,
    RESULTS_PAGINATION,
    MIN_TIER_ITEMLEVEL,
    SEASON_START_DATE,
} = config

const processEnchants = (missingEnchantsCount) => {
    const totalEnchants = 8
    const currentEnchants = totalEnchants - (missingEnchantsCount || 0)
    const isComplete = currentEnchants === totalEnchants

    return (
        <Tooltip 
            title={`${currentEnchants} of ${totalEnchants} enchants applied`}
            placement="top"
        >
            <span style={{ 
                color: isComplete ? 'green' : 'red',
                fontWeight: isComplete ? 'normal' : 'bold'
            }}>
                {currentEnchants}/{totalEnchants}
            </span>
        </Tooltip>
    )
}

const processTierItems = (tierSets) => {
    if (!tierSets) {
        return (
            <Tooltip 
                title="No tier set information available" 
                placement="top"
            >
                <span>N/A</span>
            </Tooltip>
        )
    }

    const { season3 } = tierSets;
    const tierCount = Math.min(season3 || 0, 4); // Cap at 4 even if they have 5
    const isComplete = tierCount === 4;
    
    return (
        <Tooltip 
            title={`Season 3: ${tierCount}/4 tier pieces`} 
            placement="top"
        >
            <span style={{
                color: isComplete ? 'green' : (tierCount >= 2 ? 'orange' : 'red'),
                fontWeight: isComplete ? 'normal' : 'bold'
            }}>
                {tierCount}/4
            </span>
        </Tooltip>
    )
}

const processLockStatus = (lockStatus) => {
    if (!lockStatus || !lockStatus.lockedTo) {
        return (
            <Tooltip title="No raid lockout information" placement="top">
                <span>None</span>
            </Tooltip>
        )
    }

    const relevantLocks = []
    const lockedTo = lockStatus.lockedTo

    // Only check for Heroic and Mythic difficulties
    if (lockedTo.Heroic) {
        const { completed, total } = lockedTo.Heroic
        if (completed > 0) {
            relevantLocks.push(`Heroic: ${completed}/${total}`)
        }
    }

    if (lockedTo.Mythic) {
        const { completed, total } = lockedTo.Mythic
        if (completed > 0) {
            relevantLocks.push(`Mythic: ${completed}/${total}`)
        }
    }

    if (relevantLocks.length === 0) {
        return (
            <Tooltip title="No heroic or mythic raid lockouts" placement="top">
                <span>None</span>
            </Tooltip>
        )
    }

    const tooltipText = relevantLocks.join(', ')
    const displayText = relevantLocks.length > 1 
        ? `${relevantLocks.length} raids` 
        : relevantLocks[0].split(': ')[1] // Show just the progress for single raid

    return (
        <Tooltip title={tooltipText} placement="top">
            <span style={{ 
                cursor: 'help',
                borderBottom: '1px dotted',
                color: relevantLocks.length > 0 ? 'orange' : 'inherit'
            }}>
                {displayText}
            </span>
        </Tooltip>
    )
}

const processJewelrySockets = (jewelrySummary) => {
    if (!jewelrySummary) {
        return (
            <Tooltip title="No jewelry data available" placement="top">
                <span>N/A</span>
            </Tooltip>
        )
    }

    const { gemmed_sockets = 0, total_sockets = 0 } = jewelrySummary
    const percentage = total_sockets > 0 ? (gemmed_sockets / total_sockets) * 100 : 0
    const isComplete = gemmed_sockets === 6 && total_sockets === 6

    return (
        <Tooltip
            title={`${gemmed_sockets} of ${total_sockets} jewelry sockets gemmed (${Math.round(percentage)}%)`}
            placement="top"
        >
            <span style={{ 
                color: isComplete ? 'green' : 'red',
                fontWeight: isComplete ? 'normal' : 'bold'
            }}>
                {gemmed_sockets}/{total_sockets}
            </span>
        </Tooltip>
    )
}

const processCloak = (missingCloak, cloakItemLevel, allPlayersData) => {
    if (missingCloak || !cloakItemLevel) {
        return (
            <Tooltip title='Missing "Reshii Wraps"' placement="top">
                <span style={{ color: 'red' }}>✕</span>
            </Tooltip>
        )
    }

    // Find the maximum cloak item level from all players
    const maxCloakLevel = Math.max(
        ...allPlayersData
            .filter(player => player.cloakItemLevel && !player.missingCloak)
            .map(player => player.cloakItemLevel)
    )

    const isMaxLevel = cloakItemLevel === maxCloakLevel

    return (
        <Tooltip
            title={`Cloak item level: ${cloakItemLevel}${isMaxLevel ? ' (Max)' : ''}`}
            placement="top"
        >
            <span style={{ 
                color: isMaxLevel ? 'green' : 'orange',
                fontWeight: 'bold'
            }}>
                {cloakItemLevel}
            </span>
        </Tooltip>
    )
}

const headCells = [
    { id: 'avatar', label: '', sortable: false, width: 120 },
    { id: 'itemlevel', label: 'ILvL', sortable: false, width: 50 },
    { id: 'name', label: 'Character', sortable: false },
    { id: 'links', label: '', sortable: false, width: 100 },
    { id: 'guildRank', label: 'Guild Rank', sortable: false },
    { id: 'enchants', label: 'Enchants', sortable: false },
    { id: 'jewelry', label: 'Jewelry', sortable: false },
    { id: 'hasCloak', label: 'Cloak', sortable: false },
    { id: 'tier', label: 'Tier', sortable: false },
    { id: 'locked', label: 'Locked', sortable: false },
]

function EnhancedTableHead({ order, orderBy, onRequestSort, officerList }) {
    const createSortHandler = (property) => (event) => {
        if (property !== 'avatar') {
            onRequestSort(event, property)
        }
    }

    return (
        <TableHead>
            <TableRow className="table-header-modern">
                {headCells.map((headCell) => {
                    if (
                        officerList &&
                        [
                            'guildRank',
                            'enchants',
                            'tier',
                            'locked',
                            'lastUpdated',
                            'links',
                        ].includes(headCell.id)
                    ) {
                        return null
                    }
                    return (
                        <TableCell
                            key={headCell.id}
                            sortDirection={
                                orderBy === headCell.id ? order : false
                            }
                            sx={{ 
                                width: headCell.width,
                                fontWeight: 'bold',
                                fontFamily: 'var(--font-blizzard-primary)'
                            }}
                        >
                            {headCell.sortable ? (
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={
                                        orderBy === headCell.id ? order : 'asc'
                                    }
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box
                                            component="span"
                                            sx={visuallyHidden}
                                        >
                                            {order === 'desc'
                                                ? 'sorted descending'
                                                : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            ) : (
                                headCell.label
                            )}
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}

const getStatDifference = (current, stats) => {
    if (!stats) return null

    const seasonDate = new Date(SEASON_START_DATE)
    const now = Date.now()

    // If we're past season 2 start date, use season 2 date as reference
    const referenceDate =
        now >= seasonDate.getTime() ? seasonDate.getTime() : now
    const sevenDaysAgo = referenceDate - 7 * 24 * 60 * 60 * 1000

    // Find the closest timestamp to 7 days ago
    const oldestValidTimestamp = Object.keys(stats)
        .map(Number)
        .filter(
            (timestamp) =>
                timestamp >= sevenDaysAgo && timestamp <= referenceDate
        )
        .sort((a, b) => a - b)[0]

    if (!oldestValidTimestamp || !stats[oldestValidTimestamp]) return null

    return {
        timestamp: oldestValidTimestamp,
        data: stats[oldestValidTimestamp],
    }
}

const AuditBlock = ({ data, name, hideControls, searchFilter, onSearchChange, show_not_raid_ready_highlighting = false }) => {
    if (!data[name]?.length && name !== 'locked') {
        return null
    }

    const renderData = name !== 'locked' ? data[name] : data
    const [order, setOrder] = useState('desc')
    const [orderBy, setOrderBy] = useState('itemlevel')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(RESULTS_PAGINATION.MAX_ITEMS)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    // Reset pagination when data changes
    useEffect(() => {
        setPage(0)
    }, [data])

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy)
    }

    const descendingComparator = (a, b, orderBy) => {
        switch (orderBy) {
            case 'itemlevel':
                return b.itemLevel - a.itemLevel
            case 'name':
                return b.name.localeCompare(a.name)
            case 'score':
                return (Math.round(b.mplus) || 0) - (Math.round(a.mplus) || 0)
            case 'pvp':
                return (b.pvp || 0) - (a.pvp || 0)
            default:
                return 0
        }
    }

    // Filter data based on search
    const filteredData = renderData.filter(player => {
        if (!searchFilter || searchFilter === '') return true
        const searchLower = searchFilter.toLowerCase()
        return (
            player.name?.toLowerCase().includes(searchLower) ||
            player.spec?.toLowerCase().includes(searchLower) ||
            player.class?.toLowerCase().includes(searchLower) ||
            (GUILLD_RANKS[player.guildRank] || '').toLowerCase().includes(searchLower)
        )
    })

    const sortedData = filteredData.sort(getComparator(order, orderBy))

    return (
        <Paper className="glass-table" sx={{ width: '100%', mb: 2, background: 'transparent', boxShadow: 'none' }}>
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {sortedData
                            .map((item, index) => (
                                <TableRow 
                                    key={index} 
                                    className="table-row-modern"
                                    sx={{
                                        backgroundColor: (show_not_raid_ready_highlighting && (!item.raid_ready || item.cloakItemLevel < Math.max(...sortedData.map(p => p.cloakItemLevel || 0)))) ? 'rgba(255, 193, 7, 0.08)' : 'transparent',
                                        borderLeft: (show_not_raid_ready_highlighting && (!item.raid_ready || item.cloakItemLevel < Math.max(...sortedData.map(p => p.cloakItemLevel || 0)))) ? '2px solid rgba(255, 193, 7, 0.3)' : 'none',
                                        '&:hover': {
                                            backgroundColor: (show_not_raid_ready_highlighting && (!item.raid_ready || item.cloakItemLevel < Math.max(...sortedData.map(p => p.cloakItemLevel || 0)))) ? 'rgba(255, 193, 7, 0.12)' : 'rgba(255, 255, 255, 0.05)'
                                        }
                                    }}
                                >
                                    <TableCell sx={{ width: 120 }}>
                                        <div className="mediaWrapper">
                                            {item?.media?.assets?.length ? (
                                                <img
                                                    src={
                                                        item?.media?.assets[0]
                                                            ?.value
                                                    }
                                                    alt={item.name}
                                                    width={60}
                                                    height={60}
                                                    style={{
                                                        borderRadius: '12px',
                                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                                                        border: '2px solid rgba(255, 255, 255, 0.1)',
                                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                        objectFit: 'cover'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1.05)'
                                                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.25)'
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1)'
                                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'
                                                    }}
                                                />
                                            ) : (
                                                <img
                                                    src={
                                                        '/images/logo-without-text.png'
                                                    }
                                                    alt={item.name}
                                                    width={60}
                                                    height={60}
                                                    style={{
                                                        opacity: '0.4',
                                                        borderRadius: '12px',
                                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                                                        border: '2px solid rgba(255, 255, 255, 0.1)',
                                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                        objectFit: 'cover'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1.05)'
                                                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.25)'
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1)'
                                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell sx={{ width: 50 }}>
                                        {item.stats ? (
                                            <Badge
                                                badgeContent={(() => {
                                                    const diff =
                                                        getStatDifference(
                                                            item.itemLevel,
                                                            item.stats
                                                        )
                                                    if (!diff) return null
                                                    const change = Math.round(
                                                        item.itemLevel -
                                                            diff.data.itemLevel
                                                    )
                                                    return change === 0
                                                        ? null
                                                        : change > 0
                                                          ? `+${change}`
                                                          : change
                                                })()}
                                                color={(() => {
                                                    const diff =
                                                        getStatDifference(
                                                            item.itemLevel,
                                                            item.stats
                                                        )
                                                    if (!diff) return 'default'
                                                    const change =
                                                        item.itemLevel -
                                                        diff.data.itemLevel
                                                    return change > 0
                                                        ? 'success'
                                                        : change < 0
                                                          ? 'error'
                                                          : 'default'
                                                })()}
                                            >
                                                <span>
                                                    {item.itemLevel}
                                                </span>
                                            </Badge>
                                        ) : (
                                            item.itemLevel
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            className={`name ${item.class}`}
                                        >
                                            <P>{item.name}</P>
                                        </div>
                                        <div className="classandspec">
                                            <P className="spec">
                                                {item.spec} {item.class}
                                            </P>
                                        </div>
                                    </TableCell>
                                    <TableCell sx={{ width: 100, textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center' }}>
                                            <a
                                                href={`https://worldofwarcraft.blizzard.com/en-gb/character/eu/${item.server}/${item.name.toLowerCase()}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    textDecoration: 'none',
                                                    opacity: 0.7,
                                                    transition: 'opacity 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                                onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
                                            >
                                                <img 
                                                    src="/images/armory.png" 
                                                    alt="WoW Armory" 
                                                    style={{
                                                        width: '22px',
                                                        height: '22px',
                                                        objectFit: 'contain'
                                                    }}
                                                />
                                            </a>
                                            <a
                                                href={`https://www.warcraftlogs.com/character/eu/${item.server}/${item.name.toLowerCase()}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    textDecoration: 'none',
                                                    opacity: 0.7,
                                                    transition: 'opacity 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                                onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
                                            >
                                                <img 
                                                    src="/images/wcl.png" 
                                                    alt="Warcraft Logs" 
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        objectFit: 'contain'
                                                    }}
                                                />
                                            </a>
                                            <a
                                                href={`https://raider.io/characters/eu/${item.server}/${item.name}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    textDecoration: 'none',
                                                    opacity: 0.7,
                                                    transition: 'opacity 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                                onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
                                            >
                                                <img 
                                                    src="/images/raiderio.png" 
                                                    alt="Raider.IO" 
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        objectFit: 'contain'
                                                    }}
                                                />
                                            </a>
                                        </div>
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: 'var(--font-blizzard-primary)' }}>
                                        {GUILLD_RANKS[item.guildRank] || item.guildRank}
                                    </TableCell>
                                    <TableCell>
                                        {processEnchants(item.missingEnchantsCount)}
                                    </TableCell>
                                    <TableCell>
                                        {processJewelrySockets(item.jewelry)}
                                    </TableCell>
                                    <TableCell>
                                        {processCloak(item.missingCloak, item.cloakItemLevel, sortedData)}
                                    </TableCell>
                                    <TableCell>
                                        {processTierItems(item.tierSets)}
                                    </TableCell>
                                    <TableCell>
                                        {processLockStatus(item.lockStatus)}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default AuditBlock
