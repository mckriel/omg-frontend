'use client'

import { useState, useEffect } from 'react'

// Theme
import ThemeProvider from '@/core/themes'

// Material UI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Alert, AlertTitle, Snackbar } from '@mui/material'

import { P } from '@/core/components/typography'
import ModernNav from '@/core/components/ModernNav'

export default function AuditLayout({ children }) {
    const [showSeasonAlert, setShowSeasonAlert] = useState(false)

    useEffect(() => {
        // Check if user has seen the alert using localStorage instead of cookies
        const hasSeenAlert = localStorage.getItem('season2_alert_seen')
        if (!hasSeenAlert) {
            setShowSeasonAlert(true)
        }
    }, [])

    const handleCloseAlert = () => {
        setShowSeasonAlert(false)
        // Store in localStorage instead of setting a cookie
        localStorage.setItem('season2_alert_seen', 'true')
    }

    return <ThemeProvider>
        <div className="min-h-screen" style={{ background: 'url(/design/bg1.png) center center / cover no-repeat fixed, linear-gradient(135deg, #0a0612 0%, #110d17 50%, #0f0a15 100%)' }}>
            {/* Modern Navigation */}
            <ModernNav />
            {/* Main content area */}
            <main className="container mx-auto px-4 lg:px-8 py-8">
                {children}
                <div className="copyright">
                    <p className="copyright-text">
                        &copy; 2025 Scott Jones & Matthew Kriel. All rights reserved.
                    </p>
                </div>
            </main>
            
            <Snackbar
                open={showSeasonAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                className="season-alert-snackbar"
            >
                <Alert 
                    onClose={handleCloseAlert}
                    severity="info"
                    className="season-alert"
                >
                    <AlertTitle className="season-alert-title">
                        Season 3
                    </AlertTitle>
                    <Typography variant="body2">
                        Season 3 applications are now open. With limited spots available 
                        for progression raiding, please submit your application soon to be considered.
                    </Typography>
                </Alert>
            </Snackbar>
        </div>
    </ThemeProvider>
}
