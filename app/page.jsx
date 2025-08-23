'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'
import ThemeProvider from '@/core/themes'
import ContentWrapper from '@/core/components/content'

export default function Home() {
    return (
        <>
            <style jsx global>{`
                /* Hide the layout's copyright when home page is displayed */
                .layout-root .copyright,
                .layout-root .copyright-text {
                    display: none !important;
                }
            `}</style>
            <ThemeProvider>
            <main 
                className="home-container"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '100svh',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    zIndex: 1,
                    pointerEvents: 'none' // Allow clicks to pass through to nav
                }}
            >
                <ContentWrapper>
                    <Box 
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            height: '100svh',
                            textAlign: 'center',
                            px: { xs: 2, md: 4 },
                            paddingTop: { xs: '100px', sm: '120px', md: '140px' },
                            pointerEvents: 'auto' // Re-enable clicks for home page content
                        }}
                    >
                        <Box sx={{ mb: { xs: 3, md: 4 }, width: '100%', maxWidth: { xs: '90%', md: '600px' } }}>
                            <img
                                src="/landing-original.webp"
                                alt="World of Warcraft Landing Image"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                    display: 'block',
                                    mask: `
                                        linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%),
                                        linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)
                                    `,
                                    WebkitMask: `
                                        linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%),
                                        linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)
                                    `,
                                    maskComposite: 'intersect',
                                    WebkitMaskComposite: 'intersect'
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                variant="h1"
                                component="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                                    fontWeight: 'bold',
                                    mb: { xs: 1, md: 2 },
                                    fontFamily: 'var(--font-blizzard-primary)',
                                    background: 'linear-gradient(45deg, #f4d03f, #f39c12)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textFillColor: 'transparent',
                                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8)) drop-shadow(-1px -1px 2px rgba(0,0,0,0.6))'
                                }}
                            >
                                One More Game
                            </Typography>
                            
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem', lg: '1.8rem' },
                                    mb: 1,
                                    fontFamily: 'var(--font-blizzard-primary)',
                                    color: '#e8e6e3',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.8)'
                                }}
                            >
                                Mythic Raiding Guild
                            </Typography>
                        </Box>
                    </Box>

                    {/* Footer at bottom */}
                    <Box 
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            py: 2,
                            zIndex: 1
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '11px',
                                fontWeight: 'bold',
                                color: '#8dd52b',
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                '& a': {
                                    color: '#f4d03f',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: '#fff',
                                        textDecoration: 'underline'
                                    }
                                }
                            }}
                        >
                            &copy; 2025 <a href="https://github.com/thedanzor" target="_blank" rel="noopener noreferrer">Scott Jones</a> & <a href="https://github.com/mckriel" target="_blank" rel="noopener noreferrer">Matthew Kriel</a>. All rights reserved.
                        </Typography>
                    </Box>
                </ContentWrapper>
            </main>
        </ThemeProvider>
        </>
    )
}