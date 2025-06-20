// Default values
export const DEFAULT_TOTAL_USERS = 2000
export const DEFAULT_LEADERBOARD_LIMIT = 10

// API Configuration
export const API_TIMEOUT = 10000 // 10 seconds

// Cache durations (in milliseconds)
export const CACHE_DURATION = {
    LEADERBOARD: 5 * 60 * 1000, // 5 minutes
    TOTAL_STATS: 2 * 60 * 1000, // 2 minutes
} as const

// Local storage keys
export const STORAGE_KEYS = {
    USER: 'sambha_user',
    USER_EMAIL: 'sambha_user_email',
    REFERRAL_CODE: 'sambha_referral_code',
    LEADERBOARD: 'sambha_leaderboard',
    TOTAL_STATS: 'sambha_total_stats',
} as const

// URL parameters
export const URL_PARAMS = {
    REF: 'ref',
    USER: 'user',
    USER_ID: 'userid',
} as const

// Form validation
export const VALIDATION = {
    EMAIL_REQUIRED: 'Please enter your email address',
    GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const

// UI Messages
export const MESSAGES = {
    VERIFICATION_RESENT: 'Verification email sent!',
    ALREADY_EXISTS: 'You\'re already on the waitlist! Check your email for verification.',
    USER_NOT_FOUND: 'User not found or not verified yet.',
    JOIN_SUCCESS: 'Successfully joined the waitlist!',
} as const 