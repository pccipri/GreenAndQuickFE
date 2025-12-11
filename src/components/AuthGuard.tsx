'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ADMIN_ROUTES, NO_ACCOUNT_ROUTES, PROTECTED_ROUTES, UNPROTECTED_ROUTES } from '@/utils/routes'
import { useAuth } from '@/contexts/AuthProvider'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (loading) return

        if (UNPROTECTED_ROUTES.includes(pathname)) return

        if (NO_ACCOUNT_ROUTES.some(prefix => pathname.startsWith(prefix)) && user) {
            router.push('/')
            return
        }

        if (PROTECTED_ROUTES.some(prefix => pathname.startsWith(prefix)) && !user) {
            router.push('/login')
            return
        }

        if (ADMIN_ROUTES.some(prefix => pathname.startsWith(prefix))) {
            if (!user) {
                router.push('/login')
                return
            }
            if (user.role !== 'admin') {
                router.push('/unauthorized')
                return
            }
        }
    }, [user, loading, pathname, router])

    if (loading) return <div>Loading...</div>

    return <>{children}</>
}
