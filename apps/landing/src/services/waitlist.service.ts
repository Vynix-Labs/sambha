import { API_CONFIG } from '../config/api'
import type {
    JoinWaitlistRequest,
    JoinWaitlistResponse,
    VerifyEmailRequest,
    VerifyEmailResponse,
    UserStats,
    LeaderboardEntry,
    TotalStatsResponse,
    ErrorResponse
} from '../types/api'

// API Service class
export class WaitlistService {
    private static baseUrl = API_CONFIG.BASE_URL

    // Join waitlist
    static async joinWaitlist(data: JoinWaitlistRequest): Promise<JoinWaitlistResponse> {
        const response = await fetch(`${this.baseUrl}/waitlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const error: ErrorResponse = await response.json()
            throw new Error(error.error || 'Failed to join waitlist')
        }

        return response.json()
    }

    // Verify email
    static async verifyEmail(data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
        const response = await fetch(`${this.baseUrl}/waitlist/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const error: ErrorResponse = await response.json()
            throw new Error(error.error || 'Failed to verify email')
        }

        return response.json()
    }

    // Get user stats
    static async getUserStats(email: string): Promise<UserStats> {
        const response = await fetch(`${this.baseUrl}/waitlist/stats?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const error: ErrorResponse = await response.json()
            throw new Error(error.error || 'Failed to get user stats')
        }

        const result = await response.json()
        return result.data
    }

    // Get leaderboard
    static async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
        const response = await fetch(`${this.baseUrl}/waitlist/leaderboard?limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const error: ErrorResponse = await response.json()
            throw new Error(error.error || 'Failed to get leaderboard')
        }

        const result = await response.json()
        return result.data || []
    }

    // Resend verification
    static async resendVerification(email: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/waitlist/resend-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })

        if (!response.ok) {
            const error: ErrorResponse = await response.json()
            throw new Error(error.error || 'Failed to resend verification')
        }
    }

    // Get total stats
    static async getTotalStats(): Promise<TotalStatsResponse['data']> {
        const response = await fetch(`${this.baseUrl}/waitlist/total-stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const error: ErrorResponse = await response.json()
            throw new Error(error.error || 'Failed to get total stats')
        }

        const result: TotalStatsResponse = await response.json()
        return result.data
    }
} 