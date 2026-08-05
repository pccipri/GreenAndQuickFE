'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { ADMIN_ROUTES, NO_ACCOUNT_ROUTES, PROTECTED_ROUTES, SHOP_OWNER_ROUTES, UNPROTECTED_ROUTES } from '@/utils/routes'
import { useAuth } from '@/contexts/AuthProvider'

const matchesRoutePattern = (pathname: string, pattern: string) => {
    if (pattern === '/') {
        return pathname === '/'
    }

    if (pattern.includes('/[')) {
        const basePattern = pattern.split('/[')[0]
        return pathname === basePattern || pathname.startsWith(`${basePattern}/`)
    }

    return pathname === pattern || pathname.startsWith(`${pattern}/`)
}

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { user, loading, isAuthenticated } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (loading) return

        if (UNPROTECTED_ROUTES.some((pattern) => matchesRoutePattern(pathname, pattern))) return

        const isNoAccountRoute = NO_ACCOUNT_ROUTES.some((pattern) => matchesRoutePattern(pathname, pattern))
        const isProtectedRoute = PROTECTED_ROUTES.some((pattern) => matchesRoutePattern(pathname, pattern))
        const isShopOwnerRoute = SHOP_OWNER_ROUTES.some((pattern) => matchesRoutePattern(pathname, pattern))
        const isAdminRoute = ADMIN_ROUTES.some((pattern) => matchesRoutePattern(pathname, pattern))

        const redirectToLogin = () => {
            const returnTo = encodeURIComponent(pathname)
            router.replace(`/login?returnTo=${returnTo}`)
        }

        if (isNoAccountRoute && isAuthenticated) {
            router.replace('/')
            return
        }

        if ((isProtectedRoute || isShopOwnerRoute || isAdminRoute) && !isAuthenticated) {
            redirectToLogin()
            return
        }

        if (user?.isActive === false && (isProtectedRoute || isShopOwnerRoute || isAdminRoute)) {
            router.replace('/verify-email')
            return
        }

        if (isShopOwnerRoute && user && user.role !== 'shopOwner' && user.role !== 'admin') {
            router.replace('/unauthorized')
            return
        }

        if (isAdminRoute && user && user.role !== 'admin') {
            router.replace('/unauthorized')
            return
        }
    }, [isAuthenticated, loading, pathname, router, user])

    if (loading) return (
        <Box sx={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">Checking your access...</Typography>
        </Box>
    )

    return <>{children}</>
}
