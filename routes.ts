/**
 * An array of routes that require authentication
 * These routes require authentication to access
 * @type {string[]}
 */
export const privateRoutes = [
  '/minha-conta',
  '/minha-conta/enderecos',
  '/minha-conta/enderecos/editar',
  '/minha-conta/enderecos/novo',
  '/minha-conta/meus-dados',
  '/pagamento',
  '/admin',
  '/admin/adicionar-produto',
  '/admin/produtos',
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/cadastro',
  '/auth/error',
  '/auth/reset',
  '/auth/nova-senha',
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/minha-conta'
