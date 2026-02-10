'use client'

import Link from 'next/link'
import { useUIStore } from '@/store'

interface TransitionLinkProps {
    href: string
    children: React.ReactNode
    className?: string
}

export function TransitionLink({ href, children, className }: TransitionLinkProps) {
    const { startPageTransition } = useUIStore()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Only trigger for internal links and not opening in new tab
        if (href.startsWith('/') && !e.metaKey && !e.ctrlKey) {
            e.preventDefault()

            // Start spray transition
            startPageTransition()

            // Navigate after spray starts
            setTimeout(() => {
                window.location.href = href
            }, 100) // Reduced from 300ms to 100ms for faster navigation
        }
    }

    return (
        <Link href={href} className={className} onClick={handleClick}>
            {children}
        </Link>
    )
}
