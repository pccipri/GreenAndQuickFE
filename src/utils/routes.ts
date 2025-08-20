export const API_ROUTES = {
    "CATEGORY": "/category",
    "PRODUCT": "/product",
    "ORDER": "/order",
    "ORDERED_PRODUCT": "/orderedProduct",
    "USER": "/user",
}

export const UNPROTECTED_ROUTES: string[] = ['/login', '/register', '/']

export const PROTECTED_ROUTES: string[] = [
    '/myAccount'
]

export const ADMIN_ROUTES: string[] = []