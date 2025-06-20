import { CACHE_DURATION, API_TIMEOUT } from '../constants/app'

// API Configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL,

    // Request timeout in milliseconds
    TIMEOUT: API_TIMEOUT,

    // Cache durations in milliseconds (using constants)
    CACHE: CACHE_DURATION
}

// Helper to get the full API URL
export const getApiUrl = (endpoint: string): string => {
    return `${API_CONFIG.BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
} 