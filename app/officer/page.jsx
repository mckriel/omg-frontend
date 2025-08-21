'use client'
import React, { useState } from 'react'
import { 
    Box, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    Alert,
    Container,
    InputAdornment,
    CircularProgress
} from '@mui/material'
import { 
    Lock as LockIcon,
    Security as SecurityIcon
} from '@mui/icons-material'
import { Public_Sans } from 'next/font/google'

const publicSans = Public_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    fallback: ['system-ui', 'arial', 'sans-serif'],
    preload: false,
})

// Hardcoded access code - in production, this should be in environment variables
const OFFICER_ACCESS_CODE = 'omg2024'

const OfficerSettings = () => {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <SecurityIcon /> 
                    Officer Settings
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Configure guild settings that affect the website behavior.
                </Typography>

                <RaidTeamIlvlSetting />
            </Paper>
        </Container>
    )
}

const RaidTeamIlvlSetting = () => {
    const [ilvl, setIlvl] = useState(690) // Current default
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')

    // Load current config value on component mount
    React.useEffect(() => {
        const load_current_config = async () => {
            try {
                const response = await fetch('/api/config')
                if (response.ok) {
                    const data = await response.json()
                    if (data.success && data.config.RAID_TEAM_ILVL) {
                        setIlvl(data.config.RAID_TEAM_ILVL)
                    }
                }
            } catch (error) {
                console.error('Error loading config:', error)
            } finally {
                setLoading(false)
            }
        }

        load_current_config()
    }, [])

    const handle_save = async () => {
        setSaving(true)
        setMessage('')

        try {
            const response = await fetch('/api/config/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key: 'RAID_TEAM_ILVL',
                    value: parseInt(ilvl)
                }),
            })

            if (response.ok) {
                setMessage('Raid team ilvl requirement updated successfully!')
            } else {
                throw new Error('Failed to update setting')
            }
        } catch (error) {
            setMessage('Error updating setting: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Raid Team Item Level Requirement
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Set the minimum item level required for players to be considered raid-ready.
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                <TextField
                    label="Item Level"
                    type="number"
                    value={ilvl}
                    onChange={(e) => setIlvl(e.target.value)}
                    inputProps={{ min: 400, max: 1000 }}
                    sx={{ width: 150 }}
                />
                
                <Button
                    variant="contained"
                    onClick={handle_save}
                    disabled={saving || !ilvl}
                    sx={{ minWidth: 100 }}
                >
                    {saving ? 'Saving...' : 'Save'}
                </Button>
            </Box>
            )}

            {message && (
                <Alert 
                    severity={message.includes('Error') ? 'error' : 'success'}
                    sx={{ mt: 2 }}
                >
                    {message}
                </Alert>
            )}
        </Box>
    )
}

export default function OfficerPage() {
    const [access_code, setAccessCode] = useState('')
    const [is_authenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState('')

    const handle_login = (e) => {
        e.preventDefault()
        setError('')

        if (access_code === OFFICER_ACCESS_CODE) {
            setIsAuthenticated(true)
        } else {
            setError('Invalid access code')
            setAccessCode('')
        }
    }

    if (is_authenticated) {
        return (
            <main className={`fullbody ${publicSans.className}`}>
                <OfficerSettings />
            </main>
        )
    }

    return (
        <main className={`fullbody ${publicSans.className}`}>
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    <LockIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    
                    <Typography variant="h4" gutterBottom>
                        Officer Access Required
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Please enter the officer access code to configure guild settings.
                    </Typography>

                    <form onSubmit={handle_login}>
                        <TextField
                            fullWidth
                            label="Access Code"
                            type="password"
                            value={access_code}
                            onChange={(e) => setAccessCode(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                            error={!!error}
                            helperText={error}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={!access_code}
                        >
                            Access Settings
                        </Button>
                    </form>
                </Paper>
            </Container>
        </main>
    )
}