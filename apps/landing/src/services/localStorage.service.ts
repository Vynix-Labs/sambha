import { STORAGE_KEYS, CACHE_DURATION } from '../constants/app'
import type { User, LeaderboardEntry, TotalStatsResponse } from '../types/api'

// Local Storage utilities
export class LocalStorageService {
    private static USER_KEY = STORAGE_KEYS.USER
    private static LEADERBOARD_KEY = STORAGE_KEYS.LEADERBOARD
    private static TOTAL_STATS_KEY = STORAGE_KEYS.TOTAL_STATS
    private static USER_EMAIL_KEY = STORAGE_KEYS.USER_EMAIL
    private static REFERRAL_CODE_KEY = STORAGE_KEYS.REFERRAL_CODE

    // User data
    static saveUser(user: User): void {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    }

    static getUser(): User | null {
        const userData = localStorage.getItem(this.USER_KEY)
        return userData ? JSON.parse(userData) : null
    }

    static removeUser(): void {
        localStorage.removeItem(this.USER_KEY)
        localStorage.removeItem(this.USER_EMAIL_KEY)
    }

    // User email
    static saveUserEmail(email: string): void {
        localStorage.setItem(this.USER_EMAIL_KEY, email)
    }

    static getUserEmail(): string | null {
        return localStorage.getItem(this.USER_EMAIL_KEY)
    }

    // Referral code
    static saveReferralCode(code: string): void {
        localStorage.setItem(this.REFERRAL_CODE_KEY, code)
    }

    static getReferralCode(): string | null {
        return localStorage.getItem(this.REFERRAL_CODE_KEY)
    }

    static removeReferralCode(): void {
        localStorage.removeItem(this.REFERRAL_CODE_KEY)
    }

    // Leaderboard data
    static saveLeaderboard(leaderboard: LeaderboardEntry[]): void {
        localStorage.setItem(this.LEADERBOARD_KEY, JSON.stringify({
            data: leaderboard,
            timestamp: Date.now()
        }))
    }

    static getLeaderboard(): LeaderboardEntry[] | null {
        const data = localStorage.getItem(this.LEADERBOARD_KEY)
        if (!data) return null

        const parsed = JSON.parse(data)
        // Cache for 5 minutes
        if (Date.now() - parsed.timestamp > CACHE_DURATION.LEADERBOARD) {
            return null
        }

        return parsed.data
    }

    // Total stats
    static saveTotalStats(stats: TotalStatsResponse['data']): void {
        localStorage.setItem(this.TOTAL_STATS_KEY, JSON.stringify({
            data: stats,
            timestamp: Date.now()
        }))
    }

    static getTotalStats(): TotalStatsResponse['data'] | null {
        const data = localStorage.getItem(this.TOTAL_STATS_KEY)
        if (!data) return null

        const parsed = JSON.parse(data)
        // Cache for 2 minutes
        if (Date.now() - parsed.timestamp > CACHE_DURATION.TOTAL_STATS) {
            return null
        }

        return parsed.data
    }

    // Clear all app data
    static clearAll(): void {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key)
        })
    }
} 