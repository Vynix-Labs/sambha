export interface User {
    email: string
    referralCode: string
    isVerified: boolean
    points: number
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface JoinWaitlistRequest {
    email: string
    referralCode?: string
}

export interface JoinWaitlistResponse {
    success: boolean
    data: {
        user: User
        message: string
    }
}

export interface VerifyEmailRequest {
    email: string
    verificationToken: string
}

export interface VerifyEmailResponse {
    success: boolean
    data: {
        user: User
        message: string
    }
}

export interface UserStats {
    user: {
        email: string
        referralCode: string
        points: number
        rank: number
        totalReferrals: number
        isVerified: boolean
        isActive: boolean
        createdAt: string
        updatedAt: string
    }
}

export interface LeaderboardEntry {
    email: string
    points: number
    rank: number
    referralCode: string
    totalReferrals?: number
}

export interface LeaderboardResponse {
    success: boolean
    data: {
        leaderboard: LeaderboardEntry[]
    }
}

export interface TotalStatsResponse {
    success: boolean
    data: {
        totalUsers: number
        totalVerifiedUsers: number
        totalActiveUsers: number
    }
}

export interface ErrorResponse {
    success: false
    error: string
}

export type FormState = 'idle' | 'loading' | 'success' | 'error'
export type AppView = 'landing' | 'stats' | 'leaderboard' 