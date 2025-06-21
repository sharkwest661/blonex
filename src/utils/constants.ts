export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const ROUTES = {
  HOME: '/',
  LISTINGS: '/listings',
  CATEGORY: '/category',
  PROFILE: '/profile',
} as const

export const BREAKPOINTS = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const
