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

const processMissingEnchants = (missingEnchants) => {
    if (!missingEnchants || missingEnchants.length === 0) {
        return <span>none</span>
    }

    const amount = missingEnchants.length
    const value = missingEnchants.join(', ')

    return (
        <Tooltip title={value} placement="top">
            <span>{amount}</span>
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

    const { season2, season3 } = tierSets;
    
    return (
        <Tooltip 
            title={`Season 2: ${season2}/5 | Season 3: ${season3}/5`} 
            placement="top"
        >
            <span>{`${season2}/5 | ${season3}/5`}</span>
        </Tooltip>
    )
}

const processHasWaist = (missingWaist) => {
    return (
        <Tooltip
            title={
                !missingWaist
                    ? 'Has "Durable Information Securing Container"'
                    : 'Missing "Durable Information Securing Container"'
            }
            placement="top"
        >
            <span>
                {!missingWaist ? (
                    <span style={{ color: 'green' }}>⬤</span>
                ) : (
                    <span style={{ color: 'red' }}>✕</span>
                )}
            </span>
        </Tooltip>
    )
}

const processHasCloak = (missingCloak) => {
    return (
        <Tooltip
            title={
                !missingCloak
                    ? 'Has "Reshii Wraps"'
                    : 'Missing "Reshii Wraps"'
            }
            placement="top"
        >
            <span>
                {!missingCloak ? (
                    <span style={{ color: 'green' }}>⬤</span>
                ) : (
                    <span style={{ color: 'red' }}>✕</span>
                )}
            </span>
        </Tooltip>
    )
}

const headCells = [
    { id: 'avatar', label: '', sortable: false, width: 120 },
    { id: 'itemlevel', label: 'ILvL', sortable: false, width: 50 },
    { id: 'name', label: 'Name & Spec', sortable: true, width: 240 },
    { id: 'guildRank', label: 'Guild Rank', sortable: false },
    { id: 'enchants', label: 'Missing Enchants', sortable: false },
    { id: 'hasWaist', label: 'Waist', sortable: false },
    { id: 'hasCloak', label: 'Cloak', sortable: false },
    { id: 'tier', label: 'Tier Sets (S2|S3)', sortable: false },
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
            <TableRow>
                {headCells.map((headCell) => {
                    if (
                        officerList &&
                        [
                            'guildRank',
                            'enchants',
                            'tier',
                            'locked',
                            'lastUpdated',
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
                            sx={{ width: headCell.width }}
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

const AuditBlock = ({ data, name, hideControls, searchFilter, onSearchChange }) => {
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
        <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {sortedData
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((item, index) => (
                                <TableRow key={index}>
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
                                                />
                                            ) : (
                                                <img
                                                    style={{ opacity: '0.4' }}
                                                    src={
                                                        '/images/logo-without-text.png'
                                                    }
                                                    alt={item.name}
                                                    width={60}
                                                    height={60}
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
                                    <TableCell sx={{ width: 240 }}>
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
                                    <TableCell>
                                        {GUILLD_RANKS[item.guildRank] || item.guildRank}
                                    </TableCell>
                                    <TableCell>
                                        {processMissingEnchants(
                                            item.missingEnchants
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {processHasWaist(item.missingWaist)}
                                    </TableCell>
                                    <TableCell>
                                        {processHasCloak(item.missingCloak)}
                                    </TableCell>
                                    <TableCell>
                                        {processTierItems(item.tierSets)}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip
                                            title={
                                                <div style={{ 
                                                    whiteSpace: 'pre-line',
                                                    fontSize: '0.875rem',
                                                    padding: '8px'
                                                }}>
                                                    {item.lockedTooltipString || 'No lockout information available'}
                                                </div>
                                            }
                                            placement="top"
                                            arrow
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        bgcolor: 'background.paper',
                                                        color: 'text.primary',
                                                        '& .MuiTooltip-arrow': {
                                                            color: 'background.paper',
                                                        },
                                                        boxShadow: 1,
                                                        maxWidth: 'none'
                                                    }
                                                }
                                            }}
                                        >
                                            <span style={{ 
                                                cursor: 'help',
                                                borderBottom: '1px dotted'
                                            }}>
                                                {item.lockedToString || 'None'}
                                            </span>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!hideControls && (
                <TablePagination
                    rowsPerPageOptions={[20, 50, 80, 100]}
                    component="div"
                    count={sortedData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    )
}

export default AuditBlock
