'use client'

import { useRouter } from 'next/navigation'
import { useUIStore } from '@/store'

export function usePageTransition() {
    const router = useRouter()
    const { startPageTransition } = useUIStore()

    const navigateTo = (href: string) => {
        // Start the spray transition
        startPageTransition()

        // Navigate after a short delay to let spray start
        setTimeout(() => {
            router.push(href)
        }, 300)
    }

    return { navigateTo }
}
