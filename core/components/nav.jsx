import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssessmentIcon from '@mui/icons-material/Assessment'
import StarIcon from '@mui/icons-material/Star'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import HowToRegIcon from '@mui/icons-material/HowToReg'

import './scss/nav.scss'

// Helper function to format guild name properly
const formatGuildName = (name) => {
    if (!name) return '';
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const navigationItems = {
    OVERVIEW: {
        label: 'OVERVIEW',
        items: [
            {
                label: 'RAID TEAM',
                path: '/raid-team',
                icon: DashboardIcon,
            },
            {
                label: 'RECRUITMENT',
                path: '/join',
                icon: HowToRegIcon,
            },
            {
                label: 'AUDIT',
                path: '/audit',
                icon: AssessmentIcon,
            },
        ],
    },
}

function getInitialSection(path) {
    let bestMatch = { section: 'OVERVIEW', length: 0 }
    for (const [section, data] of Object.entries(navigationItems)) {
        data.items.forEach((item) => {
            if (
                path.startsWith(item.path) &&
                item.path.length > bestMatch.length
            ) {
                bestMatch = { section, length: item.path.length }
            }
        })
    }
    return bestMatch.section
}

function isActive(path, pathname) {
    if (path === '/') return pathname === path
    if (path === '/season2') return pathname === path
    return pathname.startsWith(path)
}

export { navigationItems, getInitialSection, isActive }

export default function Nav() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

    // Desktop horizontal nav bar
    const DesktopNavBar = () => (
        <div className="crm-nav-bar">
            <div className="crm-nav-left">
                {navigationItems.OVERVIEW.items.map((item) => (
                    <Link key={item.path} href={item.path} className="crm-nav-link">
                        <div className={`crm-nav-item${isActive(item.path, pathname) ? ' crm-nav-item-active' : ''}`}>
                            <item.icon className="crm-nav-item-icon" />
                            <span className="crm-nav-item-label">{item.label}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="crm-nav-right">
                <a 
                    href="https://www.warcraftlogs.com/guild/eu/sylvanas/one%20more%20game" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                        marginRight: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        background: 'transparent',
                        transition: 'transform 0.2s ease',
                        borderRadius: '4px',
                        padding: '4px'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    <img 
                        src="/images/wcl.png" 
                        alt="Warcraft Logs" 
                        style={{ 
                            width: '32px',
                            height: '32px',
                            objectFit: 'contain',
                            pointerEvents: 'none'
                        }}
                    />
                </a>
                <a 
                    href="https://discord.gg/z9JxvNQ5Zp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="discord-link"
                >
                    <span className="discord-text">Join our Discord</span>
                    <img 
                        src="/images/discord-white.png" 
                        alt="Join Discord" 
                        className="discord-icon"
                    />
                </a>
            </div>
        </div>
    )

    // Mobile nav items (drawer)
    const renderNavItems = () => (
        <List className="nav-mobile-list">
            <ListItem className="nav-mobile-section-label">
                <ListItemText primary="OVERVIEW" />
            </ListItem>
            {navigationItems.OVERVIEW.items.map((item) => (
                <ListItem disablePadding key={item.label} className="nav-mobile-list-item">
                    <ListItemButton
                        component={Link}
                        href={item.path}
                        selected={isActive(item.path, pathname)}
                        className="nav-mobile-list-btn"
                        onClick={handleDrawerToggle}
                        {...(item.external ? { target: '_blank' } : {})}
                    >
                        <ListItemIcon className="nav-mobile-list-icon">
                            <item.icon />
                        </ListItemIcon>
                        <ListItemText primary={item.label} className="nav-mobile-list-label" />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )

    return (
        <nav className="crm-nav-root">
            {/* Top bar: Logo and mobile menu button */}
            <div className="crm-logo-bar">
                <div className="crm-logo-bar-inner">
                    <Link href="/" className="crm-logo-link">
                        <div className="guild-header-container-vertical">
                            <img 
                                src="/images/omg-300px.png" 
                                alt="One More Game Logo" 
                                className="guild-emblem-image-centered"
                            />
                            <span className="guild-name-text-centered">{formatGuildName(process.env.NEXT_PUBLIC_GUILD_NAME)}</span>
                        </div>
                    </Link>
                    
                    {/* Mobile menu button (right side) */}
                    <div className="crm-mobile-menu-btn-wrapper">
                        <IconButton
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            className="crm-mobile-menu-btn"
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            {/* Desktop horizontal nav bar (hidden on mobile) */}
            <div className="crm-desktop-nav-wrapper">
                <DesktopNavBar />
            </div>
            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                className="nav-mobile-drawer"
            >
                <div className="nav-mobile-drawer-content">
                    <div className="logoSmall">
                        <div className="guild-header-container-vertical mobile">
                            <img 
                                src="/images/omg-300px.png" 
                                alt="One More Game Logo" 
                                className="guild-emblem-image-centered mobile"
                            />
                            <span className="guild-name-text-centered">{formatGuildName(process.env.NEXT_PUBLIC_GUILD_NAME)}</span>
                        </div>
                    </div>
                    {renderNavItems()}
                </div>
            </Drawer>
        </nav>
    )
} 