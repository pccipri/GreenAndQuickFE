export const API_ROUTES = {
    "CATEGORY": "/category",
    "PRODUCT": "/product",
    "ORDER": "/order",
    "ORDERED_PRODUCT": "/orderedProduct",
    "USER": "/user",
}

export const UNPROTECTED_ROUTES: string[] = ['/', '/verify-email', '/recipes', '/recipes/[id]', '/shops', 'shops/[slug]', 'shop-groups/[slug]', 'products/[id]', 'privacy-policy' ]

export const NO_ACCOUNT_ROUTES: string[] = ['/login', '/register', '/auth/forgot-password', '/auth/reset-password']

export const PROTECTED_ROUTES: string[] = [
    '/profile',
    '/profile/settings',
    '/profile/payment-methods',
    'cart',
    'checkout',
    'order-confirmation',
    'orders',
    'orders/[id]',
    'recipes/create',
    'recipes/[id]/edit',
    'favorites',
]

export const SHOP_OWNER_ROUTES: string[] = [
  'dashboard/shop/create',
  'dashboard/shop/edit',
  'dashboard/products',
  'dashboard/products/create',
  'dashboard/products/[id]/edit',
  'dashboard/inventory',
  'dashboard/orders',
  'dashboard/orders/[id]',
  'dashboard/groups',
  'dashboard/groups/create',
  'dashboard/groups/[id]'
]

export const ADMIN_ROUTES: string[] = [
  '/admin/orders',
  '/admin/recipes',
  '/admin/shops',
  '/admin/categories',
  '/admin/dietary-tags',
  '/admin/shop-groups',
]

// ---- types ----
export type Route = {
  label: string;
  path: string;
  protected?: boolean;
  withoutLogin?: boolean;
  role?: string;
};

// ---- data ----
export const pages: Route[] = [
  { label: "Sellers", path: "/sellersPage" },
  { label: "Shop", path: "/shopPage" },
  { label: "Checkout", path: "/checkout" },
  { label: "Contact Us", path: "/contactUs" },
  { label: "Privacy Policy", path: "/privacyPolicy" },
  { label: "Not Found", path: "/notFound" },
  { label: "Product", path: "/productPage" },
];

export const settings: Route[] = [
  { label: "Account", path: "/profile", protected: true },
  { label: "Dashboard", path: "/dashboard", protected: true, role: "admin" },
  { label: "My Shop", path: "/myShop", protected: true, role: "seller" },
  { label: "Logout", path: "/", protected: true  },
  { label: "Login", path: "/login", withoutLogin: true },
  { label: "Register", path: "/register", withoutLogin: true },
];

// ---- helpers ----
const allRoutes = [...pages, ...settings];

/** Returns only protected routes */
export const getProtectedRoutes = (): Route[] =>
  allRoutes.filter(r => r.protected);

/** Returns all routes accessible to a given role */
export const getRoutesByRole = (role: string): Route[] =>
  allRoutes.filter(r => !r.protected || r.role === role);

/** Returns only public (unprotected) routes */
export const getPublicRoutes = (): Route[] =>
  allRoutes.filter(r => !r.protected);

/** Find route by path */
export const findRoute = (path: string): Route | undefined =>
  allRoutes.find(r => r.path === path);

// ---- path-only helpers ----

/** Protected route paths */
export const getProtectedRoutePaths = (): string[] =>
  getProtectedRoutes().map(r => r.path);

/** Public (unprotected) route paths */
export const getPublicRoutePaths = (): string[] =>
  getPublicRoutes().map(r => r.path);

/** Route paths accessible by a specific role */
export const getRoutePathsByRole = (role: string): string[] =>
  getRoutesByRole(role).map(r => r.path);

/** All route paths (pages + settings) */
export const getAllPaths = (): string[] =>
  allRoutes.map(r => r.path);
