import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './core/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // WoW-themed colors
                wow: {
                    purple: "#2b1537",
                    gold: "#f39c12", 
                    dark: "#110d17",
                    darker: "#08060c",
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                blizzard: ["var(--font-blizzard-primary)", "system-ui", "sans-serif"],
            },
            backdropBlur: {
                'xs': '2px',
            },
            animation: {
                "glow": "glow 2s ease-in-out infinite alternate",
            },
            keyframes: {
                "glow": {
                    "0%": { 
                        "text-shadow": "0 0 10px #f39c12, 0 0 20px #f39c12, 0 0 30px #f39c12, 0 0 40px #f39c12" 
                    },
                    "100%": { 
                        "text-shadow": "0 0 5px #f39c12, 0 0 10px #f39c12, 0 0 15px #f39c12, 0 0 20px #f39c12" 
                    }
                }
            }
        },
    },
    plugins: [require("@tailwindcss/typography")],
}
export default config
