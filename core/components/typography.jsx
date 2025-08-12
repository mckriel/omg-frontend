'use client'

import { jockeyone, systemui } from '@/app/fonts'

import './scss/typo.scss'

// Use Blizzard fonts for all components
const blizzardFont = 'blizzard-font-class'

export const SocialText = ({ children }) => {
    return (
        <span className={`${blizzardFont} socialText`}>{children}</span>
    )
}

export const MultiColorHeadingH1 = ({
    children,
    floatingText,
    highlightText,
    goFancy,
}) => {
    return (
        <h1 className={`${blizzardFont} primaryTitle`}>
            <span>
                {highlightText && (
                    <span className={` ${goFancy ? 'goFancy' : ''}`}>
                        {' '}
                        {highlightText}{' '}
                    </span>
                )}
                {children}
                {floatingText && <div>{floatingText}</div>}
            </span>
        </h1>
    )
}

export const P = ({
    children,
    className = '',
    style = {},
    onClick = () => {},
}) => {
    return (
        <p
            onClick={onClick}
            className={`${systemui.className} pstyling ${className}`}
            style={style}
        >
            {children}
        </p>
    )
}

export const Span = ({
    children,
    className = '',
    style = {},
    onClick = () => {},
}) => {
    return (
        <span
            onClick={onClick}
            className={`${systemui.className} span ${className}`}
            style={style}
        >
            {children}
        </span>
    )
}

export const Button = ({ children, variant = 'primaryButton' }) => {
    return (
        <span className={`${blizzardFont} ${variant}`}>{children}</span>
    )
}
export const ButtonEle = ({
    children,
    variant = 'primaryButton',
    className = '',
    onClick,
}) => {
    return (
        <span
            className={`${blizzardFont} ${variant} ${className}`}
            onClick={onClick}
        >
            {children}
        </span>
    )
}

export const CardTitle = ({ children, className = '', onClick = () => {} }) => {
    return (
        <h3
            onClick={onClick}
            className={`${blizzardFont} cardTitle ${className}`}
        >
            {children}
        </h3>
    )
}

export const OrElement = ({}) => {
    return <div className={`${blizzardFont} orElement`}>or</div>
}

export const H3 = ({ children }) => {
    return (
        <h3 className={`${blizzardFont} sectionHeading`}>{children}</h3>
    )
}

export const H4 = ({ children }) => {
    return (
        <h4 className={`${blizzardFont} sectionSubHeading`}>
            {children}
        </h4>
    )
}
