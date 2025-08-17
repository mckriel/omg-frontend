import StyledComponentsRegistry from '../lib/registry'
import { Analytics } from '@vercel/analytics/react'

import '@/core/fonts/blizzard-local.css'
import '@/core/themes/base.scss'
import '@/core/themes/modern.css'

import { systemui, jockeyone } from '@/app/fonts'
import BaseLayout from '@/core/layout'
import seo from '@/core/seo'

export const metadata = seo

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/images/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <meta name="theme-color" content="#1a1a1a" />
            </head>
            <body>
                <div className={`${systemui.className} ${jockeyone.className} applicationWrapper`}>
                    <Analytics />
                    <StyledComponentsRegistry>
                        <BaseLayout>{children}</BaseLayout>
                    </StyledComponentsRegistry>
                </div>
            </body>
        </html>
    )
}
