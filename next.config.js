/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    experimental: {
        // Enable experimental features for better compatibility
        serverComponentsExternalPackages: [],
    },
    images: {
        // Configure image optimization
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [320, 420, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000, // 1 year in seconds
        dangerouslyAllowSVG: false,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        // Enable better image optimization
        loader: 'default',
        domains: [],
        remotePatterns: [],
    },
    // Ensure proper module resolution
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            };
        }
        return config;
    },
    output: 'standalone',
}

module.exports = nextConfig
