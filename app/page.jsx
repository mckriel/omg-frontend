'use client'

import React from 'react'
import { Box, Container, Typography, Paper, Grid, Card, CardContent, Button } from '@mui/material'
import { Users, BarChart3, Trophy, Calendar, UserPlus } from 'lucide-react'
import ThemeProvider from '@/core/themes'
import ContentWrapper from '@/core/components/content'
import ResponsiveLandingImage from '@/core/components/ResponsiveLandingImage'
import Link from 'next/link'

export default function Home() {
    return (
        <ThemeProvider>
            <main className="fullbody">
                <ContentWrapper>
                    {/* Hero Section with Landing Image */}
                    <Container maxWidth="lg" sx={{ py: 4 }}>
                        {/* Landing Image */}
                        <Box sx={{ mb: 6, textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                            <img
                                src="/landing-original.webp"
                                alt="World of Warcraft Landing Image"
                                style={{
                                    width: '100%',
                                    maxWidth: '800px',
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

                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography
                                variant="h1"
                                component="h1"
                                sx={{
                                    fontSize: { xs: '3rem', md: '5rem' },
                                    fontWeight: 'bold',
                                    mb: 2,
                                    fontFamily: 'var(--font-blizzard-primary)',
                                    background: 'linear-gradient(45deg, #f4d03f, #f39c12)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textFillColor: 'transparent'
                                }}
                            >
                                One More Game
                            </Typography>
                            
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    fontSize: { xs: '1.2rem', md: '2rem' },
                                    mb: 1,
                                    fontFamily: 'var(--font-blizzard-primary)',
                                    color: '#e8e6e3',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px'
                                }}
                            >
                                Mythic Raiding Guild
                            </Typography>

                        </Box>
                    </Container>


                </ContentWrapper>
            </main>
        </ThemeProvider>
    )
}