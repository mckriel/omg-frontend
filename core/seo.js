const seo = {
    title: 'One More Game | World of Warcraft Guild',
    description: '',
    keywords: `World of Warcraft, WoW, EU, ${process.env.NEXT_PUBLIC_GUILD_REALM}, ${process.env.NEXT_PUBLIC_GUILD_NAME}, Mythic Raiding, War Within, Season 2, WoW Guild, Raid Progression`,
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
    alternates: {
        canonical: '/',
    },
    authors: [{ name: 'Scott Jones' }],
    creator: 'scottjones.nl',
    publisher: 'scottjones.nl',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'One More Game | World of Warcraft Guild',
        description: '',
        url: process.env.NEXT_PUBLIC_BASE_URL,
        siteName: process.env.NEXT_PUBLIC_GUILD_NAME,
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: `${process.env.NEXT_PUBLIC_GUILD_NAME} Guild Logo`,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'One More Game | World of Warcraft Guild',
        description: '',
        images: ['/images/twitter-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default seo;