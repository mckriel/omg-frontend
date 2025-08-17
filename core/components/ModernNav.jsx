'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

// Lucide icons for modern look
import { 
  Users, 
  BarChart3, 
  UserPlus, 
  Menu, 
  X,
  ExternalLink 
} from 'lucide-react'

// Helper function to format guild name properly
const format_guild_name = (name) => {
  if (!name) return '';
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const navigation_items = [
  {
    label: 'RAID TEAM',
    path: '/raid-team',
    icon: Users,
  },
  {
    label: 'AUDIT',
    path: '/audit',
    icon: BarChart3,
  },
  {
    label: 'RECRUITMENT',
    path: '/join',
    icon: UserPlus,
  },
]

function is_active(path, pathname) {
  if (path === '/') return pathname === path
  return pathname.startsWith(path)
}

export default function ModernNav() {
  const pathname = usePathname()
  const [mobile_open, set_mobile_open] = useState(false)
  
  const guild_name = format_guild_name(process.env.NEXT_PUBLIC_GUILD_NAME)

  return (
    <header className="sticky top-0 z-50 w-full glass-header">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Left: Logo + Guild Name (Horizontal) */}
          <Link 
            href="/" 
            className="flex items-center gap-4 hover-lift group"
          >
            <img 
              src="/images/omg-300px.png" 
              alt="One More Game Logo" 
              className="h-12 w-12 object-contain transition-transform group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span className="font-blizzard text-lg font-bold text-white tracking-wide">
                {guild_name}
              </span>
              <span className="font-blizzard text-xs text-wow-gold uppercase tracking-wider">
                EU - Sylvanas
              </span>
            </div>
          </Link>

          {/* Center: Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigation_items.map((item) => {
              const Icon = item.icon
              const active = is_active(item.path, pathname)
              
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-3 rounded-lg font-blizzard text-sm uppercase tracking-wide transition-all duration-300",
                    active 
                      ? "text-wow-gold font-bold bg-white/5" 
                      : "text-gray-300 font-medium hover:text-white hover:bg-white/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right: External Links + Discord */}
          <div className="flex items-center gap-3">
            
            {/* WCL Link */}
            <a 
              href="https://www.warcraftlogs.com/guild/eu/sylvanas/one%20more%20game" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/20 transition-all duration-200 hover-lift"
            >
              <img 
                src="/images/wcl.png" 
                alt="Warcraft Logs" 
                className="w-6 h-6 object-contain"
              />
            </a>

            {/* Discord Button - Primary CTA */}
            <a 
              href="https://discord.gg/z9JxvNQ5Zp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="discord-button flex items-center gap-2 px-4 py-2 text-white font-blizzard font-semibold text-sm uppercase tracking-wide hover-lift"
            >
              <img 
                src="/images/discord-white.png" 
                alt="Discord" 
                className="w-5 h-5 object-contain"
              />
              <span className="hidden sm:inline">Join Discord</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => set_mobile_open(!mobile_open)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              {mobile_open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobile_open && (
          <div className="lg:hidden glass rounded-lg mt-4 p-4 space-y-2">
            {navigation_items.map((item) => {
              const Icon = item.icon
              const active = is_active(item.path, pathname)
              
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  onClick={() => set_mobile_open(false)}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-3 rounded-lg font-blizzard text-sm uppercase tracking-wide transition-all duration-300 w-full border-l-4 border-transparent",
                    active 
                      ? "text-wow-gold font-bold border-l-wow-gold bg-white/5" 
                      : "text-gray-300 font-medium hover:text-white hover:bg-white/10 hover:border-l-wow-gold/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
            
            {/* Mobile WCL Link */}
            <a 
              href="https://www.warcraftlogs.com/guild/eu/sylvanas/one%20more%20game" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-blizzard text-sm font-semibold uppercase tracking-wide text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 w-full"
            >
              <img src="/images/wcl.png" alt="WCL" className="w-4 h-4" />
              Warcraft Logs
              <ExternalLink className="h-3 w-3 ml-auto" />
            </a>
          </div>
        )}
      </div>
    </header>
  )
}