// Theme Provider: All palette, typography, shadows, and component overrides are defined here.
// This file is the single source of truth for the app's Material UI theme.

import { useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import { HEADER_HEIGHT } from './config'
import { alpha } from '@mui/material/styles'
import { jockeyone } from '@/app/fonts'
import merge from 'lodash/merge'

// ==============================|| PALETTE ||============================== //
// Main color palette for the app (dark mode)
const palette = {
    mode: 'dark',
    common: { black: '#000', white: '#fff' },
    primary: {
        lighter: '#2050FF', 100: '#2F63FF', 200: '#376DFF', light: '#3F78FF',
        400: '#4680FF', main: '#8cd529', dark: '#7EA6FF', 700: '#A3C0FF',
        darker: '#C8D9FF', 900: '#E9F0FF', contrastText: '#8cd529',
    },
    secondary: {
        lighter: '#0b0a0f', 100: '#060d12', 200: '#3E4853', light: '#5B6B79',
        400: '#8996A4', 500: '#BEC8D0', main: '#DBE0E5', dark: '#F3F5F7',
        800: '#F8F9FA', darker: '#F8F9FA', contrastText: '#8cd529',
    },
    error: {
        lighter: '#c50d0d', light: '#d31c1c', main: '#dc2626', dark: '#e76767',
        darker: '#f5bebe', contrastText: '#8cd529',
    },
    warning: {
        lighter: '#d35a00', light: '#de7700', main: '#e58a00', dark: '#edad4d',
        darker: '#f7dcb3', contrastText: '#8cd529',
    },
    info: {
        lighter: '#1ba9bc', light: '#30bccc', main: '#3ec9d6', dark: '#78d9e2',
        darker: '#c5eff3', contrastText: '#8cd529',
    },
    success: {
        lighter: '#107d4f', light: '#21976c', main: '#2ca87f', dark: '#6bc2a5',
        darker: '#c0e5d9', contrastText: '#8cd529',
    },
    text: {
        primary: alpha('#fff', 0.87),
        secondary: alpha('#C8D9FF', 0.45),
        disabled: alpha('#C8D9FF', 0.1),
    },
    action: { disabled: '#5B6B79' },
    divider: alpha('#C8D9FF', 0.05),
    background: { paper: '#060d12', default: '#0b0a0f' },
}

// ==============================|| SHADOWS ||============================== //
const customShadows = (theme) => ({
    button: theme.palette.mode === 'dark' ? `0 2px 0 rgb(0 0 0 / 5%)` : `0 2px #0000000b`,
    text: `0 -1px 0 rgb(0 0 0 / 12%)`,
    z1: theme.palette.mode === 'dark' ? `0px 8px 24px ${alpha(theme.palette.secondary[200], 0.3)}` : `0px 8px 24px  ${alpha(theme.palette.secondary.darker, 0.08)}`,
    z2: theme.palette.mode === 'dark' ? `0px 2px 8px ${alpha(theme.palette.secondary[200], 0.3)}` : `0px 2px 8px  ${alpha(theme.palette.secondary.darker, 0.08)}`,
    primary: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
    secondary: `0 0 0 2px ${alpha(theme.palette.secondary.main, 0.2)}`,
    error: `0 0 0 2px ${alpha(theme.palette.error.main, 0.2)}`,
    warning: `0 0 0 2px ${alpha(theme.palette.warning.main, 0.2)}`,
    info: `0 0 0 2px ${alpha(theme.palette.info.main, 0.2)}`,
    success: `0 0 0 2px ${alpha(theme.palette.success.main, 0.2)}`,
    grey: `0 0 0 2px ${alpha(theme.palette.secondary.main, 0.2)}`,
    primaryButton: `0 14px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
    secondaryButton: `0 14px 12px ${alpha(theme.palette.secondary.main, 0.2)}`,
    errorButton: `0 14px 12px ${alpha(theme.palette.error.main, 0.2)}`,
    warningButton: `0 14px 12px ${alpha(theme.palette.warning.main, 0.2)}`,
    infoButton: `0 14px 12px ${alpha(theme.palette.info.main, 0.2)}`,
    successButton: `0 14px 12px ${alpha(theme.palette.success.main, 0.2)}`,
    greyButton: `0 14px 12px ${alpha(theme.palette.secondary.main, 0.2)}`,
})

// ==============================|| COMPONENT OVERRIDES ||============================== //
// All MUI component overrides are defined as functions below and merged into the theme.
// (Accordion, AccordionDetails, Alert, etc. ... see full file for all overrides)

function Accordion(theme) {
    return {
        MuiAccordion: {
            defaultProps: { disableGutters: true, square: true, elevation: 0 },
            styleOverrides: {
                root: {
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    '&:not(:last-child)': { borderBottom: 0 },
                    '&:before': { display: 'none' },
                    '&.Mui-disabled': { backgroundColor: theme.palette.secondary.lighter },
                },
            },
        },
    }
}
function AccordionDetails(theme) {
    return {
        MuiAccordionDetails: {
            styleOverrides: {
                root: { padding: theme.spacing(2), borderTop: `1px solid ${theme.palette.secondary.light}` },
            },
        },
    }
}
function Alert(theme) {
    return {
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                },
            },
        },
    }
}
function Autocomplete(theme) {
    return {
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    boxShadow: theme.customShadows.z1,
                    borderRadius: 12,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                },
                listbox: {
                    padding: theme.spacing(0.5),
                    '& .MuiAutocomplete-option': {
                        borderRadius: 8,
                        '&[aria-selected="true"]': {
                            backgroundColor: theme.palette.action.hover,
                            '& .MuiAutocomplete-option': {
                                backgroundColor: theme.palette.action.hover,
                            },
                        },
                    },
                },
            },
        },
    }
}
function Avatar(theme) {
    return {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.primary.lighter,
                    color: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                    },
                },
            },
        },
    }
}
function Backdrop(theme) {
    return {
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha(theme.palette.background.default, 0.8),
                },
            },
        },
    }
}
function Badge(theme) {
    return {
        MuiBadge: {
            styleOverrides: {
                standard: {
                    minWidth: 22,
                    height: 22,
                    padding: '0 6px',
                },
                badge: {
                    color: '#000', // Set badge text color to black
                },
            },
        },
    }
}
function Breadcrumbs(theme) {
    return {
        MuiBreadcrumbs: {
            styleOverrides: {
                li: {
                    '& > *': {
                        color: theme.palette.text.primary,
                    },
                },
            },
        },
    }
}
function Button(theme) {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '12px !important',
                    fontWeight: '600 !important',
                    borderRadius: '3px',
                    padding: '16px 22px',
                    '&.MuiButton-contained': {
                        backgroundColor: '#091311',
                        color: '#c6972f',
                        '&:hover': { backgroundColor: '#11322c' },
                    },
                    '&.MuiButton-outlined': {
                        color: '#c6972f',
                        borderColor: '#c6972f',
                        '&:hover': { borderColor: '#c6972f', backgroundColor: 'transparent' },
                    },
                    '&.MuiButton-text': {
                        color: '#c6972f',
                        '&:hover': { backgroundColor: 'transparent' },
                    },
                },
            },
        },
    }
}
function Card(theme) {
    return {
        MuiCard: {
            styleOverrides: {
                root: {
                    position: 'relative',
                    borderRadius: 12,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        width: '100%',
                        height: '100%',
                        borderRadius: 'inherit',
                        opacity: 0.05,
                    },
                },
            },
        },
    }
}
function Chip(theme) {
    return {
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    '& .MuiChip-deleteIcon': {
                        color: theme.palette.secondary[300],
                        '&:hover': { color: theme.palette.secondary[400] },
                    },
                },
            },
        },
    }
}
function Dialog(theme) {
    return {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 12,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                },
            },
        },
    }
}
function Drawer(theme) {
    return {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRadius: 12,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                },
            },
        },
    }
}
function ListItemButton(theme) {
    return {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.MuiListItemButton-root': {
                        '&.Mui-selected, &:hover, &.Mui-selected:hover': {
                            backgroundColor: '#ffffff !important',
                        },
                    },
                },
            },
        },
    }
}
function Menu(theme) {
    return {
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 8,
                    boxShadow: theme.customShadows.z1,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                },
            },
        },
    }
}
function PaginationItem(theme) {
    return {
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.lighter,
                        color: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                        },
                    },
                },
            },
        },
    }
}
function Paper(theme) {
    return {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                },
            },
        },
    }
}
function Popover(theme) {
    return {
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderRadius: 8,
                    boxShadow: theme.customShadows.z1,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                },
            },
        },
    }
}
function Rating(theme) {
    return {
        MuiRating: {
            styleOverrides: {
                root: {
                    '& .MuiRating-iconEmpty': {
                        color: theme.palette.secondary[200],
                    },
                },
            },
        },
    }
}
function Snackbar(theme) {
    return {
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                },
            },
        },
    }
}
function SpeedDial(theme) {
    return {
        MuiSpeedDial: {
            styleOverrides: {
                root: {
                    '& .MuiSpeedDial-fab': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    },
                },
            },
        },
    }
}
function Stepper(theme) {
    return {
        MuiStepper: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
        },
    }
}
function Switch(theme) {
    return {
        MuiSwitch: {
            styleOverrides: {
                root: {
                    '&.Mui-checked': {
                        color: theme.palette.primary.main,
                    },
                    '&.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: theme.palette.primary.main,
                    },
                },
            },
        },
    }
}
function Table(theme) {
    return {
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    // Removed border and borderColor to ensure no border is present
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif',
                },
            },
        },
    }
}
function Tabs(theme) {
    return {
        MuiTab: {
            styleOverrides: {
                root: {
                    minHeight: 48,
                    minWidth: 100,
                    textTransform: 'capitalize',
                    '&.Mui-selected': {
                        color: theme.palette.primary.main,
                    },
                },
            },
        },
    }
}
function TextField(theme) {
    return {
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    '& .MuiOutlinedInput-root.MuiInputBase-colorPrimary': {
                        '& fieldset': {
                            borderColor: theme.palette.primary.main, // Always primary color
                            borderWidth: 2, // Thicker border
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.primary.main, // Always primary color
                            borderWidth: 2, // Thicker border
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main, // Always primary color
                            borderWidth: 2, // Thicker border
                        },
                    },
                },
            },
        },
    }
}
function Timeline(theme) {
    return {
        MuiTimeline: {
            styleOverrides: {
                root: {
                    padding: 0,
                },
            },
        },
    }
}
function ToggleButton(theme) {
    return {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.lighter,
                        color: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                        },
                    },
                },
            },
        },
    }
}
function Tooltip(theme) {
    return {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 8,
                    backgroundColor: theme.palette.grey[800],
                    color: theme.palette.grey[300],
                },
                arrow: {
                    color: theme.palette.grey[800],
                },
            },
        },
    }
}
function TreeView(theme) {
    return {
        MuiTreeView: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
        },
    }
}
function Typography(theme) {
    return {
        MuiTypography: {
            styleOverrides: {
                h1: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 700, fontSize: '1.8rem', lineHeight: 1.21 },
                h2: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 600, fontSize: '1.4rem', lineHeight: 1.27 },
                h3: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 600, fontSize: '1.3rem', lineHeight: 1.33 },
                h4: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 500, fontSize: '1rem', lineHeight: 1.4 },
                h5: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 },
                h6: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 400, fontSize: '1rem', lineHeight: 1.57, textTransform: 'uppercase' },
                caption: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.66 },
                body1: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.57 },
                body2: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 400, fontSize: '0.9rem', lineHeight: 1.66 },
                subtitle1: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.57 },
                subtitle2: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 500, fontSize: '0.9rem', lineHeight: 1.66 },
                overline: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 400, lineHeight: 1.66 },
                button: { fontFamily: 'SemplicitaPro, Open Sans, system-ui, sans-serif', fontWeight: 500, textTransform: 'capitalize' },
            },
        },
    }
}
function Select(theme) {
    return {
        MuiSelect: {
            styleOverrides: {
                select: {
                    fontSize: '0.9rem',
                },
            },
        },
    }
}

// ==============================|| THEME PROVIDER ||============================== //
export default function ThemeCustomization({ children }) {
    // Memoize theme base and options
    const theme = useMemo(() => createTheme({ palette }), [])
    const themeOptions = useMemo(
        () => ({
            breakpoints: {
                values: { xs: 0, sm: 768, md: 1024, lg: 1266, xl: 1440 },
            },
            direction: 'ltr',
            mixins: {
                toolbar: { minHeight: HEADER_HEIGHT, paddingTop: 8, paddingBottom: 8 },
            },
            palette: theme.palette,
            shape: { borderRadius: 12 },
            customShadows: customShadows(theme),
        }),
        [theme]
    )
    const themes = createTheme(themeOptions)
    // Merge all component overrides
    themes.components = merge(
        Accordion(themes),
        AccordionDetails(themes),
        Alert(themes),
        Autocomplete(themes),
        Avatar(themes),
        Backdrop(themes),
        Badge(themes),
        Breadcrumbs(themes),
        Button(themes),
        Card(themes),
        Chip(themes),
        Dialog(themes),
        Drawer(themes),
        ListItemButton(themes),
        Menu(themes),
        PaginationItem(themes),
        Paper(themes),
        Popover(themes),
        Rating(themes),
        Snackbar(themes),
        SpeedDial(themes),
        Stepper(themes),
        Switch(themes),
        Table(themes),
        Tabs(themes),
        TextField(themes),
        Timeline(themes),
        ToggleButton(themes),
        Tooltip(themes),
        TreeView(themes),
        Typography(themes),
        Select(themes),
    )
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
