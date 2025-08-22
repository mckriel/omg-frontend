'use client'
import React from 'react'
import Image from 'next/image'

const ResponsiveLandingImage = ({ 
    alt = "Landing background", 
    priority = true,
    fill = false,
    style = {},
    width,
    height,
    ...props 
}) => {
    
    if (fill) {
        return (
            <Image
                src="/images/landing/desktop.webp"
                alt={alt}
                fill
                priority={priority}
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    ...style
                }}
                {...props}
            />
        )
    }

    return (
        <Image
            src="/images/landing/desktop.webp"
            alt={alt}
            width={width || 1024}
            height={height || 1024}
            priority={priority}
            style={{
                width: '100%',
                height: 'auto',
                ...style
            }}
            {...props}
        />
    )
}

export default ResponsiveLandingImage