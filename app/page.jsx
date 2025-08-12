'use client'

import React from 'react'
import { Box, Container } from '@mui/material'
import ThemeProvider from '@/core/themes'
import ContentWrapper from '@/core/components/content'

// Empty home page
export default function Home() {
    return (
        <ThemeProvider>
            <main className="fullbody">
                <ContentWrapper>
                    <Container maxWidth="lg">
                        <Box sx={{ py: 8 }}>
                            {/* Empty page for now */}
                        </Box>
                    </Container>
                </ContentWrapper>
            </main>
        </ThemeProvider>
    )
}