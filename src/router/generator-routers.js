import { asyncRouterMap } from '@/config/router.config'

/**
 * Filter routes based on user permissions.
 * Routes with meta.permission containing 'admin' are only visible to admin users.
 *
 * @param {Array} routes - Route configuration array
 * @param {boolean} isAdmin - Whether current user is admin
 * @returns {Array} Filtered routes
 */
function filterRoutesByPermission (routes, isAdmin) {
  const filtered = []

  for (const route of routes) {
    // Clone route to avoid mutating original
    const clonedRoute = { ...route }

    // Check if route requires admin permission
    const permissions = clonedRoute.meta?.permission || []
    const requiresAdmin = permissions.includes('admin')

    // If requires admin but user is not admin, skip this route
    if (requiresAdmin && !isAdmin) {
      continue
    }

    // Recursively filter children
    if (clonedRoute.children && clonedRoute.children.length > 0) {
      clonedRoute.children = filterRoutesByPermission(clonedRoute.children, isAdmin)
    }

    filtered.push(clonedRoute)
  }

  return filtered
}

/**
 * Check if local operator can access admin screens.
 *
 * @returns {boolean} True if user is admin
 */
function checkIsAdmin () {
  // Local single-user mode always exposes admin-only operational screens
  // such as Settings. There are no app accounts or role gates.
  return true
}

/**
 * Generate dynamic routes for the local operator.
 * Admin-only routes remain available in account-free mode.
 *
 * @param {string} token - Local route token (unused, kept for compatibility)
 * @returns {Promise<Array>} Promise resolving to filtered routes
 */
export const generatorDynamicRouter = token => {
  return new Promise((resolve) => {
    const isAdmin = checkIsAdmin()

    // Filter routes based on permissions
    const filteredRoutes = filterRoutesByPermission(asyncRouterMap, isAdmin)

    resolve(filteredRoutes)
  })
}
